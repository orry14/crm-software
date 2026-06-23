"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Phone, MapPin, Building, Clock, DollarSign } from "lucide-react"

interface Lead {
  id: string
  content: string
  value: string
  company: string
  date: string
}

export function LeadDetail({ children, lead }: { children: React.ReactNode; lead: Lead }) {
  return (
    <Sheet>
      <SheetTrigger render={children as React.ReactElement} />
      <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-md overflow-y-auto glass-panel border-border/40 text-foreground">
        <SheetHeader className="text-left mb-6">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-400">
              CRM Opportunity
            </Badge>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3 text-violet-400" /> Active recently
            </span>
          </div>
          <SheetTitle className="text-xl font-extrabold tracking-tight mt-4 text-foreground">
            {lead.content}
          </SheetTitle>
          <SheetDescription className="space-y-1.5 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-foreground font-medium">
              <Building className="w-3.5 h-3.5 text-muted-foreground" /> {lead.company}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Global Account (US East)
            </span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
              Contact Information
            </h4>
            <div className="grid gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/40 border border-border/40">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                <span>contact@{lead.company.toLowerCase().replace(/\s+/g, "")}.com</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/40 border border-border/40">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                <span>+1 (555) 091-2489</span>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
              Value & Target
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/40 p-3 rounded-xl border border-border/40">
                <p className="text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Estimated Revenue</p>
                <p className="text-base font-black flex items-center text-foreground">
                  <DollarSign className="w-4 h-4 text-violet-400 -mr-0.5" />
                  {lead.value.replace("$", "")}
                </p>
              </div>
              <div className="bg-background/40 p-3 rounded-xl border border-border/40">
                <p className="text-[10px] text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Estimated Close</p>
                <p className="text-sm font-bold flex items-center gap-1.5 text-foreground mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" /> {lead.date}
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-border/30" />

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
              Activity History
            </h4>
            <div className="relative pl-4 border-l border-border/60 space-y-6">
              <div className="relative">
                <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-violet-500 ring-4 ring-violet-500/10 mt-1" />
                <p className="text-xs font-bold text-foreground">Proposal Draft Generated</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                  Copilot drafted contract specs for {lead.company}.
                </p>
                <p className="text-[9px] text-muted-foreground/60 mt-1">Today, 2:14 PM</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] w-2 h-2 rounded-full bg-border border border-muted-foreground/50 mt-1.5" />
                <p className="text-xs font-bold text-foreground">Discovery Call Scheduled</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                  Initial discovery call conducted with tech leads.
                </p>
                <p className="text-[9px] text-muted-foreground/60 mt-1">June 18, 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

