
"use strict";
/* ===================== Yardımcılar ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rid = p => p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const up = s => String(s ?? '').toLocaleUpperCase('tr');
const low = s => String(s ?? '').toLocaleLowerCase('tr');
const pad = n => String(n).padStart(2, '0');
const fmtD = t => { if (!t) return ''; const d = new Date(t); return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear(); };
const todayStr = () => fmtD(Date.now());
const fmtSize = b => b > 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' KB';
const AYLAR = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
let toastT;
function toast(msg, ms = 2800) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, ms); }

const IC = {
  rehberlik:'<circle cx="12" cy="7" r="3.2"/><path d="M5 20.5c.7-3.8 3.4-6 7-6s6.3 2.2 7 6"/><path d="M16.5 3.5l1.5 1.5 3-3"/>',
  pano:'<path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  siniflar:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.5 14c2.3.1 4 1.6 4.5 4.5"/>',
  cizelgeler:'<rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M3.5 9h17M3.5 14h17M9 4v16M14.5 4v16"/>',
  evraklar:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  dosyalar:'<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/>',
  mevzuat:'<path d="M12 4v16M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0zM8 20h8"/>',
  mufettis:'<path d="M5 4h10l4 4v12H5z"/><circle cx="11" cy="13" r="3"/><path d="m13.2 15.2 2.6 2.6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', up:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>', down:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>', user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
  trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>', back:'<path d="M15 5l-7 7 7 7"/>', file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>'
};
const icon = (k, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k] || ''}</svg>`;

/* ===================== Sabit içerik ===================== */
const P0 = { ad:'', hitap:'', brans:'', okul:'', ilce:'', il:'', mudur:'', rehberSinif:'', yil:'2026-2027' };
const BRANSLAR = ['Türkçe','Matematik','Fen Bilimleri','Sosyal Bilgiler','İngilizce','Din Kültürü ve Ahlak Bilgisi','Görsel Sanatlar','Müzik','Beden Eğitimi ve Spor','Bilişim Teknolojileri ve Yazılım','Teknoloji ve Tasarım','T.C. İnkılap Tarihi ve Atatürkçülük','Arapça','Rehberlik ve Psikolojik Danışmanlık','Özel Eğitim','Sınıf Öğretmenliği'];
const rehberKlasor = () => klasorler().find(k => /^Rehberlik/.test(k)) || 'Rehberlik (6A)';
const rsAd = () => prof().rehberSinif || 'rehber sınıfınız';
const isTurkce = () => /türkçe/i.test(prof().brans || '');
const KLASOR0 = ['Kişisel Belgeler','Yıllık Planlar','Ders Planları','Zümre Tutanakları','Şube Öğretmenler Kurulu','Veli Toplantıları','Rehberlik (6A)','Sınav ve Değerlendirme','Öğrenci Çalışmaları','Fotoğraflar','Resmî Yazılar','Mevzuat','Genel'];
const KATEGORI = ['Zümre','Şube Öğretmenler Kurulu','Veli','Rehberlik','Plan','Tutanak','Dilekçe','Diğer'];

const TAKVIM = [
  {t:'2026-09-01', ad:'Öğretmenlerin mesleki çalışmaları'},
  {t:'2026-09-14', ad:'Ders yılı başlangıcı (1. dönem)'},
  {t:'2026-10-29', ad:'Cumhuriyet Bayramı', tur:'milli'},
  {t:'2026-11-10', ad:'Atatürk\'ü Anma Günü', tur:'milli'},
  {t:'2026-11-16', b:'2026-11-20', ad:'1. dönem ara tatili', tur:'tatil'},
  {t:'2026-11-24', ad:'Öğretmenler Günü'},
  {t:'2027-01-22', ad:'1. dönem sonu, karne günü'},
  {t:'2027-01-25', b:'2027-02-05', ad:'Yarıyıl tatili', tur:'tatil'},
  {t:'2027-02-08', ad:'2. dönem başlangıcı'},
  {t:'2027-03-08', b:'2027-03-12', ad:'2. dönem ara tatili', tur:'tatil'},
  {t:'2027-03-12', ad:'İstiklal Marşı\'nın Kabulü ve Mehmet Akif Ersoy\'u Anma Günü', tur:'milli'},
  {t:'2027-03-18', ad:'Çanakkale Zaferi ve Şehitleri Anma Günü', tur:'milli'},
  {t:'2027-04-23', ad:'Ulusal Egemenlik ve Çocuk Bayramı', tur:'milli'},
  {t:'2027-05-19', ad:'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', tur:'milli'},
  {t:'2027-06-25', ad:'Ders yılı sonu'}
];
const dParse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
function inTatil(d) { return TAKVIM.some(e => e.tur === 'tatil' && d >= dParse(e.t) && d <= new Date(dParse(e.b).getTime() + 86399e3)); }
function okulHaftasi(now = new Date()) {
  const start = dParse('2026-09-14'), end = dParse('2027-06-25');
  if (now < start || now > new Date(end.getTime() + 86399e3)) return null;
  let w = 0; for (let m = new Date(start); m <= now; m.setDate(m.getDate() + 7)) if (!inTatil(m)) w++;
  return { w, donem: now < dParse('2027-01-25') ? 1 : 2, tatil: inTatil(now) };
}

const CZ_TPL = [
  {k:'odev', ad:'Ödev Takip Çizelgesi', not:'Her ödev için tarihli sütun ekleyin; dokunarak ✓ ✗ ½ işaretleyin.', cols:[], tarihli:true},
  {k:'defter', ad:'Defter – Kitap Kontrol', not:'Defter, ders kitabı ve okuma kitabı kontrolü; düzen 1–4.', cols:[['Defter','check'],['Ders kitabı','check'],['Okuma kitabı','check'],['Defter düzeni','olcek'],['Temizlik','olcek']], tarihli:true},
  {k:'sozluk', ad:'Sözlük Kontrol Çizelgesi', not:'Sözlük getirme, yeni kelime defteri ve örnek cümle.', cols:[['Sözlük','check'],['Yeni kelime sayısı','sayi'],['Örnek cümle','check'],['Düzen','olcek']]},
  {k:'katilim', ad:'Derse Katılım Çizelgesi', not:'Her ders için tarihli sütun: ✓ etkin, ½ kısmen, ✗ katılmadı.', cols:[], tarihli:true},
  {k:'okuma', ad:'Sesli Okuma Değerlendirme', not:'Doğru ve akıcı okuma ölçütleri, 1–4 dereceli.', cols:[['Doğru okuma','olcek'],['Akıcılık','olcek'],['Vurgu ve tonlama','olcek'],['Noktalamaya uyma','olcek'],['Okuduğunu anlama','olcek']]},
  {k:'konusma', ad:'Konuşma Değerlendirme', not:'Hazırlıklı/hazırlıksız konuşma için dereceli puanlama.', cols:[['Konuya uygunluk','olcek'],['Düşünceleri sıralama','olcek'],['Kelime seçimi','olcek'],['Akıcılık ve telaffuz','olcek'],['Beden dili, göz teması','olcek'],['Süreyi kullanma','olcek']]},
  {k:'dinleme', ad:'Dinleme / İzleme Değerlendirme', not:'Dikkati sürdürme, ana fikir, not alma, yorum.', cols:[['Dikkatini sürdürme','olcek'],['Ana fikri belirleme','olcek'],['Not alma','olcek'],['Soru sorma, yorum','olcek']]},
  {k:'yazma', ad:'Yazma Değerlendirme', not:'Kompozisyon ve metin yazma için dereceli puanlama.', cols:[['Başlık ve giriş','olcek'],['Paragraf düzeni','olcek'],['Yazım ve noktalama','olcek'],['Kelime zenginliği','olcek'],['Okunaklılık, sayfa düzeni','olcek']]},
  {k:'kitap', ad:'Kitap Okuma Takip', not:'Okunan kitap, yazar, sayfa ve sunum.', cols:[['Kitap adı','metin'],['Yazar','metin'],['Sayfa','sayi'],['Bitiş tarihi','metin'],['Özet / sunum','check']]},
  {k:'sinav', ad:'Not Çizelgesi', not:'Yazılı, performans ve proje puanları; ortalama otomatik.', cols:[['1. Yazılı','puan'],['2. Yazılı','puan'],['Performans 1','puan'],['Performans 2','puan'],['Proje','puan']]},
  {k:'performans', ad:'Performans Görevi / Proje Takip', not:'Görev konusu, teslim durumu ve puan.', cols:[['Görev konusu','metin'],['Teslim','check'],['Puan','puan'],['Açıklama','metin']]},
  {k:'gozlem', ad:'Sınıf İçi Gözlem Formu', not:'Davranış ve sosyal-duygusal beceriler, 1–4.', cols:[['Kurallara uyma','olcek'],['Arkadaşlarıyla iletişim','olcek'],['Sorumluluk','olcek'],['Öz denetim','olcek'],['Not','metin']]},
  {k:'bos', ad:'Boş Çizelge', not:'Sütunları kendiniz belirleyin.', cols:[]}
];
const TIP = { check:'✓ ✗ ½', olcek:'1–4', puan:'0–100', sayi:'sayı', metin:'yazı' };
const TIP_AD = { check:'İşaret (✓ ✗ ½)', olcek:'Dereceli (1–4)', puan:'Puan (0–100)', sayi:'Sayı', metin:'Yazı / not' };
const CYC = { check:['', 'v', 'x', 'y'], olcek:['', '1', '2', '3', '4'] };
const SYM = { v:'✓', x:'✗', y:'½' };

/* ---- Mevzuat ---- */
const MARS = [
'Korkma, sönmez bu şafaklarda yüzen al sancak;\nSönmeden yurdumun üstünde tüten en son ocak.\nO benim milletimin yıldızıdır, parlayacak;\nO benimdir, o benim milletimindir ancak.',
'Çatma, kurban olayım, çehreni ey nazlı hilâl!\nKahraman ırkıma bir gül! Ne bu şiddet, bu celâl?\nSana olmaz dökülen kanlarımız sonra helâl.\nHakkıdır, Hakk\'a tapan milletimin istiklâl.',
'Ben ezelden beridir hür yaşadım, hür yaşarım.\nHangi çılgın bana zincir vuracakmış? Şaşarım!\nKükremiş sel gibiyim, bendimi çiğner, aşarım.\nYırtarım dağları, enginlere sığmam, taşarım.',
'Garbın âfâkını sarmışsa çelik zırhlı duvar,\nBenim iman dolu göğsüm gibi serhaddim var.\nUlusun, korkma! Nasıl böyle bir imanı boğar,\nMedeniyyet dediğin tek dişi kalmış canavar?',
'Arkadaş, yurduma alçakları uğratma sakın;\nSiper et gövdeni, dursun bu hayâsızca akın.\nDoğacaktır sana va\'dettiği günler Hakk\'ın;\nKim bilir, belki yarın, belki yarından da yakın.',
'Bastığın yerleri toprak diyerek geçme, tanı:\nDüşün altındaki binlerce kefensiz yatanı.\nSen şehid oğlusun, incitme, yazıktır, atanı:\nVerme, dünyaları alsan da bu cennet vatanı.',
'Kim bu cennet vatanın uğruna olmaz ki fedâ?\nŞühedâ fışkıracak toprağı sıksan, şühedâ!\nCânı, cânânı, bütün varımı alsın da Hudâ,\nEtmesin tek vatanımdan beni dünyada cüdâ.',
'Ruhumun senden İlâhî, şudur ancak emeli:\nDeğmesin mabedimin göğsüne nâmahrem eli.\nBu ezanlar -ki şahadetleri dinin temeli-\nEbedî yurdumun üstünde benim inlemeli.',
'O zaman vecd ile bin secde eder -varsa- taşım,\nHer cerîhamdan İlâhî, boşanıp kanlı yaşım,\nFışkırır ruh-ı mücerred gibi yerden na\'şım;\nO zaman yükselerek arşa değer belki başım.',
'Dalgalan sen de şafaklar gibi ey şanlı hilâl!\nOlsun artık dökülen kanlarımın hepsi helâl.\nEbediyen sana yok, ırkıma yok izmihlâl;\nHakkıdır, hür yaşamış bayrağımın hürriyet;\nHakkıdır, Hakk\'a tapan milletimin istiklâl!'
];
const HITABE = [
'Ey Türk gençliği! Birinci vazifen, Türk istiklâlini, Türk Cumhuriyetini, ilelebet muhafaza ve müdafaa etmektir.',
'Mevcudiyetinin ve istikbalinin yegâne temeli budur. Bu temel, senin en kıymetli hazinendir. İstikbalde dahi, seni bu hazineden mahrum etmek isteyecek dahilî ve haricî bedhahların olacaktır. Bir gün, istiklâl ve cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için, içinde bulunacağın vaziyetin imkân ve şeraitini düşünmeyeceksin! Bu imkân ve şerait, çok namüsait bir mahiyette tezahür edebilir. İstiklâl ve cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın bütün kaleleri zapt edilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şeraitten daha elîm ve daha vahim olmak üzere, memleketin dahilinde iktidara sahip olanlar gaflet ve dalâlet ve hattâ hıyanet içinde bulunabilirler. Hattâ bu iktidar sahipleri şahsî menfaatlerini, müstevlilerin siyasî emelleriyle tevhit edebilirler. Millet, fakr u zaruret içinde harap ve bîtap düşmüş olabilir.',
'Ey Türk istikbalinin evlâdı! İşte, bu ahval ve şerait içinde dahi vazifen, Türk istiklâl ve cumhuriyetini kurtarmaktır! Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!'
];
const KANUN_URL = no => `https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=${no}&MevzuatTur=1&MevzuatTertip=5`;
const YON_URL = 'https://www.meb.gov.tr/mevzuat/liste.php?ara=6';
const MEVZUAT = [
  {g:'Kanun', ad:'1739 sayılı Millî Eğitim Temel Kanunu', tarih:'1973', url:KANUN_URL(1739), oz:[
    'Türk millî eğitiminin genel amaçları ve temel ilkeleri bu kanunda yer alır.',
    'Temel ilkeler: genellik ve eşitlik, ferdin ve toplumun ihtiyaçları, yöneltme, eğitim hakkı, fırsat ve imkân eşitliği, süreklilik, Atatürk inkılap ve ilkelerine bağlılık, demokrasi eğitimi, laiklik, bilimsellik, planlılık, karma eğitim, okul ile ailenin iş birliği, her yerde eğitim.',
    'Yıllık plan ve tutanaklarda "Atatürkçülük" ve genel amaçlara yapılan atıfların dayanağıdır.']},
  {g:'Kanun', ad:'7528 sayılı Öğretmenlik Meslek Kanunu', tarih:'RG 18.10.2024', url:KANUN_URL(7528), oz:[
    'Öğretmenlik mesleğine giriş, Millî Eğitim Akademisi hazırlık eğitimi ve adaylık süreci.',
    'Kariyer basamakları: öğretmen, uzman öğretmen, başöğretmen.',
    'Öğretmenlere özgü hak ve yükümlülükler ile disiplin hükümleri bu kanunla ayrıca düzenlenmiştir.',
    'Ayrıntılar için Aday Öğretmenlik ve Öğretmenlik Mesleği Kariyer Basamakları Yönetmeliği\'ne (21.12.2024) bakınız.']},
  {g:'Kanun', ad:'657 sayılı Devlet Memurları Kanunu', tarih:'1965', url:KANUN_URL(657), oz:[
    'Devlet memurlarının ödev ve sorumlulukları, hakları, izinleri, aylık ve sosyal hakları.',
    'Öğretmenler memur statüsündedir; 7528 sayılı Kanun\'da özel hüküm bulunan konularda o kanun uygulanır.']},
  {g:'Kanun', ad:'222 sayılı İlköğretim ve Eğitim Kanunu', tarih:'1961', url:KANUN_URL(222), oz:[
    'Zorunlu ilköğretim, okula devamın sağlanması ve velinin yükümlülükleri.',
    'Devamsızlık takibi ve veli bildirimlerinin yasal dayanağıdır.']},
  {g:'Kanun', ad:'6698 sayılı Kişisel Verilerin Korunması Kanunu', tarih:'2016', url:KANUN_URL(6698), oz:[
    'Öğrenci ve veli bilgileri kişisel veridir: yalnızca amaca uygun, ölçülü kullanılmalıdır.',
    'Öğrenci fotoğrafı ve çalışmalarını paylaşmadan önce velinin açık rızası alınmalıdır.',
    'Telefonunuzu ekran kilidiyle koruyun; yedek dosyalarını kimseyle paylaşmayın.']},
  {g:'Kanun', ad:'5395 sayılı Çocuk Koruma Kanunu', tarih:'2005', url:KANUN_URL(5395), oz:[
    'Korunma ihtiyacı olan çocuklar için koruyucu ve destekleyici tedbirler.',
    'İhmal veya istismar şüphesinde okul idaresi ve rehberlik servisi aracılığıyla yetkili mercilere bildirim yükümlülüğü vardır.']},
  {g:'Yönetmelik', ad:'MEB Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği', tarih:'RG 26.07.2014 · son değişiklik RG 28.07.2026 / 33323', url:YON_URL, oz:[
    'Ortaokulda kayıt, nakil, devam-devamsızlık, ölçme-değerlendirme, sınıf geçme, ödül ve disiplin esasları.',
    '2026 değişikliği: ortaokul öğrencilerine ders yılı içinde en az bir proje hazırlatılır; teslim edilmeyen projenin puanı sıfır sayılır.',
    'Ölçme ve değerlendirme, dersin öğretim programındaki öğrenme çıktılarına dayanır; başarı bütüncül değerlendirilir.',
    'Gelişim Raporu: 2025-2026\'dan itibaren 5. sınıftan başlayarak kademeli uygulanır, her dönem karneyle verilir (öğretmen görüşü, devam, gelişim düzeyi, sosyal-duygusal beceriler).',
    'Özürsüz devamsızlığı 5, 10 ve 15 güne ulaşan öğrencinin velisine bildirim yapılır.',
    '20 gün ve üzeri özürsüz devamsızlığı olan öğrenciye takdir/teşekkür belgesi verilmez.',
    'Seçmeli dersler ocak-şubat aylarında, veli ve sınıf rehber öğretmeninin bilgisi dâhilinde seçilir.',
    'Beklenen davranışlara dijital okuryazarlık, mahremiyet, bağımlılıkla mücadele ve kitap okuma eklendi; bilişim araçlarının okul kurallarına aykırı kullanımı disiplin konusu sayıldı.',
    'Veli görüşmeleri okulun internet sitesindeki randevu sistemiyle yapılır.']},
  {g:'Yönetmelik', ad:'MEB Rehberlik ve Psikolojik Danışma Hizmetleri Yönetmeliği', tarih:'RG 14.08.2020', url:YON_URL, oz:[
    'Sınıf rehber öğretmeni; sınıf rehberlik planını hazırlar ve uygular, öğrenciyi tanıma çalışmalarına katılır, veliyle iş birliği yapar.',
    'Rehberlik servisine yönlendirme ve gizlilik ilkesine uyma yükümlülüğü.',
    'Sınıf rehberlik etkinlikleri ve yıl sonu çalışma raporu rehberlik servisine teslim edilir.']},
  {g:'Yönetmelik', ad:'MEB Eğitim Kurumları Sosyal Etkinlikler Yönetmeliği', tarih:'RG 08.06.2017', url:YON_URL, oz:[
    'Öğrenci kulüpleri, toplum hizmeti çalışmaları, belirli gün ve haftalar.',
    'Kulüp danışman öğretmeninin görevleri ve etkinlik belgelendirmesi.']},
  {g:'Yönetmelik', ad:'MEB Ders Kitapları ve Eğitim Araçları Yönetmeliği', tarih:'RG 14.10.2021', url:YON_URL, oz:[
    'Ders kitaplarının ve eğitim araçlarının belirlenmesi, dağıtımı ve okutulması.',
    'Yardımcı kaynak seçiminde ilgili hükümleri ve okul idaresinin duyurularını esas alın.']},
  {g:'Yönetmelik', ad:'Aday Öğretmenlik ve Öğretmenlik Mesleği Kariyer Basamakları Yönetmeliği', tarih:'RG 21.12.2024', url:YON_URL, oz:[
    'Adaylık süreci, uzman öğretmenlik ve başöğretmenlik için şartlar ve değerlendirme.']},
  {g:'Yönetmelik', ad:'MEB Öğretmenlerin Atama ve Yer Değiştirme Yönetmeliği', tarih:'RG 09.01.2026', url:YON_URL, oz:[
    'İl içi ve iller arası yer değiştirme, norm kadro ve görevlendirme esasları.']},
  {g:'Yönetmelik', ad:'MEB Eğitim Müfettişleri Yönetmeliği', tarih:'RG 01.03.2022', url:YON_URL, oz:[
    'Eğitim müfettişlerinin rehberlik, denetim, inceleme ve soruşturma görevleri.',
    'Ders denetiminde öğretmen dosyası, planlar ve ölçme-değerlendirme kayıtları incelenebilir.']},
  {g:'Yönetmelik', ad:'MEB Okul Kütüphaneleri Yönetmeliği', tarih:'RG 23.11.2024', url:YON_URL, oz:[
    'Okul kütüphanesinin işleyişi; okuma kültürü çalışmalarında Türkçe öğretmenleriyle iş birliği.']},
  {g:'Yönetmelik', ad:'MEB Personeli Hizmet İçi Eğitim Yönetmeliği', tarih:'RG 11.03.2022', url:YON_URL, oz:[
    'Mesleki çalışma dönemleri ve hizmet içi eğitim faaliyetleri.']},
  {g:'Yönetmelik', ad:'MEB Disiplin Amirleri Yönetmeliği', tarih:'RG 02.01.2022', url:YON_URL, oz:[
    'Bakanlık personeli için disiplin amirleri ve yetkileri.']}
];
const TEMALAR = {
  5:['Oyun Dünyası','Atatürk\'ü Tanımak','Duygularımı Tanıyorum','Geleneklerimiz','İletişim ve Sosyal İlişkiler','Sağlıklı Yaşıyorum'],
  6:['Dilimizin Zenginliği','Bağımsızlık Yolu','Farklı Dünyalar','İletişim ve Sosyal İlişkiler','Bilim ve Teknoloji','Lider Ruhlar']
};

