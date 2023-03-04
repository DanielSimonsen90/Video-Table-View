import { Suspense } from 'react';
import { useStateOnChange } from 'danholibraryrjs';
import type { Folder } from 'vtv-models';

import { useRequestState } from 'providers/ApiProvider';
import FormGroup from 'components/Form/FormGroup';
import VideoList from 'components/Medal/VideoList';

export default function MedalView() {
    const [query, input, setInput] = useStateOnChange({ game: "", friendGroup: "" }, "1s");
    const friendGroups = useRequestState<string[]>('/medal/friendGroups');
    const games = useRequestState<string[]>(`/medal/${query.friendGroup}`, { group: query.friendGroup });
    const folder = useRequestState<Folder>(`/medal/${query.friendGroup}/${query.game}`, query);

    console.log({ query, input, friendGroups, games, folder });

    return (
        <main>
            <form className="search">
                <FormGroup data={input} setData={setInput} property="friendGroup" select={{ options: friendGroups ?? [] }}  />
                <FormGroup data={input} setData={setInput} property="game" select={{ options: games ?? [] }}  />
            </form>

            <Suspense fallback={<div>Loading...</div>}>
                {folder ? <VideoList folder={folder} /> : <h1>There are no videos.</h1>}
            </Suspense>
        </main>
    );
}