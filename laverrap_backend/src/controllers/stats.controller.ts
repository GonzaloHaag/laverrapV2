import type { Request, Response } from "express";
import { statsService } from "../services/stats.service.js";
import { response } from "../utils/response.js";

export const statsController = {
  async getStats(req:Request, res: Response) {
    const userId = Number(req.user?.id);
    const stats = await statsService.getStats({ userId });
    return response({ res, statusCode: 200, data: stats, message: "Estadísticas obtenidas exitosamente" });
  }
};