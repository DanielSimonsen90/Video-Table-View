import { useContext } from "react";
import { ModalContext } from "./ModalProviderConstants";

export const useModal = () => useContext(ModalContext);