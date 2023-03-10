import { BaseProps } from "danholibraryrjs";
import { useState, useCallback } from "react";
import { RefreshContext } from "./RefreshProviderConstants";

export default function RefreshProvider({ children }: BaseProps) {
    const [refreshes, setRefreshes] = useState(0);
    const forceUpdate = useCallback(() => setRefreshes(refreshes + 1), [refreshes]);

    return (
        <RefreshContext.Provider value={[forceUpdate, refreshes]}>
            {children}
        </RefreshContext.Provider>
    );
};