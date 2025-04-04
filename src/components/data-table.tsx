import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: never[];
  detail: string;
}

const DataTable: React.FC<Props> = ({ data, detail }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Table>
      <TableCaption>{detail}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead
              key={idx}
              className="text-left capitalize text-sm font-medium text-muted-foreground"
            >
              {header.replace(/_/g, " ")}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {headers.map((columnName, colIndex) => (
              <TableCell key={colIndex}>{row[columnName]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
