import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';

hydrateRoot(
    document.getElementById('app'),
    <BrowserRouter>
        <Home />
    </BrowserRouter>,
)
console.log('hydrated')