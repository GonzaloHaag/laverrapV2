export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    car_type: CarType;
    car_model: string | null;
    car_plate: string;
    status: "ACTIVE" | "INACTIVE";
}
export type CarType = "CAR" | "PICKUP" | "MOTORCYCLE" | "OTHER";