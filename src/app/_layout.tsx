import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function TabLayout() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Slot />
    </>
    // <Stack>
    //   <Stack.Screen
    //     name="(tabs)"
    //     options={{
    //       headerShown: false,
    //       statusBarStyle: "light",
    //       statusBarColor: TailwindColor.gray[900],
    //       animation: "none",
    //     }}
    //   />
    // </Stack>
  );
}
