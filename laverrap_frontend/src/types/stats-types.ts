export interface Stats {
    totalIncomeByCurrentMonth: number;
    totalIncome: number;
    totalWashed: number;
    totalActiveClients: number;
    totalIncomeGroupByMonth: {
        month: number;
        income: number;
    }[];
    totalWashedGroupByMonth: {
        month: number;
        washed: number;
    }[];
}