import { IErrorHandler } from "./IErrorHandler";
import { ErrorResponse } from "../../response/ErrorResponse";
import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../../ioc/types";
import { ILogger } from "../logger/ILogger";

@injectable()
export class ErrorHandler implements IErrorHandler {
  @inject(TYPES.ILogger)
  private readonly _logger: ILogger;

  handle(): (error: Error, req: Request, res: Response, next: NextFunction) => any {
    return (error: Error, req: Request, res: Response, next: NextFunction): any => {
      if (!error) {
        return next();
      }
  
      this._logger.error(error.message);
  
      return res.status(500).json(ErrorResponse.Internal());
    }
  }
};
