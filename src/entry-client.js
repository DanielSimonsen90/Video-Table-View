import { jsx as _jsx } from "react/jsx-runtime";
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
hydrateRoot(document.getElementById('app'), _jsx(BrowserRouter, { children: _jsx(Home, {}) }));
console.log('hydrated');
