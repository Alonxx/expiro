import React from "react";
import { Button, FlatList, View, Divider } from "native-base";
import { ProductItem } from "../ProductItem";
import { DrawerProduct } from "../DrawerProduct";
import { TProduct } from "models/Types";
import { useDisclose } from "native-base";

interface Props {
  productsList: TProduct[];
  setIsUpdateProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Products: React.FC<Props> = ({
  productsList,
  setIsUpdateProducts,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [currentProduct, setCurrentProduct] = React.useState<TProduct>({
    productName: "",
    expirationDate: new Date(),
    note: "",
    units: "1",
    color: "blue.500",
    barCode: "",
    id: "",
    notificationId: "",
  });

  return (
    <>
      <DrawerProduct
        product={currentProduct}
        isOpen={isOpen}
        onClose={onClose}
        setIsUpdateProducts={setIsUpdateProducts}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={10}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: 250 }}
        data={productsList}
        renderItem={({ item }) => (
          <>
            <Button
              padding={0}
              variant={"ghost"}
              colorScheme={"light"}
              onPress={() => {
                setCurrentProduct(item);
                onOpen();
              }}
            >
              <ProductItem {...item} />
            </Button>
            <Divider />
          </>
        )}
        keyExtractor={(item, index) => item.id}
      />
    </>
  );
};
