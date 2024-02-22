import clsx from "clsx";

import { ScrollView, XStack, YStack } from "tamagui";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <ScrollView
      className={clsx(className)}
      backgroundColor="$background"
      padding="$4"
    >
      <XStack className="my-8" space>
        <YStack className="py-8">{children}</YStack>
      </XStack>
    </ScrollView>
  );
};
