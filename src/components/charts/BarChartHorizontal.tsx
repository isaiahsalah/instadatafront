import {Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

interface Props {
  colums: {name: string; data: number}[] | undefined;
  hasTextVertical?: boolean;
  hasNumberVertical?: boolean;
  unity?: string;
  labelSpacing?: number;
}

export const HorizontalChartBar: React.FC<Props> = ({colums, labelSpacing = 50}) => {
  if (!colums) {
    return;
  }
  const barHeight = 25; // Altura aproximada por barra
  const chartHeight = colums.length * barHeight;
  return (
    <ChartContainer config={chartConfig}>
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
              tickFormatter={(value) => value.slice(0, 28)}
              //hide
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="data" fill="var(--primary)" radius={2}>
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
