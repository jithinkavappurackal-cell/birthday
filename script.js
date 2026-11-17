/* ====== CONFIG — edit these ====== */
const CONFIG = {
  name: "Aleena",
  passcode: "0201",
  photos: ["img/aleena7.jpeg","img/aleena5.jpeg","img/aleena1.jpeg","img/aleena2.jpeg","img/aleena3.jpeg","img/aleena4.jpeg","img/aleena6.jpeg","img/aleena8.jpeg","img/aleena9.jpeg","img/aleena10.jpeg","img/aleena11.jpeg","img/aleena12.jpeg","img/aleena13.jpeg","img/aleena14.jpeg","img/aleena15.jpeg","img/aleena16.jpeg","img/aleena17.jpeg","img/aleena18.jpeg"],  // e.g. ["img/1.jpg","img/2.jpg"] — empty shows blank polaroids like the video
  caption: "Happy Birthday! 🎂",
  letter: `Dear vincent,

Happy Birthday to someone truly special 🎂

You are my Fake Friend, Kind Heart, Always There, and I'm so grateful to have you in my life.

You bring so much warmth and sweetness into my life. Every moment with you is precious.

On your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.

Here's to celebrating you today and always! 🎉

With love and best wishes,
Your Special Someone 🧡`,
  words: ["You", "are", "so", "special"]
};
/* ================================= */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const show = id => { $$(".screen").forEach(s => s.classList.remove("active")); $("#" + id).classList.add("active");
  document.body.classList.toggle("pinkbg", id === "s-lock"); if (id === "s-balloon") initBalloons();
  if (id === "s-candle") initCandle(); if (id === "s-photo") initPhotos(); };
$$(".name").forEach(e => e.textContent = CONFIG.name);
$("#s-candle .title").textContent = "Blow the candle, " + CONFIG.name;
document.body.classList.add("pinkbg");
$$("[data-next]").forEach(b => b.onclick = () => show(b.dataset.next));

