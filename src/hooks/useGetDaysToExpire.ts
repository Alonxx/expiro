export const useGetDaysToExpire = (days: Date): number => {
  //calculate days to expire
  const today = new Date();
  const expirationDate = new Date(days);
  const timeDiff = expirationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
};
