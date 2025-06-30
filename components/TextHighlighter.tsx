import React, { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

const TextHighlighter = ({ children, highlightStyle = {} }: PropsWithChildren & { highlightStyle?: object }) => {
  if (typeof children !== "string") {
    return <Text>{children}</Text>; // Handle non-string children gracefully
  }

  const parts = children.split("**");

  return (
    <Text>
      {parts.map((part, index: number) => {
        // If the index is odd, it's a part that was between two '**'
        if (index % 2 === 1) {
          return (
            <Text key={`${index}_italicText`} style={[styles?.highlightedText, { fontStyle: "italic", ...highlightStyle }]}>
              {part}
            </Text>
          );
        } else {
          // If the index is even, it's a regular text part
          return <Text key={`${index}_normalText`}>{part}</Text>;
        }
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  highlightedText: {
    fontWeight: "bold", // Default highlight: bold
  },
});

export default TextHighlighter;
