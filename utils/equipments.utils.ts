import { Client } from "../types/client.type";
import Toast from "react-native-toast-message";

export const getEquipments = async ({ token }: { token: string }) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/equipment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Erreur de requête réseau");
  }

  const data = await response.json();

  if (!data || !Array.isArray(data)) {
    throw new Error("Réponse invalide de l'API");
  }

  return data;
};

export const getEquipmentsQuery = async ({
  token,
  searchQuery,
}: {
  token: string;
  searchQuery: string | any;
}) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/equipment?category=${searchQuery}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Erreur de requête réseau");
  }

  const data = await response.json();

  if (!data || !Array.isArray(data)) {
    throw new Error("Réponse invalide de l'API");
  }

  return data;
};

export const createEquipment = async ({
  token,
  client,
}: {
  token: string;
  client: Client;
}) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/equipment`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error("Erreur de requête réseau");
  } else {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Client created successfully!",
    });
  }

  // const data = await response.json();

  // if (!data || !Array.isArray(data)) {
  //   throw new Error("Réponse invalide de l'API");
  // }

  // return data;
};
