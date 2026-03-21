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
      }
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
  }
};