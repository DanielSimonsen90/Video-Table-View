import type { BaseProps } from "danholibraryrjs";
import type { InputProps } from "../Input";

export type SelectProps<
    Data extends Record<string, string>,
    Property extends keyof Data
> = Omit<InputProps<Data, Property>, keyof HTMLInputElement> & BaseProps<HTMLSelectElement, false> & {
    options: string[];
}
