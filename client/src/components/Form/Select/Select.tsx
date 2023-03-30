import { useCallback } from "react";
import type { SelectableType, SelectObjectProps, SelectProps } from "./SelectTypes";

export function SelectObject<
    Data extends Record<string, string>,
    Property extends keyof Data
>({ data, property, setData, options, ...props }: SelectObjectProps<Data, Property>) {
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setData(data => ({ ...data, [property]: e.target.value }));
    }, [setData, property]);

    return (
        <select value={data[property]} id={property} onChange={onChange} {...props}>
            <Options options={options} />
        </select>
    )
}

export function Select<T extends SelectableType>({ value, options, setValue, ...props }: SelectProps<T>) {
    return (
        <select value={value} onChange={e => setValue(e.target.value as any)} {...props}>
            <Options options={options} />
        </select>
    )
}

function Options<T extends SelectableType>({ options }: Pick<SelectProps<T>, 'options'>) {
    try {
        return (<>
            <option hidden value=""></option>
            {options 
                ? options.map(option => Array.isArray(option)
                    ? <option key={option[0]} value={option[0]}>{option[1]}</option>
                    : <option key={option} value={option}>{option}</option>)
                : null}
        </>)
    } catch (err) {
        console.error(err, {
            options
        });
        return <p>you smell</p>
    }
}