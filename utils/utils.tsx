import List, { ItemData } from "@/components/List";
import TextHighlighter from "@/components/TextHighlighter";
import { CustomTheme } from "@/constants/Colors";
import {
  AMETHYST,
  AQUAMARINE,
  AQUARIUS,
  ARIES,
  BLUE_SAPPHIRE,
  CANCER,
  CAPRICORN,
  DIAMOND,
  EMERALD,
  GARNET,
  GEMINI,
  LEO,
  LIBRA,
  OPAL,
  PEARL,
  PERIDOT,
  PISCES,
  RUBY,
  SAGITTARIUS,
  SCORPIO,
  TAURUS,
  TOPAZ,
  TURQUOISE,
  VIRGO,
} from "@/constants/Values";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const formatChildData = (header: string, data: string, currentTheme: CustomTheme): string | React.ReactElement => {
  if (header.toLowerCase().includes("number")) {
    // If the header includes 'number', format the data as a color string
    const allNumbers = new Set(data.match(/\d+(\.\d+)?/g));
    if (allNumbers) {
      return (
        <View style={{ flexDirection: "column", marginTop: 8, marginBottom: 8 }}>
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
            {Array.from(allNumbers).join(", ")}
          </Text>
          <Text style={{ flexDirection: "row", width: "100%" }}>
            <TextHighlighter currentTheme={currentTheme}>{data}</TextHighlighter>
          </Text>
        </View>
      );
    }
  } else if (header.toLowerCase().includes("planets") || header.toLowerCase().includes("sun sign characteristic")) {
    // If the header includes 'colour', format the data as a color string

    const dataSplit = data?.split("*   **").map((item) => item.trim());

    if (dataSplit?.length === 1) {
      return <TextHighlighter currentTheme={currentTheme}>{dataSplit[0]}</TextHighlighter>;
    } else {
      let DATA: ItemData[] =
        dataSplit?.map((item) => {
          const individualData = item?.split("**").map((subItem) => subItem.trim());

          return individualData[0] !== "" && individualData[1] !== ""
            ? {
                id: individualData[0],
                title: individualData[1],
              }
            : { id: "", title: "" }; // Fallback for empty data
        }) || [];

      return <List data={DATA} currentTheme={currentTheme} />;
    }
  }
  return <TextHighlighter currentTheme={currentTheme}>{data}</TextHighlighter>;
};

export const getDate = (dateString: string) => {
  const dateParts = dateString.split("-");
  const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

  const month = date.getMonth() + 1; // getMonth() is 0-indexed
  const day = date.getDate();
  return { day, month, year: date.getFullYear() };
};

// Determine sun sign based on date of birth
export const getSunSign = (dateString: string) => {
  const { day, month } = getDate(dateString);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return {
      name: ARIES,
      stoneImage: require("../assets/images/stone/diamond.png"),
      stoneName: DIAMOND,
    };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return {
      name: TAURUS,
      stoneImage: require("../assets/images/stone/emerald.png"),
      stoneName: EMERALD,
    };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return {
      name: GEMINI,
      stoneImage: require("../assets/images/stone/pearl.png"),
      stoneName: PEARL,
    };

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return {
      name: CANCER,
      stoneImage: require("../assets/images/stone/ruby.png"),
      stoneName: RUBY,
    };

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return {
      name: LEO,
      stoneImage: require("../assets/images/stone/peridot.png"),
      stoneName: PERIDOT,
    };

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return {
      name: VIRGO,
      stoneImage: require("../assets/images/stone/blue_sapphire.png"),
      stoneName: BLUE_SAPPHIRE,
    };

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return {
      name: LIBRA,
      stoneImage: require("../assets/images/stone/opal.png"),
      stoneName: OPAL,
    };

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return {
      name: SCORPIO,
      stoneImage: require("../assets/images/stone/topaz.png"),
      stoneName: TOPAZ,
    };

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return {
      name: SAGITTARIUS,
      stoneImage: require("../assets/images/stone/turquoise.png"),
      stoneName: TURQUOISE,
    };

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return {
      name: CAPRICORN,
      stoneImage: require("../assets/images/stone/garnet.png"),
      stoneName: GARNET,
    };

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return {
      name: AQUARIUS,
      stoneImage: require("../assets/images/stone/amethyst.png"),
      stoneName: AMETHYST,
    };

  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return {
      name: PISCES,
      stoneImage: require("../assets/images/stone/aquamarine.png"),
      stoneName: AQUAMARINE,
    };
};
