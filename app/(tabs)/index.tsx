import {
  YStack,
  XStack,
  H2,
  H3,
  Text,
  Card,
  Button,
  View,
  H5,
  H4,
} from "tamagui";
import { Container } from "../../components/layout/container";
import { UserPlus } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

const TabOneScreen = () => {
  return (
    <Container>
      <YStack className="min-w-full" space>
        <H3>Quick actions</H3>
        <XStack space>
          <TouchableOpacity onPress={() => router.push("/clients/")}>
            <Card className="bg-blue-300" elevate size="$4" bordered>
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
          {/* <Card className="bg-blue-300" elevate size="$4" bordered>
            <Card.Header className="flex flex-row">
              <UserPlus size="24" color="black" />
            </Card.Header>
            <Card.Footer padded>
              <Button className="bg-blue-500 text-white" borderRadius="$10">
                Select a client
              </Button>
            </Card.Footer>
          </Card> */}
        </XStack>
      </YStack>
    </Container>
  );
};

export default TabOneScreen;
