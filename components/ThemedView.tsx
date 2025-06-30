import { RootState } from "@/store/redux/store";
import { UserState } from "@/store/redux/user";
import { View, type ViewProps } from "react-native";

import { useSelector } from "react-redux";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { currentTheme } = useSelector<RootState, UserState>((state) => state.user);

  return <View style={[{ backgroundColor: currentTheme?.colors?.background }, style]} {...otherProps} />;
}
