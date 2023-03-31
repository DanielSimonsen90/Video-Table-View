import createApi from "express";
import cors from "cors";
import { registerEndpoints, log, useEnv } from "./helpers.js";

const PORT = useEnv().PORT || 3001;
const api = createApi();

api.use(cors(), (req, _, next) => {
    log(req);
    next();
});

registerEndpoints(api);

api.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));