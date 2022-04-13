import OnboardingCarousel from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import Market from "../../assets/images/market.svg";
import { Text, Box } from "native-base";

interface Props {
  setNeedOnboarding?: any;
}

export const Onboarding: React.FC<Props> = ({ setNeedOnboarding }) => {
  return (
    <>
      <OnboardingCarousel
        showSkip={false}
        onDone={async () => {
          await AsyncStorage.setItem("onBoarding", "true");
          setNeedOnboarding(false);
        }}
        pages={[
          {
            backgroundColor: "#000",
            image: (
              <Box borderRadius={"full"} w={"24"} height={"24"} shadow={"9"}>
                <Text textAlign={"center"} fontSize={"6xl"}>
                  🕵️
                </Text>
              </Box>
            ),
            title: "Don't let your food expire",
            subtitle:
              "Follow the control of the expiration date of your products",
          },
          {
            backgroundColor: "#000",
            image: (
              <Box borderRadius={"full"} w={"24"} height={"24"} shadow={"9"}>
                <Text textAlign={"center"} fontSize={"6xl"}>
                  🤳
                </Text>
              </Box>
            ),
            title: "Scan barcodes",
            subtitle: "Add products by their barcode and we quickly identify",
          },
          {
            backgroundColor: "#000",
            image: (
              <Box borderRadius={"full"} w={"24"} height={"24"} shadow={"9"}>
                <Text textAlign={"center"} fontSize={"6xl"}>
                  ⏰
                </Text>
              </Box>
            ),
            title: "You won't forget anymore",
            subtitle:
              "Expiro will remind you when a product is about to expire",
          },
        ]}
      />
    </>
  );
};
