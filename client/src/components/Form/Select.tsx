import { BaseProps } from "danholibraryrjs";
import { InputProps } from "./Input";

export type SelectProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = Omit<InputProps<Data, Property>, keyof HTMLInputElement> & BaseProps<HTMLSelectElement, false> & {
    options: string[];
}

export default function Select<
    Data extends Record<string, string>,
    Property extends keyof Data
>({ data, property, setData, options, ...props }: SelectProps<Data, Property>) {
    return (
        <select value={data[property]} id={property} 
            onChange={e => setData(data => ({ 
                ...data, 
                [property]: e.target.value 
            }))} 
            {...props}
        >
            <option hidden value=""></option>
            {options?.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
}