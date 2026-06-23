"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Mail, Phone, Plus, Search, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@acmecorp.com",
    company: "Acme Corp",
    status: "Active",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bsmith@globaltech.com",
    company: "Global Tech",
    status: "Inactive",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "cbrown@healthplus.org",
    company: "Health Plus",
    status: "Active",
    lastContact: "Today",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "dprince@retailco.com",
    company: "RetailCo",
    status: "Lead",
    lastContact: "3 hours ago",
  },
]

export function ContactsTable() {
  const [contacts, setContacts] = useState(initialContacts)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Inactive" | "Lead">("all")
  
  // Add Contact Form State
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("Active")

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || c.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    const newContact = {
      id: Math.random().toString(),
      name,
      email,
      company: company || "N/A",
      status,
      lastContact: "Just now",
    }

    setContacts([newContact, ...contacts])
    setName("")
    setEmail("")
    setCompany("")
    setStatus("Active")
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="pl-9 bg-background/45 border-border/40 text-xs h-9 rounded-lg"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-9 rounded-lg bg-background/45 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground min-w-[120px]"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
            <option value="Lead">Leads Only</option>
          </select>
        </div>

        {/* Add Contact Trigger */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Add New Contact
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddContact} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alice Cooper"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alice@domain.com"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Company</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Create Contact</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contacts Table Panel */}
      <div className="rounded-2xl border border-border/30 overflow-hidden glass-panel">
        <Table>
          <TableHeader className="bg-muted/10 border-b border-border/30">
            <TableRow>
              <TableHead className="font-bold text-xs">Contact</TableHead>
              <TableHead className="font-bold text-xs">Company</TableHead>
              <TableHead className="font-bold text-xs">Status</TableHead>
              <TableHead className="font-bold text-xs">Last Contact</TableHead>
              <TableHead className="text-right font-bold text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-muted/10 transition-colors border-b border-border/20">
                <TableCell className="font-medium p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-border/40 shrink-0">
                      <AvatarFallback className="font-semibold text-[10px] bg-gradient-to-tr from-violet-600/20 to-cyan-400/20 text-primary">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold leading-none truncate">{contact.name}</span>
                      <span className="text-[10px] text-muted-foreground mt-1 truncate leading-none">{contact.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-foreground font-medium">{contact.company}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`text-[9px] font-semibold tracking-wider ${
                      contact.status === "Active" 
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
                        : contact.status === "Lead" 
                        ? "border-violet-500/30 bg-violet-500/10 text-violet-400" 
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-[11px] text-muted-foreground font-medium">{contact.lastContact}</TableCell>
                <TableCell className="text-right p-3">
                  <div className="flex justify-end gap-1">
                    <a href={`mailto:${contact.email}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Mail className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredContacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                  No contacts match your query.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

