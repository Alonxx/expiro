import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, AddProduct, Settings } from "../screens";
import TabBar from "../components/TabBar";

/* const HomeStackNavigator = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={Home}
      />
      <HomeStackNavigator.Screen name="EditProduct" component={EditProduct} />
    </HomeStackNavigator.Navigator>
  );
}; */

const TabBarNavigator = createBottomTabNavigator();

const TabNavigator = () => {
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

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
