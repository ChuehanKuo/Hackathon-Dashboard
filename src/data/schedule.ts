export type ActivityType = 'setup' | 'session' | 'break' | 'critical' | 'pitch' | 'networking';

export interface TimelineItem {
  time: string;
  title: string;
  type: ActivityType;
  who?: string;
  details: string;
}

export const day1Schedule: TimelineItem[] = [
  { time: "07:00-07:50", title: "場地佈置", type: "setup", who: "全體", details: "AV 設備、報到桌、指示牌、走廊茶點站" },
  { time: "07:50-08:00", title: "最終確認", type: "setup", who: "Chuehan + 全體", details: "走一遍流程，確認一切就緒" },
  { time: "08:00-09:00", title: "報到", type: "session", who: "Helper B", details: "4 組號碼牌（#1-35, #36-70, #71-105, #106-137），發放名牌 + 參賽者手冊" },
  { time: "09:00-09:15", title: "開幕式", type: "session", who: "Chuehan MC", details: "歡迎致詞、流程說明、注意事項" },
  { time: "09:15-09:55", title: "Keynote 影片", type: "session", who: "Helper C (AV)", details: "哈佛預錄影片「AI-Driven Digital Health Solutions」，全體觀看" },
  { time: "09:55-10:00", title: "轉場準備", type: "setup", who: "Helper C", details: "切換至 Zoom，測試音訊" },
  { time: "10:00-10:30", title: "HSIL 全球直播", type: "critical", who: "Chuehan + Helper C", details: "Zoom 連線所有國家據點，Chuehan 代表台灣站發言約 1 分鐘（介紹台灣站 + 報名人數）" },
  { time: "10:30-10:45", title: "休息", type: "break", who: "Helper B", details: "走廊茶點" },
  { time: "10:45-11:05", title: "Hack 101", type: "session", who: "Chuehan / Helper A", details: "規則說明、六項評分標準（共 30 分）、簡報格式（3 分鐘 + 30 秒 Q&A）、12:00 簡報截止提醒" },
  { time: "11:05-11:25", title: "團隊自我介紹", type: "networking", who: "Chuehan MC", details: "所有已組隊團隊逐一自介（隊名、方向、人數、是否徵人），每隊 30 秒。個人報名者聆聽。工作人員舉「徵求成員」標示。" },
  { time: "11:25-11:50", title: "自由交流 + 配對", type: "networking", who: "Helper E + Chuehan", details: "全場自由交流。徵人團隊舉牌。工作人員主動接觸落單者。15 分鐘後廣播：「還沒找到團隊的請到講台前」，協助最後配對。" },
  { time: "11:50-12:15", title: "團隊登記", type: "networking", who: "Helper B", details: "所有團隊填寫登記表（隊名、成員、方向）。確認後不可更動。" },
  { time: "12:15-12:30", title: "就位", type: "setup", who: "全體", details: "團隊在 201 找到工作位置" },
  { time: "12:30-13:30", title: "午餐", type: "break", who: "全體", details: "60 人教室用餐（201 禁食）。指導老師簡短溝通。" },
  { time: "13:30-17:00", title: "方案發想 + 指導老師諮詢", type: "session", who: "指導老師 + 團隊", details: "3 位指導老師自由巡迴 ~42 隊" },
  { time: "15:00", title: "下午茶點補充", type: "break", who: "Helper B/F", details: "走廊茶點站補充" },
  { time: "17:00-17:20", title: "Day 1 總結", type: "session", who: "Chuehan MC", details: "預告 Day 2 流程、分享 Google Drive 連結、提醒明天 12:00 簡報截止" },
  { time: "17:20-17:30", title: "簡報順序抽籤", type: "session", who: "Chuehan + Helper A", details: "抽籤決定順序，公布看板" },
  { time: "17:30+", title: "Open Hack Time", type: "session", who: "團隊", details: "自由延續討論，至少 1 位工作人員留守" },
];

export const day2Schedule: TimelineItem[] = [
  { time: "07:30-08:00", title: "場地準備", type: "setup", who: "全體", details: "AV 確認、張貼「簡報 12:00 截止」標示" },
  { time: "08:00-09:00", title: "報到", type: "session", who: "Helper B", details: "Day 2 簽到" },
  { time: "09:00-09:15", title: "Day 2 歡迎", type: "session", who: "Chuehan MC", details: "重申規則、12:00 簡報截止、簡報格式" },
  { time: "09:15-12:00", title: "方案精煉 + 簡報準備", type: "session", who: "團隊 + 指導老師", details: "指導老師提供最後諮詢。09:15–10:00 Keynote 影片「Empowering Women in HealthTech」在講堂播放，團隊可選擇觀看或繼續工作。" },
  { time: "11:00", title: "截止提醒 ①", type: "critical", who: "Helper A", details: "廣播「還有 1 小時」" },
  { time: "11:30", title: "截止提醒 ②", type: "critical", who: "Helper A + E", details: "廣播 + 逐桌提醒「30 分鐘，請匯出 PDF」" },
  { time: "11:50", title: "最後提醒", type: "critical", who: "Helper A + E", details: "「10 分鐘！上傳到 Google Drive」" },
  { time: "12:00", title: "簡報截止 HARD DEADLINE", type: "critical", who: "Helper C + E", details: "確認 Google Drive 資料夾，追蹤未交團隊，USB 備案" },
  { time: "12:00-13:00", title: "午餐 + 評審說明 + 簡報載入", type: "break", who: "全體", details: "60 人教室用餐。12:00–12:30 Chuehan 向評審說明評分標準與流程。12:30–13:00 Helper C 載入所有簡報至投影電腦（勿打擾）。" },
  { time: "13:00-13:10", title: "評審介紹 + 格式說明", type: "pitch", who: "Chuehan MC", details: "介紹每位評審，說明 5 分鐘格式（3 min pitch + 1 min Q&A + 1 min buffer）" },
  { time: "13:10-14:05", title: "Block 1：Teams 1–11", type: "pitch", who: "Helper A (計時) + C (簡報)", details: "每隊 5 分鐘，1 位評審輪流提問 1 分鐘" },
  { time: "14:05-14:13", title: "休息", type: "break", details: "8 分鐘" },
  { time: "14:13-15:08", title: "Block 2：Teams 12–22", type: "pitch", who: "Helper A + C", details: "同上" },
  { time: "15:08-15:16", title: "休息", type: "break", details: "8 分鐘" },
  { time: "15:16-16:11", title: "Block 3：Teams 23–33", type: "pitch", who: "Helper A + C", details: "同上" },
  { time: "16:11-16:19", title: "休息", type: "break", details: "8 分鐘" },
  { time: "16:19-17:04", title: "Block 4：Teams 34–42", type: "pitch", who: "Helper A + C", details: "最後一組，約 9 隊（45 分鐘）" },
  { time: "17:04-17:14", title: "評審回饋時間", type: "pitch", who: "全體評審", details: "評審分享整體觀察、建議（10 分鐘）" },
  { time: "17:14-17:30", title: "評分統計", type: "setup", who: "Helper B", details: "紙本評分表手動統計。同時進行大合照 + 自由交流。" },
  { time: "17:30-17:50", title: "頒獎典禮", type: "critical", who: "Chuehan MC", details: "公布第三名→第二名→第一名，頒發證書" },
  { time: "17:50-18:00", title: "閉幕 + 大合照", type: "critical", who: "Chuehan MC + Helper D", details: "感謝致詞，大合照" },
  { time: "18:00+", title: "撤場", type: "setup", who: "全體", details: "收拾器材、清潔場地、恢復原狀" },
];
