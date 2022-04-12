import { SafeAreaProvider } from "react-native-safe-area-context";

import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./src/navigation";
import { SSRProvider } from "@react-aria/ssr";
import { LogBox } from "react-native";
import AppLoading from "expo-app-loading";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Onboarding } from "./src/screens/Onboarding";
LogBox.ignoreLogs(["NativeBase:"]);

const App = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [needOnboarding, setNeedOnboarding] = React.useState<boolean>(false);

  if (!loading) {
    return (
      <AppLoading
        startAsync={async () => {
          AsyncStorage.getItem("onBoarding").then((value) => {
            if (value === "true") {
              setNeedOnboarding(false);
            } else {
              setNeedOnboarding(true);
            }
          });
        }}
        onFinish={() => setLoading(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <SSRProvider>
      <SafeAreaProvider>
        <NativeBaseProvider>
          {needOnboarding ? (
            <Onboarding setNeedOnboarding={setNeedOnboarding} />
          ) : (
            <AppNavigator onBoarding={false} />
          )}
        </NativeBaseProvider>
      </SafeAreaProvider>
    </SSRProvider>
  );
};

export default App;
