import { DateRange } from "react-day-picker";
import { api } from "./api";
import { Impresion_pa_po } from "@/types/ImpresionType";

const url= "/impresion"

export const postImpresionAvancedOrder = async ({dateRange}:{dateRange:DateRange}) => {
   const {from, to}= dateRange
    const { data }:{data:Impresion_pa_po[]} = await api.post(url+"/avancedOrder", {
        from,
        to,
      });
    //console.log(data)
    return data;
};
