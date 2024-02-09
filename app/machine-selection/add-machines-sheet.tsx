import React, { useEffect, useState } from "react";
import { useSheets } from "@/ctx/sheets-context";
import { Container } from "@/components/layout/container";
import { XStack, Text, ListItem, YGroup } from "tamagui";
import { Sheet } from "tamagui";
import clsx from "clsx";
import { Plus, Minus } from "@tamagui/lucide-icons";
import { useSessionCreation } from "@/ctx/session-creation-context";
// import Toast from "react-native-toast-message";

export type MachineType = {
  name: string;
  start?: string;
};

export const AddMachinesSheet = () => {
  const { addMachineSheet, setAddMachineSheet } = useSheets();
  const { machinesSession, setMachinesSession } = useSessionCreation();
  const [selectedMachines, setSelectedMachines] = useState<MachineType[]>([]);

  const machines: MachineType[] = [
    { name: "Vertical" },
    { name: "Horizontal" },
    { name: "Eclipse" },
    { name: "Live" },
    { name: "Cyclorama" },
  ];

  const handleMachineSelect = (machine: MachineType) => {
    const isMachineSelected = selectedMachines.find(
      (selectedMachine) => selectedMachine.name === machine.name
    );

    if (isMachineSelected) {
      setSelectedMachines((prevSelected) =>
        prevSelected.filter(
          (selectedMachine) => selectedMachine.name !== machine.name
        )
      );
    } else {
      const selectedMachineWithStart: MachineType = {
        name: machine.name,
        start: new Date().toISOString(),
      };

      setSelectedMachines((prevSelected) => [
        ...prevSelected,
        selectedMachineWithStart,
      ]);
    }
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
              {machines.map((machine, index) => (
                <ListItem
                  key={index}
                  onPress={() => handleMachineSelect(machine)}
                  className={clsx(
                    "min-w-full",
                    selectedMachines.find(
                      (selectedMachine) => selectedMachine.name === machine.name
                    ) && "bg-blue-500"
                  )}
                  iconAfter={
                    selectedMachines.find(
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
