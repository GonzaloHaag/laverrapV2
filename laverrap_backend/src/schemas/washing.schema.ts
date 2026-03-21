import z from "zod";

export const washingSchema = z.object({
  employee_id: z.number("El id de empleado es requerido"),
  client_id: z.number("El id de cliente es requerido"),
  service_id: z.number("El id de servicio es requerido"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"]).default("PENDING"),
  should_notify: z.boolean().default(false),
});

export type Washing = z.infer<typeof washingSchema>;