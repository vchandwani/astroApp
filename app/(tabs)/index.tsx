import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  DefaultTheme,
  Dialog,
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  Portal,
  Switch,
  TextInput,
  ToggleButton
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Extend DefaultTheme and PaperDarkTheme to include custom colors if necessary,
// though Paper already provides types for its theme structure.
interface CustomColors {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  placeholder: string;
}

interface CustomTheme extends Omit<typeof DefaultTheme, 'colors'> { // Omit 'colors' from DefaultTheme
  colors: CustomColors & typeof DefaultTheme.colors; // Then add our CustomColors extending DefaultTheme's colors
}


// Define Light Theme for React Native Paper
const LightTheme: CustomTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors, // Include default Paper colors if you want them
    primary: '#6200ee', // A deep purple for primary actions
    accent: '#03dac4',  // A teal for secondary actions
    background: '#f6f6f6', // Light gray background
    surface: '#ffffff', // White surface for cards and inputs
    text: '#333333', // Dark text for readability
    placeholder: '#888888', // Gray for input placeholders
  },
};

// Define Dark Theme for React Native Paper
const DarkTheme: CustomTheme = {
  ...PaperDarkTheme,
  roundness: 8,
  colors: {
    ...PaperDarkTheme.colors, // Include default Paper dark colors
    primary: '#bb86fc', // Lighter purple for dark mode primary
    accent: '#03dac6',  // Teal accent
    background: '#121212', // Very dark background
    surface: '#1e1e1e', // Darker surface for cards and inputs
    text: '#ffffff', // White text for readability
    placeholder: '#aaaaaa', // Lighter gray for input placeholders
  },
};

type PredictionType = 'daily' | 'monthly' | 'yearly';

