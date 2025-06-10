import {Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis} from "recharts";

import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {useEffect} from "react";
import SkeletonVerticalBarChar from "../skeletons/SkeHorizontalBarChart.";

interface Props {
  colums: {name: string; data: number}[] | undefined;
  hasTextVertical?: boolean;
  hasNumberVertical?: boolean;
  unity?: string;
  variant?: keyof typeof colorVariants;
}
const colorVariants = {
  chart1: "hsl(var(--chart-1))",
  chart2: "hsl(var(--chart-2))",
  chart3: "hsl(var(--chart-3))",
  chart4: "hsl(var(--chart-4))",
  chart5: "hsl(var(--chart-5))",
};
const VerticalBarChart: React.FC<Props> = ({colums, variant = "chart1"}) => {
  useEffect(() => {
    console.log("Colums recibido:👌👌", colums);
  }, [colums]);

  if (!colums) {
    return <SkeletonVerticalBarChar length={4} />;
  }

  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visitors",
        },
        desktop: {
          label: "Desktop",
          color: colorVariants[variant],
        },
      }}
      className=" h-[100%] "
    >
      <ResponsiveContainer>
        <BarChart
          accessibilityLayer
          data={colums}
          barGap={2}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} interval={0} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <YAxis
            domain={[
              0,
              (dataMax: number) => {
                return Math.ceil(dataMax * 1.3);
              },
            ]}
            tickLine={false}
            axisLine={false}
            hide
            tickMargin={5}
          />
          <Bar dataKey="data" fill="var(--color-desktop)" radius={5}>
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
export default VerticalBarChart;

/*<text
                  x={x}
                  y={y}
                  fill="var(--muted-foreground)"
                  alignmentBaseline={hasNumberVertical ? "hanging" : "text-after-edge"}
                  textAnchor={hasNumberVertical ? "" : ""}

                  transform={hasNumberVertical ? `rotate(-90, ${x}, ${y})` : ""}
                  fontSize={15}
                  fontWeight={"bold"}
                >
                  {`${value} ${unity ? unity : ""}`}
                </text>*/
