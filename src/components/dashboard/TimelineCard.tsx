import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import type { TimelineItem, ActivityType } from "@/data/schedule";

const typeConfig: Record<ActivityType, { label: string; colorClass: string; dotClass: string; bgClass: string }> = {
  setup: { label: "佈置", colorClass: "text-activity-setup", dotClass: "bg-activity-setup", bgClass: "bg-activity-setup/10 border-activity-setup/30 text-activity-setup" },
  session: { label: "議程", colorClass: "text-activity-session", dotClass: "bg-activity-session", bgClass: "bg-activity-session/10 border-activity-session/30 text-activity-session" },
  break: { label: "休息", colorClass: "text-activity-break", dotClass: "bg-activity-break", bgClass: "bg-activity-break/10 border-activity-break/30 text-activity-break" },
  critical: { label: "重要", colorClass: "text-activity-critical", dotClass: "bg-activity-critical", bgClass: "bg-activity-critical/10 border-activity-critical/30 text-activity-critical" },
  pitch: { label: "簡報", colorClass: "text-activity-pitch", dotClass: "bg-activity-pitch", bgClass: "bg-activity-pitch/10 border-activity-pitch/30 text-activity-pitch" },
  networking: { label: "交流", colorClass: "text-activity-networking", dotClass: "bg-activity-networking", bgClass: "bg-activity-networking/10 border-activity-networking/30 text-activity-networking" },
};

const TimelineCard = ({ item }: { item: TimelineItem }) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[item.type];

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center pt-2">
        <div className={`h-3 w-3 rounded-full ${config.dotClass} shrink-0 shadow-lg`} 
             style={{ boxShadow: `0 0 8px hsl(var(--activity-${item.type}) / 0.4)` }} />
        <div className="w-px flex-1 bg-border/50 mt-1" />
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 bg-card rounded-lg border border-border/50 p-3 sm:p-4 mb-3 cursor-pointer hover:border-border transition-colors"
        onClick={() => setExpanded(!expanded)}
        layout
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs font-mono font-semibold ${config.colorClass}`}>{item.time}</span>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${config.bgClass}`}>
                {config.label}
              </Badge>
            </div>
            <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
            {item.who && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.who.split(/[+,]/).map((person, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 bg-accent text-muted-foreground">
                    {person.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border/50">
                {item.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TimelineCard;
