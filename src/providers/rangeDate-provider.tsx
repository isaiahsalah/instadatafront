import {createContext, JSX, useState} from "react";
import {startOfDay, endOfDay, startOfWeek, addDays} from "date-fns";
import {DateRange} from "react-day-picker";

type contextProps = {
  dateRange: DateRange;
  setRange: (dateRange: DateRange) => void;
};

// Crear el contexto con un valor por defecto
export const DateRangeContext = createContext<contextProps>({} as contextProps);

interface props {
  children: JSX.Element | JSX.Element[];
}

export const DateRangeProvider = ({children}: props) => {
  const today = new Date();

  // Calcular el lunes y viernes de la semana actual
  const monday = startOfWeek(today, {weekStartsOn: 1}); // `weekStartsOn: 1` hace que la semana inicie en lunes
  const friday = addDays(monday, 4); // Agrega 4 días al lunes para obtener el viernes

  // Rango inicial de lunes a viernes
  const initialRange: DateRange = {
    from: startOfDay(monday), // Desde las 00:00 del lunes
    to: endOfDay(friday), // Hasta las 23:59 del viernes
  };

  const [dateRange, setDateRange] = useState<DateRange>(initialRange);

  const setRange = (dateRange: DateRange) => {
    if (dateRange && dateRange.from && dateRange.to)
      setDateRange({
        from: startOfDay(dateRange.from), // Asegurar que la fecha inicial sea a las 00:00
        to: endOfDay(dateRange.to), // Asegurar que la fecha final sea a las 23:59
      });
    else setDateRange(dateRange);
  };

  return (
    <DateRangeContext.Provider value={{dateRange, setRange}}>{children}</DateRangeContext.Provider>
  );
};
