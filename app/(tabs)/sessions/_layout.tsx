import { useState, useEffect } from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

import { Home } from "@tamagui/lucide-icons";
export default function SessionsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sessions",
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
    </Tabs>
  );
}
