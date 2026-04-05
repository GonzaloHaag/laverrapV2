import { prisma } from "../lib/prisma.js";
import type { Client } from "../schemas/client.schema.js";

export const clientModel = {
  async getAll({ userId }: { userId: number }) {
    const clients = await prisma.client.findMany({
      where: {
        user_id: userId,
        status: "ACTIVE"
      },
      orderBy: {
        created_at: "desc"
      }
    });
    return clients;
  },

  async create({ userId, data } : { userId:number, data: Client }) {
    const newClient = await prisma.client.create({
      data: {
        ...data,
        user_id: userId
      }
    });
    return newClient;
  },

  async update({ clientId, data, userId } : { clientId: number, data: Client, userId: number }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
        user_id: userId
      },
      data
    });
    return updatedClient;
  },
  
  async getById({ userId, clientId } : { userId:number, clientId: number }) {
    const client = await prisma.client.findFirst({
      where: { 
        id: clientId,
        user_id: userId
      }
    });
    return client;
  },

  async getByEmail({ userId, email } : { userId:number, email: string }) {
    const client = await prisma.client.findFirst({
      where: { 
        email,
        user_id: userId
      }
    });
    return client;
  },

  async deactivate({ clientId, userId } : { clientId: number, userId: number }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
        user_id: userId
      },
      data: {
        status: "INACTIVE"
      }
    });
    return updatedClient;
  },

  async activate({ clientId, userId } : { clientId: number, userId: number }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
        user_id: userId
      },
      data: {
        status: "ACTIVE"
      }
    });
    return updatedClient;
  },

  async getTotalActive({ userId }: { userId: number }) {
    const totalActive = await prisma.client.count({
      where: {
        user_id: userId,
        status: "ACTIVE"
      }
    });
    return totalActive;
  },
};