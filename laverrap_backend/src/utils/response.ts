import type { Response } from "express";

export function response<T>({ res, statusCode, data, message } : { res:Response, statusCode:number, data:T, message: string }) {
  return res.status(statusCode).json({
    ok: true,
    message: message,
    data: data
  });
}