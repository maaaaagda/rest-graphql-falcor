
import { Request, Response } from "express";
import { inject } from "inversify";

import { IBaseController } from "./IBaseController";
import { TYPES } from "../../ioc/types";
import { IValidator } from "../validator/IValidator";
import { SuccessResponse } from "../../response/SuccessResponse";
import { Schema } from "@hapi/joi";

export abstract class BaseController implements IBaseController {
    @inject(TYPES.IValidator)
    private readonly _validator: IValidator;

    get validation(): Schema {
        return null;
    }

    public async execute(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, this.validation);
        return this.process(req, res);
    }

    public async process(req: Request, res: Response): Promise<Response> {
        return res.json(SuccessResponse.Ok());
    }
}
