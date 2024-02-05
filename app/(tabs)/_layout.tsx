import React, { useState, useEffect } from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Home,
  KanbanSquare,
  Users,
  ClipboardList,
  Menu,
} from "@tamagui/lucide-icons";
export default function TabLayout() {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    // Utilisez une fonction asynchrone dans useEffect pour charger les données de manière asynchrone
    const loadSession = async () => {
      try {
        const user = await AsyncStorage.getItem("userToken");
        setSession(user);
      } catch (error) {
        console.error("Erreur lors du chargement de la session :", error);
      }
    };

    loadSession();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       <Text className="px-4">Hello!</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       <Text className="px-4">Hello!</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="studio"
        options={{
          title: "Studio",
          tabBarIcon: ({ color }) => <KanbanSquare size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       <Text className="px-4">Hello!</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: "Clients",
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       <Text className="px-4">Hello!</Text>
          //     </Pressable>
          //   </Link>
          // ),
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
