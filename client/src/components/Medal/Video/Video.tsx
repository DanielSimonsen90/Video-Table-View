import { useRequest } from 'providers/ApiProvider';
import { useModal } from 'providers/ModalProvider/ModalProviderHooks';
import { VideoCard, VideoTableRow } from './components';
import { VideoProps } from './VideoTypes';

export default function VideoView({ folder, isTable, ...props }: VideoProps) {
    const [game, friendGroup] = folder.path.split('/').reverse();
    const openModal = useModal();
    // const requestPlayVideo = useRequest<void>(`/medal/play?path=${props.video.path}`);
    const requestPlayVideo = openModal(props)
    const requestOpenFolder = useRequest<void>(`/medal/open?path=${props.video.folderPath}`);

    const componentProps = { 
        requestPlayVideo, requestOpenFolder,
        game, friendGroup, ...props 
    };

    return isTable 
        ? <VideoTableRow {...componentProps} />
        : <VideoCard {...componentProps} />
}