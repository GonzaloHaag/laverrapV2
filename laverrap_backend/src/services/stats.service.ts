import { clientModel } from "../models/client.model.js";
import { washingModel } from "../models/washing.model.js";

export const statsService = {
  async getStats({ userId }: { userId: number }) {
    const [totalIncome, totalWashed, totalActiveClients] = await Promise.all([
      washingModel.getTotalIncome({ userId }),
      washingModel.getTotalWashed({ userId }),
      clientModel.getTotalActive({ userId })
    ]);
    return { totalIncome, totalWashed, totalActiveClients };
  }
};