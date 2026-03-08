import cors from "cors";
import { ACCEPTED_ORIGINS } from "../utils/consts.js";
export function corsMiddleware() {
  return cors({
    origin: (origin, callback) => {
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origen no permitido por CORS"));
    }
  });
}