import type { BaseProps } from "danholibraryrjs";
import type { useVideoListSearch } from "../../VideoListHooks";
import { DisplayProps } from "../../VideoListTypes";

export type VideoListSearchResult = ReturnType<typeof useVideoListSearch>;

export type VideoListTableProps = BaseProps<HTMLTableElement, false> & DisplayProps;