const App: React.FC = () => {
  const scheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(scheme === 'dark');
  const toggleTheme = React.useCallback((): void => {
    setIsDarkTheme(prevTheme => !prevTheme);
  }, []);

  const currentTheme: CustomTheme = isDarkTheme ? DarkTheme : LightTheme;

  const [name, setName] = React.useState<string>('');
  const [dateOfBirth, setDateOfBirth] = React.useState<string>(''); // Format: YYYY-MM-DD
  const [timeOfBirth, setTimeOfBirth] = React.useState<string>(''); // Format: HH:MM
  const [predictionType, setPredictionType] = React.useState<PredictionType>('daily');
  const [predictionText, setPredictionText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorVisible, setErrorVisible] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const showDialog = (): void => setErrorVisible(true);
  const hideDialog = (): void => setErrorVisible(false);

  // Function to call the Gemini API for astrology prediction
  const fetchPrediction = async (): Promise<void> => {
    // Basic input validation
    if (!name || !dateOfBirth || !timeOfBirth) {
      setErrorMessage('Please fill in all fields (Name, Date of Birth, Time of Birth).');
      showDialog();
      return;
    }

    // Date and time format validation (simple regex, can be more robust)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    if (!dateRegex.test(dateOfBirth)) {
      setErrorMessage('Please enter Date of Birth in YYYY-MM-DD format.');
      showDialog();
      return;
    }
    if (!timeRegex.test(timeOfBirth)) {
      setErrorMessage('Please enter Time of Birth in HH:MM format (24-hour).');
      showDialog();
      return;
    }

    setIsLoading(true);
    setPredictionText(''); // Clear previous prediction

    try {
      let chatHistory: { role: string; parts: { text: string }[] }[] = [];
      const prompt: string = `Please provide a ${predictionType} astrology prediction for ${name}, who was born on ${dateOfBirth} at ${timeOfBirth}. Focus on general themes like career, relationships, and well-being. Keep it concise, around 3-4 paragraphs.`;

      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey: string = ""; // Canvas will provide this key at runtime
      const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response: Response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result: any = await response.json(); // Type as 'any' or define a more specific interface for API response

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text: string = result.candidates[0].content.parts[0].text;
        setPredictionText(text);
      } else {
        console.error('Unexpected API response structure:', result);
        setErrorMessage('Failed to get a prediction. Please try again later.');
        showDialog();
      }
    } catch (error: any) { // Type as 'any' or 'Error'
      console.error('Error fetching prediction:', error);
      setErrorMessage(`An error occurred while fetching the prediction: ${error.message || 'Unknown error'}. Please check your network connection.`);
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
              <Text style={{ color: currentTheme.colors.text }}>Light</Text>
              <Switch value={isDarkTheme} onValueChange={toggleTheme} color={currentTheme.colors.accent} />
              <Text style={{ color: currentTheme.colors.text }}>Dark</Text>
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
                  label="Date of Birth (YYYY-MM-DD)"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  mode="outlined"
                  style={[styles.input, { backgroundColor: currentTheme.colors.surface }]}
                  keyboardType="numeric"
                  placeholder="e.g., 1990-01-15"
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

                <Text    style={[styles.toggleTitle, { color: currentTheme.colors.text }]}>Prediction Type</Text>
                <ToggleButton.Row
                  onValueChange={(value: string) => value && setPredictionType(value as PredictionType)}
                  value={predictionType}
                  style={[styles.toggleRow, { backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.primary }]}
                >
                  <ToggleButton
                    icon="calendar-today"
                    value="daily"
                    style={styles.toggleButton}
                    iconColor={predictionType === 'daily' ? currentTheme.colors.primary : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-month"
                    value="monthly"
                    style={styles.toggleButton}
                    iconColor={predictionType === 'monthly' ? currentTheme.colors.primary : currentTheme.colors.placeholder}
                  />
                  <ToggleButton
                    icon="calendar-range"
                    value="yearly"
                    style={styles.toggleButton}
                    iconColor={predictionType === 'yearly' ? currentTheme.colors.primary : currentTheme.colors.placeholder}
                  />
                </ToggleButton.Row>
                <View style={styles.toggleTextContainer}>
                  <Text style={predictionType === 'daily' ? { ...styles.activeToggleText, color: currentTheme.colors.primary } : { ...styles.inactiveToggleText, color: currentTheme.colors.placeholder }}>Daily</Text>
                  <Text style={predictionType === 'monthly' ? { ...styles.activeToggleText, color: currentTheme.colors.primary } : { ...styles.inactiveToggleText, color: currentTheme.colors.placeholder }}>Monthly</Text>
                  <Text style={predictionType === 'yearly' ? { ...styles.activeToggleText, color: currentTheme.colors.primary } : { ...styles.inactiveToggleText, color: currentTheme.colors.placeholder }}>Yearly</Text>
                </View>

                <Button
                  mode="contained"
                  onPress={fetchPrediction}
                  loading={isLoading}
                  disabled={isLoading}
                  icon="star-four-points"
                  style={[styles.predictButton, { backgroundColor: currentTheme.colors.primary }]}
                  contentStyle={styles.predictButtonContent}
                  labelStyle={styles.predictButtonLabel}
                >
                  Get Prediction
                </Button>
              </Card.Content>
            </Card>

            {isLoading && (
              <ActivityIndicator animating={true} color={currentTheme.colors.primary} size="large" style={styles.loadingIndicator} />
            )}

            {predictionText ? (
              <Card style={[styles.predictionCard, { backgroundColor: currentTheme.colors.surface }]}>
                <Card.Content>
                  <Text style={[styles.predictionTitle, { color: currentTheme.colors.primary }]}>Your {predictionType} Prediction</Text>
                  <Text  style={[styles.predictionParagraph, { color: currentTheme.colors.text }]}>{predictionText}</Text>
                </Card.Content>
              </Card>
            ) : null}
          </ScrollView>

          <Portal>
            <Dialog visible={errorVisible} onDismiss={hideDialog} style={{ backgroundColor: currentTheme.colors.surface }}>
              <Dialog.Title style={{ color: currentTheme.colors.text }}>Error</Dialog.Title>
              <Dialog.Content>
                <Text style={{ color: currentTheme.colors.text }}>{errorMessage}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} labelStyle={{ color: currentTheme.colors.primary }}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  appBarTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  card: {
    width: '100%',
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleRow: {
    justifyContent: 'space-around',
    width: '100%',
    borderWidth: 1,
    borderRadius: LightTheme.roundness,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    borderRadius: 0,
    borderWidth: 0,
  },
  toggleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  activeToggleText: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  inactiveToggleText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
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
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  predictionCard: {
    width: '100%',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  predictionParagraph: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default App;
