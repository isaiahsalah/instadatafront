import VerticalBarChart from "@/components/charts/vertical-barChart";
import DataTable from "@/components/data-table";
import TypographyH2 from "@/components/h2-text";
import SkeletonTable from "@/components/skeletons/table.skeleton";
import SkeletonVerticalBarChar from "@/components/skeletons/verticalBarChart.skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangeContext } from "@/providers/rangeDate-provider";
import { postExtrusionAvancedOrder } from "@/services/extrusion.api";
import { useContext, useEffect, useState } from "react";

const ExtrusionPage = () => {
  const [dataDay, setDataDay] = useState([]);
  const [dataNigth, setDataNigth] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useContext(DateRangeContext);

  useEffect(() => {
    setLoading(true);
    postExtrusionAvancedOrder({ dateRange: dateRange })
      .then((res) => {
        setDataDay(
          res
            .filter((d: { turno: string }) => d.turno === "Dia")
            .map(({ turno, ...rest }) => {
              return rest;
            })
        );
        setDataNigth(
          res
            .filter((d: { turno: string }) => d.turno === "Noche")
            .map(({ turno, ...rest }) => rest)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [dateRange]);

  return (
    <div className="space-y-4 space-x-4 md:grid grid-cols-2 ">
      {loading ? (
        <>
          <Skeleton className="h-7 w-[200px]" />
          <SkeletonTable rows={4} colums={6} />
          <SkeletonVerticalBarChar data={4} />
          <Skeleton className="h-7 w-[200px]" />
          <SkeletonTable rows={4} colums={6} />
          <SkeletonVerticalBarChar data={4} />
        </>
      ) : (
        <>
          <div className="space-y-4 space-x-4  ">
            <TypographyH2 data="Turno Diurno" />

            <DataTable
              data={dataDay}
              detail="Resumen detallado del rendimiento por línea de producción"
            />

            <VerticalBarChart
              data={dataDay}
              title="Gráfico de Barras: Cumplimiento de Objetivos - Diurno"
              detail="Rendimiento de las líneas de producción en el turno diurno, mostrando acumulado, objetivo y calidad."
              Footertitle=""
              Footerdetail=""
            />
          </div>
          <div className="space-y-4 space-x-4  ">
          <TypographyH2 data="Turno Nocturno" />
          <DataTable
            data={dataNigth}
            detail="Resumen detallado del rendimiento por línea de producción"
          />

          <VerticalBarChart
            data={dataNigth}
            title="Gráfico de Barras: Cumplimiento de Objetivos - Nocturno"
            detail="Rendimiento de las líneas de producción en el turno nocturno, mostrando acumulado, objetivo y calidad."
            Footertitle=""
            Footerdetail=""
          />
          </div>
          
        </>
      )}
    </div>
  );
};

export default ExtrusionPage;
