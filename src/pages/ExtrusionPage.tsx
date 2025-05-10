import VerticalBarChart from "@/components/charts/vertical-barChart";
import DataTable from "@/components/table/DataTable";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getExtrusion} from "@/services/extrusion.api";
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
    }, 1 * 10 * 1000); // 1 minutos
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
      data: item.objective > 0 ? Math.round((item.good / item.objective) * 100 * 100) / 100 : 0,
    }));
    const reducedArrayB = extrusionDataB.map((item) => ({
      name: `Linea ${item.line}${item.group}`,
      data: item.objective > 0 ? Math.round((item.good / item.objective) * 100 * 100) / 100 : 0,
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
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "line",
        header: "Linea",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "monday",
        header: "Lunes",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "tuesday",
        header: "Martes",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "wednesday",
        header: "Miercoles",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "thursday",
        header: "Jueves",
        cell: (info) => parseInt(info.getValue() as string, 10),
      },
      {
        accessorKey: "friday",
        header: "Viernes",
        cell: (info) => parseInt(info.getValue() as string, 10),
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
      <Card className="@container/card col-span-6 lg:col-span-4">
        <CardHeader>
          <CardTitle>Grupo A</CardTitle>
          <CardDescription>Avance de producción del grupo A</CardDescription>
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
      <Card className="@container/card col-span-6 lg:col-span-2">
        <CardHeader>
          <CardTitle>Gráfica</CardTitle>
          <CardDescription>Avance grafico</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          <VerticalBarChart colums={extrusionChartDataA} unity="%" />
        </CardContent>
      </Card>
      <Card className="@container/card col-span-6 lg:col-span-4">
        <CardHeader>
          <CardTitle>Grupo B</CardTitle>
          <CardDescription>Avance de producción del grupo B</CardDescription>
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

      <Card className="@container/card col-span-6 lg:col-span-2">
        <CardHeader>
          <CardTitle>Gráfica</CardTitle>
          <CardDescription>Avance grafico</CardDescription>
        </CardHeader>
        <CardContent className=" h-full">
          {" "}
          <VerticalBarChart colums={extrusionChartDataB} unity="%" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtrusionPage;
