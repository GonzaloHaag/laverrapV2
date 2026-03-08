import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { serviceController } from "../controllers/service.controller.js";

export const serviceRoutes = Router();

serviceRoutes.get("/", catchedAsync(serviceController.getAll));
serviceRoutes.post("/", catchedAsync(serviceController.create));
serviceRoutes.put("/:id", catchedAsync(serviceController.update));
serviceRoutes.delete("/:id", catchedAsync(serviceController.delete));
