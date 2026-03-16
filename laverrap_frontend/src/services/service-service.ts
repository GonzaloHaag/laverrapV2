import type { Service, ServiceResponse } from "@/types";
import { api } from "./api";

export const serviceService = {
  getAll: async ():Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  }
};