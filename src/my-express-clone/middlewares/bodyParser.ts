import { IRequest, IResponse } from "../_types";

export const bodyParser = (req: IRequest, res: IResponse, next: (arg?: unknown) => void) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        if(body){
            req.body = JSON.parse(body);
        }
        next();
    });
}
