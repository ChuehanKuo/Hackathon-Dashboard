import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Award, UserCheck, Sparkles } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
};

const stats = [
  { label: "報名人數", value: "137", sub: "人", icon: Users, color: "from-primary to-sky-400" },
  { label: "團隊數", value: "~42", sub: "隊", icon: Sparkles, color: "from-activity-pitch to-purple-400" },
  { label: "評審", value: "3-4", sub: "位", icon: Award, color: "from-activity-break to-amber-400" },
  { label: "工作人員", value: "5-6", sub: "位", icon: UserCheck, color: "from-activity-setup to-emerald-400" },
];

const keyDecisions = [
  { item: "工作空間", decision: "201 講堂（團隊坐鄰近座位群）" },
  { item: "餐飲", decision: "走廊茶點站 + 60 人教室午餐（1.5 hr）" },
  { item: "簡報格式", decision: "每隊 4 分鐘（3 分鐘簡報 + 30 秒 Q&A + 30 秒緩衝）" },
  { item: "評分方式", decision: "紙本評分表，2 人手動統計" },
  { item: "報到", decision: "4 組號碼牌（#1-35, #36-70, #71-105, #106-137）" },
  { item: "Keynote", decision: "兩天皆為哈佛預錄影片（Day 2 選看）" },
  { item: "證書", decision: "Day 1 後印參賽證書；獲獎證書 Day 2 填寫" },
];

const judges = [
  { name: "李達宇", title: "NTU 健管所教授" },
  { name: "王彥雯", title: "NTU HDAS" },
  { name: "王佳惠", title: "台杉生技基金投資協理" },
  { name: "郭昶甫", title: "（確認中）" },
];

const mentors = [
  { name: "杜維州", title: "" },
  { name: "林嶔", title: "" },
  { name: "劉致宏", title: "Microsoft Taiwan 總監" },
];

const OverviewTab = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Hero Event Card */}
      <motion.div variants={item}>
        <Card className="glass-card overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-activity-pitch/10 pointer-events-none" />
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              HSIL Hackathon 2026 台灣站
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                4/10（五）– 4/11（六）
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                台大公衛學院 201 講堂
              </span>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="rounded-xl bg-accent/50 border border-border/50 p-3 text-center card-hover"
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${s.color} mb-2 shadow-lg`}>
                    <s.icon className="h-4 w-4 text-background" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Decisions */}
      <motion.div variants={item}>
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">🔑 關鍵決定</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">項目</th>
                    <th className="text-left p-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">決定</th>
                  </tr>
                </thead>
                <tbody>
                  {keyDecisions.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="border-b border-border/30 last:border-0 hover:bg-accent/30 transition-colors"
                    >
                      <td className="p-3 font-medium whitespace-nowrap text-foreground">{row.item}</td>
                      <td className="p-3 text-muted-foreground">{row.decision}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* People */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="glass-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge className="bg-activity-pitch/20 text-activity-pitch border-activity-pitch/30 shadow-sm shadow-activity-pitch/20">Day 2</Badge>
                評審
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {judges.map((j, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-activity-pitch/30 to-activity-pitch/10 flex items-center justify-center text-activity-pitch text-sm font-bold border border-activity-pitch/20 group-hover:shadow-lg group-hover:shadow-activity-pitch/10 transition-shadow">
                    {j.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{j.name}</p>
                    {j.title && <p className="text-xs text-muted-foreground">{j.title}</p>}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glass-card h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Badge className="bg-activity-session/20 text-activity-session border-activity-session/30 shadow-sm shadow-activity-session/20">Day 1</Badge>
                指導老師
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentors.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-activity-session/30 to-activity-session/10 flex items-center justify-center text-activity-session text-sm font-bold border border-activity-session/20 group-hover:shadow-lg group-hover:shadow-activity-session/10 transition-shadow">
                    {m.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    {m.title && <p className="text-xs text-muted-foreground">{m.title}</p>}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
