import { prisma } from "../lib/prisma.js";
import type { Washing } from "../schemas/washing.schema.js";
import type { WashingStatus } from "../types/washing.types.js";


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
            price: true,
          }
        }
      },
    });
    return washed;
  },

  async create({ userId, data } : { userId:number, data: Washing }) {
    const newWashing = await prisma.washing.create({
      data: {
        ...data,
        user_id: userId
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
  async delete({ washingId } : { washingId: number }) {
    const deletedWashing = await prisma.washing.delete({
      where: {
        id: washingId
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
  }
};