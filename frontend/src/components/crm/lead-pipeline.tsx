"use client"

import React, { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Plus, Search, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LeadDetail } from "@/components/crm/lead-detail"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Acme Corp Website Redesign", value: "$5,000", company: "Acme Corp", date: "Jun 28" },
    "task-2": { id: "task-2", content: "Global Tech ERP Migration", value: "$25,000", company: "Global Tech", date: "Jul 15" },
    "task-3": { id: "task-3", content: "Healthcare Custom CRM", value: "$15,000", company: "Health Plus", date: "Jul 20" },
    "task-4": { id: "task-4", content: "Retail POS Android Client", value: "$8,500", company: "RetailCo", date: "Aug 01" },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Incoming Leads",
      taskIds: ["task-1", "task-2"],
    },
    "col-2": {
      id: "col-2",
      title: "Qualified Opportunity",
      taskIds: ["task-3"],
    },
    "col-3": {
      id: "col-3",
      title: "Proposal Pitch",
      taskIds: ["task-4"],
    },
    "col-4": {
      id: "col-4",
      title: "Contract Negotiation",
      taskIds: [],
    },
    "col-5": {
      id: "col-5",
      title: "Deal Closed (Won)",
      taskIds: [],
    },
  },
  columnOrder: ["col-1", "col-2", "col-3", "col-4", "col-5"],
}

export function LeadPipeline() {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState("")
  const [isBrowser, setIsBrowser] = useState(false)
  
  // New Lead Form State
  const [isOpen, setIsOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newCompany, setNewCompany] = useState("")
  const [newValue, setNewValue] = useState("")
  const [newDate, setNewDate] = useState("Jun 30")
  const [newStage, setNewStage] = useState("col-1")

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = data.columns[source.droppableId as keyof typeof data.columns]
    const finish = data.columns[destination.droppableId as keyof typeof data.columns]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      setData(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setData(newState)
  }

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newCompany) return

    const newTaskId = `task-${Date.now()}`
    const newTask = {
      id: newTaskId,
      content: newTitle,
      value: newValue ? `$${newValue}` : "$0",
      company: newCompany,
      date: newDate,
    }

    const targetColumn = data.columns[newStage as keyof typeof data.columns]
    const updatedTaskIds = [newTaskId, ...targetColumn.taskIds]

    setData({
      ...data,
      tasks: {
        ...data.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...data.columns,
        [newStage]: {
          ...targetColumn,
          taskIds: updatedTaskIds,
        },
      },
    })

    // Reset Form
    setNewTitle("")
    setNewCompany("")
    setNewValue("")
    setNewDate("Jun 30")
    setNewStage("col-1")
    setIsOpen(false)
  }

  if (!isBrowser) {
    return null
  }

  return (
    <div className="flex flex-col flex-1 h-full gap-4 min-h-0">
      {/* Top Search & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter leads..."
            className="pl-9 bg-background/45 border-border/40 text-xs h-9 rounded-lg"
          />
        </div>

        {/* Add Lead Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow-md shadow-violet-500/10">
              <Plus className="h-4 w-4" /> Add Lead Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/40 text-foreground w-[90vw] sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-black tracking-tight text-foreground">
                Add Lead Opportunity
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddLead} className="space-y-4 mt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Lead Opportunity Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Website Overhaul"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Company Name</label>
                <Input
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  required
                  className="bg-background/50 border-border/40 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Value (USD)</label>
                  <Input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. 5000"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Close Date</label>
                  <Input
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. Jun 30"
                    className="bg-background/50 border-border/40 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Initial Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  className="w-full h-9 rounded-lg bg-background/50 border border-border/40 text-xs px-3 focus:outline-hidden text-foreground"
                >
                  <option value="col-1">Incoming Leads</option>
                  <option value="col-2">Qualified Opportunity</option>
                  <option value="col-3">Proposal Pitch</option>
                  <option value="col-4">Contract Negotiation</option>
                  <option value="col-5">Deal Closed (Won)</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">Create Lead</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Board Scroll wrapper */}
      <div className="flex-1 min-h-0 overflow-y-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 h-full overflow-x-auto pb-4 select-none">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId as keyof typeof data.columns]
              
              // Filter tasks by search
              const allTasks = column.taskIds.map(
                (taskId) => data.tasks[taskId as keyof typeof data.tasks]
              )
              const filteredTasks = allTasks.filter(
                (task) =>
                  task.content.toLowerCase().includes(search.toLowerCase()) ||
                  task.company.toLowerCase().includes(search.toLowerCase())
              )

              return (
                <div key={column.id} className="flex flex-col w-72 shrink-0 h-full min-h-0 bg-secondary/15 border border-border/30 rounded-2xl p-3 glass-panel">
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h4 className="font-bold text-xs truncate text-foreground">{column.title}</h4>
                      <span className="text-[10px] font-bold text-muted-foreground/60 bg-muted/40 px-1.5 py-0.5 rounded-md shrink-0">
                        {filteredTasks.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Column List */}
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto no-scrollbar rounded-xl p-1 gap-2 flex flex-col min-h-[150px] transition-colors ${
                          snapshot.isDraggingOver ? "bg-muted/10" : ""
                        }`}
                      >
                        {filteredTasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <LeadDetail lead={task}>
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{ ...provided.draggableProps.style } as React.CSSProperties}
                                  className={`glass-card rounded-xl p-4 cursor-grab hover:border-violet-500/25 transition-all select-none ${
                                    snapshot.isDragging ? "shadow-xl border-violet-500/50 scale-105 opacity-90" : "shadow-xs"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <Badge variant="outline" className="text-[9px] font-medium border-border/60 uppercase max-w-[150px] truncate">
                                      {task.company}
                                    </Badge>
                                  </div>
                                  <p className="font-bold text-xs text-foreground mb-3 leading-snug line-clamp-2">
                                    {task.content}
                                  </p>
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                                    <div className="flex items-center text-foreground font-extrabold gap-0.5">
                                      <DollarSign className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                                      <span>{task.value.replace("$", "")}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3 text-muted-foreground/60" />
                                      <span>{task.date}</span>
                                    </div>
                                  </div>
                                </div>
                              </LeadDetail>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

