import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Monitor, Coffee, CheckCircle2 } from "lucide-react";

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const sections: ChecklistSection[] = [
  {
    title: "文件 / 印刷品",
    icon: <FileText className="h-4 w-4 text-activity-session" />,
    items: [
      "名牌（137 + 備用），按 4 組號碼分裝",
      "參賽者手冊（時程 + 評分標準 + WiFi + 聯絡方式）",
      "團隊登記表",
      "紙本評分表（每隊 1 張 × 4 評審 = ~170 張）",
      "簡報順序看板",
      "證書：參賽者（Day 1 後印）、獲獎模板（3 份）",
      "指示牌：捷運→大樓→201→用餐教室、WiFi、時程表、「簡報 12:00 截止」",
    ],
  },
  {
    title: "AV 設備",
    icon: <Monitor className="h-4 w-4 text-activity-pitch" />,
    items: [
      "主筆電 + 充電器",
      "備用筆電 + 充電器",
      "HDMI + USB-C 轉接頭",
      "無線麥克風 + 備用電池",
      "可攜式音響（備用）",
      "計時器顯示裝置",
      "USB 隨身碟（簡報備份）",
      "延長線 + 多孔插座",
    ],
  },
  {
    title: "餐飲",
    icon: <Coffee className="h-4 w-4 text-activity-break" />,
    items: [
      "咖啡/茶 + 點心（走廊，兩天）",
      "杯子、餐巾紙",
      "午餐由參賽者自行安排",
    ],
  },
];

const STORAGE_KEY = "hsil-checklist";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-5">
      {/* Progress */}
      <motion.div variants={cardItem} className="glass-card rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {allDone ? (
              <CheckCircle2 className="h-5 w-5 text-activity-setup" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                {Math.round(progress)}
              </div>
            )}
            <span className="text-sm font-medium">
              {allDone ? "全部完成！🎉" : "準備進度"}
            </span>
          </div>
          <span className="text-sm font-mono text-muted-foreground">{checkedCount}/{totalItems}</span>
        </div>
        <div className="h-2 bg-accent rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-activity-setup"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {sections.map((section) => (
        <motion.div key={section.title} variants={cardItem}>
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {section.items.map((item, i) => {
                const key = `${section.title}-${item}`;
                const isChecked = !!checked[key];
                return (
                  <motion.label
                    key={key}
                    className="flex items-start gap-3 cursor-pointer group py-2 px-2 rounded-lg hover:bg-accent/30 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.03 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleItem(key)}
                      className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <span
                      className={`text-sm transition-all duration-300 ${
                        isChecked
                          ? "line-through text-muted-foreground/40"
                          : "text-foreground"
                      }`}
                    >
                      {item}
                    </span>
                  </motion.label>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChecklistTab;
