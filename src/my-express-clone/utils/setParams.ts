import pathToRegexp from 'path-to-regex';
import { IRequest } from '../_types';
import url from 'url';

export function checkForParamsMatch(urlPathname: string, endpointPath: string) {
    const parser = new pathToRegexp(endpointPath);
    const result = parser.match(urlPathname);

    if(!result) {
        return false;
    }

    Object.keys(result).forEach(param => {
        if(!result[param]) {
            return false;
        }
    });

    return true;
}

export function setReqParams(req: IRequest, urlPathname: string, endpointPath: string) {
    const parser = new pathToRegexp(endpointPath);
    const result = parser.match(urlPathname);
    if (result) {
        if(!req.params) {
            req.params = {};
        }
        req.params = result;
    }
} 

export const setReqUrlDetails = (req: IRequest) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const query = urlObj.query;

    req.path = pathname;
    req.query = query;
}
