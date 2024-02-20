import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ListItem, YGroup, Separator } from "tamagui";
import { Container } from "../../../components/layout/container";
import { getEquipments } from "@/utils/equipments.utils";
import { useSession } from "@/ctx/auth-context";
import { Client } from "@/types/client.type";
import { Star, ChevronRight } from "@tamagui/lucide-icons";
import { FilterSheet } from "./filter-sheet";
import { useEquipmentFilter } from "@/ctx/equipment-filter-context";

export default function StudioScreen() {
  const { token } = useSession() as unknown as { token: string };

  const { selectedCategory } = useEquipmentFilter();
  const [equipments, setEquipments] = useState<Client[]>([]);

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
                    // onPress={() =>
                    //   router.navigate(`studio/details/${equipment.brand}`)
                    // }
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
    </>
  );
}
