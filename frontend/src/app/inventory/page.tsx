"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, AlertTriangle, Plus, Search, ArrowUp, RefreshCw, ShoppingCart } from "lucide-react"
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

interface Product {
  id: string
  name: string
  sku: string
  stock: number
  lowThreshold: number
  price: number
  category: string
}

const initialProducts: Product[] = [
  { id: "1", name: "Apple MacBook Pro 14\"", sku: "MBP-14-M3", stock: 45, lowThreshold: 10, price: 1999, category: "Hardware" },
  { id: "2", name: "LG UltraFine 27\" Monitor", sku: "LG-27-UF", stock: 8, lowThreshold: 15, price: 699, category: "Hardware" },
  { id: "3", name: "Apple Magic Keyboard", sku: "APL-MK-BT", stock: 120, lowThreshold: 20, price: 99, category: "Accessories" },
  { id: "4", name: "Logitech MX Master 3S", sku: "LOG-MX3S", stock: 2, lowThreshold: 10, price: 99, category: "Accessories" },
]

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState("")

  // Add Item Dialog State
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [stock, setStock] = useState("")
  const [lowThreshold, setLowThreshold] = useState("10")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Hardware")

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !sku || !stock || !price) return

    const newProd: Product = {
      id: Math.random().toString(),
      name,
      sku,
      stock: Number(stock),
      lowThreshold: Number(lowThreshold),
      price: Number(price),
      category,
    }

    setProducts([...products, newProd])
    setName("")
    setSku("")
    setStock("")
    setLowThreshold("10")
    setPrice("")
    setIsOpen(false)
  }

  const handleRestock = (id: string, amount = 25) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, stock: p.stock + amount } : p))
    )
  }

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
  })

  // Calculations
  const lowStockCount = products.filter(p => p.stock <= p.lowThreshold).length

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Inventory & Logistics
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Track asset SKU quantities, configure low-stock triggers, and run instant warehouse restocks.
          </p>
        </div>

        {/* Add Product Trigger */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> Add Item SKU
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Register Inventory SKU
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddItem} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Product Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dell XPS 15"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">SKU Code</label>
                <Input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. DELL-XPS-15"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Qty</label>
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="e.g. 50"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Low Limit</label>
                  <Input
                    type="number"
                    value={lowThreshold}
                    onChange={(e) => setLowThreshold(e.target.value)}
                    placeholder="e.g. 10"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price (USD)</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 1500"
                    required
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Office Tools">Office Tools</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Register</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Widgets */}
      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Total Registered SKUs</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">{products.length}</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Unique warehouse catalog assets</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <Package className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Critical Stock Alarms</span>
            <h4 className={`text-3xl font-black mt-2 ${lowStockCount > 0 ? "text-amber-500 animate-pulse" : "text-foreground"}`}>
              {lowStockCount}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Items at or below low stock trigger limits</p>
          </div>
          <div className={`p-3 rounded-2xl ${lowStockCount > 0 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-primary/10 text-primary"}`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {/* Catalog Search & Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Product SKU Ledger</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Filter, search, or trigger stock restocks.</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SKU or name..."
              className="pl-8 h-8 text-[11px] bg-background/45 border-border/40 rounded-lg"
            />
          </div>
        </div>

        {/* Catalog Table */}
        <div className="rounded-2xl border border-border/30 overflow-hidden glass-panel">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/10 border-b border-border/30">
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">SKU</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Stock Qty</th>
                <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="p-3 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Restock</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod) => {
                  const isLow = prod.stock <= prod.lowThreshold
                  const isOut = prod.stock === 0
                  return (
                    <motion.tr
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="border-b border-border/20 hover:bg-muted/10 transition-colors"
                    >
                      <td className="p-3">
                        <div>
                          <p className="text-xs font-bold text-foreground">{prod.name}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">{prod.category}</p>
                        </div>
                      </td>
                      <td className="p-3 text-xs font-semibold text-muted-foreground/80 font-mono">{prod.sku}</td>
                      <td className="p-3 text-xs font-bold text-foreground">${prod.price.toLocaleString()}</td>
                      <td className="p-3 text-xs font-black text-foreground">{prod.stock}</td>
                      <td className="p-3">
                        <Badge 
                          variant="outline" 
                          className={`text-[8px] uppercase tracking-wider font-bold ${
                            isOut 
                              ? "border-red-500/20 bg-red-500/10 text-red-400" 
                              : isLow 
                              ? "border-amber-500/20 bg-amber-500/10 text-amber-400" 
                              : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleRestock(prod.id, 25)}
                          className="h-7 gap-1 text-[10px] font-bold text-violet-400 hover:text-violet-300 hover:bg-violet-500/10"
                        >
                          <RefreshCw className="h-3 w-3" /> +25 Units
                        </Button>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    No matching products in catalog.
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

