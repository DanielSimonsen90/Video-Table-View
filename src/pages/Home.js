import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStateOnChange } from 'danholibraryrjs';
import { Suspense } from 'react';
import Input from '../components/Input';
import useDomLoaded from '../hooks/useDomLoaded';
import { useRequest } from '../providers/ApiProvider';
export default function Home() {
    const [query, input, setInput] = useStateOnChange({ game: "", friend: "", sortBy: "" }, "1s");
    const { data, error } = useRequest(`/medal/${query.friend}/${query.game}?sortBy=${query.sortBy}`, undefined, [query]);
    const isDomLoaded = useDomLoaded();
    if (!isDomLoaded)
        return null;
    console.log(data);
    return (_jsxs("main", { children: [_jsxs("form", Object.assign({ className: "search" }, { children: [_jsx("label", Object.assign({ htmlFor: "query-game" }, { children: "Search for a game in Medal folder" })), _jsx(Input, { id: "query", data: input, setData: setInput, property: "game" }), _jsx("label", Object.assign({ htmlFor: "query-friend" }, { children: "Search for friendgroup in Medal folder" })), _jsx(Input, { id: "query", data: input, setData: setInput, property: "friend" }), _jsx("label", Object.assign({ htmlFor: "query-sortBy" }, { children: "Sort by" })), _jsx(Input, { id: "query", data: input, setData: setInput, property: "sortBy" })] })), _jsxs(Suspense, Object.assign({ fallback: _jsx("div", { children: "Loading..." }) }, { children: [error && _jsxs("div", { children: ["Error: ", error.message] }), data && _jsx("div", { children: JSON.stringify(data) })] }))] }));
}
