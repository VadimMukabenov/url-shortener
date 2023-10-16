import http from 'http';
import { IRouter } from './Router';
import { IMiddleware, IMiddlewareCustomData, IRequest, IResponse, THttpMethod } from '../_types';
import { checkForParamsMatch, setReqParams, setReqUrlDetails } from '../utils/setParams';
import { setReqRedirect } from '../utils/redirect';

interface ICustomMiddleware {
    handler: IMiddleware;
    data?: IMiddlewareCustomData;
}

class App {
    middlewares: ICustomMiddleware[];
    constructor(){
        this.middlewares = [];
    }

    use(middleware: IMiddleware, data?: IMiddlewareCustomData){
        if (typeof middleware !== 'function') {
            throw new Error('Middleware must be a function!');
        }
        this.middlewares.push({
            handler: middleware,
            data,
        });
    }

    listen(PORT: number | string, callback: () => void){
        const handler = (req: IRequest, res: IResponse) => {
            this.handle(req, res, (error: Error) => {
                if(error){
                    console.log(error.message);
                    res.writeHead(500);
                    res.end('Internal server error');
                }
                // console.log("after all middlewares and routes");
            });
        }
        return http.createServer(handler).listen(PORT, callback);
    }

    handle(req: IRequest, res: IResponse, callback: (arg?: unknown) => void) {
        let idx = 0;

        // TODO. Move to middlewares at init phase.
        setReqUrlDetails(req);
        setReqRedirect(res);

        const next = (err?: Error) => {
            if (err != null) {
                return setImmediate(() => callback(err));
            }

            if (idx >= this.middlewares.length) {
                return setImmediate(() => callback());
            }
            
            if(this.middlewares[idx].data){
                const { handler, data } = this.middlewares[idx];

                if(checkForParamsMatch(req.path, data.path) && req.method === data.method) {
                    setReqParams(req, req.path, data.path);
                    return setImmediate(() => handler(req, res, next));
                }
                // increase idx only if handler didn't pass the condition
                idx++;
                next();
            }

            const nextMiddleware = this.middlewares[idx++]?.handler;

            if(!nextMiddleware) {
                return setImmediate(() => callback());
            }
            
            setImmediate(() => {
                try {
                    // Execute the layer and rely on it to call `next()`
                    nextMiddleware(req, res, next);
                } catch(error) {
                    next(error);
                }
            });
        }

        next();
    }

    addRouter(router: IRouter){
        const endpoints = router.endpoints;
        Object.keys(endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            
            Object.keys(endpoint).forEach((method: THttpMethod) => {
                const handler = endpoint[method];
                
                const data = {
                    path,
                    method
                }

                this.use(handler, data);
            });
        });
    }

}

export default App;
