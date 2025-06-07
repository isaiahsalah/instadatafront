import VerticalBarChart from "@/components/charts/vertical-barChart";
import DataTable from "@/components/table/DataTable";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getEmbultaje} from "@/services/bolsas.api";
import {IEmbultaje} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useState} from "react";

const BulkPage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [printing, setPrinting] = useState<IEmbultaje[] | null>(null);
  const [printingChartData, setPrintingChartData] = useState<{name: string; data: number}[]>();

  useEffect(() => {
    updateView();
    const interval = setInterval(() => {
      const today = new Date();
      if (dateRange.to && dateRange.to >= today) {
        updateView();
        console.log("actualizando datos", dateRange.to);
      }
    }, 5 * 60 * 1000); // 1 minutos
    return () => clearInterval(interval);
  }, [dateRange]);

  const updateView = async () => {
    const printingData: IEmbultaje[] = await getEmbultaje({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setPrinting(printingData);

    const reducedArray = printingData.map((item) => ({
      name: `Turno ${item.turn} `,
      data: Number(item.bulk),
    }));
    setPrintingChartData(reducedArray);
  };

  // Generar columnas dinámicamente
  const columns: ColumnDef<IEmbultaje>[] = useMemo(() => {
    if (!printing) return [];
    return [
      {
        accessorKey: "turn",
        header: "Turno",
        cell: (info) => {
          return (
            <Badge variant={"outline"} className="text-muted-foreground">
              {info.getValue() as string}
            </Badge>
          );
        },
      },

      {
        accessorKey: "monday",
        header: "Lun.",
        cell: (info) =>
          parseInt(info.getValue() as string, 10) ? parseInt(info.getValue() as string, 10) : "-",
      },
      {
        accessorKey: "tuesday",
        header: "Mar.",
        cell: (info) =>
          parseInt(info.getValue() as string, 10) ? parseInt(info.getValue() as string, 10) : "-",
      },
      {
        accessorKey: "wednesday",
        header: "Mie.",
        cell: (info) =>
          parseInt(info.getValue() as string, 10) ? parseInt(info.getValue() as string, 10) : "-",
      },
      {
        accessorKey: "thursday",
        header: "Jue.",
        cell: (info) =>
          parseInt(info.getValue() as string, 10) ? parseInt(info.getValue() as string, 10) : "-",
      },
      {
        accessorKey: "friday",
        header: "Vie.",
        cell: (info) =>
          parseInt(info.getValue() as string, 10) ? parseInt(info.getValue() as string, 10) : "-",
      },
      {
        accessorKey: "bulk",
        header: "Bultos",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "weight",
        header: "Peso",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
    ];
  }, [printing]);

  return (
    <div className="gap-4 grid grid-cols-6  ">
      <Card className="@container/card col-span-6 lg:col-span-4 gap-1">
        <CardHeader>
          <CardDescription>Avance de producción</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            actions={<></>}
            columns={columns}
            data={printing}
            hasPaginated={false}
            hasOptions={false}
          />
        </CardContent>
      </Card>
      <Card className="@container/card col-span-6 lg:col-span-2 gap-1">
        <CardHeader>
          <CardDescription>Gráfica</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          <VerticalBarChart colums={printingChartData} unity="%" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkPage;
