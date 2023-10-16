import { bodyParser } from "./middlewares/bodyParser";
import { setReqParams } from "./middlewares/params";
import { parseJSON } from "./middlewares/parseJSON";

export { default as App } from "./core/App";
export { default as Router } from "./core/Router";

export const middlewares = {
    bodyParser,
    setReqParams,
    parseJSON,
};
