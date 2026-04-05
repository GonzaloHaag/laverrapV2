import type { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors.js";

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  res.status(err instanceof ClientError ? err.statusCode : 500).json({
    ok:false,
    message: err.message || "Internal Server Error"
  });
}