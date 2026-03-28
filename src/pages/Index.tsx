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
  { value: "overview", label: "總覽" },
  { value: "day1", label: "Day 1" },
  { value: "day2", label: "Day 2" },
  { value: "roles", label: "角色" },
  { value: "checklist", label: "清單" },
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
    <div className="min-h-screen bg-background print-light relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none scan-line opacity-30 z-[1]" />

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px] animate-pulse-glow" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-activity-pitch/[0.04] blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.3s" }} />
        <div className="absolute -bottom-20 right-0 w-[350px] h-[350px] rounded-full bg-activity-networking/[0.03] blur-[80px] animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-card-strong border-b no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-activity-pitch flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tighter gradient-text">HSIL HACK '26</h1>
              <p className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">OPS // 台灣站</p>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="p-2 rounded-lg glass-card hover:border-primary/30 transition-all text-muted-foreground hover:text-primary"
            title="列印"
          >
            <Printer className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="glow-line" />
      </header>

      {/* Tabs */}
      <div className="sticky top-[58px] z-40 glass-card border-b no-print">
        <div className="max-w-4xl mx-auto px-3 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-0 overflow-x-auto scrollbar-none">
              {tabs.map((tab, i) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 + 0.15 }}
                >
                  <TabsTrigger
                    value={tab.value}
                    className="relative rounded-none border-none px-4 py-3 text-xs font-mono font-medium tracking-wider uppercase whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-muted-foreground transition-all duration-200 hover:text-foreground"
                  >
                    {tab.label}
                    {activeTab === tab.value && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-primary to-activity-pitch rounded-full shadow-sm shadow-primary/50"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
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
      <main className="max-w-4xl mx-auto px-4 py-5 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
