import { type ServiceResponse, type Stats } from "@/types";
import { api } from "./api";
const STATS_URL = "/stats";
export const statsService = {
  getStats: async (): Promise<Stats> => {
    const { data } = await api.get<ServiceResponse<Stats>>(STATS_URL);
    return data.data;
  }
};