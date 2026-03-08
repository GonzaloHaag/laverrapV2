import { employeeModel } from "../models/employee.model.js";
import type { Employee } from "../schemas/employee.schema.js";
import { ClientError } from "../utils/errors.js";

export const employeeService = {
  async getAll({ userId } : { userId:number }) {
    const employees = await employeeModel.getAll({ userId });
    return employees;
  },
  async create({ userId, data } : { userId:number, data: Employee }) {
    if(data.email) {
      const existingEmployee = await employeeModel.getByEmail({ userId, email: data.email });
      if (existingEmployee) throw new ClientError("Ya existe un empleado con ese email", 400);
    }
    const newEmployee = await employeeModel.create({ userId, data });
    return newEmployee;
  }
};