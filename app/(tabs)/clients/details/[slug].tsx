import { useLocalSearchParams } from "expo-router";
import { YStack, YGroup, Separator, ListItem, Button } from "tamagui";
import { getClientsQuery } from "@/utils/clients.utils";
import { useState, useEffect } from "react";
import { Client } from "@/types/client.type";
import { useSession } from "@/ctx/auth-context";
import { Container } from "@/components/layout/container";
import { router } from "expo-router";

export default function ClientDetailsScreen() {
  const { slug } = useLocalSearchParams();

  const { token } = useSession() as unknown as {
    token: string;
  };
  const [client, setClient] = useState<Client>();

  console.log("client", client);

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

  return (
    <Container>
      <YStack space>
        <YGroup className="min-w-full" separator={<Separator />}>
          <YGroup.Item>
            <ListItem title={client?.brand} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={client?.name} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={client?.phone} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={client?.email} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={client?.siren} />
          </YGroup.Item>
        </YGroup>

        <YGroup>
          <YGroup.Item>
            <ListItem>
              <Button
                className="flex-1"
                backgroundColor="#3B82F6"
                onPress={() => router.navigate(`/machine-selection/${slug}`)}
              >
                Create a session
              </Button>
            </ListItem>
          </YGroup.Item>
          <YGroup.Item>
            <ListItem>
              <Button className="flex-1" backgroundColor="#EF4444">
                Delete this client
              </Button>
            </ListItem>
          </YGroup.Item>
        </YGroup>
      </YStack>
    </Container>
  );
}
