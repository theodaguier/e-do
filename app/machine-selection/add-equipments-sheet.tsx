import { useSheets } from "@/ctx/sheets-context";
import { Container } from "@/components/layout/container";
import { XStack, Input, Button, Text } from "tamagui";
import { Sheet } from "tamagui";

export const AddEquipmentsSheet = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  handleSearch: () => void;
}) => {
  const { addEquipmentSheet, setAddEquipmentSheet } = useSheets();

  return (
    <Sheet
      open={addEquipmentSheet}
      onOpenChange={setAddEquipmentSheet}
      snapPoints={[20, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Container>
          <XStack className="min-w-full" alignItems="center" space="$2">
            <Input
              className="flex-1"
              size="$4"
              placeholder={"Nom du client"}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoCapitalize="none"
            />
            <Button size="$4" onPress={handleSearch}>
              <Text>Search</Text>
            </Button>
          </XStack>
        </Container>
      </Sheet.Frame>
    </Sheet>
  );
};
