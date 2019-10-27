
import { Request, Response } from "express";
import { inject } from "inversify";

import { Schema } from "@hapi/joi";
import { TYPES } from "../../ioc/types";
import { SuccessResponse } from "../../response/SuccessResponse";
import { IValidator } from "../validator/IValidator";
import { IBaseController } from "./IBaseController";

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
