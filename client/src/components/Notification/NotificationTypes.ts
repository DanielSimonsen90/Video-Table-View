import { Folder } from "vtv-models"

export type NotificationProps = {
    folder?: Folder
    timeout?: number,
    onClick?: () => void
}