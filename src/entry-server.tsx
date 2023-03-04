import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Folder from './models/Folder';
import Medal from './pages/Medal'

export const render = (url: string, folder: Folder) => renderToString(
    <StaticRouter location={url}>
        <Medal folder={folder} />
    </StaticRouter>
);