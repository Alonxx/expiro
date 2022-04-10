import { Actionsheet } from "native-base";
import React from "react";
import DatePicker from "react-native-date-picker";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerDatePicker: React.FC<Props> = ({ isOpen, onClose }) => {
  const [date, setDate] = React.useState(new Date());

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <DatePicker
          androidVariant="iosClone"
          date={date}
          onDateChange={setDate}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};
