import { User } from "../types/user.type";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useSession } from "../ctx/auth-context";
import { router } from "expo-router";

export const storeTokenToSecureStore = async (token: string) => {
  await SecureStore.setItemAsync("userToken", token);
};

export const storeUserToSecureStore = async (user: User) => {
  await SecureStore.setItemAsync("user", JSON.stringify(user));
};

export const auth = async ({
  username,
  password,
}: {
  username: User;
  password: User;
}) => {
  try {
    const response = await fetch("http://127.0.0.1:3333/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    console.log("Success:", data);
    console.log("token", data.token.token);
    console.log("user test", data.user);

    // Stocker le token et l'utilisateur dans SecureStore
    await storeTokenToSecureStore(data.token.token);
    await storeUserToSecureStore(data.user);

    // Rediriger l'utilisateur après la connexion
    router.navigate("(tabs)");

    // Afficher un message de succès
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "You are now logged in.",
    });
  } catch (error) {
    // En cas d'erreur, afficher un message d'erreur
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Could not login. Please try again.",
    });
    console.error("Error:", error);
  }
};
