import { TailwindColor } from "@/config/color.config";
import { useNotesStore } from "@/hooks/notes.store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function TabLayout() {
  const notes = useNotesStore((state) => state.initializeData);
  useEffect(() => {
    notes();
  }, []);

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
