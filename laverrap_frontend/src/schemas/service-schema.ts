import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre del servicio es requerido"),
  description: z.string(),
  price: z.number().min(0, "El precio del servicio debe ser mayor o igual a 0"),
  category: z.enum(["BASIC", "COMPLETE", "PREMIUM", "OTHER"]).default("BASIC")
});