import { useStateOnChange } from 'danholibraryrjs';
import { Suspense } from 'react';
import Input from '../components/Input';
import useDomLoaded from '../hooks/useDomLoaded';
import { useRequest } from '../providers/ApiProvider';

export default function Home() {
    const [query, input, setInput] = useStateOnChange({ game: "", friend: "", sortBy: "" }, "1s");
    const { data, error } = useRequest(`/medal/${query.friend}/${query.game}?sortBy=${query.sortBy}`, undefined, [query]);
    const isDomLoaded = useDomLoaded();

    if (!isDomLoaded) return null;

    console.log(data);

    return (
        <main>
            <form className="search">
                <label htmlFor="query-game">Search for a game in Medal folder</label>
                <Input id="query" data={input} setData={setInput} property="game" />

                <label htmlFor="query-friend">Search for friendgroup in Medal folder</label>
                <Input id="query" data={input} setData={setInput} property="friend" />

                <label htmlFor="query-sortBy">Sort by</label>
                <Input id="query" data={input} setData={setInput} property="sortBy" />
            </form>

            <Suspense fallback={<div>Loading...</div>}>
                {error && <div>Error: {error.message}</div>}
                {data && <div>{JSON.stringify(data)}</div>}
            </Suspense>
        </main>
    );
}