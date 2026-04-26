import { clientModel } from "../models/client.model.js";
import { washingModel } from "../models/washing.model.js";

export const statsService = {
  async getStats({ userId }: { userId: number }) {
    const [totalIncomeByCurrentMonth, totalIncome, totalWashed, totalActiveClients, totalIncomeGroupByMonth, totalWashedGroupByMonth] = await Promise.all([
      washingModel.getTotalIncomeByCurrentMonth({ userId }),
      washingModel.getTotalIncome({ userId }),
      washingModel.getTotalWashed({ userId }),
      clientModel.getTotalActive({ userId }),
      washingModel.getTotalIncomeGroupByMonth({ userId }),
      washingModel.getTotalWashedGroupByMonth({ userId })
    ]);
    return { totalIncomeByCurrentMonth, totalIncome, totalWashed, totalActiveClients, totalIncomeGroupByMonth, totalWashedGroupByMonth };
  } 
};