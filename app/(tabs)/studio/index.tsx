import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ListItem, YGroup, Separator } from "tamagui";
import { Container } from "../../../components/layout/container";
import { getEquipments } from "@/utils/equipments.utils";
import { useSession } from "@/ctx/auth-context";
import { Star, ChevronRight } from "@tamagui/lucide-icons";
import { FilterSheet } from "./filter-sheet";
import { useEquipmentFilter } from "@/ctx/equipment-filter-context";
import { CreateEquipmentForm } from "./create-equipment-form-sheet";
import { Equipment } from "@/types/equipment.type";
import { EquipmentDetailsSheet } from "./equipment-details-sheet";
import { useSheets } from "@/ctx/sheets-context";
import { set } from "zod";

export default function StudioScreen() {
  const { token } = useSession() as unknown as { token: string };

  const { equipmentDetailsSheet, setEquipmentDetailsSheet } = useSheets();
  const { selectedCategory } = useEquipmentFilter();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );

  console.log("selectedEquipment", selectedEquipment);

  const [equipments, setEquipments] = useState<Equipment[]>([]);

  const handleEquipmentSelect = (equipment: Equipment) => {
    setEquipmentDetailsSheet(true);
    setSelectedEquipment(equipment);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEquipments = await getEquipments({ token });
        console.log("Equipments fetched:", fetchedEquipments);
        setEquipments(fetchedEquipments);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements:", error);
      }
    };
    fetchData();
  }, [token, selectedCategory]);

  return (
    <>
      <Container>
        <YGroup bordered className="min-w-full mb-8" separator={<Separator />}>
          {equipments.length > 0 ? (
            equipments
              .filter((equipment) =>
                selectedCategory
                  ? equipment.category === selectedCategory
                  : true
              )
              .map((equipment) => (
                <YGroup.Item key={equipment.id}>
                  <ListItem
                    onPress={() => handleEquipmentSelect(equipment)}
                    icon={Star}
                    title={equipment.name}
                    subTitle={equipment.category}
                    iconAfter={ChevronRight}
                  />
                </YGroup.Item>
              ))
          ) : (
            <ActivityIndicator size="small" color="black" />
          )}
        </YGroup>
      </Container>
      <FilterSheet />
      <EquipmentDetailsSheet equipment={selectedEquipment} />

      <CreateEquipmentForm />
    </>
  );
}
