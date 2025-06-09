import {Skeleton} from "@/components/ui/skeleton";
import {CardContent} from "../ui/card";

interface Props {
  length: number;
}

const SkeletonVerticalBarChar: React.FC<Props> = ({length}) => {
  return (
    <CardContent className={`flex  w-full h-full`}>
      {Array.from({length: length}).map((_, i) => (
        <div key={i} className="flex flex-col justify-end flex-grow min-w-0 space-y-2 mx-[10px]">
          <Skeleton
            className={``}
            style={{
              height: `${Math.floor(Math.random() * (100 - 10 + 1)) + 10}%`,
            }}
          />
          <Skeleton className="w-[40%]   h-3 mx-auto " />
        </div>
      ))}
    </CardContent>
  );
};

export default SkeletonVerticalBarChar;
