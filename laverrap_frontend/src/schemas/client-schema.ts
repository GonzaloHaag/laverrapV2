import z from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  phone: z.string().optional(),
  car_type: z.enum(["CAR", "PICKUP", "MOTORCYCLE", "OTHER"],"El tipo de vehículo es requerido"),
  car_model: z.string().min(1, "El modelo del vehículo es requerido"),
  car_plate: z.string().min(1, "La placa del vehículo es requerida")
});

export type ClientDto = z.infer<typeof clientSchema>;