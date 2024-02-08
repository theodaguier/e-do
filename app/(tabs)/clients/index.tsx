import {
  ListItem,
  YGroup,
  Separator,
  XStack,
  Input,
  Button,
  Text,
} from "tamagui";
import { Container } from "../../../components/layout/container";
import { getClients, getClientsQuery } from "@/utils/clients.utils";
import { useEffect, useState } from "react";
import { useSession } from "@/ctx/auth-context";
import { Client } from "@/types/client.type";
import { User, ChevronRight } from "@tamagui/lucide-icons";
import { ActivityIndicator } from "react-native";
import { SearchSheet } from "./search-sheet";
import { CreateClientSheet } from "./create-client-sheet";
import { router } from "expo-router";

export default function ClientsScreen() {
  const { token } = useSession() as unknown as {
    token: string;
  };

  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clients = await getClients({ token });
        setClients(clients);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
      }
    };
    fetchClients();
  }, [token]);

  const handleSearch = async () => {
    try {
      const filteredClients = await getClientsQuery({ token, searchQuery });
      setSearchResults(filteredClients);
    } catch (error) {
      console.error("Erreur lors de la recherche des clients:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    setClients(searchResults);
  }, [searchResults]);

  return (
    <>
      <Container>
        <YGroup bordered className="min-w-full mb-8" separator={<Separator />}>
          {clients ? (
            clients.map((client) => (
              <YGroup.Item key={client.id}>
                <ListItem
                  onPress={() =>
                    router.navigate(`clients/details/${client.brand}`)
                  }
                  icon={User}
                  title={client.brand}
                  subTitle={client.name}
                  iconAfter={ChevronRight}
                />
              </YGroup.Item>
            ))
          ) : (
            <ActivityIndicator size="small" color="black" />
          )}
        </YGroup>
      </Container>
      <SearchSheet
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <CreateClientSheet />
    </>
  );
}