/* ===================== Depolama ===================== */
const S = { page:'pano', pid:null, edit:null, czFilter:'hepsi', evFilter:'hepsi', evQ:'', dzFolder:'hepsi', dzQ:'', mvTab:'metin', mvQ:'', imp:null, upl:null, confirmCb:null, ready:false, idbFail:false, installEvt:null };
const IDB = { db:null,
  open() { return new Promise((res, rej) => { const r = indexedDB.open('ogretmen-dosyam', 1); r.onupgradeneeded = () => { const d = r.result; d.createObjectStore('items'); d.createObjectStore('files'); }; r.onsuccess = () => { this.db = r.result; res(); }; r.onerror = () => rej(r.error); }); },
  all(store) { return new Promise((res, rej) => { const out = []; const r = this.db.transaction(store).objectStore(store).openCursor(); r.onsuccess = () => { const c = r.result; if (c) { out.push([c.key, c.value]); c.continue(); } else res(out); }; r.onerror = () => rej(r.error); }); },
  get(store, key) { return new Promise((res, rej) => { const r = this.db.transaction(store).objectStore(store).get(key); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
  write(store, fn) { return new Promise((res, rej) => { const t = this.db.transaction(store, 'readwrite'); fn(t.objectStore(store)); t.oncomplete = () => res(); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error); }); },
  put(store, key, val) { return this.write(store, s => s.put(val, key)); },
  del(store, key) { return this.write(store, s => s.delete(key)); }
};
const Files = { urls:new Map(),
  async upload(blob) { const id = rid('f'); await IDB.put('files', id, blob); return { id }; },
  get(id) { return IDB.get('files', id); },
  async url(id) { if (this.urls.has(id)) return this.urls.get(id); const b = await this.get(id); if (!b) return ''; const u = URL.createObjectURL(b); this.urls.set(id, u); return u; },
  async delete(id) { await IDB.del('files', id); const u = this.urls.get(id); if (u) { URL.revokeObjectURL(u); this.urls.delete(id); } }
};
const Store = {
  mode:'init', assets:null, items:new Map(), dirty:new Set(), timers:{},
  list(type) { const out = []; for (const [id, d] of this.items) if (d.type === type) out.push({ id, ...d }); return out; },
  get(id) { const d = this.items.get(id); return d ? { id, ...d } : null; },
  put(id, data, now = false) {
    const { id: _drop, ...clean } = data;
    const doc = { ...JSON.parse(JSON.stringify(clean)), guncelleme: Date.now() };
    this.items.set(id, doc); this.dirty.add(id); setSync('busy');
    clearTimeout(this.timers[id]); this.timers[id] = setTimeout(() => this.flush(id), now ? 0 : 500);
    return doc;
  },
  remove(id) { this.items.delete(id); this.dirty.add(id); setSync('busy'); clearTimeout(this.timers[id]); this.timers[id] = setTimeout(() => this.flush(id), 0); },
  async flush(id) {
    clearTimeout(this.timers[id]); if (S.idbFail || !IDB.db) { setSync('err'); return; }
    const d = this.items.get(id);
    try { if (d) await IDB.put('items', id, d); else await IDB.del('items', id); this.dirty.delete(id); if (!this.dirty.size) setSync('ok'); }
    catch (e) { setSync('err'); toast('Kaydedilemedi. Telefonda yer kalmamış olabilir.', 5000); }
  },
  flushAll() { for (const id of [...this.dirty]) this.flush(id); }
};
function setSync(st) {
  const txt = { ok:'Bu cihaza kaydedildi', busy:'Kaydediliyor…', err:'Kaydedilemedi', init:'Açılıyor…' }[st] || '';
  $$('.syncstate').forEach(el => { el.innerHTML = `<span class="dot ${st === 'ok' ? 'ok' : st === 'busy' || st === 'init' ? 'busy' : st === 'err' ? 'err' : ''}"></span><span>${txt}</span>`; });
}
async function hydrate(root) {
  for (const el of $$('[data-fid]', root)) { const u = await Files.url(el.dataset.fid); if (!u) continue; if (el.tagName === 'A') el.href = u; else el.src = u; }
}

/* Veri erişimi */
const ayar = () => Store.get('ayar') || { profil:P0, klasorler:KLASOR0 };
const prof = () => ({ ...P0, ...(ayar().profil || {}) });
const siniflar = () => Store.list('sinif').sort((a, b) => String(a.ad).localeCompare(String(b.ad), 'tr', { numeric:true }));
const cizelgeler = () => Store.list('cizelge').sort((a, b) => (b.guncelleme || 0) - (a.guncelleme || 0));
const evraklar = () => Store.list('evrak').sort((a, b) => (b.guncelleme || 0) - (a.guncelleme || 0));
const dosyalar = () => Store.list('dosya').sort((a, b) => (b.tarih || 0) - (a.tarih || 0));
const kaynaklar = () => Store.list('kaynak');
const klasorler = () => ayar().klasorler || KLASOR0;
const sinifAd = id => (Store.get(id) || {}).ad || '—';

function seedIfEmpty() { /* İlk açılışta kurulum ekranı gösterilir (PAGES.kurulum). */ }
const needsSetup = () => S.ready && !Store.get('ayar');

/* ===================== Kabuk ===================== */
const NAV = [['pano','Ana Sayfa'],['siniflar','Sınıflar'],['rehberlik','Rehberlik'],['cizelgeler','Çizelgeler'],['evraklar','Evraklar'],['dosyalar','Dosyalar'],['mevzuat','Mevzuat'],['mufettis','Müfettiş Dosyası']];
function shell() {
  const p = prof();
  $('#side').innerHTML = `<div class="brand"><div class="brand-mark">ÖD</div><div><b>Öğretmen Dosyam</b><small>${esc(p.yil)} · ${esc(p.brans)}</small></div></div>
    ${NAV.map(([k, t]) => `<button class="navlink" data-act="nav" data-p="${k}">${icon(k)}<span>${t}</span></button>`).join('')}
    <div class="spacer"></div>
    <button class="navlink" data-act="profil">${icon('user')}<span>${esc(p.ad)}</span></button>
    <div class="syncbox syncstate"></div>`;
  $('#topbar').innerHTML = `<div class="brand"><div class="brand-mark">ÖD</div><div style="min-width:0"><b>Öğretmen Dosyam</b><small class="syncstate" style="display:flex;gap:6px;align-items:center"></small></div></div>
    <button class="btn sm" data-act="nav" data-p="mufettis">${icon('mufettis')}Müfettiş</button>
    <button class="btn ghost sm" data-act="profil" aria-label="Profil ve ayarlar">${icon('user')}</button>`;
  const KISA = { 'Ana Sayfa':'Pano', 'Çizelgeler':'Çizelge', 'Evraklar':'Evrak', 'Dosyalar':'Dosya' };
  $('#tabbar').innerHTML = NAV.slice(0, 7).map(([k, t]) => `<button data-act="nav" data-p="${k}">${icon(k)}<span>${KISA[t] || t}</span></button>`).join('');
  setSync(Store.mode === 'init' ? 'init' : Store.dirty.size ? 'busy' : 'ok');
}
function markNav() {
  const top = { sinif:'siniflar', cizelge:'cizelgeler', evrak:'evraklar', ogrenci:'rehberlik', oturma:'rehberlik' }[S.page] || S.page;
  $$('[data-act="nav"]').forEach(b => { if (b.dataset.p === top) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
}
function go(page, pid = null) { if (S.page === 'evrak') evFlush(); S.page = page; S.pid = pid; S.edit = null; render(); window.scrollTo(0, 0); }
function render() {
  const fn = needsSetup() ? PAGES.kurulum : (PAGES[S.page] || PAGES.pano);
  document.body.classList.toggle('setup', needsSetup());
  $('#view').innerHTML = `<div class="wrap">${fn()}</div>`;
  markNav();
}
function banner() {
  if (S.idbFail) return `<div class="banner">Bu tarayıcı veri saklamaya izin vermiyor (gizli sekme olabilir). Uygulamayı normal Chrome sekmesinden açın; aksi hâlde yaptıklarınız kaydedilmez.</div>`;
  return '';
}
function installCard() {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) return '';
  return `<section class="card" style="border-color:var(--blue);background:var(--blue-soft)"><div class="row between"><div style="flex:1;min-width:min(100%,260px)"><h3 style="margin-bottom:4px">Telefonunuza uygulama olarak kurun</h3><p class="note" style="color:var(--ink)">${S.installEvt ? 'Aşağıdaki düğmeye dokunun; ana ekranınıza "Öğretmen Dosyam" simgesi eklenir.' : 'Chrome\'da sağ üstteki ⋮ menüsünden <b>Uygulamayı yükle</b> ya da <b>Ana ekrana ekle</b>\'ye dokunun.'} Kurduktan sonra internet olmadan da çalışır.</p></div>${S.installEvt ? `<button class="btn blue" data-act="install">${icon('down')}Uygulamayı yükle</button>` : ''}</div></section>`;
}

/* ===================== Sayfalar ===================== */
const PAGES = {};

PAGES.kurulum = () => `
  <section class="hero">
    <div class="eyebrow">Hoş geldiniz</div>
    <h1>Öğretmen Dosyam</h1>
    <p class="meta">Sınıf listeleri, değerlendirme çizelgeleri, hazır tutanaklar, dosya arşivi ve mevzuat tek yerde. Bilgileriniz yalnızca bu cihazda saklanır, kimseyle paylaşılmaz. Bir kez doldurun; tüm tutanak ve formlara otomatik yazılır.</p>
  </section>
  <section class="card">
    <h2>Bilgileriniz</h2>
    <div class="fgrid" style="margin-top:6px">
      <div class="field"><label for="ku-ad">Adınız soyadınız *</label><input class="inp" id="ku-ad" placeholder="ör. Ayşe YILMAZ" autocomplete="name"></div>
      <div class="field"><label for="ku-brans">Branşınız *</label><input class="inp" id="ku-brans" list="ku-branslar" placeholder="ör. Türkçe"><datalist id="ku-branslar">${BRANSLAR.map(b => `<option value="${esc(b)}">`).join('')}</datalist></div>
      <div class="field"><label for="ku-okul">Okulunuz *</label><input class="inp" id="ku-okul" placeholder="ör. Atatürk Ortaokulu"></div>
      <div class="field"><label for="ku-ilce">İlçe</label><input class="inp" id="ku-ilce" placeholder="ör. Çekmeköy"></div>
      <div class="field"><label for="ku-il">İl</label><input class="inp" id="ku-il" placeholder="ör. İstanbul"></div>
      <div class="field"><label for="ku-mudur">Okul müdürünün adı soyadı</label><input class="inp" id="ku-mudur"></div>
      <div class="field"><label for="ku-rehber">Rehber öğretmeni olduğunuz sınıf</label><input class="inp" id="ku-rehber" placeholder="ör. 6A (yoksa boş bırakın)"></div>
      <div class="field"><label for="ku-hitap">Size nasıl hitap edelim?</label><input class="inp" id="ku-hitap" placeholder="ör. Ayşe Hanım"></div>
    </div>
    <div class="row" style="margin-top:14px"><button class="btn primary" data-act="kurulum-kaydet">Başla</button><label class="btn" for="yedek-file">${icon('up')}Yedekten geri yükle</label><input type="file" id="yedek-file" data-in="yedek-file" accept=".json,application/json" hidden></div>
    <p class="note" style="margin-top:10px">Başka bir cihazda kullandıysanız oradan aldığınız yedeği "Yedekten geri yükle" ile açabilirsiniz. Bilgilerinizi sonradan Profil bölümünden değiştirebilirsiniz.</p>
  </section>`;

PAGES.pano = () => {
  const p = prof(), h = okulHaftasi(), now = new Date();
  const saat = now.getHours(); const selam = saat < 11 ? 'Günaydın' : saat < 18 ? 'İyi günler' : 'İyi akşamlar';
  const sn = siniflar(), ogrSay = sn.reduce((a, s) => a + (s.ogr || []).length, 0);
  const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yak = TAKVIM.filter(e => dParse(e.b || e.t) >= t0).slice(0, 6);
  const kontrol = kontrolListesi(); const tamam = kontrol.filter(k => k.ok).length;
  const son = [...cizelgeler().map(x => ({ ...x, k:'cizelge', ic:'cizelgeler', baslik:x.ad })), ...evraklar().map(x => ({ ...x, k:'evrak', ic:'evraklar', baslik:x.baslik }))].sort((a, b) => b.guncelleme - a.guncelleme).slice(0, 6);
  return `${banner()}${installCard()}
  <section class="hero">
    <div class="eyebrow">${esc(p.yil)} Eğitim-Öğretim Yılı${h ? ` · ${h.tatil ? 'Tatil haftası' : `${h.donem}. dönem · ders yılının ${h.w}. haftası`}` : ''}</div>
    <h1>${selam}, ${esc(p.hitap)}</h1>
    <p class="meta">${esc(p.okul)} · ${esc(p.brans)} Öğretmeni${p.rehberSinif ? ` · ${esc(p.rehberSinif)} Sınıf Rehber Öğretmeni` : ''}${p.mudur ? ' · Okul Müdürü ' + esc(p.mudur) : ''}</p>
    <div class="row">
      <button class="btn primary" data-act="imp-open">${icon('up')}Sınıf listesi yükle</button>
      <button class="btn" data-act="cz-new">${icon('plus')}Yeni çizelge</button>
      <button class="btn" data-act="nav" data-p="evraklar">${icon('evraklar')}Tutanak / evrak</button>
      <button class="btn" data-act="up-open">${icon('dosyalar')}Dosya yükle</button>
    </div>
  </section>
  <div class="stats">
    ${[['siniflar', sn.length, 'Sınıf'], ['siniflar', ogrSay, 'Öğrenci'], ['cizelgeler', cizelgeler().length, 'Çizelge'], ['evraklar', evraklar().length, 'Evrak'], ['dosyalar', dosyalar().length, 'Dosya']].map(([pg, n, t]) => `<button class="stat" data-act="nav" data-p="${pg}"><b>${n}</b><span>${t}</span></button>`).join('')}
  </div>
  <div class="grid g2">
    <section class="card">
      <div class="row between"><h2>Müfettiş hazırlık listesi</h2><span class="pill ${tamam === kontrol.length ? 'ok' : 'warn'}">${tamam}/${kontrol.length}</span></div>
      <div class="meter" style="margin:4px 0 8px"><i style="width:${Math.round(tamam / kontrol.length * 100)}%"></i></div>
      ${kontrol.map(k => `<div class="check"><span class="box ${k.ok ? 'on' : ''}">${k.ok ? '✓' : ''}</span><div style="flex:1;min-width:0"><div>${esc(k.ad)}</div><small class="muted">${esc(k.ipucu)}</small></div>${k.ok ? '' : `<button class="btn sm" data-act="${k.act}" ${k.arg ? `data-k="${esc(k.arg)}"` : ''}>Oluştur</button>`}</div>`).join('')}
      <div class="row" style="margin-top:12px"><button class="btn blue" data-act="nav" data-p="mufettis">${icon('mufettis')}Müfettiş dosyasını aç</button></div>
    </section>
    <div class="grid" style="align-content:start">
      <section class="card">
        <h2>Yaklaşan günler</h2>
        ${yak.length ? yak.map(e => { const d = dParse(e.t); const kalan = Math.round((d - t0) / 864e5); return `<div class="ev ${e.tur || ''}"><div class="d"><b>${d.getDate()}</b><small>${AYLAR[d.getMonth()]}</small></div><div><div>${esc(e.ad)}</div><small class="muted">${e.b ? fmtD(d) + ' – ' + fmtD(dParse(e.b)) : fmtD(d)}${kalan > 0 ? ` · ${kalan} gün sonra` : kalan === 0 ? ' · bugün' : ' · devam ediyor'}</small></div></div>`; }).join('') : '<p class="muted">Ders yılı takvimi tamamlandı.</p>'}
        <p class="note" style="margin-top:8px">Kaynak: MEB 2026-2027 çalışma takvimi.</p>
      </section>
      <section class="card">
        <h2>Son çalışmalar</h2>
        ${son.length ? `<div class="list">${son.map(x => `<button class="li" data-act="open-${x.k}" data-id="${x.id}">${icon(x.ic)}<span class="t"><b>${esc(x.baslik || 'Adsız')}</b><small>${x.k === 'cizelge' ? 'Çizelge · ' + esc(sinifAd(x.sinifId)) : 'Evrak · ' + esc(x.kategori || '')} · ${fmtD(x.guncelleme)}</small></span></button>`).join('')}</div>`
        : `<div class="empty"><b>Henüz çizelge veya evrak yok</b><span>Önce sınıf listenizi yükleyin, sonra ödev takip çizelgesi gibi bir çizelge oluşturun.</span></div>`}
      </section>
    </div>
  </div>`;
};
function kontrolListesi() {
  const ev = evraklar(), dz = dosyalar();
  const hasEv = (kat, re) => ev.some(e => (!kat || e.kategori === kat) && (!re || re.test(e.baslik || '')));
  const hasF = k => dz.some(f => f.klasor === k);
  return [
    { ad:'Sınıf listeleri yüklendi', ok:siniflar().some(s => (s.ogr || []).length), ipucu:'Excel veya Word listesinden otomatik', act:'imp-open' },
    { ad:(prof().brans || 'Ders') + ' yıllık planı', ok:hasEv('Plan', /yıllık/i) || hasF('Yıllık Planlar'), ipucu:'Dosyalar › Yıllık Planlar klasörüne yükleyin', act:'up-open', arg:'Yıllık Planlar' },
    { ad:'Zümre toplantı tutanağı', ok:hasEv('Zümre') || hasF('Zümre Tutanakları'), ipucu:'Dönem başı ve dönem sonu', act:'ev-new', arg:'zumre_bas' },
    { ad:'Şube öğretmenler kurulu tutanağı', ok:hasEv('Şube Öğretmenler Kurulu') || hasF('Şube Öğretmenler Kurulu'), ipucu:rsAd() + ' rehber öğretmeni olarak', act:'ev-new', arg:'sok' },
    { ad:'Veli toplantısı tutanağı ve katılım listesi', ok:hasEv('Veli', /toplant/i) || hasF('Veli Toplantıları'), ipucu:'Öğrenci adları listeye otomatik gelir', act:'ev-new', arg:'veli' },
    { ad:'Sınıf rehberlik planı', ok:hasEv('Rehberlik') || hasF(rehberKlasor()), ipucu:'Aylık rehberlik etkinlikleri', act:'ev-new', arg:'rehberlik' },
    { ad:'Ders planı (Maarif Modeli)', ok:hasEv('Plan', /ders planı/i) || hasF('Ders Planları'), ipucu:'Tema ve öğrenme çıktılarıyla', act:'ev-new', arg:'dersplani' },
    { ad:'Değerlendirme çizelgeleri', ok:cizelgeler().length > 0, ipucu:'Ödev, okuma, konuşma, defter kontrol…', act:'cz-new' },
    { ad:'Öğrenci tanıma formları', ok:(() => { const s = rehberSinif(); return !!s && (s.ogr || []).length > 0 && (s.ogr || []).filter(o => obDolu(o.id) > 0).length >= (s.ogr || []).length / 2; })(), ipucu:'Fotoğraftan otomatik okunur', act:'nav', arg:'rehberlik' },
    { ad:'Oturma planı', ok:(() => { const s = rehberSinif(); return !!s && !!Store.get('oturma_' + s.id); })(), ipucu:rsAd() + ' için', act:'nav', arg:'rehberlik' },
    { ad:'Sınıf başkanı seçim tutanağı', ok:hasEv(null, /başkan/i), ipucu:rsAd() + ' için', act:'ev-new', arg:'baskan' }
  ];
}

/* ---- Sınıflar ---- */
PAGES.siniflar = () => {
  const sn = siniflar();
  return `${banner()}
  <div class="pagehead"><div><h1>Sınıflar</h1><p>Excel (e-Okul listesi), Word ya da kopyala-yapıştır listeden sınıf oluşturun. Öğrenciler tüm çizelge ve tutanaklarda otomatik kullanılır.</p></div>
    <div class="row"><button class="btn" data-act="sinif-new">${icon('plus')}Boş sınıf</button><button class="btn primary" data-act="imp-open">${icon('up')}Liste yükle</button></div></div>
  ${sn.length ? `<div class="grid g3">${sn.map(s => `<button class="tpl" data-act="open-sinif" data-id="${s.id}">
      <div class="row between"><b style="font-size:22px">${esc(s.ad)}</b>${s.rehber ? '<span class="pill red">Rehber sınıfım</span>' : ''}</div>
      <small><span class="num">${(s.ogr || []).length}</span> öğrenci · <span class="num">${cizelgeler().filter(c => c.sinifId === s.id).length}</span> çizelge</small>
      ${(s.ogr || []).length ? '' : '<small style="color:var(--red)">Liste boş: yüklemek için dokunun</small>'}
    </button>`).join('')}</div>`
  : `<div class="empty"><b>Henüz sınıf yok</b><span>e-Okul'dan aldığınız Excel listesini ya da Word'deki tabloyu yükleyin.</span><button class="btn primary" data-act="imp-open">${icon('up')}Liste yükle</button></div>`}
  <p class="note">İpucu: e-Okul › Öğrenci İşlemleri › Raporlar bölümünden aldığınız sınıf listesi (.xls / .xlsx) doğrudan okunur. Başlık satırı (Öğrenci No, Adı, Soyadı) varsa sütunlar otomatik bulunur.</p>`;
};
PAGES.sinif = () => {
  const s = Store.get(S.pid); if (!s) return `<div class="empty"><b>Sınıf bulunamadı</b><button class="btn" data-act="nav" data-p="siniflar">Sınıflara dön</button></div>`;
  const ogr = s.ogr || []; const cz = cizelgeler().filter(c => c.sinifId === s.id);
  return `<div><button class="btn ghost sm" data-act="nav" data-p="siniflar">${icon('back')}Sınıflar</button></div>
  <div class="pagehead"><div class="row" style="align-items:center">
      <input class="inp" id="sinif-ad" data-in="sinif-ad" value="${esc(s.ad)}" style="font-family:var(--f-disp);font-size:24px;font-weight:700;width:140px">
      <label class="row" style="gap:6px;cursor:pointer"><input type="checkbox" id="sinif-rehber" data-in="sinif-rehber" ${s.rehber ? 'checked' : ''}> Rehber öğretmeni olduğum sınıf</label></div>
    <div class="row"><button class="btn" data-act="rb-git" data-id="${s.id}">${icon('rehberlik')}Öğrenci bilgileri</button><button class="btn" data-act="open-oturma" data-id="${s.id}">Oturma planı</button><button class="btn" data-act="imp-open" data-id="${s.id}">${icon('up')}Listeyi yükle / ekle</button><button class="btn primary" data-act="cz-new" data-id="${s.id}">${icon('plus')}Bu sınıfa çizelge</button></div></div>
  <div class="grid g2" style="align-items:start">
    <section class="card" style="padding:0">
      <div class="row between" style="padding:14px 16px"><h3 style="margin:0">Öğrenci listesi <span class="pill num">${ogr.length}</span></h3>
        <div class="row"><button class="btn sm" data-act="ogr-sort" data-by="no">No'ya göre</button><button class="btn sm" data-act="ogr-sort" data-by="ad">Ada göre</button></div></div>
      <div class="tablewrap" style="border-radius:0;border-left:0;border-right:0">
      <table class="t ogr"><thead><tr><th style="width:44px">#</th><th style="width:90px">No</th><th style="text-align:left">Adı Soyadı</th><th style="text-align:left">Not</th><th></th></tr></thead><tbody>
      ${ogr.map((o, i) => `<tr><td class="no">${i + 1}</td><td><input class="num" id="o-no-${o.id}" data-in="ogr" data-f="no" data-o="${o.id}" value="${esc(o.no)}" inputmode="numeric"></td><td><input id="o-ad-${o.id}" data-in="ogr" data-f="ad" data-o="${o.id}" value="${esc(o.ad)}"></td><td><input id="o-not-${o.id}" data-in="ogr" data-f="not" data-o="${o.id}" value="${esc(o.not || '')}" placeholder="—"></td><td class="del"><button class="btn ghost sm" data-act="ogr-del" data-o="${o.id}" aria-label="Öğrenciyi sil">${icon('x')}</button></td></tr>`).join('')}
      </tbody></table></div>
      <div class="row" style="padding:12px 16px"><button class="btn sm" data-act="ogr-add">${icon('plus')}Öğrenci ekle</button></div>
    </section>
    <div class="grid" style="align-content:start">
      <section class="card"><h3>Bu sınıfın çizelgeleri</h3>
        ${cz.length ? `<div class="list">${cz.map(c => `<button class="li" data-act="open-cizelge" data-id="${c.id}">${icon('cizelgeler')}<span class="t"><b>${esc(c.ad)}</b><small>${(c.cols || []).length} sütun · ${fmtD(c.guncelleme)}</small></span></button>`).join('')}</div>` : '<p class="muted">Henüz çizelge yok.</p>'}
      </section>
      <section class="card"><h3>Sınıfı sil</h3><p class="note" style="margin-bottom:10px">Sınıf silinir; bu sınıfa bağlı çizelgeler kalır ama öğrenci adlarını gösteremez.</p><button class="btn danger" data-act="sinif-del">${icon('trash')}Sınıfı sil</button></section>
    </div>
  </div>`;
};

/* ---- Çizelgeler ---- */
PAGES.cizelgeler = () => {
  const sn = siniflar(); const all = cizelgeler();
  const list = S.czFilter === 'hepsi' ? all : all.filter(c => c.sinifId === S.czFilter);
  return `${banner()}
  <div class="pagehead"><div><h1>Çizelgeler</h1><p>Ödev takibi, defter-kitap ve sözlük kontrolü, derse katılım, okuma-konuşma-yazma değerlendirmeleri. Hücreye dokununca işaret değişir; her şey otomatik kaydedilir.</p></div>
    <button class="btn primary" data-act="cz-new">${icon('plus')}Yeni çizelge</button></div>
  <div class="chips"><button class="chip" data-act="cz-filter" data-k="hepsi" aria-pressed="${S.czFilter === 'hepsi'}">Tümü<span class="n">${all.length}</span></button>
    ${sn.map(s => `<button class="chip" data-act="cz-filter" data-k="${s.id}" aria-pressed="${S.czFilter === s.id}">${esc(s.ad)}<span class="n">${all.filter(c => c.sinifId === s.id).length}</span></button>`).join('')}</div>
  ${list.length ? `<section class="card" style="padding:6px 16px"><div class="list">${list.map(c => { const tp = CZ_TPL.find(t => t.k === c.sablon); return `<button class="li" data-act="open-cizelge" data-id="${c.id}">${icon('cizelgeler')}<span class="t"><b>${esc(c.ad)}</b><small>${esc(sinifAd(c.sinifId))} · ${esc(tp ? tp.ad : 'Özel')} · ${(c.cols || []).length} sütun · ${fmtD(c.guncelleme)}</small></span></button>`; }).join('')}</div></section>`
  : `<div class="empty"><b>Henüz çizelge yok</b><span>Aşağıdaki hazır şablonlardan birini seçin.</span></div>`}
  <div><h2 style="margin-bottom:12px">Hazır şablonlar</h2>
  <div class="grid g3">${CZ_TPL.map(t => `<button class="tpl" data-act="cz-new" data-t="${t.k}"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small>${t.cols.length ? `<div class="cols">${t.cols.slice(0, 5).map(c => `<span class="pill">${esc(c[0])}</span>`).join('')}</div>` : ''}</button>`).join('')}</div></div>`;
};
function czCellClass(tip, v) { if (tip === 'check') return v ? ' ' + v : ''; if (tip === 'olcek') return v ? ' o' + v : ''; return ''; }
function czCellText(tip, v) { if (tip === 'check') return SYM[v] || ''; return v || ''; }
function czRowSum(c, sid) {
  const vals = (c.v || {})[sid] || {}; let v = 0, x = 0, y = 0, os = 0, om = 0, ps = 0, pn = 0;
  for (const col of c.cols || []) { const val = vals[col.id]; if (val === undefined || val === '') continue;
    if (col.tip === 'check') { if (val === 'v') v++; else if (val === 'x') x++; else if (val === 'y') y++; }
    else if (col.tip === 'olcek') { os += +val; om += 4; }
    else if (col.tip === 'puan') { const n = parseFloat(String(val).replace(',', '.')); if (!isNaN(n)) { ps += n; pn++; } } }
  const out = [];
  if (v + x + y) out.push(`✓${v} ✗${x}${y ? ' ½' + y : ''}`);
  if (om) out.push(`${os}/${om}`);
  if (pn) out.push('Ort ' + (Math.round(ps / pn * 10) / 10));
  return out.join(' · ');
}
function czColStat(c, col, ogr) {
  let a = 0, n = 0, s = 0;
  for (const o of ogr) { const val = ((c.v || {})[o.id] || {})[col.id]; if (val === undefined || val === '') continue;
    if (col.tip === 'check') { n++; if (val === 'v') a++; else if (val === 'y') a += .5; }
    else if (col.tip === 'olcek' || col.tip === 'puan' || col.tip === 'sayi') { const k = parseFloat(String(val).replace(',', '.')); if (!isNaN(k)) { n++; s += k; } } }
  if (!n) return '';
  if (col.tip === 'check') return '%' + Math.round(a / n * 100);
  if (col.tip === 'metin') return '';
  return 'ort ' + (Math.round(s / n * 10) / 10);
}
PAGES.cizelge = () => {
  if (!S.edit || S.edit.id !== S.pid) { const d = Store.get(S.pid); if (!d) return `<div class="empty"><b>Çizelge bulunamadı</b><button class="btn" data-act="nav" data-p="cizelgeler">Çizelgelere dön</button></div>`; S.edit = { id:S.pid, d:JSON.parse(JSON.stringify(d)) }; }
  const c = S.edit.d; const s = Store.get(c.sinifId); const ogr = s ? s.ogr || [] : [];
  const hasCheck = c.cols.some(x => x.tip === 'check'), hasOlcek = c.cols.some(x => x.tip === 'olcek');
  return `<div><button class="btn ghost sm" data-act="nav" data-p="cizelgeler">${icon('back')}Çizelgeler</button></div>
  <div class="pagehead"><div style="flex:1;min-width:min(100%,280px)"><input class="inp" id="cz-ad" data-in="cz-ad" value="${esc(c.ad)}" style="font-family:var(--f-disp);font-size:22px;font-weight:700">
    <p>${esc(s ? s.ad : 'Sınıf silinmiş')} · ${ogr.length} öğrenci · oluşturma ${fmtD(c.olusturma)}</p></div>
    <div class="row"><button class="btn" data-act="col-today">${icon('plus')}Bugünün sütunu</button><button class="btn primary" data-act="col-add">${icon('plus')}Sütun ekle</button></div></div>
  <div class="legend">${hasCheck ? '<span><b style="color:var(--ok)">✓</b> yaptı</span><span><b style="color:var(--red)">✗</b> yapmadı</span><span><b style="color:var(--warn)">½</b> eksik</span>' : ''}${hasOlcek ? '<span><b>1</b> başlangıç</span><span><b>2</b> gelişmekte</span><span><b>3</b> yeterli</span><span><b>4</b> ileri</span>' : ''}<span>Sütun adına dokunarak düzenleyin.</span></div>
  ${!ogr.length ? `<div class="empty"><b>Bu sınıfta öğrenci yok</b><span>Önce sınıf listesini yükleyin.</span><button class="btn primary" data-act="imp-open" data-id="${c.sinifId}">${icon('up')}Liste yükle</button></div>` : `
  <div class="tablewrap"><table class="t" id="cz-table"><thead><tr><th class="sticky">No · Adı Soyadı</th>
    ${c.cols.map(col => `<th class="colh" data-act="col-edit" data-c="${col.id}">${esc(col.ad)}<span class="tp">${TIP[col.tip]}</span></th>`).join('')}
    <th>Özet</th></tr></thead><tbody>
    ${ogr.map(o => `<tr><td class="sticky nm"><span class="num muted" style="font-size:12px">${esc(o.no)}</span> ${esc(o.ad)}</td>
      ${c.cols.map(col => { const v = ((c.v || {})[o.id] || {})[col.id] ?? '';
        if (col.tip === 'check' || col.tip === 'olcek') return `<td class="cy${czCellClass(col.tip, v)}" data-act="cyc" data-s="${o.id}" data-c="${col.id}">${czCellText(col.tip, v)}</td>`;
        return `<td><input id="c-${o.id}-${col.id}" class="${col.tip === 'metin' ? 'txt' : ''}" data-in="cell" data-s="${o.id}" data-c="${col.id}" value="${esc(v)}" ${col.tip !== 'metin' ? 'inputmode="decimal"' : ''}></td>`; }).join('')}
      <td class="sum" id="sum-${o.id}">${czRowSum(c, o.id)}</td></tr>`).join('')}
    </tbody><tfoot><tr><td class="sticky" style="text-align:left">Sınıf</td>${c.cols.map(col => `<td id="st-${col.id}">${czColStat(c, col, ogr)}</td>`).join('')}<td></td></tr></tfoot></table></div>
  ${!c.cols.length ? `<div class="empty"><b>Henüz sütun yok</b><span>"Bugünün sütunu" ile tarihli bir ödev/katılım sütunu ekleyin ya da kendi ölçütünüzü oluşturun.</span></div>` : ''}`}
  <div class="row"><button class="btn" data-act="cz-xlsx">${icon('down')}Excel olarak indir</button><button class="btn" data-act="cz-print">Yazdır / PDF</button><button class="btn" data-act="cz-html">${icon('down')}HTML indir</button><span style="flex:1"></span><button class="btn danger" data-act="cz-del">${icon('trash')}Çizelgeyi sil</button></div>`;
};

/* ---- Evraklar ---- */
PAGES.evraklar = () => {
  const all = evraklar(); const q = low(S.evQ);
  const list = all.filter(e => (S.evFilter === 'hepsi' || e.kategori === S.evFilter) && (!q || low(e.baslik).includes(q)));
  return `${banner()}
  <div class="pagehead"><div><h1>Evraklar</h1><p>Okul bilgileriniz ve öğrenci adları hazır doldurulmuş tutanak, plan ve formlar. Düzenleyin, kaydedin, Word'de açılabilen veya yazdırılabilen dosya olarak indirin.</p></div></div>
  <div><h2 style="margin-bottom:12px">Yeni belge oluştur</h2>
  <div class="grid g3">${EV_TPL.map(t => `<button class="tpl" data-act="ev-new" data-k="${t.k}"><span class="pill ${t.kat === 'Zümre' || t.kat === 'Şube Öğretmenler Kurulu' ? 'blue' : t.kat === 'Veli' ? 'red' : ''}">${esc(t.kat)}</span><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></button>`).join('')}</div></div>
  <div><div class="row between" style="margin-bottom:12px"><h2>Belgelerim</h2><div class="search">${icon('search')}<input class="inp" id="ev-q" data-in="ev-q" placeholder="Belge ara" value="${esc(S.evQ)}"></div></div>
  <div class="chips" style="margin-bottom:12px"><button class="chip" data-act="ev-filter" data-k="hepsi" aria-pressed="${S.evFilter === 'hepsi'}">Tümü<span class="n">${all.length}</span></button>${KATEGORI.map(k => `<button class="chip" data-act="ev-filter" data-k="${esc(k)}" aria-pressed="${S.evFilter === k}">${esc(k)}<span class="n">${all.filter(e => e.kategori === k).length}</span></button>`).join('')}</div>
  <div id="ev-list">${evListHTML(list)}</div></div>`;
};
function evListHTML(list) {
  return list.length ? `<section class="card" style="padding:6px 16px"><div class="list">${list.map(e => `<button class="li" data-act="open-evrak" data-id="${e.id}">${icon('evraklar')}<span class="t"><b>${esc(e.baslik || 'Adsız belge')}</b><small>${esc(e.kategori)}${e.sinifId ? ' · ' + esc(sinifAd(e.sinifId)) : ''} · ${fmtD(e.guncelleme)}</small></span></button>`).join('')}</div></section>`
  : `<div class="empty"><b>Bu bölümde belge yok</b><span>Yukarıdaki şablonlardan birine dokunarak başlayın.</span></div>`;
}
PAGES.evrak = () => {
  if (!S.edit || S.edit.id !== S.pid) { const d = Store.get(S.pid); if (!d) return `<div class="empty"><b>Belge bulunamadı</b><button class="btn" data-act="nav" data-p="evraklar">Evraklara dön</button></div>`; S.edit = { id:S.pid, d:JSON.parse(JSON.stringify(d)) }; }
  const e = S.edit.d;
  return `<div><button class="btn ghost sm" data-act="nav" data-p="evraklar">${icon('back')}Evraklar</button></div>
  <div class="fgrid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))">
    <div class="field" style="grid-column:1/-1"><label for="ev-baslik">Belge adı</label><input class="inp" id="ev-baslik" data-in="ev-baslik" value="${esc(e.baslik)}" style="font-family:var(--f-disp);font-size:19px;font-weight:600"></div>
    <div class="field"><label for="ev-kat">Bölüm</label><select class="inp" id="ev-kat" data-in="ev-kat">${KATEGORI.map(k => `<option ${k === e.kategori ? 'selected' : ''}>${esc(k)}</option>`).join('')}</select></div>
    <div class="field"><label for="ev-sinif">Sınıf</label><select class="inp" id="ev-sinif" data-in="ev-sinif"><option value="">—</option>${siniflar().map(s => `<option value="${s.id}" ${s.id === e.sinifId ? 'selected' : ''}>${esc(s.ad)}</option>`).join('')}</select></div>
  </div>
  <div class="toolbar" role="toolbar" aria-label="Biçim">
    <button class="btn sm" data-act="ev-cmd" data-c="bold"><b>K</b></button><button class="btn sm" data-act="ev-cmd" data-c="italic"><i>İ</i></button><button class="btn sm" data-act="ev-cmd" data-c="underline"><u>A</u></button>
    <button class="btn sm" data-act="ev-cmd" data-c="h3">Başlık</button><button class="btn sm" data-act="ev-cmd" data-c="p">Paragraf</button>
    <button class="btn sm" data-act="ev-cmd" data-c="insertOrderedList">1. Liste</button><button class="btn sm" data-act="ev-cmd" data-c="insertUnorderedList">• Liste</button>
    <button class="btn sm" data-act="ev-cmd" data-c="justifyCenter">Ortala</button><button class="btn sm" data-act="ev-cmd" data-c="justifyLeft">Sola</button>
    <button class="btn sm" data-act="ev-row">+ Tablo satırı</button><button class="btn sm" data-act="ev-list">+ Öğrenci listesi</button>
  </div>
  <div class="docview"><div class="sheet" id="ev-sheet" contenteditable="true" spellcheck="true" lang="tr">${e.html || '<p></p>'}</div></div>
  <div class="row"><button class="btn primary" data-act="ev-print">Yazdır / PDF</button><button class="btn" data-act="ev-dl">${icon('down')}İndir (Word'de açılır)</button><button class="btn" data-act="ev-copy">Kopyasını oluştur</button><span style="flex:1"></span><button class="btn danger" data-act="ev-del">${icon('trash')}Belgeyi sil</button></div>
  <p class="note">Değişiklikler yazarken otomatik kaydedilir. "Yazdır / PDF" ile yazıcıya gönderebilir veya PDF olarak kaydedebilirsiniz.</p>`;
};

/* ---- Dosyalar ---- */
PAGES.dosyalar = () => {
  const all = dosyalar(); const q = low(S.dzQ); const kl = klasorler();
  const list = all.filter(f => (S.dzFolder === 'hepsi' || f.klasor === S.dzFolder) && (!q || low(f.ad).includes(q)));
  return `${banner()}
  <div class="pagehead"><div><h1>Dosyalar</h1><p>Fotoğraf, PDF, Word, Excel, PowerPoint: istediğiniz adla, istediğiniz klasöre. Word ve Excel dosyaları uygulama içinde önizlenir.</p></div>
    <button class="btn primary" data-act="up-open">${icon('up')}Dosya yükle</button></div>
  <div class="flayout">
    <nav class="folders" aria-label="Klasörler">
      <button class="navlink" data-act="dz-folder" data-k="hepsi" ${S.dzFolder === 'hepsi' ? 'aria-current="page"' : ''}>${icon('dosyalar')}<span>Tüm dosyalar</span><span class="n">${all.length}</span></button>
      ${kl.map(k => `<button class="navlink" data-act="dz-folder" data-k="${esc(k)}" ${S.dzFolder === k ? 'aria-current="page"' : ''}>${icon('dosyalar')}<span>${esc(k)}</span><span class="n">${all.filter(f => f.klasor === k).length}</span></button>`).join('')}
      <button class="navlink" data-act="kl-add" style="color:var(--blue)">${icon('plus')}<span>Yeni klasör</span></button>
    </nav>
    <div class="grid" style="min-width:0">
      <div class="row between"><div class="search">${icon('search')}<input class="inp" id="dz-q" data-in="dz-q" placeholder="Dosya ara" value="${esc(S.dzQ)}"></div>
        ${S.dzFolder !== 'hepsi' ? `<div class="row"><button class="btn sm" data-act="kl-ren">Klasörü yeniden adlandır</button><button class="btn sm danger" data-act="kl-del">Klasörü sil</button></div>` : ''}</div>
      <div id="dz-list">${dzListHTML(list)}</div>
      <p class="note" id="dz-usage"></p>
    </div>
  </div>`;
};
function extClass(ext) { return ext === 'pdf' ? 'pdf' : /^docx?$|^odt$|^rtf$/.test(ext) ? 'doc' : /^xlsx?$|^csv$|^ods$/.test(ext) ? 'xls' : ''; }
function dzListHTML(list) {
  if (!list.length) return `<div class="empty"><b>${S.dzFolder === 'hepsi' ? 'Henüz dosya yok' : 'Bu klasör boş'}</b><span>Yıllık planınızı, resmî yazıları veya etkinlik fotoğraflarını yükleyin.</span><button class="btn primary" data-act="up-open">${icon('up')}Dosya yükle</button></div>`;
  return `<div class="files">${list.map(f => { const img = /^image\//.test(f.ct) && !f.b64;
    return `<button class="fcard" data-act="dz-open" data-id="${f.id}"><div class="fthumb">${img ? `<img data-fid="${esc(f.assetId)}" alt="">` : `<span class="ext ${extClass(f.ext)}">${esc(f.ext || 'dosya')}</span>`}</div>
      <div class="fmeta"><b>${esc(f.ad)}</b><small>${esc(f.klasor)} · ${fmtSize(f.boyut || 0)} · ${fmtD(f.tarih)}</small></div></button>`; }).join('')}</div>`;
}

/* ---- Mevzuat ---- */
PAGES.mevzuat = () => {
  const tabs = [['metin','Millî metinler'],['kanun','Kanunlar'],['yonetmelik','Yönetmelikler'],['maarif','Maarif Modeli · Türkçe'],['takvim','Çalışma takvimi'],['kendi','Kendi kaynaklarım']];
  const q = low(S.mvQ);
  let body = '';
  const lawHTML = l => `<div class="law"><div class="hd"><b>${esc(l.ad)}</b><span class="pill">${esc(l.tarih)}</span></div><ul>${l.oz.map(o => `<li>${esc(o)}</li>`).join('')}</ul><div><a href="${l.url}" target="_blank" rel="noopener">Resmî metni aç ↗</a></div></div>`;
  if (q) {
    const hits = MEVZUAT.filter(l => low(l.ad + ' ' + l.oz.join(' ')).includes(q));
    const mh = MARS.map((k, i) => [k, i]).filter(([k]) => low(k).includes(q));
    body = `<section class="card"><h2>"${esc(S.mvQ)}" için sonuçlar</h2>${hits.map(lawHTML).join('')}${mh.map(([k, i]) => `<div class="law"><div class="hd"><b>İstiklal Marşı · ${i + 1}. kıta</b></div><p style="white-space:pre-line">${esc(k)}</p></div>`).join('')}${!hits.length && !mh.length ? '<p class="muted">Sonuç bulunamadı.</p>' : ''}</section>`;
  } else if (S.mvTab === 'metin') {
    body = `<section class="card"><div class="row between"><h2>İstiklal Marşı</h2><span class="note">Mehmet Âkif Ersoy · TBMM kabul: 12 Mart 1921</span></div>
      <div class="mars" style="margin-top:12px">${MARS.map((k, i) => `<p data-k="${i + 1}. KITA">${esc(k).replace(/\n/g, '<br>')}</p>`).join('')}</div></section>
      <section class="card"><div class="row between"><h2>Atatürk'ün Gençliğe Hitabesi</h2><span class="note">20 Ekim 1927</span></div><div class="hitabe" style="margin-top:12px">${HITABE.map(p => `<p>${esc(p)}</p>`).join('')}<p style="text-align:right;font-style:italic">Gazi Mustafa Kemal Atatürk</p></div></section>`;
  } else if (S.mvTab === 'kanun' || S.mvTab === 'yonetmelik') {
    const g = S.mvTab === 'kanun' ? 'Kanun' : 'Yönetmelik';
    body = `<section class="card">${MEVZUAT.filter(l => l.g === g).map(lawHTML).join('')}</section>
      <p class="note">Özetler hızlı başvuru içindir; bağlayıcı olan Resmî Gazete'deki güncel metindir. Kanunlar mevzuat.gov.tr'de, yönetmelikler MEB Mevzuat listesinde açılır. PDF'lerini "Dosyalar › Mevzuat" klasörüne yüklerseniz burada da görünür.</p>`;
  } else if (S.mvTab === 'maarif') {
    body = `<section class="card"><h2>Türkiye Yüzyılı Maarif Modeli · Türkçe Dersi Öğretim Programı</h2>
      <p class="muted" style="margin-bottom:14px">Ortaokul 5–8. sınıflar. Haftalık ders saati 5. ve 6. sınıflarda 6 saattir.</p>
      ${isTurkce() ? '' : `<div class="banner" style="margin-bottom:14px">Bu bölüm Türkçe dersi içindir. ${esc(prof().brans)} öğretim programınız için <a href="https://tymm.meb.gov.tr/ogretim-programlari" target="_blank" rel="noopener">tüm Maarif Modeli programları ↗</a></div>`}
      <h3>6. sınıf temaları</h3><div class="themes" style="margin-bottom:16px">${TEMALAR[6].map((t, i) => `<div><small>TEMA ${i + 1}</small>${esc(t)}</div>`).join('')}</div>
      <h3>5. sınıf temaları</h3><div class="themes" style="margin-bottom:16px">${TEMALAR[5].map((t, i) => `<div><small>TEMA ${i + 1}</small>${esc(t)}</div>`).join('')}</div>
      <div class="grid g2">
        <div><h3>Öğrenme alanları</h3><ul><li>Dinleme / İzleme</li><li>Konuşma</li><li>Okuma</li><li>Yazma</li></ul><p class="note">Öğrenme çıktıları alan ve sınıf koduyla yazılır (ör. dinleme için T.D., okuma için T.O. ile başlayan kodlar). Kodların tam listesi programın kendisindedir.</p></div>
        <div><h3>Programın beceri çerçevesi</h3><ul><li>Kavramsal beceriler ve alan becerileri</li><li>Eğilimler</li><li>Sosyal-duygusal öğrenme becerileri</li><li>Okuryazarlık becerileri</li><li>Değerler (erdem-değer-eylem çerçevesi)</li></ul></div>
        <div><h3>Ölçme ve değerlendirme</h3><ul><li>Süreç odaklı: tanılayıcı, biçimlendirici ve düzey belirleyici değerlendirme</li><li>Araçlar: kontrol listesi, dereceli puanlama anahtarı, gözlem formu, öz ve akran değerlendirme, performans görevi</li><li>Yönetmelik gereği yılda en az bir proje</li><li>Gelişim raporu karneyle birlikte verilir</li></ul></div>
        <div><h3>Bu uygulamada karşılığı</h3><ul><li>Okuma, konuşma, dinleme, yazma çizelgeleri 1–4 dereceli puanlama kullanır</li><li>Gözlem formu sosyal-duygusal becerileri izler</li><li>Ders planı şablonu programın başlıklarını içerir</li></ul></div>
      </div>
      <div class="row" style="margin-top:14px"><a class="btn" href="https://tymm.meb.gov.tr/ogretim-programlari/ortaokul-turkce-dersi/7" target="_blank" rel="noopener">6. sınıf programı ↗</a><a class="btn" href="https://tymm.meb.gov.tr/ogretim-programlari/ortaokul-turkce-dersi/6" target="_blank" rel="noopener">5. sınıf programı ↗</a><a class="btn" href="https://tymm.meb.gov.tr/taslak-cerceve-planlari" target="_blank" rel="noopener">Çerçeve yıllık planlar ↗</a></div></section>`;
  } else if (S.mvTab === 'takvim') {
    body = `<section class="card"><h2>2026-2027 Eğitim-Öğretim Yılı Çalışma Takvimi</h2>${TAKVIM.map(e => { const d = dParse(e.t); return `<div class="ev ${e.tur || ''}"><div class="d"><b>${d.getDate()}</b><small>${AYLAR[d.getMonth()]}</small></div><div><div>${esc(e.ad)}</div><small class="muted">${e.b ? fmtD(d) + ' – ' + fmtD(dParse(e.b)) : fmtD(d)}</small></div></div>`; }).join('')}
      <p class="note" style="margin-top:10px">Kaynak: <a href="https://www.meb.gov.tr/2026-2027-egitim-ogretim-yili-takvimi-aciklandi/haber/41057/tr" target="_blank" rel="noopener">MEB duyurusu ↗</a></p></section>`;
  } else {
    const kk = kaynaklar(); const mf = dosyalar().filter(f => f.klasor === 'Mevzuat');
    body = `<section class="card"><h2>Kendi kaynaklarım</h2><p class="muted" style="margin-bottom:12px">Okulunuza gelen resmî yazılar, genelgeler, bağlantılar. PDF'ler "Dosyalar › Mevzuat" klasöründen gelir.</p>
      <div class="fgrid"><div class="field"><label for="kk-ad">Başlık</label><input class="inp" id="kk-ad" placeholder="ör. Ölçme değerlendirme yönergesi"></div><div class="field"><label for="kk-url">Bağlantı (isteğe bağlı)</label><input class="inp" id="kk-url" placeholder="https://"></div><div class="field" style="grid-column:1/-1"><label for="kk-not">Not</label><input class="inp" id="kk-not" placeholder="Kısa açıklama"></div></div>
      <div class="row" style="margin-top:10px"><button class="btn primary" data-act="kk-add">${icon('plus')}Ekle</button></div>
      <div class="list" style="margin-top:10px">${kk.map(k => `<div class="li" style="cursor:default">${icon('mevzuat')}<span class="t"><b>${esc(k.ad)}</b><small>${esc(k.not || '')} ${k.url ? `· <a href="${esc(k.url)}" target="_blank" rel="noopener">aç ↗</a>` : ''}</small></span><button class="btn ghost sm" data-act="kk-del" data-id="${k.id}" aria-label="Sil">${icon('x')}</button></div>`).join('')}
      ${mf.map(f => `<button class="li" data-act="dz-open" data-id="${f.id}">${icon('file')}<span class="t"><b>${esc(f.ad)}</b><small>Dosya · ${fmtSize(f.boyut || 0)}</small></span></button>`).join('')}</div>
      ${!kk.length && !mf.length ? '<p class="muted">Henüz eklenmiş kaynak yok.</p>' : ''}</section>`;
  }
  return `<div class="pagehead"><div><h1>Mevzuat ve Müfredat</h1><p>Millî metinler, öğretmeni ilgilendiren kanun ve yönetmeliklerin özetleri, Maarif Modeli Türkçe programı ve çalışma takvimi.</p></div>
    <div class="search">${icon('search')}<input class="inp" id="mv-q" data-in="mv-q" placeholder="Mevzuatta ara (ör. devamsızlık)" value="${esc(S.mvQ)}"></div></div>
  <div class="chips">${tabs.map(([k, t]) => `<button class="chip" data-act="mv-tab" data-k="${k}" aria-pressed="${!q && S.mvTab === k}">${t}</button>`).join('')}</div>
  <div id="mv-body" class="grid">${body}</div>`;
};

/* ---- Müfettiş dosyası ---- */
PAGES.mufettis = () => {
  const p = prof(); const sn = siniflar(), ev = evraklar(), cz = cizelgeler(), dz = dosyalar();
  const evBy = k => ev.filter(e => e.kategori === k);
  let n = 0; const sec = (title, items) => { n++; return `<section><h3><span class="k">${pad(n)}</span>${esc(title)}</h3><div class="items">${items || '<p class="muted" style="padding-left:28px">Bu bölümde henüz kayıt yok.</p>'}</div></section>`; };
  const it = (act, id, t, sub) => `<button data-act="${act}" data-id="${id}"><span>${esc(t)}</span><small>${esc(sub)}</small></button>`;
  const kl = klasorler().filter(k => dz.some(f => f.klasor === k));
  return `<div class="pagehead"><div><h1>Müfettiş Dosyası</h1><p>Dosyanızın tamamı tek sayfada, içindekiler sırasıyla. Her satır ilgili belgeyi açar. Tamamını tek dosya olarak indirip yazdırabilirsiniz.</p></div>
    <div class="row"><button class="btn primary" data-act="mf-print">Tümünü yazdır / PDF</button><button class="btn" data-act="mf-dl">${icon('down')}Tüm dosyayı indir</button></div></div>
  <div class="dossier">
    <div class="cover"><div class="tc">T.C.<br>${esc(makam(p))}<br>${esc(up(p.okul))} MÜDÜRLÜĞÜ</div>
      <h1>${esc(p.yil)} Eğitim-Öğretim Yılı<br>Öğretmen Dosyası</h1>
      <div style="font-size:17px"><b>${esc(p.ad)}</b> · ${esc(p.brans)} Öğretmeni</div>
      <div class="muted">${p.rehberSinif ? esc(p.rehberSinif) + ' Sınıf Rehber Öğretmeni' : ''}${p.rehberSinif && p.mudur ? ' · ' : ''}${p.mudur ? 'Okul Müdürü: ' + esc(p.mudur) : ''}</div></div>
    <div class="toc">
      ${sec('Millî metinler', `<button data-act="mv-go" data-k="metin"><span>İstiklal Marşı</span><small>10 kıta</small></button><button data-act="mv-go" data-k="metin"><span>Atatürk'ün Gençliğe Hitabesi</span><small>1927</small></button>`)}
      ${sec('Öğretmen bilgileri ve çalışma takvimi', `<button data-act="profil"><span>Kimlik ve görev bilgileri</span><small>${esc(p.okul)}</small></button><button data-act="mv-go" data-k="takvim"><span>2026-2027 çalışma takvimi</span><small>MEB</small></button>`)}
      ${sec('Sınıf listeleri', sn.map(s => it('open-sinif', s.id, s.ad + (s.rehber ? ' (rehber sınıfım)' : ''), (s.ogr || []).length + ' öğrenci')).join(''))}
      ${sec('Planlar (yıllık plan, ders planları)', evBy('Plan').map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('') + dz.filter(f => f.klasor === 'Yıllık Planlar' || f.klasor === 'Ders Planları').map(f => it('dz-open', f.id, f.ad, f.klasor)).join(''))}
      ${sec('Zümre öğretmenler toplantı tutanakları', evBy('Zümre').map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('') + dz.filter(f => f.klasor === 'Zümre Tutanakları').map(f => it('dz-open', f.id, f.ad, 'dosya')).join(''))}
      ${sec('Şube öğretmenler kurulu tutanakları', evBy('Şube Öğretmenler Kurulu').map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('') + dz.filter(f => f.klasor === 'Şube Öğretmenler Kurulu').map(f => it('dz-open', f.id, f.ad, 'dosya')).join(''))}
      ${sec('Veli toplantıları ve görüşmeler', evBy('Veli').map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('') + dz.filter(f => f.klasor === 'Veli Toplantıları').map(f => it('dz-open', f.id, f.ad, 'dosya')).join(''))}
      ${sec('Sınıf rehberliği', rbMufettisItems() + evBy('Rehberlik').map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('') + dz.filter(f => f.klasor === rehberKlasor()).map(f => it('dz-open', f.id, f.ad, 'dosya')).join(''))}
      ${sec('Ölçme-değerlendirme çizelgeleri', cz.map(c => it('open-cizelge', c.id, c.ad, sinifAd(c.sinifId))).join(''))}
      ${sec('Diğer tutanak ve yazışmalar', [...evBy('Tutanak'), ...evBy('Dilekçe'), ...evBy('Diğer')].map(e => it('open-evrak', e.id, e.baslik, e.kategori)).join(''))}
      ${sec('Yüklenen belgeler ve fotoğraflar', kl.filter(k => !['Yıllık Planlar','Ders Planları','Zümre Tutanakları','Şube Öğretmenler Kurulu','Veli Toplantıları',rehberKlasor()].includes(k)).map(k => `<div style="padding:6px 0 2px 28px" class="eyebrow">${esc(k)}</div>` + dz.filter(f => f.klasor === k).map(f => it('dz-open', f.id, f.ad, fmtSize(f.boyut || 0))).join('')).join(''))}
      ${sec('Mevzuat', `<button data-act="mv-go" data-k="kanun"><span>Kanunlar</span><small>${MEVZUAT.filter(l => l.g === 'Kanun').length} kanun</small></button><button data-act="mv-go" data-k="yonetmelik"><span>Yönetmelikler</span><small>${MEVZUAT.filter(l => l.g === 'Yönetmelik').length} yönetmelik</small></button><button data-act="mv-go" data-k="maarif"><span>Türkiye Yüzyılı Maarif Modeli · Türkçe programı</span><small>tymm.meb.gov.tr</small></button>`)}
    </div>
  </div>`;
};

/* ===================== Evrak şablonları ===================== */
function makam(p) { return p.ilce ? up(p.ilce) + ' KAYMAKAMLIĞI' : p.il ? up(p.il) + ' VALİLİĞİ' : '… KAYMAKAMLIĞI'; }
function baslik(p) { return `<p style="text-align:center"><b>T.C.<br>${esc(makam(p))}<br>${esc(up(p.okul))} MÜDÜRLÜĞÜ</b></p>`; }
function imzaTablo(cells) { return `<table class="imza"><tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr></table>`; }
function onay(p) { return `<p style="text-align:center"><br>UYGUNDUR<br>…/…/20…<br><br><br>${esc(p.mudur || '…')}<br>Okul Müdürü</p>`; }
const sinifKisa = ad => String(ad || '').replace(/^(\d+)\s*[\/\-]?\s*([A-Za-zÇĞİÖŞÜçğıöşü])$/, '$1/$2');
function rehberSinif() { const s = siniflar().find(x => x.rehber) || siniflar()[0]; return s || null; }
function gundem(items) { return `<ol>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ol>`; }
function gorusme(items) { return items.map((i, n) => `<p><b>${n + 1}. ${esc(i)}:</b> …</p>`).join(''); }
const ZUMRE_BAS = ['Açılış, yoklama ve zümre başkanının belirlenmesi','Bir önceki toplantıda alınan kararların değerlendirilmesi','Türkiye Yüzyılı Maarif Modeli Türkçe Dersi Öğretim Programı\'nın incelenmesi (temalar, öğrenme çıktıları, beceriler)','Yıllık planların ve tema planlarının hazırlanması','Ölçme ve değerlendirme: yazılı yoklamalar, ortak sınavlar, performans görevleri ve proje çalışmaları','Okuma kültürünün geliştirilmesi, kitap okuma etkinlikleri ve okul kütüphanesi','Ders kitapları, eğitim araçları ve dijital içeriklerin kullanımı','Öğrenci başarısının artırılması; destekleme ve zenginleştirme çalışmaları','Belirli gün ve haftalar, sosyal etkinlikler','Diğer zümrelerle iş birliği','Dilek ve temenniler'];
const ZUMRE_SON = ['Açılış ve yoklama','Dönem başı zümre kararlarının uygulanma durumu','Öğretim programının uygulanmasında karşılaşılan güçlükler','Öğrenci başarı durumunun analizi (yazılı, performans, proje sonuçları)','Okuma etkinliklerinin ve proje çalışmalarının değerlendirilmesi','Gelişim raporuna ilişkin değerlendirmeler','Gelecek dönem için öneriler','Dilek ve temenniler'];
const SOK_DERS = [['Türkçe'],['Matematik'],['Fen Bilimleri'],['Sosyal Bilgiler'],['İngilizce'],['Din Kültürü ve Ahlak Bilgisi'],['Görsel Sanatlar'],['Müzik'],['Beden Eğitimi ve Spor'],['Bilişim Teknolojileri ve Yazılım'],['Seçmeli Dersler'],['Rehber Öğretmen (PDR)']];
const EV_TPL = [
  { k:'zumre_bas', kat:'Zümre', ad:'Zümre Toplantısı · Dönem Başı', not:'Gündem, katılanlar, kararlar ve müdür onayı.', f:(p) => zumre(p, 'DÖNEM BAŞI', ZUMRE_BAS) },
  { k:'zumre_son', kat:'Zümre', ad:'Zümre Toplantısı · Dönem Sonu', not:'Dönem değerlendirmesi ve öneriler.', f:(p) => zumre(p, 'DÖNEM SONU', ZUMRE_SON) },
  { k:'sok', kat:'Şube Öğretmenler Kurulu', ad:'Şube Öğretmenler Kurulu Tutanağı', not:'Rehber sınıfınız için; ders öğretmenleri tablosu hazır.', f:(p) => { const s = rehberSinif(); const sa = sinifKisa(s ? s.ad : p.rehberSinif);
    return `${baslik(p)}<h2 style="text-align:center">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>${esc(sa)} ŞUBE ÖĞRETMENLER KURULU TOPLANTI TUTANAĞI</h2>
    <table><tr><th>Toplantı tarihi</th><td>…/…/20…</td><th>Saat</th><td>…:…</td></tr><tr><th>Toplantı yeri</th><td>Öğretmenler Odası</td><th>Toplantı no</th><td>1</td></tr></table>
    <h3>Gündem</h3>${gundem(['Açılış ve yoklama','Şubenin genel başarı durumu','Öğrencilerin devam-devamsızlık durumu ve davranışları','Desteğe ihtiyaç duyan öğrenciler; özel eğitim ve kaynaştırma uygulamaları','Öğretim programlarının uygulanması ve dersler arası iş birliği','Proje ve performans çalışmalarının planlanması','Rehberlik çalışmaları ve veli iş birliği','Gelişim raporu için ortak değerlendirmeler','Dilek ve temenniler'])}
    <h3>Görüşmeler</h3>${gorusme(['Açılış','Genel başarı durumu','Devam ve davranış','Desteğe ihtiyaç duyan öğrenciler','Programların uygulanması','Proje ve performans','Rehberlik ve veli iş birliği','Gelişim raporu','Dilek ve temenniler'])}
    <h3>Alınan kararlar</h3><ol><li>…</li><li>…</li></ol>
    <h3>Kurul üyeleri</h3><table><tr><th>Ders</th><th>Öğretmen</th><th>İmza</th></tr>${SOK_DERS.map(([d]) => `<tr><td>${esc(d)}</td><td>${d === p.brans ? esc(p.ad) : ''}</td><td></td></tr>`).join('')}</table>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`, `…<br>Kurul Başkanı (Müdür Yardımcısı)`])}${onay(p)}`; } },
  { k:'veli', kat:'Veli', ad:'Veli Toplantısı Tutanağı + Katılım Listesi', not:'Öğrenci adları katılım listesine otomatik eklenir.', f:(p) => { const s = rehberSinif(); const sa = sinifKisa(s ? s.ad : p.rehberSinif); const ogr = s ? s.ogr || [] : [];
    return `${baslik(p)}<h2 style="text-align:center">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>${esc(sa)} SINIFI VELİ TOPLANTISI TUTANAĞI</h2>
    <table><tr><th>Toplantı tarihi</th><td>…/…/20…</td><th>Saat</th><td>…:…</td></tr><tr><th>Yer</th><td>${esc(sa)} sınıfı</td><th>Katılan veli sayısı</th><td>…</td></tr></table>
    <h3>Gündem</h3>${gundem(['Açılış ve tanışma','Okulun işleyişi, okul ve sınıf kuralları, devam-devamsızlık','Türkiye Yüzyılı Maarif Modeli ve ölçme-değerlendirme (yazılı, performans, proje)','Gelişim raporu hakkında bilgilendirme','e-Okul Veli Bilgilendirme Sistemi ve randevu ile veli görüşmesi','Kitap okuma alışkanlığı ve evde düzenli çalışma','Dijital ortamların güvenli kullanımı','Okul-Aile Birliği sınıf temsilcisinin belirlenmesi','Dilek ve temenniler'])}
    <h3>Görüşülen konular</h3>${gorusme(['Açılış','Okulun işleyişi','Ölçme-değerlendirme','Gelişim raporu','e-Okul ve randevu','Kitap okuma','Dijital güvenlik','Sınıf temsilcisi','Dilek ve temenniler'])}
    <h3>Alınan kararlar</h3><ol><li>…</li><li>…</li></ol>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`, `…<br>Veli Temsilcisi`])}${onay(p)}
    <h2 style="text-align:center;page-break-before:always">${esc(sa)} SINIFI VELİ TOPLANTISI KATILIM LİSTESİ</h2><p style="text-align:center">Tarih: …/…/20…</p>
    <table><tr><th>S.No</th><th>Öğr. No</th><th>Öğrencinin Adı Soyadı</th><th>Velinin Adı Soyadı</th><th>Yakınlığı</th><th>İmza</th></tr>${(ogr.length ? ogr : Array.from({ length:25 }, () => ({ no:'', ad:'' }))).map((o, i) => `<tr><td>${i + 1}</td><td>${esc(o.no)}</td><td>${esc(o.ad)}</td><td>${esc(o.id ? obF(o.id).veliAd || '' : '')}</td><td>${esc(o.id ? obF(o.id).veliYakinlik || '' : '')}</td><td></td></tr>`).join('')}</table>`; } },
  { k:'veligorusme', kat:'Veli', ad:'Veli Görüşme Formu', not:'Bireysel görüşmeler için.', f:(p) => `${baslik(p)}<h2 style="text-align:center">VELİ GÖRÜŞME FORMU</h2>
    <table><tr><th>Öğrencinin adı soyadı</th><td></td><th>Sınıfı / No</th><td></td></tr><tr><th>Görüşülen veli</th><td></td><th>Yakınlığı</th><td></td></tr><tr><th>Tarih / saat</th><td>…/…/20… · …:…</td><th>Görüşme şekli</th><td>Yüz yüze / Telefon / Çevrim içi</td></tr><tr><th>Görüşmeyi isteyen</th><td colspan="3">Öğretmen / Veli / Okul idaresi</td></tr></table>
    <h3>Görüşme nedeni</h3><p>…</p><h3>Görüşülen konular</h3><p>…</p><h3>Varılan sonuç ve öneriler</h3><p>…</p><h3>İzleme tarihi</h3><p>…/…/20…</p>
    ${imzaTablo(['…<br>Veli', `${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`])}` },
  { k:'rehberlik', kat:'Rehberlik', ad:'Sınıf Rehberlik Planı (Yıllık)', not:'Aylara göre etkinlik çerçevesi.', f:(p) => { const s = rehberSinif(); const sa = sinifKisa(s ? s.ad : p.rehberSinif);
    const ay = [['Eylül','Okula uyum ve tanışma; sınıf kurallarının birlikte belirlenmesi; sınıf başkanı seçimi'],['Ekim','Öğrenciyi tanıma çalışmaları; verimli ders çalışma alışkanlıkları'],['Kasım','Duyguları tanıma ve ifade etme; arkadaşlık ilişkileri'],['Aralık','Zamanı planlama; dijital ortamda güvenlik'],['Ocak','Birinci dönemin değerlendirilmesi; gelişim raporu'],['Şubat','Hedef belirleme; seçmeli derslerde bilgilendirme'],['Mart','Sorumluluk ve iş birliği; akran ilişkileri'],['Nisan','Mesleki farkındalık; ilgi ve yetenekleri tanıma'],['Mayıs','Sağlıklı yaşam; bağımlılıkla mücadele'],['Haziran','Yılın değerlendirilmesi; yaz tatili önerileri']];
    return `${baslik(p)}<h2 style="text-align:center">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>${esc(sa)} SINIFI YILLIK SINIF REHBERLİK PLANI</h2>
    <table><tr><th style="width:90px">Ay</th><th style="width:60px">Hafta</th><th>Kazanım / Etkinlik</th><th>Açıklama</th></tr>${ay.map(([a, k]) => `<tr><td>${a}</td><td></td><td>${esc(k)}</td><td></td></tr>`).join('')}</table>
    <p><i>Not: Haftalık kazanımları okul rehberlik servisinin paylaştığı sınıf rehberlik programına göre düzenleyiniz.</i></p>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`, '…<br>Rehber Öğretmen (PDR)'])}${onay(p)}`; } },
  { k:'dersplani', kat:'Plan', ad:'Ders Planı (Maarif Modeli)', not:'Tema, öğrenme çıktıları, beceriler, farklılaştırma.', f:(p) => `${baslik(p)}<h2 style="text-align:center">${esc(up(p.brans))} DERSİ DERS PLANI</h2>
    <table><tr><th>Ders</th><td>${esc(p.brans)}</td><th>Sınıf</th><td>…</td></tr><tr><th>Tema</th><td>…</td><th>Süre</th><td>… ders saati</td></tr><tr><th>Metin</th><td colspan="3">…</td></tr>
    <tr><th>Öğrenme çıktıları ve süreç bileşenleri</th><td colspan="3">…</td></tr><tr><th>Alan becerileri</th><td colspan="3">…</td></tr><tr><th>Kavramsal beceriler</th><td colspan="3">…</td></tr><tr><th>Eğilimler</th><td colspan="3">…</td></tr><tr><th>Sosyal-duygusal öğrenme becerileri</th><td colspan="3">…</td></tr><tr><th>Değerler</th><td colspan="3">…</td></tr><tr><th>Okuryazarlık becerileri</th><td colspan="3">…</td></tr><tr><th>Disiplinler arası ilişkiler</th><td colspan="3">…</td></tr>
    <tr><th>Araç-gereç</th><td colspan="3">Ders kitabı, …</td></tr></table>
    <h3>Öğrenme-öğretme uygulamaları</h3><p><b>Hazırlık / dikkat çekme:</b> …</p><p><b>Dinleme / İzleme:</b> …</p><p><b>Okuma:</b> …</p><p><b>Konuşma:</b> …</p><p><b>Yazma:</b> …</p>
    <h3>Farklılaştırma</h3><p><b>Zenginleştirme:</b> …</p><p><b>Destekleme:</b> …</p>
    <h3>Ölçme ve değerlendirme</h3><p>Kontrol listesi / dereceli puanlama anahtarı / öz değerlendirme: …</p>
    <h3>Öğretmen yansıtmaları</h3><p>…</p>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`, `${esc(p.mudur || '…')}<br>Okul Müdürü`])}` },
  { k:'yillik', kat:'Plan', ad:'Yıllık Plan Kapağı ve Onay', not:'Yıllık planınızı Dosyalar\'a yükleyip bu kapakla sunun.', f:(p) => `${baslik(p)}<h2 style="text-align:center">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>${esc(up(p.brans))} DERSİ ${isTurkce() ? '6' : '…'}. SINIF YILLIK PLANI</h2>
    <p>Bu plan, Türkiye Yüzyılı Maarif Modeli Türkçe Dersi Öğretim Programı ve Bakanlıkça yayımlanan çerçeve plan esas alınarak, zümre öğretmenler kurulu kararları doğrultusunda hazırlanmıştır.</p>
    <table><tr><th>Tema</th><th>Tahmini süre</th><th>Açıklama</th></tr>${(isTurkce() ? TEMALAR[6] : ['…','…','…','…','…','…']).map((t, i) => `<tr><td>${i + 1}. ${esc(t)}</td><td>… hafta</td><td></td></tr>`).join('')}</table>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`, '…<br>Türkçe Öğretmeni'])}${onay(p)}` },
  { k:'baskan', kat:'Tutanak', ad:'Sınıf Başkanı Seçim Tutanağı', not:'Rehber sınıfınız için oy tablosu ile.', f:(p) => { const s = rehberSinif(); const sa = sinifKisa(s ? s.ad : p.rehberSinif);
    return `${baslik(p)}<h2 style="text-align:center">${esc(sa)} SINIFI SINIF BAŞKANI SEÇİM TUTANAĞI</h2>
    <p>${esc(p.okul)} ${esc(sa)} sınıfında …/…/20… tarihinde yapılan gizli oylamada, sınıf mevcudu ${s ? (s.ogr || []).length : '…'} öğrenciden … öğrenci oy kullanmıştır. Oylama sonuçları aşağıdadır.</p>
    <table><tr><th>S.No</th><th>Adayın adı soyadı</th><th>Aldığı oy</th></tr><tr><td>1</td><td></td><td></td></tr><tr><td>2</td><td></td><td></td></tr><tr><td>3</td><td></td><td></td></tr><tr><td>4</td><td></td><td></td></tr></table>
    <p>Seçim sonucunda en çok oyu alan … sınıf başkanı, ikinci sırada yer alan … sınıf başkan yardımcısı seçilmiştir.</p>
    ${imzaTablo(['…<br>Sandık Görevlisi (Öğrenci)', '…<br>Sandık Görevlisi (Öğrenci)', `${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`])}`; } },
  { k:'gozlemformu', kat:'Rehberlik', ad:'Öğrenci Gözlem Formu', not:'Tek öğrenci için gözlem kaydı.', f:(p) => `${baslik(p)}<h2 style="text-align:center">ÖĞRENCİ GÖZLEM FORMU</h2>
    <table><tr><th>Öğrencinin adı soyadı</th><td></td><th>Sınıfı / No</th><td></td></tr><tr><th>Gözlem tarihi</th><td>…/…/20…</td><th>Gözlem ortamı</th><td>Ders / Teneffüs / Etkinlik</td></tr></table>
    <h3>Gözlenen davranış</h3><p>…</p><h3>Davranışın sıklığı ve süresi</h3><p>…</p><h3>Öğretmenin değerlendirmesi</h3><p>…</p><h3>Yapılan / önerilen çalışma</h3><p>…</p>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`])}` },
  { k:'tutanak', kat:'Tutanak', ad:'Genel Tutanak', not:'Her türlü olay ve durum için.', f:(p) => `${baslik(p)}<h2 style="text-align:center">TUTANAKTIR</h2><p>…/…/20… tarihinde saat …:… sıralarında …</p><p>…</p><p>İşbu tutanak tarafımızca düzenlenerek imza altına alınmıştır.</p>
    ${imzaTablo([`${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`, '…<br>…', '…<br>…'])}` },
  { k:'dilekce', kat:'Dilekçe', ad:'Dilekçe (izin vb.)', not:'Okul müdürlüğüne hitaben.', f:(p) => `<p style="text-align:center"><b>${esc(up(p.okul))} MÜDÜRLÜĞÜNE</b><br>${esc(p.ilce)} / ${esc(up(p.il))}</p><p><br></p>
    <p>Okulunuzda ${esc(p.brans)} öğretmeni olarak görev yapmaktayım. …/…/20… tarihinde … nedeniyle … gün izinli sayılmam hususunda;</p><p>Gereğini bilgilerinize arz ederim.</p>
    <p style="text-align:right">…/…/20…<br><br>${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni</p><p><b>Adres:</b> …<br><b>Telefon:</b> …</p>` },
  { k:'bos', kat:'Diğer', ad:'Boş Belge', not:'Okul başlıklı boş sayfa.', f:(p) => `${baslik(p)}<h2 style="text-align:center">BAŞLIK</h2><p>…</p>` }
];
function zumre(p, donem, items) {
  return `${baslik(p)}<h2 style="text-align:center">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>${esc(up(p.brans))} ZÜMRE ÖĞRETMENLER ${donem} TOPLANTI TUTANAĞI</h2>
  <table><tr><th>Toplantı no</th><td>${donem === 'DÖNEM BAŞI' ? 1 : 2}</td><th>Tarih</th><td>…/…/20…</td></tr><tr><th>Saat</th><td>…:…</td><th>Yer</th><td>Öğretmenler Odası</td></tr></table>
  <h3>Katılanlar</h3><table><tr><th>S.No</th><th>Adı Soyadı</th><th>Branşı</th><th>İmza</th></tr><tr><td>1</td><td>${esc(p.ad)}</td><td>${esc(p.brans)}</td><td></td></tr>${[2, 3, 4].map(i => `<tr><td>${i}</td><td></td><td>${esc(p.brans)}</td><td></td></tr>`).join('')}</table>
  <h3>Gündem maddeleri</h3>${gundem(items)}<h3>Gündem maddelerinin görüşülmesi</h3>${gorusme(items)}
  <h3>Alınan kararlar</h3><ol><li>…</li><li>…</li><li>…</li></ol>
  ${imzaTablo([`${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni`, `…<br>${esc(p.brans)} Öğretmeni`, `…<br>Zümre Başkanı`])}${onay(p)}`;
}

/* ===================== Sınıf listesi içe aktarma ===================== */
async function fileToRows(file) {
  const name = low(file.name); const buf = await file.arrayBuffer();
  if (/\.(xlsx|xls|ods|csv)$/.test(name)) {
    if (typeof XLSX === 'undefined') throw new Error('Excel okuyucu yüklenemedi. Listeyi kopyalayıp yapıştırın.');
    const wb = XLSX.read(buf, { type:'array' }); let best = [];
    for (const sn of wb.SheetNames) { const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header:1, raw:false, defval:'' }); if (rows.length > best.length) best = rows; }
    return best;
  }
  if (/\.docx$/.test(name)) {
    if (typeof mammoth === 'undefined') throw new Error('Word okuyucu yüklenemedi. Listeyi kopyalayıp yapıştırın.');
    const r = await mammoth.convertToHtml({ arrayBuffer:buf }); const doc = new DOMParser().parseFromString(r.value, 'text/html');
    const trs = $$('tr', doc); if (trs.length) return trs.map(tr => $$('td,th', tr).map(td => td.textContent.trim()));
    const t = await mammoth.extractRawText({ arrayBuffer:buf }); return textToRows(t.value);
  }
  if (/\.doc$/.test(name)) throw new Error('Eski .doc biçimi okunamıyor. Word\'de "Farklı kaydet › .docx" yapıp tekrar deneyin ya da listeyi kopyalayıp yapıştırın.');
  return textToRows(new TextDecoder('utf-8').decode(buf));
}
function textToRows(t) { return String(t).split(/\r?\n/).map(l => l.includes('\t') ? l.split('\t') : l.includes(';') ? l.split(';') : [l]); }
function pickStudents(rows) {
  rows = rows.map(r => (r || []).map(c => String(c ?? '').replace(/\s+/g, ' ').trim())).filter(r => r.some(c => c));
  let h = -1, noC = -1, adC = -1, soyC = -1, adsoyC = -1;
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const L = rows[i].map(low); let a = -1, s = -1, as = -1, n = -1, n2 = -1;
    L.forEach((c, j) => {
      if (/ad[ıi]?\s*(ve\s*)?soyad|ad\s*-\s*soyad|isim\s*soyisim|öğrencinin\s*ad[ıi]\s*soyad/.test(c)) as = j;
      else if (/^soyad[ıi]?$|^soyisim/.test(c)) s = j;
      else if (/^(öğrencinin\s*)?ad[ıi]?$|^isim$|^ad$/.test(c)) a = j;
      if (/(öğrenci|okul)\s*(no|numaras)/.test(c)) n = j; else if (/^(no|numara|numarası)$/.test(c) && n2 < 0) n2 = j;
    });
    if (as >= 0 || a >= 0) { h = i; adsoyC = as; adC = a; soyC = s; noC = n >= 0 ? n : n2; break; }
  }
  const isGender = w => /^(e|k|erkek|kız|kiz|kadın)$/i.test(w);
  const out = [];
  if (h >= 0) {
    for (const r of rows.slice(h + 1)) {
      const name = adsoyC >= 0 ? r[adsoyC] : [r[adC], soyC >= 0 ? r[soyC] : ''].filter(Boolean).join(' ');
      const no = noC >= 0 ? (r[noC] || '').replace(/\D/g, '') : '';
      if (noC >= 0 && !no) continue;
      if (name && /\p{L}{2,}/u.test(name) && !/ad[ıi]\s*soyad/i.test(name)) out.push({ no, ad:name.trim() });
    }
  } else {
    for (const r of rows) {
      const cells = r.length === 1 ? r[0].split(/\s+/) : r; const nums = [], words = [];
      for (const c of cells) { if (/^\d{1,6}[.)]?$/.test(c)) nums.push(c.replace(/\D/g, '')); else if (c && /\p{L}/u.test(c) && !isGender(c)) words.push(c); }
      const ad = words.join(' ').trim(); if (ad.length >= 3) out.push({ no:nums.length ? nums[nums.length - 1] : '', ad, hasNo:nums.length > 0 });
    }
    const withNo = out.filter(o => o.hasNo).length;
    if (withNo >= out.length / 2) return out.filter(o => o.hasNo).map(({ no, ad }) => ({ no, ad }));
  }
  return out.map(({ no, ad }) => ({ no, ad }));
}
function guessClass(rows) {
  const txt = rows.slice(0, 15).map(r => r.join(' ')).join(' ');
  let m = txt.match(/\b([5-8])\s*\.?\s*s[ıi]n[ıi]f\s*[\/\-]?\s*([A-ZÇĞİÖŞÜ])\s*şube/i) || txt.match(/\b([5-8])\s*[\/\-]\s*([A-ZÇĞİÖŞÜ])\b/) || txt.match(/\b([5-8])\s*([A-ZÇĞİÖŞÜ])\s*(sınıf|şube)/i);
  return m ? m[1] + up(m[2]) : '';
}
function impModal(targetId) {
  S.imp = { target:targetId || '', rows:null };
  const sn = siniflar();
  openModal('Sınıf listesi yükle', `
    <p class="muted">Excel (.xlsx, .xls), Word (.docx), CSV ya da metin dosyası seçin. İsterseniz listeyi doğrudan aşağıya yapıştırın. Her satır: <span class="mono">numara ad soyad</span></p>
    <div class="field"><label for="imp-file">Dosya seç</label><input class="inp" type="file" id="imp-file" data-in="imp-file" accept=".xlsx,.xls,.ods,.csv,.docx,.txt"></div>
    <div class="field"><label for="imp-text">Öğrenciler (kontrol edip düzeltebilirsiniz)</label><textarea class="inp" id="imp-text" data-in="imp-text" placeholder="101 Ayşe YILMAZ&#10;102 Mehmet KAYA&#10;…"></textarea><small class="note" id="imp-count">0 öğrenci</small></div>
    <div class="fgrid"><div class="field"><label for="imp-target">Nereye?</label><select class="inp" id="imp-target"><option value="">Yeni sınıf oluştur</option>${sn.map(s => `<option value="${s.id}" ${s.id === targetId ? 'selected' : ''}>${esc(s.ad)} (${(s.ogr || []).length} öğrenci)</option>`).join('')}</select></div>
      <div class="field"><label for="imp-ad">Yeni sınıfın adı</label><input class="inp" id="imp-ad" placeholder="ör. 6A"></div>
      <div class="field"><label for="imp-mode">Mevcut sınıfa</label><select class="inp" id="imp-mode"><option value="replace">Listeyi bununla değiştir</option><option value="append">Mevcut listenin sonuna ekle</option></select></div></div>`,
    `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="imp-save">Sınıfı kaydet</button>`);
}
function impParseText(t) { return t.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => { const m = l.match(/^(\d+)[\s.\-):\t]+(.+)$/); return m ? { no:m[1], ad:m[2].trim() } : { no:'', ad:l }; }).filter(o => /\p{L}/u.test(o.ad)); }
function impCount() { const n = impParseText($('#imp-text').value).length; $('#imp-count').textContent = n + ' öğrenci'; }

/* ===================== Dosya yükleme ===================== */
const NATIVE = { png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', gif:'image/gif', webp:'image/webp', svg:'image/svg+xml', mp4:'video/mp4', webm:'video/webm', pdf:'application/pdf', csv:'text/csv', md:'text/markdown', json:'application/json', txt:'text/plain' };
const DL_OK = /^(gif|png|jpg|jpeg|webp|mp4|webm|mov|txt|json|md|docx|pptx|epub|csv|ttf|html|svg|pdf|xlsx|zip)$/;
function upModal(folder) {
  S.upl = { files:[], folder:folder || (S.dzFolder !== 'hepsi' ? S.dzFolder : 'Genel') };
  openModal('Dosya yükle', `<div class="field"><label for="up-file">Dosyaları seçin (birden fazla seçebilirsiniz)</label><input class="inp" type="file" id="up-file" data-in="up-file" multiple></div>
    <div class="field"><label for="up-folder">Klasör</label><select class="inp" id="up-folder">${klasorler().map(k => `<option ${k === S.upl.folder ? 'selected' : ''}>${esc(k)}</option>`).join('')}</select></div>
    <div id="up-rows"></div><p class="note">Büyük fotoğraflar kalite kaybı fark edilmeyecek şekilde küçültülür. Word, Excel, PowerPoint ve PDF dosyaları olduğu gibi telefonda saklanır.</p>`,
    `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="up-go">Yükle</button>`);
}
function upRows() { $('#up-rows').innerHTML = S.upl.files.map((f, i) => `<div class="uprow"><input class="inp" id="up-n-${i}" value="${esc(f.name)}" aria-label="Dosya adı"><span class="st" id="up-s-${i}">${fmtSize(f.size)} · bekliyor</span></div>`).join(''); }
const readDataURL = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(f); });
async function shrink(file) {
  try { const bmp = await createImageBitmap(file); const k = Math.min(1, 2200 / Math.max(bmp.width, bmp.height)); const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height); return await new Promise(r => c.toBlob(b => r(b || file), 'image/jpeg', .86)); } catch (e) { return file; }
}
async function uploadOne(file, name, folder) {
  let ext = (file.name.includes('.') ? file.name.split('.').pop() : '').toLowerCase(); let blob = file; let type = file.type || NATIVE[ext] || '';
  if (/^(png|jpe?g|webp)$/.test(ext) && file.size > 2.5e6) { blob = await shrink(file); if (blob !== file) { type = 'image/jpeg'; ext = 'jpg'; name = name.replace(/\.(png|jpe?g|webp)$/i, '') + '.jpg'; } }
  const r = await Files.upload(blob);
  Store.put(rid('dosya'), { type:'dosya', ad:name, klasor:folder, assetId:r.id, ct:type, ext, b64:false, orjTip:type, boyut:blob.size, tarih:Date.now() }, true);
}
async function fetchAsset(f) { const b = await Files.get(f.assetId); if (!b) throw new Error('Dosya bulunamadı'); return b; }
async function dzOpen(id) {
  const f = Store.get(id); if (!f) return;
  const img = /^image\//.test(f.ct) && !f.b64, vid = /^video\//.test(f.ct), pdf = f.ext === 'pdf';
  openModal(esc(f.ad), `<div class="preview" id="dz-prev">${img ? `<img data-fid="${esc(f.assetId)}" alt="${esc(f.ad)}">` : vid ? `<video data-fid="${esc(f.assetId)}" controls></video>` : pdf ? `<div class="empty"><b>PDF belgesi</b><a class="btn blue" data-fid="${esc(f.assetId)}" target="_blank" rel="noopener">PDF'yi aç</a></div>` : '<p class="muted">Önizleme hazırlanıyor…</p>'}</div>
    <div class="fgrid"><div class="field"><label for="dz-ad">Dosya adı</label><input class="inp" id="dz-ad" value="${esc(f.ad)}"></div>
    <div class="field"><label for="dz-kl">Klasör</label><select class="inp" id="dz-kl">${klasorler().map(k => `<option ${k === f.klasor ? 'selected' : ''}>${esc(k)}</option>`).join('')}</select></div></div>
    <p class="note">${fmtSize(f.boyut || 0)} · yüklenme ${fmtD(f.tarih)}</p>`,
    `<button class="btn danger" data-act="dz-del" data-id="${f.id}">${icon('trash')}Sil</button><span style="flex:1"></span><button class="btn" data-act="dz-dl" data-id="${f.id}">${icon('down')}İndir</button><button class="btn primary" data-act="dz-save" data-id="${f.id}">Kaydet</button>`, true);
  if (img || vid || pdf) { hydrate($('#modal')); return; }
  const box = $('#dz-prev');
  try {
    if (f.ext === 'docx' && typeof mammoth !== 'undefined') { const b = await fetchAsset(f); const r = await mammoth.convertToHtml({ arrayBuffer:await b.arrayBuffer() }); box.innerHTML = `<div class="docx">${r.value.replace(/<script[\s\S]*?<\/script>/gi, '')}</div>`; }
    else if (/^(xlsx|xls|ods|csv)$/.test(f.ext) && typeof XLSX !== 'undefined') { const b = await fetchAsset(f); const wb = XLSX.read(await b.arrayBuffer(), { type:'array' }); box.innerHTML = wb.SheetNames.slice(0, 3).map(n => `<h3 style="margin:6px 0">${esc(n)}</h3>` + XLSX.utils.sheet_to_html(wb.Sheets[n], { header:'', footer:'' }).replace(/<\/?(html|head|body|meta|title)[^>]*>/gi, '')).join(''); }
    else if (/^(txt|md|json)$/.test(f.ext)) { const b = await fetchAsset(f); box.innerHTML = `<pre style="white-space:pre-wrap;margin:0">${esc((await b.text()).slice(0, 20000))}</pre>`; }
    else box.innerHTML = `<div class="empty"><b>${esc(up(f.ext || 'dosya'))} dosyası</b><span>Bu tür için önizleme yok. İndirip ilgili programla açabilirsiniz.</span></div>`;
  } catch (e) { box.innerHTML = '<p class="muted">Önizleme açılamadı. Dosyayı indirerek açabilirsiniz.</p>'; }
}

/* ===================== İndirme ===================== */
async function saveFile(filename, data) {
  const type = /\.html$/.test(filename) ? 'text/html;charset=utf-8' : /\.json$/.test(filename) ? 'application/json' : 'application/octet-stream';
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const u = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = u; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 60000); toast('İndirildi: ' + filename + ' (İndirilenler klasörü)', 4000); return true;
}
function printHTML(title, body) {
  const html = htmlDoc(title, body).replace('</body>', '<script>window.onload=function(){setTimeout(function(){window.print()},300)}<\/script></body>');
  const w = window.open('', '_blank');
  if (!w) { saveFile(safeName(title) + '.html', html); return; }
  w.document.open(); w.document.write(html); w.document.close();
}
const safeName = s => String(s || 'belge').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120);
function htmlDoc(title, body) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.45;max-width:820px;margin:24px auto;padding:0 18px;color:#000}table{border-collapse:collapse;width:100%;margin:8px 0}td,th{border:1px solid #000;padding:4px 6px;vertical-align:top;text-align:left}table.imza td{border:none;text-align:center;padding-top:26px}h1{font-size:16pt}h2{font-size:13pt}h3{font-size:12pt}.pb{page-break-before:always}.ipucu{font:12px Arial,sans-serif;color:#444;border:1px dashed #888;padding:8px;margin-bottom:14px}img{max-width:100%}@media print{.ipucu{display:none}body{margin:0 auto}}</style></head><body><div class="ipucu">Yazdırmak veya PDF olarak kaydetmek için Ctrl+P (telefonda Paylaş › Yazdır). Word ile de açabilirsiniz.</div>${body}</body></html>`;
}
function czTableHTML(c) {
  const s = Store.get(c.sinifId); const ogr = s ? s.ogr || [] : [];
  return `<h2 style="text-align:center">${esc(c.ad)}</h2><p style="text-align:center">${esc(s ? s.ad : '')} · ${esc(prof().ad)} · ${todayStr()}</p>
  <table><tr><th>No</th><th>Adı Soyadı</th>${c.cols.map(col => `<th>${esc(col.ad)}</th>`).join('')}<th>Özet</th></tr>
  ${ogr.map(o => `<tr><td>${esc(o.no)}</td><td>${esc(o.ad)}</td>${c.cols.map(col => { const v = ((c.v || {})[o.id] || {})[col.id] ?? ''; return `<td style="text-align:center">${esc(col.tip === 'check' ? SYM[v] || '' : v)}</td>`; }).join('')}<td>${esc(czRowSum(c, o.id))}</td></tr>`).join('')}</table>`;
}

