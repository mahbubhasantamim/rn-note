import { TailwindColor } from "@/config/color.config";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function MyStatusBar() {
  return (
    <StatusBar
      translucent
      backgroundColor={TailwindColor.gray[950]}
      style="light"
    />
  );
}
