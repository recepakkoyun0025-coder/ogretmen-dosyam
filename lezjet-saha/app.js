/* LezJet Saha – uygulama kodu */
(function () {
"use strict";
const D = window.LJ_DATA;

/* =========================================================
   Sabitler
   ========================================================= */
const TURLER = ["Esnaf","Site yönetimi","Plaza / iş merkezi","Muhtarlık","Okul","Kurum","Diğer"];
const GELIR = ["Düşük","Orta","Üst"];
const KATEGORI = ["Lokanta","Paket / ev yemekleri","Döner / kebap","Pide / lahmacun","Pizza / burger","Çiğ köfte","Pastane / fırın","Kafe","Market / bakkal","Kasap / manav","Diğer"];
const EH = ["Evet","Hayır"];
const PLATFORM = ["Yemeksepeti","Getir","Trendyol Yemek","Migros Yemek","Telefon / WhatsApp","Kendi sitesi","Hiçbiri"];
const SORUN = ["Yüksek komisyon","Geç ödeme","Görünürlük","Kurye","Az sipariş","Yorum / puan","Personel","Diğer"];
const ITIRAZ = ["Komisyon","Zamanı yok","Mevcut platformdan memnun","Teknolojiye uzak","Ortağa / patrona soracak","Güvenmiyor","Yok"];
const DUYURU = ["Verildi","Sonra","Verilmedi"];
const KURYEGIRIS = ["Serbest","Kapıya kadar","Yasak"];
const KARAR = ["Yönetici","Yönetim kurulu","Genel kurul","Bilinmiyor"];
const PAY = ["Konuşuldu, olumlu","Konuşuldu, düşünecek","Konuşulmadı"];
const OKULKISI = ["Müdür","Müdür yrd.","OAB başkanı","Öğretmen","Diğer"];
const MEM = ["Var","Yok","Bilinmiyor"];
const SONUC = ["Kayıt oldu","Olumlu, düşünecek","Tekrar gel","Bilgi bırakıldı","İlgilenmedi","Yetkili yoktu"];
const SONUC_CLS = {"Kayıt oldu":"b-ok","Olumlu, düşünecek":"b-ok","Tekrar gel":"b-warn","Bilgi bırakıldı":"b-n","İlgilenmedi":"b-bad","Yetkili yoktu":"b-n"};
const SONUC_COLOR = {"Kayıt oldu":"#1f8a4c","Olumlu, düşünecek":"#5bb784","Tekrar gel":"#d69a2d","Bilgi bırakıldı":"#2459a8","İlgilenmedi":"#b42318","Yetkili yoktu":"#8a8780"};
const POSITIVE = ["Kayıt oldu","Olumlu, düşünecek","Tekrar gel"];
const GUNLER = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
const isSite = t => t === "Site yönetimi" || t === "Plaza / iş merkezi";

const SLIDES = [
  { h: "Mahallenin siparişi mahallede kalsın", b: "<p>LezJet, mahalle esnafını çevresindeki sitelere, plazalara ve okullara bağlayan yerel sipariş platformu.</p><p>Komşularınız sizi telefonundan bulur, siparişi doğrudan size verir.</p><div><span class='pill'>Yerel</span><span class='pill'>Komşudan komşuya</span><span class='pill'>Esnaf dostu</span></div>" },
  { h: "İki kanal, tek panel", b: "<ul><li><b>Kendi mağazanız:</b> size özel online mağaza ve sipariş linki. Müdavimlerinize kendiniz gönderirsiniz.</li><li><b>LezJet platformu:</b> çevrenizdeki LezJet kullanıcılarının ekranında görünürsünüz.</li></ul><p>Bütün siparişleri tek yerden yönetirsiniz.</p>" },
  { h: "Platform komisyonu", b: "<div class='big'>%11</div><p>LezJet platformundan gelen siparişlerde komisyon %11.</p><p>Ödeme günlerini ve bütün şartları sözleşmede açıkça birlikte yazarız.</p>" },
  { h: "Sitelerle çalışıyoruz", b: "<p>Site ve plaza yönetimleriyle anlaşma yapıyoruz. Her siteye özel bir LezJet kodu veriyoruz.</p><p>O siteden gelen siparişlerden siteye bir pay ayrılıyor; site bunu ortak alan, bakım ya da aidat için kullanıyor.</p><p><b>Sizin için anlamı:</b> site sakinleri LezJet'i kullanıyor, siz de onların ekranında görünüyorsunuz.</p>" },
  { h: "Okullar ve aileler", b: "<p>Okul aile birlikleriyle iş birliği yapıyoruz. Okul topluluğundan gelen siparişlerin %3'ü okula katkı olarak dönüyor.</p><p>Aileler okula destek olurken mahalle esnafından sipariş veriyor.</p>" },
  { h: "Nasıl başlarsınız?", b: "<ul><li>Bilgilerinizi bugün alıyoruz.</li><li>Menünüzü ve fotoğraflarınızı birlikte yüklüyoruz.</li><li>Size özel mağaza linkiniz hazır oluyor.</li><li>Çevrenizdeki sitelerin ekranında görünmeye başlıyorsunuz.</li></ul>" },
  { h: "LezJet'i inceleyin", b: "<p>Kameranızı okutun, LezJet'i hemen açın:</p><div class='qr' id='promoQr'></div><p style='font-size:20px;font-weight:800;margin:4px 0'>lezjet.com</p><p>Sorularınız için saha temsilcimiz yanınızda.</p>" }
];

/* =========================================================
   Yardımcılar
   ========================================================= */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2800); }
function ls(k, v) { try { if (v === undefined) { const x = localStorage.getItem(k); return x ? JSON.parse(x) : null; } if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
const pad = n => String(n).padStart(2, "0");
const dayKey = ms => { const d = new Date(ms); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const todayKey = () => dayKey(Date.now());
const fmtTime = ms => { const d = new Date(ms); return pad(d.getDate()) + "." + pad(d.getMonth() + 1) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()); };
const fmtDate = s => { if (!s) return ""; const p = s.split("-"); return p.length === 3 ? p[2] + "." + p[1] + "." + p[0] : s; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const telHref = t => "tel:" + String(t || "").replace(/[^\d+]/g, "");
const mapsHref = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const svgCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>';

/* =========================================================
   Yerel depo (IndexedDB, olmazsa localStorage)
   ========================================================= */
const store = (() => {
  let dbp = null;
  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      try {
        const r = indexedDB.open("lezjet-saha", 1);
        r.onupgradeneeded = () => { r.result.createObjectStore("mine"); r.result.createObjectStore("outbox"); };
        r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
      } catch (e) { rej(e); }
    });
    return dbp;
  }
  async function tx(name, mode, fn) {
    const db = await open();
    return new Promise((res, rej) => { const t = db.transaction(name, mode); const s = t.objectStore(name); const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); });
  }
  const fb = n => ls("lj_fb_" + n) || {};
  return {
    async all(n) {
      try { const db = await open(); return await new Promise((res, rej) => { const out = {}; const r = db.transaction(n).objectStore(n).openCursor(); r.onsuccess = () => { const c = r.result; if (c) { out[c.key] = c.value; c.continue(); } else res(out); }; r.onerror = () => rej(r.error); }); }
      catch (e) { return fb(n); }
    },
    async put(n, k, v) { try { await tx(n, "readwrite", s => s.put(v, k)); } catch (e) { const o = fb(n); o[k] = v; ls("lj_fb_" + n, o); } },
    async del(n, k) { try { await tx(n, "readwrite", s => s.delete(k)); } catch (e) { const o = fb(n); delete o[k]; ls("lj_fb_" + n, o); } }
  };
})();

/* =========================================================
   Sunucu
   ========================================================= */
function apiUrl() { return (ls("lj_api") || window.LJ_API_URL || "").trim(); }
async function api(action, payload) {
  const url = apiUrl();
  if (!url) throw new Error("no_api");
  const r = await fetch(url, { method: "POST", body: JSON.stringify(Object.assign({ action }, payload || {})), headers: { "Content-Type": "text/plain;charset=utf-8" }, redirect: "follow" });
  if (!r.ok) throw new Error("http_" + r.status);
  const j = await r.json();
  if (!j.ok) { const e = new Error(j.error || "server"); e.server = true; throw e; }
  return j;
}

