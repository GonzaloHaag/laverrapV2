import { Router } from "express";
import { catchedAsync } from "../utils/catched-async.js";
import { authController } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", catchedAsync(authController.login));

export default authRoutes;