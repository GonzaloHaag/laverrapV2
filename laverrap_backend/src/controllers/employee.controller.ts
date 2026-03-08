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
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const newEmployee = await employeeService.create({ userId, data: validated.data });
    return response({ res, statusCode: 201, data: newEmployee, message: "Empleado creado exitosamente" });
  },

  async update(req: Request, res: Response) {
    const employeeId = Number(req.params.id);
    if (!employeeId) {
      return response({ res, statusCode: 400, message: "El ID del empleado es requerido" });
    }
    const userId = Number(req.user!.id);
    const validated = employeeSchema.safeParse(req.body);
    if (!validated.success) {
      return response({ res, statusCode: 400, message: "Error de validación, por favor revise los datos ingresados", errors: validated.error.issues });
    }
    const updatedEmployee = await employeeService.update({ userId, employeeId, data: validated.data });
    return response({ res, statusCode: 200, data: updatedEmployee, message: "Empleado actualizado exitosamente" });
  },

  async deactivate(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const employeeId = Number(req.params.id);
    if (!employeeId) {
      return response({ res, statusCode: 400, message: "El ID del empleado es requerido" });
    }
    const updatedEmployee = await employeeService.deactivate({ userId, employeeId });
    return response({ res, statusCode: 200, data: updatedEmployee, message: "Empleado desactivado exitosamente" });
  },

  async activate(req: Request, res: Response) {
    const userId = Number(req.user!.id);
    const employeeId = Number(req.params.id);
    if (!employeeId) {
      return response({ res, statusCode: 400, message: "El ID del empleado es requerido" });
    }
    const updatedEmployee = await employeeService.activate({ userId, employeeId });
    return response({ res, statusCode: 200, data: updatedEmployee, message: "Empleado activado exitosamente" });
  }
};