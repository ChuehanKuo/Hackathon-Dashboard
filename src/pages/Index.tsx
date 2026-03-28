import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer, Zap } from "lucide-react";
import OverviewTab from "@/components/dashboard/OverviewTab";
import DayTimeline from "@/components/dashboard/DayTimeline";
import RolesTab from "@/components/dashboard/RolesTab";
import ChecklistTab from "@/components/dashboard/ChecklistTab";
import { day1Schedule, day2Schedule } from "@/data/schedule";

const tabs = [
  { value: "overview", label: "總覽", emoji: "📊" },
  { value: "day1", label: "Day 1", emoji: "🗓️" },
  { value: "day2", label: "Day 2", emoji: "🏆" },
  { value: "roles", label: "角色分工", emoji: "👥" },
  { value: "checklist", label: "待辦清單", emoji: "✅" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "day1": return <DayTimeline items={day1Schedule} />;
      case "day2": return <DayTimeline items={day2Schedule} />;
      case "roles": return <RolesTab />;
      case "checklist": return <ChecklistTab />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background print-light noise-bg relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-activity-pitch/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 rounded-full bg-activity-networking/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-activity-pitch flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight gradient-text">HSIL Hackathon 2026</h1>
              <p className="text-[11px] text-muted-foreground tracking-wide uppercase">台灣站 Operations Dashboard</p>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="p-2.5 rounded-xl glass-card hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
            title="列印"
          >
            <Printer className="h-4 w-4" />
          </motion.button>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[57px] z-40 glass-card border-b no-print">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-1 overflow-x-auto scrollbar-none">
              {tabs.map((tab, i) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                >
                  <TabsTrigger
                    value={tab.value}
                    className="relative rounded-lg border-none px-3 py-2.5 text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-200 hover:bg-accent gap-1.5"
                  >
                    <span className="text-xs">{tab.emoji}</span>
                    {tab.label}
                    {activeTab === tab.value && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