/* ===================== Modal ===================== */
function openModal(title, body, foot, wide) {
  const m = $('#modal'); m.innerHTML = `<div class="dialog ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="dlg-h"><h3 style="margin:0;min-width:0;overflow:hidden;text-overflow:ellipsis">${title}</h3><button class="btn ghost sm" data-act="modal-close" aria-label="Kapat">${icon('x')}</button></div><div class="dlg-b">${body}</div>${foot ? `<div class="dlg-f">${foot}</div>` : ''}</div>`;
  m.hidden = false; setTimeout(() => { const f = $('.dlg-b input:not([type=file]),.dlg-b select', m); if (f && window.innerWidth > 700) f.focus(); }, 30);
}
function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
function ask(msg, yesLabel, cb) { S.confirmCb = cb; openModal('Emin misiniz?', `<p>${msg}</p>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="confirm-yes">${esc(yesLabel)}</button>`); }
function promptModal(title, label, val, cb) { S.confirmCb = () => cb($('#pm-v').value.trim()); openModal(title, `<div class="field"><label for="pm-v">${esc(label)}</label><input class="inp" id="pm-v" value="${esc(val || '')}"></div>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="confirm-yes">Kaydet</button>`); }

/* ===================== Çizelge işlemleri ===================== */
function czSave() { if (!S.edit) return; const d = Store.put(S.edit.id, S.edit.d); S.edit.d._rev = d._rev; }
function czUpdateRow(sid) { const c = S.edit.d; const el = $('#sum-' + sid); if (el) el.textContent = czRowSum(c, sid); const s = Store.get(c.sinifId); const ogr = s ? s.ogr || [] : []; for (const col of c.cols) { const st = $('#st-' + col.id); if (st) st.textContent = czColStat(c, col, ogr); } }
function colModal(colId) {
  const c = S.edit.d; const col = colId ? c.cols.find(x => x.id === colId) : null;
  openModal(col ? 'Sütunu düzenle' : 'Sütun ekle', `<div class="field"><label for="col-ad">Sütun adı</label><input class="inp" id="col-ad" value="${esc(col ? col.ad : '')}" placeholder="ör. Ödev 3 · ${todayStr().slice(0, 5)}"></div>
    <div class="field"><label for="col-tip">Tür</label><select class="inp" id="col-tip">${Object.entries(TIP_AD).map(([k, v]) => `<option value="${k}" ${col && col.tip === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
    ${col ? `<div class="row"><button class="btn sm" data-act="col-move" data-c="${col.id}" data-d="-1">← Sola taşı</button><button class="btn sm" data-act="col-move" data-c="${col.id}" data-d="1">Sağa taşı →</button></div>` : '<p class="note">Bir ödev, kontrol günü veya ölçüt için sütun ekleyin.</p>'}`,
    `${col ? `<button class="btn danger" data-act="col-del" data-c="${col.id}">${icon('trash')}Sütunu sil</button><span style="flex:1"></span>` : ''}<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="col-save" data-c="${col ? col.id : ''}">Kaydet</button>`);
}
function czNewModal(tplK, sinifId) {
  const sn = siniflar();
  if (!sn.length) { toast('Önce bir sınıf oluşturun.'); impModal(); return; }
  const t = CZ_TPL.find(x => x.k === tplK) || CZ_TPL[0]; const sid = sinifId || (sn.find(s => s.rehber) || sn[0]).id;
  openModal('Yeni çizelge', `<div class="field"><label>Şablon</label><div class="grid g3" id="cz-tpls">${CZ_TPL.map(x => `<button class="tpl" data-act="cz-pick" data-t="${x.k}" aria-pressed="${x.k === t.k}" style="padding:10px"><b style="font-size:14px">${esc(x.ad)}</b></button>`).join('')}</div></div>
    <div class="fgrid"><div class="field"><label for="cz-sinif">Sınıf</label><select class="inp" id="cz-sinif">${sn.map(s => `<option value="${s.id}" ${s.id === sid ? 'selected' : ''}>${esc(s.ad)} (${(s.ogr || []).length})</option>`).join('')}</select></div>
    <div class="field"><label for="cz-name">Çizelge adı</label><input class="inp" id="cz-name" value="${esc(t.ad)}"></div></div><input type="hidden" id="cz-tpl" value="${t.k}">`,
    `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="cz-create">Oluştur</button>`, true);
}

/* ===================== Olaylar ===================== */
const ACT = {
  'nav': b => go(b.dataset.p || b.dataset.k),
  'modal-close': () => closeModal(),
  'confirm-yes': () => { const cb = S.confirmCb; S.confirmCb = null; closeModal(); cb && cb(); },
  'open-sinif': b => { closeModal(); go('sinif', b.dataset.id); },
  'open-cizelge': b => { closeModal(); go('cizelge', b.dataset.id); },
  'open-evrak': b => { closeModal(); go('evrak', b.dataset.id); },
  'mv-go': b => { S.mvTab = b.dataset.k; S.mvQ = ''; go('mevzuat'); },
  'mv-tab': b => { S.mvTab = b.dataset.k; S.mvQ = ''; render(); },
  /* sınıf */
  'imp-open': b => impModal(b.dataset.id || (S.page === 'sinif' ? S.pid : '')),
  'imp-save': () => {
    const list = impParseText($('#imp-text').value); if (!list.length) { toast('Listede öğrenci bulunamadı.'); return; }
    const target = $('#imp-target').value; const ogr = list.map(o => ({ id:rid('o'), no:o.no, ad:o.ad }));
    if (target) { const s = Store.get(target); const yeni = $('#imp-mode').value === 'append' ? [...(s.ogr || []), ...ogr] : ogr; Store.put(target, { ...s, ogr:yeni }, true); closeModal(); toast(`${ogr.length} öğrenci ${s.ad} sınıfına kaydedildi.`); go('sinif', target); }
    else { const ad = $('#imp-ad').value.trim() || 'Yeni sınıf'; const id = rid('sinif'); Store.put(id, { type:'sinif', ad, rehber:ad.replace(/\W/g, '') === prof().rehberSinif.replace(/\W/g, ''), ogr, tarih:Date.now() }, true); closeModal(); toast(`${ad} sınıfı ${ogr.length} öğrenciyle oluşturuldu.`); go('sinif', id); }
  },
  'sinif-new': () => promptModal('Yeni sınıf', 'Sınıf adı', '', ad => { if (!ad) return; const id = rid('sinif'); Store.put(id, { type:'sinif', ad, rehber:false, ogr:[], tarih:Date.now() }, true); go('sinif', id); }),
  'sinif-del': () => { const s = Store.get(S.pid); ask(`<b>${esc(s.ad)}</b> sınıfı ve öğrenci listesi silinecek.`, 'Sınıfı sil', () => { Store.remove(S.pid); go('siniflar'); toast('Sınıf silindi.'); }); },
  'ogr-add': () => { const s = Store.get(S.pid); const o = { id:rid('o'), no:'', ad:'' }; Store.put(S.pid, { ...s, ogr:[...(s.ogr || []), o] }); render(); const el = $('#o-no-' + o.id); el && el.focus(); },
  'ogr-del': b => { const s = Store.get(S.pid); const o = (s.ogr || []).find(x => x.id === b.dataset.o); ask(`<b>${esc(o && o.ad || 'Bu öğrenci')}</b> listeden çıkarılacak.`, 'Çıkar', () => { const t = Store.get(S.pid); Store.put(S.pid, { ...t, ogr:(t.ogr || []).filter(x => x.id !== b.dataset.o) }); render(); }); },
  'ogr-sort': b => { const s = Store.get(S.pid); const by = b.dataset.by; const ogr = [...(s.ogr || [])].sort((a, c) => by === 'no' ? (parseInt(a.no) || 1e9) - (parseInt(c.no) || 1e9) : String(a.ad).localeCompare(String(c.ad), 'tr')); Store.put(S.pid, { ...s, ogr }); render(); },
  /* çizelge */
  'cz-new': b => czNewModal(b.dataset.t, b.dataset.id),
  'cz-pick': b => { $$('#cz-tpls .tpl').forEach(x => x.setAttribute('aria-pressed', x === b)); const t = CZ_TPL.find(x => x.k === b.dataset.t); $('#cz-tpl').value = t.k; $('#cz-name').value = t.ad; },
  'cz-create': () => {
    const t = CZ_TPL.find(x => x.k === $('#cz-tpl').value) || CZ_TPL[0]; const sinifId = $('#cz-sinif').value; const s = Store.get(sinifId);
    const cols = t.cols.map(([ad, tip]) => ({ id:rid('c'), ad, tip }));
    if (t.tarihli && (t.k === 'odev' || t.k === 'katilim')) cols.push({ id:rid('c'), ad:todayStr().slice(0, 5), tip:'check' });
    const id = rid('cizelge'); Store.put(id, { type:'cizelge', ad:($('#cz-name').value.trim() || t.ad) + (s ? ' · ' + s.ad : ''), sinifId, sablon:t.k, cols, v:{}, olusturma:Date.now() }, true);
    closeModal(); go('cizelge', id);
  },
  'cz-filter': b => { S.czFilter = b.dataset.k; render(); },
  'cyc': b => {
    const c = S.edit.d; const col = c.cols.find(x => x.id === b.dataset.c); const seq = CYC[col.tip];
    c.v = c.v || {}; c.v[b.dataset.s] = c.v[b.dataset.s] || {}; const cur = c.v[b.dataset.s][col.id] || ''; const nx = seq[(seq.indexOf(cur) + 1) % seq.length];
    c.v[b.dataset.s][col.id] = nx; b.className = 'cy' + czCellClass(col.tip, nx); b.textContent = czCellText(col.tip, nx); czUpdateRow(b.dataset.s); czSave();
  },
  'col-add': () => colModal(null),
  'col-today': () => { const c = S.edit.d; const tip = (c.cols.find(x => x.tip === 'check') || c.cols[0] || { tip:'check' }).tip; const name = todayStr().slice(0, 5); let ad = name, i = 2; while (c.cols.some(x => x.ad === ad)) ad = name + ' (' + i++ + ')'; c.cols.push({ id:rid('c'), ad, tip:tip === 'metin' ? 'check' : tip }); czSave(); render(); },
  'col-edit': b => colModal(b.dataset.c),
  'col-save': b => { const c = S.edit.d; const ad = $('#col-ad').value.trim() || todayStr().slice(0, 5); const tip = $('#col-tip').value;
    if (b.dataset.c) { const col = c.cols.find(x => x.id === b.dataset.c); if (col.tip !== tip) for (const k in c.v || {}) delete c.v[k][col.id]; col.ad = ad; col.tip = tip; } else c.cols.push({ id:rid('c'), ad, tip });
    closeModal(); czSave(); render(); },
  'col-del': b => { const c = S.edit.d; const id = b.dataset.c; const col = c.cols.find(x => x.id === id); ask(`<b>${esc(col.ad)}</b> sütunu ve içindeki tüm işaretler silinecek.`, 'Sütunu sil', () => { c.cols = c.cols.filter(x => x.id !== id); for (const k in c.v || {}) delete c.v[k][id]; czSave(); render(); }); },
  'col-move': b => { const c = S.edit.d; const i = c.cols.findIndex(x => x.id === b.dataset.c); const j = i + +b.dataset.d; if (j < 0 || j >= c.cols.length) return; [c.cols[i], c.cols[j]] = [c.cols[j], c.cols[i]]; czSave(); closeModal(); render(); },
  'cz-del': () => { const c = S.edit.d; ask(`<b>${esc(c.ad)}</b> çizelgesi silinecek.`, 'Çizelgeyi sil', () => { Store.remove(S.edit.id); go('cizelgeler'); toast('Çizelge silindi.'); }); },
  'cz-xlsx': async () => {
    if (typeof XLSX === 'undefined') { toast('Excel modülü yüklenemedi.'); return; }
    const c = S.edit.d; const s = Store.get(c.sinifId); const ogr = s ? s.ogr || [] : [];
    const aoa = [[c.ad], [`${s ? s.ad : ''} · ${prof().ad} · ${todayStr()}`], [], ['No', 'Adı Soyadı', ...c.cols.map(x => x.ad), 'Özet'], ...ogr.map(o => [o.no, o.ad, ...c.cols.map(col => { const v = ((c.v || {})[o.id] || {})[col.id] ?? ''; return col.tip === 'check' ? (SYM[v] || '') : (col.tip !== 'metin' && v !== '' && !isNaN(+String(v).replace(',', '.')) ? +String(v).replace(',', '.') : v); }), czRowSum(c, o.id)])];
    const ws = XLSX.utils.aoa_to_sheet(aoa); ws['!cols'] = [{ wch:7 }, { wch:28 }, ...c.cols.map(() => ({ wch:12 })), { wch:18 }];
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Çizelge'); const out = XLSX.write(wb, { type:'array', bookType:'xlsx' });
    await saveFile(safeName(c.ad) + '.xlsx', new Blob([out], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  },
  'cz-print': () => { const c = S.edit.d; printHTML(c.ad, czTableHTML(c)); },
  'ev-print': () => { evFlush(); const e = S.edit.d; printHTML(e.baslik, e.html); },
  'mf-print': b => { S.mfPrint = true; ACT['mf-dl'](b); },
  'install': async () => { if (!S.installEvt) return; S.installEvt.prompt(); try { await S.installEvt.userChoice; } catch (e) {} S.installEvt = null; render(); },
  'cz-html': async () => { const c = S.edit.d; await saveFile(safeName(c.ad) + '.html', htmlDoc(c.ad, czTableHTML(c))); },
  /* evrak */
  'ev-new': b => { const t = EV_TPL.find(x => x.k === b.dataset.k) || EV_TPL[EV_TPL.length - 1]; const p = prof(); const rs = rehberSinif();
    const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:t.ad + ' · ' + todayStr(), kategori:t.kat, sinifId:/Şube|Veli Toplant|Rehberlik Planı|Başkanı/.test(t.ad) && rs ? rs.id : '', html:t.f(p), olusturma:Date.now() }, true); closeModal(); go('evrak', id); },
  'ev-filter': b => { S.evFilter = b.dataset.k; render(); },
  'ev-cmd': b => { const c = b.dataset.c; $('#ev-sheet').focus(); if (c === 'h3' || c === 'p') document.execCommand('formatBlock', false, c === 'h3' ? 'H3' : 'P'); else document.execCommand(c, false, null); evInput(); },
  'ev-row': () => { const sel = getSelection(); const node = sel && sel.anchorNode; const tr = node && (node.nodeType === 1 ? node : node.parentElement).closest('#ev-sheet tr'); if (!tr) { toast('Önce imleci bir tablo satırına koyun.'); return; } const n = tr.cloneNode(true); $$('td,th', n).forEach(td => { td.innerHTML = '<br>'; }); tr.after(n); evInput(); },
  'ev-list': () => { const sn = siniflar(); if (!sn.length) { toast('Önce sınıf listesi yükleyin.'); return; }
    const sel = getSelection(); const range = sel && sel.rangeCount && $('#ev-sheet').contains(sel.anchorNode) ? sel.getRangeAt(0) : null; S.evRange = range;
    openModal('Öğrenci listesi ekle', `<div class="field"><label for="el-s">Sınıf</label><select class="inp" id="el-s">${sn.map(s => `<option value="${s.id}">${esc(s.ad)} (${(s.ogr || []).length})</option>`).join('')}</select></div><div class="field"><label for="el-c">Ek sütunlar (virgülle)</label><input class="inp" id="el-c" value="İmza"></div>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="ev-list-go">Ekle</button>`); },
  'ev-list-go': () => { const s = Store.get($('#el-s').value); const extra = $('#el-c').value.split(',').map(x => x.trim()).filter(Boolean);
    const html = `<table><tr><th>S.No</th><th>No</th><th>Adı Soyadı</th>${extra.map(x => `<th>${esc(x)}</th>`).join('')}</tr>${(s.ogr || []).map((o, i) => `<tr><td>${i + 1}</td><td>${esc(o.no)}</td><td>${esc(o.ad)}</td>${extra.map(() => '<td></td>').join('')}</tr>`).join('')}</table><p><br></p>`;
    closeModal(); const sheet = $('#ev-sheet'); sheet.focus(); if (S.evRange) { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(S.evRange); document.execCommand('insertHTML', false, html); } else sheet.insertAdjacentHTML('beforeend', html); evInput(); },
  'ev-dl': async () => { evFlush(); const e = S.edit.d; await saveFile(safeName(e.baslik) + '.html', htmlDoc(e.baslik, e.html)); },
  'ev-copy': () => { evFlush(); const e = S.edit.d; const id = rid('evrak'); const { _rev, guncelleme, ...rest } = e; Store.put(id, { ...rest, baslik:e.baslik + ' (kopya)', olusturma:Date.now() }, true); go('evrak', id); toast('Kopya oluşturuldu.'); },
  'ev-del': () => { const e = S.edit.d; ask(`<b>${esc(e.baslik)}</b> silinecek.`, 'Belgeyi sil', () => { clearTimeout(S.evT); Store.remove(S.edit.id); go('evraklar'); toast('Belge silindi.'); }); },
  /* dosyalar */
  'up-open': b => upModal(b.dataset.k),
  'up-go': async b => {
    if (!S.upl || !S.upl.files.length) { toast('Önce dosya seçin.'); return; }
    b.disabled = true; const folder = $('#up-folder').value; let ok = 0;
    for (let i = 0; i < S.upl.files.length; i++) { const st = $('#up-s-' + i); st.textContent = 'yükleniyor…';
      try { await uploadOne(S.upl.files[i], $('#up-n-' + i).value.trim() || S.upl.files[i].name, folder); st.textContent = 'yüklendi ✓'; st.style.color = 'var(--ok)'; ok++; }
      catch (e) { const c = e && e.code; st.style.color = 'var(--red)'; st.textContent = c === 'too_large' ? 'çok büyük' : c === 'unsupported_type' ? 'desteklenmeyen tür (HEIC ise JPEG olarak kaydedin)' : c === 'quota_or_state' ? 'depolama dolu' : c === 'rate_limited' ? 'çok hızlı, tekrar deneyin' : 'yüklenemedi'; } }
    b.disabled = false; if (ok === S.upl.files.length) { closeModal(); toast(`${ok} dosya "${folder}" klasörüne yüklendi.`); S.dzFolder = folder; if (S.page === 'dosyalar') render(); }
  },
  'dz-open': b => dzOpen(b.dataset.id),
  'dz-folder': b => { S.dzFolder = b.dataset.k; render(); },
  'dz-save': b => { const f = Store.get(b.dataset.id); let ad = $('#dz-ad').value.trim() || f.ad; if (f.ext && !low(ad).endsWith('.' + f.ext)) ad += '.' + f.ext; Store.put(f.id, { ...f, ad, klasor:$('#dz-kl').value }, true); closeModal(); toast('Kaydedildi.'); if (S.page === 'dosyalar' || S.page === 'mufettis' || S.page === 'mevzuat') render(); },
  'dz-dl': async b => { const f = Store.get(b.dataset.id);
    try { const blob = await fetchAsset(f); let n = f.ad; if (f.ext && !low(n).endsWith('.' + f.ext)) n += '.' + f.ext; await saveFile(n, blob); } catch (e) { toast('Dosya alınamadı.'); } },
  'dz-del': b => { const f = Store.get(b.dataset.id); ask(`<b>${esc(f.ad)}</b> kalıcı olarak silinecek.`, 'Sil', async () => { try { await Files.delete(f.assetId); } catch (e) {} Store.remove(f.id); toast('Dosya silindi.'); render(); }); },
  'kl-add': () => promptModal('Yeni klasör', 'Klasör adı', '', ad => { if (!ad) return; const a = ayar(); if ((a.klasorler || KLASOR0).includes(ad)) { toast('Bu adda bir klasör var.'); return; } Store.put('ayar', { ...a, type:'ayar', klasorler:[...(a.klasorler || KLASOR0), ad] }, true); S.dzFolder = ad; render(); }),
  'kl-ren': () => { const old = S.dzFolder; promptModal('Klasörü yeniden adlandır', 'Yeni ad', old, ad => { if (!ad || ad === old) return; const a = ayar(); Store.put('ayar', { ...a, type:'ayar', klasorler:(a.klasorler || KLASOR0).map(k => k === old ? ad : k) }, true); dosyalar().filter(f => f.klasor === old).forEach(f => Store.put(f.id, { ...f, klasor:ad })); S.dzFolder = ad; render(); }); },
  'kl-del': () => { const k = S.dzFolder; const n = dosyalar().filter(f => f.klasor === k).length; ask(`<b>${esc(k)}</b> klasörü kaldırılacak.${n ? ` İçindeki ${n} dosya "Genel" klasörüne taşınır.` : ''}`, 'Klasörü kaldır', () => { const a = ayar(); let kl = (a.klasorler || KLASOR0).filter(x => x !== k); if (!kl.includes('Genel')) kl.push('Genel'); Store.put('ayar', { ...a, type:'ayar', klasorler:kl }, true); dosyalar().filter(f => f.klasor === k).forEach(f => Store.put(f.id, { ...f, klasor:'Genel' })); S.dzFolder = 'hepsi'; render(); }); },
  /* mevzuat */
  'kk-add': () => { const ad = $('#kk-ad').value.trim(); if (!ad) { toast('Başlık yazın.'); return; } let url = $('#kk-url').value.trim(); if (url && !/^https?:\/\//.test(url)) url = 'https://' + url; Store.put(rid('kaynak'), { type:'kaynak', ad, url, not:$('#kk-not').value.trim() }, true); render(); },
  'kk-del': b => { Store.remove(b.dataset.id); render(); },
  /* müfettiş */
  'mf-dl': async b => {
    b.disabled = true; toast('Dosya hazırlanıyor…', 8000);
    try {
      const p = prof(); const parts = [];
      parts.push(`<div style="text-align:center;padding-top:60px">${baslik(p)}<h1 style="margin-top:60px">${esc(p.yil)} EĞİTİM-ÖĞRETİM YILI<br>ÖĞRETMEN DOSYASI</h1><p style="font-size:14pt;margin-top:40px"><b>${esc(p.ad)}</b><br>${esc(p.brans)} Öğretmeni${p.rehberSinif ? '<br>' + esc(p.rehberSinif) + ' Sınıf Rehber Öğretmeni' : ''}</p></div>`);
      parts.push(`<div class="pb"><h2 style="text-align:center">İSTİKLAL MARŞI</h2><div style="columns:2;column-gap:30px">${MARS.map(k => `<p style="break-inside:avoid">${esc(k).replace(/\n/g, '<br>')}</p>`).join('')}</div><p style="text-align:right"><i>Mehmet Âkif Ersoy</i></p></div>`);
      parts.push(`<div class="pb"><h2 style="text-align:center">ATATÜRK'ÜN GENÇLİĞE HİTABESİ</h2>${HITABE.map(x => `<p>${esc(x)}</p>`).join('')}<p style="text-align:right"><i>Gazi Mustafa Kemal Atatürk</i></p></div>`);
      parts.push(`<div class="pb"><h2>ÖĞRETMEN BİLGİLERİ</h2><table><tr><th>Adı Soyadı</th><td>${esc(p.ad)}</td></tr><tr><th>Branşı</th><td>${esc(p.brans)}</td></tr><tr><th>Okulu</th><td>${esc(p.okul)} (${esc(p.ilce)}/${esc(p.il)})</td></tr><tr><th>Rehber öğretmeni olduğu sınıf</th><td>${esc(p.rehberSinif)}</td></tr><tr><th>Okul müdürü</th><td>${esc(p.mudur)}</td></tr></table>
        <h3>2026-2027 Çalışma Takvimi</h3><table>${TAKVIM.map(e => `<tr><td>${fmtD(dParse(e.t))}${e.b ? ' – ' + fmtD(dParse(e.b)) : ''}</td><td>${esc(e.ad)}</td></tr>`).join('')}</table></div>`);
      for (const s of siniflar()) parts.push(`<div class="pb"><h2 style="text-align:center">${esc(s.ad)} SINIF LİSTESİ</h2><table><tr><th>S.No</th><th>No</th><th>Adı Soyadı</th></tr>${(s.ogr || []).map((o, i) => `<tr><td>${i + 1}</td><td>${esc(o.no)}</td><td>${esc(o.ad)}</td></tr>`).join('')}</table></div>`);
      const order = ['Plan', 'Zümre', 'Şube Öğretmenler Kurulu', 'Veli', 'Rehberlik', 'Tutanak', 'Dilekçe', 'Diğer'];
      for (const k of order) for (const e of evraklar().filter(x => x.kategori === k)) parts.push(`<div class="pb">${e.html}</div>`);
      for (const c of cizelgeler()) parts.push(`<div class="pb">${czTableHTML(c)}</div>`);
      const dz = dosyalar();
      if (dz.length) { let imgs = ''; let total = 0;
        for (const f of dz.filter(x => /^image\//.test(x.ct) && !x.b64)) { if (total > 12e6) break; try { const bl = await Files.get(f.assetId); total += bl.size; const du = await readDataURL(bl); imgs += `<figure style="break-inside:avoid;margin:10px 0"><img src="${du}" alt=""><figcaption>${esc(f.ad)} · ${esc(f.klasor)}</figcaption></figure>`; } catch (e) {} }
        parts.push(`<div class="pb"><h2>YÜKLENEN BELGELER</h2><table><tr><th>Klasör</th><th>Dosya</th><th>Tarih</th></tr>${dz.map(f => `<tr><td>${esc(f.klasor)}</td><td>${esc(f.ad)}</td><td>${fmtD(f.tarih)}</td></tr>`).join('')}</table>${imgs}</div>`); }
      if (S.mfPrint) { S.mfPrint = false; printHTML('Öğretmen Dosyası · ' + p.ad, parts.join('')); }
      else await saveFile('Ogretmen-Dosyasi-' + safeName(p.ad).replace(/\s+/g, '-') + '.html', htmlDoc('Öğretmen Dosyası · ' + p.ad, parts.join('')));
    } finally { b.disabled = false; S.mfPrint = false; }
  },
  /* profil */
  'profil': () => { const p = prof();
    const f = [['ad','Adı Soyadı'],['hitap','Hitap (ana sayfada)'],['brans','Branş'],['okul','Okul'],['ilce','İlçe'],['il','İl'],['mudur','Okul müdürü'],['rehberSinif','Rehber öğretmeni olduğunuz sınıf'],['yil','Eğitim-öğretim yılı']];
    openModal('Profil ve ayarlar', `<div class="fgrid">${f.map(([k, l]) => `<div class="field"><label for="pf-${k}">${l}</label><input class="inp" id="pf-${k}" value="${esc(p[k])}"></div>`).join('')}</div>
      <p class="note">Bu bilgiler tüm tutanak ve formlara otomatik yazılır.</p>
      <div class="card" style="background:var(--sunk)"><h3>Yapay zekâ ile form okuma</h3><p class="note" style="margin-bottom:10px">${(ayar().aiKey || '').trim() ? 'Anahtar ekli. Tanıma formlarının fotoğrafları otomatik okunur.' : 'El yazısıyla doldurulmuş tanıma formlarını fotoğraftan okumak için anahtar ekleyin.'}</p><button class="btn sm" data-act="ai-ayar">Ayarla</button></div>
      <div class="card" style="background:var(--sunk)"><h3>Meslektaşlarınızla paylaşın</h3><p class="note" style="margin-bottom:10px">Uygulamanın adresini gönderin; her öğretmen kendi bilgileriyle kurar. Sizin verileriniz onlara gitmez.</p><button class="btn sm" data-act="paylas">Uygulamayı paylaş</button></div>
      <div class="card" style="background:var(--sunk)"><h3>Yedek</h3><p class="note" style="margin-bottom:10px">Her şey bu cihazın içinde saklanır. Yedek dosyası sınıfları, çizelgeleri, evrakları ve yüklediğiniz dosyaların hepsini içerir. Telefonu değiştirirken veya bilgisayara aktarırken bu yedeği indirip diğer cihazda "Yedekten geri yükle" ile açın. Ayda bir yedek almanızı öneririm.</p>
      <div class="row"><button class="btn sm" data-act="yedek-al">${icon('down')}Yedeği indir (.json)</button><label class="btn sm" for="yedek-file">${icon('up')}Yedekten geri yükle</label><input type="file" id="yedek-file" data-in="yedek-file" accept=".json,application/json" hidden></div></div>`,
      `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="profil-save">Kaydet</button>`, true); },
  'kurulum-kaydet': () => {
    const v = k => ($('#ku-' + k).value || '').trim();
    const ad = v('ad'), brans = v('brans'), okul = v('okul');
    if (!ad || !brans || !okul) { toast('Lütfen adınızı, branşınızı ve okulunuzu yazın.'); return; }
    const rehber = v('rehber').replace(/\s+/g, '').toLocaleUpperCase('tr');
    const profil = { ...P0, ad, brans, okul, ilce:v('ilce'), il:v('il'), mudur:v('mudur'), rehberSinif:rehber, hitap:v('hitap') || ad.split(' ')[0] };
    Store.put('ayar', { type:'ayar', profil, klasorler:KLASOR0.map(k => k === 'Rehberlik (6A)' ? (rehber ? `Rehberlik (${rehber})` : 'Rehberlik') : k) }, true);
    if (rehber && !siniflar().length) Store.put(rid('sinif'), { type:'sinif', ad:rehber, rehber:true, ogr:[], tarih:Date.now() }, true);
    shell(); go('pano'); toast('Hoş geldiniz! Önce sınıf listenizi yükleyin.', 4000);
  },
  'paylas': async () => { const url = location.origin + location.pathname;
    if (navigator.share) { try { await navigator.share({ title:'Öğretmen Dosyam', text:'Öğretmen dosyası uygulaması: sınıf listeleri, çizelgeler, tutanaklar, mevzuat. Ücretsiz, internetsiz çalışır.', url }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
    try { await navigator.clipboard.writeText(url); toast('Adres kopyalandı: ' + url, 4000); } catch (e) { toast(url, 6000); } },
  'profil-save': () => { const a = ayar(); const p = { ...prof() }; for (const k of Object.keys(P0)) { const el = $('#pf-' + k); if (el) p[k] = el.value.trim(); } Store.put('ayar', { ...a, type:'ayar', profil:p }, true); closeModal(); shell(); render(); toast('Profil kaydedildi.'); },
  'yedek-al': async b => { b.disabled = true; toast('Yedek hazırlanıyor…', 6000);
    try { const data = {}, files = {}; for (const [id, d] of Store.items) { data[id] = d; if (d.type === 'dosya' && d.assetId) { const bl = await Files.get(d.assetId); if (bl) files[d.assetId] = await readDataURL(bl); } }
      await saveFile('ogretmen-dosyam-yedek-' + todayStr().replace(/\./g, '-') + '.json', JSON.stringify({ surum:2, tarih:Date.now(), kayitlar:data, dosyalar:files })); }
    finally { b.disabled = false; } }
};

function evInput() { clearTimeout(S.evT); S.evT = setTimeout(evFlush, 1000); }
function evFlush() {
  clearTimeout(S.evT); if (!S.edit || S.page !== 'evrak') return; const sh = $('#ev-sheet'); if (!sh) return;
  let removed = 0; $$('img', sh).forEach(i => { if (/^data:/.test(i.getAttribute('src') || '')) { i.remove(); removed++; } });
  if (removed) toast('Belgeye yapıştırılan resimler kaldırıldı. Fotoğrafları Dosyalar bölümüne yükleyin.', 4500);
  const html = sh.innerHTML; if (html.length > 230000) { toast('Belge çok uzun; bir kısmını ayrı belgeye taşıyın.', 5000); return; }
  if (html === S.edit.d.html) return; S.edit.d.html = html; const d = Store.put(S.edit.id, S.edit.d); S.edit.d._rev = d._rev;
}

document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]'); if (!a) { if (e.target.id === 'modal') closeModal(); return; }
  const fn = ACT[a.dataset.act] || (a.dataset.act.startsWith('open-') ? null : null); if (fn) { e.preventDefault(); fn(a, e); }
});
document.addEventListener('mousedown', e => { if (e.target.closest('.toolbar [data-act]')) e.preventDefault(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });
let qT;
document.addEventListener('input', e => {
  const el = e.target;
  if (el.id === 'ev-sheet') return evInput();
  const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'cell') { const c = S.edit.d; c.v = c.v || {}; c.v[el.dataset.s] = c.v[el.dataset.s] || {}; c.v[el.dataset.s][el.dataset.c] = el.value; czUpdateRow(el.dataset.s); czSave(); }
  else if (k === 'cz-ad') { S.edit.d.ad = el.value; czSave(); }
  else if (k === 'ev-baslik') { S.edit.d.baslik = el.value; evFlushMeta(); }
  else if (k === 'ogr') { const s = Store.get(S.pid); const ogr = (s.ogr || []).map(o => o.id === el.dataset.o ? { ...o, [el.dataset.f]:el.value } : o); Store.put(S.pid, { ...s, ogr }); }
  else if (k === 'sinif-ad') { const s = Store.get(S.pid); Store.put(S.pid, { ...s, ad:el.value }); }
  else if (k === 'imp-text') impCount();
  else if (k === 'ev-q' || k === 'dz-q' || k === 'mv-q') { clearTimeout(qT); qT = setTimeout(() => {
      if (k === 'ev-q') { S.evQ = el.value; const all = evraklar(); const q = low(S.evQ); $('#ev-list').innerHTML = evListHTML(all.filter(x => (S.evFilter === 'hepsi' || x.kategori === S.evFilter) && (!q || low(x.baslik).includes(q)))); }
      else if (k === 'dz-q') { S.dzQ = el.value; const q = low(S.dzQ); $('#dz-list').innerHTML = dzListHTML(dosyalar().filter(f => (S.dzFolder === 'hepsi' || f.klasor === S.dzFolder) && (!q || low(f.ad).includes(q)))); }
      else { S.mvQ = el.value; const pos = el.selectionStart; render(); const n = $('#mv-q'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) {} }
    }, 200); }
});
function evFlushMeta() { const d = Store.put(S.edit.id, S.edit.d); S.edit.d._rev = d._rev; }
document.addEventListener('change', async e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'sinif-rehber') { const s = Store.get(S.pid); Store.put(S.pid, { ...s, rehber:el.checked }, true); }
  else if (k === 'ev-kat') { S.edit.d.kategori = el.value; evFlushMeta(); }
  else if (k === 'ev-sinif') { S.edit.d.sinifId = el.value; evFlushMeta(); }
  else if (k === 'imp-file') {
    const f = el.files[0]; if (!f) return; $('#imp-count').textContent = 'Okunuyor…';
    try { const rows = await fileToRows(f); const list = pickStudents(rows); $('#imp-text').value = list.map(o => (o.no ? o.no + ' ' : '') + o.ad).join('\n'); impCount();
      const g = guessClass(rows) || (f.name.match(/\b([5-8])\s*[-_ ]?\s*([A-Za-z])\b/) || []).slice(1, 3).join('').toUpperCase(); if (g && !$('#imp-target').value) $('#imp-ad').value = g;
      if (!list.length) toast('Dosyada öğrenci adı bulunamadı. Listeyi kopyalayıp yapıştırmayı deneyin.', 5000); else toast(`${list.length} öğrenci bulundu. Kontrol edip kaydedin.`); }
    catch (err) { $('#imp-count').textContent = ''; toast(err.message || 'Dosya okunamadı.', 5000); }
  }
  else if (k === 'up-file') { S.upl.files = [...el.files]; upRows(); }
  else if (k === 'yedek-file') {
    const f = el.files[0]; if (!f) return;
    try { const j = JSON.parse(await f.text()); const rec = j.kayitlar || {}; const ids = Object.keys(rec); if (!ids.length) throw 0;
      ask(`Yedekteki ${ids.length} kayıt geri yüklenecek. Aynı kayıtların üzerine yazılır, diğerleri korunur.`, 'Geri yükle', async () => { toast('Geri yükleniyor…', 8000); const fl = j.dosyalar || {}; for (const fid of Object.keys(fl)) { try { const bl = await (await fetch(fl[fid])).blob(); await IDB.put('files', fid, bl); } catch (e) {} } for (const id of ids) { const d = rec[id]; if (d && d.type) Store.put(id, d); } shell(); render(); toast('Yedek geri yüklendi.'); }); }
    catch (er) { toast('Yedek dosyası okunamadı.'); }
  }
});

