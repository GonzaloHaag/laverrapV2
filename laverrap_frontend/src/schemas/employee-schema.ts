import z from "zod";

export const employeeSchema = z.object({
  name: z.string("El nombre es requerido").min(1, "El nombre es requerido"),
  email: z.email("El correo electrónico no es válido").min(1, "El correo electrónico es requerido"),
  phone: z.string("El teléfono es requerido").optional(),
  entry_time: z.string("La hora de entrada es requerida").min(1, "La hora de entrada es requerida"),
  departure_time: z.string("La hora de salida es requerida").min(1, "La hora de salida es requerida"),
  status: z.enum(["ACTIVE", "INACTIVE"], "El estado es requerido").default("ACTIVE"),
});

export type EmployeeDto = z.infer<typeof employeeSchema>;