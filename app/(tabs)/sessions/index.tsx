import { View, Text, ListItem, YGroup, Separator } from "tamagui";
import { ActivityIndicator } from "react-native";
import { Container } from "../../../components/layout/container";
import { useSession } from "@/ctx/auth-context";
import { useEffect, useState } from "react";
import { getSessions } from "@/utils/session.utils";
import { ListChecks, ChevronRight } from "@tamagui/lucide-icons";
import { SessionType } from "@/types/session.type";
import { router } from "expo-router";

export default function ClientsScreen() {
  const { token } = useSession() as unknown as {
    token: string;
  };

  const [sessions, setSessions] = useState<SessionType[]>();

  useEffect(() => {
    const fetchSessionsData = async () => {
      try {
        const sessions = await getSessions({ token });

        setSessions(sessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions:", error);
      }
    };
    fetchSessionsData();
  }, [token]);

  return (
    <Container>
      <YGroup bordered className="min-w-full mb-8" separator={<Separator />}>
        {sessions ? (
          sessions.map((session) => (
            <YGroup.Item key={session.id}>
              <ListItem
                onPress={() =>
                  router.navigate(`sessions/sessionDetails/${session.id}`)
                }
                icon={ListChecks}
                title={session.client.brand}
                subTitle={session.client.name}
                iconAfter={ChevronRight}
              />
            </YGroup.Item>
          ))
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </YGroup>
    </Container>
  );
}
