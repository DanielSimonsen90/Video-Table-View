import { useContext, useState } from "react";
import { RefreshContext } from "./RefreshProviderConstants";

export function useRefresh() {
    return useContext(RefreshContext);
}

export function useForceUpdate() {
    return useContext(RefreshContext)[0];
}