import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import type { TimelineItem, ActivityType } from "@/data/schedule";

const typeConfig: Record<ActivityType, { label: string; cssVar: string; bgClass: string }> = {
  setup: { label: "佈置", cssVar: "--activity-setup", bgClass: "bg-activity-setup/10 border-activity-setup/30 text-activity-setup" },
  session: { label: "議程", cssVar: "--activity-session", bgClass: "bg-activity-session/10 border-activity-session/30 text-activity-session" },
  break: { label: "休息", cssVar: "--activity-break", bgClass: "bg-activity-break/10 border-activity-break/30 text-activity-break" },
  critical: { label: "⚠️ 重要", cssVar: "--activity-critical", bgClass: "bg-activity-critical/10 border-activity-critical/30 text-activity-critical" },
  pitch: { label: "簡報", cssVar: "--activity-pitch", bgClass: "bg-activity-pitch/10 border-activity-pitch/30 text-activity-pitch" },
  networking: { label: "交流", cssVar: "--activity-networking", bgClass: "bg-activity-networking/10 border-activity-networking/30 text-activity-networking" },
};

const colorMap: Record<ActivityType, string> = {
  setup: "text-activity-setup",
  session: "text-activity-session",
  break: "text-activity-break",
  critical: "text-activity-critical",
  pitch: "text-activity-pitch",
  networking: "text-activity-networking",
};

const dotColorMap: Record<ActivityType, string> = {
  setup: "bg-activity-setup shadow-activity-setup/50",
  session: "bg-activity-session shadow-activity-session/50",
  break: "bg-activity-break shadow-activity-break/50",
  critical: "bg-activity-critical shadow-activity-critical/50",
  pitch: "bg-activity-pitch shadow-activity-pitch/50",
  networking: "bg-activity-networking shadow-activity-networking/50",
};

const borderGlowMap: Record<ActivityType, string> = {
  setup: "hover:border-activity-setup/40 hover:shadow-activity-setup/5",
  session: "hover:border-activity-session/40 hover:shadow-activity-session/5",
  break: "hover:border-activity-break/40 hover:shadow-activity-break/5",
  critical: "border-activity-critical/20 hover:border-activity-critical/40 hover:shadow-activity-critical/5",
  pitch: "hover:border-activity-pitch/40 hover:shadow-activity-pitch/5",
  networking: "hover:border-activity-networking/40 hover:shadow-activity-networking/5",
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[item.type];
  const isCritical = item.type === "critical";

  return (
    <motion.div
      className="flex gap-3 sm:gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center pt-3">
        <motion.div
          className={`h-3 w-3 rounded-full ${dotColorMap[item.type]} shrink-0 shadow-lg`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.04 + 0.1, type: "spring", stiffness: 400 }}
        />
        <div className="w-px flex-1 bg-gradient-to-b from-border/60 to-transparent mt-1" />
      </div>

      {/* Card */}
      <motion.div
        className={`flex-1 glass-card rounded-xl p-3 sm:p-4 mb-3 cursor-pointer transition-all duration-300 hover:shadow-lg ${borderGlowMap[item.type]} ${isCritical ? "ring-1 ring-activity-critical/20" : ""}`}
        onClick={() => setExpanded(!expanded)}
        layout
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`text-xs font-mono font-bold ${colorMap[item.type]} tracking-wide`}>{item.time}</span>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${config.bgClass} border`}>
                {config.label}
              </Badge>
            </div>
            <h3 className={`font-semibold text-sm sm:text-base ${isCritical ? "text-activity-critical" : ""}`}>
              {item.title}
            </h3>
            {item.who && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.who.split(/[+,]/).map((person, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0.5 bg-accent/60 text-muted-foreground border border-border/50 backdrop-blur-sm">
                    {person.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border/30 leading-relaxed">
                {item.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TimelineCard;