/* =========================================================
   Durum
   ========================================================= */
let profile = ls("lj_profile");
let mine = {};      // id -> kayıt (bu telefondaki)
let outbox = {};    // id -> {kind, data}
let editing = null; // {id, createdAt, photos}
let photosNew = []; // [{data, mime, thumb}]
let photosKept = [];// sunucudaki eski fotoğraflar [{id,url,thumb?}]
let geo = null, formStart = 0, rotaKey = "", ilgi = 0;
let currentView = "";
let deferredInstall = null;

/* =========================================================
   Seçim çipleri
   ========================================================= */
const groups = {};
function chipGroup(id, opts, multi, onChange) {
  const el = $(id); groups[id] = { multi, val: multi ? [] : "" };
  el.innerHTML = opts.map(o => `<span class="chip" data-v="${esc(o)}">${esc(o)}</span>`).join("");
  el.addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    const v = c.dataset.v, g = groups[id];
    if (multi) { const i = g.val.indexOf(v); if (i >= 0) g.val.splice(i, 1); else g.val.push(v); }
    else g.val = g.val === v ? "" : v;
    paint(id); touch(); if (onChange) onChange();
  });
}
function paint(id) { const g = groups[id]; $(id).querySelectorAll(".chip").forEach(c => c.classList.toggle("on", g.multi ? g.val.includes(c.dataset.v) : g.val === c.dataset.v)); }
function setChip(id, v) { const g = groups[id]; g.val = g.multi ? (Array.isArray(v) ? v.slice() : []) : (v || ""); paint(id); }
const G = id => groups[id].val;

chipGroup("f_tur", TURLER, false, applyTur);
chipGroup("f_gelir", GELIR); chipGroup("f_kategori", KATEGORI); chipGroup("f_kararVerici", EH);
chipGroup("f_paket", EH); chipGroup("f_kurye", EH); chipGroup("f_platform", PLATFORM, true);
chipGroup("f_sorun", SORUN, true); chipGroup("f_itiraz", ITIRAZ, true); chipGroup("f_magaza", EH);
chipGroup("f_wp", EH); chipGroup("f_duyuru", DUYURU); chipGroup("f_kuryeGiris", KURYEGIRIS); chipGroup("f_karar", KARAR); chipGroup("f_pay", PAY);
chipGroup("f_okulkisi", OKULKISI); chipGroup("f_mem", MEM);
chipGroup("f_tanistirma", EH); chipGroup("f_mahalleWp", EH);
chipGroup("f_tanitim", EH); chipGroup("f_sonuc", SONUC);

$("f_ilgi").innerHTML = [1, 2, 3, 4, 5].map(n => `<button type="button" data-n="${n}">${n}</button>`).join("");
$("f_ilgi").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const n = +b.dataset.n; ilgi = ilgi === n ? 0 : n; paintIlgi(); touch(); });
function paintIlgi() { $("f_ilgi").querySelectorAll("button").forEach(b => b.classList.toggle("on", +b.dataset.n <= ilgi)); }

/* İlçe / mahalle */
$("f_ilce").innerHTML = D.ilceler.map(i => `<option>${esc(i)}</option>`).join("");
function fillMahalle() {
  const list = D.mahalleler[$("f_ilce").value];
  $("f_mahalle").classList.toggle("hidden", !list); $("f_mahalle_txt").classList.toggle("hidden", !!list);
  if (list) $("f_mahalle").innerHTML = '<option value="">Seç</option>' + list.map(m => `<option>${esc(m)}</option>`).join("");
}
$("f_ilce").addEventListener("change", () => { fillMahalle(); ls("lj_last_ilce", $("f_ilce").value); });
$("f_mahalle").addEventListener("change", () => ls("lj_last_mah", $("f_mahalle").value));
function setMahalle(il, m) {
  $("f_ilce").value = D.ilceler.includes(il) ? il : "Diğer"; fillMahalle();
  if (D.mahalleler[$("f_ilce").value]) $("f_mahalle").value = m || ""; else $("f_mahalle_txt").value = m || "";
}

function applyTur() {
  const t = G("f_tur");
  document.querySelectorAll(".q").forEach(x => x.classList.add("hidden"));
  const show = s => document.querySelector(s).classList.remove("hidden");
  if (t === "Esnaf") show(".q-esnaf");
  if (isSite(t)) show(".q-site");
  if (t === "Okul") show(".q-okul");
  if (t === "Muhtarlık") show(".q-muhtar");
  $("lblAd").textContent = t === "Esnaf" ? "İşletme adı" : t === "Muhtarlık" ? "Muhtarlık / muhtar adı" : t === "Okul" ? "Okul adı" : isSite(t) ? "Site / plaza adı" : "Ad";
}

/* Form değişince ziyaret süresini başlat */
function touch() { if (!formStart) formStart = Date.now(); }
$("visitForm").addEventListener("input", touch);

/* =========================================================
   Konum
   ========================================================= */
function getGeo(silent) {
  if (!navigator.geolocation) { if (!silent) toast("Bu telefonda konum yok"); return; }
  $("geoText").textContent = "Konum alınıyor…";
  navigator.geolocation.getCurrentPosition(p => {
    geo = { lat: +p.coords.latitude.toFixed(6), lng: +p.coords.longitude.toFixed(6), acc: Math.round(p.coords.accuracy), t: Date.now() };
    renderGeo();
  }, err => {
    $("geoText").textContent = err.code === 1 ? "Konum izni verilmedi" : "Konum alınamadı";
    if (!silent) toast(err.code === 1 ? "Telefon ayarlarından konum iznini aç" : "Konum alınamadı, tekrar dene");
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
}
function renderGeo() {
  $("geoText").innerHTML = geo ? `Konum alındı (±${geo.acc} m) · <a href="${mapsHref(geo.lat + "," + geo.lng)}" target="_blank" rel="noopener">haritada gör</a>` : "Konum alınmadı";
  $("geoBtn").textContent = geo ? "Yenile" : "Konumu al";
}
$("geoBtn").onclick = () => getGeo(false);

/* =========================================================
   Fotoğraflar
   ========================================================= */
function compress(file, max, q) {
  return new Promise((res, rej) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas"); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", q));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("img")); };
    img.src = url;
  });
}
function renderPhotos() {
  const items = photosKept.map((p, i) => `<div class="ph" style="background-image:url('${esc(p.thumb || "")}')" data-k="k${i}">${p.thumb ? "" : '<span class="xs muted" style="position:absolute;inset:0;display:grid;place-items:center">Yüklendi</span>'}<button type="button" data-rm="k${i}">×</button></div>`)
    .concat(photosNew.map((p, i) => `<div class="ph" style="background-image:url('${p.thumb}')"><button type="button" data-rm="n${i}">×</button></div>`));
  const total = photosKept.length + photosNew.length;
  if (total < 4) items.push(`<div class="addph" id="addPh"><div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>Fotoğraf</div></div>`);
  $("photoList").innerHTML = items.join("");
}
$("photoList").addEventListener("click", e => {
  const rm = e.target.closest("[data-rm]");
  if (rm) { const k = rm.dataset.rm; if (k[0] === "n") photosNew.splice(+k.slice(1), 1); else photosKept.splice(+k.slice(1), 1); renderPhotos(); return; }
  if (e.target.closest("#addPh")) $("photoInput").click();
});
$("photoInput").addEventListener("change", async () => {
  const f = $("photoInput").files[0]; $("photoInput").value = ""; if (!f) return;
  try {
    const full = await compress(f, 1280, 0.72), thumb = await compress(f, 200, 0.6);
    photosNew.push({ data: full.split(",")[1], mime: "image/jpeg", thumb }); renderPhotos(); touch();
  } catch (e) { toast("Fotoğraf eklenemedi"); }
});

/* =========================================================
   Sesle not (destekleyen telefonlarda)
   ========================================================= */
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  const btn = $("micBtn"); btn.classList.remove("hidden");
  let rec = null;
  btn.onclick = () => {
    if (rec) { rec.stop(); return; }
    rec = new SR(); rec.lang = "tr-TR"; rec.interimResults = false; rec.continuous = true;
    rec.onresult = e => { let t = ""; for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) t += e.results[i][0].transcript; if (t) { const ta = $("f_not"); ta.value = (ta.value ? ta.value.trim() + " " : "") + t.trim(); touch(); } };
    rec.onend = () => { rec = null; btn.classList.remove("rec"); };
    rec.onerror = () => { toast("Ses alınamadı"); };
    try { rec.start(); btn.classList.add("rec"); toast("Dinliyorum… bitince tekrar dokun"); } catch (e) { rec = null; }
  };
})();

