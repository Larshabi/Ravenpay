import { Response, Request, NextFunction } from "express";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;