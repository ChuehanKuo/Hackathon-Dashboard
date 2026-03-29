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
  { name: "問題定義", en: "Challenge", score: 5, desc: "問題是否清楚、根因是否掌握、是否具急迫性" },
  { name: "技術與創新", en: "Tech & Innovation", score: 5, desc: "方案是否新穎、是否有潛力改善健康系統" },
  { name: "實施可行性", en: "Implementation", score: 5, desc: "是否考慮障礙、商業模式、利害關係人" },
  { name: "團隊", en: "Team", score: 5, desc: "技能組合與執行態度" },
  { name: "簡報", en: "Pitch", score: 5, desc: "表達清晰度、視覺輔助、下一步計畫" },
  { name: "問答", en: "Q&A", score: 5, desc: "能否回應評審提問並捍衛方案" },
];

const teamRules = [
  "團隊人數：2–5 人（理想 3–5）",
  "每人僅能參加一隊",
  "Day 1 結束（17:30）後團隊定案 — Day 2 不可更動",
  "Day 1 有人退出 → 可替補；Day 2 退出 → 不替補，繼續比賽",
  "可使用既有想法（HSIL 官方政策）",
  "不同隊選同賽道 / 類似方案皆可",
];

const pitchRules = [
  "簡報語言：中文或英文，團隊自選",
  "簡報格式：PPT / Google Slides / Canva / Keynote 皆可，需匯出為 PDF",
  "時間：3 分鐘簡報 + 30 秒 Q&A + 30 秒緩衝 = 4 分鐘",
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
          <span className="ml-auto font-mono text-xs text-primary font-bold">30 分</span>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {judgingCriteria.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-lg bg-card/60 border border-border/30 p-3 text-center cursor-default"
              >
                <div className="relative mx-auto w-10 h-10 mb-2">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <circle
                      cx="20" cy="20" r="16" fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray={`${16 * 2 * Math.PI}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">{c.score}</span>
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
              <p className="text-lg font-bold text-sky-400">0:30</p>
              <p className="text-[9px] text-muted-foreground">Q&A</p>
            </div>
            <span className="text-muted-foreground/30">+</span>
            <div className="flex-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 p-2 text-center">
              <p className="text-lg font-bold text-emerald-400">0:30</p>
              <p className="text-[9px] text-muted-foreground">緩衝</p>
            </div>
            <span className="text-muted-foreground/30">=</span>
            <div className="flex-1 rounded-lg bg-primary/15 border border-primary/20 p-2 text-center">
              <p className="text-lg font-bold text-primary">4:00</p>
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
