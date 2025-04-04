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
          <Skeleton className="h-4 w-[70px] md:w-[100px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[200px] md:w-[300px]" />
        </CardDescription>
      </CardHeader>
      <CardContent className={`grid grid-cols-${data} w-full `}>
        {Array.from({ length: data }).map((_, i) => (
          <div
            key={i}
            className=" space-y-2 mt-auto  mx-3 sm:mx-4 md:mx-6 lg:mx-8"
          >
            <Skeleton
              className={`flex-col `}
              style={{
                height: `${
                  Math.floor(Math.random() * (300 - 100 + 1)) + 100
                }px`,
              }}
            />
            <Skeleton className="w-[20px] md:w-[80px]  h-3 mx-auto " />
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Skeleton className="h-4 w-[70px] md:w-[100px]" />
        </div>
        <div className="leading-none text-muted-foreground">
          <Skeleton className="h-4 w-[200px] md:w-[300px]" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonVerticalBarChar;
