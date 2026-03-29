import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Monitor, Coffee, PartyPopper, ClipboardCheck } from "lucide-react";

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const sections: ChecklistSection[] = [
  {
    title: "活動前確認",
    icon: <ClipboardCheck className="h-3.5 w-3.5 text-activity-critical" />,
    items: [
      "場地走一遍（4/9 傍晚）",
      "Zoom 連結測試",
      "Google Drive 資料夾建立 + 測試上傳",
      "WiFi 密碼確認",
      "冷氣確認（Day 2 週六）",
      "用餐教室確認（215?）",
      "建築出入時間確認",
      "急救包準備",
      "Keynote 影片下載 + 測試播放",
    ],
  },
  {
    title: "文件 / 印刷品",
    icon: <FileText className="h-3.5 w-3.5 text-activity-session" />,
    items: [
      "名牌（137 + 備用）按 4 組號碼分裝",
      "參賽者手冊（時程 + 評分 + WiFi + 聯絡方式）",
      "團隊登記表",
      "紙本評分表（每隊 1 張 × 4 評審 = ~170 張）",
      "簡報順序看板",
      "證書：參賽者（Day 1 後印）",
      "證書：獲獎模板 × 3（Day 2 填寫）",
      "評審名牌 + 評審座位標示",
      "指示牌：捷運→大樓→201→用餐教室",
      "WiFi 密碼牌（大字）",
      "時程表海報",
      "「簡報 12:00 截止」標示（Day 2 用）",
      "「徵求成員」標示牌（團隊配對用）",
      "團隊號碼籤（抽籤用）",
    ],
  },
  {
    title: "AV 設備",
    icon: <Monitor className="h-3.5 w-3.5 text-activity-pitch" />,
    items: [
      "主筆電 + 充電器",
      "備用筆電 + 充電器",
      "HDMI + USB-C 轉接頭",
      "無線麥克風 + 備用電池",
      "可攜式音響（備用）",
      "計時器顯示裝置（平板/手機）",
      "USB 隨身碟（簡報備份）",
      "延長線 × 2 + 多孔插座",
      "計時鈴/鐘（2:30 警示 + 3:00 截止）",
    ],
  },
  {
    title: "餐飲 / 物資",
    icon: <Coffee className="h-3.5 w-3.5 text-activity-break" />,
    items: [
      "咖啡/茶（兩天份）",
      "點心/餅乾（兩天份）",
      "杯子 · 餐巾紙 · 攪拌棒",
      "走廊桌子（茶點站用）",
      "垃圾袋",
      "文具：麥克筆、便利貼、白紙（每桌）",
    ],
  },
];

const STORAGE_KEY = "hsil-checklist";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const ChecklistTab = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleItem = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = (checkedCount / totalItems) * 100;
  const allDone = checkedCount === totalItems;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-4">
      {/* Progress bar */}
      <motion.div variants={cardAnim} className="rounded-xl glass-card-strong p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {allDone && <PartyPopper className="h-4 w-4 text-activity-break" />}
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              {allDone ? "ALL CLEAR" : "PREP STATUS"}
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-accent/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-activity-session to-activity-setup"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="font-mono text-[10px] text-muted-foreground mt-1.5">{checkedCount}/{totalItems} items</p>
      </motion.div>

      {sections.map((section) => {
        const sectionChecked = section.items.filter(
          (it) => checked[`${section.title}-${it}`]
        ).length;

        return (
          <motion.div key={section.title} variants={cardAnim} className="rounded-xl glass-card overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-border/20">
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="text-sm font-semibold tracking-tight">{section.title}</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {sectionChecked}/{section.items.length}
              </span>
            </div>
            <div className="p-2">
              {section.items.map((item, i) => {
                const key = `${section.title}-${item}`;
                const isChecked = !!checked[key];
                return (
                  <motion.label
                    key={key}
                    className="flex items-center gap-3 cursor-pointer py-2 px-2 rounded-lg hover:bg-accent/20 transition-colors"
                    whileTap={{ scale: 0.985 }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleItem(key)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
                    />
                    <span
                      className={`text-sm transition-all duration-300 ${
                        isChecked
                          ? "line-through text-muted-foreground/30"
                          : "text-foreground/80"
                      }`}
                    >
                      {item}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ChecklistTab;
