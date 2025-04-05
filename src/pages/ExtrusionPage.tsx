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
    updateData();

    const interval = setInterval(() => {
      const today = new Date();
      if (dateRange.to && dateRange.to >= today) {
        updateData();
        console.log("actualizando datos", dateRange.to);
      }
    }, 5 * 10 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [dateRange]);

  const updateData = () => {
    postExtrusionAvancedOrder({ dateRange: dateRange })
      .then((res) => {
        console.log(res);
        const restDay = res
          .filter((d: { turno: string }) => d.turno === "Dia")
          .map(({ turno, ...rest }) => {
            return rest;
          });
        const restNigth = res
          .filter((d: { turno: string }) => d.turno === "Noche")
          .map(({ turno, ...rest }) => rest);

        setDataDay(restDay);
        setDataNigth(restNigth);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 ">
      {loading ? (
        <>
          <div className="space-y-4 space-x-4  ">
            <Skeleton className="h-7 w-[200px]" />
            <SkeletonTable rows={4} colums={6} />
            <SkeletonVerticalBarChar data={4} />
          </div>
          <div className="space-y-4 space-x-4  ">
            <Skeleton className="h-7 w-[200px]" />
            <SkeletonTable rows={4} colums={6} />
            <SkeletonVerticalBarChar data={4} />
          </div>
        </>
      ) : (
        <>
                    <SkeletonVerticalBarChar data={4} />

          <div className="space-y-4 space-x-4  ">
            <TypographyH2 data="Turno Diurno" />
            <DataTable
              data={dataDay}
              detail="Resumen detallado del rendimiento por línea de producción"
            />
            {
              <VerticalBarChart
                data={dataDay}
                title="Gráfico de Barras: Cumplimiento de Objetivos - Diurno"
                detail="Rendimiento de las líneas de producción en el turno diurno, mostrando acumulado, objetivo y calidad."
                Footertitle=""
                Footerdetail=""
              />
            }
          </div>
          <div className="space-y-4 space-x-4  ">
            <TypographyH2 data="Turno Nocturno" />
            <DataTable
              data={dataNigth}
              detail="Resumen detallado del rendimiento por línea de producción"
            />
            {
              <VerticalBarChart
                data={dataNigth}
                title="Gráfico de Barras: Cumplimiento de Objetivos - Nocturno"
                detail="Rendimiento de las líneas de producción en el turno nocturno, mostrando acumulado, objetivo y calidad."
                Footertitle=""
                Footerdetail=""
              />
            }
          </div>
        </>
      )}
    </div>
  );
};

export default ExtrusionPage;
