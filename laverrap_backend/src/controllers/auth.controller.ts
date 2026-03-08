import type { Request, Response } from "express";
import { response } from "../utils/response.js";
import { authService } from "../services/auth.service.js";
import { loginSchema } from "../schemas/auth.schema.js";

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const parsed = loginSchema.safeParse({ email, password });
    if(!parsed.success) return response({ res, statusCode: 400, data: null, message: "Error de validación, revisa los campos.", errors: parsed.error.issues });
    const result = await authService.login({ email, password });
    return response({ res, statusCode: 200, data: result, message: "Login exitoso" });
  }
};