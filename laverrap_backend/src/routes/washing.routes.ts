import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { washingController } from "../controllers/washing.controller.js";


export const washingRoutes = Router();

washingRoutes.get("/", catchedAsync(washingController.getAll));
washingRoutes.post("/", catchedAsync(washingController.create));
washingRoutes.patch("/:id", catchedAsync(washingController.updateStatus));
washingRoutes.delete("/:id", catchedAsync(washingController.delete));