/* floating hearts */
for (let i = 0; i < 14; i++) { const h = document.createElement("span"); h.textContent = "♥";
  h.style.cssText = `left:${Math.random()*100}%;font-size:${12+Math.random()*22}px;animation-duration:${10+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;
  $("#hearts").appendChild(h); }

/* confetti */
const cv = $("#confetti"), cx = cv.getContext("2d"); let bits = [];
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
function burst(n = 140, x = innerWidth / 2, y = innerHeight / 3) {
  const cols = ["#ff7b9c", "#ffd166", "#7bd88f", "#6ec1ff", "#b48cff", "#ff9a5a"];
  for (let i = 0; i < n; i++) bits.push({ x, y, vx: (Math.random() - .5) * 12, vy: Math.random() * -10 - 2, w: 5 + Math.random() * 6, h: 4 + Math.random() * 5,
    c: cols[i % cols.length], r: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 260 });
  if (bits.length === n) loop();
}
function loop() { cx.clearRect(0, 0, cv.width, cv.height);
  bits = bits.filter(b => b.life-- > 0 && b.y < cv.height + 20);
  bits.forEach(b => { b.vy += .22; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c; cx.globalAlpha = Math.min(1, b.life / 60); cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cx.restore(); });
  if (bits.length) requestAnimationFrame(loop); }

/* 1. passcode */
let code = "";
const pad = $("#pad");
["1","2","3","4","5","6","7","8","9","0","×"].forEach(k => { const b = document.createElement("button");
  b.textContent = k; if (k === "0") b.className = "z"; b.onclick = () => key(k); pad.appendChild(b); });
function key(k) { if (k === "×") code = code.slice(0, -1); else if (code.length < 4) code += k;
  $$("#boxes i").forEach((b, i) => { b.textContent = code[i] || ""; b.classList.toggle("on", !!code[i]); });
  if (code.length === 4) setTimeout(() => {
    if (code === CONFIG.passcode) { burst(); show("s-hello"); }
    else { $("#boxes").classList.add("shake"); $("#lockMsg").textContent = "Oops, try again 💗";
      setTimeout(() => { $("#boxes").classList.remove("shake"); key("×"); code = ""; key("×"); }, 450); } }, 250); }
addEventListener("keydown", e => { if ($("#s-lock").classList.contains("active")) { if (/\d/.test(e.key)) key(e.key); if (e.key === "Backspace") key("×"); } });

/* 2. "No" button runs away */
const no = $("#no"); const dodge = () => { no.style.position = "relative"; no.style.left = (Math.random() * 120 - 60) + "px"; no.style.top = (Math.random() * 60 - 30) + "px"; };
no.onmouseenter = dodge; no.onclick = dodge;

/* 3. balloons */
function initBalloons() {
  const st = $("#balloonStage"); if (st.dataset.done) return; st.dataset.done = 1;
  const cols = ["#f4b7c5", "#a8e0b8", "#b8b4ee", "#f6d58e"], pos = [[62, 22], [20, 62], [68, 60], [38, 40]], wp = [[18, 28], [60, 20], [14, 78], [62, 82]];
  let popped = 0;
  CONFIG.words.forEach((w, i) => {
    const wd = document.createElement("div"); wd.className = "word"; wd.textContent = w; wd.style.left = wp[i][0] + "%"; wd.style.top = wp[i][1] + "%"; st.appendChild(wd);
    const b = document.createElement("div"); b.className = "balloon"; b.style.cssText = `--c:${cols[i]};left:${pos[i][0]}%;top:${pos[i][1]}%;animation-delay:${i*.4}s`;
    b.onclick = () => { b.classList.add("pop"); wd.classList.add("show"); const r = b.getBoundingClientRect(); burst(30, r.x + 30, r.y + 40);
      setTimeout(() => b.remove(), 300); if (++popped === 4) setTimeout(() => show("s-candle"), 2200); };
    st.appendChild(b); });
}

/* 4. candle */
function initCandle() {
  const c = $("#candle"); c.onclick = () => { if ($("#flame").classList.contains("out")) return;
    $("#flame").classList.add("out"); $("#candleHint").style.opacity = 0; $("#wish").classList.add("show"); burst(90);
    setTimeout(() => show("s-photo"), 3200); }; }

/* 5. photos */
function initPhotos() {
  const box = $("#polaroids"); if (box.dataset.done) return; box.dataset.done = 1;
  const n = Math.max(CONFIG.photos.length, 3);
  for (let i = n - 1; i >= 0; i--) { const p = document.createElement("div"); p.className = "pol"; p.style.transform = `rotate(${(i % 2 ? 1 : -1) * i * 2}deg)`;
    p.innerHTML = `<div class="img" style="${CONFIG.photos[i] ? `background-image:url('${CONFIG.photos[i]}')` : ""}"></div><p>${CONFIG.caption}</p>`;
    p.onclick = () => { p.classList.add("gone"); setTimeout(() => p.remove(), 600); }; box.appendChild(p); } }

/* 6. letter */
$("#envelope").onclick = () => {
  $("#envelope").classList.add("open"); $("#tapHint").style.display = $("#tapBottom").style.display = "none";
  setTimeout(() => { $("#envelope").style.display = "none"; $("#letter").classList.add("show"); type(); }, 500); };
function type() { const t = $("#letterText"); let i = 0;
  (function tick() { t.textContent = CONFIG.letter.slice(0, ++i); t.scrollTop = t.scrollHeight;
    if (i < CONFIG.letter.length) setTimeout(tick, 38); else $("#lastBtn").classList.remove("hidden"); })(); }
$("#lastBtn").onclick = () => show("s-gift");

/* 7. gift */
$("#gift").onclick = () => { $("#gift").style.display = "none"; $("#giftTitle").style.display = $("#giftHint").style.display = "none";
  $("#sticker").classList.add("show"); burst(220); setTimeout(() => burst(160, innerWidth * .25), 500); setTimeout(() => burst(160, innerWidth * .75), 900); };
