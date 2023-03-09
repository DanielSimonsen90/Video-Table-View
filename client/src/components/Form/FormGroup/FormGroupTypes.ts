import type { BaseProps } from "danholibraryrjs";
import type { InputProps } from "../Input";
import type { SelectableType, SelectObjectProps, SelectProps } from "../Select";

export type LabelProps = BaseProps<HTMLLabelElement, false> | string;

export type FormGroupOjbectProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = BaseProps<HTMLDivElement, false>
    & Omit<SelectObjectProps<Data, Property>, 'options'> 
    & {
        label?: LabelProps;
        select: Omit<SelectObjectProps<Data, Property>, keyof InputProps<Data, Property>>;
    }

export type FormGroupProps<T extends SelectableType> =
    BaseProps<HTMLDivElement, false>
    & {
        label?: LabelProps;
        select: Omit<SelectProps<T>, keyof InputProps<never, never>>;
    }