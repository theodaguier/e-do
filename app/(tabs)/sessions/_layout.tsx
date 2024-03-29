import { Stack } from "expo-router";

export default function SessionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Sessions",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sessionDetails/[slug]"
        options={{
          headerTitle: "Session details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
