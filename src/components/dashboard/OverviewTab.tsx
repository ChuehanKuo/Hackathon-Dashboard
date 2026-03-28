import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Award, UserCheck, Sparkles, Clock } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stats = [
  { value: "137", label: "參賽者", icon: Users, color: "from-primary to-sky-400" },
  { value: "~42", label: "團隊", icon: Sparkles, color: "from-activity-pitch to-purple-400" },
  { value: "3-4", label: "評審", icon: Award, color: "from-activity-break to-amber-400" },
  { value: "2", label: "天", icon: Clock, color: "from-activity-setup to-emerald-400" },
];

const keyDecisions = [
  { item: "工作空間", decision: "201 講堂" },
  { item: "簡報格式", decision: "3 min + 30s Q&A" },
  { item: "評分", decision: "紙本 · 2 人統計" },
  { item: "報到", decision: "4 組號碼牌" },
  { item: "Keynote", decision: "哈佛預錄影片" },
  { item: "證書", decision: "Day 1 後印" },
];

const judges = [
  { name: "李達宇", role: "NTU 健管所教授" },
  { name: "王彥雯", role: "NTU HDAS" },
  { name: "王佳惠", role: "台杉投資協理" },
  { name: "郭昶甫", role: "確認中" },
];

const mentors = [
  { name: "杜維州", role: "" },
  { name: "林嶔", role: "" },
  { name: "劉致宏", role: "Microsoft Taiwan" },
];

const OverviewTab = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass-card-strong p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-activity-pitch/[0.06] pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.05] rounded-full blur-[60px]" />
        
        <div className="relative z-10">
          <p className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase mb-2">EVENT BRIEF</p>
          <h2 className="text-2xl font-bold tracking-tighter mb-1">HSIL Hackathon 2026</h2>
          <p className="text-sm text-muted-foreground mb-4">台灣站 · 台大公衛學院 201 講堂</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3 text-primary" />
              4/10–11
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-activity-critical" />
              204席
            </span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="h-3 w-3 text-activity-setup" />
              5-6 staff
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div variants={item} className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="stat-glow rounded-xl bg-card p-3 text-center cursor-default"
          >
            <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${s.color} mb-2`}>
              <s.icon className="h-3.5 w-3.5 text-background" />
            </div>
            <div className="text-xl font-bold tracking-tighter font-display">{s.value}</div>
            <div className="text-[9px] text-muted-foreground font-mono tracking-wider uppercase mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Decisions — compact chips */}
      <motion.div variants={item}>
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2 px-1">DECISIONS</p>
        <div className="grid grid-cols-2 gap-1.5">
          {keyDecisions.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="flex items-center gap-2 rounded-lg bg-card/60 border border-border/30 px-3 py-2"
            >
              <span className="text-[10px] font-mono text-primary/60 shrink-0">{row.item}</span>
              <span className="text-xs text-foreground/80 truncate">{row.decision}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* People — horizontal compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div variants={item} className="rounded-xl glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-activity-pitch animate-pulse-glow" />
            <p className="font-mono text-[10px] text-activity-pitch tracking-[0.15em] uppercase">評審 · Day 2</p>
          </div>
          <div className="space-y-2">
            {judges.map((j, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-2.5 group cursor-default"
              >
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-activity-pitch/25 to-activity-pitch/5 flex items-center justify-center text-activity-pitch text-[11px] font-bold border border-activity-pitch/15 group-hover:border-activity-pitch/40 transition-colors">
                  {j.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{j.name}</p>
                  {j.role && <p className="text-[10px] text-muted-foreground truncate">{j.role}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 w-1.5 rounded-full bg-activity-session animate-pulse-glow" />
            <p className="font-mono text-[10px] text-activity-session tracking-[0.15em] uppercase">指導老師 · Day 1</p>
          </div>
          <div className="space-y-2">
            {mentors.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ x: 3 }}
                className="flex items-center gap-2.5 group cursor-default"
              >
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-activity-session/25 to-activity-session/5 flex items-center justify-center text-activity-session text-[11px] font-bold border border-activity-session/15 group-hover:border-activity-session/40 transition-colors">
                  {m.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{m.name}</p>
                  {m.role && <p className="text-[10px] text-muted-foreground truncate">{m.role}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
