import { prisma } from "../lib/prisma.js";
import type { Employee } from "../schemas/employee.schema.js";

export const employeeModel = {
  async getAll({ userId }: { userId: number }) {
    const employees = await prisma.employee.findMany({
      where: { 
        user_id: userId
      }
    });
    return employees;
  },

  async create({ userId, data } : { userId:number, data: Employee }) {
    const newEmployee = await prisma.employee.create({
      data: {
        user_id: userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        entry_time: data.entry_time,
        departure_time: data.departure_time
      }
    });

    return newEmployee;
  },

  async getById({ userId, employeeId } : { userId:number, employeeId: number }) {
    const employee = await prisma.employee.findFirst({
      where: { 
        id: employeeId,
        user_id: userId
      }
    });
    return employee;
  },

  async getByEmail({ userId, email } : { userId:number, email: string }) {
    const employee = await prisma.employee.findFirst({
      where: { 
        email,
        user_id: userId
      }
    });
    return employee;
  }
};