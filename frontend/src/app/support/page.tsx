"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LifeBuoy, Plus, MessageSquare, Search, Send, Clock, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Reply {
  sender: "customer" | "agent"
  text: string
  time: string
}

interface Ticket {
  id: string
  subject: string
  customer: string
  priority: "High" | "Medium" | "Low"
  status: "Open" | "Pending" | "Solved"
  category: string
  thread: Reply[]
}

const initialTickets: Ticket[] = [
  {
    id: "1",
    subject: "API Authentication failing on stripe webhooks",
    customer: "RetailCo Dev Team",
    priority: "High",
    status: "Open",
    category: "Integrations",
    thread: [
      { sender: "customer", text: "We are receiving 401 Unauthorized errors when validating Stripe endpoints. Here is our secret verification config...", time: "2 hours ago" },
      { sender: "agent", text: "Please confirm if you have copied the correct webhook signing key from the Stripe dashboard. It usually starts with whsec_.", time: "1 hour ago" },
    ],
  },
  {
    id: "2",
    subject: "MacBook Pro keyboard keys unresponsive",
    customer: "Jim Halpert",
    priority: "Medium",
    status: "Pending",
    category: "Hardware",
    thread: [
      { sender: "customer", text: "The spacebar and backspace keys are getting stuck. Need a replacement or keyboard cleaning.", time: "Yesterday" },
    ],
  },
]

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [selectedId, setSelectedId] = useState("1")
  const [search, setSearch] = useState("")

  // New Ticket Form state
  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState("")
  const [customer, setCustomer] = useState("")
  const [priority, setPriority] = useState<Ticket["priority"]>("Medium")
  const [category, setCategory] = useState("Software")
  const [initialMsg, setInitialMsg] = useState("")

  // Reply Input state
  const [replyText, setReplyText] = useState("")

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !customer || !initialMsg) return

    const newTicket: Ticket = {
      id: Math.random().toString(),
      subject,
      customer,
      priority,
      status: "Open",
      category,
      thread: [
        { sender: "customer", text: initialMsg, time: "Just now" },
      ],
    }

    setTickets([...tickets, newTicket])
    setSelectedId(newTicket.id)
    setSubject("")
    setCustomer("")
    setCategory("Software")
    setInitialMsg("")
    setIsOpen(false)
  }

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    setTickets(
      tickets.map((t) => {
        if (t.id === selectedId) {
          return {
            ...t,
            status: "Pending" as const,
            thread: [
              ...t.thread,
              { sender: "agent", text: replyText, time: "Just now" },
            ],
          }
        }
        return t
      })
    )
    setReplyText("")
  }

  const handleResolveTicket = (id: string) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, status: "Solved" as const } : t))
    )
  }

  const activeTicket = tickets.find((t) => t.id === selectedId) || tickets[0]
  const filteredTickets = tickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 h-full flex flex-col relative min-h-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Support Ticketing Studio
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Monitor client escalations, assign issue priority, and answer tickets in real-time.
          </p>
        </div>

        {/* Add Ticket Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                File Support Ticket
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subject Headline</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Server Latency Spikes"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Customer / Employee</label>
                  <Input
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Hardware / Cloud"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority Rating</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Request Description</label>
                <Textarea
                  value={initialMsg}
                  onChange={(e) => setInitialMsg(e.target.value)}
                  placeholder="Explain the problem detail..."
                  required
                  className="bg-background/50 border-border/40 text-xs h-20 resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Open Ticket</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Split Workstation layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Left Side: Ticket Queue */}
        <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 h-full min-h-0 bg-secondary/15 border border-border/30 rounded-2xl p-3 glass-panel">
          <div className="relative shrink-0">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subject..."
              className="pl-8 h-8 text-[11px] bg-background/45 border-border/40 rounded-lg"
            />
          </div>

          {/* List Scroll */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {filteredTickets.map((t) => {
              const isSelected = t.id === selectedId
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-primary/10 border-primary shadow-sm" 
                      : "bg-background/25 border-border/30 hover:border-border/70"
                  }`}
                >
                  <div className="flex justify-between items-center gap-1">
                    <Badge variant="outline" className="text-[8px] border-border/50 bg-secondary/40 font-bold uppercase truncate max-w-[100px]">
                      {t.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-[8px] uppercase font-bold tracking-wider ${
                        t.priority === "High" 
                          ? "border-red-500/20 bg-red-500/10 text-red-400" 
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {t.priority}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-2 leading-snug line-clamp-2">{t.subject}</h4>
                  <div className="flex items-center justify-between mt-3 text-[9px] text-muted-foreground font-semibold">
                    <span className="truncate max-w-[110px]">{t.customer}</span>
                    <span className={`px-1.5 py-0.5 rounded-md ${
                      t.status === "Open" 
                        ? "bg-red-500/10 text-red-400" 
                        : t.status === "Pending" 
                        ? "bg-amber-500/10 text-amber-400" 
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              )
            })}
            {filteredTickets.length === 0 && (
              <div className="text-center py-6 text-xs text-muted-foreground">
                No tickets in queue.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversation Viewer */}
        <div className="flex-1 flex flex-col h-full min-h-0 bg-secondary/10 border border-border/30 rounded-2xl glass-panel relative overflow-hidden">
          {activeTicket ? (
            <>
              {/* Top status bar */}
              <div className="p-4 border-b border-border/30 bg-background/25 flex items-center justify-between shrink-0">
                <div className="min-w-0 pr-4">
                  <h3 className="text-sm font-bold text-foreground truncate">{activeTicket.subject}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium flex items-center gap-1.5">
                    <User className="h-3 w-3" /> {activeTicket.customer}
                  </p>
                </div>

                {activeTicket.status !== "Solved" && (
                  <Button 
                    size="sm"
                    onClick={() => handleResolveTicket(activeTicket.id)}
                    className="h-7 text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md shrink-0 shadow-sm"
                  >
                    Mark Solved
                  </Button>
                )}
              </div>

              {/* Thread messages list */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                {activeTicket.thread.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "customer" && (
                      <div className="h-7 w-7 rounded-lg bg-secondary border border-border/50 flex items-center justify-center shrink-0 font-bold text-[10px] text-muted-foreground mt-0.5">
                        CU
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                        msg.sender === "agent"
                          ? "bg-primary text-primary-foreground font-medium rounded-tr-none shadow-md shadow-primary/10"
                          : "glass-card rounded-tl-none border-border/40 text-foreground"
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-muted-foreground/60 px-1 self-start">{msg.time}</span>
                    </div>
                    {msg.sender === "agent" && (
                      <div className="h-7 w-7 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 shadow-sm">
                        AD
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Reply submission bar */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-border/30 bg-background/25 flex gap-2 shrink-0">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an email response to client..."
                  disabled={activeTicket.status === "Solved"}
                  className="flex-1 bg-background/50 border-border/50 text-xs h-9 rounded-lg"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={activeTicket.status === "Solved"}
                  className="h-9 w-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <h4 className="text-xs font-bold text-foreground">No Ticket Selected</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Please click on a queue item to read history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

