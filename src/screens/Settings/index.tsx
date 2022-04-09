import { Box, Button, Divider, Heading, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProducts, useGetDaysToExpire } from "../../hooks";

export const Settings: React.FC = () => {
  const getProducts = useGetProducts();

  const handleDeleteExpired = async () => {
    let producsData = await getProducts();
    let producsFilter = producsData.filter(
      (productData) =>
        useGetDaysToExpire(new Date(productData.expirationDate)) > 0
    );
    await AsyncStorage.setItem("products", JSON.stringify(producsFilter));
  };

  const handleDeleteAll = async () => {
    await AsyncStorage.setItem("products", JSON.stringify([]));
  };

  return (
    <SafeAreaView>
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
          onPress={handleDeleteExpired}
          w="60%"
          bg="black"
          colorScheme={"light"}
        >
          <Text color={"white"}> Delete all expired products</Text>
        </Button>

        <Button
          onPress={handleDeleteAll}
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
