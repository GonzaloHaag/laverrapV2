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
  },
  async update({ userId, employeeId, data } : { userId:number, employeeId: number, data: Employee }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    const updatedEmployee = await employeeModel.update({ employeeId, data });
    return updatedEmployee;
  },
  async deactivate({ userId, employeeId } : { userId:number, employeeId: number }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    if (findEmployee.status === "INACTIVE") throw new ClientError("El empleado ya está inactivo", 400);
    const updatedEmployee = await employeeModel.deactivate({ employeeId });
    return updatedEmployee;
  },

  async activate({ userId, employeeId } : { userId:number, employeeId: number }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    if (findEmployee.status === "ACTIVE") throw new ClientError("El empleado ya está activo", 400);
    const updatedEmployee = await employeeModel.activate({ employeeId });
    return updatedEmployee;
  }
};