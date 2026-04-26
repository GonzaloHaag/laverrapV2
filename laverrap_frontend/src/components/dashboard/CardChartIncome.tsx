import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CURRENT_YEAR, MONTHS } from "@/utils/consts";
import { ChartIncome } from "./ChartIncome";

interface Props {
  isLoading: boolean;
  totalIncomeGroupByMonth: {
    month: number;
    income: number;
  }[];
}


export const CardChartIncome = ({ isLoading, totalIncomeGroupByMonth } : Props) => {
  const chartData = totalIncomeGroupByMonth.map((item) => ({
    month: MONTHS[item.month - 1], /** Para que comience en enero que es MONTHS[0] */
    income: item.income
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos mensuales</CardTitle>
        <CardDescription>
          Mostrando ingresos totales por mes en {CURRENT_YEAR}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          isLoading ? (
            <div className="flex items-center justify-center min-h-48">
              <span className="text-sm text-gray-800">Cargando datos...</span>
            </div>
          ) : (
            <ChartIncome data={chartData} />
          )
        }
      </CardContent>
    </Card>
  );
};