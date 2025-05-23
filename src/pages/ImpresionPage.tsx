import RadialPieChart from "@/components/charts/radial-pieChart";
import VerticalBarChart from "@/components/charts/vertical-barChart";
import DataTable from "@/components/table/DataTable";
import {Badge} from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getImpresion} from "@/services/bolsas.api";
import {IImpresion} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useState} from "react";

const PrintingPage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [printing, setPrinting] = useState<IImpresion[] | null>(null);
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
    const printingData: IImpresion[] = await getImpresion({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setPrinting(printingData);

    const reducedArray = printingData.map((item) => ({
      name: `Turno ${item.turn} `,
      data: Number(
        item.objective > 0 ? Math.round((item.total / item.objective) * 100 * 100) / 100 : 0
      ),
    }));
    setPrintingChartData(reducedArray);
  };

  // Generar columnas dinámicamente
  const columns: ColumnDef<IImpresion>[] = useMemo(() => {
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
        accessorKey: "total",
        header: "Total",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "objective",
        header: "Objetivo",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "advance",
        header: "Avance",
        cell: ({row}) => {
          const objective = Number(row.original.objective);
          const good = Number(row.original.total);
          return <>{objective > 0 ? Math.round((good / objective) * 100 * 100) / 100 : 0} %</>;
        },
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
      {printing?.map((dat) => (
        <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
          <CardHeader>
            <CardTitle>{`Turno ${dat.turn}`}</CardTitle>
            <CardDescription>
              {" "}
              {`Porcentaje de avance con respecto al objetivo del turno ${dat.turn}`}
            </CardDescription>
          </CardHeader>
          <CardContent className=" h-full">
            <RadialPieChart
              data={dat.total}
              total={dat.objective}
              dataTitle={`${
                dat.objective > 0 ? Math.round((dat.total / dat.objective) * 100 * 100) / 100 : 0
              }%`}
              dataDetail={`Meta: ${dat.objective}`}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              {`  ${Number(dat.total)} / ${dat.objective}`}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PrintingPage;
