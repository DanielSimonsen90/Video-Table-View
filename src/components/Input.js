import { jsx as _jsx } from "react/jsx-runtime";
export default function Input({ data, property, setData }) {
    return (_jsx("input", { value: data[property], onChange: e => setData(data => (Object.assign(Object.assign({}, data), { [property]: e.target.value }))) }));
}
