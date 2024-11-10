import { TailwindUtil } from "@/utils/tailwind.util";
import React from "react";
import { View } from "react-native";

export default function MySpacer({ className }: { className?: string }) {
  return <View className={TailwindUtil.cn("h-2", className)} />;
}
