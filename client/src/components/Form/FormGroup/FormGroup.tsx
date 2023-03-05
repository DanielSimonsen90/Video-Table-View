import { decodeProperty } from "helpers";
import Select from "../Select";

import { FormGroupProps } from "./FormGroupTypes";

export default function FormGroup<
    Data extends Record<string, string>,
    Property extends keyof Data
>(props: FormGroupProps<Data, Property>) {
    const { label, select, data, property, setData, ...rest } = props;

    return (
        <div className="form-group" {...rest}>
            <label htmlFor={property} {...label}>{decodeProperty(property)}</label>
            <Select {...{ data, property, setData }} {...select} />
        </div>
    )
}