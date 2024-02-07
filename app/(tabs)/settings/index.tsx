import { View, Text } from "tamagui";
import { useSession } from "../../../ctx/auth-context";
import { User } from "../../../types/user.type";
import { Container } from "../../../components/layout/container";

export default function SettingsScreen() {
  const { user } = useSession() as unknown as { user: User };

  return (
    <Container>
      <View className="flex flex-row">
        <Text>You are connected as </Text>

        {user && <Text>{user.username}</Text>}
      </View>
    </Container>
  );
}
