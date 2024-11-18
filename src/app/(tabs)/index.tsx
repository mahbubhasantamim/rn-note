import MySpacer from "@/components/common/my-spacer";
import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { TailwindColor } from "@/config/color.config";
import { useNotesStore } from "@/hooks/notes.store";
import { UniqueId } from "@/utils/common-util";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function App() {
  const richText = useRef<RichEditor>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // const notes = useNotesStore((s) => s.data);
  // const setNotes = useNotesStore((s) => s.setData);
  // const activeNoteId = useNotesStore((s) => s.activeNote);
  // const setActiveNoteId = useNotesStore((s) => s.setActiveNote);
  // const addNewNote = useNotesStore((s) => s.addItem);
  // const initializeData = useNotesStore((state) => state.initializeData);

  const {
    data: notes,
    setData: setNotes,
    activeNote: activeNoteId,
    setActiveNote: setActiveNoteId,
    addItem: addNewNote,
    initializeData,
  } = useNotesStore();
  const [loading, setLoading] = useState(true);

  const [moreAction, setMoreAction] = useState(false);

  const activeNote = notes.find((item) => item.isPinned === true);

  useEffect(() => {
    initializeData();
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

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
            <ScrollView ref={scrollViewRef}>
              <KeyboardAvoidingView>
                <RichEditor
                  ref={richText}
                  useContainer={true}
                  onCursorPosition={(y) =>
                    scrollViewRef.current?.scrollTo({
                      y: y - 100,
                      animated: true,
                    })
                  }
                  // initialFocus={true}
                  onTouchEnd={(e) =>
                    scrollViewRef.current?.scrollTo({
                      y: e.nativeEvent.locationY - 10,
                      animated: true,
                    })
                  }
                  onFocus={() =>
                    scrollViewRef.current?.scrollTo({
                      y: 100,
                      animated: true,
                    })
                  }
                  onChange={richTextHandle}
                  initialContentHTML={activeNote?.desc}
                  placeholder="Hi you can write whatever you want..."
                  initialHeight={600}
                  editorStyle={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  style={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    // paddingHorizontal: 10,
                    paddingTop: 6,
                    paddingBottom: 8,
                  }}
                />
              </KeyboardAvoidingView>
            </ScrollView>
            <View className="mb-5 mx-6">
              <RichToolbar
                editor={richText}
                selectedIconTint={"white"}
                iconTint={"white"}
                iconSize={14}
                unselectedButtonStyle={{
                  backgroundColor: TailwindColor.gray[600],
                  borderRadius: 50,
                  marginHorizontal: 4,
                  height: 34,
                  width: 34,
                }}
                selectedButtonStyle={{
                  backgroundColor: TailwindColor.noteAccent,
                  borderRadius: 50,
                  marginHorizontal: 4,
                  height: 34,
                  width: 34,
                }}
                actions={[
                  actions.heading2,
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  "moreAction",
                ]}
                iconMap={{
                  [actions.heading2]: ({
                    tintColor,
                  }: {
                    tintColor: string;
                  }) => (
                    <Text
                      style={{
                        color: tintColor,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      H1
                    </Text>
                  ),
                  moreAction: () => (
                    <View
                      className={`bg-gray-900 w-full h-full rounded-full items-center justify-center ${
                        moreAction ? "bg-noteAccent" : ""
                      }`}
                    >
                      <Feather name="more-vertical" size={18} color="white" />
                    </View>
                  ),
                }}
                moreAction={() => setMoreAction((prev) => !prev)}
                style={{
                  height: 50,
                  backgroundColor: TailwindColor.gray[800],
                  borderRadius: 50,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                }}
              />
              <MySpacer />
              {moreAction && (
                <RichToolbar
                  editor={richText}
                  selectedIconTint={"white"}
                  iconTint={"white"}
                  iconSize={14}
                  unselectedButtonStyle={{
                    backgroundColor: TailwindColor.gray[600],
                    borderRadius: 50,
                    marginHorizontal: 5,
                    height: 34,
                    width: 34,
                  }}
                  selectedButtonStyle={{
                    backgroundColor: TailwindColor.noteAccent,
                    borderRadius: 50,
                    marginHorizontal: 5,
                    height: 34,
                    width: 34,
                  }}
                  actions={[
                    actions.blockquote,
                    actions.insertImage,
                    actions.insertLink,
                    actions.setStrikethrough,
                    actions.checkboxList,
                    actions.undo,
                    actions.redo,
                  ]}
                  iconMap={{
                    [actions.heading2]: ({
                      tintColor,
                    }: {
                      tintColor: string;
                    }) => (
                      <Text
                        style={{
                          color: tintColor,
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        H1
                      </Text>
                    ),
                  }}
                  style={{
                    height: 50,
                    backgroundColor: TailwindColor.gray[800],
                    borderRadius: 50,
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                  }}
                />
              )}
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
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
                <Text className="text-gray-200">
                  Click to add your first note.
                </Text>
              </>
            )}
          </View>
        )}
      </View>
    </MyScreenWrapperLayout>
  );
}
