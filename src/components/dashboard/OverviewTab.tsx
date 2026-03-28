import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Award, UserCheck } from "lucide-react";

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
    <div className="space-y-6">
      {/* Event Info */}
      <Card className="border-primary/30 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            活動資訊
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0">活動：</span>
              <span className="font-semibold">HSIL Hackathon 2026 台灣站</span>
            </div>
            <div className="flex items-start gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>4/10（五）– 4/11（六）</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>台大公衛學院 201 講堂（204 席）</span>
            </div>
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>137 人（~42 隊）</span>
            </div>
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>評審：3-4 位｜指導老師：3 位</span>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>工作人員：5-6 位</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Decisions */}
      <Card className="bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">關鍵決定</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">項目</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">決定</th>
                </tr>
              </thead>
              <tbody>
                {keyDecisions.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-3 font-medium whitespace-nowrap">{row.item}</td>
                    <td className="p-3 text-muted-foreground">{row.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* People */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge className="bg-activity-pitch/20 text-activity-pitch border-activity-pitch/30">Day 2</Badge>
              評審
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {judges.map((j, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-activity-pitch/20 flex items-center justify-center text-activity-pitch text-sm font-bold">
                  {j.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{j.name}</p>
                  {j.title && <p className="text-xs text-muted-foreground">{j.title}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge className="bg-activity-session/20 text-activity-session border-activity-session/30">Day 1</Badge>
              指導老師
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mentors.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-activity-session/20 flex items-center justify-center text-activity-session text-sm font-bold">
                  {m.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{m.name}</p>
                  {m.title && <p className="text-xs text-muted-foreground">{m.title}</p>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
