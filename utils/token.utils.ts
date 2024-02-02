import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkToken = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  if (userToken) {
    console.log("userToken", userToken);
  } else {
    console.log("no userToken");
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (e) {
    console.error(e);
  }

  console.log("Token removed.");
  removeToken();
};
