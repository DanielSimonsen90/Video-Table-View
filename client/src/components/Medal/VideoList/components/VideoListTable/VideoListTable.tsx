import type { Video } from 'vtv-models';
import TableHeader from '../TableHeader';
import VideoView from 'components/Medal/Video';
import type { VideoListTableProps } from './VideoListTableTypes';

export default function VideoListTable({ folder, videos, isAscending, toggleAscending, sortedBy, setSortedBy }: VideoListTableProps) {
    const onHeadClick = (name: keyof Video) => {
        if (name === sortedBy) return toggleAscending();

        setSortedBy(name as keyof Video);
        toggleAscending(true);
    }

    return (<>
        <table className='video-list video-list--table'>
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
                {videos.map(video => <VideoView key={video.path} {...{ video, folder, isTable: true }} />)}
            </tbody>
        </table>
    </>);
}