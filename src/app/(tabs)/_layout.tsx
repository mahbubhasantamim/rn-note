// import { ArchiveInputFill } from "@/components/common/svg-icon";
import { ArchiveInputFill } from "@/components/common/svg-icon";
import { TailwindColor } from "@/config/color.config";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: TailwindColor["noteAccent"],
          tabBarInactiveTintColor: TailwindColor.gray[300],
          tabBarStyle: {
            backgroundColor: TailwindColor.gray[800],
            height: 75,
            paddingBottom: 20,
            paddingTop: 10,
            borderTopWidth: 0,
          },
          headerTitleAlign: "center",
          headerTitleStyle: { color: TailwindColor.gray[100] },
          headerStyle: {
            backgroundColor: TailwindColor.gray[900],
          },
        }}
        sceneContainerStyle={{ backgroundColor: TailwindColor.gray[900] }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notes"
          options={{
            headerShown: false,
            title: "All Note",
            tabBarIcon: ({ color, focused }) => (
              // <MaterialCommunityIcons
              //   name="archive-plus"
              //   size={24}
              //   color={color}
              // />
              <ArchiveInputFill height={50} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
