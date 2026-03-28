import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const roles = [
  {
    code: "Helper A",
    name: "Co-MC / 計時",
    color: "bg-activity-session/20 text-activity-session border-activity-session/30",
    tasks: ["MC 轉場", "計時鈴（2:30 警示、3:00 截止）", "Q&A 麥克風"],
  },
  {
    code: "Helper B",
    name: "報到 / 後勤",
    color: "bg-activity-setup/20 text-activity-setup border-activity-setup/30",
    tasks: ["報到桌", "團隊登記", "午餐協調", "評分統計"],
  },
  {
    code: "Helper C",
    name: "AV / 技術",
    color: "bg-activity-pitch/20 text-activity-pitch border-activity-pitch/30",
    tasks: ["投影", "麥克風", "Zoom", "簡報載入與操作"],
  },
  {
    code: "Helper D",
    name: "攝影",
    color: "bg-activity-break/20 text-activity-break border-activity-break/30",
    tasks: ["拍攝重要時刻", "IG 限動", "大合照", "檔案傳雲端"],
  },
  {
    code: "Helper E",
    name: "巡場 / 配對",
    color: "bg-activity-networking/20 text-activity-networking border-activity-networking/30",
    tasks: ["團隊配對協助", "截止提醒", "簡報叫號"],
  },
  {
    code: "Helper F",
    name: "茶點 / 物資",
    color: "bg-activity-critical/20 text-activity-critical border-activity-critical/30",
    tasks: ["走廊茶點站", "補充（若有第 6 人）"],
  },
];

const RolesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
      {roles.map((role) => (
        <Card key={role.code} className="bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={role.color}>{role.code}</Badge>
              <CardTitle className="text-base">{role.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {role.tasks.map((task, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-muted-foreground/50 mt-1">•</span>
                  {task}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RolesTab;
