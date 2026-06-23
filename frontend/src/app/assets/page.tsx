"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Laptop, Plus, ShieldCheck, Search, Users, Settings, Wrench, CheckCircle } from "lucide-react"
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

interface Asset {
  id: string
  name: string
  tag: string
  type: string
  assignedTo: string
  value: number
  status: "Allocated" | "Available" | "Maintenance"
}

const initialAssets: Asset[] = [
  { id: "1", name: "Apple MacBook Pro 16\"", tag: "AST-2026-001", type: "Laptop", assignedTo: "Sarah Chen", value: 2499, status: "Allocated" },
  { id: "2", name: "Dell UltraSharp 32\"", tag: "AST-2026-024", type: "Monitor", assignedTo: "Jim Halpert", value: 899, status: "Allocated" },
  { id: "3", name: "Apple iPad Pro 12.9\"", tag: "AST-2026-056", type: "Tablet", assignedTo: "None", value: 1099, status: "Available" },
  { id: "4", name: "Server Node - AWS r6g", tag: "AST-2026-112", type: "Cloud Infrastructure", assignedTo: "None", value: 4500, status: "Maintenance" },
]

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [search, setSearch] = useState("")

  // Registration Dialog State
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [name, setName] = useState("")
  const [type, setType] = useState("Laptop")
  const [value, setValue] = useState("")
  
  // Assign Dialog State
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null)
  const [assignee, setAssignee] = useState("")

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !value) return

    const newAsset: Asset = {
      id: Math.random().toString(),
      name,
      tag: `AST-2026-0${Math.floor(Math.random() * 900) + 100}`,
      type,
      assignedTo: "None",
      value: Number(value),
      status: "Available",
    }

    setAssets([...assets, newAsset])
    setName("")
    setValue("")
    setIsRegOpen(false)
  }

  const handleAssignAsset = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAssetId || !assignee) return

    setAssets(
      assets.map((a) =>
        a.id === selectedAssetId ? { ...a, assignedTo: assignee, status: "Allocated" } : a
      )
    )
    setSelectedAssetId(null)
    setAssignee("")
    setIsAssignOpen(false)
  }

  const handleReleaseAsset = (id: string) => {
    setAssets(
      assets.map((a) =>
        a.id === id ? { ...a, assignedTo: "None", status: "Available" } : a
      )
    )
  }

  const handleMaintenanceAsset = (id: string) => {
    setAssets(
      assets.map((a) =>
        a.id === id ? { ...a, status: a.status === "Maintenance" ? "Available" : "Maintenance" } : a
      )
    )
  }

  const filteredAssets = assets.filter((a) => {
    return (
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      a.assignedTo.toLowerCase().includes(search.toLowerCase())
    )
  })

  // Calculations
  const totalAssetVal = assets.reduce((acc, curr) => acc + curr.value, 0)
  const allocatedCount = assets.filter(a => a.status === "Allocated").length

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Asset Allocator & Ledger
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Register hardware crew allocations, track maintenance flags, and monitor depreciation values.
          </p>
        </div>

        {/* Register Asset Button */}
        <Dialog open={isRegOpen} onOpenChange={setIsRegOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> Register Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Register Capital Asset
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegisterAsset} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Asset / Equipment Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dell XPS Laptop"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Type Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                  >
                    <option value="Laptop">Laptop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Cloud Infrastructure">Cloud seat</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Value (USD)</label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="e.g. 1500"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsRegOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Register</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Asset Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Portfolio Valuation</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">
              ${totalAssetVal.toLocaleString()}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Book value of all equipment</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <Laptop className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Assigned Crew Allocation</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">
              {allocatedCount} <span className="text-sm font-semibold text-muted-foreground">/ {assets.length}</span>
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Laptops/Monitors allocated to crew members</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <Users className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {/* Search Filter and Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Asset Register</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Search hardware logs, allocate seats, or flags.</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Tag or Name..."
              className="pl-8 h-8 text-[11px] bg-background/45 border-border/40 rounded-lg"
            />
          </div>
        </div>

        {/* Assets List Table */}
        <div className="rounded-2xl border border-border/30 overflow-hidden glass-panel">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30">
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Asset Item</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Asset Tag</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Book Value</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned To</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="p-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredAssets.map((asset) => (
                  <motion.tr
                    key={asset.id}
                    layout
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3">
                      <div>
                        <p className="text-xs font-bold text-foreground">{asset.name}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{asset.type}</p>
                      </div>
                    </td>
                    <td className="p-3 text-xs font-mono font-bold text-muted-foreground">{asset.tag}</td>
                    <td className="p-3 text-xs font-bold text-foreground">${asset.value.toLocaleString()}</td>
                    <td className="p-3 text-xs font-semibold text-foreground/90">{asset.assignedTo}</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline" 
                        className={`text-[8px] uppercase tracking-wider font-bold ${
                          asset.status === "Allocated" 
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" 
                            : asset.status === "Maintenance"
                            ? "border-red-500/20 bg-red-500/10 text-red-400" 
                            : "border-violet-500/20 bg-violet-500/10 text-violet-400"
                        }`}
                      >
                        {asset.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        {asset.status === "Available" && (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedAssetId(asset.id)
                              setIsAssignOpen(true)
                            }}
                            className="h-6 px-2.5 text-[9px] font-bold bg-violet-600 hover:bg-violet-500 text-white rounded-md"
                          >
                            Assign Crew
                          </Button>
                        )}
                        {asset.status === "Allocated" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReleaseAsset(asset.id)}
                            className="h-6 px-2.5 text-[9px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md"
                          >
                            Release
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleMaintenanceAsset(asset.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          title="Toggle Maintenance Flag"
                        >
                          <Wrench className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    No capital assets registered matching this tag.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocation Dialog Form */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tight text-foreground">
              Allocate Asset to Employee
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAssignAsset} className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Crew Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                required
                className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
              >
                <option value="">-- Choose Staff Member --</option>
                <option value="Sarah Chen">Sarah Chen (AI Research Lead)</option>
                <option value="Jim Halpert">Jim Halpert (Sales)</option>
                <option value="Michael Scott">Michael Scott (Director)</option>
                <option value="Pam Beesly">Pam Beesly (HR)</option>
              </select>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsAssignOpen(false)}>Cancel</Button>
              <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Allocate Device</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

