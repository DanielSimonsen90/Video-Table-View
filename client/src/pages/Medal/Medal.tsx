import { Suspense, useMemo } from 'react';
import { useStateOnChange } from 'danholibraryrjs';
import type { Folder, NewVideoNotification } from 'vtv-models';

import { useRequestState } from 'providers/ApiProvider';
import { FormGroupObject as FormGroup } from 'components/Form/FormGroup';
import VideoList from 'components/Medal/VideoList';
import Notification from 'components/Notification';

export default function MedalView() {
    const [query, input, setInput] = useStateOnChange({ game: "", friendGroup: "" }, "1s");
    const [friendGroups, fGError] = useRequestState<string[]>('/medal/friendGroups');
    const [games, gError] = useRequestState<string[]>(`/medal/friendGroups/${query.friendGroup}/games`, { group: query.friendGroup });
    const [folder, fError] = useRequestState<Folder>(`/medal/friendGroups/${query.friendGroup}/games/${query.game}`, query);
    const [newVideosNotification, nVNError] = useRequestState<NewVideoNotification>('/medal/new', {});
    const groups = useMemo(() => new Map<keyof typeof input, string[]>([
        ['friendGroup', friendGroups ?? []],
        ['game', games ?? []]
    ]), [friendGroups, games]);
    const error = useMemo(() => fGError || gError || fError || nVNError, [fGError, gError, fError, nVNError]);
    console.log('Notification', newVideosNotification)

    return (
        <div id="medal" className="page">
            <h1>Video Table View</h1>
            {error ? (
                <article className='error'>
                    <h1>{error.message}</h1>
                    <p>{error.stack}</p>
                </article>
            ) : (
                <Suspense fallback={<div>Loading...</div>}>
                    <header>
                        <form className="search">
                            {groups.array().map(([property, options]) => (
                                <FormGroup key={property} data={input} setData={setInput} property={property} select={{ options }} />
                            ))}
                        </form>
                        <Notification notification={newVideosNotification} />
                    </header>
                    <main>
                        {folder ? <VideoList folder={folder} /> : <h1>There are no videos.</h1>}
                    </main>
                </Suspense>
            )}
        </div>
    );
}