export interface Service {
    id:          number;
    name:        string;
    description: string;
    price:       number;
    category:    ServiceCategory;
}

export type ServiceCategory = "BASIC" | "COMPLETE" | "PREMIUM" | "OTHER";