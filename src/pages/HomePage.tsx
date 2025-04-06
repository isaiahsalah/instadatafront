import RadialPieChart from "@/components/charts/radial-pieChart";
import TypographyH2 from "@/components/h2-text";
const HomePage = () => {
  return (
    <div  className="gap-4 grid grid-cols-1  ">
        <TypographyH2 data="Turno Diurno" />
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ">
      <RadialPieChart
        title="Fila 1"
        detail="Detalle"
        Footertitle="Footer"
        Footerdetail="Footer Detail"
        data={80}
        total={100}
        dataTitle="80/100"
        dataDetail="detalle"
      />
      <RadialPieChart
        title="Fila 2"
        detail="Detalle"
        Footertitle="Footer"
        Footerdetail="Footer Detail"
        data={60}
        total={100}
        dataTitle="80/100"
        dataDetail="detalle"
      />
      <RadialPieChart
        title="Fila 3"
        detail="Detalle"
        Footertitle="Footer"
        Footerdetail="Footer Detail"
        data={40}
        total={100}
        dataTitle="80/100"
        dataDetail="detalle"
      />
      <RadialPieChart
        title="Fila 4"
        detail="Detalle"
        Footertitle="Footer"
        Footerdetail="Footer Detail"
        data={90}
        total={100}
        dataTitle="80/100"
        dataDetail="detalle"
      />
    </div>
    </div>
    
  );
};
/* {dateRange?.from?.toLocaleString()}
{" - "}
{dateRange?.to?.toLocaleString()}*/

export default HomePage;
