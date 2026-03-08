import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { employeeController } from "../controllers/employee.controller.js";

const employeeRoutes = Router();

employeeRoutes.get("/", catchedAsync(employeeController.getAll));
employeeRoutes.post("/", catchedAsync(employeeController.create));
export default employeeRoutes;