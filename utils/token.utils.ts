import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useSession } from "../ctx/auth-context";

export const checkToken = async () => {
  const userToken = await SecureStore.getItemAsync("userToken");

  if (userToken) {
    console.log("userToken", userToken);
  } else {
    console.log("no userToken");
  }
};

export const removeToken = async () => {
  const { setToken } = useSession();
  try {
    await SecureStore.deleteItemAsync("userToken");
    setToken("");
    router.navigate("/");
  } catch (e) {
    console.error(e);
  }

  console.log("Token removed.");
  removeToken();
};
