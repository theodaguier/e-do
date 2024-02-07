import { Stack } from "expo-router";

export default function ClientsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Clients",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
