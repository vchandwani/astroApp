import {
  DefaultTheme, MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";


  export interface CustomTheme extends Omit<typeof DefaultTheme, 'colors'> { // Omit 'colors' from DefaultTheme
    colors: CustomColors & typeof DefaultTheme.colors; // Then add our CustomColors extending DefaultTheme's colors
  }
  
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
  

  // Define Light Theme for React Native Paper
  export const LightTheme: CustomTheme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
      ...DefaultTheme.colors, // Include default Paper colors if you want them
      primary: '#8b5cf6', // A deep purple for primary actions
      accent: '#03dac4',  // A teal for secondary actions
      background: '#f3f4f6', // Light gray background
      surface: '#ffffff', // White surface for cards and inputs
      text: '#1f2937', // Dark text for readability
      secondary: '#E0E0E0', // Dark text for readability
      placeholder: '#888888', // Gray for input placeholders
      onBackground: '#e2e4e9', // Gray for input placeholders
      backdrop: '#d3d7de', // Gray for input placeholders
    },
  };
  
  // Define Dark Theme for React Native Paper
  export const DarkTheme: CustomTheme = {
    ...PaperDarkTheme,
    roundness: 8,
    colors: {
      ...PaperDarkTheme.colors, // Include default Paper dark colors
      primary: '#374151', // Lighter purple for dark mode primary
      accent: '#888888',  // Teal accent
      background: '#1f2937', // Very dark background
      surface: '#1e1e1e', // Darker surface for cards and inputs
      text: '#E0E0E0', // White text for readability
      secondary: '#E0E0E0', // White text for readability
      placeholder: '#aaaaaa', // Lighter gray for input placeholders
      onBackground: '#2e3d52', // Gray for input placeholders
      backdrop: '#405572', // Gray for input placeholders
    },
  };
  

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
