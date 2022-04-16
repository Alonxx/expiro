import React from "react";
import {
  Box,
  Text,
  Input,
  VStack,
  HStack,
  FormControl,
  WarningOutlineIcon,
  Button,
  Select,
  Avatar,
  ScrollView,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TProduct } from "models/Types";
import { AdBanner, BarCordeScanner } from "../../components";
import { useToast } from "native-base";
import "react-native-get-random-values";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { v4 as uuidv4 } from "uuid";
import * as Notifications from "expo-notifications";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

export const AddProduct: React.FC = () => {
  const alert = useToast();

  const defaultInputsValue = {
    productName: "",
    expirationDate: new Date(),
    note: "",
    units: "1",
    color: "blue.500",
    barCode: "",
    id: "",
    notificationId: "",
  };
  const colors = [
    { label: "Blue", color: "blue.500" },
    { label: "Green", color: "green.500" },
    { label: "Pink", color: "pink.500" },
    { label: "Red", color: "red.500" },
    { label: "Fuchsia", color: "fuchsia.500" },
    { label: "Yellow", color: "yellow.500" },
    { label: "Orange", color: "orange.500" },
    { label: "Purple", color: "purple.500" },
  ];

  const [inputsValue, setInputsValue] = React.useState<TProduct>({
    ...defaultInputsValue,
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const [showScanner, setShowScanner] = React.useState<boolean>(false);

  const [error, setError] = React.useState<boolean>(false);

  const [show, setShow] = React.useState(Platform.OS === "ios");

  const onHandlePress = async () => {
    if (inputsValue.productName.length === 0) return setError(true);
    setLoading(true);

    try {
      const products = await AsyncStorage.getItem("products");
      const productsArray = products ? JSON.parse(products) : [];
      const notificationId = await scheduleNotification(inputsValue);
      const newProduct = {
        ...inputsValue,
        id: uuidv4(),
        notificationId,
      };
      productsArray.push(newProduct);
      await AsyncStorage.setItem("products", JSON.stringify(productsArray));
      setInputsValue({ ...defaultInputsValue });
      alert.show({
        pl: 2,
        pr: 2,
        title: "Product added successfully",
        placement: "top",
        bgColor: "black",
        borderRadius: 13,
      });
      setLoading(false);
      try {
        const ShowAdsCounter = await AsyncStorage.getItem("ShowAdsCounter");
        if (ShowAdsCounter && Number(ShowAdsCounter) >= 1) {
          await AdMobInterstitial.setAdUnitID(
            "ca-app-pub-3940256099942544/1033173712"
          );
          await AdMobInterstitial.requestAdAsync({
            servePersonalizedAds: true,
          });
          await AdMobInterstitial.showAdAsync();
          await AsyncStorage.setItem("ShowAdsCounter", "0");
        } else {
          await AsyncStorage.setItem(
            "ShowAdsCounter",
            (Number(ShowAdsCounter) + 1).toString()
          );
        }
      } catch (error) {}
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDatePicker = (even: any, selectedDate: any) => {
    setShow(Platform.OS === "ios");
    const currentDate = selectedDate;
    setInputsValue((prevState) => ({
      ...prevState,
      expirationDate: currentDate,
    }));
  };

  const onPressScanner = () => {
    setShowScanner(true);
  };

  const scheduleNotification = async (product: TProduct) => {
    //const trigger = new Date(product.expirationDate).setHours(12, 0, 0, 0);

    const trigger = new Date(product.expirationDate).setMinutes(
      product.expirationDate.getMinutes() + 1
    );

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Expiro",
          body: `You have products that expire today`,
        },
        trigger,
      });
      return notificationId;
    } catch (error) {
      console.log(error);
    }
  };

  if (showScanner) {
    return (
      <BarCordeScanner
        setInputsValue={setInputsValue}
        setShowScanner={setShowScanner}
      />
    );
  }

  return (
    <SafeAreaView>
      <ScrollView minW={"100%"} minHeight={"100%"}>
        <AdBanner />
        <Box>
          <Text
            fontWeight={"600"}
            textAlign="left"
            p={4}
            fontSize="3xl"
            color={"black"}
          >
            Add Product
          </Text>
        </Box>

        <VStack pl={3} space={7}>
          <FormControl>
            <FormControl.Label>Bar Code</FormControl.Label>
            <HStack>
              <Input
                onChangeText={(text) =>
                  setInputsValue({ ...inputsValue, barCode: text })
                }
                keyboardType="numeric"
                value={inputsValue.barCode}
                bgColor={"gray.200"}
                variant={"unstyled"}
                w={"50%"}
                placeholder="0000000..."
                borderRightRadius={0}
                color={"black"}
                height={9}
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="barcode-outline" size={20} color="black" />
                  </Box>
                }
              />
              <Button
                bg="black"
                height={9}
                colorScheme={"light"}
                onPress={onPressScanner}
                startIcon={
                  <Ionicons name="scan-outline" size={20} color="white" />
                }
              >
                <Text fontWeight={"600"} color={"white"}>
                  Scan
                </Text>
              </Button>
            </HStack>
          </FormControl>
          <HStack space={10} w={"100%"}>
            <VStack space={2} w={"40%"} alignItems={"flex-start"}>
              <Text fontWeight={"500"}>Expiration Date</Text>
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                minWidth="100%"
                borderRadius={"10px"}
                space={2}
              >
                {Platform.OS !== "ios" && (
                  <Button
                    height={9}
                    w={"100%"}
                    bg={"gray.200"}
                    variant={"ghost"}
                    colorScheme={"light"}
                    onPress={(event) => {
                      event.preventDefault();
                      setShow(true);
                    }}
                  >
                    <HStack w={"100%"}>
                      <Box w={"25%"}>
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color="black"
                        />
                      </Box>
                      <Box w={"75%"}>
                        <Text>
                          {inputsValue.expirationDate.toLocaleDateString()}
                        </Text>
                      </Box>
                    </HStack>
                  </Button>
                )}
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={inputsValue.expirationDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    style={Platform.OS === "ios" ? { width: "100%" } : null}
                    onChange={onChangeDatePicker}
                  />
                )}
              </HStack>
            </VStack>
            <HStack space={4} w="50%">
              <FormControl w={"50%"}>
                <FormControl.Label>Color</FormControl.Label>
                <Select
                  selectedValue={inputsValue.color}
                  height={9}
                  bgColor={"gray.200"}
                  accessibilityLabel="Choose a color"
                  placeholder="Choose a color"
                  onValueChange={(itemValue) =>
                    setInputsValue({ ...inputsValue, color: itemValue })
                  }
                >
                  {colors.map((option, i) => (
                    <Select.Item
                      key={option.label}
                      label={option.label}
                      value={option.color}
                    />
                  ))}
                </Select>
              </FormControl>
              <Box mb={1} justifyContent={"flex-end"} w={"50%"}>
                <Avatar
                  size={"sm"}
                  borderRadius={"md"}
                  bg={inputsValue.color}
                />
              </Box>
            </HStack>
          </HStack>

          <HStack space={3}>
            <FormControl w="60%" isInvalid={error}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={inputsValue.productName}
                onChangeText={(text) =>
                  setInputsValue({ ...inputsValue, productName: text })
                }
                height={9}
                bgColor={"gray.200"}
                variant={"unstyled"}
                placeholder="Spaghetti..."
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="pricetag-outline" size={20} color="black" />
                  </Box>
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Please enter a product name
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl w="30%">
              <FormControl.Label>Units</FormControl.Label>
              <Input
                value={inputsValue.units}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setInputsValue({
                    ...inputsValue,
                    units: text.replace(/[^0-9]/g, ""),
                  })
                }
                height={9}
                type="number"
                bgColor={"gray.200"}
                variant={"unstyled"}
                maxLength={3}
                placeholder="0..."
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="archive-outline" size={20} color="black" />
                  </Box>
                }
              />
            </FormControl>
          </HStack>

          <FormControl w="70%">
            <FormControl.Label>Note</FormControl.Label>
            <Input
              value={inputsValue.note}
              onChangeText={(text) =>
                setInputsValue({ ...inputsValue, note: text })
              }
              height={9}
              bgColor={"gray.200"}
              variant={"unstyled"}
              placeholder="in aisle 5..."
              InputLeftElement={
                <Box pl={2}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={20}
                    color="black"
                  />
                </Box>
              }
            />
          </FormControl>
          <Box>
            <Text
              p={"1"}
              textAlign={"center"}
              fontSize={"xs"}
              color={"#00000074"}
            >
              You will receive a notification on the expiration date of the
              product
            </Text>
            <Box mt={"5"} pl={5} pr={5} w={"100%"}>
              <Button
                isLoading={loading}
                onPress={onHandlePress}
                bg="black"
                colorScheme={"light"}
              >
                Add
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
