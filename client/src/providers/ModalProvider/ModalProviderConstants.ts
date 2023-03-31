import { createContext } from "react";
import { ModalContext as ContextType } from "./ModalProviderTypes";

export const ModalContext = createContext<ContextType>(() => () => {});