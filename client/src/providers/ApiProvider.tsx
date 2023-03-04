import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { BaseProps, useDeepCompareEffect } from "danholibraryrjs";

import { API_URL } from '../constants';

const ApiUrlContext = createContext<string | undefined>(undefined);
const ensureSlash = (url: string) => (url.startsWith("/") ? url : `/${url}`);

export function useRequest<Model>(url: string, query?: Object, options: RequestInit = { method: 'GET' }): Model {
    const apiUrl = useContext(ApiUrlContext);
    const endpoint = `${apiUrl}${ensureSlash(url)}`.replace(/ +/, "%20");
    const dependencies = useMemo(() => Object.keysOf(query ?? {}).map(key => query?.[key]), [query]);

    const [value, setValue] = useState<Model | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    
    useDeepCompareEffect(() => {
        if (dependencies.every(Boolean)) {
            console.log(`Requesting ${endpoint}`, query);
            fetch(endpoint, options)
                .then(res => res.json())
                .then(setValue)
                .catch(setError);
        }

        return () => {
            setValue(undefined);
            setError(undefined);
        };
    }, [...dependencies, endpoint, options]);

    if (error) {
        console.error('The error below', { endpoint, value, error });
        throw error;
    }

    return value as Model;
}

export default function ApiProvider({ children }: BaseProps) {
    return (
        <ApiUrlContext.Provider value={API_URL}>
            {children}
        </ApiUrlContext.Provider>
    );
}