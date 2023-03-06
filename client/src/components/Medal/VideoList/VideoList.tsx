import { useMemo, useState } from 'react';
import { useMediaQuery } from 'danholibraryrjs';
import type { Video } from 'vtv-models'; 
import type { VideoListProps } from './VideoListTypes';

import { VideoListTable, VideoListCards } from './components';
import { useVideoListSearch } from './VideoListHooks';
import { getVideosFromFolder } from './VideoListFunctions';
import { TABLE_QUERY } from './VideoListConstants';

export default function VideoList({ folder }: VideoListProps) {
    const [sortedBy, setSortedBy] = useState<keyof Video>('name');
    const [search, setSearch] = useState('');
    const videoData = useMemo(() => getVideosFromFolder(folder), [folder]);
    const [videos, isAscending, toggleAscending] = useVideoListSearch(videoData, sortedBy, search);
    const isTable = useMediaQuery(TABLE_QUERY);

    const displayProps = {
        folder, videos,
        isAscending, toggleAscending,
        sortedBy, setSortedBy
    }

    return (<>
        <input key='search' type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
        {isTable 
            ? <VideoListTable {...displayProps} /> 
            : <VideoListCards {...displayProps} />
        }
    </>);
}