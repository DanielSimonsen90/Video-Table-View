import { Suspense } from 'react';
import { useStateOnChange } from 'danholibraryrjs';
import type Folder from '../../../models/Folder';

import Input from '../components/Input';
import { useRequest } from '../providers/ApiProvider';
import FormGroup from '../components/FormGroup';

const friendGroupLock = {};

export default function MedalView() {
    const [query, input, setInput] = useStateOnChange({ game: "", friendGroup: "" }, "1s");
    const friendGroups = useRequest<string[]>('/medal/friendGroups');
    const games = useRequest<string[]>(`/medal/${query.friendGroup}`, { group: query.friendGroup });
    const videos = useRequest<Folder>(`/medal/${query.friendGroup}/${query.game}`, query);

    console.log({ query, input, friendGroups, games, videos });

    return (
        <main>
            <form className="search">
                <FormGroup data={input} setData={setInput} property="friendGroup" select={{ options: friendGroups ?? [] }}  />
                <FormGroup data={input} setData={setInput} property="game" select={{ options: games ?? [] }}  />
            </form>

            <Suspense fallback={<div>Loading...</div>}>
                {videos && <div>{JSON.stringify(videos)}</div>}
            </Suspense>
        </main>
    );
}