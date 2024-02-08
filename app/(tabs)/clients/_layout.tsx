import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function ClientsLayout() {
  const { slug } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Clients",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details/[slug]"
        options={{
          headerTitle: "Client details",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
