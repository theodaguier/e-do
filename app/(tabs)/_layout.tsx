import { Link, Tabs, Redirect } from "expo-router";
import { Pressable } from "react-native";
import { Text, Avatar, View } from "tamagui";
import { DarkTheme } from "@react-navigation/native";
import { useSession } from "../../ctx/auth-context";
import { removeToken } from "../../utils/token.utils";

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
    user: User[];
    clearSession: () => void;
  };

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
          // headerLeft: () =>
          //   user &&
          //   user.map((u: any) => (
          //     <View key={u.id} className="px-4">
          //       <Avatar circular size="$2">
          //         <Avatar.Image
          //           src={`https://avatar.vercel.sh/${u.username}`}
          //         />
          //         <Avatar.Fallback bc="red" />
          //       </Avatar>
          //     </View>
          //   )),
        }}
      />
    </Tabs>
  );
}
