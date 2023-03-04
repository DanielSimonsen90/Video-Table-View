import type { Request } from 'express';

export default function log(req: Request, message?: string) {
    const value = `[${new Date().toLocaleTimeString()}] [${req.method} ${req.originalUrl}]`;
    console.log(message ? `${value}: ${message}` : value);
}