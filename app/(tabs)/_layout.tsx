import { Tabs, Redirect } from "expo-router";
import { Pressable } from "react-native";
import { Text, Avatar, View } from "tamagui";
import { DarkTheme } from "@react-navigation/native";
import { useSession } from "../../ctx/auth-context";
import { Search, PlusCircle } from "@tamagui/lucide-icons";
import { useSheets } from "@/ctx/sheets-context";

import {
  Home,
  KanbanSquare,
  Users,
  ClipboardList,
  Menu,
} from "@tamagui/lucide-icons";

import { User } from "../../types/user.type";

export default function TabLayout() {
  const { token, user, clearSession } = useSession() as unknown as {
    token: string;
    user: User;
    clearSession: () => void;
  };

  const {
    searchSheet,
    setSearchSheet,
    createClientSheet,
    setCreateClientSheet,
  } = useSheets();

  if (!token) {
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
          headerLeft: () => (
            <View className="px-4">
              <Pressable
                className="w-8 h-8 rounded-full bg-green-300 p-2 justify-center items-center"
                onPress={
                  createClientSheet
                    ? () => setCreateClientSheet(false)
                    : () => setCreateClientSheet(true)
                }
              >
                <PlusCircle size={20} color="#10B981" />
              </Pressable>
            </View>
          ),
          headerRight: () => (
            <View className="px-4">
              <Pressable
                className="w-8 h-8 rounded-full bg-blue-300 p-2 justify-center items-center"
                onPress={
                  searchSheet
                    ? () => setSearchSheet(false)
                    : () => setSearchSheet(true)
                }
              >
                <Search size={20} color="#3B82F6" />
              </Pressable>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Menu size={24} color={color} />,
          headerRight: () => (
            <Pressable onPress={clearSession}>
              <Text className="px-4">Log Out</Text>
            </Pressable>
          ),
          headerLeft: () =>
            user && (
              <View key={user.id} className="px-4">
                <Avatar circular size="$2">
                  <Avatar.Image src={`https://avatar.vercel.sh/${user.name}`} />
                  <Avatar.Fallback bc="red" />
                </Avatar>
              </View>
            ),
        }}
      />
    </Tabs>
  );
}
