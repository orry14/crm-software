"use client"

import { Sparkles, TrendingUp, AlertCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card rounded-2xl p-6 border-violet-500/20 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent hover:border-violet-500/30 transition-colors flex flex-col relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[30px] pointer-events-none" />
      
      <div className="flex items-center gap-2 text-primary font-bold pb-4 border-b border-border/30">
        <Sparkles className="h-5 w-5 animate-pulse" />
        <h3 className="text-sm tracking-tight text-glow">AI Copilot Insights</h3>
      </div>
      
      <div className="mt-4 space-y-4 flex-1">
        <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="rounded-xl bg-emerald-500/10 p-2 mt-0.5 border border-emerald-500/20">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-foreground">Revenue Growth Predicted</p>
            <p className="text-muted-foreground mt-0.5 leading-relaxed">Expected to increase by 12% next quarter based on current pipeline velocity and conversion velocity.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="rounded-xl bg-amber-500/10 p-2 mt-0.5 border border-amber-500/20">
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-foreground">Project Risk Detected</p>
            <p className="text-muted-foreground mt-0.5 leading-relaxed">The 'Acme Corp Redesign' project is trending behind schedule. Action advised.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/30">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            const btn = document.querySelector('button[class*="glow-violet"]') as HTMLButtonElement
            btn?.click()
          }}
          className="w-full justify-between h-8 text-[11px] font-semibold text-primary hover:text-primary-foreground focus:text-primary-foreground hover:bg-primary/20 rounded-lg group"
        >
          <span>Ask Copilot for recommendations</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
}

