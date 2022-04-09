import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TProduct } from "models/Types";
import { Box, Heading, Text, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  setShowScanner: React.Dispatch<React.SetStateAction<boolean>>;
  setInputsValue: React.Dispatch<React.SetStateAction<TProduct>>;
}

export const BarCordeScanner: React.FC<Props> = ({
  setInputsValue,
  setShowScanner,
}) => {
  const [hasPermission, setHasPermission] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setInputsValue((prevState: TProduct) => ({ ...prevState, barCode: data }));
    setShowScanner(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Button
        variant={"link"}
        onPress={() => setShowScanner(false)}
        top={10}
        left={4}
        position={"absolute"}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </Button>
      <Text fontSize={"md"} textAlign={"center"} color={"white"}>
        Place the barcode in the center to scan
      </Text>
      <Box
        mt={5}
        borderWidth={1}
        borderColor={"white"}
        borderRadius={"xl"}
        alignSelf="center"
        w="90%"
        h="20%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
  },
});
