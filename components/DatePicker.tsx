import { CustomTheme } from "@/constants/Colors";
import { DATE_FORMAT_DDMMYYY } from "@/constants/Values";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Platform, View } from "react-native";
import { TextInput } from "react-native-paper";

export type DateTimeComponentProps = {
  label: string;
  placeholder: string;
  icon: string;
  onChange: Dispatch<SetStateAction<string>>; // Type for the setter function
  currentTheme?: CustomTheme;
  styles?: object;
  dateFormat?: string; // Format for the date input, e.g., "DD-MM-YYYY"
  isDarkTheme?: boolean;
  is24Hour?: boolean;
  mode?: "date" | "time" | "datetime" | "countdown";
};

const DateTimeComponent = ({
  label,
  placeholder,
  icon,
  onChange,
  currentTheme,
  styles = {},
  dateFormat = DATE_FORMAT_DDMMYYY,
  isDarkTheme,
  mode = "date",
  is24Hour = false,
}: DateTimeComponentProps) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<string>("");

  const onChangeVal = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide picker on iOS after selection
    setDate(currentDate);
    setDisplayDate(formatDate(currentDate)); // Format the date if needed
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return moment(date).format(dateFormat); // Example format: DD-MM-YYYY
  };

  React.useEffect(() => {
    onChange(displayDate); // Call onChange with the formatted date
  }, [displayDate]);

  return (
    <View>
      <TextInput
        label={label}
        value={displayDate}
        mode="outlined"
        style={[styles?.input, { backgroundColor: currentTheme?.colors?.surface }]}
        keyboardType="numeric"
        placeholder={placeholder}
        outlineColor={currentTheme?.colors?.placeholder}
        activeOutlineColor={currentTheme?.colors?.primary}
        textColor={currentTheme?.colors?.text}
        placeholderTextColor={currentTheme?.colors?.placeholder}
        right={<TextInput.Icon icon={icon} color={currentTheme?.colors?.text} onPress={showDatePicker} />}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode} // or "time", "datetime"
          is24Hour={is24Hour}
          display="default"
          onChange={onChangeVal}
          themeVariant={isDarkTheme ? "dark" : "light"}
        />
      )}
    </View>
  );
};

export default DateTimeComponent;
