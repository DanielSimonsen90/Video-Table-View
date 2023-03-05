import { useMemo } from "react";
import { Video } from "vtv-models";
import useSort from "hooks/useSort";

export function useVideoListSearch(videos: Video[], sortedBy: keyof Video, search: string) {
    const [sortedVideos, isAscending, toggleAscending] = useSort(videos, sortedBy);
    const filteredVideos = useMemo(() => {
        if (!search) return sortedVideos;
        return sortedVideos.filter(({ name, createdAt, folderPath, path }) => {
            const filters = [name, createdAt.toLocaleDateString(), folderPath, path]
                .map(filter => filter.toLowerCase());
            return filters.some(filter => filter.includes(search.toLowerCase()));
        });
    }, [sortedVideos, search]);

    return [filteredVideos, isAscending, toggleAscending] as const;
}