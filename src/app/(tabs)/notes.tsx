import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { KeyConstant } from "@/constants/key.constant";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { UniqueId } from "@/utils/common-util";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface INotes {
  id: string;
  desc: string;
  isPinned: boolean;
}

const initialNote = {
  id: UniqueId.createUuid(),
  desc: "Hi you can write whatever you want...",
  isPinned: false,
};

// const notes: INotes[] = [
//   {
//     desc: "Hi you can write whatever you want",
//     isPinned: true,
//   },
//   {
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta repellat minima cumque adipisci qui ea quo recusandae perspiciatis odio nobis, laboriosam esse fugit quaerat in exercitationem accusantium iure fugiat nihil?",
//     isPinned: false,
//   },
// ];

export default function Notes() {
  const [notes, setNotes] = useState<INotes[]>([]);

  const richTextRef = useRef();
  useEffect(() => {
    const getLocalData = async () => {
      const notesLocalData = (await AsyncStorageUtil.getData(
        KeyConstant.NOTES
      )) as INotes[];

      if (notesLocalData?.length < 1) {
        await AsyncStorageUtil.setData(KeyConstant.NOTES, []);
      }
      setNotes(notesLocalData);
    };

    getLocalData();
  }, []);
  const id = UniqueId.createUuid();
  console.log(id);

  const renderNote = ({ item }: { item: INotes }) => {
    console.log(item);

    return (
      <TouchableOpacity
      // onLongPress={() => {
      //   notes.find
      //   setNotes((old) => )
      // }}
      >
        <View className="flex flex-row justify-between items-center my-2 bg-gray-800 rounded-md py-3 px-4">
          <Text className="text-primary-50 text-lg lin">
            {item.desc.length > 55 ? item.desc.slice(0, 55) + "..." : item.desc}
          </Text>
          {item.isPinned && (
            <Ionicons
              name="checkmark-done-circle-sharp"
              size={24}
              color="white"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MyScreenWrapperLayout>
      <View className="p-3">
        <FlatList
          horizontal={false}
          data={notes}
          renderItem={renderNote}
          // keyExtractor={item => item._id}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center">
              <Text className="text-primary-50 py-2 px-4 rounded-full">
                Note Not found.
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          className="py-3"
        />
      </View>

      <TouchableOpacity
        className="bg-white absolute bottom-6 right-6 p-4 rounded-full"
        onPress={async () => {
          const notesLocalData = (await AsyncStorageUtil.getData(
            KeyConstant.NOTES
          )) as INotes[];

          if (notesLocalData?.length > 0) {
            const newNotes = [...notesLocalData, initialNote];
            await AsyncStorageUtil.setData(KeyConstant.NOTES, newNotes);
            setNotes((prev) => [...prev, initialNote]);
          } else {
            const newNotes = [initialNote];
            await AsyncStorageUtil.setData(KeyConstant.NOTES, newNotes);
            setNotes(newNotes);
          }
          // AsyncStorageUtil.removeData(KeyConstant.NOTES);
        }}
      >
        <MaterialCommunityIcons
          name="clipboard-plus-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </MyScreenWrapperLayout>
  );
}
