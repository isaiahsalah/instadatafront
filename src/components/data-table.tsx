import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Extrusion_pa_po_withoutTurno } from "@/types/EctrusionAdvancedOrder";

interface Props {
  data: never[] | Extrusion_pa_po_withoutTurno[] | undefined ;
  detail: string;
}

const DataTable: React.FC<Props> = ({ data, detail }) => {
  if(!data) {
    return (
      <Table>
      <TableCaption>{detail}</TableCaption>
      <TableHeader>
        <TableRow>
            <TableHead
              className="text-left capitalize text-sm font-medium text-muted-foreground"
            >
              No hay datos
            </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
          <TableRow >
              <TableCell >No hay datos</TableCell>
          </TableRow>
      </TableBody>
    </Table>
    )
  }
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
              <TableCell key={colIndex}>{row[columnName as keyof typeof row]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
