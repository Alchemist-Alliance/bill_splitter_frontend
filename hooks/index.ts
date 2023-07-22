import { AppContext } from "@/store";
import { AppState } from "@/types";
import { useContext } from "react";
import { useStore } from "zustand";

export default function useAppContext<T>(
  selector: (state: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(AppContext);
  if (!store) throw new Error("Missing AppContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}