document.addEventListener('visibilitychange', () => { if (document.hidden) { if (S.page === 'evrak') evFlush(); Store.flushAll(); } });

/* ===================== Rehberlik: öğrenci bilgileri, oturma planı, formlar ===================== */
const OB_GRUP = [
  ['Öğrenci', [['dogumTarihi','Doğum tarihi'],['dogumYeri','Doğum yeri'],['cinsiyet','Cinsiyeti','sel',['','Kız','Erkek']],['adres','Ev adresi','uzun'],['kardesSayisi','Kardeş sayısı'],['kacinciCocuk','Kaçıncı çocuk'],['kimleYasiyor','Kiminle yaşıyor'],['kendiOdasi','Kendine ait odası','sel',['','Var','Yok']],['okulaGelis','Okula nasıl geliyor'],['kanGrubu','Kan grubu']]],
  ['Sağlık ve özel durum', [['saglik','Sürekli hastalık, alerji, kullandığı ilaç','uzun'],['ozelDurum','Engel, özel eğitim, kaynaştırma durumu','uzun'],['gozlukIsitme','Gözlük / işitme cihazı']]],
  ['İlgi ve başarı', [['hobiler','Hobileri, ilgi alanları','uzun'],['sevdigiDersler','Sevdiği dersler'],['zorlandigiDersler','Zorlandığı dersler'],['hedefMeslek','İstediği meslek'],['kurslar','Kurs ve etkinlikler'],['kitap','Kitap okuma alışkanlığı'],['teknoloji','Telefon, tablet, internet kullanımı']]],
  ['Anne', [['anneAd','Adı soyadı'],['anneDurum','Durumu','sel',['','Sağ','Vefat']],['anneEgitim','Eğitim durumu'],['anneMeslek','Mesleği'],['anneTel','Telefonu','tel']]],
  ['Baba', [['babaAd','Adı soyadı'],['babaDurum','Durumu','sel',['','Sağ','Vefat']],['babaEgitim','Eğitim durumu'],['babaMeslek','Mesleği'],['babaTel','Telefonu','tel']]],
  ['Aile ve veli', [['aileDurum','Anne ve baba','sel',['','Birlikte','Boşanmış','Ayrı yaşıyor']],['veliAd','Velinin adı soyadı'],['veliYakinlik','Veli yakınlığı'],['veliTel','Veli telefonu','tel'],['veliEposta','Veli e-posta']]],
  ['Öğretmen notu', [['not','Gözlem ve notlar','uzun']]]
];
const OB_ALAN = OB_GRUP.flatMap(g => g[1]);
const obId = ogrId => 'ogrbilgi_' + ogrId;
const obGet = ogrId => Store.get(obId(ogrId));
const obF = ogrId => (obGet(ogrId) || {}).f || {};
function obDolu(ogrId) { const f = obF(ogrId); const keys = OB_ALAN.filter(a => a[0] !== 'not').map(a => a[0]); return Math.round(keys.filter(k => f[k]).length / keys.length * 100); }
function obSave(ogrId, sinifId, f, fotolar) {
  const cur = obGet(ogrId) || { type:'ogrbilgi', ogrId, sinifId, f:{}, fotolar:[] };
  Store.put(obId(ogrId), { ...cur, type:'ogrbilgi', ogrId, sinifId, f:{ ...(cur.f || {}), ...(f || {}) }, fotolar:fotolar || cur.fotolar || [] });
}
function findOgr(ogrId) { for (const s of siniflar()) { const o = (s.ogr || []).find(x => x.id === ogrId); if (o) return { s, o }; } return null; }
const trNorm = s => low(s).replace(/[çğıöşüâîû]/g, c => ({ ç:'c', ğ:'g', ı:'i', ö:'o', ş:'s', ü:'u', â:'a', î:'i', û:'u' }[c])).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
function matchOgr(sinif, ad, no) {
  const ogr = sinif ? sinif.ogr || [] : []; const nn = String(no || '').replace(/\D/g, '');
  if (nn) { const o = ogr.find(x => String(x.no) === nn); if (o) return o.id; }
  const t = trNorm(ad).split(' ').filter(Boolean); if (!t.length) return '';
  let best = '', bs = 0;
  for (const o of ogr) { const u = trNorm(o.ad).split(' '); const hit = t.filter(x => u.includes(x)).length; const sc = hit / Math.max(t.length, u.length); if (sc > bs) { bs = sc; best = o.id; } }
  return bs >= 0.5 ? best : '';
}
const rbSinif = () => Store.get(S.rbSinif) || rehberSinif() || siniflar()[0] || null;

