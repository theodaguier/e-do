import clsx from "clsx";
import { YStack, XStack, H3, Card, Button, SizableText } from "tamagui";
import { Container } from "../../components/layout/container";
import { UserPlus } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useSession } from "../../ctx/auth-context";

import { getSessions } from "@/utils/session.utils";
import { useState, useEffect } from "react";
import { SessionType } from "@/types/session.type";
import { User } from "@/types/user.type";

const HomeScreen = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const { token, user } = useSession() as unknown as {
    token: string;
    user: User;
  };

  useEffect(() => {
    getSessions({ token }).then((res) => {
      setSessions(res);
    });
  }, [token]);

  console.log(sessions);

  return (
    <Container>
      <YStack className="min-w-full pb-8" space>
        <H3>Welcome back {user.name} </H3>

        <SizableText
          className={clsx(
            sessions.length > 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {sessions.length > 0
            ? `We have found ${sessions.length} current sessions for you.`
            : "You don't have sessions for the moment. You can create one by selecting a client."}
        </SizableText>

        <XStack className="flex flex-col">
          {sessions.map((session) => {
            return (
              <Card key={session.id} className="my-2" bordered>
                <Card.Header className="flex flex-row justify-between">
                  <SizableText>{session?.client.name}</SizableText>
                  <SizableText className="text-gray-500">
                    {session?.machinesSession.length} Machines
                  </SizableText>
                </Card.Header>
                <Card.Header padded>
                  <Button
                    className="bg-blue-500 text-white"
                    borderRadius="$8"
                    onPress={() =>
                      router.navigate(`sessions/sessionDetails/${session.id}`)
                    }
                  >
                    <SizableText>See more</SizableText>
                  </Button>
                </Card.Header>
              </Card>
            );
          })}

          <TouchableOpacity onPress={() => router.push("/clients/")}>
            <Card className="bg-white" elevate size="$4" bordered>
              <Card.Header className="flex flex-row">
                <UserPlus size="24" color="black" />
              </Card.Header>
              <Card.Footer padded>
                <Button
                  className="bg-blue-500 text-white"
                  borderRadius="$10"
                  onPress={() => router.push("/clients/")}
                >
                  Select a client
                </Button>
              </Card.Footer>
            </Card>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </Container>
  );
};

export default HomeScreen;
