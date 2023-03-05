import { decodeProperty } from "helpers";
import type { TableHeaderProps } from "./TableHeaderTypes";

export default function TableHeader({ title: name, sortedBy, onHeadClick }: TableHeaderProps) {
    return (
        <th onClick={() => onHeadClick(name)} 
            className={sortedBy === name ? 'selected' : undefined}>
            {decodeProperty(name)}
        </th>
    );
}