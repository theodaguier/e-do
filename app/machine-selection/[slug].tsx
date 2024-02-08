import { Text } from "tamagui";
import { useLocalSearchParams } from "expo-router";

export default function MachineSelectionScreen() {
  const { slug } = useLocalSearchParams();

  console.log(slug);

  return <Text>MachineSelectionScreen {slug}</Text>;
}
