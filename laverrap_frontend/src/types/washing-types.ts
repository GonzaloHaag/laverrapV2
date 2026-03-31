export interface Washing {
    id: number;
    client: {
        name: string;
        email: string;
        phone: string;
        car_model: string;
        car_plate: string;
    };
    employee: {
        name: string;
    };
    service: {
        name: string;
        price: number;
    };
}