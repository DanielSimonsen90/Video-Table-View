var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { useEffectOnce, useAsyncEffect, useFetch } from "danholibraryrjs";
const ApiUrlContext = createContext(undefined);
const ensureSlash = (url) => (url.endsWith("/") ? url : `${url}/`);
export function useRequest(url, options, dependencies) {
    const apiUrl = useContext(ApiUrlContext);
    const [data, setData] = useState(null);
    const endpoint = `${apiUrl}${ensureSlash(url)}`;
    const { value, loading, error } = useFetch(endpoint, options, dependencies);
    useAsyncEffect(() => __awaiter(this, void 0, void 0, function* () {
        if (value)
            setData(yield value.json());
    }), [value]);
    return { data, loading, error };
}
export default function ApiProvider({ children }) {
    const [url, setUrl] = useState(undefined);
    useEffectOnce(() => {
        var _a;
        const url = (_a = document.querySelector('[data-api-url]')) === null || _a === void 0 ? void 0 : _a.textContent;
        if (!url)
            throw new Error("No API URL provided");
        setUrl(url);
    });
    return (_jsx(ApiUrlContext.Provider, Object.assign({ value: url }, { children: children })));
}
