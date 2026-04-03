export interface Washing {
    id: number;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
    should_notify: boolean;
    created_at: string;
    client: {
        id: number;
        name: string;
        email: string;
        phone: string;
        car_model: string;
        car_plate: string;
    };
    employee: {
        id:number;
        name: string;
    };
    service: {
        id: number;
        name: string;
        price: number;
    };
}