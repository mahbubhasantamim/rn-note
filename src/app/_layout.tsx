import React from "react";

import MyStatusBar from "@/components/common/my-status-bar";
import { Slot } from "expo-router";
import "../global.css";

export default function MainLayout() {
  return (
    <>
      <MyStatusBar />
      <Slot />
    </>
  );
}
