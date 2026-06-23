"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  Settings,
  Users,
  Briefcase,
  CreditCard,
  Package,
  Laptop,
  LifeBuoy,
  LayoutDashboard,
  LogOut,
  ChevronUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "CRM", url: "/crm", icon: Users },
  { title: "HRM", url: "/hrm", icon: Briefcase },
  { title: "Projects", url: "/projects", icon: Calendar },
  { title: "Finance", url: "/finance", icon: CreditCard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Assets", url: "/assets", icon: Laptop },
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Reports", url: "/reports", icon: BarChart3 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40 bg-sidebar/50 backdrop-blur-xl">
      <SidebarHeader className="flex items-center justify-center h-16 border-b border-border/30 px-4">
        <div className="flex items-center gap-3 font-bold text-lg tracking-tight w-full truncate">
          <div className="relative flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/20">
            <div className="flex size-full items-center justify-center rounded-[10px] bg-background text-foreground text-sm font-black">
              Ω
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600/30 to-cyan-400/30 blur-[4px] -z-10" />
          </div>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent font-black tracking-widest text-[15px] group-data-[collapsible=icon]:hidden">
            ORQUE ONE
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60 group-data-[collapsible=icon]:hidden">
            Platform Modules
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))
                return (
                  <SidebarMenuItem key={item.title} className="px-1 py-0.5 relative">
                    <SidebarMenuButton 
                      isActive={isActive} 
                      tooltip={item.title} 
                      render={<Link href={item.url} />}
                      className={`relative z-10 font-medium transition-colors ${
                        isActive 
                          ? "text-primary-foreground dark:text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 transition-transform group-hover/menu-button:scale-110 ${
                        isActive ? "text-violet-500 dark:text-violet-400" : ""
                      }`} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-y-0.5 inset-x-1.5 bg-primary/10 dark:bg-primary/20 rounded-lg -z-0 border-l-[3px] border-primary"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/30 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start gap-2 h-12 p-2 hover:bg-sidebar-accent rounded-lg transition-all">
                  <Avatar className="h-8 w-8 rounded-lg border border-border/50">
                    <AvatarFallback className="rounded-lg bg-gradient-to-tr from-violet-600/20 to-cyan-400/20 font-bold text-xs text-primary">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold truncate max-w-[120px] leading-tight">Admin Demo</span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[120px] leading-none mt-0.5">super@orque.one</span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground/60 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px] glass-panel border-border/40 p-1">
                <DropdownMenuItem className="flex items-center gap-2 text-xs py-2 cursor-pointer focus:bg-primary/10">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-xs py-2 cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

