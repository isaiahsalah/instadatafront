import { DateRange } from "react-day-picker";
import { api } from "./api";

const url= "/extrusion"

export const postExtrusionAvancedOrder = async ({dateRange}:{dateRange:DateRange}) => {
   const {from, to}= dateRange
    const { data } = await api.post(url+"/avancedOrder", {
        from,
        to,
      });
    //console.log(data)
    return data;
};
