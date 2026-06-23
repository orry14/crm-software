"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Calendar,
  CreditCard,
  Settings,
  User,
  Users,
  Briefcase,
  Package,
  Laptop,
  LifeBuoy,
  BarChart3,
  LayoutDashboard,
  Moon,
  Sun,
  Bot,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandPalette() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search modules..." />
      <CommandList className="glass-panel border-none">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate Modules">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-violet-500" />
            <span>Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/crm"))}>
            <Users className="mr-2 h-4 w-4 text-violet-500" />
            <span>CRM Pipeline</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/hrm"))}>
            <Briefcase className="mr-2 h-4 w-4 text-violet-500" />
            <span>HRM Directory</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
            <Calendar className="mr-2 h-4 w-4 text-violet-500" />
            <span>Projects & Milestones</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
            <CreditCard className="mr-2 h-4 w-4 text-violet-500" />
            <span>Finance & Ledger</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/inventory"))}>
            <Package className="mr-2 h-4 w-4 text-violet-500" />
            <span>Inventory Catalog</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/assets"))}>
            <Laptop className="mr-2 h-4 w-4 text-violet-500" />
            <span>Asset Allocations</span>
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/support"))}>
            <LifeBuoy className="mr-2 h-4 w-4 text-violet-500" />
            <span>Support Tickets</span>
            <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/reports"))}>
            <BarChart3 className="mr-2 h-4 w-4 text-violet-500" />
            <span>Custom Reports Studio</span>
            <CommandShortcut>⌘R</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="bg-border/30" />
        
        <CommandGroup heading="System Commands">
          <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="mr-2 h-4 w-4 text-blue-500" />
            )}
            <span>Switch Color Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {
            // Emulate clicking on the Ask Copilot button
            const btn = document.querySelector('button[class*="glow-violet"]') as HTMLButtonElement
            btn?.click()
          })}>
            <Bot className="mr-2 h-4 w-4 text-primary" />
            <span>Trigger AI Copilot Chat</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
