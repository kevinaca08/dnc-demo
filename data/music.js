/* ============================================================
   Dungeons & Classroom — 共用背景音樂控制（跨頁接續）
   用法：頁面放
     <audio id="bgm" data-track="home" src="../assets/music/home.ogg" loop preload="auto"></audio>
     <button id="musBtn" class="musbtn off">♪ 音樂 關</button>
   然後在 body 結尾（上述元素之後）：
     <script src="data/music.js"></script>
   行為：右上 ♪ 開關；首次點畫面自動開；用 sessionStorage(dnc_bgm={on,t,track})
   跨頁記住開關+秒數，同 track 才接續秒數、不同 track 從頭播但沿用開/關。
   ============================================================ */
(function(){
  var bgm = document.getElementById("bgm");
  var btn = document.getElementById("musBtn");
  if(!bgm || !btn) return;
  var TRACK = bgm.getAttribute("data-track") || "default";
  var KEY = "dnc_bgm";
  var on = false, saved = null;
  try { saved = JSON.parse(sessionStorage.getItem(KEY)); } catch(e){}

  function label(){ btn.textContent = "♪ 音樂 " + (on ? "開" : "關"); btn.classList.toggle("off", !on); }
  function save(){ try { sessionStorage.setItem(KEY, JSON.stringify({ on:on, t:bgm.currentTime||0, track:TRACK })); } catch(e){} }
  function play(){
    bgm.volume = 0.5;
    var p = bgm.play();
    if(p && p.catch) p.catch(function(){
      // 被瀏覽器自動播放限制擋下 → 等首次互動再接續
      addEventListener("pointerdown", function once(){ if(on){ bgm.volume=0.5; bgm.play().catch(function(){}); } }, { once:true });
    });
  }
  function seek(t){ try { if(t && bgm.duration && t < bgm.duration) bgm.currentTime = t; } catch(e){} }
  function set(v){ on = v; if(on) play(); else bgm.pause(); label(); save(); }

  btn.addEventListener("click", function(){ set(!on); });
  label();

  if(saved && saved.on){
    // 上一頁正在播 → 沿用開啟狀態；同 track 才接續秒數，不同 track 從頭
    on = true; label();
    var go = function(){ if(saved.track === TRACK) seek(saved.t); play(); };
    if(bgm.readyState >= 1) go();
    else bgm.addEventListener("loadedmetadata", go, { once:true });
  } else if(!saved){
    // 首次造訪 → 預設關，第一次點畫面自動開
    addEventListener("pointerdown", function once(){ if(!on) set(true); }, { once:true });
  } // saved.on === false（使用者按了靜音）→ 保持關

  bgm.addEventListener("timeupdate", save);
  addEventListener("pagehide", save);
})();
