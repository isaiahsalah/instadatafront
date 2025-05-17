import {SidebarInset, SidebarProvider} from "./components/ui/sidebar";
import ExtrusionPage from "./pages/ExtrusionPage";
import {AppSidebar} from "@/components/app-sidebar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "./providers/theme-provider";

import Header from "./components/app-header";
import {DateRangeProvider} from "./providers/rangeDate-provider";
import {Toaster} from "./components/ui/sonner";
import CortePage from "./pages/CortePage";
import PrintingPage from "./pages/ImpresionPage";

function App() {
  return (
    <DateRangeProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <div className="flex flex-1 flex-col gap-4 p-4 ">
                <main>
                  <Routes>
                    <Route path="/extrusion" element={<ExtrusionPage />} />
                    <Route path="/corte" element={<CortePage />} />
                    <Route path="/impresion" element={<PrintingPage />} />
                  </Routes>
                </main>
              </div>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </DateRangeProvider>
  );
}

export default App;
