import { Box, Text, Input } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Products } from "../../components";
import React from "react";
import { TProduct } from "models/Types";
import { AntDesign } from "@expo/vector-icons";
import { useSortProducts, useGetProducts } from "../../hooks";
import { useIsFocused } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const Home: React.FC = () => {
  const [products, setProducts] = React.useState<TProduct[]>([]);
  const [notificationToken, setNotificationToken] = React.useState<string>("");
  const [isUpdateProducts, setIsUpdateProducts] =
    React.useState<boolean>(false);
  const [searchProducts, setSearchProducts] = React.useState<TProduct[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const sortProducts = useSortProducts();
  const getProducts = useGetProducts();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const getNotificationPermission = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) return setNotificationToken(token);
      return;
    };
    getNotificationPermission();
  }, []);

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

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      return;
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

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
