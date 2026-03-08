import z from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().nullable(),
  car_type: z.enum(["CAR", "PICKUP", "MOTORCYCLE", "OTHER"]).default("CAR"),
  car_model: z.string().min(1, "Car model is required"),
  car_plate: z.string().min(1, "Car plate is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type Client = z.infer<typeof clientSchema>;