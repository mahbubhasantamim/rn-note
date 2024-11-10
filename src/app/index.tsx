import MySpacer from "@/components/common/my-spacer";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <MyScreenWrapperLayout className="">
      <View>
        <MySpacer />
        <Text className="text-center text-gray-200 text-2xl">Hello World!</Text>
      </View>
    </MyScreenWrapperLayout>
  );
}
