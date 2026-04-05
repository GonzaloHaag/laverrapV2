export interface Employee {
    id:            number;
    name:          string;
    email:         string;
    phone:         null;
    entry_time:     string;
    departure_time: string;
    createdAt:     string;
    status:        "ACTIVE" | "INACTIVE";
    _count: {
        washed: number;
    };
}
