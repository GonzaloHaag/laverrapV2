import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { config } from "../config.js";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del header Authorization
  if (!token) {
    return res.status(401).json({ ok:false, message: "No se envio el token" });
  }
  req.user = undefined; // Inicializar user como undefined

  /** Verificar token */
  try {
    const data = jwt.verify(token, config.JWT_SECRET_KEY!) as jwt.JwtPayload;
    req.user = data.user; // se inserta el user en cada request
  } catch (error) {
    console.error("Error verifying token:", error);
    if(error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ ok:false, message: "Token invalido" });
    }
    if(error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ ok:false, message: "Token expirado" });
    }
    return res.status(500).json({ ok:false, message: "Error interno del servidor" });
  }

  next();
};