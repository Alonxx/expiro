import { Box, Text, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Products } from "../../components";
import React from "react";
import { TProduct } from "models/Types";
import { AntDesign } from "@expo/vector-icons";
import { useSortProducts, useGetProducts } from "../../hooks";
import { useIsFocused } from "@react-navigation/native";

export const Home: React.FC = () => {
  const [products, setProducts] = React.useState<TProduct[]>([]);
  const [isUpdateProducts, setIsUpdateProducts] =
    React.useState<boolean>(false);
  const [searchProducts, setSearchProducts] = React.useState<TProduct[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const sortProducts = useSortProducts();
  const getProducts = useGetProducts();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setInputValue("");
    const productsData = async () => {
      let data = await getProducts();
      setProducts(sortProducts(data));
      setSearchProducts(sortProducts(data));
      setIsUpdateProducts(false);
    };

    productsData();
  }, [isFocused, isUpdateProducts]);

  React.useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (
        product.productName.toLowerCase().includes(inputValue.toLowerCase()) ||
        product.barCode.includes(inputValue)
      ) {
        return product;
      }
    });

    setSearchProducts(filteredProducts);
  }, [inputValue]);

  return (
    <SafeAreaView>
      <Box>
        <Text
          fontWeight={"600"}
          textAlign="left"
          p={4}
          fontSize="3xl"
          color={"black"}
        >
          My Products
        </Text>
      </Box>
      <Box ml={4} mr={4}>
        <Input
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          borderRadius={"10px"}
          height={9}
          bgColor={"gray.200"}
          variant="unstyled"
          placeholder="Search a product name or bar code..."
          InputLeftElement={
            <Box ml={3}>
              <AntDesign name="search1" size={20} color="gray" />
            </Box>
          }
        />
      </Box>
      <Box mt={8}>
        <Products
          setIsUpdateProducts={setIsUpdateProducts}
          productsList={searchProducts}
        />
      </Box>
    </SafeAreaView>
  );
};
