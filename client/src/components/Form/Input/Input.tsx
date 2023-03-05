import type { InputProps } from "./InputTypes";

export default function Input<
    Data extends Record<string, string>, 
    Property extends keyof Data
>({ data, property, setData, ...props }: InputProps<Data, Property>) {
    return (
        <input
            value={data[property]}
            onChange={e => setData(data => ({ 
                ...data, 
                [property]: e.target.value 
            }))}
            {...props}
        />
    );
}