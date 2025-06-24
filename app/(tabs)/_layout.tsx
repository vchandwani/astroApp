import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { UserState } from '@/store/redux/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux/store'; // Assuming your store.ts defines RootState

export default function TabLayout() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  
  const { isDarkTheme } = useSelector<RootState, UserState >((state) => state.user);
  
  React.useEffect(() => {
    // Log the color scheme whenever it changes
    setColorScheme(isDarkTheme ? 'dark' : 'light');
  },[isDarkTheme])

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[`${colorScheme}`].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
           },
          default: {
            backgroundColor: Colors[colorScheme].background,
            // display: 'none', // Hide the tab bar on Android
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
