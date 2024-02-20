import { Stack } from "expo-router";
import { Filter } from "@tamagui/lucide-icons";

export default function StudioLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Studio",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
