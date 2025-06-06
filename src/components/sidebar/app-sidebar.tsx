import {ChartBarStacked} from "lucide-react";

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
} from "@/components/ui/sidebar";
import {Link} from "react-router-dom";
import {menuData} from "@/utils/const";

// Menu items.
// This is sample data.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem className="flex items-center justify-between gap-2 m-0  ">
          <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <ChartBarStacked className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none mr-auto">
            <span className="font-semibold">InstaData</span>
            <span className="text-xs text-foreground/50 ">v{menuData.versions}</span>
          </div>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuData.navMain.map((group, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={item.state ? "" : `pointer-events-none opacity-50`}
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

      <SidebarFooter className="border-t-1">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center justify-between ">Plástico Carmen</div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  );
}
