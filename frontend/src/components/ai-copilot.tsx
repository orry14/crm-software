"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send, X, Bot, Trash2, ArrowUpRight, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface Message {
  id: string
  sender: "user" | "copilot"
  text: string
  timestamp: Date
  widgetType?: "forecast" | "crm-risks" | "general"
}

const mockForecastData = [
  { name: "Q1", revenue: 45000, target: 40000 },
  { name: "Q2", revenue: 52000, target: 48000 },
  { name: "Q3 (Est)", revenue: 64000, target: 55000 },
  { name: "Q4 (Est)", revenue: 78000, target: 65000 },
]

export function AICopilot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: "Hello! I am Orque AI Copilot. How can I assist you with your CRM and ERP operations today? Try one of the quick commands below:",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate smart agent response after 1.2s
    setTimeout(() => {
      let responseText = ""
      let widgetType: "forecast" | "crm-risks" | "general" | undefined

      const query = textToSend.toLowerCase()
      if (query.includes("forecast") || query.includes("revenue") || query.includes("q3")) {
        responseText = "Based on current pipeline velocity and asset allocations, here is the Q3/Q4 financial forecast. We project a 14.5% over-performance on original targets."
        widgetType = "forecast"
      } else if (query.includes("risk") || query.includes("pipeline") || query.includes("crm")) {
        responseText = "I've detected 2 critical risks in your active CRM Pipeline requiring immediate review:"
        widgetType = "crm-risks"
      } else {
        responseText = `I've analyzed your query: "${textToSend}". I can manage ledger balances, list employees, check stock levels in Inventory, or analyze support ticket loads. Let me know which task you would like to run.`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "copilot",
          text: responseText,
          timestamp: new Date(),
          widgetType,
        },
      ])
      setIsTyping(false)
    }, 1200)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "copilot",
        text: "Chat cleared. What can I analyze for you now?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-sidebar/90 border-l border-border/40 backdrop-blur-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30 bg-sidebar/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary glow-violet">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Orque AI Copilot</h3>
                  <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={clearChat} title="Clear history">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Message Pane */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "copilot" && (
                      <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <div
                        className={`rounded-2xl p-3 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground font-medium rounded-tr-none shadow-md shadow-primary/10"
                            : "glass-card rounded-tl-none text-foreground"
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Custom Widgets */}
                        {msg.widgetType === "forecast" && (
                          <div className="mt-3 p-2 bg-black/20 rounded-xl border border-border/30 h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={mockForecastData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" fontSize={9} tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
                                <YAxis fontSize={9} tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "rgba(10,10,10,0.9)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    fontSize: "10px",
                                  }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#a78bfa" fill="url(#violetGlow)" strokeWidth={2} />
                                <defs>
                                  <linearGradient id="violetGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {msg.widgetType === "crm-risks" && (
                          <div className="mt-3 space-y-2">
                            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                              <div className="text-xs">
                                <p className="font-bold text-red-200">Acme Redesign Delayed</p>
                                <p className="text-muted-foreground mt-0.5">Milestone 2 is 4 days overdue. Client contact: John Doe.</p>
                                <Button size="sm" variant="outline" className="h-6 mt-1.5 text-[10px] border-red-500/30 text-red-200 hover:bg-red-500/20 gap-1">
                                  Email John <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2">
                              <TrendingUp className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                              <div className="text-xs">
                                <p className="font-bold text-amber-200">Contract Negotiation Stalled</p>
                                <p className="text-muted-foreground mt-0.5">Stripe Integration deal has had no active updates in 7 days.</p>
                                <Button size="sm" variant="outline" className="h-6 mt-1.5 text-[10px] border-amber-500/30 text-amber-200 hover:bg-amber-500/20 gap-1">
                                  Assign Agent <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground/60 px-1 self-start">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {msg.sender === "user" && (
                      <div className="h-7 w-7 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-bold text-[10px]">
                        ME
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="glass-card rounded-2xl rounded-tl-none p-3 max-w-[80%] flex items-center gap-1">
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions List */}
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-border/20 bg-sidebar/30">
              <button
                type="button"
                onClick={() => handleSend("Generate Q3 financial forecast")}
                className="text-[10px] bg-secondary/80 hover:bg-secondary border border-border/40 text-foreground px-2 py-1 rounded-full font-medium transition-colors"
              >
                📊 Financial Forecast
              </button>
              <button
                type="button"
                onClick={() => handleSend("Scan CRM pipeline risks")}
                className="text-[10px] bg-secondary/80 hover:bg-secondary border border-border/40 text-foreground px-2 py-1 rounded-full font-medium transition-colors"
              >
                ⚠️ CRM Pipeline Risks
              </button>
              <button
                type="button"
                onClick={() => handleSend("Check general status")}
                className="text-[10px] bg-secondary/80 hover:bg-secondary border border-border/40 text-foreground px-2 py-1 rounded-full font-medium transition-colors"
              >
                🤖 System Status
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(input)
              }}
              className="p-4 border-t border-border/30 bg-sidebar/50 flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Copilot something..."
                className="flex-1 bg-background/50 border-border/50 text-xs h-9 rounded-lg"
              />
              <Button type="submit" size="icon" className="h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
