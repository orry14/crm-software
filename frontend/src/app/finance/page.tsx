"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, DollarSign, FileText, Plus, ArrowUpRight, ArrowDownRight, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  date: string
  category: string
}

const initialTransactions: Transaction[] = [
  { id: "1", description: "TechCorp SaaS License", amount: 4800, type: "income", date: "Jun 22", category: "SaaS Sales" },
  { id: "2", description: "Vercel Hosting Fees", amount: 1200, type: "expense", date: "Jun 20", category: "Infrastructure" },
  { id: "3", description: "Consulting Package A", amount: 15000, type: "income", date: "Jun 18", category: "Consulting" },
  { id: "4", description: "Office Lease Payment", amount: 4500, type: "expense", date: "Jun 15", category: "Rent" },
]

export default function FinancePage() {
  const [txs, setTxs] = useState<Transaction[]>(initialTransactions)
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  // Add Transaction Form state
  const [isTxOpen, setIsTxOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("income")
  const [category, setCategory] = useState("")

  // Add Invoice Form state
  const [isInvOpen, setIsInvOpen] = useState(false)
  const [client, setClient] = useState("")
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description || !amount) return

    const newTx: Transaction = {
      id: Math.random().toString(),
      description,
      amount: Number(amount),
      type,
      date: "Jun 23",
      category: category || (type === "income" ? "Sales" : "Operations"),
    }

    setTxs([newTx, ...txs])
    setDescription("")
    setAmount("")
    setCategory("")
    setIsTxOpen(false)
  }

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!client || !itemName || !itemPrice) return

    // Auto-create ledger pending transaction
    const newTx: Transaction = {
      id: Math.random().toString(),
      description: `Invoice: ${itemName} (Client: ${client})`,
      amount: Number(itemPrice),
      type: "income",
      date: "Jun 23",
      category: "Invoiced",
    }

    setTxs([newTx, ...txs])
    setClient("")
    setItemName("")
    setItemPrice("")
    setIsInvOpen(false)
  }

  const deleteTx = (id: string) => {
    setTxs(txs.filter(t => t.id !== id))
  }

  // Calculations
  const totalIncome = txs.filter(t => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0)
  const totalExpense = txs.filter(t => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0)
  const cashFlowBalance = totalIncome - totalExpense

  const filteredTxs = filter === "all" ? txs : txs.filter(t => t.type === filter)

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Finance Control & Ledgers
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Review profit margins, record company expenses, and issue client invoices.
          </p>
        </div>

        {/* Action triggers */}
        <div className="flex gap-2">
          {/* Create Invoice Dialog */}
          <Dialog open={isInvOpen} onOpenChange={setIsInvOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-9 gap-1.5 text-xs font-semibold bg-background/40 hover:bg-background/80 border-border/40 hover:border-border/70 rounded-lg">
                <FileText className="h-4 w-4" /> Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                  Generate Invoice Billing
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleGenerateInvoice} className="space-y-4 mt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Client Name</label>
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Line Item Name</label>
                  <Input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="e.g. SaaS Deployment Package"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rate (USD)</label>
                  <Input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    placeholder="e.g. 15000"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsInvOpen(false)}>Cancel</Button>
                  <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Generate</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Record Transaction Dialog */}
          <Dialog open={isTxOpen} onOpenChange={setIsTxOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
                <Plus className="h-4 w-4" /> Record Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                  Record Ledger Item
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTx} className="space-y-4 mt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Office Supplies"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Amount (USD)</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 500"
                      required
                      className="bg-background/50 border-border/40 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Transaction Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                    >
                      <option value="income">Income (+)</option>
                      <option value="expense">Expense (-)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Operations / Marketing"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsTxOpen(false)}>Cancel</Button>
                  <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Record</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cash Flow Balance Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Cash Flow Balance</span>
            <h4 className="text-2xl font-black mt-2 text-foreground">
              ${cashFlowBalance.toLocaleString()}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Available operational liquidity</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <DollarSign className="h-5 w-5" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Gross Inflow</span>
            <h4 className="text-2xl font-black mt-2 text-emerald-500">
              +${totalIncome.toLocaleString()}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Aggregate incoming assets</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Gross Outflow</span>
            <h4 className="text-2xl font-black mt-2 text-red-500">
              -${totalExpense.toLocaleString()}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Infrastructure and operations costs</p>
          </div>
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
            <ArrowDownRight className="h-5 w-5" />
          </div>
        </motion.div>
      </div>

      {/* Ledger Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">General Ledger</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Real-time ledger audit history.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex bg-secondary/80 border border-border/40 p-0.5 rounded-lg text-xs max-w-fit">
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-md transition-colors ${
                  filter === f 
                    ? "bg-background text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger table */}
        <div className="rounded-2xl border border-border/30 overflow-hidden glass-panel">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30">
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="p-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredTxs.map((tx) => (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3 text-xs font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        {tx.type === "income" ? (
                          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 shrink-0">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        ) : (
                          <div className="p-1 rounded-md bg-red-500/10 text-red-500 shrink-0">
                            <ArrowDownRight className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <span>{tx.description}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[9px] font-semibold border-border/50 bg-secondary/30">
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="p-3 text-[11px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {tx.date}
                      </span>
                    </td>
                    <td className={`p-3 text-xs font-black ${tx.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                      {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => deleteTx(tx.id)}
                        className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredTxs.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                    No transactions match this type.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

