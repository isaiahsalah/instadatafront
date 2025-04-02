import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import CortePage from "./pages/CortePage";
import ExtrusionPage from "./pages/ExtrusionPage";
import HomePage from "./pages/HomePage";
import { AppSidebar } from "@/components/app-sidebar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ImpresionPage from "./pages/ImpresionPage";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

function App() {
  
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/corte" element={<CortePage />} />
                  <Route path="/extrusion" element={<ExtrusionPage />} />
                  <Route path="/impresion" element={<ImpresionPage />} />
                </Routes>
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
