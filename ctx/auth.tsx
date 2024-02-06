import React from "react";
import { User } from "../types/user.type";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext({
  user: null,
  token: null,
  setUser: (user: User) => {},
  setToken: (token: string) => {},
});

export const useSession = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | any>(null);
  const [token, setToken] = React.useState<string | any>(null);

  React.useEffect(() => {
    SecureStore.getItemAsync("user").then((data) => {
      if (data) {
        setUser(JSON.parse(data));
      }
    });

    SecureStore.getItemAsync("userToken").then((data) => {
      if (data) {
        setToken(data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
