import { Text, Button, YStack, H1 } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { Container } from "@/components/layout/container";
import { useLocalSearchParams } from "expo-router";
import { useSession } from "@/ctx/auth-context";
import { useEffect, useState } from "react";
import { getClientsQuery } from "@/utils/clients.utils";
import { Client } from "@/types/client.type";
import { AddMachinesSheet } from "./add-machines-sheet";
import { useSheets } from "@/ctx/sheets-context";
import { useSessionCreation } from "@/ctx/session-creation-context";
import { storeSession } from "@/utils/session.utils";

export default function MachineSelectionScreen() {
  const { slug } = useLocalSearchParams();
  const { token } = useSession() as unknown as {
    token: string;
  };

  const { addMachineSheet, setAddMachineSheet } = useSheets();
  const [client, setClient] = useState<Client>();
  const {
    sessionCreation,
    setSessionCreation,
    machinesSession,
    sessionClient,
    setSessionClient,
  } = useSessionCreation();

  useEffect(() => {
    setSessionClient({ id: client?.id });
  }, [client]);

  useEffect(() => {
    setSessionCreation([
      {
        client: sessionClient,
        machinesSession: machinesSession,
      },
    ]);
  }, [machinesSession]);

  console.log("sessionCreation)", sessionCreation);

  useEffect(() => {
    const searchQuery = slug;
    const fetchClient = async () => {
      try {
        const client = await getClientsQuery({ token, searchQuery });
        setClient(client[0]);
      } catch (error) {
        console.error("Erreur lors de la récupération du client:", error);
      }
    };
    fetchClient();
  }, [slug, token]);

  const postSession = async () => {
    console.log("sessionCreation before to send", sessionCreation);

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(sessionCreation),
    });

    const responseData = await response.json();
    console.log("response", responseData);
  };

  return (
    <>
      <Container>
        <YStack space>
          <Button
            iconAfter={Plus}
            className="min-w-full"
            backgroundColor="#3B82F6"
            onPress={() => setAddMachineSheet(true)}
          >
            Machine
          </Button>
          <Button
            iconAfter={Plus}
            className="min-w-full"
            backgroundColor="#3B82F6"
            onPress={() => console.log("Create a session")}
          >
            Equipments
          </Button>
          <Button onPress={postSession}>Confirm</Button>
        </YStack>
      </Container>
      <AddMachinesSheet />
    </>
  );
}
