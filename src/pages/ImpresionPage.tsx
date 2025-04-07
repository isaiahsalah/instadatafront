import RadialPieChart from "@/components/charts/radial-pieChart";
import DataTable from "@/components/data-table";
import SkeletonRadialPieChart from "@/components/skeletons/radialPieChart.skeleton";
import SkeletonTable from "@/components/skeletons/table.skeleton";
import { DateRangeContext } from "@/providers/rangeDate-provider";
import { postImpresionAvancedOrder } from "@/services/impresion.api";
import { Impresion_pa_po } from "@/types/ImpresionType";
import { useContext, useEffect, useState } from "react";

const ImpresionPage = () => {
  const [data, setData] = useState<Impresion_pa_po[]>();
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
    postImpresionAvancedOrder({ dateRange: dateRange })
      .then((res) => {
        console.log(res);

        setData(res);
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
          <div className="col-span-1  md:col-span-2 ">
            <SkeletonTable rows={2} colums={4} />
          </div>
          <SkeletonRadialPieChart />
          <SkeletonRadialPieChart />
        </>
      ) : (
        <>
          <div className="col-span-1  md:col-span-2 ">
            <DataTable
              data={data}
              detail="Resumen detallado del rendimiento por turno"
            />
          </div>
          {data?.map((dat) => (
            <RadialPieChart
              title={`Turno ${dat.turno}`}
              detail="Detalle"
              Footertitle="Footer"
              Footerdetail="Footer Detail"
              data={dat.avance}
              total={dat.objetivo}
              dataTitle={`${dat.promedio}%`}
              dataDetail={`${dat.avance}/${dat.objetivo}`}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ImpresionPage;
