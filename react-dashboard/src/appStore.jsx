import create from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set({ dopen: dopen }),
});

appStore = persist(appStore, { name: "sidebar" });
export const useAppStore = create(appStore);
