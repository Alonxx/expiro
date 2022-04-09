import { TProduct } from "models/Types";
import {
  Actionsheet,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  Button,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetDaysToExpire, useGetProducts } from "../../hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;

  product: TProduct;
  setIsUpdateProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerProduct: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  setIsUpdateProducts,
}) => {
  const expiritionDate = product.expirationDate.toString().split("T")[0];
  const getProducts = useGetProducts();

  const handleDelete = async () => {
    let producsData = await getProducts();
    let producsFilter = producsData.filter(
      (productData) => productData.id !== product.id
    );
    await AsyncStorage.setItem("products", JSON.stringify(producsFilter));
    setIsUpdateProducts(true);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <VStack mb={"10%"} space={10}>
          <Box>
            <Heading textAlign={"center"}>{product.productName}</Heading>
            <Box>
              {product.note.length > 0 && (
                <Text fontSize={"lg"} textAlign={"center"}>
                  {product.note}
                </Text>
              )}
            </Box>
          </Box>
          <VStack w={"100%"} space={3}>
            <Text fontSize={"lg"}>Expiration Date: {expiritionDate}</Text>
            <Text fontSize={"lg"}>Units: {product.units}</Text>

            {product.barCode.length > 0 && (
              <Text fontSize={"lg"}>Bar Code: {product.barCode}</Text>
            )}
          </VStack>
          <Button onPress={handleDelete} colorScheme={"red"}>
            Delete
          </Button>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
