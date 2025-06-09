import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { randomNumber } from "@/lib/utils";

const SkeletonRadialPieChart = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <Skeleton
            className="h-5 "
            style={{ width: `${randomNumber(20, 70)}%` }}
          />
        </CardTitle>
        <CardDescription>
          <Skeleton
            className="h-5 "
            style={{ width: `${randomNumber(70, 100)}%` }}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mx-auto my-9">
        <Skeleton className="aspect-[1/1] w-45 rounded-full" />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none w-[100%]">
          <Skeleton
            className="h-5 "
            style={{ width: `${randomNumber(30, 80)}%` }}
          />
        </div>
        <div className="leading-none text-muted-foreground w-[100%]">
          <Skeleton
            className="h-5 "
            style={{ width: `${randomNumber(70, 100)}%` }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonRadialPieChart;
