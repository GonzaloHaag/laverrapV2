import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { statsController } from "../controllers/stats.controller.js";

export const statsRoutes = Router();
statsRoutes.get("/", catchedAsync(statsController.getStats));