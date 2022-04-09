import {
  HStack,
  Box,
  Avatar,
  VStack,
  Heading,
  Divider,
  Text,
} from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TProduct } from "models/Types";
import { useGetDaysToExpire } from "../../hooks";
import { AntDesign } from "@expo/vector-icons";

export const ProductItem: React.FC<TProduct> = ({
  productName,
  note,
  units,
  expirationDate,
  color,
}) => {
  const daysToExpire = useGetDaysToExpire(new Date(expirationDate));

  return (
    <Box mt={2} mb={3} ml={5} mr={5}>
      <HStack w={"100%"}>
        <HStack w={"70%"} space={7}>
          <Box justifyContent={"center"} w={"10%"} maxW={"10%"}>
            <Avatar size={"sm"} borderRadius={"md"} bg={color} />
          </Box>
          <VStack justifyContent={"center"} w={"80%"} maxW={"80%"}>
            <Heading isTruncated fontSize={"md"}>
              {productName}
            </Heading>
            <HStack space={6}>
              {note !== "" && (
                <HStack w={"45%"} maxW="45%" space={1} alignItems={"center"}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={12}
                    color="black"
                  />
                  <Text isTruncated>{note}</Text>
                </HStack>
              )}

              <HStack space={1} alignItems={"center"}>
                <Ionicons name="archive-outline" size={12} color="black" />
                <Text isTruncated>{units}</Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>

        <HStack w={"30%"} maxW={"30%"}>
          <VStack alignItems={"center"} w={"100%"}>
            {daysToExpire <= 0 ? (
              <>
                <AntDesign name="exclamationcircleo" size={20} color="red" />
                <Text fontSize={"sm"} color={"red.500"}>
                  EXPIRED
                </Text>
              </>
            ) : (
              <>
                <Heading
                  color={
                    daysToExpire <= 2
                      ? "red.500"
                      : daysToExpire <= 5
                      ? "orange.500"
                      : "black"
                  }
                  textAlign={"center"}
                  fontSize={"lg"}
                >
                  {daysToExpire}
                </Heading>
                <Text>days to expire</Text>
              </>
            )}
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
};
