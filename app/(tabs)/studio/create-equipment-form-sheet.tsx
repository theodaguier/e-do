import { z } from "zod";
import { useSheets } from "@/ctx/sheets-context";
import { Container } from "@/components/layout/container";
import { Input, Button, Text, YStack } from "tamagui";
import { Sheet } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EquipmentSchema } from "@/utils/validations/equipment.validation";
import { firstLetterUpperCase } from "@/utils/utils";
import { createEquipment } from "@/utils/equipments.utils";
import { useSession } from "@/ctx/auth-context";

type EquipmentSchemaType = z.infer<typeof EquipmentSchema>;

export const CreateEquipmentForm = () => {
  const { token } = useSession() as unknown as {
    token: string;
  };

  const { createEquipmentSheet, setCreateEquipmentSheet } = useSheets();

  const { handleSubmit, control } = useForm<EquipmentSchemaType>({
    resolver: zodResolver(EquipmentSchema),
  });

  const onSubmit = async (values: EquipmentSchemaType) => {
    console.log("values:", values);
    console.log("send !");
    try {
      await createEquipment({
        token: token,
        equipment: values,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'equipement:", error);
    }
  };

  return (
    <Sheet
      open={createEquipmentSheet}
      onOpenChange={setCreateEquipmentSheet}
      snapPoints={[50, 100]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Container>
          <YStack className="min-w-full" alignItems="center" space="$4">
            {Object.keys(EquipmentSchema.shape).map((fieldName) => (
              <Controller
                key={fieldName}
                control={control}
                name={fieldName as keyof EquipmentSchemaType}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    className="w-full"
                    placeholder={firstLetterUpperCase(fieldName)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value as any}
                    autoCapitalize="none"
                  />
                )}
              />
            ))}
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <Text>Create</Text>
            </Button>
          </YStack>
        </Container>
      </Sheet.Frame>
    </Sheet>
  );
};
