import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import {
  YStack,
  YGroup,
  Separator,
  ListItem,
  Button,
  SizableText,
  Dialog,
  XStack,
} from "tamagui";
import { getSessionQuery, updateSession } from "@/utils/session.utils";
import { useState, useEffect } from "react";
import { useSession } from "@/ctx/auth-context";
import { Container } from "@/components/layout/container";
import { SessionType } from "@/types/session.type";
import { LiveTimer } from "@/components/timer";
import { Timer, Info, Pause, X } from "@tamagui/lucide-icons";
import { useSheets } from "@/ctx/sheets-context";
import { SessionAddMachinesSheet } from "./session-add-machines-sheet";
import { MachineType } from "@/app/machine-selection/add-machines-sheet";
import { TouchableOpacity } from "react-native";

export default function SessionDetailsPage() {
  const { slug } = useLocalSearchParams();
  const { token } = useSession() as unknown as {
    token: string;
  };

  const [session, setSession] = useState<SessionType>();
  console.log("session:", session);

  const { setAddMachineSheet } = useSheets();
  const [machinesSession, setMachinesSession] = useState<MachineType[]>([]);

  console.log("machinesSession:", machinesSession);

  useEffect(() => {
    const searchQuery = slug.toString();
    const fetchClient = async () => {
      try {
        const client = await getSessionQuery({ searchQuery, token });
        setSession(client);
      } catch (error) {
        console.error("Erreur lors de la récupération du client:", error);
      }
    };
    fetchClient();
  }, [slug, token]);

  const handleMachineSelect = (machine: MachineType) => {
    const isMachineSelected = machinesSession.some(
      (selectedMachine) => selectedMachine.name === machine.name
    );

    if (isMachineSelected) {
      setMachinesSession((prevSelected) =>
        prevSelected.filter(
          (selectedMachine) => selectedMachine.name !== machine.name
        )
      );
    } else {
      setMachinesSession((prevSelected) => [
        ...prevSelected,
        { ...machine, start: new Date().toISOString() },
      ]);
    }
  };

  const updateMachines = (machine: MachineType) => {
    const updatedMachines = machinesSession.map((selectedMachine) => {
      if (selectedMachine.name === machine.name) {
        return machine;
      }
      return selectedMachine;
    });

    setMachinesSession(updatedMachines);
  };

  useEffect(() => {
    if (session && machinesSession.length > 0) {
      const newMachines = machinesSession.filter(
        (newMachine) =>
          !session.machinesSession.some(
            (existingMachine) => existingMachine.name === newMachine.name
          )
      );

      const updatedSession = {
        ...session,
        machinesSession: [...session.machinesSession, ...newMachines],
      };

      setSession(updatedSession as SessionType);
      updateSession({ session: updatedSession, token });
    }
  }, [machinesSession]);

  const stopSession = () => {
    session?.machinesSession.map((machine) => {
      machine.endTime = new Date().toISOString();
    });

    console.log("session updated:", session);

    updateSession({ session, token });
  };

  const updateMachineEndTime = (machineToUpdate: MachineType) => {
    const updatedMachines = session?.machinesSession.map((machine) => {
      if (machine.name === machineToUpdate.name) {
        return {
          ...machine,
          endTime: new Date().toISOString(),
        };
      }
      return machine;
    });

    const updatedSession = {
      ...session,
      machinesSession: updatedMachines,
    };

    setSession(updatedSession as SessionType);
    updateSession({ session: updatedSession, token });
  };

  return (
    <Container>
      <YStack space className="mb-8">
        <SizableText className="text-2xl">Client</SizableText>
        <YGroup className="min-w-full" separator={<Separator />}>
          <YGroup.Item>
            <ListItem title={`Brand: ${session?.client.brand}`} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={`Name: ${session?.client.name}`} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={`Phone: ${session?.client.phone}`} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={`Email: ${session?.client.email}`} />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem title={`Siren: ${session?.client.siren}`} />
          </YGroup.Item>

          <SizableText className="text-2xl">Machines</SizableText>
          {session?.machinesSession.map((machine) => (
            <YGroup
              className="max-w-full"
              key={machine.id}
              separator={<Separator />}
              space
            >
              <YGroup.Item>
                <TouchableOpacity onPress={() => updateMachineEndTime(machine)}>
                  <ListItem
                    icon={machine.endTime === null ? <Timer /> : <Pause />}
                    className={clsx(
                      "flex justify-between items-center",
                      machine.endTime === null
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                    title={
                      <SizableText
                        className={clsx(
                          "flex justify-between items-center",
                          machine.endTime === null
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {machine.name}
                      </SizableText>
                    }
                    iconAfter={machine.endTime === null ? <Info /> : null}
                    subTitle={
                      machine.endTime === null ? (
                        <LiveTimer startTime={new Date(machine.startTime)} />
                      ) : (
                        "Machine stopped"
                      )
                    }
                  />
                </TouchableOpacity>
              </YGroup.Item>
            </YGroup>
          ))}
        </YGroup>
        <YGroup className="min-w-full" space>
          <Button backgroundColor="#3B82F6">Add Equipment</Button>
        </YGroup>
        <YGroup className="min-w-full" space>
          <Button
            onPress={() => setAddMachineSheet(true)}
            backgroundColor="#3B82F6"
          >
            Add Machine
          </Button>
        </YGroup>
        {/* <YGroup className="min-w-full" space>
          <Button
            onPress={() => setAddMachineSheet(true)}
            backgroundColor="#3B82F6"
          >
            Add a note
          </Button>
        </YGroup> */}
        <YGroup className="min-w-full" space>
          <Button onPress={stopSession} backgroundColor="#EF4444">
            Stop Session
          </Button>
        </YGroup>
      </YStack>
      <SessionAddMachinesSheet
        machineSession={
          session?.machinesSession.map((machine) => machine.name) || []
        }
        setMachinesSession={setMachinesSession}
      />

      {/* <Dialog modal open>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="space-y-4">
            <Dialog.Description>
              Do you want to stop the machine ?
            </Dialog.Description>

            <XStack space>
              <Button className="bg-blue-500 flex-1">Confirm</Button>
              <Button className="bg-red-500 flex-1">Cancel</Button>
            </XStack>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog> */}
    </Container>
  );
}
