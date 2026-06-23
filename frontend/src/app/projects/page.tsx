"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Plus, ListTodo, Presentation, Clock, Users, CheckSquare, Trash2 } from "lucide-react"
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

interface Project {
  id: string
  name: string
  client: string
  startDay: number // 1 to 30 representation
  durationDays: number
  progress: number
  tasksCount: number
  status: "Planning" | "In Progress" | "On Hold" | "Completed"
}

const initialProjects: Project[] = [
  { id: "1", name: "Acme Corp Web Redesign", client: "Acme Corp", startDay: 1, durationDays: 12, progress: 65, tasksCount: 18, status: "In Progress" },
  { id: "2", name: "Global Tech ERP Migration", client: "Global Tech", startDay: 5, durationDays: 15, progress: 30, tasksCount: 24, status: "In Progress" },
  { id: "3", name: "Stripe Payment Portal", client: "RetailCo", startDay: 12, durationDays: 14, progress: 10, tasksCount: 8, status: "Planning" },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  
  // New Project Dialog State
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [client, setClient] = useState("")
  const [startDay, setStartDay] = useState(1)
  const [durationDays, setDurationDays] = useState(10)
  const [status, setStatus] = useState<Project["status"]>("Planning")

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !client) return

    const newProj: Project = {
      id: Math.random().toString(),
      name,
      client,
      startDay: Number(startDay),
      durationDays: Number(durationDays),
      progress: 0,
      tasksCount: 5,
      status,
    }

    setProjects([...projects, newProj])
    setName("")
    setClient("")
    setStartDay(1)
    setDurationDays(10)
    setStatus("Planning")
    setIsOpen(false)
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const updateProgress = (id: string, delta: number) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const nextProg = Math.min(100, Math.max(0, p.progress + delta))
          return {
            ...p,
            progress: nextProg,
            status: nextProg === 100 ? "Completed" : p.status === "Planning" ? "In Progress" : p.status,
          }
        }
        return p
      })
    )
  }

  // Calculate stats
  const pendingTasksCount = projects.reduce((acc, curr) => acc + (curr.status !== "Completed" ? curr.tasksCount : 0), 0)

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
            Projects Portfolio
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Monitor timelines, adjust milestones, and manage sprint deliveries.
          </p>
        </div>

        {/* Add Project Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Initiate New Project
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Project Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Android App Integration"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Client Name</label>
                <Input
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. RetailCo"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Timeline Offset (Day)</label>
                  <Input
                    type="number"
                    min={1}
                    max={25}
                    value={startDay}
                    onChange={(e) => setStartDay(Number(e.target.value))}
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Duration (Days)</label>
                  <Input
                    type="number"
                    min={2}
                    max={20}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Create Project</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Active Contracts</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">{projects.filter(p => p.status !== "Completed").length}</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Authorized project mandates</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <Presentation className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 hover:border-violet-500/10 transition-colors flex items-center justify-between col-span-1 md:col-span-2"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Cumulative Sprint Tasks</span>
            <h4 className="text-3xl font-black mt-2 text-foreground">{pendingTasksCount}</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Awaiting developer completion</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary glow-violet">
            <ListTodo className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {/* Gantt chart section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border-border/40"
      >
        <div className="pb-4 border-b border-border/30">
          <h3 className="text-sm font-bold text-foreground">Gantt Milestone Schedule</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Visual representation of active monthly delivery bars.</p>
        </div>

        {/* Custom Gantt View */}
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[640px] space-y-4">
            {/* Calendar timeline labels */}
            <div className="flex text-[9px] font-extrabold uppercase tracking-widest text-muted-foreground/50 border-b border-border/20 pb-2">
              <div className="w-[180px] shrink-0">Project / Client</div>
              <div className="flex-1 grid grid-cols-30 gap-1 text-center">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i} className="leading-none">{i + 1}</span>
                ))}
              </div>
            </div>

            {/* Gantt Row Items */}
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="flex items-center">
                  {/* Name and Client */}
                  <div className="w-[180px] shrink-0 pr-4">
                    <p className="text-xs font-bold truncate text-foreground">{proj.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{proj.client}</p>
                  </div>

                  {/* Gantt visual bar */}
                  <div className="flex-1 grid grid-cols-30 gap-1 h-7 items-center relative bg-muted/5 rounded-lg border border-border/10">
                    <div
                      className="h-4 rounded-md bg-gradient-to-r from-violet-600 to-cyan-400 opacity-80 glow-violet relative"
                      style={{
                        gridColumnStart: proj.startDay,
                        gridColumnEnd: proj.startDay + proj.durationDays,
                      }}
                      title={`${proj.name} (${proj.progress}%)`}
                    >
                      {/* Inner progress bar */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-white/20 rounded-md transition-all" 
                        style={{ width: `${proj.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  No active project schedules.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects List cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -3 }}
              className="glass-card rounded-2xl p-5 hover:border-violet-500/20 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-wider font-semibold border-border/50 bg-secondary/30">
                    {proj.client}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`text-[8px] uppercase tracking-wider font-bold ${
                      proj.status === "Completed" 
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" 
                        : proj.status === "In Progress"
                        ? "border-violet-500/20 bg-violet-500/10 text-violet-400"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {proj.status}
                  </Badge>
                </div>
                
                <h4 className="text-sm font-bold text-foreground mt-3 leading-snug">{proj.name}</h4>
                
                {/* Progress bar info */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-semibold">
                    <span className="text-muted-foreground">Sprint Completion</span>
                    <span className="text-foreground">{proj.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-600 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress actions & tasks count */}
              <div className="mt-5 pt-4 border-t border-border/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                  <CheckSquare className="h-3.5 w-3.5" />
                  <span>{proj.tasksCount} Tasks</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => updateProgress(proj.id, -10)}
                    disabled={proj.progress === 0}
                    className="h-7 w-7 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    -
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => updateProgress(proj.id, 10)}
                    disabled={proj.progress === 100}
                    className="h-7 w-7 text-xs font-bold text-muted-foreground hover:text-foreground"
                  >
                    +
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => deleteProject(proj.id)}
                    className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

