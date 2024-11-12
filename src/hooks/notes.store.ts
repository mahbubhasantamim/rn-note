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
        const storedData = (await AsyncStorageUtil.getData(
          KeyConstant.NOTES
        )) as INotes[];

        if (!storedData) {
          // If no data is found, save an empty array to AsyncStorage
          await AsyncStorageUtil.setData(KeyConstant.NOTES, []);
          set({ data: [] });
        } else {
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
      const updatedData = [
        ...get().data.map(
          (it) => ({ ...it, isPinned: false }) // Set all others as not pinned
        ),
        item,
      ];
      try {
        await AsyncStorageUtil.setData(KeyConstant.NOTES, updatedData);
        set({ data: updatedData, activeNote: item.id });
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
