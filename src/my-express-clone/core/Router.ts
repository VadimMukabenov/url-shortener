// endpoints = {
//     "/users" : {
//         "GET" : handler
//     }
// }

import { IMiddleware, THttpMethod } from "../_types";

type IRouterEndpoint = {
    [method in THttpMethod]?: IMiddleware;
};

interface IRouterEndpoints {
    [path: string]: IRouterEndpoint; 
}

export interface IRouter {
    endpoints: IRouterEndpoints;
    request: (method: THttpMethod, path: string, handler: IMiddleware) => void;
    get: (path: string, handler: IMiddleware) => void;
    post: (path: string, handler: IMiddleware) => void;
    put: (path: string, handler: IMiddleware) => void;
    delete: (path: string, handler: IMiddleware) => void;
}

class Router implements IRouter {
    endpoints: IRouterEndpoints;
    constructor(){
        this.endpoints = {};
    }

    request (method = "GET", path: string, handler: IMiddleware) {
        const endpoints = this.endpoints;
        if(!endpoints[path]) {
            endpoints[path] = {};
        }
        const endpoint = endpoints[path];  // /users
        if(endpoint[method]) {
            throw new Error(`Handler for method ${method} already exists on path ${endpoint}`);
        }
        endpoint[method] = handler;
    }

    get (path: string, handler: IMiddleware) {
        this.request("GET", path, handler);
    }
    post (path: string, handler: IMiddleware) {
        this.request("POST", path, handler);
    }
    put (path: string, handler: IMiddleware) {
        this.request("PUT", path, handler);
    }
    delete (path: string, handler: IMiddleware) {
        this.request("DELETE", path, handler);
    }
}

export default Router;
