import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CURRENT_YEAR, MONTHS } from "@/utils/consts";
import { ChartWashed } from "./ChartWashed";

interface Props {
  isLoading: boolean;
  totalWashedGroupByMonth: { month: number, washed: number }[];
}

export const CardChartWashed = ({ isLoading, totalWashedGroupByMonth } : Props) => {
  const chartData = totalWashedGroupByMonth.map((item) => ({
    month: MONTHS[item.month - 1],
    washed: item.washed
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de lavados mensuales</CardTitle>
        <CardDescription>
          Mostrando el total de lavados por mes en {CURRENT_YEAR}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          isLoading ? (
            <div className="flex items-center justify-center min-h-48">
              <span className="text-sm text-gray-800">Cargando datos...</span>
            </div>
          ) : (
            <ChartWashed data={chartData} />
          )
        }
      </CardContent>
    </Card>
  );
};