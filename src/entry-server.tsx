import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Home from './pages/Home'

export const render = (url: string) => renderToString(
    <StaticRouter location={url}>
        <Home />
    </StaticRouter>
);