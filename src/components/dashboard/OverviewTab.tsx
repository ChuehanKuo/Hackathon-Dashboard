import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, AlertTriangle, CheckCircle2, Zap, Timer, Users, TrendingUp, Bell } from "lucide-react";
import { day1Schedule, day2Schedule, TimelineItem } from "@/data/schedule";

const typeColors: Record<string, string> = {
  setup: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  session: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  break: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  critical: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  pitch: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  networking: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const typeDots: Record<string, string> = {
  setup: "bg-emerald-400",
  session: "bg-sky-400",
  break: "bg-amber-400",
  critical: "bg-rose-400",
  pitch: "bg-violet-400",
  networking: "bg-cyan-400",
};

const helperColors: Record<string, string> = {
  "A": "text-sky-400 bg-sky-500/15 border-sky-500/25",
  "B": "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  "C": "text-violet-400 bg-violet-500/15 border-violet-500/25",
  "D": "text-amber-400 bg-amber-500/15 border-amber-500/25",
  "E": "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
  "F": "text-rose-400 bg-rose-500/15 border-rose-500/25",
  "Chuehan": "text-primary bg-primary/15 border-primary/25",
};

const helperNames: Record<string, string> = {
  "A": "Co-MC / 計時",
  "B": "報到 / 後勤",
  "C": "AV / 技術",
  "D": "攝影",
  "E": "巡場 / 配對",
  "F": "茶點 / 物資",
  "Chuehan": "負責人",
};

const EVENT_DAY1_START = new Date("2026-04-10T07:00:00+08:00");
const EVENT_DAY1_END = new Date("2026-04-10T17:30:00+08:00");
const EVENT_DAY2_START = new Date("2026-04-11T07:30:00+08:00");
const EVENT_DAY2_END = new Date("2026-04-11T17:00:00+08:00");
const EVENT_DAY1 = new Date("2026-04-10T00:00:00+08:00");
const EVENT_DAY2 = new Date("2026-04-11T00:00:00+08:00");
const EVENT_END = new Date("2026-04-11T23:59:59+08:00");

// Pre-event deadlines
const preEventDeadlines = [
  { date: new Date("2026-04-01T00:00:00+08:00"), label: "發送錄取通知", done: false },
  { date: new Date("2026-04-02T00:00:00+08:00"), label: "發送 Slack 邀請", done: false },
  { date: new Date("2026-04-07T20:00:00+08:00"), label: "線上說明會 #1", done: false },
  { date: new Date("2026-04-08T20:00:00+08:00"), label: "線上說明會 #2", done: false },
  { date: new Date("2026-04-09T00:00:00+08:00"), label: "最終提醒信", done: false },
  { date: new Date("2026-04-10T07:00:00+08:00"), label: "Day 1 開始！", done: false },
];

function parseTime(timeStr: string): { start: number; end: number } | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const startHour = parseInt(match[1]);
  const startMin = parseInt(match[2]);
  const start = startHour * 60 + startMin;
  const endMatch = timeStr.match(/-(\d{1,2}):(\d{2})/);
  if (endMatch) {
    return { start, end: parseInt(endMatch[1]) * 60 + parseInt(endMatch[2]) };
  }
  return { start, end: start + 10 };
}

function getCurrentMinute(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getEventDay(): "pre" | "day1" | "day2" | "post" {
  const now = new Date();
  if (now < EVENT_DAY1) return "pre";
  if (now < EVENT_DAY2) return "day1";
  if (now <= EVENT_END) return "day2";
  return "post";
}

function getDayProgress(eventDay: "day1" | "day2"): number {
  const now = new Date();
  const start = eventDay === "day1" ? EVENT_DAY1_START : EVENT_DAY2_START;
  const end = eventDay === "day1" ? EVENT_DAY1_END : EVENT_DAY2_END;
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.max(0, Math.min(100, (elapsed / total) * 100));
}

function findCurrentAndNext(schedule: TimelineItem[], currentMin: number) {
  let current: TimelineItem | null = null;
  let next: TimelineItem | null = null;
  for (let i = 0; i < schedule.length; i++) {
    const parsed = parseTime(schedule[i].time);
    if (!parsed) continue;
    if (currentMin >= parsed.start && currentMin < parsed.end) {
      current = schedule[i];
      next = schedule[i + 1] || null;
      break;
    }
    if (currentMin < parsed.start) {
      next = schedule[i];
      break;
    }
  }
  return { current, next };
}

function extractHelpers(who: string): string[] {
  const helpers: string[] = [];
  if (who.includes("Chuehan")) helpers.push("Chuehan");
  const helperMatch = who.match(/Helper\s+([A-F])/g);
  if (helperMatch) {
    helperMatch.forEach(m => {
      const letter = m.replace("Helper ", "");
      helpers.push(letter);
    });
  }
  if (who === "全體") helpers.push("A", "B", "C", "D", "E", "Chuehan");
  return helpers;
}

function getHelperDuties(schedule: TimelineItem[], currentMin: number): { helper: string; duty: string }[] {
  const duties: { helper: string; duty: string }[] = [];
  for (const item of schedule) {
    const parsed = parseTime(item.time);
    if (!parsed) continue;
    if (currentMin >= parsed.start && currentMin < parsed.end && item.who) {
      const helpers = extractHelpers(item.who);
      helpers.forEach(h => {
        duties.push({ helper: h, duty: item.title });
      });
    }
  }
  return duties;
}

function getCountdown(target: Date): { days: number; hours: number; mins: number } {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
  };
}

