import { clientModel } from "../models/client.model.js";
import type { Client } from "../schemas/client.schema.js";
import { ClientError } from "../utils/errors.js";

export const clientService = {
  async getAll({ userId }: { userId:number }) {
    const clients = await clientModel.getAll({ userId });
    return clients;
  },
  async create({ userId, data } : { userId:number, data: Client }) {
    if(data.email) {
      const existingClient = await clientModel.getByEmail({ userId, email: data.email });
      if (existingClient) throw new ClientError("Ya existe un cliente con ese email", 400);
    }
    const newClient = await clientModel.create({ userId, data });
    return newClient;
  },
  async update({ userId, clientId, data } : { userId:number, clientId: number, data: Client }) {
    const findClient = await clientModel.getById({ userId, clientId });
    if (!findClient) throw new ClientError("Cliente no encontrado", 404);
    const exitingClient = await clientModel.getByEmail({ userId, email: data.email });
    if (exitingClient && exitingClient.id !== clientId) throw new ClientError("Ya existe un cliente con ese email", 400);
    const updatedClient = await clientModel.update({ clientId, data, userId });
    return updatedClient;
  },

  async deactivate({ userId, clientId } : { userId:number, clientId: number }) {
    const findClient = await clientModel.getById({ userId, clientId });
    if (!findClient) throw new ClientError("Cliente no encontrado", 404);
    if (findClient.status === "INACTIVE") throw new ClientError("El cliente ya está inactivo", 400);
    const updatedClient = await clientModel.deactivate({ clientId, userId });
    return updatedClient;
  },

  async activate({ userId, clientId } : { userId:number, clientId: number }) {
    const findClient = await clientModel.getById({ userId, clientId });
    if (!findClient) throw new ClientError("Cliente no encontrado", 404);
    if (findClient.status === "ACTIVE") throw new ClientError("El cliente ya está activo", 400);
    const updatedClient = await clientModel.activate({ clientId, userId });
    return updatedClient;
  }
};