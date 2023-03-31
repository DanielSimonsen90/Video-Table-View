import { BaseProps } from "danholibraryrjs"
import { Video, Folder } from "vtv-models"

export type VideoProps = BaseProps<HTMLTableRowElement, false> & {
    video: Video,
    folder: Folder,
    isTable: boolean,
}

export type VideoComponentProps = Omit<VideoProps, 'folder' | 'isTable'> & {
    friendGroup: string,
    game: string,
    requestPlayVideo(): void,
    requestOpenFolder(): Promise<void>,
}