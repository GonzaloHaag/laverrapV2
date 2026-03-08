import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { clientController } from "../controllers/client.controller.js";

export const clientRoutes = Router();

clientRoutes.get("/", catchedAsync(clientController.getAll));
clientRoutes.post("/", catchedAsync(clientController.create));
clientRoutes.put("/:id", catchedAsync(clientController.update));
clientRoutes.patch("/:id/deactivate", catchedAsync(clientController.deactivate));
clientRoutes.patch("/:id/activate", catchedAsync(clientController.activate));