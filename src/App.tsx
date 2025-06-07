import {SidebarInset, SidebarProvider} from "./components/ui/sidebar";
import ExtrusionPage from "./pages/ExtrusionPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "./providers/theme-provider";

import {DateRangeProvider} from "./providers/rangeDate-provider";
import {Toaster} from "./components/ui/sonner";
import CortePage from "./pages/CortePage";
import PrintingPage from "./pages/ImpresionPage";
import Header from "./components/sidebar/app-header";
import {AppSidebar} from "./components/sidebar/app-sidebar";
import EmpaquePage from "./pages/EmpaquePage";
import BulkPage from "./pages/EmbultajePage";

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
                    <Route path="/bolsas/extrusion" element={<ExtrusionPage />} />
                    <Route path="/bolsas/corte" element={<CortePage />} />
                    <Route path="/bolsas/impresion" element={<PrintingPage />} />
                    <Route path="/bolsas/empaque" element={<EmpaquePage />} />
                    <Route path="/bolsas/embultaje" element={<BulkPage />} />
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
