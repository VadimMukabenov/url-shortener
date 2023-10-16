import { IRequest, IResponse } from "../_types";

export const parseJSON = (req: IRequest, res: IResponse, next: (arg?: unknown) => void) => {
    res.send = ({ data, status = 200 }) => {
        res.writeHead(status, {
            'Content-type' : 'application/json'
        });
        res.end(JSON.stringify(data));
    }
    
    next();
}

