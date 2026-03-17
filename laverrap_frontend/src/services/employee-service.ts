import type { Employee, ServiceResponse } from "@/types";
import { api } from "./api";

export const employeeService = {
  getAll: async():Promise<Employee[]> => {
    const { data } = await api.get<ServiceResponse<Employee[]>>("/employees");
    return data.data;
  }
};