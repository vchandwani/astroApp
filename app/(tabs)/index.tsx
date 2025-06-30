import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, Dialog, Provider as PaperProvider, Portal, Text, TextInput, ToggleButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";

import { Collapsible } from "@/components/Collapsible";
import SunSignSymbol from "@/components/SunSignSymbol";
import { CustomTheme, DarkTheme, LightTheme } from "@/constants/Colors";
import { PredictionType } from "@/constants/Values";
import { UserState, toggleCurrentTheme, toggleThemeVal } from "@/store/redux/user";
import { formatChildData, getDate, getSunSign } from "@/utils/utils";
import { RootState, store } from "../../store/redux/store"; // Assuming your store.ts defines RootState

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  appBarTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    marginVertical: 16,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
    borderRadius: LightTheme.roundness,
  },
  input: {
    marginBottom: 12,
    borderRadius: LightTheme.roundness,
  },
  toggleTitle: {
    marginTop: 10,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  toggleRow: {
    justifyContent: "space-around",
    width: "100%",
    borderWidth: 1,
    borderRadius: LightTheme.roundness,
    overflow: "hidden",
  },
  toggleButton: {
    flex: 1,
    borderRadius: 0,
    borderWidth: 0,
  },
  toggleTextContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
  activeToggleText: {
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  inactiveToggleText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  predictButton: {
    marginTop: 20,
    borderRadius: LightTheme.roundness,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
  },
  predictButtonContent: {
    paddingVertical: 8,
  },
  predictButtonLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  predictionCard: {
    width: "100%",
    maxWidth: 600,
    marginVertical: 16,
    padding: 15,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
    borderRadius: LightTheme.roundness,
  },
  predictionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  predictionParagraph: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 4,
  },
});

