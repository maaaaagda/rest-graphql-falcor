import { NextFunction, Request, Response } from "express";

export interface IBaseController {
    process(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
