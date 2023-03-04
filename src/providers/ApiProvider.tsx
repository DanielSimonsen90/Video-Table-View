import { createContext, useContext, useState, DependencyList, useEffect } from "react";
import { useEffectOnce, useAsyncEffect, BaseProps, useFetch } from "danholibraryrjs";

const ApiUrlContext = createContext<string | undefined>(undefined);
const ensureSlash = (url: string) => (url.startsWith("/") ? url : `/${url}`);

export function useRequest<Model>(url: string, options?: RequestInit, dependencies?: DependencyList) {
    const apiUrl = useContext(ApiUrlContext);
    const [data, setData] = useState<Model>(null);
    const endpoint = `${apiUrl}${ensureSlash(url)}`;
    const { value, loading, error } = useFetch(endpoint, options, dependencies);

    useAsyncEffect(async () => {
        if (value) setData(await value.json());
    }, [value])

    return { data, loading, error };
}

export default function ApiProvider({ children }: BaseProps) {
    const [url, setUrl] = useState<string | undefined>(undefined);

    useEffectOnce(() => {
        const url = document.querySelector('[data-api-url]')?.textContent;
        if (!url) throw new Error("No API URL provided");
        setUrl(url);
    })

    return (
        <ApiUrlContext.Provider value={url}>
            {children}
        </ApiUrlContext.Provider>
    );
}