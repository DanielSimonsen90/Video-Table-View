import { BaseProps } from "danholibraryrjs";
import { InputProps } from "./Input";
import Select, { SelectProps } from "./Select";

type LabelProps = BaseProps<HTMLLabelElement, false>;

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

export default function FormGroup<
    Data extends Record<string, string>,
    Property extends keyof Data
>(props: FormGroupProps<Data, Property>) {
    const { label, select, data, property, setData, ...rest } = props;

    return (
        <div className="form-group" {...rest}>
            <label htmlFor={property} {...label}>{getLabel(property)}</label>
            <Select {...{ data, property, setData }} {...select} />
        </div>
    )
}

function getLabel(label: string) {
    return label.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { 
            return str.toUpperCase(); 
        });
}