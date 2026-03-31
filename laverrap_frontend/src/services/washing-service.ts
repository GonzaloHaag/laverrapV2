import type { ServiceResponse, Washing } from "@/types";
import { api } from "./api";

export const washingService = {
  getAll: async (): Promise<Washing[]> => {
    const { data } = await api.get<ServiceResponse<Washing[]>>("/washed");
    return data.data;
  },
};