import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, AddProduct, Settings, Onboarding } from "../screens";
import TabBar from "../components/TabBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const TabBarNavigator = createBottomTabNavigator();
/* const HomeStackNavigator = createNativeStackNavigator();

const HomeNavigator = () => {
  const [state, setstate] = React.useState<boolean>(false);

  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        options={{ headerShown: false }}
        name="Onboarding"
        component={Onboarding}
      />

      <HomeStackNavigator.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={Home}
      />
    </HomeStackNavigator.Navigator>
  );
};
 */
interface PropsTab {
  onBoarding: boolean;
}

const TabNavigator: React.FC<PropsTab> = ({ onBoarding }) => {
  return (
    <TabBarNavigator.Navigator tabBar={(props) => <TabBar {...props} />}>
      <TabBarNavigator.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <TabBarNavigator.Screen
        options={{ headerShown: false }}
        name="Add Product"
        component={AddProduct}
      />
      <TabBarNavigator.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
    </TabBarNavigator.Navigator>
  );
};

interface PropsApp {
  onBoarding: boolean;
}

export const AppNavigator: React.FC<PropsApp> = ({ onBoarding }) => {
  return (
    <NavigationContainer>
      <TabNavigator onBoarding={onBoarding} />
    </NavigationContainer>
  );
};
