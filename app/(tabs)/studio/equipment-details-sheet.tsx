import { useSheets } from "@/ctx/sheets-context";
import clsx from "clsx";
import { ListItem, Sheet, XStack, YGroup, Text, Input } from "tamagui";
import { Equipment } from "@/types/equipment.type";

export const EquipmentDetailsSheet = ({
  equipment,
}: {
  equipment: Equipment | null;
}) => {
  const { equipmentDetailsSheet, setEquipmentDetailsSheet } = useSheets();

  return (
    <Sheet
      open={equipmentDetailsSheet}
      onOpenChange={setEquipmentDetailsSheet}
      snapPoints={[50, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <XStack space="$2" className="flex-1">
          <YGroup space="$2">
            <ListItem
              className={clsx("min-w-full", false && "bg-blue-500")}
              onPress={() => {}}
            >
              <Input
                className="min-w-full"
                value={equipment && equipment.name}
              />
            </ListItem>
            <ListItem
              className={clsx("min-w-full", false && "bg-blue-500")}
              onPress={() => {}}
            >
              <Input
                className="min-w-full"
                value={equipment && equipment.category}
              />
            </ListItem>
          </YGroup>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};
