import type { BaseProps, UseStateSetState } from "danholibraryrjs"
import type { Folder, Video } from "vtv-models"
import type { VideoListSearchResult } from "./components/VideoListTable/VideoListTableTypes"

export type VideoListProps = BaseProps<HTMLDivElement, false> & {
    folder: Folder
}

export type DisplayProps = VideoListProps & {
    videos: VideoListSearchResult[0];
    isAscending: VideoListSearchResult[1];
    toggleAscending: VideoListSearchResult[2];

    sortedBy: keyof Video;
    setSortedBy: UseStateSetState<keyof Video>;
}