import { NextFunction, Request, Response } from "express";

declare type expressCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export const handleEndpointError = (
  req: Request,
  res: Response,
  next: NextFunction,
  handle: expressCallback
): any => {
  return async () => {
    try {
      return await handle(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
