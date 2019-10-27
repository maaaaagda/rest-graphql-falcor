import { Request, Response, NextFunction } from "express";

export interface IBaseController {
    process(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
