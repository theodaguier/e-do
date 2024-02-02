import { z } from "zod";
import {
  Text,
  Input,
  Button,
  ListItem,
  YStack,
  H3,
  fullscreenStyle,
} from "tamagui";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { auth } from "../utils/auth.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./../types/user.type";
import { LoginSchema } from "../utils/validations/auth.utils";
import { Container } from "../components/layout/container";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useEffect, useState } from "react";

type LoginSchemaType = z.infer<typeof LoginSchema>;

const AuthScreen = () => {
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

    AsyncStorage.setItem("user", JSON.stringify(user));
    router.push("/(tabs)/");
  };

  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    // Utilisez une fonction asynchrone dans useEffect pour charger les données de manière asynchrone
    const loadSession = async () => {
      try {
        const user = await AsyncStorage.getItem("userToken");
        setSession(user);
      } catch (error) {
        console.error("Erreur lors du chargement de la session :", error);
      }
    };

    loadSession();
  }, []);

  if (session) {
    router.replace("/(tabs)/");
  }

  return (
    <Container>
      <ListItem justifyContent="center">
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

          <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        </YStack>
      </ListItem>
    </Container>
  );
};

export default AuthScreen;
