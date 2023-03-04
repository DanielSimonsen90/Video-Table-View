import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Create Vite server in middleware mode and configure the app type as
// 'custom', disabling Vite's own HTML serving logic so parent server
// can take control
const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
})

// Use vite's connect instance as middleware. If you use your own
// express router (express.Router()), you should use router.use
app.use(vite.middlewares)

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

import MedalRouter from './api/medal.js';
app.use('/api/medal', MedalRouter);
app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
        // Apply Vite HTML transforms. This injects the Vite HMR client,
        // and also applies HTML transforms from Vite plugins, e.g. global
        // preambles from @vitejs/plugin-react
        const template = await vite.transformIndexHtml(url, fs.readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8',
        ))

        // Load the server entry. ssrLoadModule automatically transforms
        // ESM source code to be usable in Node.js! There is no bundling
        // required, and provides efficient invalidation similar to HMR.
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

        // render the app HTML. This assumes entry-server.js's exported
        //  `render` function calls appropriate framework SSR APIs,
        // e.g. ReactDOMServer.renderToString()
        const appHtml = await render(url)

        // Inject the app-rendered HTML into the template.
        const html = template.replace({
            [`<!--ssr-outlet-->`]: appHtml,
            [`<!--ssr-api-url-->`]: `http://localhost:${PORT}/api`,
        });

        // Send the rendered HTML back.
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        vite.ssrFixStacktrace(e)
        next(e)
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
