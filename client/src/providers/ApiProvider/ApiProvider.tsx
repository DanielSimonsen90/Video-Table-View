import { BaseProps } from "danholibraryrjs";
import { ApiUrlContext, API_URL } from './ApiProviderConstants';

export default function ApiProvider({ children }: BaseProps) {
    return (
        <ApiUrlContext.Provider value={API_URL}>
            {children}
        </ApiUrlContext.Provider>
    );
}