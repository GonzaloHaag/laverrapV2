import type { Request, Response } from "express";
import { washingService } from "../services/washing.service.js";
import { response } from "../utils/response.js";
import { washingSchema } from "../schemas/washing.schema.js";

export const washingController = {
  async getAll(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const washed = await washingService.getAll({ userId });
    return response({ res, statusCode: 200, data: washed, message: "Lavados obtenidos exitosamente" });
  },
    
  async create(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const validated = washingSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const newWashing = await washingService.create({ userId, data: validated.data });
    return response({ res, statusCode: 201, data: newWashing, message: "Lavado creado exitosamente" });
  },
  async updateStatus(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const washingId = Number(req.params.id);
    const { status } = req.body;
    if (!status) {
      return response({ res, statusCode: 400, message: "El estado es requerido" });
    }
    const updatedWashing = await washingService.updateStatus({ userId, washingId, status });
    return response({ res, statusCode: 200, data: updatedWashing, message: "Estado del lavado actualizado exitosamente" });
  },
    
  async delete(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const washingId = Number(req.params.id);
    const deletedWashing = await washingService.delete({ userId, washingId });
    return response({ res, statusCode: 200, data: deletedWashing, message: "Lavado eliminado exitosamente" });
  },
};