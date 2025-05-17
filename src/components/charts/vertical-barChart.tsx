import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {useEffect} from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  colums: {name: string; data: number}[] | undefined;
  hasTextVertical?: boolean;
  hasNumberVertical?: boolean;
  unity?: string;
}

const VerticalBarChart: React.FC<Props> = ({
  colums,
  unity,
  hasTextVertical = false,
  hasNumberVertical = false,
}) => {
  useEffect(() => {
    console.log("Colums recibido:👌👌", colums);
  }, [colums]);

  if (!colums) {
    return;
  }

  return (
    <div className="  h-full ">
      <ChartContainer config={chartConfig} className="  ">
        <BarChart
          accessibilityLayer
          data={colums}
          barGap={2}
          margin={{bottom: hasTextVertical ? 100 : 0}}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            interval={0} // Asegura que todas las etiquetas se muestren
            angle={hasTextVertical ? -90 : 0} // Rotación de 90 grados
            textAnchor={hasTextVertical ? "end" : "middle"} // Alineación del texto rotado
            tickFormatter={(value) =>
              value.length > 15 ? `${value.toLowerCase().slice(0, 15)}...` : value.toLowerCase()
            }
          />

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
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="data" fill="var(--color-desktop)" radius={5}>
            <LabelList
              position="top"
              content={({x, y, value}) => (
                <text
                  x={x}
                  y={y}
                  fill="var(--muted-foreground)"
                  alignmentBaseline={hasNumberVertical ? "hanging" : "text-after-edge"}
                  textAnchor={hasNumberVertical ? "" : "start"}
                  transform={hasNumberVertical ? `rotate(-90, ${x}, ${y})` : ""}
                  fontSize={13}
                >
                  {`${value} ${unity ? unity : ""}`}
                </text>
              )}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};
export default VerticalBarChart;
