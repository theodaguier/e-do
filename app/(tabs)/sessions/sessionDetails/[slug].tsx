import { useLocalSearchParams } from "expo-router";
import { YStack, YGroup, Separator, ListItem, Button } from "tamagui";
import { getSessionQuery, updateSession } from "@/utils/session.utils";
import { useState, useEffect } from "react";
import { useSession } from "@/ctx/auth-context";
import { Container } from "@/components/layout/container";
import { SessionType } from "@/types/session.type";
import { LiveTimer } from "@/components/timer";
import { Timer, Info } from "@tamagui/lucide-icons";
import { useSheets } from "@/ctx/sheets-context";
import { SessionAddMachinesSheet } from "./session-add-machines-sheet";
import { MachineType } from "@/app/machine-selection/add-machines-sheet";

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

  return (
    <Container>
      <YStack space>
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
          <YGroup.Item>
            {session?.machinesSession.map((machine) => (
              <YGroup
                className="max-w-full"
                key={machine.id}
                separator={<Separator />}
                space
              >
                <YGroup.Item>
                  <ListItem
                    icon={Timer}
                    title={machine.name}
                    iconAfter={Info}
                    subTitle={
                      <LiveTimer startTime={new Date(machine.startTime)} />
                    }
                  />
                </YGroup.Item>
              </YGroup>
            ))}
          </YGroup.Item>
        </YGroup>
        <YGroup className="min-w-full" space>
          <Button>Add Equipment</Button>
        </YGroup>
        <YGroup className="min-w-full" space>
          <Button onPress={() => setAddMachineSheet(true)}>Add Machine</Button>
        </YGroup>
        <YGroup className="min-w-full" space>
          <Button onPress={stopSession} backgroundColor="#EF4444">
            Stop Session
          </Button>
        </YGroup>
      </YStack>
      <SessionAddMachinesSheet setMachinesSession={setMachinesSession} />
    </Container>
  );
}
