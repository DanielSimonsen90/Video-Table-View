import { Switch } from 'danholibraryrjs';
import { useMemo } from 'react';

import VideoView from 'components/Medal/Video';
import { FormGroup, Options } from 'components/Form';
import { decodeProperty } from 'helpers';
import { VideoListCardsProps } from './VideoListCardsTypes';

export default function VideoListCards({ 
    videos, folder, 
    sortedBy, setSortedBy, 
    isAscending, toggleAscending 
}: VideoListCardsProps) {
    const options = useMemo(() => Object.keysOf(videos[0])
        .map(prop => [prop, decodeProperty(prop)] as Options<any>)
    , [videos]);

    return (<>
        <div className="sort">
            <FormGroup label="Sort by" select={{ 
                options, 
                value: sortedBy, 
                setValue: setSortedBy 
            }} />
            <div className="form-group">
                <label>Ascend</label>
                <Switch checked={isAscending} onChange={() => toggleAscending()} />
            </div>
        </div>
        <div className='video-list video-list--cards'>
            {videos.map(video => <VideoView key={video.path} {...{ video, folder, isTable: false }} />)}
        </div>
    </>);
}