/* =========================================================
   Form
   ========================================================= */
function resetForm() {
  editing = null; rotaKey = ""; formStart = 0; geo = null; ilgi = 0; photosNew = []; photosKept = [];
  $("visitForm").reset();
  Object.keys(groups).forEach(k => setChip(k, groups[k].multi ? [] : ""));
  paintIlgi(); renderPhotos(); renderGeo();
  const li = ls("lj_last_ilce"); $("f_ilce").value = li && D.ilceler.includes(li) ? li : "Çekmeköy"; fillMahalle();
  const lm = ls("lj_last_mah"); const ml = D.mahalleler[$("f_ilce").value]; if (lm && ml && ml.includes(lm)) $("f_mahalle").value = lm;
  setChip("f_tur", "Esnaf"); applyTur();
  $("formTitle").textContent = "Yeni ziyaret"; $("saveBtn").textContent = "Ziyareti kaydet";
  $("cancelEdit").classList.add("hidden"); $("rotaTag").classList.add("hidden");
}

function readForm() {
  const il = $("f_ilce").value;
  const v = id => $(id).value.trim();
  return {
    ilce: il, mahalle: D.mahalleler[il] ? $("f_mahalle").value : v("f_mahalle_txt"), cadde: v("f_cadde"), adres: v("f_adres"),
    tur: G("f_tur"), ad: v("f_ad"), yetkili: v("f_yetkili"), gorev: v("f_gorev"), tel: v("f_tel"), sosyal: v("f_sosyal"), gelir: G("f_gelir"),
    q: {
      kategori: G("f_kategori"), kararVerici: G("f_kararVerici"), paket: G("f_paket"), kurye: G("f_kurye"), platform: G("f_platform").slice(),
      komisyon: v("f_komisyon"), gunluk: v("f_gunluk"), sepet: v("f_sepet"), saatler: v("f_saatler"),
      sorun: G("f_sorun").slice(), itiraz: G("f_itiraz").slice(), magaza: G("f_magaza"),
      daire: v("f_daire"), blok: v("f_blok"), aidat: v("f_aidat"), firma: v("f_firma"), wp: G("f_wp"), duyuru: G("f_duyuru"),
      kuryeGiris: G("f_kuryeGiris"), karar: G("f_karar"), pay: G("f_pay"), ikinci: $("f_ikinci").value,
      okulkisi: G("f_okulkisi"), oab: v("f_oab"), ogrenci: v("f_ogrenci"), kermes: v("f_kermes"), mem: G("f_mem"),
      oneri: v("f_oneri"), tanistirma: G("f_tanistirma"), mahalleWp: G("f_mahalleWp")
    },
    tanitim: G("f_tanitim"), ilgi, sonuc: G("f_sonuc"), takip: $("f_takip").value, takipNot: v("f_takipNot"), not: v("f_not")
  };
}

function fillForm(r) {
  setChip("f_tur", r.tur); applyTur(); setMahalle(r.ilce, r.mahalle);
  ["cadde", "adres", "ad", "yetkili", "gorev", "tel", "sosyal", "takip", "takipNot", "not"].forEach(k => $("f_" + k).value = r[k] || "");
  setChip("f_gelir", r.gelir); setChip("f_tanitim", r.tanitim); setChip("f_sonuc", r.sonuc);
  const q = r.q || {};
  ["kategori", "kararVerici", "paket", "kurye", "platform", "sorun", "itiraz", "magaza", "wp", "duyuru", "kuryeGiris", "karar", "pay", "okulkisi", "mem", "tanistirma", "mahalleWp"].forEach(k => setChip("f_" + k, q[k]));
  ["komisyon", "gunluk", "sepet", "saatler", "daire", "blok", "aidat", "firma", "ikinci", "oab", "ogrenci", "kermes", "oneri"].forEach(k => $("f_" + k).value = q[k] || "");
  ilgi = r.ilgi || 0; paintIlgi();
  geo = r.geo || null; renderGeo();
}

$("visitForm").addEventListener("submit", async e => {
  e.preventDefault();
  const d = readForm();
  if (!d.tur) return toast("Ziyaret türünü seç");
  if (!d.ad) { toast("İsim alanını doldur"); $("f_ad").focus(); return; }
  if (!d.sonuc) { toast("Ziyaret sonucunu seç"); $("f_sonuc").scrollIntoView({ behavior: "smooth", block: "center" }); return; }
  const now = Date.now();
  const id = editing ? editing.id : uid();
  const prev = mine[id] || {};
  const rec = Object.assign({}, d, {
    id, staffName: profile.name, staffPhone: profile.phone || "",
    createdAt: editing ? editing.createdAt : now, updatedAt: now,
    geo: geo || prev.geo || null,
    sureDk: editing ? (prev.sureDk || "") : (formStart ? Math.max(1, Math.round((now - formStart) / 60000)) : ""),
    rota: editing ? (prev.rota || "") : rotaKey,
    photos: photosKept.map(p => ({ id: p.id, url: p.url })),
    localThumbs: photosKept.map(p => p.thumb || "").concat(photosNew.map(p => p.thumb)),
    synced: false
  });
  const payload = Object.assign({}, rec, { photosNew: photosNew.map(p => ({ data: p.data, mime: p.mime })), photoIds: photosKept.map(p => p.id) });
  delete payload.localThumbs; delete payload.synced;
  mine[id] = rec; await store.put("mine", id, rec);
  outbox[id] = { kind: "visit", data: payload }; await store.put("outbox", id, outbox[id]);
  const was = !!editing;
  resetForm();
  toast(was ? "Güncellendi ✓" : "Kaydedildi ✓");
  setSync(); renderToday();
  show(was ? "vMine" : "vToday");
  flush();
});
$("cancelEdit").onclick = () => { const wasEdit = !!editing; resetForm(); show(wasEdit ? "vMine" : "vToday"); };

/* =========================================================
   Gönderim kuyruğu
   ========================================================= */
let flushing = false;
async function flush() {
  if (flushing) return; flushing = true;
  const ids = Object.keys(outbox);
  let netFail = false;
  for (const id of ids) {
    const item = outbox[id];
    try {
      if (item.kind === "visit") {
        const res = await api("save", { record: item.data });
        if (mine[id]) { mine[id].synced = true; mine[id].photos = res.photos || mine[id].photos; await store.put("mine", id, mine[id]); }
      } else if (item.kind === "day") {
        await api("dayclose", { day: item.data });
      }
      delete outbox[id]; await store.del("outbox", id);
    } catch (e) {
      if (e.server) { item.error = e.message; } else { netFail = true; break; }
    }
  }
  flushing = false;
  $("offlineBanner").classList.toggle("hidden", !(netFail && apiUrl()));
  setSync();
  if (currentView === "vMine") renderMine();
}
function setSync() {
  const n = Object.keys(outbox).length;
  const dot = $("syncDot");
  dot.className = "dot" + (!apiUrl() ? " off" : n ? " wait" : "");
  $("syncText").textContent = !apiUrl() ? "Bağlı değil" : n ? n + " bekliyor" : "Gönderildi";
  $("configBanner").classList.toggle("hidden", !!apiUrl());
}
setInterval(() => { if (Object.keys(outbox).length) flush(); }, 30000);
window.addEventListener("online", flush);

/* =========================================================
   Görünümler
   ========================================================= */
