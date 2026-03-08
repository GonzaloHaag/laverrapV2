import { prisma } from "../lib/prisma.js";
import type { Client } from "../schemas/client.schema.js";

export const clientModel = {
  async getAll({ userId }: { userId: number }) {
    const clients = await prisma.client.findMany({
      where: {
        user_id: userId
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

  async update({ clientId, data } : { clientId: number, data: Client }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId
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

  async deactivate({ clientId } : { clientId: number }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId
      },
      data: {
        status: "INACTIVE"
      }
    });
    return updatedClient;
  },

  async activate({ clientId } : { clientId: number }) {
    const updatedClient = await prisma.client.update({
      where: {
        id: clientId
      },
      data: {
        status: "ACTIVE"
      }
    });
    return updatedClient;
  }
};