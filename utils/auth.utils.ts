import { User } from "../types/user.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const auth = ({
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
      AsyncStorage.setItem("userToken", data.token);
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

export const checkAuth = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return !!token;
};
