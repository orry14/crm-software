"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, UserPlus, FileText, Check, X, Search, CalendarClock, Building, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const initialEmployees = [
  { id: "1", name: "Sarah Chen", role: "AI Research Lead", dept: "Engineering", email: "sarah@orque.one" },
  { id: "2", name: "Michael Scott", role: "Sales Director", dept: "Sales", email: "mscott@orque.one" },
  { id: "3", name: "Jim Halpert", role: "Account Executive", dept: "Sales", email: "jim@orque.one" },
  { id: "4", name: "Pam Beesly", role: "Office Administrator", dept: "HR", email: "pam@orque.one" },
  { id: "5", name: "David Light", role: "Frontend Developer", dept: "Engineering", email: "dlight@orque.one" },
]

const initialLeaveRequests = [
  { id: "101", employee: "Sarah Chen", type: "Annual Leave", dates: "Jun 29 - Jul 02", status: "Pending" },
  { id: "102", employee: "Jim Halpert", type: "Sick Leave", dates: "Jul 05 - Jul 06", status: "Pending" },
]

const attendanceData = [
  { name: "Engineering", rate: 98 },
  { name: "Sales", rate: 92 },
  { name: "Marketing", rate: 95 },
  { name: "HR", rate: 99 },
]

export default function HRMPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests)
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")

  // Add Employee Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [dept, setDept] = useState("Engineering")
  const [email, setEmail] = useState("")

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !role) return

    const newEmp = {
      id: Math.random().toString(),
      name,
      role,
      dept,
      email: email || `${name.toLowerCase().replace(/\s+/g, "")}@orque.one`,
    }

    setEmployees([...employees, newEmp])
    setName("")
    setRole("")
    setDept("Engineering")
    setEmail("")
    setIsDialogOpen(false)
  }

  const handleLeaveDecision = (id: string, decision: "Approved" | "Rejected") => {
    setLeaveRequests(
      leaveRequests.map((req) => (req.id === id ? { ...req, status: decision } : req))
    )
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(search.toLowerCase()) || 
      emp.role.toLowerCase().includes(search.toLowerCase())
    const matchesDept = deptFilter === "all" || emp.dept === deptFilter
    return matchesSearch && matchesDept
  })

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            HRM Operations
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Manage organization members, verify attendance, and approve leave requests.
          </p>
        </div>

        {/* Add Employee Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <UserPlus className="h-4 w-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Add Organization Member
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Light"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Job Title / Role</label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Backend Dev"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Department</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. david@orque.one"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Add Staff</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid Layout widgets */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Metric widgets */}
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Total Active Staff</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">{employees.length}</h4>
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-500 font-bold">+1 this week</span> based on active hiring
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <Users className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Pending Leave Requests</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">
              {leaveRequests.filter(r => r.status === "Pending").length}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-1">Requires supervisor authorization</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <CalendarClock className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Employee Directory Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Staff Directory</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Filter, search, or email crew members.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search staff..."
                  className="pl-8 h-8 text-[11px] bg-background/45 border-border/40 rounded-lg w-[160px]"
                />
              </div>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="h-8 rounded-lg bg-background/45 border border-border/40 text-[11px] px-2.5 focus:outline-hidden text-foreground"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-border/30 overflow-hidden glass-panel">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/10 border-b border-border/30">
                  <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Employee</th>
                  <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Department</th>
                  <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border/40">
                        <AvatarFallback className="font-bold text-[10px] bg-gradient-to-tr from-violet-600/20 to-cyan-400/20 text-primary">
                          {emp.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold leading-none text-foreground">{emp.name}</span>
                        <span className="text-[10px] text-muted-foreground mt-1 truncate">{emp.email}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[9px] font-medium border-border/50 bg-secondary/30">
                        {emp.dept}
                      </Badge>
                    </td>
                    <td className="p-3 text-xs font-semibold text-foreground/90">{emp.role}</td>
                    <td className="p-3">
                      <a href={`mailto:${emp.email}`}>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                          <Mail className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-xs text-muted-foreground">
                      No staff members match the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Pane: Attendance & Leave Requests */}
        <div className="space-y-6">
          {/* Leave Requests Box */}
          <div className="glass-card rounded-2xl p-5 border-border/40 relative overflow-hidden">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 pb-3 border-b border-border/30">
              <CalendarClock className="h-4 w-4 text-violet-400" />
              Time-off Authorizations
            </h3>
            
            <div className="mt-4 space-y-3.5">
              <AnimatePresence mode="popLayout">
                {leaveRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 rounded-xl border border-border/40 bg-background/25 flex flex-col gap-2 relative"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="text-xs">
                        <p className="font-bold text-foreground">{req.employee}</p>
                        <p className="text-muted-foreground mt-0.5">{req.type} ({req.dates})</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-[8px] uppercase tracking-wider font-semibold ${
                          req.status === "Pending" 
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400" 
                            : req.status === "Approved"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {req.status}
                      </Badge>
                    </div>
                    {req.status === "Pending" && (
                      <div className="flex gap-1.5 self-end mt-1">
                        <Button 
                          size="sm" 
                          onClick={() => handleLeaveDecision(req.id, "Rejected")}
                          className="h-6 px-2.5 text-[9px] font-bold bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-md"
                        >
                          <X className="h-3 w-3 mr-0.5" /> Reject
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleLeaveDecision(req.id, "Approved")}
                          className="h-6 px-2.5 text-[9px] font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 rounded-md"
                        >
                          <Check className="h-3 w-3 mr-0.5" /> Approve
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {leaveRequests.length === 0 && (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  No active requests.
                </div>
              )}
            </div>
          </div>

          {/* Attendance Stats chart */}
          <div className="glass-card rounded-2xl p-5 border-border/40">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 pb-3 border-b border-border/30">
              <Building className="h-4 w-4 text-violet-400" />
              Weekly Attendance %
            </h3>
            
            <div className="h-[140px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={8} tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
                  <YAxis fontSize={8} domain={[80, 100]} tickLine={false} axisLine={false} stroke="rgba(255,255,255,0.4)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(10, 10, 15, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      fontSize: "9px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="rate" fill="oklch(0.62 0.22 285)" radius={[4, 4, 0, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

