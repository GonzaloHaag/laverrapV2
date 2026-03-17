import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().nullable(),
  price: z.number().positive("El precio debe ser mayor a 0"),
  category: z.enum(["COMPLETE", "BASIC", "PREMIUM", "OTHER"]).default("BASIC"),
  duration: z.number().positive("La duración debe ser mayor a 0"),
});

export type Service = z.infer<typeof serviceSchema>;
