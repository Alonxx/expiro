import { AdMobBanner } from "expo-ads-admob";
import { Center } from "native-base";

interface Props {}

export const AdBanner: React.FC<Props> = () => {
  return (
    <Center w={"100%"}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
        servePersonalizedAds
      />
    </Center>
  );
};
