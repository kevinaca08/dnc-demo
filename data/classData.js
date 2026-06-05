/* ============================================================
   Dungeons & Classroom — 共用假資料（mockup 用）
   所有老師端頁面 <script src="data/classData.js"> 共用這一份。
   file:// 直接雙擊可載入（<script src> 不被 CORS 擋）。
   之後接真資料時，這份會換成後端來源。
   ============================================================ */
window.CLASS_DATA = {
  className: "五年三班",
  dmName: "Kevin 老師",

  /* 15 名冒險者。職業不固定在個人身上——由「隊伍管理」分配座位時決定，
     所以這裡只存個人成長資料（等級／經驗／衍生數值）。 */
  students: [
    { id: 1,  name: "王梓睿", level: 8, exp: 40 },
    { id: 2,  name: "楊竣評", level: 7, exp: 10 },
    { id: 3,  name: "陳宥蓁", level: 9, exp: 75 },
    { id: 4,  name: "林子皓", level: 6, exp: 55 },
    { id: 5,  name: "張睿恩", level: 7, exp: 30 },
    { id: 6,  name: "李宜蓁", level: 5, exp: 80 },
    { id: 7,  name: "黃柏翔", level: 8, exp: 20 },
    { id: 8,  name: "吳采潔", level: 6, exp: 65 },
    { id: 9,  name: "劉承恩", level: 10, exp: 5 },
    { id: 10, name: "蔡欣妤", level: 5, exp: 45 },
    { id: 11, name: "鄭凱翔", level: 7, exp: 60 },
    { id: 12, name: "許芷晴", level: 6, exp: 35 },
    { id: 13, name: "周詠晴", level: 8, exp: 50 },
    { id: 14, name: "賴冠廷", level: 4, exp: 90 },
    { id: 15, name: "謝佳穎", level: 7, exp: 15 }
  ],

  /* 預編 5 隊 × 3 人（共 15 人），刻意各缺 1 席 → 之後測「三人一組＋自動補席」。
     每隊有 4 個職業席位（戰/法/僧/盜），seats 之後在隊伍管理頁分配；
     members 先存成員 id，gold 為該隊共享金幣。 */
  teams: [
    { id: 1, name: "烈焰小隊", gold: 120, members: [1, 2, 3] },
    { id: 2, name: "碧水盟",   gold: 80,  members: [4, 5, 6] },
    { id: 3, name: "鐵壁團",   gold: 200, members: [7, 8, 9] },
    { id: 4, name: "疾風隊",   gold: 50,  members: [10, 11, 12] },
    { id: 5, name: "曙光會",   gold: 0,   members: [13, 14, 15] }
  ]
};

/* 小工具：依 id 取學生（之後冒險者管理頁會用） */
window.CLASS_DATA.studentById = function (id) {
  return window.CLASS_DATA.students.find(function (s) { return s.id === id; });
};