const MainAppContent: React.FC = () => {
  const dispatch = useDispatch();

  const { isDarkTheme } = useSelector<RootState, UserState>((state) => state.user);

  const [isDarkThemeVal, setIsDarkThemeVal] = React.useState<boolean>(isDarkTheme);
  const [currentTheme, setCurrentTheme] = React.useState<CustomTheme>(isDarkTheme ? DarkTheme : LightTheme);

  const toggleTheme = React.useCallback((): void => {
    // Dispatch the action to toggle the theme in Redux
    setIsDarkThemeVal((prevTheme) => !prevTheme);
  }, []);

  React.useEffect(() => {
    // Update the current theme based on isDarkTheme
    setCurrentTheme(isDarkThemeVal ? DarkTheme : LightTheme);
    // Dispatch the action to update the theme in Redux
    dispatch(toggleThemeVal(isDarkThemeVal));
    dispatch(toggleCurrentTheme(isDarkThemeVal ? DarkTheme : LightTheme));
  }, [isDarkThemeVal, dispatch]);

  const [valuesChanged, setValuesChanged] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [dateOfBirth, setDateOfBirth] = React.useState<string>(""); // Format: dd-mm-yyyy
  const [timeOfBirth, setTimeOfBirth] = React.useState<string>(""); // Format: HH:MM
  const [predictionType, setPredictionType] = React.useState<PredictionType>("daily");
  const [headerInfo, setHeaderInfo] = React.useState<string>(""); // State to store userId
  const [stoneImage, setStoneImage] = React.useState<string | null>(null); // State to store userId
  const [stoneName, setStoneName] = React.useState<string | null>(null); // State to store userId
  const [sunSignName, setSunSignName] = React.useState<string | null>(null); // State to store userId

  const [predictions, setPredictions] = React.useState<Record<PredictionType, any>>({
    daily: "",
    monthly: "",
    yearly: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorVisible, setErrorVisible] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const showDialog = (): void => setErrorVisible(true);
  const hideDialog = (): void => setErrorVisible(false);

  React.useEffect(() => {
    // Update the current theme based on isDarkTheme
    setValuesChanged(true);
  }, [dateOfBirth, timeOfBirth, name]);

  // Function to call the Gemini API for astrology prediction
  const fetchPrediction = async (): Promise<void> => {
    // check values changed and prediction not already fetched
    if (!valuesChanged && predictions[predictionType] !== "") {
      // If values have changed, then make call
      return;
    }

    // Basic input validation
    if (!dateOfBirth) {
      setErrorMessage("Please fill Date of Birth.");
      showDialog();
      return;
    }

    // Date and time format validation (simple regex, can be more robust)
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!dateRegex.test(dateOfBirth)) {
      setErrorMessage("Please enter Date of Birth in dd-mm-yyyy format.");
      showDialog();
      return;
    }
    if (timeOfBirth && !timeRegex.test(timeOfBirth)) {
      setErrorMessage("Please enter Time of Birth in HH:MM format (24-hour).");
      showDialog();
      return;
    }
    setStoneImage(null);
    setStoneName(null);

    if (dateOfBirth) {
      const calculatedSunSign = getSunSign(dateOfBirth);

      setSunSignName(calculatedSunSign?.name || null);
      setStoneName(calculatedSunSign?.stoneName || null); // Set the image based on the calculated sun sign
      setStoneImage(calculatedSunSign?.stoneImage || null); // Set the image based on the calculated sun sign
    }

    setIsLoading(true);
    setPredictions((prev) => ({ ...prev, [predictionType]: "" })); // Clear previous prediction

    try {
      let chatHistory: { role: string; parts: { text: string }[] }[] = [];
      const { day, month, year } = getDate(dateOfBirth);
      const formattedDate = new Date(`${month}-${day}-${year}`).toDateString();

      // Construct the prompt for the LLM based on prediction type
      let predictionTypePrompt = `Please provide a ${predictionType} astrology prediction ${name ? "for " + name : ""}, who was born on ${formattedDate}  ${
        timeOfBirth ? "at " + timeOfBirth : ""
      }. Focus on general themes like career, relationships, and well-being. Keep it concise, around 3-4 paragraphs.`;
      let predictionTypeOutput = ` 
        **Today** - Include insight about career, learning and personal emotion.
        **Best Suited Colour(s)** - Include insight about the colours for the day and its significance in a single paragraph.
        **Best Suited Number(s)** - Include insight about the numbers for the day and its significance in a single paragraph.
        **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
      `;

      switch (predictionType) {
        case "monthly":
          predictionTypePrompt = `Please provide a ${predictionType} astrology prediction ${name ? "for " + name : ""}, who was born on ${formattedDate} ${
            timeOfBirth ? "at " + timeOfBirth : ""
          }. Focus on general themes like career, relationships, and well-being..`;
          predictionTypeOutput = ` 
          **Aspect** - Begin with a brief introduction that explains the significance of astrology and how the user's birth details will influence their astrological reading.
          **Sun Sign Characterstic** - Provide a summary of the user's sun sign, moon sign, and rising sign (ascendant), along with a brief explanation of each sign's characteristics with proper names and segregation.
          **Best Suited Colour(s)** - Include a very brief insight about the colours best suited for the month and its significance in a single paragraph.
          **Best Suited Number(s)** - Include a very brief insight about the numbers for the month and its significance in a single paragraph.
          **Best Day(s)** - Include a very brief insight about the name of best days for the month and its significance in a single paragraph.
          **Planets** - Offer insights into the positions of the planets at the time of birth, focusing on key aspects that may influence the user's life path, personality, and relationships with proper names and segregation.
          **Astrological Influence** - Discuss any notable astrological events (e.g., retrogrades, eclipses) occurring around the user's date of birth and their potential impact in a single paragraph.
          **Personalized Predictions** - Include detailed personalized predictions or guidance based on the user's astrological chart, touching upon areas such as career, love life, and personal growth in a single paragraph.
          **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
        `;
          break;
        case "yearly":
          predictionTypePrompt = `Please provide a ${predictionType} astrology prediction  ${name ? "for " + name : ""}, who was born on ${formattedDate} ${
            timeOfBirth ? "at " + timeOfBirth : ""
          }. Focus on general themes like career, relationships, and well-being..`;
          predictionTypeOutput = ` 
          **Aspect** - Begin with a brief introduction that explains the significance of astrology and how the user's birth details will influence their astrological reading.
          **Sun Sign Characterstic** - Provide a summary of the user's sun sign, moon sign, and rising sign (ascendant), along with a brief explanation of each sign's characteristics with proper names and segregation.
          **Best Suited Colour(s)** - Include insight about the colours best suited for the year and its significance in a single paragraph.
          **Best Suited Number(s)** - Include insight about the numbers for the year and its significance in a single paragraph.
          **Best Months(s)** - Include insight about the best months for the year and its significance in a single paragraph.
          **Planets** - Offer insights into the positions of the planets at the time of birth, focusing on key aspects that may influence the user's life path, personality, and relationships with proper names and segregation.
          **Astrological Influence** - Discuss any notable astrological events (e.g., retrogrades, eclipses) occurring around the user's date of birth and their potential impact in a single paragraph.
          **Personalized Predictions** - Include detailed personalized predictions or guidance based on the user's astrological chart, touching upon areas such as career, love life, and personal growth in a single paragraph.
          **Summary** - Conclude with a positive affirmation or advice that encourages the user to embrace their unique astrological influences and treat astrology only as guide in a single paragraph.
        `;
          break;
        default:
          break;
      }

      let prompt = `
      **Prompt:**

        ${predictionTypePrompt}

        The output should be structured in a clear and readable paragraphs titled with the following headings: 
        ${predictionTypeOutput}  
        Please ensure that the paragraphs are easy to read, with appropriate spacing and formatting. 
        `;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey: string = "AIzaSyB4QWpKSpNBBrznJvJGUDQ-Tr2HT0pxcO0"; // Canvas will provide this key at runtime
      const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response: Response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: any = await response.json();
      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        let text = result.candidates[0].content.parts[0].text;
        text = text?.split("\n\n**");
        text = text?.map((item: string) => item.trim());
        setHeaderInfo(text[0]);
        setPredictions((prev) => ({
          ...prev,
          [predictionType]: text,
        }));
        setValuesChanged(false);
      } else {
        console.error("Unexpected API response structure:", result);
        setErrorMessage("Failed to get a prediction. Please try again later.");
        showDialog();
      }
    } catch (error: any) {
      // Type as 'any' or 'Error'
      console.error("Error fetching prediction:", error);
      setErrorMessage(`An error occurred while fetching the prediction: ${error.message || "Unknown error"}. Please check your network connection.`);
      showDialog();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaperProvider theme={currentTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
          <Appbar.Header style={[styles.appBar, { backgroundColor: currentTheme.colors.primary }]}>
            <Appbar.Content title="Astrology Predictor" titleStyle={styles.appBarTitle} />
            <View style={styles.themeToggleContainer}>
              {/* <Text style={{ color: currentTheme.colors.text }}>Light</Text> */}
              <ToggleButton icon={"theme-light-dark"} onPress={toggleTheme} size={24} iconColor={currentTheme.colors.text} />

              {/* <Switch value={isDarkThemeVal} onValueChange={toggleTheme} color={currentTheme.colors.text} /> */}

              {/* <Text style={{ color: currentTheme.colors.text }}>Dark</Text> */}
            </View>
          </Appbar.Header>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Card style={[styles.card, { backgroundColor: currentTheme.colors.surface }]}>
              <Card.Content>
                <TextInput
                  label="Your Name"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={[styles.input, { backgroundColor: currentTheme.colors.surface }]}
                  outlineColor={currentTheme.colors.placeholder}
                  activeOutlineColor={currentTheme.colors.primary}
                  textColor={currentTheme.colors.text}
                  placeholderTextColor={currentTheme.colors.placeholder}
                  left={<TextInput.Icon icon="account" color={currentTheme.colors.text} />}
                />
                <TextInput
                  label="Date of Birth (dd-mm-yyyy)"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  mode="outlined"
                  style={[styles.input, { backgroundColor: currentTheme.colors.surface }]}
                  keyboardType="numeric"
                  placeholder="e.g., 15-01-1990"
                  outlineColor={currentTheme.colors.placeholder}
                  activeOutlineColor={currentTheme.colors.primary}
                  textColor={currentTheme.colors.text}
                  placeholderTextColor={currentTheme.colors.placeholder}
                  left={<TextInput.Icon icon="calendar" color={currentTheme.colors.text} />}
                />
                <TextInput
                  label="Time of Birth (HH:MM - 24hr)"
                  value={timeOfBirth}
                  onChangeText={setTimeOfBirth}
                  mode="outlined"
                  style={[styles.input, { backgroundColor: currentTheme.colors.surface }]}
                  keyboardType="numeric"
                  placeholder="e.g., 14:30"
                  outlineColor={currentTheme.colors.placeholder}
                  activeOutlineColor={currentTheme.colors.primary}
                  textColor={currentTheme.colors.text}
                  placeholderTextColor={currentTheme.colors.placeholder}
                  left={<TextInput.Icon icon="clock" color={currentTheme.colors.text} />}
                />

                <Text style={[styles.toggleTitle, { color: currentTheme.colors.text }]}>Prediction Type</Text>
                <ToggleButton.Row
                  onValueChange={(value: string) => value && setPredictionType(value as PredictionType)}
                  value={predictionType}
                  style={[
                    styles.toggleRow,
                    {
                      backgroundColor: currentTheme.colors.surface,
                      borderColor: currentTheme.colors.primary,
                    },
                  ]}
                >
                  <ToggleButton
                    icon="calendar-today"
                    value="daily"
                    style={styles.toggleButton}
                    iconColor={predictionType === "daily" ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-month"
                    value="monthly"
                    style={styles.toggleButton}
                    iconColor={predictionType === "monthly" ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-range"
                    value="yearly"
                    style={styles.toggleButton}
                    iconColor={predictionType === "yearly" ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                </ToggleButton.Row>
                <View style={styles.toggleTextContainer}>
                  <Text
                    style={
                      predictionType === "daily"
                        ? {
                            ...styles.activeToggleText,
                            color: currentTheme.colors.text,
                          }
                        : {
                            ...styles.inactiveToggleText,
                            color: currentTheme.colors.placeholder,
                          }
                    }
                  >
                    Daily
                  </Text>
                  <Text
                    style={
                      predictionType === "monthly"
                        ? {
                            ...styles.activeToggleText,
                            color: currentTheme.colors.text,
                          }
                        : {
                            ...styles.inactiveToggleText,
                            color: currentTheme.colors.placeholder,
                          }
                    }
                  >
                    Monthly
                  </Text>
                  <Text
                    style={
                      predictionType === "yearly"
                        ? {
                            ...styles.activeToggleText,
                            color: currentTheme.colors.text,
                          }
                        : {
                            ...styles.inactiveToggleText,
                            color: currentTheme.colors.placeholder,
                          }
                    }
                  >
                    Yearly
                  </Text>
                </View>

                <Button
                  mode="contained"
                  onPress={fetchPrediction}
                  loading={isLoading}
                  disabled={isLoading}
                  icon="star-four-points"
                  style={[styles.predictButton, { backgroundColor: currentTheme.colors.primary }]}
                  contentStyle={styles.predictButtonContent}
                  labelStyle={[styles.predictButtonLabel, { color: currentTheme.colors.secondary }]}
                >
                  Get Prediction
                </Button>
              </Card.Content>
            </Card>

            {isLoading && <ActivityIndicator animating={true} color={currentTheme.colors.primary} size="large" style={styles.loadingIndicator} />}
            {sunSignName && (
              <View>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 5,
                    color: currentTheme.colors.text,
                    textAlign: "center",
                  }}
                >
                  Hello {name ? name : "Friend"}!
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      color: currentTheme.colors.text,
                      flexDirection: "row",
                      marginRight: 10,
                    }}
                  >
                    Your Sun Sign is:{" "}
                    <Text
                      variant="bodyLarge"
                      style={{
                        fontWeight: "700",
                        color: currentTheme.colors.text,
                      }}
                    >
                      {sunSignName.toUpperCase()}
                    </Text>
                  </Text>
                  <SunSignSymbol height={30} width={30} name={sunSignName} isDarkTheme={isDarkThemeVal} />
                </View>
              </View>
            )}
            {stoneName && stoneImage && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                      color: currentTheme.colors.text,
                      textAlign: "center",
                    }}
                  >
                    Your lucky Gemstone
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                      color: currentTheme.colors.text,
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {stoneName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={stoneImage}
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </View>
            )}
            <Text
              variant="titleMedium"
              style={{
                fontWeight: "semibold",
                marginBottom: 0.5,
                color: currentTheme.colors.text,
              }}
            >
              {headerInfo}
            </Text>
            {predictions?.[predictionType] &&
              predictions?.[predictionType]?.map((txt: string, index: number) => {
                const splitData = txt.split("**\n\n");
                if (index > 0) {
                  return (
                    <Collapsible title={splitData[0]} key={`${index}header`} isOpenVal={true}>
                      <Text
                        style={{
                          color: currentTheme?.colors?.text,
                          borderColor: `${currentTheme?.colors?.placeholder}`,
                          borderWidth: 2,
                          borderRadius: 10,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          width: "100%",
                          borderTopColor: "transparent",
                          padding: 16,
                        }}
                      >
                        {formatChildData(splitData[0], splitData[1])}
                      </Text>
                    </Collapsible>
                  );
                } else return null;
              })}
          </ScrollView>

          <Portal>
            <Dialog visible={errorVisible} onDismiss={hideDialog} style={{ backgroundColor: currentTheme.colors.surface }}>
              <Dialog.Title style={{ color: currentTheme.colors.text }}>Error</Dialog.Title>
              <Dialog.Content>
                <Text style={{ color: currentTheme.colors.text }}>{errorMessage}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} labelStyle={{ color: currentTheme.colors.primary }}>
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

// The component that is exported and registered by AppRegistry
const AppWrapper: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <MainAppContent />
    </ReduxProvider>
  );
};

// Export AppWrapper as the default component
export default AppWrapper;
