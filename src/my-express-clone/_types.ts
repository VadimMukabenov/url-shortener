import http from "http";
import { ParsedUrlQuery } from "querystring";

export interface MyCustomRequest extends http.IncomingMessage {
    params?: {
        [field: string]: unknown;
    };
    path?: string;
    query?: ParsedUrlQuery;
    body: {
        [field: string]: unknown;
    };
}

export interface MyCustomResponse extends http.ServerResponse {
    send?: (args: { data: unknown, status?: number }) => void;
    redirect?: (urlToRedirect: string) => void;
}

export type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type IRequest = MyCustomRequest;
export type IResponse = MyCustomResponse;

export type IMiddleware = (req: IRequest, res: IResponse, next: ((arg: unknown) => void)) => void;

export interface IMiddlewareCustomData {
    path: string;
    method: THttpMethod;
}