function show(v) {
  if (v === "menu") { openMenu(); return; }
  if ((!profile || !profile.name) && v !== "vAdmin") v = "vSetup";
  currentView = v;
  document.querySelectorAll(".view").forEach(s => s.classList.toggle("hidden", s.id !== v));
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  if (v === "vToday") renderToday();
  if (v === "vMine") renderMine();
  if (v === "vPromo") renderSlide();
  if (v === "vForm" && !editing && !formStart && !geo) getGeo(true);
  if (v === "vAdmin") adminEnter();
  window.scrollTo(0, 0);
  try { history.replaceState(null, "", v === "vAdmin" ? "#yonetim" : "#"); } catch (e) {}
}
$("tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(b.dataset.v); });
$("menuBtn").onclick = openMenu;

/* Modal */
function modal(html, onMount) {
  const root = $("modalRoot");
  root.innerHTML = `<div class="modal"><div class="sheet">${html}</div></div>`;
  const m = root.firstChild;
  m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-close]")) closeModal(); });
  if (onMount) onMount(m);
}
function closeModal() { $("modalRoot").innerHTML = ""; }

function openMenu() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  modal(`
    <h2>Menü</h2>
    ${standalone ? "" : `<div class="menu-item" data-a="install"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Uygulamayı telefona kur</div>`}
    <div class="menu-item" data-a="sync"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>Bekleyenleri şimdi gönder</div>
    <div class="menu-item" data-a="name"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>Adımı / telefonumu değiştir</div>
    <div class="menu-item" data-a="admin"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>Yönetim paneli</div>
    <div class="spacer"></div><button class="btn ghost block" data-close>Kapat</button>`, m => {
    m.querySelectorAll("[data-a]").forEach(x => x.onclick = () => {
      const a = x.dataset.a; closeModal();
      if (a === "install") doInstall(isIOS);
      if (a === "sync") { flush(); toast("Gönderiliyor…"); }
      if (a === "name") { $("setupName").value = profile ? profile.name : ""; $("setupPhone").value = profile ? profile.phone || "" : ""; currentView = "vSetup"; document.querySelectorAll(".view").forEach(s => s.classList.toggle("hidden", s.id !== "vSetup")); }
      if (a === "admin") show("vAdmin");
    });
  });
}

