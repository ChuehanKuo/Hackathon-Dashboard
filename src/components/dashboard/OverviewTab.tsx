import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
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

const EVENT_DAY1 = new Date("2026-04-10T00:00:00+08:00");
const EVENT_DAY2 = new Date("2026-04-11T00:00:00+08:00");
const EVENT_END = new Date("2026-04-11T23:59:59+08:00");

function parseTime(timeStr: string): { start: number; end: number } | null {
  const match = timeStr.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const startHour = parseInt(match[1]);
  const startMin = parseInt(match[2]);
  const start = startHour * 60 + startMin;

  const endMatch = timeStr.match(/-(\d{1,2}):(\d{2})/);
  if (endMatch) {
    const endHour = parseInt(endMatch[1]);
    const endMin = parseInt(endMatch[2]);
    return { start, end: endHour * 60 + endMin };
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const OverviewTab = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const eventDay = getEventDay();
  const currentMin = getCurrentMinute();
  const schedule = eventDay === "day2" ? day2Schedule : day1Schedule;
  const { current, next } = findCurrentAndNext(schedule, currentMin);

  const timeStr = now.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
      {/* Clock + Status */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl glass-card-strong p-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-activity-pitch/[0.04] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase">
              {eventDay === "pre" ? "EVENT NOT STARTED" : eventDay === "post" ? "EVENT ENDED" : eventDay === "day1" ? "DAY 1 LIVE" : "DAY 2 LIVE"}
            </span>
          </div>
          <div className="text-5xl font-bold tracking-tighter font-mono gradient-text mb-1">
            {timeStr}
          </div>
          <p className="text-xs text-muted-foreground">
            {eventDay === "pre" && "活動尚未開始 — 4/10（五）08:00 報到"}
            {eventDay === "day1" && "Day 1 — 4 月 10 日（週五）"}
            {eventDay === "day2" && "Day 2 — 4 月 11 日（週六）"}
            {eventDay === "post" && "活動已結束 — 感謝所有人！"}
          </p>
        </div>
      </motion.div>

      {/* Current Activity */}
      {(eventDay === "day1" || eventDay === "day2") && current && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2 px-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            NOW
          </p>
          <div className={`rounded-xl border p-4 ${typeColors[current.type]}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs opacity-70 mb-1">{current.time}</p>
                <h3 className="text-lg font-bold">{current.title}</h3>
                {current.who && (
                  <p className="text-xs mt-1 opacity-80">👤 {current.who}</p>
                )}
                <p className="text-xs mt-2 opacity-60 leading-relaxed">{current.details}</p>
              </div>
              <Zap className="h-5 w-5 opacity-40 shrink-0 mt-1" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Next Up */}
      {(eventDay === "day1" || eventDay === "day2") && next && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2 px-1 flex items-center gap-2">
            <ChevronRight className="h-3 w-3" />
            NEXT UP
          </p>
          <div className="rounded-xl glass-card p-4">
            <div className="flex items-start gap-3">
              <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${typeDots[next.type]}`} />
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">{next.time}</p>
                <h3 className="text-sm font-semibold">{next.title}</h3>
                {next.who && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">👤 {next.who}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pre-event: key info */}
      {eventDay === "pre" && (
        <>
          <motion.div variants={item} className="rounded-xl glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <p className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">KEY REMINDERS</p>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary">•</span> 報到：08:00–09:00（4 組號碼牌）</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span> HSIL 全球直播：10:00–10:30（Zoom）</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span> Day 2 簡報截止：12:00 HARD DEADLINE</li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span> 201 講堂禁食 — 午餐在 60 人教室</li>
            </ul>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-2">
            {[
              { label: "參賽者", value: "137" },
              { label: "預估團隊", value: "~42" },
              { label: "評審", value: "3-4" },
              { label: "指導老師", value: "3" },
            ].map((s, i) => (
              <div key={i} className="rounded-lg bg-card p-3 text-center">
                <div className="text-xl font-bold tracking-tighter">{s.value}</div>
                <div className="text-[9px] text-muted-foreground font-mono tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </>
      )}

      {/* Post-event */}
      {eventDay === "post" && (
        <motion.div variants={item} className="rounded-xl glass-card p-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-1">活動圓滿結束！</h3>
          <p className="text-sm text-muted-foreground">感謝所有評審、指導老師、工作人員與參賽者。</p>
        </motion.div>
      )}

      {/* Upcoming list (for live days) */}
      {(eventDay === "day1" || eventDay === "day2") && (
        <motion.div variants={item}>
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2 px-1">UPCOMING</p>
          <div className="space-y-1.5">
            {schedule
              .filter((s) => {
                const parsed = parseTime(s.time);
                return parsed && parsed.start > currentMin;
              })
              .slice(0, 5)
              .map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg bg-card/40 border border-border/20 px-3 py-2"
                >
                  <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${typeDots[s.type]}`} />
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-20">{s.time.split("-")[0]}</span>
                  <span className="text-xs truncate">{s.title}</span>
                  {s.who && <span className="text-[9px] text-muted-foreground ml-auto shrink-0 hidden sm:block">{s.who}</span>}
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OverviewTab;
