import { Folder, Video } from "vtv-models";

export function getVideosFromFolder(folder: Folder): Video[] {
    const { folders } = folder;
    const videos = folder.videos?.filter(video => video.folderPath === folder.path) ?? [];

    for (const sub of folders) {
        videos.push(...getVideosFromFolder(sub));
    }

    return videos.map(video => ({
        ...video,
        createdAt: new Date(video.createdAt),
        modifiedAt: new Date(video.modifiedAt)
    }));
}