/* Kurulum (ana ekrana ekleme) */
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; updateInstallBanner(); });
window.addEventListener("appinstalled", () => { deferredInstall = null; updateInstallBanner(); toast("Uygulama kuruldu"); });
function updateInstallBanner() {
  const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  $("installBanner").classList.toggle("hidden", standalone || !(deferredInstall || isIOS) || ls("lj_install_hide"));
}
$("installBtn").onclick = () => doInstall(/iphone|ipad|ipod/i.test(navigator.userAgent));
async function doInstall(isIOS) {
  if (deferredInstall) { deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (e) {} deferredInstall = null; updateInstallBanner(); return; }
  modal(`<h2>Telefona kur</h2>
    ${isIOS ? `<p><b>iPhone:</b> Bu sayfayı <b>Safari</b>'de aç.</p><ol><li>Alttaki <b>Paylaş</b> simgesine dokun (yukarı oklu kare).</li><li><b>Ana Ekrana Ekle</b>'yi seç.</li><li>Sağ üstte <b>Ekle</b>'ye dokun.</li></ol>`
      : `<p><b>Android:</b> Bu sayfayı <b>Chrome</b>'da aç.</p><ol><li>Sağ üstteki <b>⋮</b> menüsüne dokun.</li><li><b>Uygulamayı yükle</b> ya da <b>Ana ekrana ekle</b>'yi seç.</li><li><b>Yükle</b>'ye dokun.</li></ol>`}
    <p class="muted small">Kurduktan sonra LezJet Saha ana ekranda uygulama olarak durur; internet yokken de açılır.</p>
    <button class="btn block" data-close>Tamam</button>
    <button class="btn ghost block" style="margin-top:8px" id="hideInst">Bir daha gösterme</button>`, m => {
    m.querySelector("#hideInst").onclick = () => { ls("lj_install_hide", true); updateInstallBanner(); closeModal(); };
  });
}

/* =========================================================
   İlk açılış
   ========================================================= */
$("setupSave").onclick = () => {
  const name = $("setupName").value.trim(); if (!name) return toast("Adını yaz");
  const phone = $("setupPhone").value.trim();
  profile = { name, phone }; ls("lj_profile", profile);
  $("whoName").textContent = name; show("vToday");
};

/* =========================================================
   Bugün ekranı
   ========================================================= */
let rotaDay = Math.min(5, Math.max(0, (new Date().getDay() + 6) % 7));
let rotaFilter = "";
$("daySeg").innerHTML = D.rota.map((r, i) => `<button data-i="${i}">${r.gun.slice(0, 3)}</button>`).join("");
$("daySeg").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; rotaDay = +b.dataset.i; renderToday(); });
$("rotaFilter").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; rotaFilter = b.dataset.k; $("rotaFilter").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); renderToday(); });

function list() { return Object.values(mine).sort((a, b) => b.createdAt - a.createdAt); }
function countGoals(items) {
  return { "Esnaf": items.filter(v => v.tur === "Esnaf").length, "Site / plaza": items.filter(v => isSite(v.tur)).length, "Muhtarlık": items.filter(v => v.tur === "Muhtarlık").length, "Okul": items.filter(v => v.tur === "Okul").length };
}
function renderToday() {
  const tk = todayKey();
  const today = list().filter(v => dayKey(v.createdAt) === tk);
  const d = new Date();
  $("todayDate").textContent = d.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
  $("hello").textContent = "Merhaba " + ((profile && profile.name) || "").split(" ")[0];
  $("stTotal").textContent = today.length;
  $("stPos").textContent = today.filter(v => POSITIVE.includes(v.sonuc)).length;
  $("stReg").textContent = today.filter(v => v.sonuc === "Kayıt oldu").length;
  $("stFollow").textContent = list().filter(v => v.takip === tk).length;
  const c = countGoals(today);
  $("goals").innerHTML = Object.keys(D.hedef).map(k => { const h = D.hedef[k], n = c[k] || 0, p = Math.min(100, Math.round(n / h * 100)); return `<div class="progress"><div class="lbl"><span>${esc(k)}</span><b>${n} / ${h}</b></div><div class="track"><div class="fill ${n >= h ? "full" : ""}" style="width:${p}%"></div></div></div>`; }).join("");

  $("daySeg").querySelectorAll("button").forEach(b => b.classList.toggle("on", +b.dataset.i === rotaDay));
  const R = D.rota[rotaDay];
  $("rotaTitle").textContent = R.gun + ": " + R.baslik; $("rotaHat").textContent = "Esnaf hatları: " + R.hat;
  const doneKeys = new Set(list().map(v => v.rota).filter(Boolean));
  const items = R.items.map((it, i) => ({ it, key: R.gun + "#" + i })).filter(x => !rotaFilter || x.it[0] === rotaFilter);
  const doneN = R.items.filter((_, i) => doneKeys.has(R.gun + "#" + i)).length;
  $("rotaInfo").textContent = doneN + " / " + R.items.length + " ziyaret edildi";
  $("rotaList").innerHTML = items.map(({ it, key }) => {
    const [tur, ad, mah, adr, tel] = it; const done = doneKeys.has(key);
    return `<div class="li ${done ? "done" : ""}"><div class="check">${done ? svgCheck : ""}</div><div class="main">
      <div class="t">${esc(ad)}</div><div class="muted small">${esc(tur)} · ${esc(mah)}${adr ? " · " + esc(adr) : ""}</div>
      <div class="acts"><button class="btn tiny" data-visit="${esc(key)}">${done ? "Tekrar ziyaret" : "Ziyaret et"}</button>
      ${tel ? `<a class="btn tiny ghost" href="${telHref(tel)}">Ara ${esc(tel)}</a>` : ""}
      <a class="btn tiny ghost" href="${mapsHref(ad + " " + (adr || mah) + " Çekmeköy İstanbul")}" target="_blank" rel="noopener">Yol tarifi</a></div></div></div>`;
  }).join("") || '<div class="empty">Bu filtrede yer yok.</div>';
}
$("rotaList").addEventListener("click", e => {
  const b = e.target.closest("[data-visit]"); if (!b) return;
  const [gun, i] = b.dataset.visit.split("#"); const R = D.rota.find(r => r.gun === gun); const it = R.items[+i];
  resetForm(); rotaKey = b.dataset.visit;
  const tur = it[0]; setChip("f_tur", tur); applyTur();
  setMahalle("Çekmeköy", it[2]); $("f_ad").value = it[1]; $("f_adres").value = it[3] || ""; $("f_tel").value = it[4] || "";
  $("rotaTag").textContent = "Rotadan: " + gun; $("rotaTag").classList.remove("hidden");
  $("cancelEdit").classList.remove("hidden");
  show("vForm");
});

/* Gün sonu */
$("dayCloseBtn").onclick = () => {
  const tk = todayKey(); const today = list().filter(v => dayKey(v.createdAt) === tk); const c = countGoals(today);
  const prev = ls("lj_dayclose_" + tk) || {};
  modal(`<h2>Günü kapat</h2>
    <p class="muted small">${fmtDate(tk)} · ${esc(profile.name)}</p>
    <div class="kpis" style="grid-template-columns:repeat(3,1fr)">
      <div class="kpi"><div class="v">${today.length}</div><div class="l">Ziyaret</div></div>
      <div class="kpi"><div class="v">${today.filter(v => POSITIVE.includes(v.sonuc)).length}</div><div class="l">Olumlu</div></div>
      <div class="kpi"><div class="v">${today.filter(v => v.sonuc === "Kayıt oldu").length}</div><div class="l">Kayıt</div></div>
    </div>
    <p class="small">Esnaf ${c["Esnaf"]} · Site/plaza ${c["Site / plaza"]} · Muhtarlık ${c["Muhtarlık"]} · Okul ${c["Okul"]}</p>
    <label for="dcNote">Günün özeti (ne iyi gitti, ne zorladı, yarın ne lazım)</label>
    <textarea id="dcNote">${esc(prev.note || "")}</textarea>
    <div class="spacer"></div>
    <button class="btn block" id="dcSend">Gönder</button>
    <button class="btn ghost block" style="margin-top:8px" data-close>Vazgeç</button>`, m => {
    m.querySelector("#dcSend").onclick = async () => {
      const note = m.querySelector("#dcNote").value.trim();
      const id = "gun-" + tk + "-" + (profile.phone || profile.name).replace(/\s+/g, "");
      const day = { id, date: fmtDate(tk), staffName: profile.name, staffPhone: profile.phone || "", total: today.length, esnaf: c["Esnaf"], site: c["Site / plaza"], muhtar: c["Muhtarlık"], okul: c["Okul"], kayit: today.filter(v => v.sonuc === "Kayıt oldu").length, olumlu: today.filter(v => POSITIVE.includes(v.sonuc)).length, note };
      ls("lj_dayclose_" + tk, day);
      outbox[id] = { kind: "day", data: day }; await store.put("outbox", id, outbox[id]);
      closeModal(); toast("Gün sonu raporu gönderiliyor"); setSync(); flush();
    };
  });
};

/* =========================================================
   Kayıtlarım
   ========================================================= */
let mineMode = "bugun";
$("mineSeg").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; mineMode = b.dataset.k; $("mineSeg").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); renderMine(); });
$("mineSearch").addEventListener("input", () => renderMine());
function renderMine() {
  const tk = todayKey(); const q = $("mineSearch").value.trim().toLocaleLowerCase("tr");
  let L = list();
  if (mineMode === "bugun") L = L.filter(v => dayKey(v.createdAt) === tk);
  if (mineMode === "takip") L = L.filter(v => v.takip || v.sonuc === "Tekrar gel" || v.sonuc === "Olumlu, düşünecek").sort((a, b) => (a.takip || "9").localeCompare(b.takip || "9"));
  if (mineMode === "bekleyen") L = L.filter(v => outbox[v.id]);
  if (q) L = L.filter(v => [v.ad, v.cadde, v.mahalle, v.not, v.yetkili].join(" ").toLocaleLowerCase("tr").includes(q));
  $("mineCount").textContent = L.length + " kayıt";
  if (!L.length) { $("mineList").innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg><p>Burada kayıt yok.</p></div>'; return; }
  $("mineList").innerHTML = L.map(v => {
    const pend = outbox[v.id];
    const due = v.takip ? (v.takip < tk ? "b-bad" : v.takip === tk ? "b-warn" : "b-info") : "";
    return `<div class="li"><div class="main">
      <div class="t">${esc(v.ad)}</div>
      <div class="muted small">${esc(v.tur)} · ${esc(v.mahalle || v.ilce)}${v.cadde ? " · " + esc(v.cadde) : ""} · ${fmtTime(v.createdAt)}</div>
      <div style="margin-top:6px;display:flex;gap:5px;flex-wrap:wrap"><span class="badge ${SONUC_CLS[v.sonuc] || "b-n"}">${esc(v.sonuc || "-")}</span>
        ${v.takip ? `<span class="badge ${due}">Takip ${fmtDate(v.takip)}</span>` : ""}
        ${pend ? `<span class="badge b-warn">${pend.error ? "Hata: tekrar denenecek" : "Gönderilmedi"}</span>` : `<span class="badge b-ok">Gönderildi</span>`}</div>
      ${v.takipNot ? `<div class="small" style="margin-top:6px">↳ ${esc(v.takipNot)}</div>` : ""}
      <div class="acts"><button class="btn tiny ghost" data-edit="${esc(v.id)}">Düzenle</button>${v.tel ? `<a class="btn tiny ghost" href="${telHref(v.tel)}">Ara</a>` : ""}</div>
    </div></div>`;
  }).join("");
}
$("mineList").addEventListener("click", e => {
  const b = e.target.closest("[data-edit]"); if (!b) return;
  const r = mine[b.dataset.edit]; if (!r) return;
  resetForm();
  editing = { id: r.id, createdAt: r.createdAt };
  fillForm(r);
  photosKept = (r.photos || []).map((p, i) => ({ id: p.id, url: p.url, thumb: (r.localThumbs || [])[i] || "" }));
  // gönderilmemiş yeni fotoğraflar kuyruktaysa onları da koru
  const pend = outbox[r.id];
  if (pend && pend.kind === "visit" && pend.data.photosNew) photosNew = pend.data.photosNew.map((p, i) => ({ data: p.data, mime: p.mime, thumb: (r.localThumbs || [])[photosKept.length + i] || "data:image/jpeg;base64," + p.data }));
  renderPhotos();
  $("formTitle").textContent = "Ziyareti düzenle"; $("saveBtn").textContent = "Değişiklikleri kaydet"; $("cancelEdit").classList.remove("hidden");
  show("vForm");
});

/* =========================================================
   Tanıtım
   ========================================================= */
let si = 0;
function renderSlide() {
  const s = SLIDES[si];
  $("slideBox").innerHTML = `<div class="slide"><div class="brand"><span class="mark">L</span>LezJet</div><h2>${s.h}</h2><div>${s.b}</div><div class="foot"><span>lezjet.com</span><span>${si + 1} / ${SLIDES.length}</span></div></div>`;
  $("dots").innerHTML = SLIDES.map((_, i) => `<span class="${i === si ? "on" : ""}"></span>`).join("");
  $("prevSlide").disabled = si === 0; $("nextSlide").textContent = si === SLIDES.length - 1 ? "Başa dön" : "İleri ›";
  const q = $("promoQr");
  if (q) loadScript("https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js").then(() => { q.innerHTML = ""; new window.QRCode(q, { text: "https://lezjet.com", width: 168, height: 168, colorDark: "#1b1b19", colorLight: "#ffffff" }); }).catch(() => { q.textContent = "lezjet.com"; });
}
$("prevSlide").onclick = () => { if (si > 0) { si--; renderSlide(); } };
$("nextSlide").onclick = () => { si = (si + 1) % SLIDES.length; renderSlide(); };
let tx = null;
$("slideBox").addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
$("slideBox").addEventListener("touchend", e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 50) { si = dx < 0 ? Math.min(SLIDES.length - 1, si + 1) : Math.max(0, si - 1); renderSlide(); } });

const scripts = {};
function loadScript(src) { if (scripts[src]) return scripts[src]; scripts[src] = new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => { delete scripts[src]; rej(); }; document.head.appendChild(s); }); return scripts[src]; }
function loadCss(href) { if (document.querySelector(`link[href="${href}"]`)) return; const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l); }

/* =========================================================
   Yönetim paneli
   ========================================================= */
let adminPw = sessionStorage.getItem("lj_admin_pw") || "";
let A = { rows: [], days: [], sheetUrl: "" };
let filtersReady = false;
const opt = (list, all) => `<option value="">${all}</option>` + list.map(x => `<option>${esc(x)}</option>`).join("");

function adminEnter() {
  $("a_api").value = apiUrl();
  if (adminPw && !A.rows.length) adminLoad(); else if (adminPw) renderAdmin();
}
$("a_login").onclick = () => { adminPw = $("a_pw").value; if (!adminPw) return toast("Şifreyi yaz"); adminLoad(); };
$("a_pw").addEventListener("keydown", e => { if (e.key === "Enter") $("a_login").click(); });
$("a_apiSave").onclick = () => { const v = $("a_api").value.trim(); ls("lj_api", v || null); setSync(); toast(v ? "Sunucu adresi kaydedildi" : "Silindi"); flush(); };
$("a_refresh").onclick = () => adminLoad();
$("a_logout").onclick = () => { adminPw = ""; sessionStorage.removeItem("lj_admin_pw"); A = { rows: [], days: [], sheetUrl: "" }; $("adminBody").classList.add("hidden"); $("loginCard").classList.remove("hidden"); $("a_pw").value = ""; };

async function adminLoad() {
  $("a_status").textContent = "Yükleniyor…";
  $("a_login").disabled = true;
  try {
    const r = await api("report", { pw: adminPw });
    A = { rows: r.rows || [], days: r.days || [], sheetUrl: r.sheetUrl || "" };
    sessionStorage.setItem("lj_admin_pw", adminPw);
    $("loginCard").classList.add("hidden"); $("adminBody").classList.remove("hidden");
    $("sheetLink").href = A.sheetUrl || "#";
    initFilters();
    $("a_status").textContent = "Son güncelleme " + new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) + " · toplam " + A.rows.length + " ziyaret";
    renderAdmin();
  } catch (e) {
    if (e.message === "bad_password") { adminPw = ""; sessionStorage.removeItem("lj_admin_pw"); toast("Şifre yanlış"); $("adminBody").classList.add("hidden"); $("loginCard").classList.remove("hidden"); }
    else if (e.message === "no_api") toast("Önce sunucu adresini gir (Sunucu ayarı)");
    else toast("Veri alınamadı, interneti kontrol et");
    $("a_status").textContent = "";
  } finally { $("a_login").disabled = false; }
}

function setRange(r) {
  const now = new Date(); let from = "", to = todayKey();
  if (r === "today") from = to;
  if (r === "week") { const d = new Date(now); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); from = dayKey(d.getTime()); }
  if (r === "month") from = dayKey(new Date(now.getFullYear(), now.getMonth(), 1).getTime());
  if (r === "all") { from = ""; to = ""; }
  $("a_from").value = from; $("a_to").value = to;
  $("a_range").querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.r === r));
}
function initFilters() {
  if (filtersReady) { refreshFilterOptions(); return; }
  filtersReady = true;
  $("a_ilce").innerHTML = opt(D.ilceler, "Tümü"); $("a_tur").innerHTML = opt(TURLER, "Tümü"); $("a_sonuc").innerHTML = opt(SONUC, "Tümü");
  refreshFilterOptions(); setRange("week");
  $("a_range").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; setRange(b.dataset.r); renderAdmin(); });
  ["a_from", "a_to"].forEach(id => $(id).addEventListener("change", () => { $("a_range").querySelectorAll("button").forEach(b => b.classList.remove("on")); renderAdmin(); }));
  ["a_staff", "a_ilce", "a_mahalle", "a_tur", "a_sonuc"].forEach(id => $(id).addEventListener("change", renderAdmin));
  let t; $("a_q").addEventListener("input", () => { clearTimeout(t); t = setTimeout(renderAdmin, 200); });
}
function refreshFilterOptions() {
  const keep = (id, list) => { const c = $(id).value; $(id).innerHTML = opt(list, "Tümü"); if (list.includes(c)) $(id).value = c; };
  keep("a_staff", [...new Set(A.rows.map(v => v.staffName || "İsimsiz"))].sort((a, b) => a.localeCompare(b, "tr")));
  keep("a_mahalle", [...new Set(A.rows.map(v => v.mahalle).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")));
}
function filtered() {
  const f = $("a_from").value, t = $("a_to").value, s = $("a_staff").value, il = $("a_ilce").value, m = $("a_mahalle").value, tu = $("a_tur").value, so = $("a_sonuc").value, q = $("a_q").value.trim().toLocaleLowerCase("tr");
  return A.rows.filter(v => {
    const dk = dayKey(v.createdAt);
    if (f && dk < f) return false; if (t && dk > t) return false;
    if (s && (v.staffName || "İsimsiz") !== s) return false; if (il && v.ilce !== il) return false; if (m && v.mahalle !== m) return false;
    if (tu && v.tur !== tu) return false; if (so && v.sonuc !== so) return false;
    if (q && ![v.ad, v.not, v.cadde, v.mahalle, v.yetkili, v.adres, v.staffName, v.takipNot].join(" ").toLocaleLowerCase("tr").includes(q)) return false;
    return true;
  }).sort((a, b) => b.createdAt - a.createdAt);
}
function countBy(L, fn) { const m = new Map(); L.forEach(v => { const k = fn(v); (Array.isArray(k) ? k : [k]).forEach(x => { if (x) m.set(x, (m.get(x) || 0) + 1); }); }); return [...m.entries()].sort((a, b) => b[1] - a[1]); }
function bars(E, empty, color) {
  if (!E.length) return `<p class="muted small">${empty || "Veri yok"}</p>`;
  const max = Math.max(...E.map(e => e[1]));
  return E.map(([k, n]) => `<div class="bar"><div class="n" title="${esc(k)}">${esc(k)}</div><div class="track"><div class="fill" style="width:${Math.max(3, Math.round(n / max * 100))}%;${color && color[k] ? "background:" + color[k] : ""}"></div></div><div class="c">${n}</div></div>`).join("");
}
const avg = arr => { const a = arr.map(x => parseFloat(String(x || "").replace(",", "."))).filter(x => !isNaN(x) && x > 0); return a.length ? { v: a.reduce((s, x) => s + x, 0) / a.length, n: a.length } : null; };
let lastL = [];

function renderAdmin() {
  refreshFilterOptions();
  const L = filtered(); lastL = L;
  const esnaf = L.filter(v => v.tur === "Esnaf"), sites = L.filter(v => isSite(v.tur));
  const pos = L.filter(v => POSITIVE.includes(v.sonuc)).length, reg = L.filter(v => v.sonuc === "Kayıt oldu").length;
  const staffN = new Set(L.map(v => v.staffName)).size, daysN = new Set(L.map(v => (v.staffName || "") + dayKey(v.createdAt))).size;
  const tk = todayKey();
  const overdue = L.filter(v => v.takip && v.takip <= tk && !["Kayıt oldu", "İlgilenmedi"].includes(v.sonuc)).length;
  const sure = avg(L.map(v => v.sureDk));
  const pct = n => L.length ? Math.round(n / L.length * 100) + "%" : "–";
  $("kpis").innerHTML = [
    [L.length, "Toplam ziyaret", true], [reg, "Kayıt oldu"], [pct(pos), "Olumlu oran"], [esnaf.length, "Esnaf"],
    [sites.length + " / " + sites.filter(v => POSITIVE.includes(v.sonuc)).length, "Site-plaza / olumlu"], [L.filter(v => v.tur === "Muhtarlık").length + " / " + L.filter(v => v.tur === "Okul").length, "Muhtarlık / okul"],
    [daysN ? (L.length / daysN).toFixed(1) : "–", "Eleman-gün başına ziyaret"], [overdue, "Vadesi gelen takip"],
    [staffN, "Aktif eleman"], [sure ? Math.round(sure.v) + " dk" : "–", "Ort. ziyaret süresi"], [L.filter(v => (v.photos || []).length).length, "Fotoğraflı ziyaret"], [L.filter(v => v.geo).length, "Konumlu ziyaret"]
  ].map(([v, l, acc]) => `<div class="kpi ${acc ? "accent" : ""}"><div class="v">${esc(v)}</div><div class="l">${esc(l)}</div></div>`).join("");

  // Huni
  const steps = [["Ziyaret", L.length], ["Yetkiliyle görüşüldü", L.filter(v => v.sonuc && v.sonuc !== "Yetkili yoktu").length], ["Tanıtım gösterildi", L.filter(v => v.tanitim === "Evet").length], ["Olumlu", pos], ["Kayıt oldu", reg]];
  const mx = Math.max(1, steps[0][1]);
  $("funnel").innerHTML = steps.map(([t, n]) => `<div class="step"><div class="b" style="width:${Math.max(12, Math.round(n / mx * 100))}%">${n}</div><div class="t">${esc(t)}</div></div>`).join("");

  // Eleman tablosu
  const st = new Map();
  L.forEach(v => { const k = v.staffName || "İsimsiz"; const o = st.get(k) || { n: 0, e: 0, s: 0, m: 0, ok: 0, p: 0, reg: 0, days: new Set(), sure: [] }; o.n++; if (v.tur === "Esnaf") o.e++; if (isSite(v.tur)) o.s++; if (v.tur === "Muhtarlık" || v.tur === "Okul") o.m++; if (POSITIVE.includes(v.sonuc)) o.p++; if (v.sonuc === "Kayıt oldu") o.reg++; o.days.add(dayKey(v.createdAt)); if (v.sureDk) o.sure.push(v.sureDk); st.set(k, o); });
  $("byStaff").innerHTML = st.size ? `<table class="data"><tr><th>Eleman</th><th>Ziyaret</th><th>Gün</th><th>Gün ort.</th><th>Esnaf</th><th>Site</th><th>Muht./Okul</th><th>Olumlu</th><th>Kayıt</th><th>Ort. dk</th></tr>` +
    [...st.entries()].sort((a, b) => b[1].n - a[1].n).map(([k, o]) => { const s = avg(o.sure); return `<tr><td><b>${esc(k)}</b></td><td>${o.n}</td><td>${o.days.size}</td><td>${(o.n / o.days.size).toFixed(1)}</td><td>${o.e}</td><td>${o.s}</td><td>${o.m}</td><td>${o.p}</td><td>${o.reg}</td><td>${s ? Math.round(s.v) : "–"}</td></tr>`; }).join("") + `</table>` : '<p class="muted small">Veri yok</p>';

  $("bySonuc").innerHTML = bars(countBy(L, v => v.sonuc), "", SONUC_COLOR);
  $("byTur").innerHTML = bars(countBy(L, v => v.tur));
  const mh = new Map();
  L.forEach(v => { const k = (v.mahalle || "-") + (v.ilce && v.ilce !== "Çekmeköy" ? " (" + v.ilce + ")" : ""); const o = mh.get(k) || { n: 0, e: 0, s: 0, o: 0, m: 0, p: 0, r: 0 }; o.n++; if (v.tur === "Esnaf") o.e++; if (isSite(v.tur)) o.s++; if (v.tur === "Okul") o.o++; if (v.tur === "Muhtarlık") o.m++; if (POSITIVE.includes(v.sonuc)) o.p++; if (v.sonuc === "Kayıt oldu") o.r++; mh.set(k, o); });
  $("byMahalle").innerHTML = mh.size ? `<table class="data"><tr><th>Mahalle</th><th>Top.</th><th>Esnaf</th><th>Site</th><th>Okul</th><th>Muht.</th><th>Olumlu</th><th>Kayıt</th></tr>` +
    [...mh.entries()].sort((a, b) => b[1].n - a[1].n).map(([k, o]) => `<tr><td>${esc(k)}</td><td>${o.n}</td><td>${o.e}</td><td>${o.s}</td><td>${o.o}</td><td>${o.m}</td><td>${o.p}</td><td>${o.r}</td></tr>`).join("") + `</table>` : '<p class="muted small">Veri yok</p>';
  $("byPlatform").innerHTML = bars(countBy(esnaf, v => (v.q && v.q.platform) || []), "Esnaf verisi yok");
  $("bySorun").innerHTML = bars(countBy(esnaf, v => (v.q && v.q.sorun) || []), "Esnaf verisi yok");
  $("byItiraz").innerHTML = bars(countBy(esnaf, v => ((v.q && v.q.itiraz) || []).filter(x => x !== "Yok")), "İtiraz kaydı yok");
  $("byKategori").innerHTML = bars(countBy(esnaf, v => v.q && v.q.kategori), "Esnaf verisi yok");
  const k = avg(esnaf.map(v => v.q && v.q.komisyon)), g = avg(esnaf.map(v => v.q && v.q.gunluk)), sp = avg(esnaf.map(v => v.q && v.q.sepet));
  const paket = esnaf.filter(v => v.q && v.q.paket === "Evet").length;
  $("esnafAvg").innerHTML = esnaf.length ? [
    k ? `Esnafın söylediği ortalama komisyon: <b>%${k.v.toFixed(1)}</b> (${k.n} cevap)` : "",
    g ? `Günlük ortalama paket sipariş: <b>${Math.round(g.v)}</b> (${g.n} cevap)` : "",
    sp ? `Ortalama sepet: <b>${Math.round(sp.v)} ₺</b> (${sp.n} cevap)` : "",
    `Paket servis yapan: <b>${paket} / ${esnaf.length}</b>`].filter(Boolean).join("<br>") : "";
  $("byDay").innerHTML = bars(countBy(L, v => dayKey(v.createdAt)).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 31).map(([d, n]) => [fmtDate(d), n]));

  // Takip listesi
  const F = L.filter(v => v.takip && !["İlgilenmedi"].includes(v.sonuc)).sort((a, b) => a.takip.localeCompare(b.takip));
  $("followList").innerHTML = F.length ? `<table class="data"><tr><th>Tarih</th><th>Ad</th><th>Eleman</th><th>Yapılacak</th><th>Tel</th></tr>` + F.map(v => `<tr><td><span class="badge ${v.takip < tk ? "b-bad" : v.takip === tk ? "b-warn" : "b-info"}">${fmtDate(v.takip)}</span></td><td><b>${esc(v.ad)}</b><br><span class="muted">${esc(v.tur)} · ${esc(v.mahalle)}</span></td><td>${esc(v.staffName)}</td><td>${esc(v.takipNot || v.sonuc)}</td><td>${v.tel ? `<a href="${telHref(v.tel)}">${esc(v.tel)}</a>` : ""}</td></tr>`).join("") + `</table>` : '<p class="muted small">Takip tarihi girilmiş kayıt yok.</p>';

  // Gün sonu notları
  const days = A.days.slice().reverse().filter(d => !$("a_staff").value || d.staffName === $("a_staff").value);
  $("dayNotes").innerHTML = days.length ? days.map(d => `<div class="li"><div class="main"><div class="t">${esc(d.staffName)} · ${esc(d.date)}</div><div class="muted small">${d.total} ziyaret · esnaf ${d.esnaf} · site ${d.site} · muhtarlık ${d.muhtar} · okul ${d.okul} · olumlu ${d.olumlu} · kayıt ${d.kayit}</div>${d.note ? `<div class="small" style="margin-top:6px">${esc(d.note)}</div>` : ""}</div></div>`).join("") : '<p class="muted small">Henüz gün sonu raporu yok.</p>';

  // Tablo
  $("rowCount").textContent = L.length + " kayıt";
  $("dataTable").innerHTML = `<tr><th>Zaman</th><th>Eleman</th><th>Tür</th><th>Ad</th><th>Mahalle</th><th>Sonuç</th><th>İlgi</th></tr>` +
    L.slice(0, 800).map(v => `<tr class="clk" data-id="${esc(v.id)}"><td>${fmtTime(v.createdAt)}</td><td>${esc(v.staffName)}</td><td>${esc(v.tur)}</td><td><b>${esc(v.ad)}</b>${v.cadde ? '<br><span class="muted">' + esc(v.cadde) + "</span>" : ""}</td><td>${esc(v.mahalle)}</td><td><span class="badge ${SONUC_CLS[v.sonuc] || "b-n"}">${esc(v.sonuc)}</span></td><td>${v.ilgi || "–"}</td></tr>`).join("");

  renderMap(L);
}

$("dataTable").addEventListener("click", e => {
  const tr = e.target.closest("tr[data-id]"); if (!tr) return;
  const nx = tr.nextElementSibling; if (nx && nx.classList.contains("drow")) { nx.remove(); return; }
  const v = lastL.find(x => x.id === tr.dataset.id); if (!v) return;
  const r = document.createElement("tr"); r.className = "drow"; r.innerHTML = `<td colspan="7">${detailHtml(v)}</td>`; tr.after(r);
});
function detailHtml(v) {
  const q = v.q || {}; const P = [];
  const add = (k, x) => { if (x && (!Array.isArray(x) || x.length)) P.push([k, Array.isArray(x) ? x.join(", ") : x]); };
  add("İlçe / mahalle", [v.ilce, v.mahalle].filter(Boolean).join(" / ")); add("Cadde", v.cadde); add("Adres", v.adres);
  add("Görüşülen", [v.yetkili, v.gorev].filter(Boolean).join(" – ")); add("Telefon", v.tel); add("Instagram / web", v.sosyal); add("Gelir düzeyi", v.gelir);
  add("İşletme türü", q.kategori); add("Karar verici", q.kararVerici); add("Paket servis", q.paket); add("Kendi kuryesi", q.kurye); add("Kanallar", q.platform);
  add("Komisyon %", q.komisyon); add("Günlük sipariş", q.gunluk); add("Ort. sepet ₺", q.sepet); add("Çalışma saatleri", q.saatler); add("Sıkıntılar", q.sorun); add("İtirazlar", q.itiraz); add("Kendi mağazası", q.magaza);
  add("Daire / çalışan", q.daire); add("Blok", q.blok); add("Aidat ₺", q.aidat); add("Yönetim firması", q.firma); add("WhatsApp grubu", q.wp); add("Duyuru izni", q.duyuru); add("Kurye girişi", q.kuryeGiris); add("Kararı veren", q.karar); add("Site payı", q.pay); add("2. görüşme", fmtDate(q.ikinci));
  add("Okulda görüşülen", q.okulkisi); add("OAB başkanı", q.oab); add("Öğrenci", q.ogrenci); add("Kermes", q.kermes); add("MEM izni", q.mem);
  add("Muhtarın önerileri", q.oneri); add("Tanıştırma", q.tanistirma); add("Mahalle WhatsApp", q.mahalleWp);
  add("Tanıtım gösterildi", v.tanitim); add("Takip", [fmtDate(v.takip), v.takipNot].filter(Boolean).join(" – ")); add("Ziyaret süresi", v.sureDk ? v.sureDk + " dk" : ""); add("Rota", v.rota); add("Not", v.not);
  const map = v.geo ? `<a class="btn tiny ghost" href="${mapsHref(v.geo.lat + "," + v.geo.lng)}" target="_blank" rel="noopener">Konumu haritada aç</a>` : "";
  const imgs = (v.photos || []).map(p => `<a href="${esc(p.url)}" target="_blank" rel="noopener"><img src="https://drive.google.com/thumbnail?id=${encodeURIComponent(p.id)}&sz=w240" alt="Fotoğraf" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'btn tiny ghost',textContent:'Fotoğrafı aç'}))"></a>`).join("");
  return `<div class="detail"><dl>${P.map(([k, x]) => `<dt>${esc(k)}</dt><dd>${esc(x)}</dd>`).join("")}</dl>${imgs ? `<div class="imgs">${imgs}</div>` : ""}${map ? `<div style="margin-top:10px">${map}</div>` : ""}</div>`;
}

