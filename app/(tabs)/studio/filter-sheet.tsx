import clsx from "clsx";
import { useEquipmentFilter } from "@/ctx/equipment-filter-context";
import { useSheets } from "@/ctx/sheets-context";
import { ListItem, XStack, YGroup } from "tamagui";
import { Sheet } from "tamagui";
import { set } from "zod";

export const FilterSheet = () => {
  const { selectedCategory, setSelectedCategory } = useEquipmentFilter();
  const { filterSheet, setFilterSheet } = useSheets();

  const categories = [
    { name: "All" },
    { name: "Cameras" },
    { name: "Consumables" },
    { name: "Machines" },
  ];

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Sheet
      open={filterSheet}
      onOpenChange={setFilterSheet}
      snapPoints={[50, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <XStack space="$2">
          <YGroup space="$2">
            {categories.map((category, index) => (
              <ListItem
                key={index}
                className={clsx(
                  "min-w-full",
                  selectedCategory === category.name && "bg-blue-500"
                )}
                onPress={() => handleCategorySelect(category.name)}
              >
                {category.name}
              </ListItem>
            ))}
          </YGroup>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};
