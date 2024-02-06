import { useState, useEffect } from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

import { Home } from "@tamagui/lucide-icons";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