// Check for upcoming critical items within 15 min
function getAlerts(schedule: TimelineItem[], currentMin: number): TimelineItem[] {
  return schedule.filter(item => {
    if (item.type !== "critical") return false;
    const parsed = parseTime(item.time);
    if (!parsed) return false;
    const minsUntil = parsed.start - currentMin;
    return minsUntil > 0 && minsUntil <= 15;
  });
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } },
};

const OverviewTab = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  const eventDay = getEventDay();
  const currentMin = getCurrentMinute();
  const schedule = eventDay === "day2" ? day2Schedule : day1Schedule;
  const { current, next } = findCurrentAndNext(schedule, currentMin);
  const timeStr = now.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });
  const isLive = eventDay === "day1" || eventDay === "day2";
  const progress = isLive ? getDayProgress(eventDay as "day1" | "day2") : 0;
  const helperDuties = isLive ? getHelperDuties(schedule, currentMin) : [];
  const alerts = isLive ? getAlerts(schedule, currentMin) : [];
  const countdown = getCountdown(EVENT_DAY1_START);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">

      {/* Clock + Status Header */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass-card-strong p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-activity-pitch/[0.04] pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              )}
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                {eventDay === "pre" ? "STANDBY" : eventDay === "post" ? "COMPLETE" : eventDay === "day1" ? "DAY 1 LIVE" : "DAY 2 LIVE"}
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold tracking-tighter font-mono gradient-text">
              {timeStr}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {eventDay === "pre" && `Day 1 倒數 ${countdown.days} 天 ${countdown.hours} 時 ${countdown.mins} 分`}
              {eventDay === "day1" && "4 月 10 日（週五）"}
              {eventDay === "day2" && "4 月 11 日（週六）"}
              {eventDay === "post" && "活動已結束"}
            </p>
          </div>
          {isLive && (
            <div className="text-right">
              <p className="text-3xl font-bold text-primary font-mono">{Math.round(progress)}%</p>
              <p className="text-[9px] text-muted-foreground font-mono tracking-wider">PROGRESS</p>
            </div>
          )}
        </div>
        {isLive && (
          <div className="mt-3 h-1.5 bg-accent/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-activity-session to-activity-pitch"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        )}
      </motion.div>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <motion.div variants={item}>
          {alerts.map((a, i) => {
            const parsed = parseTime(a.time);
            const minsUntil = parsed ? parsed.start - currentMin : 0;
            return (
              <div key={i} className="rounded-xl bg-rose-500/15 border border-rose-500/30 p-3 flex items-center gap-3 animate-pulse">
                <Bell className="h-4 w-4 text-rose-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-rose-400">{minsUntil} 分鐘後：{a.title}</p>
                  <p className="text-[10px] text-rose-400/70">{a.details}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Current Activity */}
      {isLive && current && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1.5 px-1 flex items-center gap-2">
            <Zap className="h-3 w-3 text-primary" />
            NOW
          </p>
          <div className={`rounded-xl border p-4 ${typeColors[current.type]}`}>
            <p className="font-mono text-xs opacity-70 mb-1">{current.time}</p>
            <h3 className="text-lg font-bold">{current.title}</h3>
            {current.who && <p className="text-xs mt-1 opacity-80">👤 {current.who}</p>}
            <p className="text-xs mt-2 opacity-60 leading-relaxed">{current.details}</p>
          </div>
        </motion.div>
      )}

      {/* Helper Duty Board */}
      {isLive && helperDuties.length > 0 && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1.5 px-1 flex items-center gap-2">
            <Users className="h-3 w-3" />
            WHO DOES WHAT RIGHT NOW
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {helperDuties.map((d, i) => {
              const colorClass = helperColors[d.helper] || "text-muted-foreground bg-card/60 border-border/30";
              const name = helperNames[d.helper] || d.helper;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={`rounded-lg border p-2.5 ${colorClass}`}
                >
                  <p className="font-mono text-[10px] font-bold tracking-wider">
                    {d.helper === "Chuehan" ? "CH" : d.helper}
                  </p>
                  <p className="text-[9px] opacity-60 mb-1">{name}</p>
                  <p className="text-xs font-medium">{d.duty}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Next Up */}
      {isLive && next && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1.5 px-1 flex items-center gap-2">
            <ChevronRight className="h-3 w-3" />
            NEXT
          </p>
          <div className="rounded-xl glass-card p-3">
            <div className="flex items-start gap-3">
              <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${typeDots[next.type]}`} />
              <div className="flex-1">
                <p className="font-mono text-[10px] text-muted-foreground">{next.time}</p>
                <h3 className="text-sm font-semibold">{next.title}</h3>
                {next.who && <p className="text-[10px] text-muted-foreground mt-0.5">👤 {next.who}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upcoming 5 */}
      {isLive && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1.5 px-1">UPCOMING</p>
          <div className="space-y-1">
            {schedule
              .filter(s => {
                const parsed = parseTime(s.time);
                return parsed && parsed.start > currentMin;
              })
              .slice(1, 6) // skip "next" (already shown above), show 5 after
              .map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="flex items-center gap-3 rounded-lg bg-card/30 border border-border/15 px-3 py-2"
                >
                  <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${typeDots[s.type]}`} />
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-16">{s.time.split("-")[0]}</span>
                  <span className="text-xs truncate flex-1">{s.title}</span>
                  {s.who && <span className="text-[9px] text-muted-foreground shrink-0 hidden sm:block">{s.who}</span>}
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* PRE-EVENT VIEW */}
      {eventDay === "pre" && (
        <>
          {/* Countdown — hero block */}
          <motion.div variants={item} className="relative rounded-2xl glass-card-strong overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-primary/40 via-activity-pitch/30 to-activity-networking/40 -z-[1]" style={{ animation: "spin 8s linear infinite", backgroundSize: "200% 200%" }} />
            
            {/* Orbiting particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/60"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -30 - Math.random() * 30],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 p-6 pb-5">
              {/* Label */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary/80 flex items-center gap-1.5">
                  <Timer className="h-3 w-3" />
                  LAUNCH IN
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
              </div>

              {/* Digit cards */}
              <div className="flex items-center justify-center gap-3">
                {[
                  { value: countdown.days, label: "DAYS", color: "from-primary to-activity-session" },
                  { value: countdown.hours, label: "HRS", color: "from-activity-pitch to-primary" },
                  { value: countdown.mins, label: "MIN", color: "from-activity-networking to-activity-pitch" },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {/* Glow behind card */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${c.color} opacity-15 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    <div className="relative rounded-2xl glass-card stat-glow px-5 sm:px-8 py-4 sm:py-5 text-center min-w-[80px] sm:min-w-[100px]">
                      {/* Top shine line */}
                      <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                      
                      <motion.p
                        key={c.value}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="text-4xl sm:text-5xl font-bold font-mono gradient-text leading-none"
                      >
                        {String(c.value).padStart(2, "0")}
                      </motion.p>
                      <p className="text-[9px] text-muted-foreground font-mono tracking-[0.2em] mt-2">{c.label}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Separators */}
              </div>

              {/* Target date */}
              <motion.p
                className="text-center text-[11px] text-muted-foreground/60 font-mono mt-4 tracking-wider"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                2026 / 04 / 10 — 07:00 TST
              </motion.p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-4 gap-2">
            {[
              { value: "137", label: "報名", icon: Users },
              { value: "~42", label: "團隊", icon: TrendingUp },
              { value: "4", label: "評審", icon: CheckCircle2 },
              { value: "3", label: "導師", icon: Zap },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2, scale: 1.03 }}
                className="rounded-xl glass-card stat-glow p-3 text-center card-hover"
              >
                <s.icon className="h-3.5 w-3.5 text-primary mx-auto mb-1.5" />
                <p className="text-lg font-bold tracking-tighter gradient-text">{s.value}</p>
                <p className="text-[8px] text-muted-foreground font-mono tracking-wider uppercase">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">UPCOMING DEADLINES</span>
            </div>
            <div className="p-3 space-y-1">
              {preEventDeadlines.map((d, i) => {
                const isPast = new Date() > d.date;
                const isToday = d.date.toDateString() === new Date().toDateString();
                return (
                  <div key={i} className={`flex items-center gap-3 px-2 py-2 rounded-lg ${isToday ? 'bg-primary/10 border border-primary/20' : ''}`}>
                    <div className={`h-2 w-2 rounded-full shrink-0 ${isPast ? 'bg-emerald-400' : isToday ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-12">
                      {d.date.getMonth() + 1}/{d.date.getDate()}
                    </span>
                    <span className={`text-xs ${isPast ? 'line-through text-muted-foreground/40' : isToday ? 'text-primary font-semibold' : ''}`}>
                      {d.label}
                    </span>
                    {isPast && <CheckCircle2 className="h-3 w-3 text-emerald-400 ml-auto" />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Key Reminders */}
          <motion.div variants={item} className="rounded-xl glass-card p-4">
            <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-2">REMEMBER</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary">•</span>報到：4 組號碼牌（#1-35, #36-70, #71-105, #106-137）</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>HSIL 全球直播：4/10 10:00–10:30（Zoom）</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>Day 2 簡報截止：12:00 HARD DEADLINE</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>201 禁食 — 午餐在 60 人教室</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span>評審 Day 2 12:00 到場說明</li>
            </ul>
          </motion.div>
        </>
      )}

      {/* POST-EVENT */}
      {eventDay === "post" && (
        <motion.div variants={item} className="rounded-xl glass-card p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-1">活動圓滿結束！</h3>
          <p className="text-sm text-muted-foreground">感謝所有評審、指導老師、工作人員與參賽者。</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OverviewTab;
