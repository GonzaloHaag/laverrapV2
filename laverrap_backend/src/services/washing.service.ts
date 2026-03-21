import { washingModel } from "../models/washing.model.js";
import type { Washing } from "../schemas/washing.schema.js";
import type { WashingStatus } from "../types/washing.types.js";
import { ClientError } from "../utils/errors.js";

export const washingService = {
  async getAll({ userId } : { userId: number }) {
    const washed = await washingModel.getAll({ userId });
    return washed;
  },
  async create({ userId, data } : { userId: number, data: Washing }) {
    const newWashing = await washingModel.create({ userId, data });
    return newWashing;
  },

  async updateStatus({ userId, washingId, status } : { userId: number, washingId: number, status: WashingStatus }) {
    const existingWashing = await washingModel.getById({ userId, washingId });
    if(!existingWashing) throw new ClientError("Lavado no encontrado", 404);
    const itsAlreadyInThatState = existingWashing.status === status;
    if(itsAlreadyInThatState) throw new ClientError(`El lavado ya está en estado ${status}`, 400);
    const isCompleted = existingWashing.status === "COMPLETED";
    if(isCompleted) throw new ClientError("No se puede cambiar el estado de un lavado completado", 400);
    const updatedWashing = await washingModel.updateStatus({ washingId, status });
    return updatedWashing;
  },

  async delete({ userId, washingId } : { userId: number, washingId: number }) {
    const existingWashing = await washingModel.getById({ userId, washingId });
    if(!existingWashing) throw new ClientError("Lavado no encontrado", 404);
    const deletedWashing = await washingModel.delete({ washingId });
    return deletedWashing;
  }
};