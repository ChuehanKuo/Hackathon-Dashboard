import { motion } from "framer-motion";
import { Phone, Wifi, MapPin, Link2, AlertTriangle, Building2, ExternalLink, Award, GraduationCap } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const emergencyContacts = [
  { label: "緊急電話", value: "119", note: "消防 / 救護車" },
  { label: "台大校安中心", value: "02-3366-9119", note: "24 小時" },
  { label: "台大醫院急診", value: "02-2312-3456", note: "中山南路 7 號" },
  { label: "院辦公室", value: "02-3366-8009", note: "phc@ntu.edu.tw" },
];

const teamContacts = [
  { label: "Chuehan（負責人）", value: "0966-625-087", note: "hsilhackathon.taiwan@gmail.com" },
  { label: "Helper A — Co-MC", value: "________", note: "" },
  { label: "Helper B — 報到", value: "________", note: "" },
  { label: "Helper C — AV", value: "________", note: "" },
  { label: "Helper D — 攝影", value: "________", note: "" },
  { label: "Helper E — 巡場", value: "________", note: "" },
];

const venueRules = [
  { rule: "201 講堂禁止飲食", icon: "🚫", detail: "飲料、食物皆不可帶入" },
  { rule: "午餐在 60 人教室（215）", icon: "🍱", detail: "借用 1.5 小時，參賽者自行安排午餐" },
  { rule: "走廊設茶點站", icon: "☕", detail: "咖啡、茶、點心在 201 外走廊" },
  { rule: "可使用走廊與大廳", icon: "✅", detail: "團隊可到走廊討論，已確認" },
  { rule: "活動後恢復原狀", icon: "🧹", detail: "需提供使用前後照片" },
];

const keyLinks = [
  { label: "Google Drive（簡報上傳）", url: "________", note: "Day 1 結束時分享連結" },
  { label: "Zoom（HSIL 全球直播）", url: "https://harvard.zoom.us/j/98535611927?pwd=Vnrxr1aiT8W9vbmDcc6JkqOD7pUMrA.1&from=addon", note: "4/10 10:00-10:30" },
  { label: "活動官網", url: "https://hsilhackathontaiwan.com", note: "" },
  { label: "HSIL 官網", url: "https://hsph.harvard.edu/research/health-systems-innovation-lab/", note: "" },
];


const InfoTab = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-4">

      {/* Emergency */}
      <motion.div variants={item} className="rounded-xl glass-card-strong overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
          <span className="font-mono text-[10px] text-rose-400 tracking-[0.15em] uppercase">EMERGENCY</span>
        </div>
        <div className="p-3 space-y-1">
          {emergencyContacts.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent/20 transition-colors">
              <Phone className="h-3 w-3 text-rose-400/60 shrink-0" />
              <span className="text-xs font-medium w-28 shrink-0">{c.label}</span>
              <a href={`tel:${c.value.replace(/-/g, '')}`} className="font-mono text-sm text-primary font-semibold">{c.value}</a>
              {c.note && <span className="text-[10px] text-muted-foreground ml-auto hidden sm:block">{c.note}</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Contacts */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Phone className="h-3.5 w-3.5 text-sky-400" />
          <span className="font-mono text-[10px] text-sky-400 tracking-[0.15em] uppercase">TEAM CONTACTS</span>
        </div>
        <div className="p-3 space-y-1">
          {teamContacts.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent/20 transition-colors">
              <span className="text-xs font-medium flex-1">{c.label}</span>
              <span className="font-mono text-xs text-muted-foreground">{c.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Judges & Mentors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
            <Award className="h-3.5 w-3.5 text-violet-400" />
            <span className="font-mono text-[10px] text-violet-400 tracking-[0.15em] uppercase">評審 · Day 2</span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { name: "李達宇", role: "NTU 健管所教授", note: "學術共同主辦人" },
              { name: "王彥雯", role: "NTU HDAS", note: "" },
              { name: "王佳惠", role: "台杉生技基金投資協理", note: "EMHA 107 校友" },
              { name: "杜裕康", role: "NTU 流預所教授", note: "" },
            ].map((j, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500/25 to-violet-500/5 flex items-center justify-center text-violet-400 text-[11px] font-bold border border-violet-500/15">
                  {j.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{j.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{j.role}{j.note ? ` · ${j.note}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
          <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono text-[10px] text-emerald-400 tracking-[0.15em] uppercase">指導老師 · Day 1</span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { name: "杜維州", role: "", note: "" },
              { name: "林嶔", role: "", note: "" },
              { name: "劉致宏", role: "Microsoft Taiwan 總監", note: "健康與醫療產業" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500/25 to-emerald-500/5 flex items-center justify-center text-emerald-400 text-[11px] font-bold border border-emerald-500/15">
                  {m.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{m.name}</p>
                  {m.role && <p className="text-[10px] text-muted-foreground truncate">{m.role}{m.note ? ` · ${m.note}` : ''}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Venue Rules */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Building2 className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[10px] text-amber-400 tracking-[0.15em] uppercase">VENUE RULES</span>
        </div>
        <div className="p-3 space-y-1">
          {venueRules.map((r, i) => (
            <div key={i} className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-accent/20 transition-colors">
              <span className="text-base shrink-0">{r.icon}</span>
              <div>
                <p className="text-sm font-medium">{r.rule}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Wifi */}
      <motion.div variants={item} className="rounded-xl glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Wifi className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.15em] uppercase">WIFI</span>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Network</p>
            <p className="font-mono text-sm font-semibold">________</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Password</p>
            <p className="font-mono text-sm font-semibold">________</p>
          </div>
        </div>
      </motion.div>

      {/* Key Links */}
      <motion.div variants={item} className="rounded-xl glass-card overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-border/20">
          <Link2 className="h-3.5 w-3.5 text-violet-400" />
          <span className="font-mono text-[10px] text-violet-400 tracking-[0.15em] uppercase">KEY LINKS</span>
        </div>
        <div className="p-3 space-y-1">
          {keyLinks.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent/20 transition-colors group">
              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary shrink-0" />
              <span className="text-xs font-medium flex-1">{l.label}</span>
              {l.note && <span className="text-[10px] text-muted-foreground hidden sm:block">{l.note}</span>}
            </a>
          ))}
        </div>
      </motion.div>


      {/* Venue Address */}
      <motion.div variants={item} className="rounded-xl glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-3.5 w-3.5 text-rose-400" />
          <span className="font-mono text-[10px] text-rose-400 tracking-[0.15em] uppercase">VENUE</span>
        </div>
        <p className="text-sm font-medium">國立臺灣大學 公共衛生學院大樓 2F 201 講堂</p>
        <p className="text-xs text-muted-foreground mt-1">台北市中正區徐州路 17 號</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">捷運公館站 → 步行約 10 分鐘</p>
      </motion.div>


      {/* First Aid */}
      <motion.div variants={item} className="rounded-xl glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🩹</span>
          <span className="font-mono text-[10px] text-rose-400 tracking-[0.15em] uppercase">FIRST AID</span>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• 急救包位置：報到桌旁（Helper B 管理）</p>
          <p>• 內容：OK 繃、紗布、消毒液、止痛藥</p>
          <p>• 嚴重狀況：撥打 119 或送台大醫院急診</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoTab;
