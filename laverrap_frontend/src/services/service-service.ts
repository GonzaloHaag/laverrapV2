import type { Service, ServiceResponse } from "@/types";
import { api } from "./api";

export const serviceService = {
  getAll: async ():Promise<Service[]> => {
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  }
};