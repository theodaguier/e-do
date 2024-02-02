import React, { useState, useEffect } from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Text>Hello!</Text>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                <Text className="px-4">Hello!</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <Text>Hello!</Text>,
        }}
      />
    </Tabs>
  );
}
