import RadialPieChart from "@/components/charts/ChartRadialPie";
import VerticalBarChart from "@/components/charts/ChartBarVertical";
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
import {Skeleton} from "@/components/ui/skeleton";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getBagsExtrusion} from "@/services/bolsas.api";
import {randomNumber} from "@/utils/funtions";
import {IBagsExtrusion} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useState} from "react";

const BagsExtrusionPage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [extrusionA, setExtrusionA] = useState<IBagsExtrusion[] | null>(null);
  const [extrusionB, setExtrusionB] = useState<IBagsExtrusion[] | null>(null);
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
    const extrusionData: IBagsExtrusion[] = await getBagsExtrusion({
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
  const columns: ColumnDef<IBagsExtrusion>[] = useMemo(() => {
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
      <div className="col-span-6   grid grid-cols-12 gap-4">
        {extrusionA
          ? extrusionA.map((dat) => (
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
                      dat.objective > 0
                        ? Math.round((dat.good / dat.objective) * 100 * 100) / 100
                        : 0
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
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="@container/card col-span-6 lg:col-span-3 gap-1">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>
                      <Skeleton className="h-5 " style={{width: `${randomNumber(20, 70)}%`}} />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-5 " style={{width: `${randomNumber(70, 100)}%`}} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 mx-auto my-9">
                    <Skeleton className="aspect-[1/1] w-45 rounded-full" />
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none w-[100%]">
                      <Skeleton className="h-5 " style={{width: `${randomNumber(30, 80)}%`}} />
                    </div>
                    <div className="leading-none text-muted-foreground w-[100%]">
                      <Skeleton className="h-5 " style={{width: `${randomNumber(70, 100)}%`}} />
                    </div>
                  </CardFooter>
                </Card>
              ))}
        {extrusionB
          ? extrusionB.map((dat) => (
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
                      dat.objective > 0
                        ? Math.round((dat.good / dat.objective) * 100 * 100) / 100
                        : 0
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
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="@container/card col-span-6 lg:col-span-3 gap-1">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>
                      <Skeleton className="h-5 " style={{width: `${randomNumber(20, 70)}%`}} />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-5 " style={{width: `${randomNumber(70, 100)}%`}} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0 mx-auto my-9">
                    <Skeleton className="aspect-[1/1] w-45 rounded-full" />
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none w-[100%]">
                      <Skeleton className="h-5 " style={{width: `${randomNumber(30, 80)}%`}} />
                    </div>
                    <div className="leading-none text-muted-foreground w-[100%]">
                      <Skeleton className="h-5 " style={{width: `${randomNumber(70, 100)}%`}} />
                    </div>
                  </CardFooter>
                </Card>
              ))}
      </div>
      <Card className="@container/card col-span-6 lg:col-span-4 gap-1 ">
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
          <CardDescription>Gráfica A</CardDescription>
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
          <CardDescription>Gráfica B</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          <VerticalBarChart colums={extrusionChartDataB} unity="%" variant={"chart5"} />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default BagsExtrusionPage;
