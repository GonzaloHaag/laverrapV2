import type { Request, Response } from "express";
import { serviceService } from "../services/service.service.js";
import { response } from "../utils/response.js";
import { serviceSchema } from "../schemas/service.schema.js";

export const serviceController = {
  async getAll(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const services = await serviceService.getAll({ userId });
    return response({ res, statusCode: 200, data: services, message: "Servicios obtenidos exitosamente" });
  },

  async create(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const validated = serviceSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const newService = await serviceService.create({ userId, data: validated.data });
    return response({ res, statusCode: 201, data: newService, message: "Servicio creado exitosamente" });
  },

  async update(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const serviceId = Number(req.params.id);
    const validated = serviceSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues  });
    }
    const updatedService = await serviceService.update({ userId, serviceId, data: validated.data });
    return response({ res, statusCode: 200, data: updatedService, message: "Servicio actualizado exitosamente" });
  },

  async delete(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const serviceId = Number(req.params.id);
    const deletedService = await serviceService.delete({ userId, serviceId });
    return response({ res, statusCode: 200, data: deletedService, message: "Servicio eliminado exitosamente" });
  },
};
