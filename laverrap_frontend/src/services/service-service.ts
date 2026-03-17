import type { Service, ServiceResponse } from "@/types";
import { api } from "./api";
import type { ServiceDTO } from "@/schemas";
const SERVICES_URL = "/services";
export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  },

  create: async ({ payload }: { payload: ServiceDTO }) => {
    const { data } = await api.post<ServiceResponse<Service>>(
      SERVICES_URL,
      payload,
    );
    return data.data;
  },
};
