import VideoView from 'components/Medal/Video';
import { VideoListCardsProps } from './VideoListCardsTypes';

export default function VideoListCards({ videos, folder, sortedBy, isAscending }: VideoListCardsProps) {
    return (<>
        <p><b>Sorted by:</b> {sortedBy}, {isAscending ? 'Ascending' : 'Descending'}</p>
        <div className='video-list video-list--cards'>
            {videos.map(video => <VideoView key={video.path} {...{ video, folder, isTable: false }} />)}
        </div>
    </>);
}