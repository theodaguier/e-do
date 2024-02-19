import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SizableText } from "tamagui";
import { formatTime } from "@/utils/time.utils";

export const LiveTimer = ({ startTime }: { startTime: Date }) => {
  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const start = startTime instanceof Date ? startTime : new Date(startTime);
      const current = new Date();
      const diff = Math.abs(current.getTime() - start.getTime()) / 1000;

      setTimeDiff(diff);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  if (timeDiff === 0) {
    return <ActivityIndicator size="small" />;
  }

  return <SizableText>{formatTime(timeDiff)}</SizableText>;
};
