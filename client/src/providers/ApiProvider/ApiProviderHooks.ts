import { useDeepCompareEffect } from "danholibraryrjs";
import { useContext, useMemo, useState } from "react";

import { ApiUrlContext } from "./ApiProviderConstants";
import { ensureSlash, request } from "./ApiProviderFunctions";

export function useRequest<Model>(url?: string, options: RequestInit = { method: 'GET' }) {
    const apiUrl = useContext(ApiUrlContext);
    const getEndpoint = (url: string) => `${apiUrl}${ensureSlash(url)}`.replace(/ +/, "%20");
    return (endpoint?: string) => {
        if (!endpoint && !url) throw new Error('No endpoint or url provided');

        const fullEndpoint = getEndpoint(endpoint ?? url!);
        // console.log(`Requesting ${fullEndpoint}`);
        return request<Model>(fullEndpoint, options);
    }
}

export function useRequestState<Model>(url: string, query?: Object, options: RequestInit = { method: 'GET' }) {
    const apiUrl = useContext(ApiUrlContext);
    const endpoint = useMemo(() => `${apiUrl}${ensureSlash(url)}`.replace(/ +/, "%20"), [apiUrl, url]);
    const dependencies = useMemo(() => Object.keysOf(query ?? {}).map(key => query?.[key]), [query]);

    const [value, setValue] = useState<Model | undefined>(undefined);

    useDeepCompareEffect(() => {
        if (dependencies.every(Boolean)) {
            // console.log(`Requesting ${endpoint}`, query);
            request<Model>(endpoint, options)
                .then(setValue)
                .catch(error => {
                    throw error;
                });
        }

        return () => {
            setValue(undefined);
        };
    }, [...dependencies, endpoint, options]);

    return [value as Model, setValue] as const;
}