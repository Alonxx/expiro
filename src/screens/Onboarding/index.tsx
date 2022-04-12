import OnboardingCarousel from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            backgroundColor: "#fff",
            image: <></>,
            title: "Don't let your food expire",
            subtitle:
              "Follow the control of the expiration date of your products",
          },
          {
            backgroundColor: "#fff",
            image: <></>,
            title: "Scan barcodes",
            subtitle: "Add products by their barcode and we quickly identify",
          },
          {
            backgroundColor: "#fff",
            image: <></>,
            title: "you won't forget anymore",
            subtitle:
              "Expiro will remind you when a product is about to expire",
          },
        ]}
      />
    </>
  );
};
