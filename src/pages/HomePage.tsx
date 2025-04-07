import RadialPieChart from "@/components/charts/radial-pieChart";
import TypographyH2 from "@/components/h2-text";
import SkeletonRadialPieChart from "@/components/skeletons/radialPieChart.skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangeContext } from "@/providers/rangeDate-provider";
import { postExtrusionAvancedOrder } from "@/services/extrusion.api";
import { Extrusion_pa_po_withoutTurno } from "@/types/EctrusionType";
import { useContext, useEffect, useState } from "react";
const HomePage = () => {
  const [dataDay, setDataDay] = useState<Extrusion_pa_po_withoutTurno[]>();
  const [dataNigth, setDataNigth] = useState<Extrusion_pa_po_withoutTurno[]>();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const updateData = () => {
    postExtrusionAvancedOrder({ dateRange: dateRange })
      .then((res) => {
        console.log(res);
        const restDay: Extrusion_pa_po_withoutTurno[] = res
          .filter((d: { turno: string }) => d.turno === "Dia")
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ turno, ...rest }) => {
            return rest;
          });
        const restNigth: Extrusion_pa_po_withoutTurno[] = res
          .filter((d: { turno: string }) => d.turno === "Noche")
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ">
      {loading ? (
        <>
          <div className="col-span-1  md:col-span-2 xl:col-span-4  ">
            <Skeleton className="h-7 w-[200px]" />
          </div>
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
          <div className="col-span-1  md:col-span-2 xl:col-span-4  ">
            <Skeleton className="h-7 w-[200px]" />
          </div>
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
        </>
      ) : (
        <>
          <div className="col-span-1  md:col-span-2 xl:col-span-4  ">
            <TypographyH2 data="Turno Diurno" />
          </div>

          {dataDay?.map((dat) => (
            <RadialPieChart
              title={`Linea ${dat.linea}`}
              detail={`Porcentaje de avance con respecto al objetivo de la linea ${dat.linea}`}
              Footertitle={`${dat.acumulado} / ${dat.objetivo}`}
              Footerdetail="Avance / Objetivo"
              data={dat.acumulado}
              total={dat.objetivo}
              dataTitle={`${dat.promedio}%`}
              dataDetail={`Dato porcentual`}
            />
          ))}

          <div className="col-span-1  md:col-span-2 xl:col-span-4  ">
            <TypographyH2 data="Turno Nocturno" />
          </div>

          {dataNigth?.map((dat) => (
            <RadialPieChart
              title={`Linea ${dat.linea}`}
              detail={`Porcentaje de avance con respecto al objetivo de la linea ${dat.linea}`}
              Footertitle={`${dat.acumulado} / ${dat.objetivo}`}
              Footerdetail="Avance / Objetivo"
              data={dat.acumulado}
              total={dat.objetivo}
              dataTitle={`${dat.promedio}%`}
              dataDetail={`Dato porcentual`}
            />
          ))}
        </>
      )}
    </div>
  );
};
/* {dateRange?.from?.toLocaleString()}
{" - "}
{dateRange?.to?.toLocaleString()}*/

export default HomePage;
