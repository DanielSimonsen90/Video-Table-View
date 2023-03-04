import { Suspense, useMemo } from 'react';
import { useStateOnChange } from 'danholibraryrjs';

import Medal from '../api/medal';
import Input from '../components/Input';
import useDomLoaded from '../hooks/useDomLoaded';

export default function MedalView() {
    const [query, input, setInput] = useStateOnChange({ game: "", friendGroup: "", sortBy: "" }, "1s");
    // const data = useMemo(() => Medal.getAll(query), [query]);
    const isDomLoaded = useDomLoaded();
    
    if (!isDomLoaded) return null;

    // console.log(data);

    return (
        <main>
            <form className="search">
                <label htmlFor="query-game">Search for a game in Medal folder</label>
                <Input id="query" data={input} setData={setInput} property="game" />

                <label htmlFor="query-friend">Search for friendgroup in Medal folder</label>
                <Input id="query" data={input} setData={setInput} property="friendGroup" />

                <label htmlFor="query-sortBy">Sort by</label>
                <Input id="query" data={input} setData={setInput} property="sortBy" />
            </form>

            <Suspense fallback={<div>Loading...</div>}>
                {/* {data && <div>{JSON.stringify(data)}</div>} */}
            </Suspense>
        </main>
    );
}