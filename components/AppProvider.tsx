import { AppContext, AppStore, createAppStore } from "@/store";
import { AppProviderProps } from "@/types";
import { useRef } from "react";

export default function AppProvider({ children, event }: AppProviderProps) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = createAppStore(event);
    }
    return (
        <AppContext.Provider value={storeRef.current}>
            {children}
        </AppContext.Provider>
    );
}