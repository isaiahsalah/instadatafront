import { createContext, JSX, useState } from "react";
import { startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

type contextProps = {
  dateRange: DateRange ;
  setRange: (dateRange: DateRange ) => void;
};

// Crear el contexto con un valor por defecto
export const DateRangeContext = createContext<contextProps>({} as contextProps);

interface props {
  children: JSX.Element | JSX.Element[];
}

export const DateRangeProvider = ({ children }: props) => {
  // Establecer la fecha inicial y final en las condiciones mencionadas
  const today = new Date();
  const initialRange: DateRange = {
    from: startOfDay(today), // Desde las 00:00 de hoy
    to: endOfDay(today), // Hasta las 23:59 de hoy
  };

  const [dateRange, setDateRange] = useState<DateRange >(
    initialRange
  );

  const setRange = (dateRange: DateRange ) => {
    if (dateRange)
      setDateRange({
        from: dateRange.from ? startOfDay(dateRange.from) : undefined, // Asegurar que la fecha inicial sea a las 00:00
        to: dateRange.to ? endOfDay(dateRange.to) : undefined, // Asegurar que la fecha final sea a las 23:59
      });
    else setDateRange(dateRange);
  };

  return (
    <DateRangeContext.Provider value={{ dateRange, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};
