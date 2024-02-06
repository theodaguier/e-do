import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import { DarkTheme } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../ctx/auth";

import {
  Home,
  KanbanSquare,
  Users,
  ClipboardList,
  Menu,
} from "@tamagui/lucide-icons";

export default function TabLayout() {
  const { token } = useSession();

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DarkTheme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: "Studio",
          tabBarIcon: ({ color }) => <KanbanSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Menu size={24} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text className="px-4">Log Out</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
