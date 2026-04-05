import { prisma } from "../lib/prisma.js";
import type { Washing } from "../schemas/washing.schema.js";
import type { WashingStatus } from "../types/washing.types.js";
import { ClientError } from "../utils/errors.js";


export const washingModel = {
  async getAll({ userId }: { userId: number }) {
    const washed = await prisma.washing.findMany({
      where: { 
        user_id: userId
      },
      orderBy: {
        created_at: "desc"
      },
      select: {
        id: true,
        status: true,
        should_notify: true,
        created_at: true,
        notified_at: true,
        price: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            car_model: true,
            car_plate: true
          }
        },
        employee: {
          select: {
            id: true,
            name: true
          }
        },
        service: {
          select: {
            id: true,
            name: true,
          }
        }
      },
    });
    return washed;
  },

  async create({ userId, data } : { userId:number, data: Washing }) {
    const findService = await prisma.service.findUnique({
      where: {
        user_id: userId,
        id: data.service_id
      },
      select: {
        price: true
      }
    });
    if(!findService) throw new ClientError("Servicio no encontrado", 404);
    const newWashing = await prisma.washing.create({
      data: {
        ...data,
        user_id: userId,
        price: findService.price
      }
    });
    return newWashing;
  },
  async updateStatus({ washingId, status } : { washingId: number, status: WashingStatus }) {
    const updatedWashing = await prisma.washing.update({
      where: {
        id: washingId,
      },
      include: {
        client: {
          select: {
            id: true, 
            email: true
          }
        }
      },
      data: {
        status: status
      }
    });
    return updatedWashing;
  },
  async getById({ userId, washingId } : { userId:number, washingId: number }) {
    const washing = await prisma.washing.findFirst({
      where: { 
        id: washingId,
        user_id: userId
      },
      include: {
        client: {
          select: {
            id: true,
            email: true,
          }
        }
      }
    });
    return washing;
  },
  async delete({ washingId, userId } : { washingId: number, userId: number }) {
    const deletedWashing = await prisma.washing.delete({
      where: {
        id: washingId,
        user_id: userId
      }
    });
    return deletedWashing;
  },

  async markEmailAsSent({ washingId } : { washingId: number }) {
    const updatedWashing = await prisma.washing.update({
      where: {
        id: washingId,
      },
      data: {
        notified_at: new Date()
      }
    });
    return updatedWashing;
  },

  async getTotalIncome({ userId }: { userId: number }) {
    const totalIncome = await prisma.washing.aggregate({
      where: {
        user_id: userId,
        status: "COMPLETED"
      },
      _sum: {
        price: true
      }
    });
    return totalIncome._sum.price ?? 0;
  },

  async getTotalWashed({ userId }: { userId: number }) {
    const totalWashed = await prisma.washing.count({
      where: {
        user_id: userId,
        status: "COMPLETED"
      }
    });
    return totalWashed;
  }
};