/* ---- Yapay zekâ ile form okuma (Google Gemini) ---- */
const AI_PROMPT = `Bu fotoğraf(lar) Türkiye'de bir ortaokulda öğrenci veya velisi tarafından el yazısıyla doldurulmuş bir "Öğrenci Tanıma / Kişisel Bilgi Formu"nun sayfalarıdır. Formdaki bilgileri dikkatle oku ve yalnızca verilen alanlara yaz.
Kurallar:
- Formda olmayan ya da okunamayan alanları boş bırak, tahmin etme.
- Kişi adlarını "Ad SOYAD" biçiminde yaz (soyadı büyük harf).
- Tarihleri GG.AA.YYYY biçiminde yaz.
- Telefonları 05xx xxx xx xx biçiminde yaz.
- İşaretlenmiş seçenekleri seçilen değer olarak yaz.
- cinsiyet: "Kız" veya "Erkek". anneDurum ve babaDurum: "Sağ" veya "Vefat". aileDurum: "Birlikte", "Boşanmış" veya "Ayrı yaşıyor". kendiOdasi: "Var" veya "Yok".
- adSoyad: öğrencinin adı soyadı. okulNo: öğrencinin okul numarası (yalnızca rakam).
- Bu alanlarla eşleşmeyen ama öğretmen için önemli bilgileri "not" alanına kısaca yaz.`;
async function shrinkTo(blob, max) {
  try { const bmp = await createImageBitmap(blob); const k = Math.min(1, max / Math.max(bmp.width, bmp.height)); const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height); return await new Promise(r => c.toBlob(b => r(b || blob), 'image/jpeg', .85)); } catch (e) { return blob; }
}
async function aiOku(blobs) {
  const a = ayar(); const key = (a.aiKey || '').trim(); if (!key) throw { code:'nokey' };
  const model = (a.aiModel || 'gemini-2.5-flash').trim();
  const parts = [{ text:AI_PROMPT }];
  for (const b of blobs) { const sb = await shrinkTo(b, 1800); const du = await readDataURL(sb); parts.push({ inline_data:{ mime_type:'image/jpeg', data:du.slice(du.indexOf(',') + 1) } }); }
  const props = { adSoyad:{ type:'STRING' }, okulNo:{ type:'STRING' } }; OB_ALAN.forEach(([k, l]) => { props[k] = { type:'STRING', description:l }; });
  const body = JSON.stringify({ contents:[{ role:'user', parts }], generationConfig:{ temperature:0, responseMimeType:'application/json', responseSchema:{ type:'OBJECT', properties:props } } });
  const call = m => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent`, { method:'POST', headers:{ 'Content-Type':'application/json', 'x-goog-api-key':key }, body });
  let r;
  try { r = await call(model); if (r.status === 404 && model !== 'gemini-flash-latest') r = await call('gemini-flash-latest'); }
  catch (e) { throw { code:'net' }; }
  if (!r.ok) { let msg = ''; try { msg = (await r.json()).error.message; } catch (e) {} throw { code:r.status, msg }; }
  const j = await r.json(); const t = ((((j.candidates || [])[0] || {}).content || {}).parts || []).map(p => p.text || '').join('');
  try { return JSON.parse(t); } catch (e) { throw { code:'parse' }; }
}
function aiHata(e) {
  const c = e && e.code;
  if (c === 'nokey') return 'Yapay zekâ anahtarı girilmemiş. Profil › Yapay zekâ ile form okuma bölümünden ekleyin.';
  if (c === 'net') return 'İnternet bağlantısı yok. Form okuma için internet gerekir.';
  if (c === 400 || c === 403) return 'Anahtar geçersiz ya da yetkisiz. Profil bölümünden anahtarı kontrol edin.' + (e.msg ? ' (' + e.msg.slice(0, 120) + ')' : '');
  if (c === 429) return 'Kullanım sınırına ulaşıldı. Bir dakika bekleyip tekrar deneyin.';
  if (c === 'parse') return 'Form okunamadı. Fotoğrafı daha aydınlık ve düz çekip tekrar deneyin.';
  return 'Form okunamadı.' + (e && e.msg ? ' (' + e.msg.slice(0, 120) + ')' : '');
}

/* ---- Sayfa: Rehberlik ---- */
PAGES.rehberlik = () => {
  const sn = siniflar(); const s = rbSinif();
  if (!s) return `<div class="pagehead"><div><h1>Rehberlik</h1><p>Önce bir sınıf oluşturun.</p></div></div><div class="empty"><b>Henüz sınıf yok</b><button class="btn primary" data-act="imp-open">${icon('up')}Sınıf listesi yükle</button></div>`;
  S.rbSinif = s.id; const ogr = s.ogr || [];
  const dolu = ogr.filter(o => obDolu(o.id) > 0).length; const op = Store.get('oturma_' + s.id);
  const rbEv = evraklar().filter(e => e.kategori === 'Rehberlik' && (!e.sinifId || e.sinifId === s.id));
  return `${banner()}
  <div class="pagehead"><div><h1>Rehberlik · ${esc(s.ad)}</h1><p>Öğrenci tanıma formları, öğrenci bilgi kartları, oturma planı ve rehberlik listeleri. Bilgiler tutanak ve formlara otomatik aktarılır.</p></div></div>
  ${sn.length > 1 ? `<div class="chips">${sn.map(x => `<button class="chip" data-act="rb-sinif" data-k="${x.id}" aria-pressed="${x.id === s.id}">${esc(x.ad)}${x.rehber ? ' · rehber' : ''}</button>`).join('')}</div>` : ''}
  <section class="card">
    <div class="row between"><h2 style="margin:0">Öğrenci bilgileri</h2><span class="pill ${dolu === ogr.length && ogr.length ? 'ok' : 'warn'}">${dolu}/${ogr.length} öğrencinin bilgisi var</span></div>
    <p class="note" style="margin:8px 0 12px">Doldurulmuş tanıma formlarının fotoğrafını çekin; uygulama formu okuyup bilgileri öğrencinin kartına yazar. Toplu okumada her fotoğraf bir öğrencinin formu olmalı.</p>
    <div class="row" style="margin-bottom:14px"><button class="btn primary" data-act="rb-toplu">${icon('up')}Formları toplu oku</button><button class="btn" data-act="rb-bosform">Boş tanıma formu yazdır</button><button class="btn" data-act="rb-adliform">Adlı formlar yazdır (tüm sınıf)</button></div>
    ${ogr.length ? `<div class="grid g3">${ogr.map(o => { const d = obDolu(o.id); const ob = obGet(o.id) || {}; return `<button class="tpl" data-act="open-ogrenci" data-id="${o.id}" style="padding:11px 13px"><div class="row between" style="gap:6px"><b style="font-size:14.5px;font-family:var(--f-body)">${esc(o.ad)}</b><span class="pill ${d >= 60 ? 'ok' : d > 0 ? 'warn' : ''}">%${d}</span></div><small><span class="num">${esc(o.no)}</span>${(ob.fotolar || []).length ? ' · form fotoğrafı var' : ''}${(ob.f || {}).saglik || (ob.f || {}).ozelDurum ? ' · <span style="color:var(--red)">sağlık/özel durum</span>' : ''}</small></button>`; }).join('')}</div>` : `<div class="empty"><b>Sınıf listesi boş</b><button class="btn primary" data-act="imp-open" data-id="${s.id}">${icon('up')}Liste yükle</button></div>`}
  </section>
  <div class="grid g2">
    <section class="card"><h2>Oturma planı</h2><p class="note" style="margin-bottom:12px">${op ? `${op.sira} sıra × ${op.sutun} sütun · ${Object.values(op.yer || {}).filter(Boolean).length} öğrenci yerleşti · ${fmtD(op.guncelleme)}` : 'Henüz oturma planı yok. Rastgele, numara sırasına göre ya da kız-erkek karışık yerleştirebilirsiniz.'}</p><button class="btn blue" data-act="open-oturma" data-id="${s.id}">${op ? 'Oturma planını aç' : 'Oturma planı oluştur'}</button></section>
    <section class="card"><h2>Listeler</h2><div class="list">
      ${[['veli', 'Veli iletişim listesi'], ['dogum', 'Doğum günleri listesi'], ['saglik', 'Sağlık ve özel durumlar'], ['ozet', 'Tüm bilgiler (Excel)']].map(([k, t]) => `<button class="li" data-act="rb-liste" data-k="${k}">${icon('evraklar')}<span class="t"><b>${t}</b><small>${k === 'ozet' ? 'Excel dosyası olarak indir' : 'Yazdır / PDF'}</small></span></button>`).join('')}
    </div></section>
  </div>
  <section class="card"><div class="row between"><h2 style="margin:0">Rehberlik evrakları</h2></div>
    <div class="row" style="margin:12px 0">${['rehberlik', 'gozlemformu', 'veligorusme', 'baskan'].map(k => { const t = EV_TPL.find(x => x.k === k); return t ? `<button class="btn sm" data-act="ev-new" data-k="${k}">${icon('plus')}${esc(t.ad)}</button>` : ''; }).join('')}</div>
    ${rbEv.length ? `<div class="list">${rbEv.map(e => `<button class="li" data-act="open-evrak" data-id="${e.id}">${icon('evraklar')}<span class="t"><b>${esc(e.baslik)}</b><small>${fmtD(e.guncelleme)}</small></span></button>`).join('')}</div>` : '<p class="muted">Henüz rehberlik evrakı yok.</p>'}
  </section>`;
};

/* ---- Sayfa: Öğrenci bilgi kartı ---- */
PAGES.ogrenci = () => {
  const r = findOgr(S.pid); if (!r) return `<div class="empty"><b>Öğrenci bulunamadı</b><button class="btn" data-act="nav" data-p="rehberlik">Rehberliğe dön</button></div>`;
  const { s, o } = r; const ob = obGet(o.id) || {}; const f = ob.f || {}; const fot = (ob.fotolar || []).map(id => Store.get(id)).filter(Boolean);
  const idx = s.ogr.findIndex(x => x.id === o.id); const prev = s.ogr[idx - 1], next = s.ogr[idx + 1];
  const hl = S.aiHl || {};
  const inp = ([k, l, t, opts]) => {
    const v = f[k] || ''; const cls = `inp${hl[k] ? ' aihl' : ''}`;
    if (t === 'sel') return `<div class="field"><label for="ob-${k}">${l}</label><select class="${cls}" id="ob-${k}" data-in="ob" data-k="${k}">${[...new Set([...opts, v])].map(x => `<option ${x === v ? 'selected' : ''} value="${esc(x)}">${esc(x || '—')}</option>`).join('')}</select></div>`;
    if (t === 'uzun') return `<div class="field" style="grid-column:1/-1"><label for="ob-${k}">${l}</label><textarea class="${cls}" id="ob-${k}" data-in="ob" data-k="${k}" style="min-height:64px;font-family:var(--f-body);font-size:14px">${esc(v)}</textarea></div>`;
    return `<div class="field"><label for="ob-${k}">${l}</label><input class="${cls}" id="ob-${k}" data-in="ob" data-k="${k}" value="${esc(v)}" ${t === 'tel' ? 'inputmode="tel"' : ''}></div>`;
  };
  return `<div class="row between"><button class="btn ghost sm" data-act="nav" data-p="rehberlik">${icon('back')}Rehberlik · ${esc(s.ad)}</button>
    <div class="row">${prev ? `<button class="btn sm" data-act="open-ogrenci" data-id="${prev.id}">← Önceki</button>` : ''}${next ? `<button class="btn sm" data-act="open-ogrenci" data-id="${next.id}">Sonraki →</button>` : ''}</div></div>
  <div class="pagehead"><div class="row" style="align-items:flex-end;flex:1;min-width:min(100%,300px)">
      <div class="field" style="width:96px"><label for="obn-no">No</label><input class="inp num" id="obn-no" data-in="obn" data-f="no" value="${esc(o.no)}" inputmode="numeric"></div>
      <div class="field" style="flex:1;min-width:180px"><label for="obn-ad">Adı soyadı</label><input class="inp" id="obn-ad" data-in="obn" data-f="ad" value="${esc(o.ad)}" style="font-family:var(--f-disp);font-size:19px;font-weight:600"></div></div>
    <span class="pill ${obDolu(o.id) >= 60 ? 'ok' : 'warn'}">Bilgi doluluk %${obDolu(o.id)}</span></div>
  <section class="card">
    <div class="row between"><h3 style="margin:0">Tanıma formu fotoğrafları</h3><div class="row"><label class="btn sm" for="ob-foto">${icon('up')}Fotoğraf ekle</label><input type="file" id="ob-foto" data-in="ob-foto" accept="image/*" multiple hidden>${fot.length ? `<button class="btn primary sm" data-act="ob-ai" id="ob-ai-btn">Fotoğraftan oku (yapay zekâ)</button>` : ''}</div></div>
    ${fot.length ? `<div class="row" style="margin-top:12px">${fot.map(x => `<button class="fcard" data-act="dz-open" data-id="${x.id}" style="width:120px"><div class="fthumb"><img data-fid="${esc(x.assetId)}" alt=""></div></button>`).join('')}</div>` : `<p class="note" style="margin-top:8px">Öğrencinin doldurduğu formun fotoğrafını çekin (birden çok sayfa olabilir). Ardından "Fotoğraftan oku" ile bilgiler aşağıya yazılır; kontrol edip düzeltebilirsiniz.</p>`}
    ${Object.keys(hl).length ? `<p class="note" style="margin-top:10px;color:var(--ink)"><span class="aihl" style="padding:1px 6px;border-radius:4px">Sarı</span> alanlar formdan okundu. Fotoğrafla karşılaştırıp gerekirse düzeltin.</p>` : ''}
  </section>
  ${OB_GRUP.map(([g, alanlar]) => `<section class="card"><h3>${esc(g)}</h3><div class="fgrid">${alanlar.map(inp).join('')}</div></section>`).join('')}
  <div class="row"><button class="btn primary" data-act="ob-yazdir">Tanıma formunu yazdır / PDF</button><button class="btn" data-act="ob-evrak" data-k="veligorusme">Veli görüşme formu oluştur</button><button class="btn" data-act="ob-evrak" data-k="gozlem">Gözlem formu oluştur</button>${f.veliTel ? `<a class="btn" href="tel:${esc(String(f.veliTel).replace(/[^\d+]/g, ''))}">Veliyi ara</a>` : ''}<span style="flex:1"></span><button class="btn danger" data-act="ob-sil">Bilgileri temizle</button></div>
  <p class="note">Bilgiler yalnızca bu cihazda saklanır ve yazarken kaydedilir.</p>`;
};

/* ---- Sayfa: Oturma planı ---- */
function opGet(sid) { return Store.get('oturma_' + sid) || { type:'oturma', sinifId:sid, sira:5, sutun:3, kisi:2, yer:{} }; }
function opSave(op) { Store.put('oturma_' + op.sinifId, op); }
function opSeats(op) { const k = []; for (let r = 0; r < op.sira; r++) for (let c = 0; c < op.sutun; c++) for (let i = 0; i < op.kisi; i++) k.push(`${r}-${c}-${i}`); return k; }
function opLabel(o) { if (!o) return ''; const p = String(o.ad).trim().split(/\s+/); return p.length > 1 ? p.slice(0, -1).join(' ') + ' ' + p[p.length - 1][0] + '.' : o.ad; }
PAGES.oturma = () => {
  const s = Store.get(S.pid); if (!s) return `<div class="empty"><b>Sınıf bulunamadı</b></div>`;
  const op = opGet(s.id); const ogr = s.ogr || []; const byId = Object.fromEntries(ogr.map(o => [o.id, o]));
  const placed = new Set(Object.values(op.yer || {}).filter(id => byId[id])); const kalan = ogr.filter(o => !placed.has(o.id));
  const sel = (id, label, val, max) => `<div class="field" style="width:110px"><label for="${id}">${label}</label><select class="inp" id="${id}" data-in="op-set" data-k="${id.slice(3)}">${Array.from({ length:max }, (_, i) => i + 1).map(n => `<option ${n === val ? 'selected' : ''}>${n}</option>`).join('')}</select></div>`;
  let desks = '';
  for (let r = 0; r < op.sira; r++) for (let c = 0; c < op.sutun; c++) {
    desks += `<div class="desk">${Array.from({ length:op.kisi }, (_, i) => { const key = `${r}-${c}-${i}`; const o = byId[(op.yer || {})[key]]; const g = o ? obF(o.id).cinsiyet : ''; return `<button class="seat${o ? ' on' : ''}${S.seat === key ? ' sel' : ''}${g === 'Kız' ? ' kiz' : g === 'Erkek' ? ' erkek' : ''}" data-act="op-seat" data-k="${key}">${o ? `<span class="num">${esc(o.no)}</span>${esc(opLabel(o))}` : '<span class="muted">boş</span>'}</button>`; }).join('')}</div>`;
  }
  return `<div><button class="btn ghost sm" data-act="nav" data-p="rehberlik">${icon('back')}Rehberlik · ${esc(s.ad)}</button></div>
  <div class="pagehead"><div><h1>Oturma Planı · ${esc(s.ad)}</h1><p>Bir sıraya dokunup öğrenci seçin. Yerleşmiş bir öğrenciyi seçerseniz iki öğrencinin yeri değişir.</p></div>
    <div class="row">${sel('op-sira', 'Sıra sayısı', op.sira, 10)}${sel('op-sutun', 'Sütun', op.sutun, 6)}${sel('op-kisi', 'Sırada kişi', op.kisi, 3)}</div></div>
  <div class="row"><button class="btn" data-act="op-diz" data-k="rastgele">Rastgele yerleştir</button><button class="btn" data-act="op-diz" data-k="no">Numara sırasıyla</button><button class="btn" data-act="op-diz" data-k="karisik">Kız-erkek karışık</button><button class="btn danger" data-act="op-diz" data-k="temizle">Temizle</button><span style="flex:1"></span><button class="btn primary" data-act="op-yazdir">Yazdır / PDF</button></div>
  <div class="tablewrap" style="padding:14px"><div class="board">TAHTA · ÖĞRETMEN MASASI</div>
    <div class="desks" style="grid-template-columns:repeat(${op.sutun},minmax(${op.kisi * 82}px,1fr))">${desks}</div></div>
  <p class="note">${placed.size}/${ogr.length} öğrenci yerleşti · ${op.sira * op.sutun * op.kisi} yer${kalan.length ? ` · Yerleşmeyenler: ${kalan.map(o => esc(o.ad)).join(', ')}` : ''}${ogr.some(o => obF(o.id).cinsiyet) ? '' : ' · Kız-erkek karışık yerleşim için öğrenci kartlarında cinsiyet bilgisi gerekir.'}</p>`;
};

/* ---- Yazdırılabilir formlar ve listeler ---- */
function tanimaFormuHTML(p, s, o, f) {
  f = f || {}; const val = k => esc(f[k] || '');
  const satir = ([k, l, t, opts]) => `<tr><th style="width:38%">${esc(l)}</th><td>${t === 'sel' && !f[k] ? opts.filter(Boolean).map(x => '☐ ' + esc(x)).join('&nbsp;&nbsp;&nbsp;') : val(k)}${t === 'uzun' && !f[k] ? '<br><br>' : ''}</td></tr>`;
  return `${baslik(p)}<h2 style="text-align:center">ÖĞRENCİ TANIMA FORMU</h2>
  <table><tr><th style="width:38%">Öğrencinin adı soyadı</th><td>${esc(o ? o.ad : '')}</td></tr><tr><th>Sınıfı / Okul no</th><td>${esc(s ? sinifKisa(s.ad) : '')} / ${esc(o ? o.no : '')}</td></tr></table>
  ${OB_GRUP.filter(g => g[0] !== 'Öğretmen notu').map(([g, al]) => `<h3>${esc(up(g))}</h3><table>${al.map(satir).join('')}</table>`).join('')}
  <p style="font-size:10pt">Bu formdaki bilgiler yalnızca öğrencinin eğitim-öğretim sürecini desteklemek amacıyla sınıf rehber öğretmeni tarafından kullanılır ve gizli tutulur (6698 sayılı KVKK).</p>
  ${imzaTablo(['…<br>Veli Adı Soyadı / İmza', `${esc(p.ad)}<br>${esc(s ? sinifKisa(s.ad) : '')} Sınıf Rehber Öğretmeni`])}`;
}
function rbListeHTML(k, p, s) {
  const ogr = s.ogr || []; const h = t => `${baslik(p)}<h2 style="text-align:center">${esc(sinifKisa(s.ad))} SINIFI ${t}</h2>`;
  if (k === 'veli') return h('VELİ İLETİŞİM LİSTESİ') + `<table><tr><th>No</th><th>Öğrenci</th><th>Veli</th><th>Yakınlık</th><th>Veli tel.</th><th>Anne tel.</th><th>Baba tel.</th></tr>${ogr.map(o => { const f = obF(o.id); return `<tr><td>${esc(o.no)}</td><td>${esc(o.ad)}</td><td>${esc(f.veliAd || '')}</td><td>${esc(f.veliYakinlik || '')}</td><td>${esc(f.veliTel || '')}</td><td>${esc(f.anneTel || '')}</td><td>${esc(f.babaTel || '')}</td></tr>`; }).join('')}</table><p style="font-size:10pt">Kişisel veri içerir; yalnızca okul içi kullanım içindir.</p>`;
  if (k === 'dogum') { const rows = ogr.map(o => ({ o, d:obF(o.id).dogumTarihi || '' })).map(x => { const m = x.d.match(/(\d{1,2})[./-](\d{1,2})[./-]?(\d{2,4})?/); return { ...x, ay:m ? +m[2] : 99, gun:m ? +m[1] : 99 }; }).sort((a, b) => a.ay - b.ay || a.gun - b.gun);
    return h('DOĞUM GÜNLERİ LİSTESİ') + `<table><tr><th>Ay</th><th>Doğum tarihi</th><th>No</th><th>Öğrenci</th></tr>${rows.map(x => `<tr><td>${x.ay < 13 ? ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'][x.ay - 1] : '—'}</td><td>${esc(x.d)}</td><td>${esc(x.o.no)}</td><td>${esc(x.o.ad)}</td></tr>`).join('')}</table>`; }
  if (k === 'saglik') { const rows = ogr.filter(o => { const f = obF(o.id); return f.saglik || f.ozelDurum || f.gozlukIsitme; });
    return h('SAĞLIK VE ÖZEL DURUM LİSTESİ') + (rows.length ? `<table><tr><th>No</th><th>Öğrenci</th><th>Sağlık durumu</th><th>Özel durum</th><th>Gözlük / işitme</th><th>Veli tel.</th></tr>${rows.map(o => { const f = obF(o.id); return `<tr><td>${esc(o.no)}</td><td>${esc(o.ad)}</td><td>${esc(f.saglik || '')}</td><td>${esc(f.ozelDurum || '')}</td><td>${esc(f.gozlukIsitme || '')}</td><td>${esc(f.veliTel || '')}</td></tr>`; }).join('')}</table>` : '<p>Kayıtlı sağlık veya özel durum bilgisi yok.</p>') + '<p style="font-size:10pt">Gizlidir. Yalnızca sınıfa giren öğretmenlerin bilgilendirilmesi amacıyla kullanılır.</p>'; }
  return '';
}
function oturmaHTML(p, s, op) {
  const byId = Object.fromEntries((s.ogr || []).map(o => [o.id, o])); let rows = '';
  for (let r = 0; r < op.sira; r++) { rows += '<tr>'; for (let c = 0; c < op.sutun; c++) { rows += `<td style="padding:6px"><table style="margin:0"><tr>${Array.from({ length:op.kisi }, (_, i) => { const o = byId[(op.yer || {})[`${r}-${c}-${i}`]]; return `<td style="text-align:center;height:46px;width:${100 / op.kisi}%;font-size:10.5pt">${o ? `<b>${esc(o.no)}</b><br>${esc(o.ad)}` : ''}</td>`; }).join('')}</tr></table></td>`; } rows += '</tr>'; }
  return `${baslik(p)}<h2 style="text-align:center">${esc(sinifKisa(s.ad))} SINIFI OTURMA PLANI</h2><p style="text-align:center;border:1px solid #000;padding:6px;font-weight:bold">TAHTA · ÖĞRETMEN MASASI</p><table style="border:none">${rows.replace(/<td style="padding:6px">/g, '<td style="padding:6px;border:none">')}</table>${imzaTablo([`${esc(p.ad)}<br>${esc(sinifKisa(s.ad))} Sınıf Rehber Öğretmeni`])}`;
}
function rbMufettisItems() {
  const s = rehberSinif(); if (!s) return '';
  const n = (s.ogr || []).filter(o => obDolu(o.id) > 0).length;
  return `<button data-act="open-oturma" data-id="${s.id}"><span>${esc(s.ad)} oturma planı</span><small>${Store.get('oturma_' + s.id) ? 'hazır' : 'yok'}</small></button><button data-act="nav" data-p="rehberlik"><span>Öğrenci bilgi kartları ve tanıma formları</span><small>${n}/${(s.ogr || []).length}</small></button>`;
}

/* ---- Olaylar ---- */
async function opDiz(kind) {
  const s = Store.get(S.pid); const op = opGet(s.id); const seats = opSeats(op); let list = [...(s.ogr || [])];
  if (kind === 'temizle') { op.yer = {}; opSave(op); render(); return; }
  if (kind === 'no') list.sort((a, b) => (parseInt(a.no) || 1e9) - (parseInt(b.no) || 1e9));
  else { for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; } }
  if (kind === 'karisik') { const kz = list.filter(o => obF(o.id).cinsiyet === 'Kız'), er = list.filter(o => obF(o.id).cinsiyet === 'Erkek'), dg = list.filter(o => !['Kız', 'Erkek'].includes(obF(o.id).cinsiyet)); list = []; while (kz.length || er.length) { if (kz.length) list.push(kz.shift()); if (er.length) list.push(er.shift()); } list.push(...dg); }
  op.yer = {}; seats.forEach((k, i) => { if (list[i]) op.yer[k] = list[i].id; });
  if (list.length > seats.length) toast(`${list.length - seats.length} öğrenciye yer kalmadı. Sıra sayısını artırın.`, 4500);
  opSave(op); render();
}
Object.assign(ACT, {
  'rb-git': b => { S.rbSinif = b.dataset.id; go('rehberlik'); },
  'rb-sinif': b => { S.rbSinif = b.dataset.k; render(); },
  'open-ogrenci': b => { closeModal(); S.aiHl = null; go('ogrenci', b.dataset.id); },
  'open-oturma': b => { closeModal(); S.seat = null; go('oturma', b.dataset.id); },
  'rb-bosform': () => printHTML('Öğrenci Tanıma Formu', tanimaFormuHTML(prof(), rbSinif(), null, null)),
  'rb-adliform': () => { const s = rbSinif(); const p = prof(); printHTML(`${s.ad} Öğrenci Tanıma Formları`, (s.ogr || []).map((o, i) => `<div class="${i ? 'pb' : ''}">${tanimaFormuHTML(p, s, o, obF(o.id))}</div>`).join('')); },
  'rb-liste': async b => { const s = rbSinif(); const p = prof(); const k = b.dataset.k;
    if (k === 'ozet') { if (typeof XLSX === 'undefined') { toast('Excel modülü yüklenemedi.'); return; }
      const aoa = [['No', 'Adı Soyadı', ...OB_ALAN.map(a => a[1])], ...(s.ogr || []).map(o => { const f = obF(o.id); return [o.no, o.ad, ...OB_ALAN.map(a => f[a[0]] || '')]; })];
      const ws = XLSX.utils.aoa_to_sheet(aoa); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Öğrenci bilgileri');
      await saveFile(safeName(s.ad + ' öğrenci bilgileri') + '.xlsx', new Blob([XLSX.write(wb, { type:'array', bookType:'xlsx' })], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })); return; }
    printHTML(s.ad + ' ' + b.textContent.trim(), rbListeHTML(k, p, s)); },
  'ob-yazdir': () => { const r = findOgr(S.pid); printHTML(r.o.ad + ' Tanıma Formu', tanimaFormuHTML(prof(), r.s, r.o, obF(r.o.id))); },
  'ob-sil': () => { const r = findOgr(S.pid); ask(`<b>${esc(r.o.ad)}</b> için girilen tüm bilgiler silinecek. Form fotoğrafları Dosyalar'da kalır.`, 'Bilgileri sil', () => { Store.remove(obId(r.o.id)); S.aiHl = null; render(); }); },
  'ob-ai': async b => { const r = findOgr(S.pid); const ob = obGet(r.o.id) || {}; const fot = (ob.fotolar || []).map(id => Store.get(id)).filter(Boolean);
    if (!fot.length) { toast('Önce form fotoğrafı ekleyin.'); return; }
    if (!(ayar().aiKey || '').trim()) { aiAyarModal(); return; }
    b.disabled = true; b.textContent = 'Okunuyor…';
    try { const blobs = []; for (const x of fot.slice(-4)) { const bl = await Files.get(x.assetId); if (bl) blobs.push(bl); }
      const d = await aiOku(blobs); const f = {}; const hl = {};
      for (const [k] of OB_ALAN) { const v = String(d[k] || '').trim(); if (v) { f[k] = v; hl[k] = 1; } }
      obSave(r.o.id, r.s.id, f); S.aiHl = hl; render();
      const n = Object.keys(f).length; toast(n ? `${n} bilgi formdan okundu. Sarı alanları kontrol edin.` : 'Formda okunabilir bilgi bulunamadı.', 4500);
      if (d.adSoyad && trNorm(d.adSoyad) && !trNorm(r.o.ad).split(' ').some(t => trNorm(d.adSoyad).split(' ').includes(t))) toast(`Dikkat: formdaki ad "${d.adSoyad}". Doğru öğrencinin kartında olduğunuzdan emin olun.`, 7000);
    } catch (e) { toast(aiHata(e), 6000); b.disabled = false; b.textContent = 'Fotoğraftan oku (yapay zekâ)'; } },
  'ob-evrak': b => { const r = findOgr(S.pid); const f = obF(r.o.id); const p = prof(); const sa = sinifKisa(r.s.ad); let html, baslikT, kat;
    if (b.dataset.k === 'veligorusme') { kat = 'Veli'; baslikT = 'Veli Görüşme Formu · ' + r.o.ad;
      html = `${baslik(p)}<h2 style="text-align:center">VELİ GÖRÜŞME FORMU</h2><table><tr><th>Öğrencinin adı soyadı</th><td>${esc(r.o.ad)}</td><th>Sınıfı / No</th><td>${esc(sa)} / ${esc(r.o.no)}</td></tr><tr><th>Görüşülen veli</th><td>${esc(f.veliAd || '')}</td><th>Yakınlığı</th><td>${esc(f.veliYakinlik || '')}</td></tr><tr><th>Veli telefonu</th><td>${esc(f.veliTel || '')}</td><th>Görüşme şekli</th><td>Yüz yüze / Telefon / Çevrim içi</td></tr><tr><th>Tarih / saat</th><td colspan="3">${todayStr()} · …:…</td></tr></table><h3>Görüşme nedeni</h3><p>…</p><h3>Görüşülen konular</h3><p>…</p><h3>Varılan sonuç ve öneriler</h3><p>…</p><h3>İzleme tarihi</h3><p>…/…/20…</p>${imzaTablo([`${esc(f.veliAd || '…')}<br>Veli`, `${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`])}`; }
    else { kat = 'Rehberlik'; baslikT = 'Öğrenci Gözlem Formu · ' + r.o.ad;
      html = `${baslik(p)}<h2 style="text-align:center">ÖĞRENCİ GÖZLEM FORMU</h2><table><tr><th>Öğrencinin adı soyadı</th><td>${esc(r.o.ad)}</td><th>Sınıfı / No</th><td>${esc(sa)} / ${esc(r.o.no)}</td></tr><tr><th>Gözlem tarihi</th><td>${todayStr()}</td><th>Gözlem ortamı</th><td>Ders / Teneffüs / Etkinlik</td></tr>${f.saglik || f.ozelDurum ? `<tr><th>Bilinen sağlık / özel durum</th><td colspan="3">${esc([f.saglik, f.ozelDurum].filter(Boolean).join(' · '))}</td></tr>` : ''}</table><h3>Gözlenen davranış</h3><p>…</p><h3>Davranışın sıklığı ve süresi</h3><p>…</p><h3>Öğretmenin değerlendirmesi</h3><p>…</p><h3>Yapılan / önerilen çalışma</h3><p>…</p>${imzaTablo([`${esc(p.ad)}<br>${esc(sa)} Sınıf Rehber Öğretmeni`])}`; }
    const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:baslikT, kategori:kat, sinifId:r.s.id, html, olusturma:Date.now() }, true); go('evrak', id); },
  'op-seat': b => { const s = Store.get(S.pid); const op = opGet(s.id); const key = b.dataset.k; const cur = (op.yer || {})[key]; S.seat = key;
    const placedAt = Object.fromEntries(Object.entries(op.yer || {}).map(([k, v]) => [v, k]));
    const list = [...(s.ogr || [])].sort((a, c) => (placedAt[a.id] ? 1 : 0) - (placedAt[c.id] ? 1 : 0));
    openModal('Bu sıraya kim oturacak?', `<div class="list">${list.map(o => `<button class="li" data-act="op-pick" data-o="${o.id}"><span class="num muted" style="width:44px">${esc(o.no)}</span><span class="t"><b>${esc(o.ad)}</b><small>${placedAt[o.id] ? (o.id === cur ? 'şu an burada' : 'yerleşmiş · seçerseniz yer değiştirir') : 'yerleşmedi'}</small></span></button>`).join('')}</div>`,
      `${cur ? '<button class="btn danger" data-act="op-pick" data-o="">Sırayı boşalt</button><span style="flex:1"></span>' : ''}<button class="btn" data-act="modal-close">Vazgeç</button>`); },
  'op-pick': b => { const s = Store.get(S.pid); const op = opGet(s.id); op.yer = op.yer || {}; const key = S.seat; const oid = b.dataset.o;
    if (!oid) delete op.yer[key];
    else { const from = Object.keys(op.yer).find(k => op.yer[k] === oid); const prev = op.yer[key]; op.yer[key] = oid; if (from && from !== key) { if (prev) op.yer[from] = prev; else delete op.yer[from]; } }
    S.seat = null; opSave(op); closeModal(); render(); },
  'op-diz': b => { const k = b.dataset.k; const op = opGet(S.pid); if (Object.keys(op.yer || {}).length && k !== 'temizle') ask('Mevcut yerleşim değiştirilecek.', 'Yeniden yerleştir', () => opDiz(k)); else if (k === 'temizle') ask('Tüm yerleşim silinecek.', 'Temizle', () => opDiz(k)); else opDiz(k); },
  'op-yazdir': () => { const s = Store.get(S.pid); printHTML(s.ad + ' Oturma Planı', oturmaHTML(prof(), s, opGet(s.id))); },
  'rb-toplu': () => {
    const s = rbSinif(); if (!s || !(s.ogr || []).length) { toast('Önce sınıf listesini yükleyin.'); return; }
    if (!(ayar().aiKey || '').trim()) { aiAyarModal(); return; }
    S.bulk = { sinifId:s.id, items:[] };
    openModal('Tanıma formlarını toplu oku', `<p class="note">Her öğrencinin formunun bir fotoğrafını seçin (galeriden çoklu seçebilirsiniz). Uygulama her formu okuyup ad ve numaraya göre öğrenciyle eşleştirir. Kaydetmeden önce eşleşmeleri kontrol edin.</p>
      <div class="field"><label for="bk-file">Form fotoğrafları</label><input class="inp" type="file" id="bk-file" data-in="bk-file" accept="image/*" multiple></div><div id="bk-rows"></div>`,
      `<button class="btn" data-act="modal-close">Kapat</button><button class="btn primary" data-act="bk-go" id="bk-go">Oku</button>`, true); },
  'bk-go': async b => {
    const B = S.bulk; if (!B || !B.items.length) { toast('Önce fotoğraf seçin.'); return; }
    const s = Store.get(B.sinifId);
    if (B.ready) { // kaydet
      let n = 0;
      for (let i = 0; i < B.items.length; i++) { const it = B.items[i]; const oid = $('#bk-m-' + i) ? $('#bk-m-' + i).value : it.match; if (!oid || it.st !== 'ok') continue;
        const o = (s.ogr || []).find(x => x.id === oid); const fid = rid('f'); await IDB.put('files', fid, it.blob);
        const did = rid('dosya'); Store.put(did, { type:'dosya', ad:`Tanıma formu - ${o.ad}.jpg`, klasor:rehberKlasor(), assetId:fid, ct:'image/jpeg', ext:'jpg', b64:false, orjTip:'image/jpeg', boyut:it.blob.size, tarih:Date.now() }, true);
        const ob = obGet(oid) || {}; obSave(oid, s.id, it.data, [...(ob.fotolar || []), did]); it.st = 'kayit'; n++; }
      closeModal(); toast(`${n} öğrencinin bilgileri kaydedildi.`, 4000); render(); return; }
    b.disabled = true;
    for (let i = 0; i < B.items.length; i++) { const it = B.items[i]; if (it.st === 'ok') continue; const st = $('#bk-s-' + i); st.textContent = 'okunuyor…';
      let tries = 0;
      while (true) { try { const d = await aiOku([it.blob]); const f = {}; for (const [k] of OB_ALAN) { const v = String(d[k] || '').trim(); if (v) f[k] = v; }
          it.data = f; it.ad = d.adSoyad || ''; it.no = d.okulNo || ''; it.match = matchOgr(s, it.ad, it.no); it.st = 'ok';
          st.innerHTML = `${esc(it.ad || 'ad okunamadı')}${it.no ? ' · ' + esc(it.no) : ''} · ${Object.keys(f).length} bilgi`; st.style.color = 'var(--ok)';
          const sel = $('#bk-m-' + i); sel.value = it.match; sel.disabled = false; break; }
        catch (e) { if (e && e.code === 429 && tries++ < 2) { st.textContent = 'sınır doldu, bekleniyor…'; await new Promise(r => setTimeout(r, 30000)); continue; } it.st = 'err'; st.textContent = aiHata(e); st.style.color = 'var(--red)'; if (e && (e.code === 'nokey' || e.code === 400 || e.code === 403 || e.code === 'net')) { b.disabled = false; return; } break; } }
      await new Promise(r => setTimeout(r, 1200)); }
    b.disabled = false; if (B.items.some(x => x.st === 'ok')) { B.ready = true; b.textContent = 'Eşleşenleri kaydet'; toast('Okuma bitti. Eşleşmeleri kontrol edip kaydedin.', 4500); } else b.textContent = 'Tekrar dene';
  },
  'ai-ayar': () => aiAyarModal(),
  'ai-save': () => { const a = ayar(); Store.put('ayar', { ...a, type:'ayar', aiKey:$('#ai-key').value.trim(), aiModel:$('#ai-model').value.trim() || 'gemini-2.5-flash' }, true); closeModal(); toast('Yapay zekâ ayarı kaydedildi.'); },
  'ai-test': async b => { const a = ayar(); const key = $('#ai-key').value.trim(); const model = $('#ai-model').value.trim() || 'gemini-2.5-flash'; if (!key) { toast('Anahtarı yapıştırın.'); return; }
    b.disabled = true; const st = $('#ai-st'); st.textContent = 'Deneniyor…';
    try { const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, { method:'POST', headers:{ 'Content-Type':'application/json', 'x-goog-api-key':key }, body:JSON.stringify({ contents:[{ parts:[{ text:'Sadece "tamam" yaz.' }] }] }) });
      if (r.ok) { st.textContent = 'Anahtar çalışıyor ✓'; st.style.color = 'var(--ok)'; } else { let m = ''; try { m = (await r.json()).error.message; } catch (e) {} st.textContent = 'Çalışmadı: ' + (m || r.status); st.style.color = 'var(--red)'; } }
    catch (e) { st.textContent = 'İnternet bağlantısı yok.'; st.style.color = 'var(--red)'; }
    b.disabled = false; }
});
function aiAyarModal() {
  const a = ayar();
  openModal('Yapay zekâ ile form okuma', `
    <p>Fotoğraftaki el yazısını okumak için Google'ın Gemini yapay zekâsı kullanılır. Bunun için bir kez anahtar almanız gerekir.</p>
    <div class="banner"><b>Öğrenci gizliliği:</b> Google'ın ücretsiz katmanında gönderilen fotoğraflar Google tarafından incelenebilir ve kişisel veri gönderilmesine izin verilmez. Öğrenci formları için Google AI Studio'da <b>faturalandırması açık</b> bir proje kullanın; ücretli katmanda veriler ürün geliştirmede kullanılmaz. Maliyeti form başına yaklaşık birkaç kuruştur.</div>
    <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px">
      <li><a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> adresini açın, Google hesabınızla girin.</li>
      <li>"Create API key" (API anahtarı oluştur) düğmesine basın, anahtarı kopyalayın.</li>
      <li>Aynı sayfada projenin faturalandırmasını açın ("Set up billing").</li>
      <li>Anahtarı aşağıya yapıştırıp "Dene"ye basın.</li></ol>
    <div class="field"><label for="ai-key">API anahtarı</label><input class="inp mono" id="ai-key" value="${esc(a.aiKey || '')}" placeholder="AIza…" autocomplete="off"></div>
    <div class="field"><label for="ai-model">Model</label><input class="inp mono" id="ai-model" value="${esc(a.aiModel || 'gemini-2.5-flash')}"></div>
    <p class="note" id="ai-st">Anahtar yalnızca bu cihazda saklanır, yedek dosyasına da girer.</p>`,
    `<button class="btn" data-act="ai-test">Dene</button><span style="flex:1"></span><button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="ai-save">Kaydet</button>`, true);
}
document.addEventListener('input', e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'ob') { const r = findOgr(S.pid); if (!r) return; obSave(r.o.id, r.s.id, { [el.dataset.k]:el.value }); el.classList.remove('aihl'); if (S.aiHl) delete S.aiHl[el.dataset.k]; }
  else if (k === 'obn') { const r = findOgr(S.pid); if (!r) return; const s = Store.get(r.s.id); Store.put(s.id, { ...s, ogr:(s.ogr || []).map(o => o.id === r.o.id ? { ...o, [el.dataset.f]:el.value } : o) }); }
});
document.addEventListener('change', async e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'op-set') { const op = opGet(S.pid); op[el.dataset.k] = +el.value; const valid = new Set(opSeats(op)); for (const key of Object.keys(op.yer || {})) if (!valid.has(key)) delete op.yer[key]; opSave(op); render(); }
  else if (k === 'ob-foto') { const r = findOgr(S.pid); const files = [...el.files]; if (!files.length) return; toast('Fotoğraflar ekleniyor…');
    const ob = obGet(r.o.id) || {}; const ids = [...(ob.fotolar || [])];
    for (const [i, f] of files.entries()) { const bl = await shrinkTo(f, 2200); const up2 = await Files.upload(bl); const did = rid('dosya'); Store.put(did, { type:'dosya', ad:`Tanıma formu - ${r.o.ad}${files.length > 1 || ids.length ? ' (' + (ids.length + 1) + ')' : ''}.jpg`, klasor:rehberKlasor(), assetId:up2.id, ct:'image/jpeg', ext:'jpg', b64:false, orjTip:'image/jpeg', boyut:bl.size, tarih:Date.now() }, true); ids.push(did); }
    obSave(r.o.id, r.s.id, {}, ids); render();
    if ((ayar().aiKey || '').trim()) { const btn = $('#ob-ai-btn'); if (btn) ACT['ob-ai'](btn); } else toast('Fotoğraf eklendi. Bilgileri otomatik okumak için yapay zekâ anahtarı ekleyin (Profil).', 5000); }
  else if (k === 'bk-file') { const B = S.bulk; const s = Store.get(B.sinifId); B.items = [];
    for (const f of el.files) B.items.push({ blob:await shrinkTo(f, 2200), name:f.name, st:'' });
    $('#bk-rows').innerHTML = B.items.map((it, i) => `<div class="uprow" style="grid-template-columns:56px minmax(0,1fr) 190px"><img id="bk-i-${i}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:6px"><span class="st" id="bk-s-${i}">${esc(it.name)} · okunmayı bekliyor</span><select class="inp" id="bk-m-${i}" disabled aria-label="Öğrenci"><option value="">Eşleşme yok (atla)</option>${(s.ogr || []).map(o => `<option value="${o.id}">${esc(o.no)} ${esc(o.ad)}</option>`).join('')}</select></div>`).join('');
    B.items.forEach((it, i) => { $('#bk-i-' + i).src = URL.createObjectURL(it.blob); }); const g = $('#bk-go'); g.textContent = 'Oku'; }
});

