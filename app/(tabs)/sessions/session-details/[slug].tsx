import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import {
  YStack,
  YGroup,
  Separator,
  ListItem,
  Button,
  SizableText,
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
import * as DropdownMenu from "zeego/dropdown-menu";

export default function SessionDetailsPage() {
  const { slug } = useLocalSearchParams();
  const { token } = useSession() as unknown as {
    token: string;
  };

  const [session, setSession] = useState<SessionType>();
  console.log("session:", session);

  const { setAddMachineSheet } = useSheets();
  const [machinesSession, setMachinesSession] = useState<MachineType[]>([]);

  const machinesInSession = session?.machinesSession.map(
    (machine) => machine.name
  );

  console.log("machinesInSession:", machinesInSession);

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
          {session?.machinesSession.map((machine, index) => (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <YGroup
                  className="max-w-full"
                  key={index}
                  separator={<Separator />}
                  space
                >
                  <YGroup.Item>
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
                  </YGroup.Item>
                </YGroup>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>{machine.name}</DropdownMenu.Label>
                <DropdownMenu.Item
                  key={machine.id}
                  destructive
                  disabled={machine.endTime !== null}
                  onSelect={() => updateMachineEndTime(machine)}
                >
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: "stop.circle",
                    }}
                  />
                  <DropdownMenu.ItemTitle>Stop machine</DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Arrow />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
        setMachinesSession={setMachinesSession}
        machinesInSession={machinesInSession ?? []}
      />
    </Container>
  );
}
