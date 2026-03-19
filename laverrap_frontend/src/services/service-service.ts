import type { Service, ServiceResponse } from "@/types";
import { api } from "./api";
import type { ServiceDto } from "@/schemas";
const SERVICES_URL = "/services";
export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  },

  create: async ({ payload }: { payload: ServiceDto }) => {
    const { data } = await api.post<ServiceResponse<Service>>(
      SERVICES_URL,
      payload,
    );
    return data.data;
  },

  update: async ({ id, payload }: { id: Service["id"]; payload: ServiceDto }) => {
    const { data } = await api.put<ServiceResponse<Service>>(
      `${SERVICES_URL}/${id}`,
      payload,
    );
    return data.data;
  },

  delete: async ({ id }: { id: Service["id"] }) => {
    const { data } = await api.delete<ServiceResponse<null>>(
      `${SERVICES_URL}/${id}`,
    );
    return data.data;
  },
};
