"use client"

import * as React from "react"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { Sparkles, CalendarRange } from "lucide-react"

export default function DashboardPage() {
  const [timeframe, setTimeframe] = React.useState<"today" | "week" | "month" | "year">("month")

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      
      {/* Top dashboard panel bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Executive Control Board
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Orque One intelligent multi-company dashboard.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Timeframe selector tabs */}
          <div className="flex bg-secondary/80 border border-border/40 p-0.5 rounded-xl text-xs">
            {(["today", "week", "month", "year"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 font-bold uppercase tracking-wider rounded-lg transition-colors ${
                  timeframe === t 
                    ? "bg-background text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/40 bg-secondary/20 text-xs font-semibold text-muted-foreground select-none">
            <CalendarRange className="h-3.5 w-3.5" />
            <span>June 2026</span>
          </div>
        </div>
      </div>
      
      {/* Cards summary block */}
      <SummaryCards timeframe={timeframe} />
      
      {/* Mid charts & logs block */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RevenueChart timeframe={timeframe} />
        <div className="space-y-6 col-span-1">
          <AIInsights />
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}

