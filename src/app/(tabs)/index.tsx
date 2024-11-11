import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper.layout";
import { TailwindColor } from "@/config/color.config";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

export default function App() {
  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  return (
    <MyScreenWrapperLayout className="relative p-6">
      <View className="flex-1 bg-gray-800 rounded-2xl">
        <ScrollView>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Hi you can write whatever you want..."
            androidHardwareAccelerationDisabled={true}
            // style={styles.richTextEditorStyle}
            initialHeight={600}
            editorStyle={{
              backgroundColor: "transparent",
              // backgroundColor: TailwindColor.gray[800],
              color: "white",
            }}
            style={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 10,
            }}
          />
        </ScrollView>
        <View className="mb-5 mx-6">
          <RichToolbar
            editor={richText}
            selectedIconTint="#ffffff"
            iconTint={TailwindColor.gray[400]}
            actions={[
              // actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={{
              backgroundColor: TailwindColor.gray[900],
              borderRadius: 10,
            }}
          />
        </View>
        {/* {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your content shouldn't be empty 🤔
          </Text>
        )} */}

        {/* <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={submitContentHandle}
        >
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity> */}
      </View>
    </MyScreenWrapperLayout>
  );
}

const styles = StyleSheet.create({
  // richTextEditorStyle: {
  //   borderBottomLeftRadius: 10,
  //   borderBottomRightRadius: 10,
  //   borderWidth: 1,
  //   borderColor: "#ccaf9b",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.23,
  //   shadowRadius: 2.62,
  //   elevation: 4,
  //   fontSize: 20,
  // },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#c6c3b3",
    borderWidth: 1,
    borderColor: "#c6c3b3",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#312921",
  },
});
