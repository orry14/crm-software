import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orque One | AI-Powered CRM + ERP",
  description: "Run Your Entire Business From One Intelligent Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground font-sans antialiased overflow-hidden grid-bg relative`}>
        {/* Glow Effects */}
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] dark:bg-primary/5 opacity-60 z-0" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] dark:bg-cyan-500/5 opacity-60 z-0" />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider>
              <div className="flex h-screen w-screen overflow-hidden z-10 relative">
                <AppSidebar />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <AppHeader />
                  <main className="flex-1 overflow-auto p-0 relative">
                    {children}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
