import { useEffect, useState } from "react";
import { useSheets } from "@/ctx/sheets-context";
import { Container } from "@/components/layout/container";
import { XStack, Text, ListItem, YGroup } from "tamagui";
import { Sheet } from "tamagui";
import clsx from "clsx";
import { Plus, Minus } from "@tamagui/lucide-icons";

export type MachineType = {
  id: number;
  name: string;
  startTime?: string;
  enTime?: string;
};

export const SessionAddMachinesSheet = ({
  setMachinesSession,
  machinesInSession,
}: {
  setMachinesSession: (machines: MachineType[]) => void;
  machinesInSession: string[] | any;
}) => {
  const { addMachineSheet, setAddMachineSheet } = useSheets();
  const [selectedMachines, setSelectedMachines] = useState<MachineType[]>([]);

  const machines: MachineType[] = [
    { id: 1, name: "Vertical" },
    { id: 2, name: "Horizontal" },
    { id: 3, name: "Eclipse" },
    { id: 4, name: "Live" },
    { id: 5, name: "Cyclorama" },
  ];

  const handleMachineSelect = (machine: MachineType) => {
    const isMachineSelected = selectedMachines.some(
      (selectedMachine) => selectedMachine.name === machine.name
    );

    if (isMachineSelected) {
      setSelectedMachines((prevSelected) =>
        prevSelected.filter(
          (selectedMachine) => selectedMachine.name !== machine.name
        )
      );
    } else {
      setSelectedMachines((prevSelected) => [
        ...prevSelected,
        { ...machine, startTime: new Date().toISOString() },
      ]);
    }
  };

  const filterMachines = (machine: MachineType) => {
    return !machinesInSession.includes(machine.name);
  };

  useEffect(() => {
    setMachinesSession(selectedMachines);
  }, [selectedMachines]);

  return (
    <Sheet
      open={addMachineSheet}
      onOpenChange={setAddMachineSheet}
      snapPoints={[50, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Container>
          <XStack className="min-w-full" alignItems="center" space="$2">
            <YGroup space="$2">
              {machines.filter(filterMachines).map((machine, index) => (
                <ListItem
                  key={index}
                  onPress={() => handleMachineSelect(machine)}
                  className={clsx("min-w-full")}
                  iconAfter={
                    selectedMachines.some(
                      (selectedMachine) => selectedMachine.name === machine.name
                    ) ? (
                      <Minus />
                    ) : (
                      <Plus />
                    )
                  }
                >
                  {machine.name}
                </ListItem>
              ))}
            </YGroup>
          </XStack>
        </Container>
      </Sheet.Frame>
    </Sheet>
  );
};
