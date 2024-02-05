import "../tamagui.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import Toast from "react-native-toast-message";
import { checkAuth } from "../utils/auth.utils";
import { config } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { useAuthStore } from "../context/auth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const isConnected = async () => {
  const token = await checkAuth();

  if (token) {
    return "(tabs)";
  } else {
    return "/";
  }
};

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.

  initialRouteName: isConnected,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await checkAuth();
        setIsConnected(connected);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
        if (interLoaded || interError) {
          SplashScreen.hideAsync();
        }
      }
    };

    checkConnection();
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  console.log("isConnected", isConnected);

  return isConnected ? <RootLayoutConnectedNav /> : <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
      <Toast position="top" topOffset={60} />
    </>
  );
}

function RootLayoutConnectedNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
      <Toast position="top" topOffset={60} />
    </>
  );
}
