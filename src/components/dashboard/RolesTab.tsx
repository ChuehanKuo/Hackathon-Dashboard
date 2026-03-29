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
    code: "CH",
    name: "Chuehan — 負責人 / MC",
    color: "from-primary to-rose-500",
    borderColor: "hover:border-primary/40",
    dotColor: "bg-primary",
    tasks: ["總指揮", "MC 開幕/閉幕/頒獎", "評審聯絡", "HSIL 全球直播發言", "團隊配對引導", "決策者"],
    day1: "MC 開幕式、Zoom 台灣站發言、Hack 101、團隊自介主持、配對引導、Day 1 總結、抽籤",
    day2: "Day 2 歡迎、評審說明會、評審介紹、MC 頒獎閉幕",
  },
  {
    code: "A",
    name: "Co-MC / 計時",
    color: "from-activity-session to-sky-500",
    borderColor: "hover:border-activity-session/40",
    dotColor: "bg-activity-session",
    tasks: ["MC 轉場", "計時鈴", "Q&A 麥克風", "截止廣播"],
    day1: "Hack 101 協助、抽籤協助",
    day2: "截止提醒廣播（11:00/11:30/11:50）、簡報場次計時（2:30 警示鈴 + 3:00 截止鈴）、管理 Q&A 麥克風",
  },
  {
    code: "B",
    name: "報到 / 後勤",
    color: "from-activity-setup to-emerald-500",
    borderColor: "hover:border-activity-setup/40",
    dotColor: "bg-activity-setup",
    tasks: ["報到桌", "團隊登記", "午餐協調", "評分統計"],
    day1: "報到（4 組號碼牌）、團隊登記表收集、午餐教室協調、走廊茶點",
    day2: "Day 2 報到、發評分表給評審、收評分表、手動統計分數",
  },
  {
    code: "C",
    name: "AV / 技術",
    color: "from-activity-pitch to-purple-500",
    borderColor: "hover:border-activity-pitch/40",
    dotColor: "bg-activity-pitch",
    tasks: ["投影機", "麥克風", "Zoom", "簡報載入與操作"],
    day1: "AV 佈置測試、Keynote 影片播放、Zoom 連線操作、投影設備管理",
    day2: "12:30–13:00 載入所有簡報 PDF（勿打擾）、簡報場次操作切換、AV 故障排除",
  },
  {
    code: "D",
    name: "攝影",
    color: "from-activity-break to-amber-500",
    borderColor: "hover:border-activity-break/40",
    dotColor: "bg-activity-break",
    tasks: ["拍攝重要時刻", "IG 限動", "大合照", "檔案傳雲端"],
    day1: "拍攝報到、開幕、Zoom 畫面、團隊工作、導師諮詢，3–4 則 IG 限動",
    day2: "拍攝各隊簡報、評審反應、頒獎時刻、大合照（腳架），所有照片傳至共用雲端",
  },
  {
    code: "E",
    name: "巡場 / 配對",
    color: "from-activity-networking to-teal-500",
    borderColor: "hover:border-activity-networking/40",
    dotColor: "bg-activity-networking",
    tasks: ["配對協助", "截止提醒", "簡報叫號", "on-deck 協調"],
    day1: "團隊配對時主動接觸落單者、巡場確認團隊進度、物資補充",
    day2: "逐桌簡報截止提醒、追蹤未交簡報團隊、簡報場次叫號（下一隊 on-deck）、協助轉場",
  },
  {
    code: "F",
    name: "茶點 / 物資（第 6 人）",
    color: "from-activity-critical to-rose-500",
    borderColor: "hover:border-activity-critical/40",
    dotColor: "bg-activity-critical",
    tasks: ["走廊茶點站", "物資補充", "教室整理"],
    day1: "走廊茶點站管理、15:00 補充、午餐教室開門確認",
    day2: "茶點補充、午餐教室管理、撤場協助",
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
            <div className="flex flex-wrap gap-1.5 mb-3">
              {role.tasks.map((task, i) => (
                <span key={i} className="font-mono text-[10px] px-2 py-1 rounded-md bg-card/60 text-muted-foreground border border-border/30">
                  {task}
                </span>
              ))}
            </div>
            {(role as any).day1 && (
              <div className="space-y-1.5 text-[10px]">
                <div className="flex gap-2">
                  <span className="text-primary font-mono font-bold shrink-0 w-8">D1</span>
                  <span className="text-muted-foreground">{(role as any).day1}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-activity-pitch font-mono font-bold shrink-0 w-8">D2</span>
                  <span className="text-muted-foreground">{(role as any).day2}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RolesTab;
