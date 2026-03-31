import { motion } from "framer-motion";
import { Scale, Users, Presentation, Brain, Shield, FileText, Building2, ClipboardCheck, UserMinus } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const judgingCriteria = [
  { name: "問題定義", en: "Problem & Framing", score: 2, desc: "問題是否清楚定義、量測與框架" },
  { name: "價值主張", en: "Value & Innovation", score: 2, desc: "方案是否新穎、價值主張是否具說服力" },
  { name: "市場機會", en: "Opportunity", score: 2, desc: "目標市場是否明確、是否有驗證需求的證據" },
  { name: "競爭分析", en: "Competition", score: 2, desc: "是否了解競爭者、差異化定位是否清楚" },
  { name: "商業模式", en: "Business Model", score: 2, desc: "商業模式是否可行、可擴展" },
  { name: "市場策略", en: "GTM Strategy", score: 2, desc: "如何觸及用戶、客戶與利害關係人" },
  { name: "資金需求", en: "Ask", score: 2, desc: "資金需求、里程碑、條件是否清楚" },
  { name: "團隊", en: "Team", score: 2, desc: "技能互補、角色分工是否明確" },
  { name: "簡報", en: "Presentation", score: 2, desc: "表達是否清晰、有信心、具說服力" },
  { name: "問答", en: "Q&A", score: 2, desc: "能否有效回應評審提問" },
];

const teamRules = [
  "團隊人數：2–5 人（理想 3–5）",
  "每人僅能參加一隊",
  "可使用既有想法（HSIL 官方政策）",
  "不同隊選同賽道 / 類似方案皆可",
  "參加資格：18 歲以上，目前居住於台灣，不限科系與背景",
];

const pitchRules = [
  "簡報語言：中文或英文，團隊自選",
  "簡報格式：PPT / Google Slides / Canva / Keynote 皆可，需匯出為 PDF",
  "時間：3 分鐘簡報 + 1.5 分鐘 Q&A + 0.5 分鐘緩衝 = 5 分鐘",
  "HSIL 標準為 8 分鐘（3+5），因團隊數多調整為 5 分鐘",
  "建議簡報 8 頁：問題→方案→市場→競爭→商模→GTM→Ask→團隊",
  "AI 工具（ChatGPT、Claude 等）可使用，無需聲明",
  "Day 1 至 Day 2 之間可遠端作業，無限制",
  "簡報截止：Day 2 12:00（上傳 PDF 至 Google Drive）",
];

const ipRules = [
  "智慧財產權 100% 歸屬團隊",
  "主辦方保留簡報副本僅供活動紀錄與 HSIL 報告，不做商業用途",
  "任何數據皆可使用（公開、私有、假設性）— 概念階段，非數據競賽",
];

const certificateInfo = [
  "所有參賽者：HSIL 官方參賽證書",
  "前三名：獲獎證書（1st / 2nd / 3rd）",
  "獲勝團隊進入 HSIL 全球 Bootcamp 培訓計畫",
  "出席政策：4 次簽到中完成 3 次即可獲得證書",
];

const RulesTab = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-4">

      {/* Judging Rubric */}
      <motion.div variants={item} className="rounded-xl glass-card-strong overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Scale className="h-3.5 w-3.5 text-violet-400" />
          <span className="font-mono text-[10px] text-violet-400 tracking-[0.15em] uppercase">JUDGING RUBRIC</span>
          <span className="ml-auto font-mono text-xs text-primary font-bold">20 分</span>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {judgingCriteria.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-lg bg-card/60 border border-border/30 p-3 text-center cursor-default"
              >
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-primary font-mono">/2</span>
                </div>
                <p className="text-xs font-semibold">{c.name}</p>
                <p className="text-[9px] text-muted-foreground italic">{c.en}</p>
                <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pitch Format */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Presentation className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">PITCH FORMAT</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 rounded-lg bg-violet-500/15 border border-violet-500/20 p-2 text-center">
              <p className="text-lg font-bold text-violet-400">3:00</p>
              <p className="text-[9px] text-muted-foreground">簡報</p>
            </div>
            <span className="text-muted-foreground/30">+</span>
            <div className="flex-1 rounded-lg bg-sky-500/15 border border-sky-500/20 p-2 text-center">
              <p className="text-lg font-bold text-sky-400">1:30</p>
              <p className="text-[9px] text-muted-foreground">Q&A</p>
            </div>
            <span className="text-muted-foreground/30">+</span>
            <div className="flex-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 p-2 text-center">
              <p className="text-lg font-bold text-emerald-400">0:30</p>
              <p className="text-[9px] text-muted-foreground">緩衝</p>
            </div>
            <span className="text-muted-foreground/30">=</span>
            <div className="flex-1 rounded-lg bg-primary/15 border border-primary/20 p-2 text-center">
              <p className="text-lg font-bold text-primary">5:00</p>
              <p className="text-[9px] text-muted-foreground">每隊</p>
            </div>
          </div>
          <div className="space-y-1">
            {pitchRules.map((r, i) => (
              <div key={i} className="flex items-start gap-2 px-1 py-1">
                <span className="text-primary text-xs mt-0.5">•</span>
                <span className="text-xs text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Rules */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Users className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-cyan-400 tracking-[0.15em] uppercase">TEAM RULES</span>
        </div>
        <div className="p-3 space-y-1">
          {teamRules.map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-cyan-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* IP & Data */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.15em] uppercase">IP & DATA</span>
        </div>
        <div className="p-3 space-y-1">
          {ipRules.map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-emerald-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <FileText className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">CERTIFICATES & PRIZES</span>
        </div>
        <div className="p-3 space-y-1">
          {certificateInfo.map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-amber-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Divider */}
      <motion.div variants={item} className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase">台灣站規則</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </motion.div>

      {/* Operations */}
      <motion.div variants={item} className="rounded-xl glass-card-strong overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Building2 className="h-3.5 w-3.5 text-rose-400" />
          <span className="font-mono text-[10px] text-rose-400 tracking-[0.15em] uppercase">活動營運 OPS</span>
        </div>
        <div className="p-3 space-y-1">
          {[
            "201 講堂禁止飲食，午餐在 60 人教室",
            "簡報截止：Day 2 12:00（HARD DEADLINE）",
            "報到方式：4 組號碼牌（#1-35, #36-70, #71-105, #106-137）",
            "評分方式：紙本評分表，2 名工作人員手動統計",
            "簡報順序：Day 1 傍晚抽籤決定",
            "評審回饋：所有簡報結束後 10 分鐘綜合回饋",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-rose-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Attendance & Certificate */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <ClipboardCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.15em] uppercase">出席與證書</span>
        </div>
        <div className="p-3 space-y-1">
          {[
            "4 次簽到（Day 1 上午/下午、Day 2 上午/下午）完成 3 次 = 可獲 HSIL 證書",
            "不限哪 3 次，由參賽者依自身時間安排",
            "不強制觀看所有簡報（隊友可代表上台）",
            "缺席需事先通知團隊和主辦方",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-emerald-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Changes */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <UserMinus className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">團隊變動規則</span>
        </div>
        <div className="p-3 space-y-1">
          {[
            "Day 1 結束（17:30）後團隊定案 — Day 2 不可更動",
            "Day 1 有人退出 → 可替補新成員",
            "Day 2 退出 → 不替補，團隊以現有成員繼續",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5">
              <span className="text-amber-400 text-xs mt-0.5">•</span>
              <span className="text-xs text-foreground/80">{r}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RulesTab;