/* Harita */
let lmap = null, llayer = null;
async function renderMap(L) {
  const pts = L.filter(v => v.geo && isFinite(v.geo.lat));
  $("mapNote").textContent = pts.length ? pts.length + " ziyaretin konumu var." : "Seçili aralıkta konumlu ziyaret yok.";
  $("legend").innerHTML = SONUC.map(s => `<span><i style="background:${SONUC_COLOR[s]}"></i>${esc(s)}</span>`).join("");
  try {
    loadCss("https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css");
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js");
  } catch (e) { $("map").innerHTML = '<p class="muted small" style="padding:12px">Harita yüklenemedi.</p>'; return; }
  const Lf = window.L;
  if (!lmap) {
    lmap = Lf.map("map", { scrollWheelZoom: false }).setView([41.035, 29.19], 12);
    Lf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(lmap);
  }
  if (llayer) llayer.remove();
  llayer = Lf.layerGroup(pts.map(v => Lf.circleMarker([v.geo.lat, v.geo.lng], { radius: 8, color: "#fff", weight: 2, fillColor: SONUC_COLOR[v.sonuc] || "#888", fillOpacity: .95 })
    .bindPopup(`<b>${esc(v.ad)}</b><br>${esc(v.tur)} · ${esc(v.sonuc)}<br>${esc(v.staffName)} · ${fmtTime(v.createdAt)}`))).addTo(lmap);
  setTimeout(() => { lmap.invalidateSize(); if (pts.length) lmap.fitBounds(pts.map(v => [v.geo.lat, v.geo.lng]), { padding: [30, 30], maxZoom: 16 }); }, 50);
}

