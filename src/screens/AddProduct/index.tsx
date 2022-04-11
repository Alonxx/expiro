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
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TProduct } from "models/Types";
import { BarCordeScanner } from "../../components";
import { useToast } from "native-base";
import "react-native-get-random-values";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

import { v4 as uuidv4 } from "uuid";

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

  const onHandlePress = () => {
    if (inputsValue.productName.length === 0) return setError(true);
    setLoading(true);
    AsyncStorage.getItem("products")
      .then((productsData) => {
        let products = productsData != null ? JSON.parse(productsData) : [];
        products.push({ ...inputsValue, id: uuidv4() });
        AsyncStorage.setItem("products", JSON.stringify(products));
        setInputsValue({ ...defaultInputsValue });
        setError(false);
        alert.show({
          pl: 2,
          pr: 2,
          title: "Product added successfully",
          placement: "top",
          bgColor: "black",
          borderRadius: 13,
        });
        setLoading(false);
      })

      .catch((error: any) => {
        setLoading(false);
        alert.show({
          pl: 2,
          pr: 2,
          title: error,
          placement: "top",
          bgColor: "red.500",
          borderRadius: 13,
        });
      });
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
                        {inputsValue.expirationDate.toISOString().split("T")[0]}
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
              <Avatar size={"sm"} borderRadius={"md"} bg={inputsValue.color} />
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
              onChangeText={(text) =>
                setInputsValue({ ...inputsValue, units: text })
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

        <Box mt={"10"} pl={5} pr={5} w={"100%"}>
          <Button
            isLoading={loading}
            onPress={onHandlePress}
            bg="black"
            colorScheme={"light"}
          >
            Add
          </Button>
        </Box>
      </VStack>
    </SafeAreaView>
  );
  /* 
    return (
    <SafeAreaView>
      <View>
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </SafeAreaView>
  ); */
};
