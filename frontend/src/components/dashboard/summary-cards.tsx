"use client"

import { DollarSign, Users, Briefcase, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface SummaryCardsProps {
  timeframe: "today" | "week" | "month" | "year"
}

const dataByTimeframe = {
  today: [
    { title: "Total Revenue", value: "$2,431.10", change: "+1.2%", positive: true, icon: DollarSign },
    { title: "Active Projects", value: "12", change: "Same", positive: true, icon: Briefcase },
    { title: "New Leads", value: "14", change: "+40.2%", positive: true, icon: Users },
    { title: "Conversion Rate", value: "25.8%", change: "+2.1%", positive: true, icon: TrendingUp },
  ],
  week: [
    { title: "Total Revenue", value: "$12,890.45", change: "+4.8%", positive: true, icon: DollarSign },
    { title: "Active Projects", value: "12", change: "+1 this week", positive: true, icon: Briefcase },
    { title: "New Leads", value: "88", change: "+18.4%", positive: true, icon: Users },
    { title: "Conversion Rate", value: "24.5%", change: "+1.2%", positive: true, icon: TrendingUp },
  ],
  month: [
    { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", positive: true, icon: DollarSign },
    { title: "Active Projects", value: "12", change: "+3 this month", positive: true, icon: Briefcase },
    { title: "New Leads", value: "340", change: "+12.5%", positive: true, icon: Users },
    { title: "Conversion Rate", value: "24.3%", change: "+4.1%", positive: true, icon: TrendingUp },
  ],
  year: [
    { title: "Total Revenue", value: "$524,098.34", change: "+34.2%", positive: true, icon: DollarSign },
    { title: "Active Projects", value: "15", change: "+8 this year", positive: true, icon: Briefcase },
    { title: "New Leads", value: "3,890", change: "+28.7%", positive: true, icon: Users },
    { title: "Conversion Rate", value: "26.1%", change: "+5.4%", positive: true, icon: TrendingUp },
  ],
}

export function SummaryCards({ timeframe }: SummaryCardsProps) {
  const currentData = dataByTimeframe[timeframe]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {currentData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/30 transition-all cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
              {item.title}
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary glow-violet">
              <item.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <motion.div 
              key={item.value} 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {item.value}
            </motion.div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5 font-medium">
              <span className={`px-1.5 py-0.5 rounded-md ${
                item.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              }`}>
                {item.change}
              </span>
              <span>vs previous period</span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

