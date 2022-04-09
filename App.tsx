import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./src/navigation";
import { SSRProvider } from "@react-aria/ssr";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["NativeBase:"]);

export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </SSRProvider>
  );
}
