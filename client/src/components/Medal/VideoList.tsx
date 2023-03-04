import { useMemo, useState } from 'react';
import { BaseProps } from 'danholibraryrjs';
import { Video, Folder } from 'vtv-models';
import useSort from 'hooks/useSort';
import { decodeProperty } from 'helpers';
import { useRequest } from 'providers/ApiProvider';

type Props = BaseProps<HTMLDivElement, false> & {
    folder: Folder
}

function useVideoListSearch(videos: Video[], sortedBy: keyof Video, search: string) {
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

export default function VideoList({ folder }: Props) {
    const [sortedBy, setSortedBy] = useState<keyof Video>('name');
    const [search, setSearch] = useState('');
    const videoData = useMemo(() => getVideosFromFolder(folder), [folder.name]);
    const [videos, isAscending, toggleAscending] = useVideoListSearch(videoData, sortedBy, search);

    const [game, friendGroup] = folder.path.split('/').reverse();
    const requestPlayVideo = useRequest();
    const requestOpenFolder = useRequest(`/medal/${friendGroup}/${game}/open`);

    const onHeadClick = (name: keyof Video) => {
        if (name === sortedBy) return toggleAscending();
        
        setSortedBy(name as keyof Video);
        toggleAscending(true);
    }

    return (<>
        <p><b>Sorted by:</b> {sortedBy}, {isAscending ? 'Ascending' : 'Descending'}</p>
        <input type='text' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
        <table className='video-list'>
            <thead>
                <tr>
                    <TableHeader title='name' {...{ onHeadClick, sortedBy }} />
                    <TableHeader title='folderPath' {...{ onHeadClick, sortedBy }} />
                    <TableHeader title='createdAt' {...{ onHeadClick, sortedBy }} />
                    <TableHeader title='modifiedAt' {...{ onHeadClick, sortedBy }} />
                    <th>Buttons</th>
                </tr>
            </thead>
            <tbody>
                {videos.map(video => (
                    <tr key={video.path}>
                        <td>{video.name}</td>
                        <td>{video.folderPath}</td>
                        <td>{video.createdAt.toLocaleDateString()}</td>
                        <td>{video.modifiedAt.toLocaleDateString()}</td>
                        <div className="button-container">
                            <button onClick={() => requestPlayVideo(
                                `/medal/${friendGroup}/${game}/play?path=${video.path}`,
                            )}>Play</button>
                            <button onClick={() => requestOpenFolder(
                                `/medal/${friendGroup}/${game}/open?path=${video.folderPath}`
                            )}>Open Folder</button>
                        </div>
                    </tr>
                ))}
            </tbody>
        </table>
    </>);
}

function getVideosFromFolder(folder: Folder): Video[] {
    const { folders } = folder;
    const videos = folder.videos.filter(video => video.folderPath === folder.path);

    for (const sub of folders) {
        videos.push(...getVideosFromFolder(sub));
    }

    return videos.map(video => ({
        ...video,
        createdAt: new Date(video.createdAt),
        modifiedAt: new Date(video.modifiedAt)
    }));
}

type TableHeaderProps = {
    title: keyof Video,
    sortedBy: keyof Video,
    onHeadClick: (name: keyof Video) => void
}

function TableHeader({ title: name, sortedBy, onHeadClick }: TableHeaderProps) {
    return <th onClick={() => onHeadClick(name)} {...{
        className: sortedBy === name ? 'selected' : '',
    }}>{decodeProperty(name)}</th>;
}