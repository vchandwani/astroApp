import { CustomTheme } from "@/constants/Colors";
import React, { PropsWithChildren } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import TextHighlighter from "./TextHighlighter";

export type ItemData = {
  id: string;
  title: string;
};
type ItemProps = {
  item: ItemData;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  currentTheme?: CustomTheme;
};

const Item = ({ item, currentTheme }: ItemProps) => (
  <View style={{ marginVertical: 8, flexDirection: "column", alignItems: "center", paddingTop: 8, paddingBottom: 8 }} key={`${item?.id}_info`}>
    <Text
      style={{
        flexDirection: "row",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "700",
        marginBottom: 8,
      }}
    >
      {item?.id}
    </Text>
    <Text style={{ flexDirection: "row", width: "100%" }}>
      <TextHighlighter currentTheme={currentTheme}>{item?.title}</TextHighlighter>
    </Text>
  </View>
);
const List = ({ children, data, currentTheme }: PropsWithChildren & { data?: ItemData[]; currentTheme?: CustomTheme }) => {
  const renderItem = ({ item }: { item: ItemData }) => {
    return item?.id ? <Item item={item} currentTheme={currentTheme} /> : null;
  };

  return (
    <ScrollView>
      <FlatList nestedScrollEnabled scrollEnabled={false} data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </ScrollView>
  );
};

export default List;
