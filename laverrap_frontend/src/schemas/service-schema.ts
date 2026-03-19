import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre del servicio es requerido"),
  description: z.string(),
  price: z.number().min(0, "El precio del servicio debe ser mayor o igual a 0"),
  category: z.enum(["BASIC", "COMPLETE", "PREMIUM", "OTHER"]).default("BASIC"),
  duration: z.number("La duración es requerida").min(1, "La duración del servicio debe ser mayor a 0").default(0).transform((value) => isNaN(value) ? 0 : value),
});

export type ServiceDto = z.infer<typeof serviceSchema>;