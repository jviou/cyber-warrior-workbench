import { NavLink } from "react-router-dom";
import { 
  Home, 
  Shield, 
  ClipboardList, 
  ScrollText, 
  CheckSquare, 
  MessageSquare, 
  BarChart3, 
  FileText,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Phase 1", url: "/phase/P1", icon: Shield },
  { title: "Phase 2", url: "/phase/P2", icon: Shield },
  { title: "Phase 3", url: "/phase/P3", icon: Shield },
  { title: "Phase 4", url: "/phase/P4", icon: Shield },
  { title: "Journal", url: "/journal", icon: ScrollText },
  { title: "Actions", url: "/actions", icon: CheckSquare },
  { title: "Décisions", url: "/decisions", icon: ClipboardList },
  { title: "Communications", url: "/communications", icon: MessageSquare },
  { title: "Indicateurs", url: "/indicators", icon: BarChart3 },
  { title: "Ressources", url: "/resources", icon: FileText },
];

export function CrisisSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="sidebar-scroll">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            <Users className="mr-2 h-4 w-4" />
            Gestion de Crise
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                          isActive
                            ? "bg-muted text-primary font-medium"
                            : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}