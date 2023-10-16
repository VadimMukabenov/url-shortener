import { IResponse } from "../_types";

export const setReqRedirect = (res: IResponse) => {
    res.redirect = (urlToRedirect) => {
        res.writeHead(301, {
            location: `${urlToRedirect}`,
        });
        res.end();
    }
}
