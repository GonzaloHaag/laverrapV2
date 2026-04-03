import z from "zod";

export const washingSchema = z.object({
  employee_id: z.number("El empleado es requerido"),
  client_id: z.number("El cliente es requerido"),
  service_id: z.number("El servicio es requerido"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]).default("PENDING"),
  should_notify: z.boolean().default(false),
});

export type WashingDto = z.infer<typeof washingSchema>;