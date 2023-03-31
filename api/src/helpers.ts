import type { Request, Express } from 'express';
import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

export function log(req: Request, message?: string) {
    const value = `[${new Date().toLocaleTimeString()}] [${req.method} ${req.originalUrl}]`;
    console.log(message ? `${value}: ${message}` : value);
}

export function useEnv() {
    config();
    return process.env;
}

export async function registerEndpoints(api: Express) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const endpointsPath = `${__dirname}\\endpoints`;
    const endpoints = readdirSync(endpointsPath);

    for (const endpoint of endpoints) {
        const filePath = `${endpointsPath}\\${endpoint}\\index.js`;
        if (!existsSync(filePath)) {
            console.warn(`Endpoint "${endpoint}" does not have an index.js file, skipping...`);
            continue;
        }

        console.log(filePath)
        const { default: router } = await import(filePath.replace(__dirname, '.').replace('\\', '/'));
        api.use(`/api/${endpoint}`, router);
    }
}