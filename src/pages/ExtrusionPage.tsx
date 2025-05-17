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
import {getExtrusion} from "@/services/bolsas.api";
import {IExtrusion} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useState} from "react";

const ExtrusionPage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [extrusionA, setExtrusionA] = useState<IExtrusion[] | null>(null);
  const [extrusionB, setExtrusionB] = useState<IExtrusion[] | null>(null);
  const [extrusionChartDataA, setExtrusionChartDataA] = useState<{name: string; data: number}[]>();
  const [extrusionChartDataB, setExtrusionChartDataB] = useState<{name: string; data: number}[]>();

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
    const extrusionData: IExtrusion[] = await getExtrusion({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    const extrusionDataA = extrusionData.filter((item) => item.group === "A");
    const extrusionDataB = extrusionData.filter((item) => item.group === "B");
    setExtrusionA(extrusionDataA);
    setExtrusionB(extrusionDataB);
    console.log("✖️✖️", extrusionData);
    const reducedArrayA = extrusionDataA.map((item) => ({
      name: `Linea ${item.line}${item.group}`,
      data: Number(
        item.objective > 0 ? Math.round((item.good / item.objective) * 100 * 100) / 100 : 0
      ),
    }));
    const reducedArrayB = extrusionDataB.map((item) => ({
      name: `Linea ${item.line}${item.group}`,
      data: Number(
        item.objective > 0 ? Math.round((item.good / item.objective) * 100 * 100) / 100 : 0
      ),
    }));
    setExtrusionChartDataA(reducedArrayA);
    setExtrusionChartDataB(reducedArrayB);
  };

  // Generar columnas dinámicamente
  const columns: ColumnDef<IExtrusion>[] = useMemo(() => {
    if (!extrusionA || !extrusionB) return [];
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
        accessorKey: "line",
        header: "Linea",
        cell: (info) => info.getValue(),
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
        accessorKey: "good",
        header: "Buena",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "bad",
        header: "Mala",
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
          const good = Number(row.original.good);
          return <>{objective > 0 ? Math.round((good / objective) * 100 * 100) / 100 : 0} %</>;
        },
      },
      {
        accessorKey: "quality",
        header: "Calidad",
        cell: ({row}) => {
          const bad = Number(row.original.bad);
          const good = Number(row.original.good);

          return <>{good + bad > 0 ? Math.round((good / (good + bad)) * 100 * 100) / 100 : 0} %</>;
        },
      },
      {
        accessorKey: "average",
        header: "Promedio",
        cell: ({row}) => {
          const bad = Number(row.original.bad);
          const good = Number(row.original.good);
          const objective = Number(row.original.objective);
          const advance = objective > 0 ? Math.round((good / objective) * 100 * 100) / 100 : 0;
          const quality = good + bad > 0 ? Math.round((good / (good + bad)) * 100 * 100) / 100 : 0;

          return <>{Math.round(((advance + quality) / 2) * 100) / 100} %</>;
        },
      },
    ];
  }, [extrusionA || extrusionB]);

  return (
    <div className="gap-4 grid grid-cols-6  ">
      <Card className="@container/card col-span-6 lg:col-span-4 gap-1">
        <CardHeader>
          <CardDescription>Grupo A</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            actions={<></>}
            columns={columns}
            data={extrusionA}
            hasPaginated={false}
            hasOptions={false}
          />
        </CardContent>
      </Card>
      <Card className="@container/card col-span-6 lg:col-span-2 gap-1">
        <CardHeader>
          <CardDescription>Gráfica Grupo A</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          <VerticalBarChart colums={extrusionChartDataA} unity="%" />
        </CardContent>
      </Card>
      <Card className="@container/card col-span-6 lg:col-span-4 gap-1">
        <CardHeader>
          <CardDescription>Grupo B</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            actions={<></>}
            columns={columns}
            data={extrusionB}
            hasPaginated={false}
            hasOptions={false}
          />
        </CardContent>
      </Card>

      <Card className="@container/card col-span-6 lg:col-span-2 gap-1">
        <CardHeader>
          <CardDescription>Gráfica Grupo B</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          {" "}
          <VerticalBarChart colums={extrusionChartDataB} unity="%" />
        </CardContent>
      </Card>
      <div className="col-span-6   grid grid-cols-12 gap-4">
        {extrusionA?.map((dat) => (
          <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
            <CardHeader>
              <CardTitle>{` Linea ${dat.line} ${dat.group}`}</CardTitle>
              <CardDescription>
                {" "}
                {`Porcentaje de avance con respecto al objetivo del turno ${dat.turn}`}
              </CardDescription>
            </CardHeader>
            <CardContent className=" h-full">
              <RadialPieChart
                data={dat.good}
                total={dat.objective}
                dataTitle={`${
                  dat.objective > 0 ? Math.round((dat.good / dat.objective) * 100 * 100) / 100 : 0
                }%`}
                dataDetail={`Meta: ${dat.objective}`}
              />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                {`  ${Number(dat.good)} / ${dat.objective}`}
              </div>
            </CardFooter>
          </Card>
        ))}
        {extrusionB?.map((dat) => (
          <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
            <CardHeader>
              <CardTitle>{` Linea ${dat.line} ${dat.group}`}</CardTitle>
              <CardDescription>
                {" "}
                {`Porcentaje de avance con respecto al objetivo del turno ${dat.turn}`}
              </CardDescription>
            </CardHeader>
            <CardContent className=" h-full">
              <RadialPieChart
                data={dat.good}
                total={dat.objective}
                dataTitle={`${
                  dat.objective > 0 ? Math.round((dat.good / dat.objective) * 100 * 100) / 100 : 0
                }%`}
                dataDetail={`Meta: ${dat.objective}`}
                variant={"chart5"}
              />
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                {`  ${Number(dat.good)} / ${dat.objective}`}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExtrusionPage;
