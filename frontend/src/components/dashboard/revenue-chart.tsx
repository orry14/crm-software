"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { motion } from "framer-motion"

interface RevenueChartProps {
  timeframe: "today" | "week" | "month" | "year"
}

const chartDataByTimeframe = {
  today: [
    { name: "09:00", revenue: 120, target: 100 },
    { name: "11:00", revenue: 380, target: 300 },
    { name: "13:00", revenue: 850, target: 600 },
    { name: "15:00", revenue: 1400, target: 1000 },
    { name: "17:00", revenue: 2100, target: 1600 },
    { name: "19:00", revenue: 2431, target: 2000 },
  ],
  week: [
    { name: "Mon", revenue: 1500, target: 1200 },
    { name: "Tue", revenue: 2300, target: 2000 },
    { name: "Wed", revenue: 1800, target: 1700 },
    { name: "Thu", revenue: 2900, target: 2400 },
    { name: "Fri", revenue: 3200, target: 3000 },
    { name: "Sat", revenue: 1100, target: 1000 },
    { name: "Sun", revenue: 800, target: 700 },
  ],
  month: [
    { name: "Jan", revenue: 12000, target: 10000 },
    { name: "Feb", revenue: 21000, target: 18000 },
    { name: "Mar", revenue: 18000, target: 19000 },
    { name: "Apr", revenue: 24000, target: 22000 },
    { name: "May", revenue: 29000, target: 25000 },
    { name: "Jun", revenue: 32000, target: 28000 },
    { name: "Jul", revenue: 38000, target: 32000 },
    { name: "Aug", revenue: 42000, target: 35000 },
    { name: "Sep", revenue: 39000, target: 38000 },
    { name: "Oct", revenue: 48000, target: 40000 },
    { name: "Nov", revenue: 51000, target: 45000 },
    { name: "Dec", revenue: 58000, target: 50000 },
  ],
  year: [
    { name: "2021", revenue: 145000, target: 120000 },
    { name: "2022", revenue: 220000, target: 180000 },
    { name: "2023", revenue: 310000, target: 250000 },
    { name: "2024", revenue: 420000, target: 350000 },
    { name: "2025", revenue: 524098, target: 480000 },
  ],
}

export function RevenueChart({ timeframe }: RevenueChartProps) {
  const data = chartDataByTimeframe[timeframe]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-2xl p-6 col-span-1 lg:col-span-2 hover:border-violet-500/10 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Revenue Trends</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Track financial progress and target baselines.</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="oklch(0.62 0.22 285)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255, 255, 255, 0.4)" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.4)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 10, 15, 0.95)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="oklch(0.62 0.22 285)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="oklch(0.72 0.16 200)" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorTarget)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

