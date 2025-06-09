import {SidebarInset, SidebarProvider} from "./components/ui/sidebar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ThemeProvider} from "./providers/theme-provider";

import {DateRangeProvider} from "./providers/rangeDate-provider";
import {Toaster} from "./components/ui/sonner";
import BagsCourtPage from "./pages/bolsas/BagsCourtPage";
import BagsPrintingPage from "./pages/bolsas/BagsPrintingPage";
import Header from "./components/sidebar/app-header";
import {AppSidebar} from "./components/sidebar/app-sidebar";
import BagsPackingPage from "./pages/bolsas/BagsPackingPage";
import BagsBulkPage from "./pages/bolsas/BagsBulkPage";
import BagsMixPage from "./pages/bolsas/BagsMixPage";
import ThermoBulkPage from "./pages/termo/ThermoBulkPage";
import ThermoCourtPage from "./pages/termo/ThermoCourtPage";
import ThermoExtrusionPage from "./pages/termo/ThermoExtrusionPage";
import BagsExtrusionPage from "./pages/bolsas/BagsExtrusionPage";

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
                    <Route path="/bolsas/mezcla" element={<BagsMixPage />} />
                    <Route path="/bolsas/extrusion" element={<BagsExtrusionPage />} />
                    <Route path="/bolsas/corte" element={<BagsCourtPage />} />
                    <Route path="/bolsas/impresion" element={<BagsPrintingPage />} />
                    <Route path="/bolsas/empaque" element={<BagsPackingPage />} />
                    <Route path="/bolsas/embultaje" element={<BagsBulkPage />} />

                    <Route path="/termo/extrusion" element={<ThermoExtrusionPage />} />
                    <Route path="/termo/corte" element={<ThermoCourtPage />} />
                    <Route path="/termo/embultaje" element={<ThermoBulkPage />} />
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
