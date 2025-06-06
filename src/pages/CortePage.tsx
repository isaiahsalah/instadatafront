import {HorizontalChartBar} from "@/components/charts/BarChartHorizontal";
import CircleProgress, {CircleProgressRef} from "@/components/circleProgress";
import DataTable from "@/components/table/DataTable";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {DateRangeContext} from "@/providers/rangeDate-provider";
import {getCorte} from "@/services/bolsas.api";
import {ICorte} from "@/utils/interfaces";
import {ColumnDef} from "@tanstack/react-table";
import {useContext, useEffect, useMemo, useRef, useState} from "react";

const CortePage = () => {
  const {dateRange} = useContext(DateRangeContext);
  const [corteA, setCorteA] = useState<ICorte[] | null>(null);
  const [corteB, setCorteB] = useState<ICorte[] | null>(null);
  const [corteEnvaseA, setCorteEnvaseA] = useState<ICorte[] | null>(null);
  const [corteEnvaseB, setCorteEnvaseB] = useState<ICorte[] | null>(null);
  const [corteChartDataA, setCorteChartDataA] = useState<{name: string; data: number}[]>();
  const [corteChartDataB, setCorteChartDataB] = useState<{name: string; data: number}[]>();
  const [corteEnvaseChartDataA, setCorteEnvaseChartDataA] =
    useState<{name: string; data: number}[]>();
  const [corteEnvaseChartDataB, setCorteEnvaseChartDataB] =
    useState<{name: string; data: number}[]>();
  const timeNextUpdate = 5 * 60 * 1000; // 5 minutos
  /*
  useEffect(() => {
    updateView();
    const interval = setInterval(() => {
      const today = new Date();
      if (dateRange.to && dateRange.to >= today) {
        updateView();
        console.log("actualizando datos", dateRange.to);
      }
    }, timeNextUpdate);
    return () => clearInterval(interval);
  }, [dateRange]);
*/

  const progressRef = useRef<CircleProgressRef>(null);

  useEffect(() => {
    updateView();
  }, [dateRange]);
  /*
  useEffect(() => {
    // Llama a la función updateView al iniciar y luego cada 5 minutos
    updateView();
    const interval = setInterval(() => {
      const today = new Date();
      if (dateRange.to && dateRange.to >= today) {
        updateView();
        console.log("actualizando datos", dateRange.to);
        if (progressRef.current) {
          progressRef.current.resetProgress(); // Reinicia el progreso circular
        }
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [dateRange]);*/

  const handleCycleComplete = () => {
    const today = new Date();
    if (dateRange.to && dateRange.to >= today) {
      updateView();
      if (progressRef.current) {
        progressRef.current.resetProgress(); // Reinicia el progreso circular
      }
    }
  };

  const updateView = async () => {
    const corteData: ICorte[] = await getCorte({
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    const corteDataA = corteData.filter((item) => item.group === "A" && item.jaba);
    const corteDataB = corteData.filter((item) => item.group === "B" && item.jaba);

    const corteEnvaseDataA = corteData.filter((item) => item.group === "A" && !item.jaba);
    const corteEnvaseDataB = corteData.filter((item) => item.group === "B" && !item.jaba);
    console.log("Sin jaba ", corteDataA);

    setCorteA(corteDataA);
    setCorteB(corteDataB);
    setCorteEnvaseA(corteEnvaseDataA);
    setCorteEnvaseB(corteEnvaseDataB);

    const reducedArrayA = corteDataA.map((item) => ({
      name: `${item.operator} `,
      data: Number(item.jaba ? item.jaba : item.weight),
    }));
    const reducedArrayB = corteDataB.map((item) => ({
      name: `${item.operator} `,
      data: Number(item.jaba ? item.jaba : item.weight),
    }));
    const reducedArrayEnvaseA = corteEnvaseDataA.map((item) => ({
      name: `${item.operator} `,
      data: Number(item.jaba ? item.jaba : item.weight),
    }));
    const reducedArrayEnvaseB = corteEnvaseDataB.map((item) => ({
      name: `${item.operator} `,
      data: Number(item.jaba ? item.jaba : item.weight),
    }));
    console.log("reducido", reducedArrayA, reducedArrayB);
    setCorteChartDataA(reducedArrayA);
    setCorteChartDataB(reducedArrayB);
    setCorteEnvaseChartDataA(reducedArrayEnvaseA);
    setCorteEnvaseChartDataB(reducedArrayEnvaseB);
  };

  // Generar columnas dinámicamente
  const columnsJaba: ColumnDef<ICorte>[] = useMemo(() => {
    if (!corteA || !corteB) return [];
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
        accessorKey: "operator",
        header: "Operador",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "monday",
        header: "Lun.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "tuesday",
        header: "Mar.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "wednesday",
        header: "Mie.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "thursday",
        header: "Jue.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "friday",
        header: "Vie.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },

      {
        accessorKey: "jaba",
        header: "Jabas",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
    ];
  }, [corteA || corteB]);

  // Generar columnas dinámicamente
  const columnsWeigt: ColumnDef<ICorte>[] = useMemo(() => {
    if (!corteA || !corteB) return [];
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
        accessorKey: "operator",
        header: "Operador",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "monday",
        header: "Lun.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "tuesday",
        header: "Mar.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "wednesday",
        header: "Mie.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "thursday",
        header: "Jue.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },
      {
        accessorKey: "friday",
        header: "Vie.",
        cell: (info) =>
          parseFloat(info.getValue() as string) ? parseFloat(info.getValue() as string) : null,
      },

      {
        accessorKey: "weight",
        header: "Peso",
        cell: (info) => parseFloat(info.getValue() as string),
      },
    ];
  }, [corteA || corteB]);

  return (
    <div className="gap-2 grid grid-cols-6  ">
      <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
        <CardContent>
          <CardTitle>Grupo A</CardTitle>
          <div className="grid my-4 gap-1">
            <CardDescription>Bolsas</CardDescription>

            <Separator />
          </div>
          <HorizontalChartBar colums={corteChartDataA} labelSpacing={250} />

          <div className="grid my-4 gap-1">
            <CardDescription>Envase</CardDescription>

            <Separator />
          </div>

          <HorizontalChartBar colums={corteEnvaseChartDataA} labelSpacing={250} />
        </CardContent>
      </Card>
      <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
        <CardContent>
          <CardTitle>Grupo B</CardTitle>
          <div className="grid my-4 gap-1">
            <CardDescription>Bolsas</CardDescription>

            <Separator />
          </div>
          <HorizontalChartBar colums={corteChartDataB} labelSpacing={250} />

          <div className="grid my-4 gap-1">
            <CardDescription>Envase</CardDescription>

            <Separator />
          </div>

          <HorizontalChartBar colums={corteEnvaseChartDataB} labelSpacing={250} />
        </CardContent>
      </Card>

      <Card className="@container/card col-span-6 lg:col-span-3 relative ">
        <CircleProgress
          ref={progressRef} // Pasa la referencia al componente
          duration={timeNextUpdate} // 5 minutos
          step={100} // Actualiza cada 100 ms
          onComplete={handleCycleComplete}
          size={18}
          className="absolute top-0 right-0 z-10 m-6"
        />
        <CardContent>
          <CardTitle>Grupo A</CardTitle>
          <div className="grid my-2 gap-1">
            <CardDescription>Corte</CardDescription>
            <Separator />
          </div>{" "}
          <DataTable
            actions={<></>}
            columns={columnsJaba}
            data={corteA}
            hasPaginated={false}
            hasOptions={false}
          />
          <div className="grid my-2 gap-1">
            <CardDescription>Envase</CardDescription>
            <Separator />
          </div>{" "}
          <Separator />
          <DataTable
            actions={<></>}
            columns={columnsWeigt}
            data={corteEnvaseA}
            hasPaginated={false}
            hasOptions={false}
          />
        </CardContent>
      </Card>

      <Card className="@container/card col-span-6 lg:col-span-3 gap-1">
        <CardContent>
          <CardTitle>Grupo B</CardTitle>
          <div className="grid my-2 gap-1">
            <CardDescription>Corte</CardDescription>
            <Separator />
          </div>{" "}
          <DataTable
            actions={<></>}
            columns={columnsJaba}
            data={corteB}
            hasPaginated={false}
            hasOptions={false}
          />
          <div className="grid my-2 gap-1">
            <CardDescription>Envase</CardDescription>
            <Separator />
          </div>{" "}
          <DataTable
            actions={<></>}
            columns={columnsWeigt}
            data={corteEnvaseB}
            hasPaginated={false}
            hasOptions={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CortePage;
