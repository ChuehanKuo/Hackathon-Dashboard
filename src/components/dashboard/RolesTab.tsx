import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const roles = [
  {
    code: "Helper A",
    name: "Co-MC / 計時",
    gradient: "from-activity-session/20 to-activity-session/5",
    badgeClass: "bg-activity-session/20 text-activity-session border-activity-session/30 shadow-sm shadow-activity-session/20",
    borderClass: "hover:border-activity-session/30",
    tasks: ["MC 轉場", "計時鈴（2:30 警示、3:00 截止）", "Q&A 麥克風"],
  },
  {
    code: "Helper B",
    name: "報到 / 後勤",
    gradient: "from-activity-setup/20 to-activity-setup/5",
    badgeClass: "bg-activity-setup/20 text-activity-setup border-activity-setup/30 shadow-sm shadow-activity-setup/20",
    borderClass: "hover:border-activity-setup/30",
    tasks: ["報到桌", "團隊登記", "午餐協調", "評分統計"],
  },
  {
    code: "Helper C",
    name: "AV / 技術",
    gradient: "from-activity-pitch/20 to-activity-pitch/5",
    badgeClass: "bg-activity-pitch/20 text-activity-pitch border-activity-pitch/30 shadow-sm shadow-activity-pitch/20",
    borderClass: "hover:border-activity-pitch/30",
    tasks: ["投影", "麥克風", "Zoom", "簡報載入與操作"],
  },
  {
    code: "Helper D",
    name: "攝影",
    gradient: "from-activity-break/20 to-activity-break/5",
    badgeClass: "bg-activity-break/20 text-activity-break border-activity-break/30 shadow-sm shadow-activity-break/20",
    borderClass: "hover:border-activity-break/30",
    tasks: ["拍攝重要時刻", "IG 限動", "大合照", "檔案傳雲端"],
  },
  {
    code: "Helper E",
    name: "巡場 / 配對",
    gradient: "from-activity-networking/20 to-activity-networking/5",
    badgeClass: "bg-activity-networking/20 text-activity-networking border-activity-networking/30 shadow-sm shadow-activity-networking/20",
    borderClass: "hover:border-activity-networking/30",
    tasks: ["團隊配對協助", "截止提醒", "簡報叫號"],
  },
  {
    code: "Helper F",
    name: "茶點 / 物資",
    gradient: "from-activity-critical/20 to-activity-critical/5",
    badgeClass: "bg-activity-critical/20 text-activity-critical border-activity-critical/30 shadow-sm shadow-activity-critical/20",
    borderClass: "hover:border-activity-critical/30",
    tasks: ["走廊茶點站", "補充（若有第 6 人）"],
  },
];

const RolesTab = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
    >
      {roles.map((role) => (
        <motion.div key={role.code} variants={item} whileHover={{ y: -4 }}>
          <Card className={`glass-card overflow-hidden h-full transition-all duration-300 ${role.borderClass}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} pointer-events-none`} />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={role.badgeClass}>{role.code}</Badge>
                <CardTitle className="text-base">{role.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <ul className="space-y-2">
                {role.tasks.map((task, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary/40 mt-0.5">▸</span>
                    {task}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RolesTab;
