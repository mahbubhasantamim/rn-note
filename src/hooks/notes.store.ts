// store.js
import { KeyConstant } from "@/constants/key.constant";
import { AsyncStorageUtil } from "@/utils/async-storage.util";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface INotes {
  id: string;
  desc: string;
  isPinned: boolean;
}

interface INotesStore {
  data: INotes[];
  initializeData: () => Promise<void>;
  setData: (newData: INotes[]) => Promise<void>;
  addItem: (item: INotes) => Promise<void>;
  activeNote?: string;
  setActiveNote: (id: string) => void;
}

export const useNotesStore = createWithEqualityFn<INotesStore>(
  (set, get) => ({
    data: [],
    activeNote: "",

    // Initialize data by loading from AsyncStorage
    initializeData: async () => {
      try {
        const storedData =
          ((await AsyncStorageUtil.getData(KeyConstant.NOTES)) as INotes[]) ||
          [];

        if (storedData?.length > 0) {
          set({
            data: storedData,
            activeNote: storedData.find((item) => item.isPinned === true)?.id,
          });
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage", error);
      }
    },

    // Update data and save it to AsyncStorage
    setData: async (newData) => {
      try {
        await AsyncStorageUtil.setData(KeyConstant.NOTES, newData);
        set({
          data: newData,
          activeNote: newData.find((item) => item.isPinned === true)?.id,
        });
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
      }
    },

    // Add a single item and update AsyncStorage
    addItem: async (item) => {
      const updatedData = [...get().data, item];
      try {
        await AsyncStorageUtil.setData(KeyConstant.NOTES, updatedData);
        set({ data: updatedData });
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
      }
    },

    setActiveNote: (id: string) => {
      set({ activeNote: id });
    },
  }),
  shallow
);
