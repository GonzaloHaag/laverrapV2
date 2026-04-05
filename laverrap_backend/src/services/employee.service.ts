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
    if (data.entry_time) {
      const date = new Date(data.entry_time);
      if (isNaN(date.getTime())) {
        throw new ClientError("Fecha inválida, se espera formato ISO-8601", 400);
      }
      // convertimos a UTC ISO-8601 para guardar en la DB
      data.entry_time = date.toISOString();
    }
    if(data.departure_time) {
      const date = new Date(data.departure_time);
      if (isNaN(date.getTime())) {
        throw new ClientError("Fecha inválida, se espera formato ISO-8601", 400);
      }
      // convertimos a UTC ISO-8601 para guardar en la DB
      data.departure_time = date.toISOString();
    }
    const newEmployee = await employeeModel.create({ userId, data });
    return newEmployee;
  },
  async update({ userId, employeeId, data } : { userId:number, employeeId: number, data: Employee }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    const updatedEmployee = await employeeModel.update({ employeeId, data, userId });
    return updatedEmployee;
  },
  async deactivate({ userId, employeeId } : { userId:number, employeeId: number }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    if (findEmployee.status === "INACTIVE") throw new ClientError("El empleado ya está inactivo", 400);
    const updatedEmployee = await employeeModel.deactivate({ employeeId, userId });
    return updatedEmployee;
  },

  async activate({ userId, employeeId } : { userId:number, employeeId: number }) {
    const findEmployee = await employeeModel.getById({ userId, employeeId });
    if (!findEmployee) throw new ClientError("Empleado no encontrado", 404);
    if (findEmployee.status === "ACTIVE") throw new ClientError("El empleado ya está activo", 400);
    const updatedEmployee = await employeeModel.activate({ employeeId, userId });
    return updatedEmployee;
  }
};