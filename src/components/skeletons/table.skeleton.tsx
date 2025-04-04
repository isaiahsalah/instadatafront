import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  rows: number;
  colums: number;
}

const SkeletonTable: React.FC<Props> = ({ rows, colums }) => {
  const randomNumber = (from: number, to: number) => {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  };

  return (
    <Table>
      <TableCaption>
        <Skeleton className="h-5  w-[170px] md:w-[300px]" />
      </TableCaption>

      <TableHeader>
        <TableRow>
          {Array.from({ length: colums }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton
                className="h-5   "
                style={{ width: `${randomNumber(40, 50)}%` }}
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: colums }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton
                  className={`h-5 `}
                  style={{ width: `${randomNumber(30, 100)}%` }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
