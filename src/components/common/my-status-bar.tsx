import { TailwindColor } from "@/config/color.config";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function MyStatusBar() {
  return (
    <StatusBar
      // translucent
      // backgroundColor={TailwindColor.gray[900]}
      backgroundColor={TailwindColor.gray[900]}
      style="light"
    />
  );
}
