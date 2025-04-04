import {
  SidebarInset,
  SidebarProvider,
} from "./components/ui/sidebar";
import CortePage from "./pages/CortePage";
import ExtrusionPage from "./pages/ExtrusionPage";
import HomePage from "./pages/HomePage";
import { AppSidebar } from "@/components/app-sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImpresionPage from "./pages/ImpresionPage";
import { ThemeProvider } from "./providers/theme-provider";

import Header from "./components/app-header";
import { DateRangeProvider } from "./providers/rangeDate-provider";
import { Toaster } from "./components/ui/sonner";

function App() {
  
  return (
    <DateRangeProvider>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header/>
            <div className="flex flex-1 flex-col gap-4 p-4 ">
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/corte" element={<CortePage />} />
                  <Route path="/extrusion" element={<ExtrusionPage />} />
                  <Route path="/impresion" element={<ImpresionPage />} />
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
