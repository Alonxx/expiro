import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Colors from "../../utils/Colors";

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const foucsed = state.index === index;
        const isActions = route.name === "Add Product";

        const itemColor = foucsed ? "#65C18C" : Colors.subtitle;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!foucsed && !event?.defaultPrevented) {
            navigation.navigate(route.name);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };

        let iconName;
        switch (route.name) {
          case "Home":
            iconName = "home";
            break;
          case "Add Product":
            iconName = "scan-outline";
            break;
          case "Settings":
            iconName = "settings";
            break;
          default:
            iconName = "person";
            break;
        }

        const animatedValue = new Animated.Value(1);

        const onPressIn = () => {
          Animated.spring(animatedValue, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        };

        const onPressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        const animatedStyle = {
          transform: [{ scale: animatedValue }],
        };

        return (
          <Animated.View
            key={route.name}
            style={[
              styles.tabItem,
              animatedStyle,
              isActions ? { marginTop: 10 } : { marginTop: 10 },
            ]}
          >
            <TouchableOpacity
              onPress={onPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <View style={{ alignItems: "center" }}>
                <Ionicons name={iconName as any} size={25} color={itemColor} />
                <Text style={[{ color: itemColor }, styles.tabBarText]}>
                  {route.name}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 70,
    justifyContent: "space-evenly",
  },
  tabItem: {
    width: 70,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: "700",
  },
  actionsButton: {
    width: 42,
    height: 42,
    backgroundColor: Colors.subtitle,
    borderRadius: 21,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