/* CSV */
function toCsv(L) {
  const C = [["Zaman", v => fmtTime(v.createdAt)], ["Eleman", v => v.staffName], ["Eleman tel", v => v.staffPhone], ["İlçe", v => v.ilce], ["Mahalle", v => v.mahalle], ["Cadde", v => v.cadde], ["Adres", v => v.adres], ["Konum", v => v.geo ? v.geo.lat + "," + v.geo.lng : ""],
    ["Tür", v => v.tur], ["Ad", v => v.ad], ["Görüşülen", v => v.yetkili], ["Görevi", v => v.gorev], ["Telefon", v => v.tel], ["Instagram/web", v => v.sosyal], ["Gelir", v => v.gelir],
    ["İşletme türü", v => v.q.kategori], ["Karar verici", v => v.q.kararVerici], ["Paket servis", v => v.q.paket], ["Kurye", v => v.q.kurye], ["Kanallar", v => (v.q.platform || []).join(" / ")], ["Komisyon %", v => v.q.komisyon], ["Günlük sipariş", v => v.q.gunluk], ["Ort. sepet", v => v.q.sepet], ["Saatler", v => v.q.saatler], ["Sıkıntılar", v => (v.q.sorun || []).join(" / ")], ["İtirazlar", v => (v.q.itiraz || []).join(" / ")], ["Kendi mağazası", v => v.q.magaza],
    ["Daire", v => v.q.daire], ["Blok", v => v.q.blok], ["Aidat", v => v.q.aidat], ["Yönetim firması", v => v.q.firma], ["WhatsApp", v => v.q.wp], ["Duyuru", v => v.q.duyuru], ["Kurye girişi", v => v.q.kuryeGiris], ["Karar", v => v.q.karar], ["Site payı", v => v.q.pay], ["2. görüşme", v => v.q.ikinci],
    ["Okulda görüşülen", v => v.q.okulkisi], ["OAB", v => v.q.oab], ["Öğrenci", v => v.q.ogrenci], ["Kermes", v => v.q.kermes], ["MEM", v => v.q.mem], ["Muhtar önerisi", v => v.q.oneri], ["Tanıştırma", v => v.q.tanistirma], ["Mahalle WhatsApp", v => v.q.mahalleWp],
    ["Tanıtım", v => v.tanitim], ["İlgi", v => v.ilgi || ""], ["Sonuç", v => v.sonuc], ["Takip", v => v.takip], ["Takipte yapılacak", v => v.takipNot], ["Süre dk", v => v.sureDk], ["Fotoğraflar", v => (v.photos || []).map(p => p.url).join(" ")], ["Not", v => v.not]];
  const cell = x => { const s = String(x == null ? "" : x); return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return "﻿" + C.map(c => c[0]).join(";") + "\r\n" + L.map(v => { v.q = v.q || {}; return C.map(c => cell(c[1](v))).join(";"); }).join("\r\n");
}
$("csvBtn").onclick = () => {
  const blob = new Blob([toCsv(lastL)], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "lezjet-saha-" + todayKey() + ".csv";
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
};

/* =========================================================
   Başlangıç
   ========================================================= */
(async function init() {
  mine = await store.all("mine");
  outbox = await store.all("outbox");
  resetForm();
  if (profile && profile.name) $("whoName").textContent = profile.name;
  setSync(); updateInstallBanner();
  show(location.hash === "#yonetim" ? "vAdmin" : (profile && profile.name ? "vToday" : "vSetup"));
  flush();
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
})();
