import { jsx as _jsx } from "react/jsx-runtime";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Home from './pages/Home';
export const render = (url) => renderToString(_jsx(StaticRouter, Object.assign({ location: url }, { children: _jsx(Home, {}) })));
