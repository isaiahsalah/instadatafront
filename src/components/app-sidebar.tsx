import {
  Scissors,
  GlassWater,
  Stamp,
  Home,
  Milk,
  Soup,
  Bandage,
  Heater,
  GalleryVerticalEnd,
  ChevronsUpDown,
  ChartBarStacked,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { stat } from "fs";
import { ModeToggle } from "./mode-toggle";

// Menu items.
// This is sample data.
const data = {
  versions: ["0.0.1"],
  navMain: [
    {
      title: "Inicio",
      items: [
        {
          title: "DashBoard",
          url: "",
          icon: Home,
          state: true,
        },
      ],
    },
    {
      title: "Planta",
      url: "#",
      items: [
        {
          title: "Extrusion",
          url: "extrusion",
          icon: GlassWater,
          state: true,
        },
        {
          title: "Impresión",
          url: "impresion",
          icon: Stamp,
          state: true,
        },
        {
          title: "Corte",
          url: "corte",
          icon: Scissors,
          state: true,
        },
        {
          title: "Empaque",
          url: "empaque",
          icon: Stamp,
          state: false,
        },
        {
          title: "Termoformado",
          url: "termoformado",
          icon: Heater,
          state: false,
        },
        {
          title: "Inyeción",
          url: "inyecion",
          icon: Bandage,
          state: false,
        },
        {
          title: "Expandido",
          url: "expandido",
          icon: Soup,
          state: false,
        },
        {
          title: "Tanques",
          url: "tanque",
          icon: Milk,
          state: false,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem
          className="flex items-center justify-between gap-2 m-2  "
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <ChartBarStacked className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Plásticos Camen</span>
            <span className="">v{data.versions}</span>
            
          </div>
          <div className="ml-auto">
          <ModeToggle />
          </div>
          
        </SidebarMenuItem>
        
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group,i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item,i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={
                          item.state ? "" : `pointer-events-none opacity-50`
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center justify-between">
                  Plástico Carmen
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        
      </SidebarFooter>
    </Sidebar>
  );
}
