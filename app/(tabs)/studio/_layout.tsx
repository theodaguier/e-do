import { Stack } from "expo-router";

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
