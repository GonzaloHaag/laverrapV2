import type { Request, Response } from "express";
import { employeeService } from "../services/employee.service.js";
import { response } from "../utils/response.js";
import { employeeSchema } from "../schemas/employee.schema.js";

export const employeeController = {
  async getAll(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const employees = await employeeService.getAll({ userId });
    return response({ res, statusCode: 200, data: employees, message: "Empleados obtenidos exitosamente" });
  },
  async create(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const validated = employeeSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, data: null, message: "Error de validación, por favor revise los datos ingresados" });
    }
    const newEmployee = await employeeService.create({ userId, data: validated.data });
    return response({ res, statusCode: 201, data: newEmployee, message: "Empleado creado exitosamente" });
  }
};