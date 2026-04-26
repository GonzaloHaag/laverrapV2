import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui";
import { chartWashedConfig } from "@/utils/consts";
interface Props {
    data: { month: string, washed: number }[]
}
export const ChartWashed = ({ data }: Props) => {
  return (
    <ChartContainer config={chartWashedConfig}>
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
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Area
          dataKey="washed"
          type="linear"
          fill="var(--color-washed)"
          fillOpacity={0.4}
          stroke="var(--color-washed)"
        />
      </AreaChart>
    </ChartContainer>
  );
};