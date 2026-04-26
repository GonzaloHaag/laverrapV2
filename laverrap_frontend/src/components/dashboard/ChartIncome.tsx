import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui";
import { chartIncomeConfig } from "@/utils/consts";
interface Props {
    data: {
    month: string;
    income: number;
}[]
}
export const ChartIncome = ({ data }: Props) => {
  return (
    <ChartContainer config={chartIncomeConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={20}
          tickCount={6}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="line" />
          }
        />
        <Area
          dataKey="income"
          type="natural"
          fill="var(--color-income)"
          fillOpacity={0.4}
          stroke="var(--color-income)"
        />
      </AreaChart>
    </ChartContainer>
  );
};