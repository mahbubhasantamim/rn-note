import { StatusBar } from "react-native";
import "../global.css";

import { Slot } from "expo-router";

export default function Layout() {
  return (
    // <Stack
    //   screenOptions={{
    //     // statusBarTranslucent: true,
    //     // statusBarStyle: "dark",
    //     headerStyle: {
    //       backgroundColor: TailwindColor.gray[900],
    //     },
    //     headerTitleStyle: {
    //       color: "white",
    //     },
    //     headerTintColor: "white",
    //   }}
    // >
    //   <Stack.Screen
    //     name="(tabs)"
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    //   <Stack.Screen
    //     name="edit-note/[noteId]"
    //     options={{
    //       headerShown: false,
    //       headerTitle: "",
    //       headerStyle: {
    //         backgroundColor: TailwindColor.gray[900],
    //       },
    //     }}
    //   />
    // </Stack>
    <>
      <StatusBar barStyle={"light-content"} />
      <Slot />
    </>
  );
}
