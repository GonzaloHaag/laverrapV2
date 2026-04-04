import type { ServiceResponse, Washing } from "@/types";
import { api } from "./api";
import type { WashingDto } from "@/schemas";
const WASHED_URL = "/washed";
export const washingService = {
  getAll: async (): Promise<Washing[]> => {
    const { data } = await api.get<ServiceResponse<Washing[]>>(WASHED_URL);
    return data.data;
  },
  create: async({ payload } : { payload: WashingDto }): Promise<Washing> => {
    const { data } = await api.post<ServiceResponse<Washing>>(WASHED_URL, payload);
    return data.data;
  },
  updateStatus: async ({ id, status } : { id: Washing["id"], status: Washing["status" ]}): Promise<Washing> => {
    const { data } = await api.patch<ServiceResponse<Washing>>(`${WASHED_URL}/${id}`, { status });
    return data.data;
  },

  delete: async ({ id } : { id: Washing["id"] }) => {
    const { data } = await api.delete<ServiceResponse<null>>(`${WASHED_URL}/${id}`);
    return data.data;
  }
};