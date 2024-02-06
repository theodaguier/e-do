import "../tamagui.css";
import React from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import Toast from "react-native-toast-message";
import { config } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AuthProvider } from "../ctx/auth-context";
import * as SecureStore from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.

//   initialRouteName: "/",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    try {
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      if (interLoaded || interError) {
        SplashScreen.hideAsync();
      }
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
          </AuthProvider>
        </ThemeProvider>
      </TamaguiProvider>
      <Toast position="top" topOffset={60} />
    </>
  );
}
