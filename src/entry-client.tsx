import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Medal from './pages/Medal';

hydrateRoot(
    document.getElementById('app'),
    <BrowserRouter>
        <Medal />
    </BrowserRouter>,
)
console.log('hydrated')