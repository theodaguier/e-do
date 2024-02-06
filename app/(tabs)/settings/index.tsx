import { View, Text } from "tamagui";
import { useAuthStore } from "../..";
import { removeToken } from "../../../utils/token.utils";
import { User } from "../../../types/user.type";
// import Avatar from "boring-avatars";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function SettingsScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");
        if (userStorage) {
          setUser(JSON.parse(userStorage));
        }
      } catch (error) {
        console.error("Error fetching user from AsyncStorage", error);
      }
    };

    fetchUser();
  }, []);

  console.log(user);

  return (
    <View>
      {/* <Avatar
        size={40}
        name="Maria Mitchell"
        variant="marble"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      /> */}
      {user && <Text>{user.username}</Text>}
    </View>
  );
}
