import { type Client, type ServiceResponse } from "@/types";
import { api } from "./api";
import type { ClientDto } from "@/schemas";
const CLIENTS_URL = "/clients";
export const clientService = {
  getAll: async () => {
    const { data } = await api.get<ServiceResponse<Client[]>>(CLIENTS_URL);
    return data.data;
  },
  create: async ({ payload } : { payload: ClientDto }) => {
    const { data } = await api.post<ServiceResponse<Client>>(CLIENTS_URL, payload);
    return data.data;
  },

  update: async ({ id, payload } : { id: Client["id"]; payload: ClientDto }) => {
    const { data } = await api.put<ServiceResponse<Client>>(`${CLIENTS_URL}/${id}`, payload);
    return data.data;
  },

  deactivate: async ({ id } : { id: Client["id"] }) => {
    const { data } = await api.patch<ServiceResponse<null>>(`${CLIENTS_URL}/${id}/deactivate`);
    return data.data;
  }
};