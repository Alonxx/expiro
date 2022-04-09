import { TProduct } from "models/Types";
import { useCallback } from "react";
import { useGetDaysToExpire } from "./useGetDaysToExpire";

export const useSortProducts = () => {
  const sortProducts = useCallback((products: TProduct[]): TProduct[] => {
    const sortedProducts = products.sort((a, b) => {
      let daysToExpireA = useGetDaysToExpire(new Date(a.expirationDate));
      let daysToExpireB = useGetDaysToExpire(new Date(b.expirationDate));
      return daysToExpireA < daysToExpireB ? -1 : 1;
    });

    return sortedProducts;
  }, []);

  return sortProducts;
};
