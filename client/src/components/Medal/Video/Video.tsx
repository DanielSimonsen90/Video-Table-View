import { useRequest } from 'providers/ApiProvider';
import { VideoCard, VideoTableRow } from './components';
import { VideoProps } from './VideoTypes';

export default function VideoView({ folder, isTable, ...props }: VideoProps) {
    const [game, friendGroup] = folder.path.split('/').reverse();
    const requestPlayVideo = useRequest<void>();
    const requestOpenFolder = useRequest<void>();
    const componentProps = { requestPlayVideo, requestOpenFolder, game, friendGroup, ...props };

    return isTable 
        ? <VideoTableRow {...componentProps} />
        : <VideoCard {...componentProps} />
}