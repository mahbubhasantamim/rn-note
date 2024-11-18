import MySpacer from "@/components/common/my-spacer";
import { Checked } from "@/components/common/svg-icon";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { TailwindColor } from "@/config/color.config";
import { INotes, useNotesStore } from "@/hooks/notes.store";
import { UniqueId } from "@/utils/common-util";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Notes() {
  const notes = useNotesStore((s) => s.data);
  const setNotes = useNotesStore((s) => s.setData);
  const addNewNote = useNotesStore((s) => s.addItem);

  const router = useRouter();

  const initialNote: INotes = {
    id: UniqueId.createUuid(),
    desc: "Hi you can write whatever you want...",
    isPinned: true,
  };

  const renderNote = ({ item }: { item: INotes }) => {
    const replaceWhiteSpace = item.desc
      .replace(/<[^>]+>/g, " ") // Replace all HTML tags with a space
      .replace(/\s+/g, " ") // Replace multiple spaces/newlines with a single space
      .trim();

    // const replaceHTML = item.desc.replace(/<(.|\n)*?>/g, "").trim();
    // const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    return (
      <TouchableOpacity
        onPress={() => router.navigate(`/edit-note/${item.id}`)}
        onLongPress={async () => {
          const updatedNote = notes.map(
            (it) =>
              it.id === item.id
                ? { ...it, isPinned: true } // Set the clicked item as pinned
                : { ...it, isPinned: false } // Set all others as not pinned
          );
          setNotes(updatedNote);
        }}
      >
        <View className="flex flex-row justify-between items-center bg-gray-800 rounded-md py-3 px-4">
          <Text className="text-primary-50 text-lg w-11/12">
            {replaceWhiteSpace.length > 55
              ? replaceWhiteSpace.slice(0, 55) + "..."
              : replaceWhiteSpace}
          </Text>
          {item.isPinned && (
            <View className="w-1/12">
              <Ionicons
                name="checkmark-done-circle-sharp"
                size={24}
                color={TailwindColor.noteAccent}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MyScreenWrapperLayout>
        <ScrollView className="p-3 mb-3">
          <View className="flex flex-row flex-wrap">
            {notes.map((item) => {
              const replaceWhiteSpace = item.desc
                .replace(/<[^>]+>/g, " ") // Replace all HTML tags with a space
                .replace(/\s+/g, " ") // Replace multiple spaces/newlines with a single space
                .trim();
              return (
                <View key={item.id} className="w-1/2 my-2">
                  <TouchableOpacity
                    onPress={() => router.navigate(`/edit-note/${item.id}`)}
                    onLongPress={async () => {
                      const updatedNote = notes.map(
                        (it) =>
                          it.id === item.id
                            ? { ...it, isPinned: true } // Set the clicked item as pinned
                            : { ...it, isPinned: false } // Set all others as not pinned
                      );
                      setNotes(updatedNote);
                    }}
                  >
                    <View className="flex justify-between items-center bg-gray-800 rounded-md py-3 px-2 mx-2 h-56 relative">
                      <Text className="text-primary-50 text-lg line-clamp-6">
                        {/* {replaceWhiteSpace.length > 55
                        ? replaceWhiteSpace.slice(0, 55) + "..."
                        : replaceWhiteSpace} */}
                        {replaceWhiteSpace}
                      </Text>
                      {item.isPinned && (
                        <View className="absolute bottom-3 right-3">
                          <Checked />
                          {/* <Ionicons
                          name="checkmark-done-circle-sharp"
                          size={24}
                          color={TailwindColor.noteAccent}
                        /> */}
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {notes.length < 1 && (
            <View className="h-full items-center justify-center">
              <TouchableOpacity
                className="bg-noteAccent p-4 rounded-full"
                onPress={async () => {
                  addNewNote(initialNote);
                }}
              >
                <MaterialCommunityIcons
                  name="clipboard-plus-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <MySpacer />
              <Text className="text-gray-200">
                Click to add your first note.
              </Text>
              <MySpacer className="h-20" />
            </View>
          )}
        </ScrollView>
      </MyScreenWrapperLayout>

      {notes.length > 0 && (
        <TouchableOpacity
          className="bg-noteAccent absolute bottom-5 right-5 items-end p-4 rounded-full"
          onPress={async () => {
            const id = UniqueId.createUuid();
            addNewNote({
              id,
              desc: "Hi you can write whatever you want...",
              isPinned: false,
            });
            router.navigate(`/edit-note/${id}`);
          }}
        >
          <MaterialCommunityIcons
            name="clipboard-plus-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      )}
    </>
  );
}
