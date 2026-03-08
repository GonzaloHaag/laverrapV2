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
        ...data,
        user_id: userId
      }
    });

    return newEmployee;
  },

  async update({ employeeId, data } : { employeeId: number, data: Employee }) {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId
      },
      data
    });

    return updatedEmployee;
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
  },

  async deactivate({ employeeId } : { employeeId: number }) {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId
      },
      data: {
        status: "INACTIVE"
      }
    });

    return updatedEmployee;
  },

  async activate({ employeeId } : { employeeId: number }) {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId
      },
      data: {
        status: "ACTIVE"
      }
    });

    return updatedEmployee;
  }
};