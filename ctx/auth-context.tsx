import React from "react";
import { User } from "../types/user.type";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext({
  user: null,
  token: null,
  setUser: (user: User) => {},
  setToken: (token: string) => {},
  clearSession: () => {},
});

export const useSession = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | any>(null);
  const [token, setToken] = React.useState<string | any>(null);

  React.useEffect(() => {
    SecureStore.getItemAsync("user").then((data) => {
      console.log("user from secure store", data);
      if (data) {
        const userData = JSON.parse(data);
        setUser(userData);
      }
    });

    SecureStore.getItemAsync("userToken").then((data) => {
      if (data) {
        setToken(data);
      }
    });
  }, []);

  function clearSession() {
    SecureStore.deleteItemAsync("user");
    SecureStore.deleteItemAsync("userToken");
    setUser(null);
    setToken(null);
  }
  // clearSession();

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, clearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
