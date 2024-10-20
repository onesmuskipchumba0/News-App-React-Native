import { amber, black } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
    PoppinsBlackItalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsExtraBoldItalic: require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Null = still loading
  const [authChecking, setAuthChecking] = useState(true); // Track auth state loading
  const router = useRouter();
  const segments = useSegments(); // Track current navigation segment

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update auth state
      setAuthChecking(false); // Auth state checked
      // Redirect to login if not authenticated and not already on the auth route
      if (!user && segments[0] !== 'auth') {
        router.replace('/auth/LoginPage'); // Navigate to login
      }
    });

    return unsubscribe; // Clean up the listener on unmount
  }, [segments]);

  // Hide the splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show a loading screen until fonts and auth state are resolved
  if (!fontsLoaded || authChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="navs/Entertainment"
            options={headerOptions('Entertainment')}
          />
          <Stack.Screen
            name="navs/Business"
            options={headerOptions('Business')}
          />
          <Stack.Screen
            name="navs/Featured"
            options={headerOptions('Featured')}
          />
          <Stack.Screen name="navs/Science" options={headerOptions('Science')} />
          <Stack.Screen name="navs/Sports" options={headerOptions('Sports')} />
          <Stack.Screen
            name="navs/Technology"
            options={headerOptions('Technology')}
          />
          <Stack.Screen
            name="navs/[search]"
            options={{ headerShown: false, headerStyle: { backgroundColor: black } }}
          />
          <Stack.Screen
            name="articles/[Article]"
            options={headerOptions('Article')}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}

// Helper function to return common header options
const headerOptions = (title: string) => ({
  title,
  headerStyle: {
    backgroundColor: black,
  },
  headerTintColor: amber,
});
