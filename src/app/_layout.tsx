import { TailwindColor } from "@/config/color.config";
import { Stack } from "expo-router";
import "../global.css";

export default function TabLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            statusBarStyle: "light",
            statusBarColor: TailwindColor.gray[900],
          }}
        />
      </Stack>
    </>
  );
}
