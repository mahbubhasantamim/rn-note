import MySpacer from "@/components/common/my-spacer";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { TailwindColor } from "@/config/color.config";
import { useNotesStore } from "@/hooks/notes.store";
import { UniqueId } from "@/utils/common-util";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function App() {
  const richText = useRef<RichEditor>(null);
  const notes = useNotesStore((s) => s.data);
  const setNotes = useNotesStore((s) => s.setData);
  const activeNoteId = useNotesStore((s) => s.activeNote);
  const setActiveNoteId = useNotesStore((s) => s.setActiveNote);
  const addNewNote = useNotesStore((s) => s.addItem);

  const activeNote = notes.find((item) => item.isPinned === true);

  useEffect(() => {
    if (richText.current && activeNoteId && activeNote) {
      richText.current.setContentHTML(activeNote.desc);
    }
  }, [activeNoteId]);

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      if (!activeNoteId) {
        // if notes not pinned --> create a new note
        addNewNote({
          id: UniqueId.createUuid(),
          desc: descriptionText,
          isPinned: true,
        });
      } else {
        // if notes is pinned --> update note
        const updatedNote = notes.map((item) =>
          item.isPinned === true ? { ...item, desc: descriptionText } : item
        );
        setNotes(updatedNote);
      }
    } else {
      // if description is empty --> remove note
      if (notes.length > 1) {
        const updatedNote = notes.filter((item) => item.id !== activeNoteId);
        setNotes(updatedNote);
        setActiveNoteId("");
      }
    }
  };

  return (
    <MyScreenWrapperLayout className="relative p-4">
      <View className="flex-1 rounded-2xl">
        {notes.length > 0 ? (
          <>
            <ScrollView>
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
                initialContentHTML={activeNote?.desc}
                placeholder="Hi you can write whatever you want..."
                // androidHardwareAccelerationDisabled={true}
                initialHeight={600}
                editorStyle={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
                style={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  paddingHorizontal: 10,
                  paddingTop: 6,
                  paddingBottom: 8,
                }}
              />
            </ScrollView>
            <View className="mb-5 mx-6">
              <RichToolbar
                editor={richText}
                selectedIconTint={TailwindColor["noteAccent"]}
                iconTint={TailwindColor.gray[400]}
                actions={[
                  // actions.insertImage,
                  actions.heading1,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.setStrikethrough,
                  actions.setUnderline,
                ]}
                iconMap={{
                  [actions.heading1]: ({
                    tintColor,
                  }: {
                    tintColor: string;
                  }) => (
                    <Text
                      style={{
                        color: tintColor,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      H1
                    </Text>
                  ),
                }}
                style={{
                  backgroundColor: TailwindColor.gray[800],
                  borderRadius: 50,
                }}
              />
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity
              className="bg-noteAccent p-4 rounded-full"
              onPress={async () => {
                addNewNote({
                  id: UniqueId.createUuid(),
                  desc: "Hi you can write whatever you want...",
                  isPinned: true,
                });
                // AsyncStorageUtil.removeData(KeyConstant.NOTES);
              }}
            >
              <MaterialCommunityIcons
                name="clipboard-plus-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <MySpacer />
            <Text className="text-gray-200">Click to add your firs note.</Text>
          </View>
        )}
      </View>
    </MyScreenWrapperLayout>
  );
}
