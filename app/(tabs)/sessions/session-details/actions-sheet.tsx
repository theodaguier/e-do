import { z } from "zod";
import { useSheets } from "@/ctx/sheets-context";
import { Container } from "@/components/layout/container";
import { Input, Button, Text, YStack, H1 } from "tamagui";
import { Sheet } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSchema } from "@/utils/validations/clients.validations";
import { firstLetterUpperCase } from "@/utils/utils";
import { createClient } from "@/utils/clients.utils";
import { useSession } from "@/ctx/auth-context";

export const SessionMachineActionsSheet = () => {
  const { token } = useSession() as unknown as {
    token: string;
  };

  const { sessionMachineSheet, setSessionMachineSheet } = useSheets();

  const onSubmit = async () => {
    // console.log("values:", values);
    // try {
    //   await createClient({
    //     token: token,
    //     client: values,
    //   });
    // } catch (error) {
    //   console.error("Erreur lors de la création du client:", error);
    // }
  };

  return (
    <Sheet
      open={sessionMachineSheet}
      onOpenChange={setSessionMachineSheet}
      snapPoints={[60, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Container>
          {/* <YStack className="min-w-full" alignItems="center" space="$4">
            {["name", "brand", "email", "phone", "siren"].map((fieldName) => (
              <Controller
                key={fieldName}
                control={control}
                name={fieldName as keyof ClientSchemaType}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="w-full"
                    placeholder={firstLetterUpperCase(fieldName)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                  />
                )}
              />
            ))}
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <Text>Create</Text>
            </Button>
          </YStack> */}
          <H1>Test</H1>
        </Container>
      </Sheet.Frame>
    </Sheet>
  );
};
