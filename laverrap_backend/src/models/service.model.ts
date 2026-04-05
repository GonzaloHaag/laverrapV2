import { prisma } from "../lib/prisma.js";
import type { Service } from "../schemas/service.schema.js";

export const serviceModel = {
  async getAll({ userId }: { userId: number }) {
    const services = await prisma.service.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      }
    });
    return services;
  },

  async create({ userId, data }: { userId: number; data: Service }) {
    const newService = await prisma.service.create({
      data: {
        ...data,
        user_id: userId,
      },
    });
    return newService;
  },
  async update({ serviceId, data, userId }: { serviceId: number, data: Service, userId: number }) {
    const updatedService = await prisma.service.update({
      where: {
        id: serviceId,
        user_id: userId,
      },
      data,
    });
    return updatedService;
  },
  async delete({ serviceId, userId }: { serviceId: number, userId: number }) {
    const deletedService = await prisma.service.delete({
      where: {
        id: serviceId,
        user_id: userId,
      },
    });
    return deletedService;
  },
  async getById({ userId, serviceId }: { userId: number; serviceId: number }) {
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        user_id: userId,
      },
    });
    return service;
  },

  async getByName({ userId, name }: { userId: number; name: string }) {
    const service = await prisma.service.findFirst({
      where: {
        name,
        user_id: userId,
      },
    });
    return service;
  },
};
