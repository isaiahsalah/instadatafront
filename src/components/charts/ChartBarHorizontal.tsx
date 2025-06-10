import {Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis} from "recharts";

import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import SkeletonHorizontalBarChar from "../skeletons/SkeHorizontalBarChart.";
/*
export const description = "A bar chart with a custom label";

const chartData = [
  {month: "January", desktop: 186, mobile: 80},
  {month: "February", desktop: 305, mobile: 200},
  {month: "March", desktop: 237, mobile: 120},
  {month: "April", desktop: 73, mobile: 190},
  {month: "May", desktop: 209, mobile: 130},
  {month: "June", desktop: 214, mobile: 140},
];*/

interface Props {
  colums: {name: string; data: number}[] | undefined;
  hasTextVertical?: boolean;
  hasNumberVertical?: boolean;
  unity?: string;
  labelSpacing?: number;
  variant?: keyof typeof colorVariants;
}
const colorVariants = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
};

export const HorizontalChartBar: React.FC<Props> = ({
  colums,
  labelSpacing = 50,
  variant = "chart1",
}) => {
  if (!colums) {
    return <SkeletonHorizontalBarChar length={4} />;
  }
  const barHeight = 25; // Altura aproximada por barra
  const chartHeight = colums.length * barHeight;

  return (
    <ChartContainer
      config={{
        desktop: {
          label: "Desktop",
          color: colorVariants[variant],
        },
        label: {
          color: "var(--background)",
        },
      }}
    >
      <div style={{width: "100%", height: `${chartHeight}px`}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            accessibilityLayer
            //data={chartData}
            data={colums}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <XAxis dataKey="data" type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={labelSpacing}
              interval={0}
              tickFormatter={(value) => value.slice(0, labelSpacing / 10)}
              //hide
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="data" fill={colorVariants[variant]} radius={2}>
              <LabelList
                dataKey="data"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};
