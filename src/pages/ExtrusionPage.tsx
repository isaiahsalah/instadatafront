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
    setExtrusionA(extrusionData.filter((item) => item.group === "A"));
    setExtrusionB(extrusionData.filter((item) => item.group === "B"));
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
    ];
  }, [extrusionA || extrusionB]);

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 ">
      <Card className="@container/card col-span-6 lg:col-span-6">
        <CardHeader>
          <CardTitle>Grupo A</CardTitle>
          <CardDescription>Avance de prosucción del grupo A</CardDescription>
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
      <Card className="@container/card col-span-6 lg:col-span-6">
        <CardHeader>
          <CardTitle>Grupo B</CardTitle>
          <CardDescription>Avance de prosucción del grupo B</CardDescription>
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
    </div>
  );
};

export default ExtrusionPage;
