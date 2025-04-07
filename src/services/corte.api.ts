import { DateRange } from "react-day-picker";
import { api } from "./api";
import { Corte_pa_po } from "@/types/CorteType";

const url= "/corte"

export const postCorteAvancedOrder = async ({dateRange}:{dateRange:DateRange}) => {
   const {from, to}= dateRange
    const { data }:{data:Corte_pa_po[]} = await api.post(url+"/avancedOrder", {
        from,
        to,
      });
    //console.log(data)
    return data;
};
