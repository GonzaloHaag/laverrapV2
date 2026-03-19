import type { Employee, ServiceResponse } from "@/types";
import { api } from "./api";
import type { EmployeeDto } from "@/schemas";
const EMPLOYEES_URL = "/employees";
export const employeeService = {
  getAll: async():Promise<Employee[]> => {
    const { data } = await api.get<ServiceResponse<Employee[]>>(EMPLOYEES_URL);
    return data.data;
  },
  create: async ({ payload }: { payload: EmployeeDto }) => {
    const { data } = await api.post<ServiceResponse<Employee>>(EMPLOYEES_URL, payload);
    return data.data;
  },

  update: async ({ id, payload }: { id: number; payload: EmployeeDto }) => {
    const { data } = await api.put<ServiceResponse<Employee>>(`${EMPLOYEES_URL}/${id}`, payload);
    return data.data;
  },

  deactivate: async ({ id } : { id: Employee["id"] }) => {
    const { data } = await api.patch<ServiceResponse<null>>(`${EMPLOYEES_URL}/${id}/deactivate`);
    return data.data;
  }
};