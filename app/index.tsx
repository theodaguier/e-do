import { z } from "zod";
import { Input, Button, ListItem, YStack, H3, Form } from "tamagui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { auth } from "../utils/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types/user.type";
import { LoginSchema } from "../utils/validations/auth.utils";
import { Container } from "../components/layout/container";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { create } from "zustand";
import { useSession } from "../ctx/auth";
import { useEffect } from "react";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setUser: (use: User) => set({ use }),
  setToken: (token: string) => set({ token }),
}));

type LoginSchemaType = z.infer<typeof LoginSchema>;

const AuthScreen = () => {
  const { token, setToken } = useSession();
  console.log("token", token);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };

  const { handleSubmit, control } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (values) => {
    const user = {
      username: values.username as unknown as User,
      password: values.password as unknown as User,
    };

    auth(user);

    router.navigate("/(tabs)");
  };

  useEffect(() => {
    if (token) {
      router.navigate("/(tabs)");
    }
  }, [token]);

  return (
    <Container>
      <ListItem justifyContent="center">
        <YStack space width="100%">
          <H3>Login</H3>
          <Form onSubmit={() => console.log("sended")}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  className="w-full"
                  placeholder="username"
                  autoCapitalize="none"
                  right={10}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: true }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  className="w-full"
                  placeholder="password"
                  autoCapitalize="none"
                  secureTextEntry
                  right={10}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: true }}
            />

            <Button onPress={handleSubmit(onSubmit)}>Login</Button>
          </Form>
        </YStack>
      </ListItem>
    </Container>
  );
};

export default AuthScreen;
