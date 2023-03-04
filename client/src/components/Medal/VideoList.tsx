import { useMemo, useState } from 'react';
import { BaseProps } from 'danholibraryrjs';
import { Video, Folder } from 'vtv-models';
import useSort from 'hooks/useSort';

type Props = BaseProps<HTMLDivElement, false> & {
    folder: Folder
}

export default function VideoList({ folder }: Props) {
    const [sortedBy, setSortedBy] = useState<keyof Video>('name');
    const videos = useMemo(() => getVideosFromFolder(folder), [folder.name]);
    const [sortedVideos, isAscending, toggleAscending] = useSort(videos, sortedBy);

    const onHeadClick = (name: keyof Video) => {
        if (name === sortedBy) return toggleAscending();
        
        setSortedBy(name as keyof Video);
        toggleAscending(true);
    }

    return (<>
        <p><b>Sorted by:</b> {sortedBy}, {isAscending ? 'Ascending' : 'Descending'}</p>
        <table className='video-list'>
            <thead>
                <tr>
                    <TableHeader title='name' {...{ onHeadClick, sortedBy }} />
                    <TableHeader title='folderPath' {...{ onHeadClick, sortedBy }} />
                    <TableHeader title='createdAt' {...{ onHeadClick, sortedBy }} />
                </tr>
            </thead>
            <tbody>
                {sortedVideos.map(video => (
                    <tr key={video.path}>
                        <td>{video.name}</td>
                        <td>{video.folderPath}</td>
                        <td>{video.createdAt.toLocaleDateString()}</td>
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
    }}>{name}</th>;
}