import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { employeeController } from "../controllers/employee.controller.js";

export const employeeRoutes = Router();

employeeRoutes.get("/", catchedAsync(employeeController.getAll));
employeeRoutes.post("/", catchedAsync(employeeController.create));
employeeRoutes.put("/:id", catchedAsync(employeeController.update));
employeeRoutes.patch("/:id/deactivate", catchedAsync(employeeController.deactivate));
employeeRoutes.patch("/:id/activate", catchedAsync(employeeController.activate));