/* ===================== Başlangıç ===================== */
async function boot() {
  try { await IDB.open(); Store.items = new Map(await IDB.all('items')); }
  catch (e) { S.idbFail = true; }
  // Eski sürümün bu cihazdaki kayıtlarını taşı
  if (!S.idbFail && !Store.items.size) { try { const raw = localStorage.getItem('od_local'); if (raw) for (const [id, d] of JSON.parse(raw)) Store.put(id, d, true); } catch (e) {} }
  Store.mode = 'ready'; Store.assets = Files; seedIfEmpty(); S.ready = true;
  shell(); render(); setSync(Store.dirty.size ? 'busy' : 'ok');
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
}
async function usage() { try { if (!navigator.storage || !navigator.storage.estimate) return; const u = await navigator.storage.estimate(); const el = $('#dz-usage'); if (el) el.textContent = `Bu cihazda kullanılan alan: ${fmtSize(u.usage || 0)} · kullanılabilir: yaklaşık ${fmtSize(u.quota || 0)}`; } catch (e) {} }
const _render = render; render = function () { _render(); hydrate($('#view')); if (S.page === 'dosyalar') usage(); };
const _openModal = openModal; openModal = function (...a) { _openModal(...a); hydrate($('#modal')); };
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); S.installEvt = e; if (S.page === 'pano' && S.ready) render(); });
window.addEventListener('appinstalled', () => { S.installEvt = null; toast('Uygulama ana ekranınıza eklendi.'); if (S.page === 'pano') render(); });
window.addEventListener('pagehide', () => { if (S.page === 'evrak') evFlush(); Store.flushAll(); });
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./sw.js').catch(() => {});
boot();
