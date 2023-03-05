import { BaseProps } from "danholibraryrjs"
import { Video, Folder } from "vtv-models"

export type VideoProps = BaseProps<HTMLTableRowElement, false> & {
    video: Video,
    folder: Folder,
    isTable: boolean,
}