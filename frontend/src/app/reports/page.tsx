"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Download, PieChart, Sparkles, SlidersHorizontal, RefreshCw, BarChart, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, Bar, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

type Metric = "revenue" | "tickets" | "employees" | "stock"
type Dimension = "weekly" | "monthly"
type ChartType = "area" | "bar" | "line"

const mockData = {
  revenue: {
    weekly: [
      { name: "Week 1", value: 12000 },
      { name: "Week 2", value: 18500 },
      { name: "Week 3", value: 15100 },
      { name: "Week 4", value: 24000 },
    ],
    monthly: [
      { name: "Jan", value: 45000 },
      { name: "Feb", value: 52000 },
      { name: "Mar", value: 68000 },
      { name: "Apr", value: 59000 },
      { name: "May", value: 84000 },
    ],
  },
  tickets: {
    weekly: [
      { name: "Week 1", value: 42 },
      { name: "Week 2", value: 28 },
      { name: "Week 3", value: 56 },
      { name: "Week 4", value: 31 },
    ],
    monthly: [
      { name: "Jan", value: 145 },
      { name: "Feb", value: 120 },
      { name: "Mar", value: 180 },
      { name: "Apr", value: 98 },
      { name: "May", value: 110 },
    ],
  },
  employees: {
    weekly: [
      { name: "Week 1", value: 1 },
      { name: "Week 2", value: 0 },
      { name: "Week 3", value: 2 },
      { name: "Week 4", value: 1 },
    ],
    monthly: [
      { name: "Jan", value: 4 },
      { name: "Feb", value: 2 },
      { name: "Mar", value: 8 },
      { name: "Apr", value: 3 },
      { name: "May", value: 1 },
    ],
  },
  stock: {
    weekly: [
      { name: "Week 1", value: 480 },
      { name: "Week 2", value: 420 },
      { name: "Week 3", value: 390 },
      { name: "Week 4", value: 540 },
    ],
    monthly: [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1050 },
      { name: "Mar", value: 980 },
      { name: "Apr", value: 1120 },
      { name: "May", value: 1350 },
    ],
  },
}

export default function ReportsPage() {
  const [metric, setMetric] = useState<Metric>("revenue")
  const [dimension, setDimension] = useState<Dimension>("monthly")
  const [chartType, setChartType] = useState<ChartType>("area")
  
  const [isLoading, setIsLoading] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  const handleGenerate = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 850)
  }

  const handleExport = () => {
    setExportSuccess(true)
    setTimeout(() => {
      setExportSuccess(false)
    }, 2500)
  }

  const data = mockData[metric][dimension]

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative h-full flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Custom Analytics Studio
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Configure custom reporting parameters, generate BI diagrams, and compile CSV files.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Export Action */}
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="h-9 gap-1.5 text-xs font-semibold bg-background/40 hover:bg-background/80 border-border/40 hover:border-border/70 rounded-lg"
          >
            <Download className="h-4 w-4" /> Export CSV Report
          </Button>
        </div>
      </div>

      {/* Export notification alert */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-between shrink-0 shadow-sm"
          >
            <span>✓ Audit CSV file generated. Check your local downloads directory.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 grid gap-6 lg:grid-cols-4 min-h-0">
        {/* Left Side: BI Configurator */}
        <div className="lg:col-span-1 bg-secondary/15 border border-border/30 rounded-2xl p-5 glass-panel flex flex-col gap-5 shrink-0">
          <div className="flex items-center gap-1.5 pb-3 border-b border-border/30 text-foreground font-bold">
            <SlidersHorizontal className="h-4 w-4 text-violet-400" />
            <h3 className="text-xs uppercase tracking-wider">Report Configurator</h3>
          </div>

          <div className="space-y-4 flex-1">
            {/* Metric select */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select BI Metric</label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as Metric)}
                className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
              >
                <option value="revenue">Gross Income (USD)</option>
                <option value="tickets">Support Tickets Load</option>
                <option value="employees">Staff Onboarding Count</option>
                <option value="stock">Inventory SKU Volumes</option>
              </select>
            </div>

            {/* Dimension select */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Aggregation Dimension</label>
              <select
                value={dimension}
                onChange={(e) => setDimension(e.target.value as Dimension)}
                className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
              >
                <option value="weekly">Weekly Intervals</option>
                <option value="monthly">Monthly Intervals</option>
              </select>
            </div>

            {/* Chart Type select */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Visual Layout</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
              >
                <option value="area">Area Plot</option>
                <option value="bar">Bar Chart</option>
                <option value="line">Line Graph</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={handleGenerate}
            className="w-full h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10 mt-auto"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> Generate Diagram
          </Button>
        </div>

        {/* Right Side: BI Screen Viewer */}
        <div className="lg:col-span-3 bg-secondary/10 border border-border/30 rounded-2xl glass-panel p-6 flex flex-col min-h-[300px]">
          <div className="pb-4 border-b border-border/30 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-sm font-bold text-foreground capitalize">
                {metric} Report ({dimension})
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Custom layout: {chartType} chart format.</p>
            </div>
            
            <Badge variant="outline" className="border-violet-500/30 bg-violet-500/10 text-violet-400 font-bold uppercase tracking-wider text-[8px] gap-1">
              <Sparkles className="h-3 w-3" /> Live BI Compilation
            </Badge>
          </div>

          {/* Chart Display Area */}
          <div className="flex-1 flex items-center justify-center mt-6 min-h-0">
            {isLoading ? (
              <div className="w-full h-[280px] space-y-4">
                <Skeleton className="h-[20px] w-[60%]" />
                <Skeleton className="h-[200px] w-full" />
                <div className="flex gap-2 justify-between">
                  <Skeleton className="h-[15px] w-[10%]" />
                  <Skeleton className="h-[15px] w-[10%]" />
                  <Skeleton className="h-[15px] w-[10%]" />
                </div>
              </div>
            ) : (
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "area" ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 10, 15, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "10px",
                          fontSize: "10px",
                          color: "#fff",
                        }}
                      />
                      <Area type="monotone" dataKey="value" stroke="oklch(0.62 0.22 285)" fill="url(#colorValue)" strokeWidth={2.5} />
                    </AreaChart>
                  ) : chartType === "bar" ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 10, 15, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "10px",
                          fontSize: "10px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="value" fill="oklch(0.62 0.22 285)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                    </AreaChart>
                  ) : (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255, 255, 255, 0.4)" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 10, 15, 0.95)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "10px",
                          fontSize: "10px",
                          color: "#fff",
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="oklch(0.62 0.22 285)" strokeWidth={3} dot={{ stroke: "oklch(0.62 0.22 285)", strokeWidth: 2, r: 4 }} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

