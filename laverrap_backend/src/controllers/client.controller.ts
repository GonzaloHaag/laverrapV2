import type { Request, Response } from "express";
import { clientService } from "../services/client.service.js";
import { response } from "../utils/response.js";
import { clientSchema } from "../schemas/client.schema.js";



export const clientController = {
  async getAll(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const clients = await clientService.getAll({ userId });
    return response({ res, statusCode: 200, data: clients, message: "Clientes obtenidos exitosamente" });
  },
  async create(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const validated = clientSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const newClient = await clientService.create({ userId, data: validated.data });
    return response({ res, statusCode: 201, data: newClient, message: "Cliente creado exitosamente" });
  },

  async update(req: Request, res: Response) {
    const clientId = Number(req.params.id);
    if (!clientId) {
      return response({ res, statusCode: 400, message: "El ID del cliente es requerido" });
    }
    const userId = Number(req.user!.id);
    const validated = clientSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const updatedClient = await clientService.update({ userId, clientId, data: validated.data });
    return response({ res, statusCode: 200, data: updatedClient, message: "Cliente actualizado exitosamente" });
  },

  async deactivate(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const clientId = Number(req.params.id);
    if (!clientId) {
      return response({ res, statusCode: 400, message: "El ID del cliente es requerido" });
    }
    const updatedClient = await clientService.deactivate({ userId, clientId });
    return response({ res, statusCode: 200, data: updatedClient, message: "Cliente desactivado exitosamente" });
  },

  async activate(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const clientId = Number(req.params.id);
    if (!clientId) {
      return response({ res, statusCode: 400, message: "El ID del cliente es requerido" });
    }
    const updatedClient = await clientService.activate({ userId, clientId });
    return response({ res, statusCode: 200, data: updatedClient, message: "Cliente activado exitosamente" });
  }
};