import { createContext, useContext, useState, useMemo } from "react";
import { BaseProps, useDeepCompareEffect } from "danholibraryrjs";

import { API_URL } from '../constants';

const ApiUrlContext = createContext<string | undefined>(undefined);
const ensureSlash = (url: string) => (url.startsWith("/") ? url : `/${url}`);

function request<Data>(url: string, options: RequestInit = { method: 'GET' }): Promise<Data> {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
    })
}

export function useRequest<Model>(url?: string, options: RequestInit = { method: 'GET' }) {
    const apiUrl = useContext(ApiUrlContext);
    const getEndpoint = (url: string) => `${apiUrl}${ensureSlash(url)}`.replace(/ +/, "%20");
    return (endpoint?: string) => {
        if (!endpoint && !url) throw new Error('No endpoint or url provided');

        const fullEndpoint = getEndpoint(endpoint ?? url!);
        console.log(`Requesting ${fullEndpoint}`);
        return request<Model>(fullEndpoint, options);
    }
}

export function useRequestState<Model>(url: string, query?: Object, options: RequestInit = { method: 'GET' }): Model {
    const apiUrl = useContext(ApiUrlContext);
    const endpoint = `${apiUrl}${ensureSlash(url)}`.replace(/ +/, "%20");
    const dependencies = useMemo(() => Object.keysOf(query ?? {}).map(key => query?.[key]), [query]);

    const [value, setValue] = useState<Model | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    
    useDeepCompareEffect(() => {
        if (dependencies.every(Boolean)) {
            console.log(`Requesting ${endpoint}`, query);
            request<Model>(endpoint, options)
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