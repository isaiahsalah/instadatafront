import {Skeleton} from "@/components/ui/skeleton";
import {CardContent} from "../ui/card";

interface Props {
  length: number;
}

const SkeletonHorizontalBarChar: React.FC<Props> = ({length}) => {
  return (
    <CardContent className={`flex  flex-col w-full h-auto gap-2`}>
      {Array.from({length: length}).map((_, i) => (
        <div key={i} className="flex flex-grow    gap-2">
          <Skeleton className="h-5   w-[20%] my-auto " />
          <Skeleton
            className={`mr-auto h-5`}
            style={{
              width: `${Math.floor(Math.random() * (80 - 10 + 1)) + 10}%`,
            }}
          />
        </div>
      ))}
    </CardContent>
  );
};

export default SkeletonHorizontalBarChar;
