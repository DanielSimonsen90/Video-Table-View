import type { BaseProps, UseStateSetState } from "danholibraryrjs";
import type { InputProps } from "../Input";

export type SelectObjectProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = Omit<InputProps<Data, Property>, keyof HTMLInputElement> & BaseProps<HTMLSelectElement, false> & {
    options: string[];
}

export type SelectableType = string | number | undefined;
export type Options<T> = Array<T | [value: T, label: string]>;

export type SelectProps<T extends SelectableType> = 
    Omit<SelectObjectProps<never, never>, 
        "value" | "onChange" | "options" 
        | "data"| "setData" | "property"
    > & {
        value: T;
        options: Options<T>;
        setValue: UseStateSetState<T>
    }