"use client"

import * as React from "react"
import { Search, Bell, Sparkles, Sun, Moon, AlertCircle, Info } from "lucide-react"
import { useTheme } from "next-themes"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CommandPalette } from "@/components/command-palette"
import { AICopilot } from "@/components/ai-copilot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const [isCopilotOpen, setIsCopilotOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border/40 bg-background/50 backdrop-blur-xl px-6">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
      
      {/* Search Input Button */}
      <div className="w-full flex-1 max-w-xs sm:max-w-sm md:max-w-md">
        <Button
          variant="outline"
          className="relative h-9 w-full justify-start rounded-lg bg-background/40 hover:bg-background/80 text-xs font-normal text-muted-foreground border-border/40 hover:border-border/70 shadow-none"
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "k",
                ctrlKey: true,
              })
            );
          }}
        >
          <Search className="mr-2 h-3.5 w-3.5" />
          <span>Search command menu...</span>
          <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-4 select-none items-center gap-0.5 rounded border bg-muted/40 px-1.5 font-mono text-[9px] font-medium opacity-100 sm:flex">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </Button>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Orque AI Copilot Trigger */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCopilotOpen(true)}
          className="h-9 gap-1.5 text-xs font-semibold bg-violet-500/10 hover:bg-violet-500/20 text-violet-500 dark:text-violet-400 hover:text-violet-600 rounded-lg px-3 transition-all glow-violet border border-violet-500/20"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="hidden sm:inline">Ask Copilot</span>
        </Button>

        {/* Light/Dark Mode Switcher */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground border border-border/20 bg-background/25 hover:bg-background/80"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-lg relative text-muted-foreground hover:text-foreground border border-border/20 bg-background/25 hover:bg-background/80"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] glass-panel border-border/40 p-2">
            <DropdownMenuLabel className="text-xs font-bold px-2 py-1">Recent Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/30" />
            
            <div className="space-y-1 py-1">
              <DropdownMenuItem className="flex gap-2.5 items-start p-2 cursor-pointer focus:bg-primary/5 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-snug">
                  <p className="font-semibold">Pipeline Alert</p>
                  <p className="text-muted-foreground mt-0.5">Project 'Acme Corp' is trending behind schedule.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2.5 items-start p-2 cursor-pointer focus:bg-primary/5 rounded-md">
                <Info className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-snug">
                  <p className="font-semibold">AI Prediction</p>
                  <p className="text-muted-foreground mt-0.5">Financial trends indicate a 12% revenue growth in Q3.</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="h-9 w-9 rounded-lg border bg-primary/10 border-border/40">
          <AvatarFallback className="rounded-lg font-bold text-xs bg-gradient-to-tr from-violet-600/20 to-cyan-400/20 text-primary">
            AD
          </AvatarFallback>
        </Avatar>
      </div>

      <CommandPalette />
      <AICopilot isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </header>
  )
}
