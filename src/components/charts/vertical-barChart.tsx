import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  colums: {name: string; data: number}[] | undefined;
  unity?: string;
}

const VerticalBarChart: React.FC<Props> = ({colums, unity}) => {
  if (!colums) {
    return;
  }

  return (
    <div className="  h-full ">
      <ChartContainer config={chartConfig} className="  ">
        <BarChart accessibilityLayer data={colums} barGap={2} className="  ">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value.toString()}
          />
          <YAxis
            domain={[0, (dataMax: number) => Math.ceil(Math.ceil(dataMax * 1.2) / 10) * 10]} // Limita de 0 al 120% del máximo
            tickLine={false}
            axisLine={false}
            hide
            tickMargin={5}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="data" fill="var(--color-desktop)" radius={5}>
            <LabelList
              position="top"
              offset={10}
              className="fill-foreground"
              fontSize={16}
              formatter={(value: number) => `${value} ${unity ? unity : ""}`} // Agregar el "%" al valor
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};
export default VerticalBarChart;
