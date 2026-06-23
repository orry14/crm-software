"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: "Sarah Chen",
    fallback: "SC",
    action: "generated a new lead",
    target: "TechCorp Inc.",
    time: "2 mins ago",
    category: "crm",
  },
  {
    id: 2,
    user: "Michael Scott",
    fallback: "MS",
    action: "approved employee invoice",
    target: "#INV-2023-001",
    time: "15 mins ago",
    category: "finance",
  },
  {
    id: 3,
    user: "Jim Halpert",
    fallback: "JH",
    action: "allocated server resources to project",
    target: "Acme Corp Redesign",
    time: "1 hour ago",
    category: "projects",
  },
  {
    id: 4,
    user: "Pam Beesly",
    fallback: "PB",
    action: "resolved critical support ticket",
    target: "Database latency peak",
    time: "2 hours ago",
    category: "support",
  },
]

export function ActivityFeed() {
  const [filter, setFilter] = React.useState<"all" | "crm" | "finance" | "projects" | "support">("all")

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(act => act.category === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card rounded-2xl p-6 hover:border-violet-500/10 transition-colors flex flex-col"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Live Activity Feed</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time actions across modules.</p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-1 bg-background/50 border border-border/40 p-0.5 rounded-lg max-w-fit">
          {(["all", "crm", "finance", "projects", "support"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-colors ${
                filter === cat 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex-1">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-muted/30 transition-colors"
              >
                <Avatar className="h-9 w-9 bg-primary/10 border border-primary/20 shrink-0">
                  <AvatarFallback className="font-semibold text-primary text-xs bg-gradient-to-tr from-violet-600/20 to-cyan-400/20">
                    {activity.fallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="text-xs font-semibold leading-none truncate">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    {activity.action}{" "}
                    <span className="font-medium text-foreground">{activity.target}</span>
                  </p>
                </div>
                <div className="ml-auto text-[9px] text-muted-foreground/60 shrink-0 whitespace-nowrap">
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-xs text-muted-foreground">
              No recent updates in this category.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

