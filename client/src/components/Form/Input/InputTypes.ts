import type { BaseProps, UseStateSetState } from "danholibraryrjs";

export type InputProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = Omit<BaseProps<HTMLInputElement, false>, 'onChange'> & {
    data: Data;
    property: Property;
    setData: UseStateSetState<Data>
}