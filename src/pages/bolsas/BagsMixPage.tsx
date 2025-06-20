import VerticalBarChart from "@/components/charts/ChartBarVertical";
import DataTable from "@/components/table/DataTable";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getBagsMezcla} from "@/services/bolsas.api";
import {IBagsMezcla} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useState} from "react";

const BagsMixPage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [printing, setPrinting] = useState<IBagsMezcla[] | null>(null);
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
    const printingData: IBagsMezcla[] = await getBagsMezcla({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setPrinting(printingData);

    const reducedArray = printingData.map((item) => ({
      name: `Turno ${item.turn} `,
      data: Number(item.total),
    }));
    setPrintingChartData(reducedArray);
  };

  // Generar columnas dinámicamente
  const columns: ColumnDef<IBagsMezcla>[] = useMemo(() => {
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
        accessorFn: (row) => parseInt(row.monday, 10),
        header: "Lun.",
        cell: (info) =>
          info.getValue() ? (
            <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
          ) : (
            <Badge variant={"outline"} className="text-muted-foreground">
              -
            </Badge>
          ),
      },
      {
        accessorFn: (row) => parseInt(row.tuesday, 10),
        header: "Mar.",
        cell: (info) =>
          info.getValue() ? (
            <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
          ) : (
            <Badge variant={"outline"} className="text-muted-foreground">
              -
            </Badge>
          ),
      },
      {
        accessorFn: (row) => parseInt(row.wednesday, 10),

        header: "Mie.",
        cell: (info) =>
          info.getValue() ? (
            <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
          ) : (
            <Badge variant={"outline"} className="text-muted-foreground">
              -
            </Badge>
          ),
      },
      {
        accessorFn: (row) => parseInt(row.thursday, 10),
        header: "Jue.",
        cell: (info) =>
          info.getValue() ? (
            <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
          ) : (
            <Badge variant={"outline"} className="text-muted-foreground">
              -
            </Badge>
          ),
      },
      {
        accessorFn: (row) => parseInt(row.friday, 10),
        header: "Vie.",
        cell: (info) =>
          info.getValue() ? (
            <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
          ) : (
            <Badge variant={"outline"} className="text-muted-foreground">
              -
            </Badge>
          ),
      },
      {
        accessorKey: "total",
        header: "Total",
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
          <CardDescription>Avance de Mezcla</CardDescription>
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

export default BagsMixPage;
