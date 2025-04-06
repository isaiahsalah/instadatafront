
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface Props {
  colums: {name:string, data:number}[] | undefined;
  title: string;
  detail: string;
  Footertitle: string;
  Footerdetail: string;
}

const VerticalBarChart: React.FC<Props> = ({ colums, title, detail,Footertitle,Footerdetail })=> {
    
  if(!colums){
    return 
  }
 
  
 

  return (
    <Card  >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{detail}</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer  config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={colums}
            margin={{
              top: 20,
            }}
            barGap={2}
          >
            <CartesianGrid vertical={false}  />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString().slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="data" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        {Footertitle}
        </div>
        <div className="leading-none text-muted-foreground">
          {Footerdetail}
        </div>
      </CardFooter>
    </Card>
  )
}
export default VerticalBarChart