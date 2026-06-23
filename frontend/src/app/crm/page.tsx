import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadPipeline } from "@/components/crm/lead-pipeline"
import { ContactsTable } from "@/components/crm/contacts-table"

export default function CRMPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 h-full flex flex-col relative">
      <div>
        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
          CRM Operations
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
          Manage pipelines, qualify leads, and view contact directories.
        </p>
      </div>
      
      <Tabs defaultValue="pipeline" className="flex-1 flex flex-col space-y-4 min-h-0">
        <TabsList className="bg-secondary/40 border border-border/30 rounded-xl p-0.5 max-w-fit">
          <TabsTrigger 
            value="pipeline" 
            className="text-xs font-bold px-4 py-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary text-muted-foreground"
          >
            Lead Pipeline
          </TabsTrigger>
          <TabsTrigger 
            value="contacts" 
            className="text-xs font-bold px-4 py-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary text-muted-foreground"
          >
            Contacts Directory
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="flex-1 m-0 min-h-0">
          <LeadPipeline />
        </TabsContent>
        <TabsContent value="contacts" className="flex-1 m-0 min-h-0">
          <ContactsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

