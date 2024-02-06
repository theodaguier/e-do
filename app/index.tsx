import { z } from "zod";
import { Input, Button, ListItem, YStack, H3, Form } from "tamagui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { auth } from "../utils/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types/user.type";
import { LoginSchema } from "../utils/validations/auth.utils";
import { router } from "expo-router";
import { useSession } from "../ctx/auth-context";
import { useEffect } from "react";
import * as SecureStorage from "expo-secure-store";

type LoginSchemaType = z.infer<typeof LoginSchema>;

const AuthScreen = () => {
  const { token } = useSession();

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
    try {
      auth(user).then((res) => {
        SecureStorage.setItemAsync("token", JSON.stringify(user));
      });
    } catch (error) {
      console.log("Error saving token", error);
    }
  };

  useEffect(() => {
    if (token) {
      router.navigate("(tabs)");
    }
  }, [token]);

  return (
    <ListItem className="flex-1 px-16" justifyContent="center">
      <YStack space width="100%">
        <H3>Login</H3>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="w-full"
              placeholder="username"
              autoCapitalize="none"
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
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <Button className="px-0" onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
      </YStack>
    </ListItem>
  );
};

export default AuthScreen;
