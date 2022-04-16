import { Box, Button, Text, VStack, useToast } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProducts, useGetDaysToExpire } from "../../hooks";
import { Alert } from "react-native";
import { AdBanner } from "../../components";

export const Settings: React.FC = () => {
  const getProducts = useGetProducts();
  const [loading, setLoading] = React.useState<{
    expired: boolean;
    all: boolean;
  }>({ expired: false, all: false });
  const alert = useToast();

  const handleDeleteExpired = () => {
    Alert.alert(
      "Delete Expired Products",
      "Are you sure you want to delete all expired products?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading({ ...loading, expired: true });
            let producsData = await getProducts();
            let producsFilter = producsData.filter(
              (productData) =>
                useGetDaysToExpire(new Date(productData.expirationDate)) > 0
            );
            await AsyncStorage.setItem(
              "products",
              JSON.stringify(producsFilter)
            );
            alert.show({
              pl: 2,
              pr: 2,
              title: "All expired products deleted",
              placement: "top",
              bgColor: "black",
              borderRadius: 13,
            });
            setLoading({ ...loading, expired: false });
          },
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Dellete All Products",
      "Are you sure you want to delete all products?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading({ ...loading, all: true });
            await AsyncStorage.setItem("products", JSON.stringify([]));
            alert.show({
              pl: 2,
              pr: 2,
              title: "All products deleted",
              placement: "top",
              bgColor: "black",
              borderRadius: 13,
            });
            setLoading({ ...loading, all: false });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView>
      <AdBanner />
      <Box mb={3}>
        <Text
          fontWeight={"600"}
          textAlign="left"
          p={4}
          fontSize="3xl"
          color={"black"}
        >
          Settings
        </Text>
      </Box>
      <VStack alignItems={"center"} space={5}>
        <Button
          isLoading={loading.expired}
          onPress={handleDeleteExpired}
          w="60%"
          bg="black"
          colorScheme={"light"}
        >
          <Text color={"white"}> Delete all expired products</Text>
        </Button>

        <Button
          onPress={handleDeleteAll}
          isLoading={loading.all}
          w="60%"
          bg="black"
          colorScheme={"light"}
        >
          <Text color={"white"}> Delete all products</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};
