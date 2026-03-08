import "express";
import type { JwtUser } from "./auth.types.ts";
declare global {
    namespace Express {
        interface Request {
            user: JwtUser | undefined;
        }
    }
}