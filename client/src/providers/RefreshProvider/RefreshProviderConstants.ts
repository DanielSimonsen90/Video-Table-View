import { createContext } from "react";
import { RefreshContextType } from "./RefreshProviderTypes";

export const RefreshContext = createContext([function forceUpdate() {}, 0] as RefreshContextType);