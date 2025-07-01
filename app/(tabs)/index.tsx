import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Button, Card, Dialog, Provider as PaperProvider, Portal, Text, TextInput, ToggleButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";

import { Collapsible } from "@/components/Collapsible";
import DateTimeComponent from "@/components/DatePicker";
import SunSignSymbol from "@/components/SunSignSymbol";
import { CustomTheme, DarkTheme, LightTheme } from "@/constants/Colors";
import {
  DAILY,
  DAILY_PREDICTION_PROMPT,
  DATE_FORMAT_APICALL,
  DATE_FORMAT_DDMMYYY,
  DATE_OF_BIRTH,
  DATE_OF_BIRTH_PLACEHOLDER,
  GET_PREDICTION,
  MONTHLY,
  MONTHLY_PREDICTION_PROMPT,
  NAME,
  PredictionType,
  TIME_OF_BIRTH,
  TIME_OF_BIRTH_PLACEHOLDER,
  YEARLY,
  YEARLY_PREDICTION_PROMPT,
  YOUR_LUCKY_GEMSTONE,
  YOUR_NAME,
  YOUR_SUN_SIGN,
} from "@/constants/Values";
import { UserState, toggleCurrentTheme, toggleThemeVal } from "@/store/redux/user";
import { formatChildData, getDate, getSunSign } from "@/utils/utils";
import moment from "moment";
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
    textTransform: "capitalize",
  },
  inactiveToggleText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    textTransform: "capitalize",
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
    const timeRegex = /^\d{1}:\d{2} [AaPp][Mm]$/;

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
      const dateStringDDMMYYYY = `${day}-${month}-${year})}`;

      const momentDate = moment(dateStringDDMMYYYY, DATE_FORMAT_DDMMYYY);
      const formattedDate = momentDate.format(DATE_FORMAT_APICALL);

      // Construct the prompt for the LLM based on prediction type
      let predictionTypePrompt = `Please provide a ${predictionType} astrology prediction ${name ? "for " + name : ""}, who was born on ${formattedDate}  ${
        timeOfBirth ? "at " + timeOfBirth : ""
      }. Focus on general themes like career, relationships, and well-being. Keep it concise, around 3-4 paragraphs.`;
      let predictionTypeOutput = DAILY_PREDICTION_PROMPT;

      switch (predictionType) {
        case "monthly":
          predictionTypePrompt = `Please provide a ${predictionType} astrology prediction ${name ? "for " + name : ""}, who was born on ${formattedDate} ${
            timeOfBirth ? "at " + timeOfBirth : ""
          }. Focus on general themes like career, relationships, and well-being..`;
          predictionTypeOutput = MONTHLY_PREDICTION_PROMPT;
          break;
        case "yearly":
          predictionTypePrompt = `Please provide a ${predictionType} astrology prediction  ${name ? "for " + name : ""}, who was born on ${formattedDate} ${
            timeOfBirth ? "at " + timeOfBirth : ""
          }.  Focus on general themes like career, relationships, and well-being..`;
          predictionTypeOutput = YEARLY_PREDICTION_PROMPT;
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
                  label={YOUR_NAME}
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={[styles.input, { backgroundColor: currentTheme.colors.surface }]}
                  outlineColor={currentTheme.colors.placeholder}
                  activeOutlineColor={currentTheme.colors.primary}
                  textColor={currentTheme.colors.text}
                  placeholderTextColor={currentTheme.colors.placeholder}
                  left={<TextInput.Icon icon="account" color={currentTheme.colors.text} />}
                  placeholder={NAME}
                />
                <DateTimeComponent
                  label={DATE_OF_BIRTH}
                  placeholder={DATE_OF_BIRTH_PLACEHOLDER}
                  icon="calendar"
                  currentTheme={currentTheme}
                  styles={styles}
                  onChange={setDateOfBirth}
                  isDarkTheme={isDarkThemeVal}
                  mode={"date"}
                />
                <DateTimeComponent
                  label={TIME_OF_BIRTH}
                  placeholder={TIME_OF_BIRTH_PLACEHOLDER}
                  icon={"clock"}
                  currentTheme={currentTheme}
                  styles={styles}
                  onChange={setTimeOfBirth}
                  isDarkTheme={isDarkThemeVal}
                  mode={"time"}
                  dateFormat={"h:mm a"}
                  is24Hour={false}
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
                    value={DAILY}
                    style={styles.toggleButton}
                    iconColor={predictionType === DAILY ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-month"
                    value={MONTHLY}
                    style={styles.toggleButton}
                    iconColor={predictionType === MONTHLY ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-range"
                    value={YEARLY}
                    style={styles.toggleButton}
                    iconColor={predictionType === YEARLY ? currentTheme.colors.text : currentTheme.colors.placeholder}
                  />
                </ToggleButton.Row>
                <View style={styles.toggleTextContainer}>
                  <Text
                    style={
                      predictionType === DAILY
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
                    {DAILY}
                  </Text>
                  <Text
                    style={
                      predictionType === MONTHLY
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
                    {MONTHLY}
                  </Text>
                  <Text
                    style={
                      predictionType === YEARLY
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
                    {YEARLY}
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
                  {GET_PREDICTION}
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
                    {YOUR_SUN_SIGN}{" "}
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
                      width: "100%",
                    }}
                  >
                    {YOUR_LUCKY_GEMSTONE}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                      color: currentTheme.colors.text,
                      textAlign: "center",
                      width: "100%",
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
            {predictions?.[predictionType]?.length > 0 &&
              predictions?.[predictionType]?.map((txt: string, index: number) => {
                const splitData = txt.split("**\n\n");
                if (index > 0) {
                  return (
                    <Collapsible title={splitData[0]} key={`${splitData[0]}_header`} isOpenVal={true}>
                      <View
                        style={{
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
                        {formatChildData(splitData[0], splitData[1], currentTheme)}
                      </View>
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
