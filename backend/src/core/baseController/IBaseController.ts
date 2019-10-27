import { Request, Response } from "express";

export interface IBaseController {
    process(req: Request, res: Response): Promise<Response>;
}
