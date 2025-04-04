import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import FullScreenButton from "./fullScreen-button";
import { useLocation } from "react-router-dom";

import TypographyH4 from "./h4-text";
import { Button } from "./ui/button";
import { RefreshCw, RefreshCwOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { DateRangeContext } from "@/providers/rangeDate-provider";
import { DateRange } from "react-day-picker";
import RangeDatePicker from "./rangeDate-picker";
import { toast } from "sonner";

const Header = () => {
  const location = useLocation();
  const { dateRange, setRange } = useContext(DateRangeContext);

  const currentPath = location.pathname.replace(/^\/|\/$/g, "");
  const [isUpdate, setIsUpdate] = useState(true);

  const [date, setDate] = useState<DateRange | undefined>({
    from: dateRange?.from, // Fecha de hoy
    to: dateRange?.to, // Fecha 1 días después de hoy
  });
  useEffect(() => {
    if (
      date?.from?.toDateString() !== dateRange?.from?.toDateString() ||
      date?.to?.toDateString() !== dateRange?.to?.toDateString()
    ) {
      setIsUpdate(false);
    }else{setIsUpdate(true)}
  }, [date, dateRange]);

  const toggleUpdateDate = () => {
    if (!date?.from || !date.to)
      return toast.error("Selecione la fecha de inicio y final correcta");

    if (
      date?.from?.toDateString() !== dateRange?.from?.toDateString() ||
      date?.to?.toDateString() !== dateRange?.to?.toDateString()
    ) {
      setRange(date);
      setIsUpdate(true);
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
      <SidebarTrigger className="-ml-1" />
      <div className="hidden sm:block">
        <TypographyH4 data={currentPath} />
      </div>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="ml-auto">
        <RangeDatePicker dateRange={date} setRange={setDate} />
      </div>
      <Button
        onClick={toggleUpdateDate}
        variant="ghost"
        size="icon"
        className={isUpdate ? "pointer-events-none opacity-50" : ""}
      >
        {isUpdate ? <RefreshCw size={20} /> : <RefreshCwOff size={20} />}
      </Button>
      <FullScreenButton />
    </header>
  );
};

export default Header;
