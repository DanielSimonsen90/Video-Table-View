import { createContext } from "react";

const PORT = 3001;
export const API_URL = `http://localhost:${PORT}/api`;

export const ApiUrlContext = createContext<string | undefined>(undefined);
