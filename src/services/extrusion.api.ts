import { DateRange } from "react-day-picker";
import { api } from "./api";
import { Extrusion_pa_po } from "@/types/EctrusionType";

const url= "/extrusion"

export const postExtrusionAvancedOrder = async ({dateRange}:{dateRange:DateRange}) => {
   const {from, to}= dateRange
    const { data }:{data:Extrusion_pa_po[]} = await api.post(url+"/avancedOrder", {
        from,
        to,
      });
    //console.log(data)
    return data;
};
