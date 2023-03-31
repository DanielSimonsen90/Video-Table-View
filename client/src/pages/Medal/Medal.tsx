import { Suspense, useCallback, useMemo } from 'react';
import { useStateOnChange, Button } from 'danholibraryrjs';
import type { Folder } from 'vtv-models';

import { useRequestState } from 'providers/ApiProvider';
import { useRefresh } from 'providers/RefreshProvider';

import { FormGroupObject as FormGroup } from 'components/Form/FormGroup';
import VideoList from 'components/Medal/VideoList';
import Notification from 'components/Notification';

export default function MedalView() {
    const [forceUpdate, refreshes] = useRefresh();
    const [query, input, setInput] = useStateOnChange({ game: "", friendGroup: "" }, "1s");

    const [friendGroups] = useRequestState<string[]>('/medal/friendGroups', { refreshes });
    const [games] = useRequestState<string[]>(
        `/medal/friendGroups/${query.friendGroup}/games`,
        { group: query.friendGroup, refreshes }
    );
    const [folder, forceSetVideoFolder] = useRequestState<Folder>(
        `/medal/friendGroups/${query.friendGroup}/games/${query.game}`,
        { ...query, refreshes }
    );
    const groups = useMemo(() => new Map<keyof typeof input, string[]>([
        ['friendGroup', friendGroups ?? []],
        ['game', games ?? []]
    ]), [friendGroups, games]);

    const [newVideoFolder] = useRequestState<Folder>('/medal/new', { refreshes });

    const onNotificationClick = useCallback(() => {
        forceSetVideoFolder(newVideoFolder);
    }, [newVideoFolder, forceSetVideoFolder]);

    return (
        <div id="medal" className="page">
            <h1>Video Table View</h1>
            
            <header>
                <form className="search">
                    {groups.array().map(([property, options]) => (
                        <FormGroup key={property} data={input} setData={setInput} property={property} select={{ options }} />
                    ))}
                    <Button importance='secondary' type="reset" onClick={forceUpdate}>Refresh</Button>
                </form>

                <Notification folder={newVideoFolder} onClick={onNotificationClick} />
            </header>

            <main>
                {folder 
                    ? <VideoList folder={folder} /> 
                    : <h1>There are no videos.</h1>}
            </main>
        </div>
    );
}