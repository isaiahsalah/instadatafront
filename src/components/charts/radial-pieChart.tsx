import {Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts";

import {ChartContainer} from "@/components/ui/chart";
const chartData = [{browser: "safari", visitors: 100, fill: "var(--color-safari)"}];

interface Props {
  data: number;
  total: number;
  dataTitle: string;
  dataDetail: string;
  variant?: keyof typeof colorVariants;
}
const colorVariants = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
};

const RadialPieChart: React.FC<Props> = ({
  data,
  total,
  dataTitle,
  dataDetail,
  variant = "chart1",
}) => {
  return (
    <div className="flex-1 pb-0">
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          safari: {
            label: "Safari",
            color: colorVariants[variant],
          },
        }}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={(data / total) * 360}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({viewBox}) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {dataTitle}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {dataDetail}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
};

export default RadialPieChart;
