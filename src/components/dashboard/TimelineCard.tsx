import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { TimelineItem, ActivityType } from "@/data/schedule";

const typeConfig: Record<ActivityType, { label: string; dot: string; accent: string; border: string; text: string }> = {
  setup:      { label: "SET", dot: "bg-activity-setup",      accent: "bg-activity-setup/10",      border: "border-activity-setup/20 hover:border-activity-setup/40", text: "text-activity-setup" },
  session:    { label: "SES", dot: "bg-activity-session",    accent: "bg-activity-session/10",    border: "border-activity-session/20 hover:border-activity-session/40", text: "text-activity-session" },
  break:      { label: "BRK", dot: "bg-activity-break",      accent: "bg-activity-break/10",      border: "border-activity-break/20 hover:border-activity-break/40", text: "text-activity-break" },
  critical:   { label: "CRT", dot: "bg-activity-critical",   accent: "bg-activity-critical/10",   border: "border-activity-critical/30 hover:border-activity-critical/50", text: "text-activity-critical" },
  pitch:      { label: "PIT", dot: "bg-activity-pitch",      accent: "bg-activity-pitch/10",      border: "border-activity-pitch/20 hover:border-activity-pitch/40", text: "text-activity-pitch" },
  networking: { label: "NET", dot: "bg-activity-networking",  accent: "bg-activity-networking/10", border: "border-activity-networking/20 hover:border-activity-networking/40", text: "text-activity-networking" },
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[item.type];
  const isCritical = item.type === "critical";

  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.035, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center pt-3 w-6 shrink-0">
        <motion.div
          className={`h-2 w-2 rounded-full ${config.dot} shrink-0`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.035 + 0.1, type: "spring", stiffness: 500 }}
          style={{ boxShadow: isCritical ? "0 0 10px 2px hsl(347 77% 52% / 0.5)" : `0 0 6px 1px currentColor` }}
        />
        <div className="w-px flex-1 bg-gradient-to-b from-border/40 to-transparent mt-1.5" />
      </div>

      {/* Card */}
      <motion.div
        className={`flex-1 rounded-xl border ${config.border} ${config.accent} mb-2 cursor-pointer transition-all duration-300 overflow-hidden ${isCritical ? "ring-1 ring-activity-critical/15" : ""}`}
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.985 }}
      >
        <div className="px-3 py-2.5 flex items-center gap-2">
          {/* Time */}
          <span className={`font-mono text-[11px] font-semibold ${config.text} shrink-0 w-[72px] sm:w-[88px]`}>
            {item.time}
          </span>

          {/* Type badge */}
          <span className={`font-mono text-[8px] tracking-[0.15em] ${config.text} opacity-60 shrink-0 hidden sm:block`}>
            {config.label}
          </span>

          {/* Title */}
          <span className={`text-sm font-medium truncate flex-1 ${isCritical ? "text-activity-critical" : ""}`}>
            {item.title}
          </span>

          {/* Expand arrow */}
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-3 pt-1 border-t border-border/20">
                {item.who && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.who.split(/[+,]/).map((person, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-card/80 text-muted-foreground border border-border/30">
                        {person.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TimelineCard;
