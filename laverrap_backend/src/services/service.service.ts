import { serviceModel } from "../models/service.model.js";
import type { Service } from "../schemas/service.schema.js";
import { ClientError } from "../utils/errors.js";

export const serviceService = {
  async getAll({ userId }: { userId: number }) {
    const services = await serviceModel.getAll({ userId });
    return services;
  },
  async create({ userId, data }: { userId: number; data: Service }) {
    const existingService = await serviceModel.getByName({ userId, name: data.name });
    if (existingService) throw new ClientError("Ya existe un servicio con ese nombre", 400);
    const newService = await serviceModel.create({ userId, data });
    return newService;
  },

  async update({ userId, serviceId, data }: { userId: number; serviceId: number; data: Service }) {
    const existingService = await serviceModel.getById({ userId, serviceId });
    if (!existingService) throw new ClientError("Servicio no encontrado", 404);
    if (existingService.name !== data.name) {
      const serviceWithSameName = await serviceModel.getByName({ userId, name: data.name });
      if (serviceWithSameName) throw new ClientError("Ya existe un servicio con ese nombre", 400);
    }
    const updatedService = await serviceModel.update({ serviceId, data, userId });
    return updatedService;
  },

  async delete({ userId, serviceId }: { userId: number; serviceId: number }) {
    const existingService = await serviceModel.getById({ userId, serviceId });
    if (!existingService) throw new ClientError("Servicio no encontrado", 404);
    const deletedService = await serviceModel.delete({ serviceId, userId });
    return deletedService;
  },
};
