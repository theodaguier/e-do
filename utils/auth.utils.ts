import { User } from "../types/user.type";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useSession } from "../ctx/auth";
import { set } from "zod";
import { useEffect, useState } from "react";

export const storeTokenToContext = async ({ token }: { token: string }) => {
  const { setToken } = useSession();

  setToken(token);

  // return tokenFromSecureStore;
};

export const auth = async ({
  username,
  password,
}: {
  username: User;
  password: User;
}) => {
  fetch("http://127.0.0.1:3333/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      console.log("token", data.token);

      SecureStore.setItemAsync("userToken", data.token);

      storeTokenToContext(data.token);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You are now logged in.",
      });
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not login. Please try again.",
      });
      console.error("Error:", error);
    });
};

// export const checkAuth = async () => {
//   const [token, setToken] = useState<string | null>(null);
//   let tokenFromSecureStore = null;

//   SecureStore.getItemAsync("userToken").then((data) => {
//     if (data) {
//       setToken(data);
//     }
//   });

//   useEffect(() => {
//     if (token) {
//       tokenFromSecureStore = "/(tabs)/";
//     } else {
//       tokenFromSecureStore = "/";
//     }
//   }, []);

//   return tokenFromSecureStore;
// };
