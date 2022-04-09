import AsyncStorage from "@react-native-async-storage/async-storage";
import { TProduct } from "models/Types";

export const useGetProducts = () => {
  const getProducts = async () => {
    try {
      const fecthProducts = await AsyncStorage.getItem("products");
      let data: TProduct[] =
        fecthProducts != null ? JSON.parse(fecthProducts) : [];

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return getProducts;
};
