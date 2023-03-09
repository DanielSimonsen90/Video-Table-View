import { decodeProperty } from "helpers";
import { SelectObject, Select, SelectableType } from "../Select";

import { FormGroupOjbectProps, FormGroupProps } from "./FormGroupTypes";

export function FormGroup<T extends SelectableType>(props: FormGroupProps<T>) {
    const { label, select, ...rest } = props;

    return (
        <div className="form-group" {...rest}>
            {typeof label === 'string' 
                ? <label htmlFor={label}>{label}</label>
                : <label {...label} />
            }
            <Select {...select} />
        </div>
    )
}

export default FormGroup;

export function FormGroupObject<
    Data extends Record<string, string>,
    Property extends keyof Data
>(props: FormGroupOjbectProps<Data, Property>) {
    const { label, select, property, data, setData, ...rest } = props;

    return (
        <div className="form-group" {...rest}>
            {typeof label === 'string'
                ? <label htmlFor={property}>{decodeProperty(label)}</label>
                : <label {...label}>{decodeProperty(property)}</label>
            }
            <SelectObject {...{ data, setData, property }} {...select} />
        </div>
    )
}