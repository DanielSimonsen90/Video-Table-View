import { useMemo, useState } from "react";

export default function useSort<Data, Property extends keyof Data>(data: Data[], property: Property) {
    const [isAscending, setIsAscending] = useState(true);
    const sorted = useMemo(() => {
        const sorted = [...data].sort((a, b) => a[property] > b[property] ? 1 : -1);
        return isAscending ? sorted : sorted.reverse();
    }, [data, property, isAscending]);
    const toggleAscending = (forced?: boolean) => setIsAscending(state => forced ?? !state);

    return [sorted, isAscending, toggleAscending] as const;
}