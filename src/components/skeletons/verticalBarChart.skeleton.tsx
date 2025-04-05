import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  data: number;
}

const SkeletonVerticalBarChar: React.FC<Props> = ({ data }) => {
  return (
    <Card >
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[40%] " />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[80%] " />
        </CardDescription>
      </CardHeader>
      <CardContent className={`flex  w-full aspect-w-4 aspect-[4/3]`}>
        {Array.from({ length: data }).map((_, i) => (
          <div
            key={i}
            className="h-[100%] flex-grow min-w-0 space-y-2 mx-[10px]"
          >
            <Skeleton
              className={``}
              style={{
                height: `${
                  Math.floor(Math.random() * (100 - 10 + 1)) + 10
                }%`,
              }}
            />
            <Skeleton className="w-[40%]   h-3 mx-auto " />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm w-full">
        <div className="flex gap-2 font-medium leading-none w-full">
          <Skeleton className="h-4 w-[40%] " />
        </div>
        <div className="leading-none text-muted-foreground w-full">
          <Skeleton className="h-4 w-[80%] " />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonVerticalBarChar;
