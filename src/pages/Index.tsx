import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Printer } from "lucide-react";
import OverviewTab from "@/components/dashboard/OverviewTab";
import DayTimeline from "@/components/dashboard/DayTimeline";
import RolesTab from "@/components/dashboard/RolesTab";
import ChecklistTab from "@/components/dashboard/ChecklistTab";
import { day1Schedule, day2Schedule } from "@/data/schedule";

const tabs = [
  { value: "overview", label: "總覽" },
  { value: "day1", label: "Day 1" },
  { value: "day2", label: "Day 2" },
  { value: "roles", label: "角色分工" },
  { value: "checklist", label: "待辦清單" },
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
    <div className="min-h-screen bg-background print-light">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">HSIL Hackathon 2026</h1>
            <p className="text-xs text-muted-foreground">台灣站 Ops Dashboard</p>
          </div>
          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
            title="列印"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[61px] z-40 bg-background/80 backdrop-blur-xl border-b border-border no-print">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-transparent h-auto p-0 gap-0 overflow-x-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 py-2.5 text-sm whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
