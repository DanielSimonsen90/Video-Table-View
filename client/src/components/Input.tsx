import { BaseProps, UseStateSetState } from "danholibraryrjs";

export type InputProps<
    Data extends Record<string, string>, 
    Property extends keyof Data
> = Omit<BaseProps<HTMLInputElement, false>, 'onChange'> & {
    data: Data;
    property: Property;
    setData: UseStateSetState<Data>
}

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