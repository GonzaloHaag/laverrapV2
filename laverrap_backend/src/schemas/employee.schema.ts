import z from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("El email no es válido").nullable(),
  phone: z.string().min(1, "El teléfono es requerido").nullable(),
  entry_time: z.string().min(1, "La hora de entrada es requerida"),
  departure_time: z.string().min(1, "La hora de salida es requerida"),
});

export type Employee = z.infer<typeof employeeSchema>;