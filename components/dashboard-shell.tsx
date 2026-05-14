"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  BarChart3, 
  Receipt, 
  Settings, 
  Search, 
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  ShieldCheck,
  Zap,
  Clock,
  Activity,
  Globe
} from "lucide-react"

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardShell({ 
  children, 
  title, 
  subtitle 
}: { 
  children: React.ReactNode, 
  title: string, 
  subtitle?: string 
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navGroups = [
    {
      title: "Main",
      items: [
        { href: "/demo/company-portal", label: "Dashboard", icon: LayoutDashboard },
        { href: "/demo/intelligence-layer", label: "Intelligence Layer", icon: Zap },
        { href: "/demo/billing-transparency", label: "Billing & Audit", icon: Receipt },
      ]
    },
    {
      title: "Operations",
      items: [
        { href: "#", label: "Vendor Management", icon: Users },
        { href: "#", label: "Fleet Telemetry", icon: Car },
        { href: "#", label: "Route Roster", icon: Globe },
      ]
    },
    {
      title: "Administration",
      items: [
        { href: "#", label: "System Settings", icon: Settings },
      ]
    }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className={cx("flex flex-col gap-6 transition-all duration-300", (collapsed && !isMobile) ? "items-center py-8 px-2" : "items-center px-6 py-10")}>
          <Link href="/" className="relative h-12 w-full flex items-center justify-center">
            {/* Full Logo */}
            <div className={cx(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              (collapsed && !isMobile) ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"
            )}>
              <Image 
                src="/traflinq_dark_no_tagline-Photoroom.png" 
                alt="TrafLinq" 
                width={140} 
                height={35} 
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
            
            {/* Collapsed Icon */}
            <div className={cx(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              (collapsed && !isMobile) ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
            )}>
              <div className="h-10 w-10 relative">
                <Image 
                  src="/favicon.png" 
                  alt="Icon" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        <nav className="px-3 mt-2 space-y-6">
          {navGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.title && (
                <div className={cx(
                  "px-3 mb-2 text-[11px] font-bold text-white/20 uppercase tracking-widest transition-all duration-300 overflow-hidden whitespace-nowrap",
                  (collapsed && !isMobile) ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-5"
                )}>
                  {group.title}
                </div>
              )}
              <div className="space-y-1.5">
                {group.items.map((item, itemIndex) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      title={(collapsed && !isMobile) ? item.label : undefined}
                      onClick={() => isMobile && setIsMobileMenuOpen(false)}
                      className={cx(
                        "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden",
                        active
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary" />}

                      <Icon size={20} strokeWidth={active ? 2.5 : 1.5} className={cx("shrink-0 transition-transform duration-200", active ? "text-primary" : "group-hover:text-primary")} />

                      <span className={cx(
                        "whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden",
                        (collapsed && !isMobile) ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/5 p-3 mt-auto bg-white/[0.02]">
        <div className={cx("flex items-center gap-3 rounded-xl p-2 transition-all duration-300", (collapsed && !isMobile) ? "justify-center" : "justify-between hover:bg-white/5")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary shrink-0">
              AT
            </div>
            <div className={cx(
              "flex flex-col overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap",
              (collapsed && !isMobile) ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
            )}>
              <span className="truncate text-xs font-bold text-white">Aqeel Tarani</span>
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Administrator</span>
            </div>
          </div>
          <button className={cx("shrink-0 rounded-lg p-2 text-white/20 hover:text-primary hover:bg-primary/10 transition-all", (collapsed && !isMobile) ? "hidden" : "block")}>
             <LogOut size={16} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#080b14] text-white font-sans selection:bg-primary/30 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-[#080b14]/80 backdrop-blur-md px-6 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-xl p-2 text-white/60 hover:bg-white/5 transition-all"
        >
          <Menu size={24} />
        </button>
        <Image src="/traflinq_dark_no_tagline-Photoroom.png" alt="TrafLinq" width={100} height={25} className="h-7 w-auto" />
        <div className="w-10" />
      </header>

      {/* Desktop Sidebar - Floating style */}
      <aside
        className={cx(
          "sticky top-4 h-[calc(100vh-2rem)] hidden shrink-0 border border-white/10 bg-[#0d1120] md:flex md:flex-col transition-all duration-300 ease-in-out relative z-20 ml-4 my-4 rounded-[2.5rem] shadow-2xl",
          collapsed ? "w-20" : "w-72"
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#0d1120] border border-white/10 text-white/40 shadow-xl hover:text-white hover:scale-110 transition-all focus:outline-none"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-[#0d1120] border-r border-white/10">
            <div className="absolute right-4 top-4">
              <button onClick={() => setIsMobileMenuOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-white/40">
                <ChevronLeft size={24} />
              </button>
            </div>
            <SidebarContent isMobile />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header bar */}
        <header className="sticky top-0 h-20 border-b border-white/5 bg-[#080b14]/50 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <span className="text-xs text-white/30 uppercase tracking-widest font-medium mt-1">{subtitle}</span>
            )}
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search telemetry..." 
                  className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 w-64 transition-all"
                />
             </div>
             <button className="relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/5 border border-white/10 transition-colors">
                <Bell size={18} className="text-white/60" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-[#080b14]" />
             </button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 p-8 relative bg-[radial-gradient(ellipse_at_top,_rgba(254,133,3,0.03),_transparent_50%)]">
           <div className="max-w-[1600px] mx-auto animate-fade-slide-up">
              {children}
           </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes fade-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide-up {
          animation: fade-slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
