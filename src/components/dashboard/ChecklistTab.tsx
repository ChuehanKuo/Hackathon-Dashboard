import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Monitor, Coffee } from "lucide-react";

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const sections: ChecklistSection[] = [
  {
    title: "文件 / 印刷品",
    icon: <FileText className="h-4 w-4" />,
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
    icon: <Monitor className="h-4 w-4" />,
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
    icon: <Coffee className="h-4 w-4" />,
    items: [
      "咖啡/茶 + 點心（走廊，兩天）",
      "杯子、餐巾紙",
      "午餐由參賽者自行安排",
    ],
  },
];

const STORAGE_KEY = "hsil-checklist";

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

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / totalItems) * 100}%` }}
          />
        </div>
        <span className="font-mono">{checkedCount}/{totalItems}</span>
      </div>

      {sections.map((section) => (
        <Card key={section.title} className="bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              {section.icon}
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {section.items.map((item) => {
              const key = `${section.title}-${item}`;
              return (
                <label
                  key={key}
                  className="flex items-start gap-3 cursor-pointer group py-1"
                >
                  <Checkbox
                    checked={!!checked[key]}
                    onCheckedChange={() => toggleItem(key)}
                    className="mt-0.5"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      checked[key] ? "line-through text-muted-foreground/50" : "text-foreground"
                    }`}
                  >
                    {item}
                  </span>
                </label>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChecklistTab;
