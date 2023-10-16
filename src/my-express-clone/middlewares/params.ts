import url from 'url';
import { IRequest, IResponse } from '../_types';

export const setReqParams = (req: IRequest, res: IResponse, next: (arg?: unknown) => void) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const query = urlObj.query;

    req.params = {
        pathname,
        query
    };

    next();
}
