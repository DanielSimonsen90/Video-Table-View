import { Video } from "vtv-models"

export type TableHeaderProps = {
    title: keyof Video,
    sortedBy: keyof Video,
    onHeadClick: (name: keyof Video) => void
}