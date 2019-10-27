import { NextFunction, Response, Request } from "express";

export interface IErrorHandler {
    handle(): (error: Error, req: Request, res: Response, next: NextFunction) => any;
};
