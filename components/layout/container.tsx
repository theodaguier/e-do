import { ScrollView, XStack, YStack } from "tamagui";

export interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <ScrollView backgroundColor="$background" padding="$4">
      <XStack space>
        <YStack>{children}</YStack>
      </XStack>
    </ScrollView>
  );
};
