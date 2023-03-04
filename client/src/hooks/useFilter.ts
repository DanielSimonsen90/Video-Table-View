import { useMemo } from "react";

export default function useFilter<Data, Property extends keyof Data>(data: Data[], property: Property, filter: string) {
    const filtered = useMemo(() => {
        return data.filter(item => (item[property] as any).toString().toLowerCase().includes(filter.toLowerCase()));
    }, [data, property, filter]);

    return filtered;
}