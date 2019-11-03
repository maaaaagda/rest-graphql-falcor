
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "../../ioc/types";
import { SuccessResponse } from "../../response/SuccessResponse";
import { IValidator } from "../validator/IValidator";
import { IBaseController } from "./IBaseController";

@injectable()
export abstract class BaseController implements IBaseController {

    @inject(TYPES.IValidator)
    protected readonly _validator: IValidator;

    public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return res.json(SuccessResponse.Ok());
    }
}
