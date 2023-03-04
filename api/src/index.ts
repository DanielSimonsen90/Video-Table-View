import createApi from "express";
import cors from "cors";
import log from "./log.js";

import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;
const api = createApi();

api.use(cors());

api.use((req, res, next) => {
    log(req);
    next();
});

import Medal from './medal.js';
api.use('/api/medal', Medal);

api.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});