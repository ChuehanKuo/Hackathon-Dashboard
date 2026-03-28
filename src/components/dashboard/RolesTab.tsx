import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const roles = [
  {
    code: "A",
    name: "Co-MC / 計時",
    color: "from-activity-session to-sky-500",
    borderColor: "hover:border-activity-session/40",
    dotColor: "bg-activity-session",
    tasks: ["MC 轉場", "計時鈴", "Q&A 麥克風"],
  },
  {
    code: "B",
    name: "報到 / 後勤",
    color: "from-activity-setup to-emerald-500",
    borderColor: "hover:border-activity-setup/40",
    dotColor: "bg-activity-setup",
    tasks: ["報到桌", "團隊登記", "午餐協調", "評分統計"],
  },
  {
    code: "C",
    name: "AV / 技術",
    color: "from-activity-pitch to-purple-500",
    borderColor: "hover:border-activity-pitch/40",
    dotColor: "bg-activity-pitch",
    tasks: ["投影", "麥克風", "Zoom", "簡報操作"],
  },
  {
    code: "D",
    name: "攝影",
    color: "from-activity-break to-amber-500",
    borderColor: "hover:border-activity-break/40",
    dotColor: "bg-activity-break",
    tasks: ["重要時刻", "IG 限動", "大合照"],
  },
  {
    code: "E",
    name: "巡場 / 配對",
    color: "from-activity-networking to-teal-500",
    borderColor: "hover:border-activity-networking/40",
    dotColor: "bg-activity-networking",
    tasks: ["配對協助", "截止提醒", "簡報叫號"],
  },
  {
    code: "F",
    name: "茶點 / 物資",
    color: "from-activity-critical to-rose-500",
    borderColor: "hover:border-activity-critical/40",
    dotColor: "bg-activity-critical",
    tasks: ["走廊茶點站", "物資補充"],
  },
];

const RolesTab = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto"
    >
      {roles.map((role) => (
        <motion.div
          key={role.code}
          variants={item}
          whileHover={{ y: -3, scale: 1.01 }}
          className={`rounded-xl glass-card border ${role.borderColor} transition-all duration-300 overflow-hidden cursor-default`}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center text-xs font-bold text-background shadow-lg`}>
                {role.code}
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">{role.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {role.tasks.map((task, i) => (
                <span key={i} className="font-mono text-[10px] px-2 py-1 rounded-md bg-card/60 text-muted-foreground border border-border/30">
                  {task}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RolesTab;
