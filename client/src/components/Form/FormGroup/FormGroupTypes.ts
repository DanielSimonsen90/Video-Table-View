import type { BaseProps } from "danholibraryrjs";
import type { InputProps } from "../Input";
import type { SelectProps } from "../Select";

export type LabelProps = BaseProps<HTMLLabelElement, false>;
export type FormGroupProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = BaseProps<HTMLDivElement, false>
    & LabelProps
    & Omit<SelectProps<Data, Property>, 'options'>
    & {
        label?: BaseProps<HTMLLabelElement, false>;
        select: Omit<SelectProps<Data, Property>, keyof InputProps<Data, Property>>;
    }