import type { Response } from "express";

export function response<T>({ res, statusCode, data, message, errors } : { res:Response, statusCode:number, data?:T, message: string, errors?: unknown}) {
  return res.status(statusCode).json({
    ok: true,
    message: message,
    data: data,
    errors: errors
  });
}