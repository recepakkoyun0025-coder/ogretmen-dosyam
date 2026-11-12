
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
  const top = { sinif:'siniflar', cizelge:'cizelgeler', evrak:'evraklar', ogrenci:'rehberlik', oturma:'rehberlik', modul:'moduller', sinavlar:'moduller', sinav:'moduller', dzp:'moduller' }[S.page] || S.page;
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
  <div class="row"><button class="btn" data-act="pk-cizelge">Şablon olarak gönder</button><button class="btn" data-act="cz-xlsx">${icon('down')}Excel olarak indir</button><button class="btn" data-act="cz-print">Yazdır / PDF</button><button class="btn" data-act="cz-html">${icon('down')}HTML indir</button><span style="flex:1"></span><button class="btn danger" data-act="cz-del">${icon('trash')}Çizelgeyi sil</button></div>`;
};

/* ---- Evraklar ---- */
PAGES.evraklar = () => {
  const all = evraklar(); const q = low(S.evQ);
  const list = all.filter(e => (S.evFilter === 'hepsi' || e.kategori === S.evFilter) && (!q || low(e.baslik).includes(q)));
  return `${banner()}
  <div class="pagehead"><div><h1>Evraklar</h1><p>Okul bilgileriniz ve öğrenci adları hazır doldurulmuş tutanak, plan ve formlar. Düzenleyin, kaydedin, Word'de açılabilen veya yazdırılabilen dosya olarak indirin. Zümre arkadaşlarınızla belge alıp verebilirsiniz.</p></div><div class="row"><button class="btn" data-act="pk-ac-btn">${icon('up')}Gelen dosyayı aç</button><button class="btn" data-act="pk-toplu">Belgeleri paylaş</button></div></div>
  <div><h2 style="margin-bottom:12px">Yeni belge oluştur</h2>
  <div class="grid" style="gap:8px">${KATEGORI.filter(k => EV_TPL.some(t => t.kat === k)).map(k => `<details class="card" style="padding:12px 16px"><summary style="cursor:pointer;font-weight:600">${esc(k)} <span class="pill">${EV_TPL.filter(t => t.kat === k).length}</span></summary><div class="grid g3" style="margin-top:12px">${EV_TPL.filter(t => t.kat === k).map(t => `<button class="tpl" data-act="ev-new" data-k="${t.k}"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></button>`).join('')}</div></details>`).join('')}</div></div>
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
  <div class="row"><button class="btn primary" data-act="ev-print">Yazdır / PDF</button><button class="btn" data-act="ev-dl">${icon('down')}İndir (Word'de açılır)</button><button class="btn" data-act="pk-evrak">Meslektaşa gönder</button><button class="btn" data-act="ev-copy">Kopyasını oluştur</button><span style="flex:1"></span><button class="btn danger" data-act="ev-del">${icon('trash')}Belgeyi sil</button></div>
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
    `<button class="btn danger" data-act="dz-del" data-id="${f.id}">${icon('trash')}Sil</button><span style="flex:1"></span><button class="btn" data-act="dz-paylas" data-id="${f.id}">Paylaş</button><button class="btn" data-act="dz-dl" data-id="${f.id}">${icon('down')}İndir</button><button class="btn primary" data-act="dz-save" data-id="${f.id}">Kaydet</button>`, true);
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
  filename = String(filename).replace(/[çğıöşüÇĞİÖŞÜâîûÂÎÛ]/g, c => ({ ç:'c', ğ:'g', ı:'i', ö:'o', ş:'s', ü:'u', Ç:'C', Ğ:'G', İ:'I', Ö:'O', Ş:'S', Ü:'U', â:'a', î:'i', û:'u', Â:'A', Î:'I', Û:'U' }[c])).replace(/[^\w.\- ()]+/g, '-').replace(/-+/g, '-');
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
    const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:t.ad + ' · ' + todayStr(), kategori:t.kat, sablon:t.k, sinifId:/Şube|Veli Toplant|Rehberlik Planı|Başkanı/.test(t.ad) && rs ? rs.id : '', html:t.f(p), olusturma:Date.now() }, true); closeModal(); go('evrak', id); },
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
      parts.push(`<div class="pb">${dpHTML(p)}</div>`);
      const order = KATEGORI;
      for (const k of order) for (const e of evraklar().filter(x => x.kategori === k)) parts.push(`<div class="pb">${e.html}</div>`);
      for (const c of cizelgeler()) parts.push(`<div class="pb">${czTableHTML(c)}</div>`);
      for (const x of Store.list('sinav')) parts.push(`<div class="pb">${svRaporHTML(x)}</div>`);
      for (const s of siniflar()) { const op = Store.get('oturma_' + s.id); if (op) parts.push(`<div class="pb">${oturmaHTML(p, s, op)}</div>`); }
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

/* ===================== Modüller, ek şablonlar, ders araçları ===================== */
KATEGORI.length = 0;
KATEGORI.push('Plan','Zümre','Öğretmenler Kurulu','Şube Öğretmenler Kurulu','Ölçme-Değerlendirme','Rehberlik','Özel Eğitim','Sosyal Etkinlik','Proje','Nöbet','DYK','Veli','Mesleki Gelişim','Tutanak','Dilekçe','Diğer');
KLASOR0.splice(KLASOR0.indexOf('Genel'), 0, 'Özel Eğitim (BEP)', 'Sosyal Etkinlik ve Kulüp', 'Nöbet', 'DYK', 'Mesleki Gelişim', 'Projeler');
Object.assign(IC, {
  sinifta:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M7 9h5M7 12h8"/>',
  moduller:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/>'
});
NAV.splice(0, NAV.length, ['pano','Ana Sayfa'],['siniflar','Sınıflar'],['sinifta','Sınıfta'],['moduller','Modüller'],['cizelgeler','Çizelgeler'],['evraklar','Evraklar'],['dosyalar','Dosyalar'],['rehberlik','Rehberlik'],['mevzuat','Mevzuat'],['mufettis','Müfettiş Dosyası']);

/* ---- Ek mevzuat ---- */
MEVZUAT.push(
  { g:'Yönetmelik', ad:'MEB Özel Eğitim Hizmetleri Yönetmeliği', tarih:'RG 07.07.2018', url:YON_URL, oz:[
    'Kaynaştırma/bütünleştirme yoluyla eğitim alan öğrenciler için Bireyselleştirilmiş Eğitim Programı (BEP) hazırlanır.',
    'BEP geliştirme biriminde okul yöneticisi, rehber öğretmen, sınıf rehber öğretmeni, ders öğretmenleri, veli ve uygun olduğunda öğrenci yer alır.',
    'Ders öğretmeni, öğrencinin performansına göre kısa ve uzun dönemli amaçları belirler; ölçme-değerlendirmede gerekli uyarlamaları yapar.']},
  { g:'Yönetmelik', ad:'Destekleme ve Yetiştirme Kursları (DYK) Yönergesi', tarih:'MEB yönergesi', url:YON_URL, oz:[
    'Öğrencilerin akademik başarısını desteklemek için açılan kursların planlanması, yoklaması ve raporlanması.',
    'Kurs planı, devam çizelgesi ve kurs sonu değerlendirmesi kurs öğretmeni tarafından tutulur.']},
  { g:'Yönetmelik', ad:'Nöbet görevleri (Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği)', tarih:'ilgili hükümler', url:YON_URL, oz:[
    'Öğretmenler, okul müdürlüğünce hazırlanan nöbet çizelgesine göre nöbet tutar.',
    'Nöbetçi öğretmen öğrencilerin güvenliğini gözetir, olağan dışı durumları idareye bildirir ve gerekirse tutanak düzenler.']}
);

/* ---- Ek şablonlar ---- */
const yilT = p => esc(p.yil) + ' EĞİTİM-ÖĞRETİM YILI';
const H2 = (p, t) => `${baslik(p)}<h2 style="text-align:center">${t}</h2>`;
const imzaBen = (p, ek) => imzaTablo([`${esc(p.ad)}<br>${esc(ek || p.brans + ' Öğretmeni')}`]);
const bosSatir = (n, cols) => Array.from({ length:n }, (_, i) => `<tr><td>${i + 1}</td>${'<td></td>'.repeat(cols)}</tr>`).join('');
const ogrSatir = (s, cols) => ((s && s.ogr) || []).map((o, i) => `<tr><td>${i + 1}</td><td>${esc(o.no)}</td><td>${esc(o.ad)}</td>${'<td></td>'.repeat(cols)}</tr>`).join('');
const AYLAR_UZUN = ['Eylül','Ekim','Kasım','Aralık','Ocak','Şubat','Mart','Nisan','Mayıs','Haziran'];
EV_TPL.splice(EV_TPL.findIndex(t => t.k === 'bos'), 0,
  { k:'ogretmenler_kurulu', kat:'Öğretmenler Kurulu', ad:'Öğretmenler Kurulu Notları', not:'Kurulda alınan ve sizi ilgilendiren kararlar, görevleriniz.', f:p => `${H2(p, yilT(p) + '<br>ÖĞRETMENLER KURULU TOPLANTISI NOTLARI')}<table><tr><th>Toplantı</th><td>Dönem başı / Dönem sonu / Ara toplantı</td><th>Tarih</th><td>…/…/20…</td></tr></table><h3>Gündem</h3><ol><li>…</li></ol><h3>Branşımı ve sınıfımı ilgilendiren kararlar</h3><ol><li>…</li></ol><h3>Bana verilen görevler</h3><table><tr><th>Görev</th><th>Tarih / süre</th><th>Açıklama</th></tr><tr><td>Nöbet</td><td></td><td></td></tr><tr><td>Kulüp danışmanlığı</td><td></td><td></td></tr><tr><td>Belirli gün ve hafta</td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>${imzaBen(p)}` },
  { k:'yazili', kat:'Ölçme-Değerlendirme', ad:'Yazılı Sınav Kâğıdı ve Cevap Anahtarı', not:'Okul başlıklı soru kâğıdı, puan tablosu, cevap anahtarı.', f:p => `<p style="text-align:center"><b>${yilT(p)} ${esc(up(p.okul))}<br>${esc(up(p.brans))} DERSİ …. SINIF …. DÖNEM …. YAZILI SINAVI</b></p><table><tr><th>Adı Soyadı</th><td></td><th>Sınıf / No</th><td></td><th>Puan</th><td style="width:70px"></td></tr></table><table><tr><th>Soru</th>${Array.from({ length:10 }, (_, i) => `<td style="text-align:center">${i + 1}</td>`).join('')}<th>Toplam</th></tr><tr><th>Puan</th>${'<td></td>'.repeat(11)}</tr></table>${Array.from({ length:10 }, (_, i) => `<p><b>${i + 1}.</b> … <i>(10 puan)</i></p><p><br></p>`).join('')}<p style="text-align:right">Süre … dakikadır. Başarılar dilerim.<br>${esc(p.ad)}<br>${esc(p.brans)} Öğretmeni</p><h2 style="text-align:center;page-break-before:always">CEVAP ANAHTARI</h2><table><tr><th>Soru</th><th>Cevap</th><th>Öğrenme çıktısı</th><th>Puan</th></tr>${Array.from({ length:10 }, (_, i) => `<tr><td>${i + 1}</td><td></td><td></td><td>10</td></tr>`).join('')}</table>` },
  { k:'performans', kat:'Ölçme-Değerlendirme', ad:'Performans Görevi ve Dereceli Puanlama Anahtarı', not:'Görev yönergesi ve 1–4 düzeyli puanlama anahtarı.', f:p => `${H2(p, esc(up(p.brans)) + ' DERSİ PERFORMANS GÖREVİ')}<table><tr><th>Görevin adı</th><td colspan="3">…</td></tr><tr><th>Sınıf</th><td>…</td><th>Veriliş / teslim</th><td>…/…/20… – …/…/20…</td></tr><tr><th>İlgili öğrenme çıktıları</th><td colspan="3">…</td></tr></table><h3>Görev yönergesi</h3><ol><li>…</li><li>…</li><li>…</li></ol><h3>Dereceli puanlama anahtarı</h3><table><tr><th>Ölçüt</th><th>1 · Başlangıç</th><th>2 · Gelişmekte</th><th>3 · Yeterli</th><th>4 · İleri</th></tr>${['Konuya uygunluk','İçeriğin doğruluğu ve zenginliği','Düzen ve sunum','Dil ve anlatım','Zamanında teslim'].map(x => `<tr><td>${x}</td><td></td><td></td><td></td><td></td></tr>`).join('')}</table><p>Puan: (toplam düzey puanı ÷ 20) × 100</p>${imzaBen(p)}` },
  { k:'proje_dagitim', kat:'Ölçme-Değerlendirme', sinif:true, ad:'Proje Ödevi Dağıtım ve Takip Listesi', not:'Sınıf listesiyle; konu, teslim, puan sütunları.', f:(p, c) => `${H2(p, yilT(p) + '<br>' + esc(c.s ? sinifKisa(c.s.ad) : '…') + ' SINIFI ' + esc(up(p.brans)) + ' DERSİ PROJE ÖDEVİ DAĞITIM LİSTESİ')}<table><tr><th>S.No</th><th>No</th><th>Adı Soyadı</th><th>Proje konusu</th><th>Veriliş</th><th>Teslim</th><th>Puan</th></tr>${ogrSatir(c.s, 4)}</table><p style="font-size:10pt">Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği gereği ortaokul öğrencilerine ders yılı içinde en az bir proje hazırlatılır; teslim edilmeyen projenin puanı sıfır sayılır.</p>${imzaBen(p)}${onay(p)}` },
  { k:'telafi', kat:'Ölçme-Değerlendirme', ad:'Sınav Sonrası Telafi (İyileştirme) Planı', not:'Başarısız soruların öğrenme çıktılarına göre plan.', f:p => `${H2(p, esc(up(p.brans)) + ' DERSİ SINAV SONRASI TELAFİ PLANI')}<table><tr><th>Sınav</th><td>…</td><th>Sınıf</th><td>…</td></tr></table><table><tr><th>Soru</th><th>Öğrenme çıktısı</th><th>Başarı %</th><th>Yapılacak telafi çalışması</th><th>Tarih</th></tr>${bosSatir(5, 4)}</table>${imzaBen(p)}` },
  { k:'yilsonu_rehberlik', kat:'Rehberlik', ad:'Sınıf Rehberlik Yıl Sonu Faaliyet Raporu', not:'Sınıf mevcudu ve görüşme sayıları otomatik.', f:p => { const s = rehberSinif(); const ogr = s ? s.ogr || [] : []; const kz = ogr.filter(o => obF(o.id).cinsiyet === 'Kız').length, er = ogr.filter(o => obF(o.id).cinsiyet === 'Erkek').length; const vg = evraklar().filter(e => e.kategori === 'Veli' && /görüşme/i.test(e.baslik)).length; const yn = evraklar().filter(e => e.sablon === 'yonlendirme').length;
    return `${H2(p, yilT(p) + '<br>' + esc(s ? sinifKisa(s.ad) : '…') + ' SINIFI REHBERLİK YIL SONU FAALİYET RAPORU')}<table><tr><th>Sınıf mevcudu</th><td>${ogr.length || '…'}</td><th>Kız / Erkek</th><td>${kz || '…'} / ${er || '…'}</td></tr><tr><th>Bireysel veli görüşmesi</th><td>${vg}</td><th>Rehberlik servisine yönlendirilen</th><td>${yn}</td></tr><tr><th>Tanıma formu dolduran</th><td>${ogr.filter(o => obDolu(o.id) > 0).length}</td><th>Veli toplantısı</th><td>${evraklar().filter(e => e.sablon === 'veli' || /veli toplant/i.test(e.baslik)).length}</td></tr></table><h3>Yapılan sınıf rehberlik etkinlikleri</h3><ol><li>…</li></ol><h3>Karşılaşılan sorunlar</h3><p>…</p><h3>Gelecek yıl için öneriler</h3><p>…</p>${imzaBen(p, (s ? sinifKisa(s.ad) : '') + ' Sınıf Rehber Öğretmeni')}${onay(p)}`; } },
  { k:'yonlendirme', kat:'Rehberlik', ogr:true, ad:'Rehberlik Servisine Öğrenci Yönlendirme Formu', not:'Öğrenci bilgileri karttan gelir. Gizlidir.', f:(p, c) => `${H2(p, 'REHBERLİK SERVİSİNE ÖĞRENCİ YÖNLENDİRME FORMU')}<table><tr><th>Öğrencinin adı soyadı</th><td>${esc(c.o ? c.o.ad : '')}</td><th>Sınıfı / No</th><td>${esc(c.s ? sinifKisa(c.s.ad) : '')} / ${esc(c.o ? c.o.no : '')}</td></tr><tr><th>Veli / telefon</th><td colspan="3">${esc([c.f.veliAd, c.f.veliTel].filter(Boolean).join(' · '))}</td></tr><tr><th>Yönlendiren</th><td>${esc(p.ad)}</td><th>Tarih</th><td>${todayStr()}</td></tr></table><h3>Yönlendirme nedeni</h3><p>☐ Akademik başarı &nbsp; ☐ Davranış &nbsp; ☐ Devamsızlık &nbsp; ☐ Arkadaş ilişkileri &nbsp; ☐ Aile &nbsp; ☐ Sağlık &nbsp; ☐ Duygusal &nbsp; ☐ Diğer: …</p><h3>Gözlenen davranışlar</h3><p>…</p><h3>Daha önce yapılan çalışmalar</h3><p>…</p>${c.f.saglik || c.f.ozelDurum ? `<h3>Bilinen sağlık / özel durum</h3><p>${esc([c.f.saglik, c.f.ozelDurum].filter(Boolean).join(' · '))}</p>` : ''}<p style="font-size:10pt">Bu form gizlidir; yalnızca rehberlik servisi ile paylaşılır.</p>${imzaTablo([`${esc(p.ad)}<br>Yönlendiren Öğretmen`, '…<br>Rehber Öğretmen (PDR)'])}` },
  { k:'bep', kat:'Özel Eğitim', ogr:true, ad:'BEP (Bireyselleştirilmiş Eğitim Programı)', not:'Kaynaştırma öğrencisi için ders BEP planı.', f:(p, c) => `${H2(p, yilT(p) + '<br>BİREYSELLEŞTİRİLMİŞ EĞİTİM PROGRAMI (BEP) · ' + esc(up(p.brans)))}<table><tr><th>Öğrencinin adı soyadı</th><td>${esc(c.o ? c.o.ad : '')}</td><th>Sınıfı / No</th><td>${esc(c.s ? sinifKisa(c.s.ad) : '')} / ${esc(c.o ? c.o.no : '')}</td></tr><tr><th>Doğum tarihi</th><td>${esc(c.f.dogumTarihi || '')}</td><th>Veli / telefon</th><td>${esc([c.f.veliAd, c.f.veliTel].filter(Boolean).join(' · '))}</td></tr><tr><th>Özel eğitim ihtiyacı / tanı</th><td colspan="3">${esc(c.f.ozelDurum || '…')}</td></tr><tr><th>BEP başlangıç / bitiş</th><td colspan="3">…/…/20… – …/…/20…</td></tr></table><h3>BEP geliştirme birimi</h3><table><tr><th>Görevi</th><th>Adı soyadı</th><th>İmza</th></tr>${['Okul müdürü / müdür yardımcısı','Rehber öğretmen (PDR)','Sınıf rehber öğretmeni', p.brans + ' öğretmeni','Veli','Öğrenci (uygun olduğunda)'].map(g => `<tr><td>${esc(g)}</td><td>${g === p.brans + ' öğretmeni' ? esc(p.ad) : g === 'Veli' ? esc(c.f.veliAd || '') : ''}</td><td></td></tr>`).join('')}</table><h3>Eğitsel performans (mevcut durum)</h3><p>Yapabildikleri: …</p><p>Desteğe ihtiyaç duyduğu alanlar: …</p><h3>Amaçlar</h3><table><tr><th>Uzun dönemli amaç</th><th>Kısa dönemli amaçlar</th><th>Başlama / bitiş</th><th>Yöntem-teknik</th><th>Materyal</th><th>Değerlendirme</th></tr>${'<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>'.repeat(4)}</table><h3>Ölçme-değerlendirme uyarlamaları</h3><p>☐ Ek süre &nbsp; ☐ Büyük punto &nbsp; ☐ Soruların okunması &nbsp; ☐ Sözlü sınav &nbsp; ☐ Ayrı ortam &nbsp; ☐ Az sayıda soru &nbsp; ☐ Diğer: …</p><h3>Veli ile iş birliği</h3><p>…</p>${onay(p)}` },
  { k:'bep_degerlendirme', kat:'Özel Eğitim', ogr:true, ad:'BEP Dönem Sonu Değerlendirme Formu', not:'Kısa dönemli amaçların gerçekleşme durumu.', f:(p, c) => `${H2(p, 'BEP DÖNEM SONU DEĞERLENDİRME FORMU · ' + esc(up(p.brans)))}<table><tr><th>Öğrenci</th><td>${esc(c.o ? c.o.ad : '')}</td><th>Sınıfı / No</th><td>${esc(c.s ? sinifKisa(c.s.ad) : '')} / ${esc(c.o ? c.o.no : '')}</td></tr></table><table><tr><th>Kısa dönemli amaç</th><th>Gerçekleşti</th><th>Kısmen</th><th>Gerçekleşmedi</th><th>Açıklama</th></tr>${'<tr><td></td><td></td><td></td><td></td><td></td></tr>'.repeat(6)}</table><h3>Sonraki dönem için öneriler</h3><p>…</p>${imzaBen(p)}` },
  { k:'kulup_plan', kat:'Sosyal Etkinlik', ad:'Öğrenci Kulübü Yıllık Çalışma Planı', not:'Aylara göre kulüp etkinlikleri ve toplum hizmeti.', f:p => `${H2(p, yilT(p) + '<br>… KULÜBÜ YILLIK ÇALIŞMA PLANI')}<table><tr><th>Danışman öğretmen</th><td>${esc(p.ad)}</td><th>Kulüp başkanı</th><td>…</td></tr></table><table><tr><th>Ay</th><th>Etkinlik</th><th>Toplum hizmeti çalışması</th><th>Açıklama</th></tr>${AYLAR_UZUN.slice(1).map(a => `<tr><td>${a}</td><td></td><td></td><td></td></tr>`).join('')}</table>${imzaBen(p, 'Danışman Öğretmen')}${onay(p)}` },
  { k:'kulup_tutanak', kat:'Sosyal Etkinlik', ad:'Kulüp Genel Kurul ve Seçim Tutanağı', not:'Kulüp başkanı ve yönetim kurulu seçimi.', f:p => `${H2(p, '… KULÜBÜ GENEL KURUL TOPLANTISI VE SEÇİM TUTANAĞI')}<p>…/…/20… tarihinde kulüp danışman öğretmeni ${esc(p.ad)} başkanlığında toplanan kulüp genel kurulunda yapılan seçimde aşağıdaki öğrenciler görevlendirilmiştir.</p><table><tr><th>Görev</th><th>Adı soyadı</th><th>Sınıfı</th></tr>${['Kulüp başkanı','Başkan yardımcısı','Sekreter','Sayman','Üye'].map(x => `<tr><td>${x}</td><td></td><td></td></tr>`).join('')}</table><h3>Alınan kararlar</h3><ol><li>…</li></ol>${imzaBen(p, 'Danışman Öğretmen')}` },
  { k:'toplum_hizmeti', kat:'Sosyal Etkinlik', ad:'Toplum Hizmeti Çalışma Planı ve Raporu', not:'Katılan öğrenciler ve süreler.', f:p => `${H2(p, yilT(p) + '<br>TOPLUM HİZMETİ ÇALIŞMASI')}<table><tr><th>Çalışmanın adı</th><td colspan="3">…</td></tr><tr><th>Amaç</th><td colspan="3">…</td></tr><tr><th>Tarih</th><td>…/…/20…</td><th>Yer</th><td>…</td></tr></table><h3>Katılan öğrenciler</h3><table><tr><th>S.No</th><th>Adı soyadı</th><th>Sınıfı</th><th>Süre (saat)</th></tr>${bosSatir(10, 3)}</table><h3>Değerlendirme</h3><p>…</p>${imzaBen(p, 'Danışman Öğretmen')}` },
  { k:'belirli_gun', kat:'Sosyal Etkinlik', ad:'Belirli Gün ve Hafta Faaliyet Raporu', not:'Görevli olduğunuz gün/hafta için rapor.', f:p => `${H2(p, yilT(p) + '<br>BELİRLİ GÜN VE HAFTA FAALİYET RAPORU')}<table><tr><th>Gün / hafta</th><td>…</td><th>Tarih</th><td>…/…/20…</td></tr><tr><th>Görevli öğretmenler</th><td colspan="3">${esc(p.ad)}, …</td></tr></table><h3>Yapılan etkinlikler</h3><ol><li>…</li></ol><h3>Katılım</h3><p>…</p><h3>Değerlendirme</h3><p>…</p><p><i>Etkinlik fotoğrafları "Dosyalar › Sosyal Etkinlik ve Kulüp" klasöründedir.</i></p>${imzaBen(p)}${onay(p)}` },
  { k:'gezi_plan', kat:'Sosyal Etkinlik', ad:'Gezi Planı', not:'Gezi bilgileri ve sorumlular. İzin belgeleri için Sosyal Etkinlik modülündeki aracı kullanın.', f:p => `${H2(p, yilT(p) + '<br>GEZİ PLANI')}<table><tr><th>Gezi yeri</th><td colspan="3">…</td></tr><tr><th>Amaç / ilgili öğrenme çıktıları</th><td colspan="3">…</td></tr><tr><th>Tarih</th><td>…/…/20…</td><th>Çıkış – dönüş</th><td>…:… – …:…</td></tr><tr><th>Ulaşım</th><td>…</td><th>Öğrenci sayısı</th><td>…</td></tr><tr><th>Sorumlu öğretmenler</th><td colspan="3">${esc(p.ad)}, …</td></tr></table><h3>Gezi sonrası değerlendirme</h3><p>…</p>${imzaBen(p)}${onay(p)}` },
  { k:'dzp_plan', kat:'Proje', ad:'Dilimizin Zenginlikleri Projesi Okul Eylem Planı', not:'Okul koordinatörü için aylık eylem planı.', f:p => `${H2(p, yilT(p) + '<br>DİLİMİZİN ZENGİNLİKLERİ PROJESİ OKUL EYLEM PLANI')}<table><tr><th>Okul koordinatörü</th><td>${esc(p.ad)}</td><th>Okul</th><td>${esc(p.okul)}</td></tr></table><table><tr><th>Ay</th><th>Etkinlik</th><th>Hedef kitle</th><th>Sorumlu</th><th>Açıklama</th></tr>${AYLAR_UZUN.slice(1).map(a => `<tr><td>${a}</td><td></td><td></td><td></td><td></td></tr>`).join('')}</table><p><i>Etkinlikleri Bakanlığın proje kapsamında yayımladığı aylık takvim ve rehbere göre doldurunuz.</i></p>${imzaBen(p, 'Okul Koordinatörü')}${onay(p)}` },
  { k:'dzp_rapor', kat:'Proje', ad:'Dilimizin Zenginlikleri Projesi Etkinlik Raporu', not:'Her etkinlik için rapor; fotoğraflar Projeler klasöründe.', f:p => `${H2(p, 'DİLİMİZİN ZENGİNLİKLERİ PROJESİ ETKİNLİK RAPORU')}<table><tr><th>Etkinliğin adı</th><td colspan="3">…</td></tr><tr><th>Tarih</th><td>…/…/20…</td><th>Katılımcı sayısı</th><td>…</td></tr><tr><th>Uygulayan öğretmenler</th><td colspan="3">${esc(p.ad)}, …</td></tr></table><h3>Etkinliğin uygulanışı</h3><p>…</p><h3>Kazanımlar ve değerlendirme</h3><p>…</p><p><i>Fotoğraf ve kanıtlar "Dosyalar › Projeler" klasöründedir.</i></p>${imzaBen(p, 'Okul Koordinatörü')}` },
  { k:'nobet_tutanak', kat:'Nöbet', ad:'Nöbet Olay Tutanağı', not:'Nöbet sırasında yaşanan olaylar için.', f:p => `${H2(p, 'NÖBET OLAY TUTANAĞI')}<table><tr><th>Tarih / saat</th><td>…/…/20… · …:…</td><th>Nöbet yeri</th><td>${esc((ayar().nobet || {}).yer || '…')}</td></tr><tr><th>İlgili öğrenci(ler)</th><td colspan="3">…</td></tr></table><h3>Olayın oluş şekli</h3><p>…</p><h3>Yapılan müdahale</h3><p>…</p><h3>Bilgi verilenler</h3><p>☐ Okul idaresi &nbsp; ☐ Rehberlik servisi &nbsp; ☐ Veli &nbsp; ☐ Sağlık birimi</p><p>İşbu tutanak tarafımızca düzenlenerek imza altına alınmıştır.</p>${imzaTablo([`${esc(p.ad)}<br>Nöbetçi Öğretmen`, '…<br>Nöbetçi Öğretmen', '…<br>Nöbetçi Müdür Yardımcısı'])}` },
  { k:'dyk_plan', kat:'DYK', ad:'DYK Kurs Planı ve Devam Çizelgesi', not:'Haftalık konu planı ve öğrenci yoklama tablosu.', f:p => `${H2(p, yilT(p) + '<br>' + esc(up(p.brans)) + ' DESTEKLEME VE YETİŞTİRME KURSU PLANI')}<table><tr><th>Sınıf düzeyi</th><td>…</td><th>Gün / saat</th><td>…</td></tr><tr><th>Kurs öğretmeni</th><td>${esc(p.ad)}</td><th>Başlama / bitiş</th><td>…/…/20… – …/…/20…</td></tr></table><table><tr><th>Hafta</th><th>Konu / öğrenme çıktısı</th><th>Ders saati</th></tr>${bosSatir(12, 2)}</table><h2 style="text-align:center;page-break-before:always">DEVAM ÇİZELGESİ</h2><table><tr><th>S.No</th><th>Adı soyadı</th>${Array.from({ length:8 }, (_, i) => `<th>${i + 1}. hf</th>`).join('')}</tr>${bosSatir(20, 9)}</table>${imzaBen(p, 'Kurs Öğretmeni')}${onay(p)}` },
  { k:'dyk_rapor', kat:'DYK', ad:'DYK Kurs Sonu Değerlendirme Raporu', not:'Katılım ve başarı değerlendirmesi.', f:p => `${H2(p, 'DESTEKLEME VE YETİŞTİRME KURSU SONU DEĞERLENDİRME RAPORU')}<table><tr><th>Kurs</th><td>${esc(p.brans)} · …. sınıf</td><th>Kayıtlı / devam eden</th><td>… / …</td></tr></table><h3>İşlenen konular</h3><p>…</p><h3>Öğrenci başarısındaki değişim</h3><p>…</p><h3>Öneriler</h3><p>…</p>${imzaBen(p, 'Kurs Öğretmeni')}` },
  { k:'veli_duyuru', kat:'Veli', ad:'Veli Bilgilendirme Mektubu', not:'Velilere duyuru / bilgilendirme yazısı.', f:p => `${baslik(p)}<p>Sayın Velimiz,</p><p>…</p><p>Bilgilerinize sunar, iş birliğiniz için teşekkür ederim.</p><p style="text-align:right">${todayStr()}<br>${esc(p.ad)}<br>${esc(p.rehberSinif ? sinifKisa(p.rehberSinif) + ' Sınıf Rehber Öğretmeni' : p.brans + ' Öğretmeni')}</p>` },
  { k:'mesleki_eylul', kat:'Mesleki Gelişim', ad:'Mesleki Çalışma Dönemi Raporu (Eylül)', not:'Ders yılı başı mesleki çalışmalar.', f:p => `${H2(p, yilT(p) + '<br>EYLÜL MESLEKİ ÇALIŞMA DÖNEMİ RAPORU')}<table><tr><th>Tarih</th><th>Saat</th><th>Çalışma / eğitim konusu</th><th>Açıklama</th></tr>${'<tr><td></td><td></td><td></td><td></td></tr>'.repeat(8)}</table>${imzaBen(p)}${onay(p)}` },
  { k:'mesleki_haziran', kat:'Mesleki Gelişim', ad:'Mesleki Çalışma Dönemi Raporu (Haziran)', not:'Ders yılı sonu mesleki çalışmalar.', f:p => `${H2(p, yilT(p) + '<br>HAZİRAN MESLEKİ ÇALIŞMA DÖNEMİ RAPORU')}<table><tr><th>Tarih</th><th>Saat</th><th>Çalışma / eğitim konusu</th><th>Açıklama</th></tr>${'<tr><td></td><td></td><td></td><td></td></tr>'.repeat(8)}</table>${imzaBen(p)}${onay(p)}` },
  { k:'hizmetici', kat:'Mesleki Gelişim', ad:'Mesleki Gelişim Kayıt Formu', not:'Katıldığınız eğitim, seminer ve kurslar.', f:p => `${H2(p, 'MESLEKİ GELİŞİM FAALİYETLERİ KAYIT FORMU')}<table><tr><th>S.No</th><th>Eğitimin adı</th><th>Düzenleyen</th><th>Tarih</th><th>Süre (saat)</th><th>Belge</th></tr>${bosSatir(8, 5)}</table><p><i>Katılım belgeleri "Dosyalar › Mesleki Gelişim" klasöründedir.</i></p>${imzaBen(p)}` }
);
function tplFlags() { for (const t of EV_TPL) { if (t.k === 'veligorusme' || t.k === 'gozlemformu') t.ogr = true; } }
tplFlags();
// Öğrenci seçilen eski şablonları öğrenci bilgisiyle doldur
{ const vg = EV_TPL.find(t => t.k === 'veligorusme'), gz = EV_TPL.find(t => t.k === 'gozlemformu');
  const ogrTablo = (c, extra) => `<table><tr><th>Öğrencinin adı soyadı</th><td>${esc(c.o ? c.o.ad : '')}</td><th>Sınıfı / No</th><td>${esc(c.s ? sinifKisa(c.s.ad) : '')} / ${esc(c.o ? c.o.no : '')}</td></tr>${extra}</table>`;
  const vgOld = vg.f, gzOld = gz.f;
  vg.f = (p, c) => !c || !c.o ? vgOld(p) : vgOld(p).replace(/<table>[\s\S]*?<\/table>/, ogrTablo(c, `<tr><th>Görüşülen veli</th><td>${esc(c.f.veliAd || '')}</td><th>Yakınlığı</th><td>${esc(c.f.veliYakinlik || '')}</td></tr><tr><th>Veli telefonu</th><td>${esc(c.f.veliTel || '')}</td><th>Görüşme şekli</th><td>Yüz yüze / Telefon / Çevrim içi</td></tr><tr><th>Tarih / saat</th><td colspan="3">${todayStr()} · …:…</td></tr>`));
  gz.f = (p, c) => !c || !c.o ? gzOld(p) : gzOld(p).replace(/<table>[\s\S]*?<\/table>/, ogrTablo(c, `<tr><th>Gözlem tarihi</th><td>${todayStr()}</td><th>Gözlem ortamı</th><td>Ders / Teneffüs / Etkinlik</td></tr>`)); }

/* ---- Modül tanımları ---- */
const evK = (kat, re, sablon) => evraklar().some(e => (!kat || e.kategori === kat) && (!re || re.test(e.baslik || '')) && (!sablon || e.sablon === sablon || (re && re.test(e.baslik || ''))));
const fK = k => dosyalar().some(f => f.klasor === k);
const MODS = [
  { k:'planlar', ad:'Planlar', not:'Yıllık plan, ders ve tema planları.', dayanak:'Öğretim programları, Bakanlıkça yayımlanan çerçeve planlar ve zümre kararları.', kat:['Plan'], klasor:['Yıllık Planlar','Ders Planları'], tpl:['yillik','dersplani'],
    gerek:[['Yıllık plan', () => evK('Plan', /yıllık/i) || fK('Yıllık Planlar')], ['Ders / tema planları', () => evK('Plan', /ders planı/i) || fK('Ders Planları')]] },
  { k:'kurullar', ad:'Kurullar ve Toplantılar', not:'Öğretmenler kurulu, zümre, şube öğretmenler kurulu.', dayanak:'Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (kurul ve zümre hükümleri).', kat:['Öğretmenler Kurulu','Zümre','Şube Öğretmenler Kurulu'], klasor:['Zümre Tutanakları','Şube Öğretmenler Kurulu'], tpl:['ogretmenler_kurulu','zumre_bas','zumre_son','sok'],
    gerek:[['Zümre toplantısı · dönem başı', () => evK('Zümre', /başı/i) || fK('Zümre Tutanakları')], ['Zümre toplantısı · dönem sonu', () => evK('Zümre', /sonu/i)], ['Şube öğretmenler kurulu', () => evK('Şube Öğretmenler Kurulu') || fK('Şube Öğretmenler Kurulu')], ['Öğretmenler kurulu notları', () => evK('Öğretmenler Kurulu')]] },
  { k:'olcme', ad:'Ölçme ve Değerlendirme', not:'Sınav kâğıtları, sınav analizleri, performans ve proje.', dayanak:'Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (ölçme-değerlendirme hükümleri); Türkiye Yüzyılı Maarif Modeli.', kat:['Ölçme-Değerlendirme'], klasor:['Sınav ve Değerlendirme'], tpl:['yazili','performans','proje_dagitim','telafi'],
    arac:[['Sınav analizi', 'nav', 'sinavlar'], ['Not çizelgesi', 'cz-new', 'sinav']],
    gerek:[['Yazılı sınav kâğıtları ve cevap anahtarları', () => evK('Ölçme-Değerlendirme', /yazılı/i) || fK('Sınav ve Değerlendirme')], ['Sınav analizleri', () => Store.list('sinav').length > 0], ['Performans görevi ve puanlama anahtarı', () => evK('Ölçme-Değerlendirme', /performans/i)], ['Proje dağıtım listesi (yılda en az bir proje)', () => evK('Ölçme-Değerlendirme', /proje/i)], ['Not / değerlendirme çizelgeleri', () => cizelgeler().length > 0]] },
  { k:'rehberlik', ad:'Sınıf Rehberliği', not:'Rehberlik planı, tanıma formları, oturma planı, yönlendirme.', dayanak:'Rehberlik ve Psikolojik Danışma Hizmetleri Yönetmeliği.', kat:['Rehberlik'], klasor:[], tpl:['rehberlik','yonlendirme','gozlemformu','baskan','yilsonu_rehberlik'],
    arac:[['Öğrenci bilgileri ve tanıma formları', 'nav', 'rehberlik'], ['Oturma planı', 'rb-oturma', '']],
    gerek:[['Sınıf rehberlik planı', () => evK('Rehberlik', /planı/i) || fK(rehberKlasor())], ['Öğrenci tanıma formları', () => { const s = rehberSinif(); return !!s && (s.ogr || []).length > 0 && (s.ogr || []).filter(o => obDolu(o.id) > 0).length >= (s.ogr || []).length / 2; }], ['Oturma planı', () => { const s = rehberSinif(); return !!s && !!Store.get('oturma_' + s.id); }], ['Sınıf başkanı seçim tutanağı', () => evK(null, /başkan/i)], ['Yıl sonu faaliyet raporu (haziran)', () => evK('Rehberlik', /yıl sonu/i)]] },
  { k:'ozel', ad:'Özel Eğitim (BEP)', not:'Kaynaştırma öğrencileri için BEP planları.', dayanak:'Özel Eğitim Hizmetleri Yönetmeliği.', kat:['Özel Eğitim'], klasor:['Özel Eğitim (BEP)'], tpl:['bep','bep_degerlendirme'],
    gerek:[['Kaynaştırma öğrencilerinin BEP planları', () => { const ks = kaynastirma(); return !ks.length || ks.every(x => evraklar().some(e => e.sablon === 'bep' && e.ogrId === x.o.id)); }]] },
  { k:'sosyal', ad:'Sosyal Etkinlik, Kulüp ve Gezi', not:'Kulüp planı, toplum hizmeti, belirli gün ve haftalar, gezi.', dayanak:'Eğitim Kurumları Sosyal Etkinlikler Yönetmeliği.', kat:['Sosyal Etkinlik'], klasor:['Sosyal Etkinlik ve Kulüp'], tpl:['kulup_plan','kulup_tutanak','toplum_hizmeti','belirli_gun','gezi_plan'],
    arac:[['Gezi veli izin belgeleri', 'gezi-izin', '']],
    gerek:[['Kulüp yıllık çalışma planı', () => evK('Sosyal Etkinlik', /kulüb/i)], ['Toplum hizmeti çalışması', () => evK('Sosyal Etkinlik', /toplum/i)], ['Belirli gün ve hafta raporu', () => evK('Sosyal Etkinlik', /belirli/i)]] },
  { k:'proje', ad:'Projeler', not:'Okulda yürüttüğünüz projeler (ör. Dilimizin Zenginlikleri).', dayanak:'İlgili Bakanlık proje yazıları ve rehberleri.', kat:['Proje'], klasor:['Projeler'], tpl:['dzp_plan','dzp_rapor'], gerek:[] },
  { k:'nobet', ad:'Nöbet', not:'Nöbet gün ve yeriniz, olay tutanakları.', dayanak:'Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (nöbet hükümleri) ve okul nöbet çizelgesi.', kat:['Nöbet'], klasor:['Nöbet'], tpl:['nobet_tutanak'], arac:[['Nöbet gün ve yerimi gir', 'nobet-ayar', '']],
    gerek:[['Nöbet gün ve yeri kayıtlı', () => !!(ayar().nobet || {}).gun]] },
  { k:'dyk', ad:'DYK (Destekleme ve Yetiştirme)', not:'Kurs planı, devam çizelgesi, kurs sonu raporu.', dayanak:'Destekleme ve Yetiştirme Kursları Yönergesi.', kat:['DYK'], klasor:['DYK'], tpl:['dyk_plan','dyk_rapor'], gerek:[] },
  { k:'veli', ad:'Veli İşleri', not:'Veli toplantıları, görüşmeler, bilgilendirme, iletişim listesi.', dayanak:'Okul Öncesi Eğitim ve İlköğretim Kurumları Yönetmeliği (veli iş birliği ve görüşme hükümleri).', kat:['Veli'], klasor:['Veli Toplantıları'], tpl:['veli','veligorusme','veli_duyuru'], arac:[['Veli iletişim listesi', 'rb-liste-git', 'veli']],
    gerek:[['Veli toplantısı tutanağı ve katılım listesi', () => evK('Veli', /toplant/i) || fK('Veli Toplantıları')], ['Veli görüşme kayıtları', () => evK('Veli', /görüşme/i)]] },
  { k:'mesleki', ad:'Mesleki Gelişim', not:'Mesleki çalışma raporları, eğitim ve belgeler.', dayanak:'MEB Personeli Hizmet İçi Eğitim Yönetmeliği; 7528 sayılı Öğretmenlik Meslek Kanunu.', kat:['Mesleki Gelişim'], klasor:['Mesleki Gelişim'], tpl:['mesleki_eylul','mesleki_haziran','hizmetici'],
    gerek:[['Eylül mesleki çalışma raporu', () => evK('Mesleki Gelişim', /eylül/i)], ['Haziran mesleki çalışma raporu', () => evK('Mesleki Gelişim', /haziran/i)]] },
  { k:'kisisel', ad:'Kişisel Evrak ve Yazışmalar', not:'Dilekçeler, tutanaklar, resmî yazılar, kişisel belgeler.', dayanak:'657 sayılı Devlet Memurları Kanunu; okul idaresi yazışmaları.', kat:['Dilekçe','Tutanak','Diğer'], klasor:['Kişisel Belgeler','Resmî Yazılar','Genel'], tpl:['dilekce','tutanak','bos'], gerek:[] }
];
function kaynastirma() { const out = []; for (const s of siniflar()) for (const o of s.ogr || []) { const f = obF(o.id); if ((f.ozelDurum || '').trim()) out.push({ s, o, f }); } return out; }
const modDurum = m => { const g = (m.gerek || []).map(([ad, fn]) => ({ ad, ok:!!fn() })); return { g, ok:g.filter(x => x.ok).length, n:g.length }; };

/* ---- Sayfa: Modüller ---- */
PAGES.moduller = () => {
  const all = MODS.map(m => ({ m, d:modDurum(m) })); const tn = all.reduce((a, x) => a + x.d.n, 0), tok = all.reduce((a, x) => a + x.d.ok, 0);
  return `${banner()}
  <div class="pagehead"><div><h1>Modüller</h1><p>Öğretmen dosyanızın mevzuata göre bölümleri. Her bölümde dayanağı, gerekenler listesi, hazır şablonlar ve ilgili dosyalar bulunur. Müdür ya da müfettiş ne isterse buradan bulursunuz.</p></div>
    <div class="row"><span class="pill ${tok === tn ? 'ok' : 'warn'}">${tok}/${tn} gereklilik tamam</span><button class="btn blue" data-act="nav" data-p="mufettis">${icon('mufettis')}Müfettiş dosyası</button></div></div>
  <div class="grid g3">${all.map(({ m, d }) => `<button class="tpl" data-act="open-modul" data-id="${m.k}"><div class="row between" style="gap:6px"><b>${esc(m.ad)}</b>${d.n ? `<span class="pill ${d.ok === d.n ? 'ok' : 'warn'}">${d.ok}/${d.n}</span>` : ''}</div><small>${esc(m.not)}</small><small style="color:var(--blue)">${evraklar().filter(e => m.kat.includes(e.kategori)).length} belge · ${dosyalar().filter(f => m.klasor.includes(f.klasor)).length} dosya</small></button>`).join('')}
    <button class="tpl" data-act="nav" data-p="mevzuat"><b>Mevzuat ve Müfredat</b><small>Millî metinler, kanun ve yönetmelik özetleri, Maarif Modeli, çalışma takvimi.</small></button></div>`;
};
PAGES.modul = () => {
  const m = MODS.find(x => x.k === S.pid); if (!m) return '';
  const d = modDurum(m); const ev = evraklar().filter(e => m.kat.includes(e.kategori)); const dz = dosyalar().filter(f => m.klasor.includes(f.klasor));
  const ks = m.k === 'ozel' ? kaynastirma() : [];
  return `<div><button class="btn ghost sm" data-act="nav" data-p="moduller">${icon('back')}Modüller</button></div>
  <div class="pagehead"><div><h1>${esc(m.ad)}</h1><p>${esc(m.not)}</p></div></div>
  <div class="note" style="color:var(--ink)"><b>Dayanak:</b> ${esc(m.dayanak)}</div>
  ${d.n ? `<section class="card"><div class="row between"><h2 style="margin:0">Gerekenler</h2><span class="pill ${d.ok === d.n ? 'ok' : 'warn'}">${d.ok}/${d.n}</span></div>${d.g.map(x => `<div class="check"><span class="box ${x.ok ? 'on' : ''}">${x.ok ? '✓' : ''}</span><div style="flex:1">${esc(x.ad)}</div></div>`).join('')}</section>` : ''}
  ${m.k === 'ozel' ? `<section class="card"><h2>Kaynaştırma öğrencileri</h2><p class="note" style="margin-bottom:10px">Öğrenci kartında "Engel, özel eğitim, kaynaştırma durumu" alanı dolu olan öğrenciler burada listelenir.</p>${ks.length ? `<div class="list">${ks.map(x => { const has = evraklar().find(e => e.sablon === 'bep' && e.ogrId === x.o.id); return `<div class="li" style="cursor:default"><span class="t"><b>${esc(x.o.ad)}</b><small>${esc(x.s.ad)} · ${esc(x.f.ozelDurum)}</small></span>${has ? `<button class="btn sm" data-act="open-evrak" data-id="${has.id}">BEP'i aç</button>` : `<button class="btn primary sm" data-act="ev-new" data-k="bep" data-s="${x.s.id}" data-o="${x.o.id}">BEP oluştur</button>`}</div>`; }).join('')}</div>` : '<p class="muted">Kayıtlı kaynaştırma öğrencisi yok.</p>'}</section>` : ''}
  ${m.arac ? `<section class="card"><h2>Araçlar</h2><div class="row">${m.arac.map(([t, act, k]) => `<button class="btn blue" data-act="${act}" ${act === 'nav' ? `data-p="${k}"` : `data-k="${k}" data-t="${k}"`}>${esc(t)}</button>`).join('')}</div></section>` : ''}
  <section class="card"><h2>Yeni belge</h2><div class="grid g3">${m.tpl.map(k => EV_TPL.find(t => t.k === k)).filter(Boolean).map(t => `<button class="tpl" data-act="ev-new" data-k="${t.k}"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></button>`).join('')}</div></section>
  <section class="card"><h2>Bu bölümdeki belgeler</h2>${ev.length ? `<div class="list">${ev.map(e => `<button class="li" data-act="open-evrak" data-id="${e.id}">${icon('evraklar')}<span class="t"><b>${esc(e.baslik)}</b><small>${esc(e.kategori)} · ${fmtD(e.guncelleme)}</small></span></button>`).join('')}</div>` : '<p class="muted">Henüz belge yok.</p>'}</section>
  ${m.klasor.length ? `<section class="card"><div class="row between"><h2 style="margin:0">Dosyalar</h2><button class="btn sm" data-act="up-open" data-k="${esc(m.klasor[0])}">${icon('up')}Dosya yükle</button></div><div style="margin-top:12px">${dz.length ? dzListHTML(dz) : '<p class="muted">Bu bölüme ait yüklenmiş dosya yok (taranmış evrak, fotoğraf, PDF).</p>'}</div></section>` : ''}`;
};

/* ---- Ders programı ---- */
const GUNLER = ['Pazartesi','Salı','Çarşamba','Perşembe','Cuma'];
const SAAT0 = [['08:30','09:10'],['09:20','10:00'],['10:10','10:50'],['11:00','11:40'],['11:50','12:30'],['13:20','14:00'],['14:10','14:50'],['15:00','15:40']];
const dpGet = () => Store.get('dersprog') || { type:'dersprog', saatler:SAAT0, h:{} };
function bugunDersler(now = new Date()) {
  const g = now.getDay() - 1; if (g < 0 || g > 4) return { g, list:[] }; const dp = dpGet(); const mins = now.getHours() * 60 + now.getMinutes(); const tm = s => { const [h, m] = String(s || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
  const list = dp.saatler.map((sa, i) => ({ i, sa, ders:(dp.h || {})[`${g}-${i}`] || '', simdi:mins >= tm(sa[0]) && mins < tm(sa[1]), gecti:mins >= tm(sa[1]) })).filter(x => x.ders);
  return { g, list };
}
function dpHTML(p) { const dp = dpGet(); return `${baslik(p)}<h2 style="text-align:center">${yilT(p)}<br>${esc(up(p.ad))} HAFTALIK DERS PROGRAMI</h2><table><tr><th>Ders</th><th>Saat</th>${GUNLER.map(g => `<th>${g}</th>`).join('')}</tr>${dp.saatler.map((sa, i) => `<tr><td>${i + 1}</td><td>${esc(sa[0])}–${esc(sa[1])}</td>${GUNLER.map((_, g) => `<td>${esc((dp.h || {})[`${g}-${i}`] || '')}</td>`).join('')}</tr>`).join('')}</table>${(ayar().nobet || {}).gun ? `<p><b>Nöbet:</b> ${esc(ayar().nobet.gun)} · ${esc(ayar().nobet.yer || '')}</p>` : ''}`; }

/* ---- Sayfa: Sınıfta (ders araçları) ---- */
const ST_TABS = [['bugun','Bugün'],['program','Ders programı'],['yoklama','Yoklama'],['kura','Kura'],['grup','Grup oluştur'],['sure','Süre'],['okuma','Okuma hızı']];
function stSinifSel() { const sn = siniflar(); if (!S.stSinif || !Store.get(S.stSinif)) S.stSinif = (rehberSinif() || sn[0] || {}).id; return sn.length ? `<div class="chips">${sn.map(s => `<button class="chip" data-act="st-sinif" data-k="${s.id}" aria-pressed="${s.id === S.stSinif}">${esc(s.ad)}</button>`).join('')}</div>` : `<div class="empty"><b>Önce sınıf listesi yükleyin</b><button class="btn primary" data-act="imp-open">${icon('up')}Liste yükle</button></div>`; }
PAGES.sinifta = () => {
  const tab = S.stTab || 'bugun'; let body = '';
  if (tab === 'bugun') {
    const b = bugunDersler(); const nb = ayar().nobet || {}; const gunAd = ['Pazar', ...GUNLER, 'Cumartesi'][new Date().getDay()];
    const ag = Store.list('gorev').filter(x => !x.bitti && x.tarih && x.tarih <= isoDay(0)).sort((a, c) => a.tarih.localeCompare(c.tarih));
    body = `<section class="card"><h2>${gunAd}, ${todayStr()}</h2>${b.list.length ? `<div class="list">${b.list.map(x => `<div class="li" style="cursor:default;${x.simdi ? 'background:var(--blue-soft);border-radius:8px' : ''}"><span class="num muted" style="width:96px">${x.i + 1}. ders<br>${esc(x.sa[0])}–${esc(x.sa[1])}</span><span class="t"><b>${esc(x.ders)}</b><small>${x.simdi ? 'şu an' : x.gecti ? 'bitti' : 'sırada'}</small></span></div>`).join('')}</div>` : `<p class="muted">${b.g < 0 || b.g > 4 ? 'Bugün hafta sonu.' : 'Bugün için dersiniz kayıtlı değil.'} <button class="btn sm" data-act="st-tab" data-k="program">Ders programını gir</button></p>`}
      ${nb.gun && low(nb.gun).includes(low(gunAd)) ? `<div class="banner" style="margin-top:12px"><b>Bugün nöbetçisiniz:</b> ${esc(nb.yer || '')}</div>` : ''}</section>
      <section class="card"><h2>Bugün ve geciken işler</h2>${ag.length ? ag.map(x => `<div class="check"><button class="box" data-act="ag-bitti" data-id="${x.id}" aria-label="Tamamlandı"></button><div style="flex:1">${esc(x.baslik)}<br><small class="${x.tarih < isoDay(0) ? '' : 'muted'}" style="${x.tarih < isoDay(0) ? 'color:var(--red)' : ''}">${fmtD(dParse(x.tarih))}</small></div></div>`).join('') : '<p class="muted">Bugün için iş yok. Yeni işleri Ana Sayfa\'daki ajandaya ekleyin.</p>'}</section>`;
  } else if (tab === 'program') {
    const dp = dpGet();
    body = `<section class="card" style="padding:0"><div class="row between" style="padding:14px 16px"><div><h2 style="margin:0">Haftalık ders programım</h2><p class="note">Hücreye sınıf ve dersi yazın (ör. 6A Türkçe). Saatleri okulunuza göre düzeltin.</p></div><button class="btn primary" data-act="dp-yazdir">Yazdır / PDF</button></div>
      <div class="tablewrap" style="border-radius:0;border-left:0;border-right:0"><table class="t ogr"><thead><tr><th>#</th><th>Saat</th>${GUNLER.map(g => `<th>${g}</th>`).join('')}</tr></thead><tbody>
      ${dp.saatler.map((sa, i) => `<tr><td class="no">${i + 1}</td><td style="min-width:120px"><div class="row" style="gap:2px;flex-wrap:nowrap"><input id="dps-${i}-0" data-in="dp-saat" data-i="${i}" data-j="0" value="${esc(sa[0])}" style="width:56px;text-align:center" class="num"><input id="dps-${i}-1" data-in="dp-saat" data-i="${i}" data-j="1" value="${esc(sa[1])}" style="width:56px;text-align:center" class="num"></div></td>${GUNLER.map((_, g) => `<td style="min-width:110px"><input id="dp-${g}-${i}" data-in="dp-h" data-k="${g}-${i}" value="${esc((dp.h || {})[`${g}-${i}`] || '')}" placeholder="—"></td>`).join('')}</tr>`).join('')}
      </tbody></table></div><div class="row" style="padding:12px 16px"><button class="btn sm" data-act="dp-satir" data-k="1">+ Ders saati</button><button class="btn sm" data-act="dp-satir" data-k="-1">− Son saati sil</button><button class="btn sm" data-act="nobet-ayar">Nöbet gün ve yerim</button></div></section>`;
  } else if (tab === 'yoklama') {
    const sel = stSinifSel(); const s = Store.get(S.stSinif); const day = S.ykGun || isoDay(0);
    if (s) { const yk = Store.get('yoklama_' + s.id) || { g:{} }; const g = (yk.g || {})[day] || {};
      const top = {}; for (const d of Object.values(yk.g || {})) for (const [oid, v] of Object.entries(d)) { top[oid] = top[oid] || { y:0, g:0 }; if (v === 'y') top[oid].y++; if (v === 'g') top[oid].g++; }
      body = sel + `<section class="card"><div class="row between"><h2 style="margin:0">${esc(s.ad)} yoklama</h2><input class="inp" type="date" id="yk-gun" data-in="yk-gun" value="${day}" style="width:auto"></div><p class="note" style="margin:6px 0 10px">Öğrenciye dokunun: <b>yok</b> → <b>geç</b> → <b>var</b>. Bu kayıt kendi takibiniz içindir; resmî devamsızlık e-Okul'a girilir.</p>
        <div class="grid g3">${(s.ogr || []).map(o => { const v = g[o.id] || ''; return `<button class="tpl" data-act="yk" data-o="${o.id}" style="padding:10px 12px;${v === 'y' ? 'border-color:var(--red);background:var(--red-soft)' : v === 'g' ? 'border-color:var(--warn);background:var(--warn-soft)' : ''}"><div class="row between"><b style="font-size:14px;font-family:var(--f-body)">${esc(o.ad)}</b><span class="pill ${v === 'y' ? 'red' : v === 'g' ? 'warn' : 'ok'}">${v === 'y' ? 'yok' : v === 'g' ? 'geç' : 'var'}</span></div><small class="num">${esc(o.no)} · toplam yok ${(top[o.id] || {}).y || 0}, geç ${(top[o.id] || {}).g || 0}</small></button>`; }).join('')}</div>
        <p class="note" style="margin-top:10px">Bugün: ${Object.values(g).filter(v => v === 'y').length} yok, ${Object.values(g).filter(v => v === 'g').length} geç · mevcut ${(s.ogr || []).length}</p></section>`; } else body = sel;
  } else if (tab === 'kura') {
    const sel = stSinifSel(); const s = Store.get(S.stSinif); const K = S.kura && S.kura.sid === S.stSinif ? S.kura : (S.kura = { sid:S.stSinif, cekilen:[], son:null });
    const kalan = s ? (s.ogr || []).filter(o => !K.cekilen.includes(o.id)) : []; const son = s && K.son ? (s.ogr || []).find(o => o.id === K.son) : null;
    body = sel + (s ? `<section class="card" style="text-align:center;padding:28px 18px"><div class="eyebrow">${esc(s.ad)} · ${kalan.length} öğrenci kaldı</div><div id="kura-ad" style="font-family:var(--f-disp);font-size:clamp(30px,8vw,56px);font-weight:700;margin:18px 0;min-height:1.3em">${son ? esc(son.ad) : '—'}</div><div class="num muted" style="margin-bottom:16px">${son ? 'No ' + esc(son.no) : 'Kimin söz alacağını rastgele seçin.'}</div><div class="row" style="justify-content:center"><button class="btn primary" data-act="kura-cek" style="font-size:17px;padding:12px 22px">Öğrenci çek</button><button class="btn" data-act="kura-sifirla">Sıfırla</button></div><p class="note" style="margin-top:12px">Çekilen öğrenci, herkes çekilene kadar tekrar gelmez.</p></section>` : '');
  } else if (tab === 'grup') {
    const sel = stSinifSel(); const s = Store.get(S.stSinif); const gr = S.gruplar && S.gruplar.sid === S.stSinif ? S.gruplar.list : null;
    body = sel + (s ? `<section class="card"><div class="row"><div class="field" style="width:150px"><label for="gr-n">Grup sayısı</label><input class="inp" id="gr-n" type="number" min="2" max="15" value="${S.grN || 5}"></div><button class="btn primary" data-act="grup-yap" style="align-self:flex-end">Grupları oluştur</button>${gr ? `<button class="btn" data-act="grup-yazdir" style="align-self:flex-end">Yazdır</button>` : ''}</div>
      ${gr ? `<div class="grid g3" style="margin-top:14px">${gr.map((g, i) => `<div class="card" style="padding:12px"><h3>${i + 1}. grup</h3>${g.map(o => `<div>${esc(o.ad)}</div>`).join('')}</div>`).join('')}</div>` : ''}</section>` : '');
  } else if (tab === 'sure') {
    const T = S.timer || (S.timer = { kalan:300, top:300, run:false });
    body = `<section class="card" style="text-align:center;padding:28px 18px"><div id="sure-d" class="num" style="font-size:clamp(56px,18vw,120px);font-weight:500;line-height:1">${fmtSure(T.kalan)}</div><div class="row" style="justify-content:center;margin:18px 0">${[1, 2, 3, 5, 10, 15, 20, 40].map(m => `<button class="btn sm" data-act="sure-set" data-k="${m}">${m} dk</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn primary" data-act="sure-bas" id="sure-bas" style="font-size:17px;padding:12px 26px">${T.run ? 'Durdur' : 'Başlat'}</button><button class="btn" data-act="sure-sifir">Sıfırla</button></div><p class="note" style="margin-top:12px">Süre bitince sesli uyarı verir. Etkinlik, okuma ve sınav sürelerinde kullanın.</p></section>`;
  } else if (tab === 'okuma') {
    const sel = stSinifSel(); const s = Store.get(S.stSinif); const O = S.okuma || (S.okuma = { ogr:'', basla:0, sure:0 });
    const kay = s ? ((Store.get('okumahiz_' + s.id) || {}).kayit || []) : [];
    const son = {}; for (const k of kay) son[k.ogrId] = k;
    body = sel + (s ? `<section class="card"><h2>Sesli okuma hızı ölçümü</h2><p class="note" style="margin-bottom:12px">Metnin kelime sayısını girin (ya da metni yapıştırın, sayılsın). Öğrenci okumaya başlayınca "Başlat", bitirince "Bitir"e basın; hatalı okunan kelime sayısını girin.</p>
      <div class="fgrid"><div class="field"><label for="ok-ogr">Öğrenci</label><select class="inp" id="ok-ogr" data-in="ok-ogr"><option value="">Seçin</option>${(s.ogr || []).map(o => `<option value="${o.id}" ${o.id === O.ogr ? 'selected' : ''}>${esc(o.no)} ${esc(o.ad)}</option>`).join('')}</select></div>
        <div class="field"><label for="ok-kelime">Metindeki kelime sayısı</label><input class="inp num" id="ok-kelime" data-in="ok-kelime" inputmode="numeric" value="${esc(S.okKelime || '')}"></div>
        <div class="field"><label for="ok-hata">Hatalı okunan kelime</label><input class="inp num" id="ok-hata" inputmode="numeric" value="0"></div></div>
      <details style="margin-top:8px"><summary class="note" style="cursor:pointer">Metni yapıştırıp kelimeleri saydır</summary><textarea class="inp" id="ok-metin" data-in="ok-metin" style="margin-top:6px;font-family:var(--f-body)"></textarea></details>
      <div style="text-align:center;margin:16px 0"><div id="ok-sure" class="num" style="font-size:48px">${fmtSure(Math.round(O.sure))}</div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn primary" data-act="ok-bas" id="ok-bas" style="padding:12px 24px;font-size:16px">${O.basla ? 'Bitir' : 'Başlat'}</button><button class="btn" data-act="ok-kaydet">Sonucu kaydet</button></div><div id="ok-sonuc" class="note" style="margin-top:8px"></div></div></section>
      <section class="card" style="padding:0"><div class="row between" style="padding:14px 16px"><h3 style="margin:0">${esc(s.ad)} son ölçümler</h3><button class="btn sm" data-act="ok-excel">${icon('down')}Excel</button></div><div class="tablewrap" style="border-radius:0;border-left:0;border-right:0"><table class="t"><thead><tr><th class="sticky">Öğrenci</th><th>Tarih</th><th>Kelime</th><th>Süre</th><th>Hata</th><th>Doğru kelime / dk</th><th>Doğruluk</th><th>Ölçüm sayısı</th></tr></thead><tbody>${(s.ogr || []).map(o => { const k = son[o.id]; const n = kay.filter(x => x.ogrId === o.id).length; return `<tr><td class="sticky nm">${esc(o.ad)}</td>${k ? `<td class="num">${fmtD(k.tarih)}</td><td class="num">${k.kelime}</td><td class="num">${fmtSure(Math.round(k.sure))}</td><td class="num">${k.hata}</td><td class="num"><b>${okWpm(k)}</b></td><td class="num">%${okAcc(k)}</td>` : '<td colspan="6" class="muted">—</td>'}<td class="num">${n}</td></tr>`; }).join('')}</tbody></table></div></section>` : '');
  }
  return `${banner()}<div class="pagehead"><div><h1>Sınıfta</h1><p>Ders sırasında ihtiyaç duyduğunuz araçlar: bugünkü dersleriniz, yoklama, kura, grup oluşturma, süre tutma ve okuma hızı ölçümü.</p></div></div>
  <div class="chips">${ST_TABS.map(([k, t]) => `<button class="chip" data-act="st-tab" data-k="${k}" aria-pressed="${tab === k}">${t}</button>`).join('')}</div>${body}`;
};
const fmtSure = s => pad(Math.floor(s / 60)) + ':' + pad(s % 60);
const isoDay = off => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
const okWpm = k => Math.round(Math.max(0, k.kelime - k.hata) / Math.max(k.sure / 60, 1 / 60));
const okAcc = k => k.kelime ? Math.round(Math.max(0, k.kelime - k.hata) / k.kelime * 100) : 0;
let sureT = null, okT = null, audioCtx = null;
function bip() { try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); [0, .35, .7].forEach(t => { const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination); g.gain.setValueAtTime(.25, audioCtx.currentTime + t); g.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + t + .3); o.start(audioCtx.currentTime + t); o.stop(audioCtx.currentTime + t + .3); }); if (navigator.vibrate) navigator.vibrate([300, 150, 300]); } catch (e) {} }

/* ---- Sınav analizi ---- */
PAGES.sinavlar = () => { const list = Store.list('sinav').sort((a, b) => (b.guncelleme || 0) - (a.guncelleme || 0));
  return `<div><button class="btn ghost sm" data-act="open-modul" data-id="olcme">${icon('back')}Ölçme ve Değerlendirme</button></div>
  <div class="pagehead"><div><h1>Sınav Analizi</h1><p>Öğrencilerin her sorudan aldığı puanı girin; sınıf ortalaması, soru başarı yüzdeleri ve telafi gereken öğrenme çıktıları otomatik çıkar. Analiz raporunu yazdırabilir, puanları Excel'e aktarabilirsiniz.</p></div><button class="btn primary" data-act="sv-yeni">${icon('plus')}Yeni sınav analizi</button></div>
  ${list.length ? `<section class="card" style="padding:6px 16px"><div class="list">${list.map(x => `<button class="li" data-act="open-sinav" data-id="${x.id}">${icon('cizelgeler')}<span class="t"><b>${esc(x.ad)}</b><small>${esc(sinifAd(x.sinifId))} · ${(x.sorular || []).length} soru · ${fmtD(x.guncelleme)}</small></span></button>`).join('')}</div></section>` : `<div class="empty"><b>Henüz sınav analizi yok</b><span>Sınavdan sonra puanları girerek ilk analizinizi oluşturun.</span></div>`}`; };
function svStat(x) {
  const s = Store.get(x.sinifId); const ogr = s ? s.ogr || [] : []; const max = (x.sorular || []).reduce((a, q) => a + (+q.p || 0), 0);
  const top = o => ((x.puan || {})[o.id] || []).reduce((a, v) => a + (parseFloat(v) || 0), 0);
  const girilen = ogr.filter(o => ((x.puan || {})[o.id] || []).some(v => v !== '' && v != null));
  const toplamlar = girilen.map(top); const ort = toplamlar.length ? toplamlar.reduce((a, b) => a + b, 0) / toplamlar.length : 0;
  const soru = (x.sorular || []).map((q, i) => { const vals = girilen.map(o => parseFloat(((x.puan || {})[o.id] || [])[i]) || 0); return { ...q, i, yuzde:vals.length && q.p ? Math.round(vals.reduce((a, b) => a + b, 0) / (vals.length * q.p) * 100) : 0 }; });
  return { s, ogr, max, top, girilen, ort, en:toplamlar.length ? Math.max(...toplamlar) : 0, ek:toplamlar.length ? Math.min(...toplamlar) : 0, basarili:toplamlar.filter(t => max && t / max >= .5).length, soru };
}
PAGES.sinav = () => {
  const x = Store.get(S.pid); if (!x) return '<div class="empty"><b>Sınav bulunamadı</b></div>'; const st = svStat(x); const { ogr } = st;
  return `<div><button class="btn ghost sm" data-act="nav" data-p="sinavlar">${icon('back')}Sınav analizleri</button></div>
  <div class="pagehead"><div style="flex:1;min-width:min(100%,280px)"><input class="inp" id="sv-ad" data-in="sv-ad" value="${esc(x.ad)}" style="font-family:var(--f-disp);font-size:21px;font-weight:700"><p>${esc(st.s ? st.s.ad : '')} · ${ogr.length} öğrenci · toplam ${st.max} puan</p></div>
    <div class="row"><button class="btn primary" data-act="sv-rapor">Analiz raporu yazdır</button><button class="btn" data-act="pk-sinav">Şablon olarak gönder</button><button class="btn" data-act="sv-excel">${icon('down')}Excel</button></div></div>
  <div class="stats" style="grid-template-columns:repeat(4,minmax(0,1fr))"><div class="stat"><b>${Math.round(st.ort * 10) / 10}</b><span>Ortalama</span></div><div class="stat"><b>${st.en}</b><span>En yüksek</span></div><div class="stat"><b>${st.ek}</b><span>En düşük</span></div><div class="stat"><b>${st.basarili}/${st.girilen.length}</b><span>%50 ve üstü</span></div></div>
  ${anahtarKart(x)}
  <div class="tablewrap"><table class="t" id="sv-t"><thead><tr><th class="sticky">Öğrenci</th>${x.sorular.map((q, i) => `<th class="colh" data-act="sv-soru" data-i="${i}">S${i + 1}<span class="tp">${q.p} p${q.ck ? ' · ' + esc(q.ck) : ''}</span></th>`).join('')}<th>Toplam</th></tr></thead><tbody>
  ${ogr.map(o => `<tr><td class="sticky nm" data-act="sv-detay" data-o="${o.id}" style="cursor:pointer"><span class="num muted" style="font-size:12px">${esc(o.no)}</span> ${esc(o.ad)}${((x.geri || {})[o.id] || {}).yz ? ' <span class="pill warn">YZ</span>' : (x.geri || {})[o.id] ? ' <span class="pill ok">✓</span>' : ''}</td>${x.sorular.map((q, i) => `<td><input id="sv-${o.id}-${i}" data-in="sv-p" data-o="${o.id}" data-i="${i}" inputmode="decimal" value="${esc(((x.puan || {})[o.id] || [])[i] ?? '')}" style="min-width:44px"></td>`).join('')}<td class="sum" id="svt-${o.id}">${((x.puan || {})[o.id] || []).some(v => v !== '' && v != null) ? st.top(o) : ''}</td></tr>`).join('')}
  </tbody><tfoot><tr><td class="sticky" style="text-align:left">Başarı %</td>${st.soru.map(q => `<td style="${q.yuzde < 50 && st.girilen.length ? 'color:var(--red);font-weight:600' : ''}">%${q.yuzde}</td>`).join('')}<td></td></tr></tfoot></table></div>
  <div class="row"><button class="btn sm" data-act="sv-soruekle">+ Soru ekle</button><button class="btn sm" data-act="sv-hepsi">Hücreleri yenile</button><span style="flex:1"></span><button class="btn danger sm" data-act="sv-sil">${icon('trash')}Sil</button></div>
  ${st.girilen.length ? `<section class="card"><h3>Telafi gereken sorular (%50 altı)</h3>${st.soru.filter(q => q.yuzde < 50).length ? `<ul>${st.soru.filter(q => q.yuzde < 50).map(q => `<li>${q.i + 1}. soru · %${q.yuzde}${q.ck ? ' · ' + esc(q.ck) : ''}</li>`).join('')}</ul><button class="btn sm" data-act="sv-telafi" style="margin-top:8px">Telafi planı oluştur</button>` : '<p class="muted">Tüm sorularda sınıf başarısı %50 ve üzerinde.</p>'}</section>` : ''}
  <p class="note">Soru başlığına dokunarak puanını, doğru cevabını, ölçütünü ve öğrenme çıktısını düzenleyin. Öğrenci adına dokunarak kâğıt fotoğrafını, cevaplarını, puan gerekçelerini ve geri bildirimini görün. <span class="pill warn">YZ</span> yapay zekâ puanladı, henüz kontrol etmediniz.</p>`;
};
function svRaporHTML(x) { const st = svStat(x); const p = prof(); const zayif = st.soru.filter(q => q.yuzde < 50);
  return `${H2(p, esc(up(x.ad)) + '<br>SINAV ANALİZ RAPORU')}<table><tr><th>Ders</th><td>${esc(p.brans)}</td><th>Sınıf</th><td>${esc(st.s ? sinifKisa(st.s.ad) : '')}</td></tr><tr><th>Sınava giren</th><td>${st.girilen.length}</td><th>Ortalama</th><td>${Math.round(st.ort * 10) / 10} / ${st.max}</td></tr><tr><th>En yüksek / en düşük</th><td>${st.en} / ${st.ek}</td><th>%50 ve üstü</th><td>${st.basarili}</td></tr></table>
  <h3>Soru analizi</h3><table><tr><th>Soru</th><th>Puan</th><th>Öğrenme çıktısı</th><th>Sınıf başarısı</th><th>Durum</th></tr>${st.soru.map(q => `<tr><td>${q.i + 1}</td><td>${q.p}</td><td>${esc(q.ck || '')}</td><td>%${q.yuzde}</td><td>${q.yuzde < 50 ? 'Telafi gerekli' : 'Yeterli'}</td></tr>`).join('')}</table>
  <h3>Öğrenci puanları</h3><table><tr><th>No</th><th>Adı soyadı</th>${x.sorular.map((_, i) => `<th>${i + 1}</th>`).join('')}<th>Toplam</th></tr>${st.ogr.map(o => `<tr><td>${esc(o.no)}</td><td>${esc(o.ad)}</td>${x.sorular.map((_, i) => `<td>${esc(((x.puan || {})[o.id] || [])[i] ?? '')}</td>`).join('')}<td>${((x.puan || {})[o.id] || []).some(v => v !== '' && v != null) ? st.top(o) : 'girmedi'}</td></tr>`).join('')}</table>
  <h3>Sonuç ve telafi</h3><p>${zayif.length ? `${zayif.map(q => q.i + 1).join(', ')}. sorularda sınıf başarısı %50'nin altında kalmıştır. İlgili öğrenme çıktılarına yönelik telafi çalışması yapılacaktır.` : 'Tüm sorularda sınıf başarısı %50 ve üzerindedir.'}</p>${imzaBen(p)}${onay(p)}`; }

/* ---- Ajanda (Ana Sayfa) ---- */
function ajandaHTML() { const list = Store.list('gorev').filter(x => !x.bitti).sort((a, b) => (a.tarih || '9').localeCompare(b.tarih || '9')).slice(0, 8); const t0 = isoDay(0);
  return `<section class="card"><h2>Ajanda</h2><div class="row" style="margin-bottom:8px;flex-wrap:nowrap"><input class="inp" id="ag-t" placeholder="Yeni iş (ör. 6A proje teslimi)" style="flex:1"><input class="inp" type="date" id="ag-d" value="${t0}" style="width:auto"><button class="btn primary" data-act="ag-ekle" aria-label="Ekle">${icon('plus')}</button></div>
  ${list.length ? list.map(x => `<div class="check"><button class="box" data-act="ag-bitti" data-id="${x.id}" aria-label="Tamamlandı"></button><div style="flex:1;min-width:0">${esc(x.baslik)}<br><small style="color:${x.tarih && x.tarih < t0 ? 'var(--red)' : 'var(--muted)'}">${x.tarih ? fmtD(dParse(x.tarih)) + (x.tarih < t0 ? ' · gecikti' : x.tarih === t0 ? ' · bugün' : '') : 'tarihsiz'}</small></div><button class="btn ghost sm" data-act="ag-sil" data-id="${x.id}" aria-label="Sil">${icon('x')}</button></div>`).join('') : '<p class="muted">Yaklaşan iş yok.</p>'}</section>`; }
function bugunKart() { const b = bugunDersler(); const s = b.list.find(x => x.simdi) || b.list.find(x => !x.gecti);
  return `<section class="card"><div class="row between"><h2 style="margin:0">Bugün</h2><button class="btn sm" data-act="nav" data-p="sinifta">Sınıfta</button></div><p style="margin-top:8px">${b.list.length ? `${b.list.length} dersiniz var.${s ? ` ${s.simdi ? 'Şu an' : 'Sıradaki'}: <b>${esc(s.ders)}</b> (${s.i + 1}. ders, ${esc(s.sa[0])})` : ' Bugünkü dersler bitti.'}` : '<span class="muted">Ders programınızı Sınıfta › Ders programı bölümüne girerseniz bugünkü dersleriniz burada görünür.</span>'}</p></section>`; }
{ const _pano = PAGES.pano; PAGES.pano = () => { const h = _pano(); const i = h.indexOf('<div class="grid g2">'); return i < 0 ? h : h.slice(0, i) + `<div class="grid g2">${bugunKart()}${ajandaHTML()}</div>` + h.slice(i); }; }

/* ---- Gezi izin belgeleri ---- */
function geziModal() { const sn = siniflar();
  openModal('Gezi veli izin belgeleri', `<p class="note">Bilgileri girin; seçtiğiniz sınıftaki her öğrenci için adı ve veli bilgisi yazılı izin belgesi, ayrıca gezi öğrenci listesi hazırlanır.</p>
    <div class="fgrid"><div class="field"><label for="gz-s">Sınıf</label><select class="inp" id="gz-s">${sn.map(s => `<option value="${s.id}">${esc(s.ad)}</option>`).join('')}</select></div><div class="field"><label for="gz-yer">Gezi yeri</label><input class="inp" id="gz-yer"></div><div class="field"><label for="gz-tarih">Tarih</label><input class="inp" type="date" id="gz-tarih"></div><div class="field"><label for="gz-saat">Çıkış – dönüş saati</label><input class="inp" id="gz-saat" placeholder="09:00 – 15:00"></div><div class="field"><label for="gz-ulasim">Ulaşım</label><input class="inp" id="gz-ulasim" placeholder="Okul servisi"></div><div class="field"><label for="gz-ucret">Ücret</label><input class="inp" id="gz-ucret" placeholder="Ücretsiz"></div><div class="field" style="grid-column:1/-1"><label for="gz-sorumlu">Sorumlu öğretmenler</label><input class="inp" id="gz-sorumlu" value="${esc(prof().ad)}"></div></div>`,
    `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="gezi-yazdir">Belgeleri yazdır</button>`, true); }

/* ---- Öğrenci/sınıf seçerek belge oluşturma ---- */
function evPicker(t) { const sn = siniflar(); if (!sn.length) { toast('Önce sınıf listesi yükleyin.'); return; }
  const sid = S.evpS && Store.get(S.evpS) ? S.evpS : (rehberSinif() || sn[0]).id; S.evpS = sid; S.evpT = t.k; const s = Store.get(sid);
  openModal(esc(t.ad), `${sn.length > 1 ? `<div class="chips">${sn.map(x => `<button class="chip" data-act="evp-s" data-k="${x.id}" aria-pressed="${x.id === sid}">${esc(x.ad)}</button>`).join('')}</div>` : ''}
    ${t.ogr ? `<p class="note">Öğrenci seçin; bilgileri belgeye otomatik yazılır.</p><div class="list">${(s.ogr || []).map(o => `<button class="li" data-act="ev-new" data-k="${t.k}" data-s="${s.id}" data-o="${o.id}"><span class="num muted" style="width:44px">${esc(o.no)}</span><span class="t"><b>${esc(o.ad)}</b>${obF(o.id).ozelDurum ? `<small style="color:var(--red)">${esc(obF(o.id).ozelDurum)}</small>` : ''}</span></button>`).join('')}</div>` : `<button class="btn primary" data-act="ev-new" data-k="${t.k}" data-s="${s.id}">${esc(s.ad)} için oluştur</button>`}`); }

/* ---- Olaylar ---- */
Object.assign(ACT, {
  'open-modul': b => { closeModal(); go('modul', b.dataset.id); },
  'open-sinav': b => go('sinav', b.dataset.id),
  'rb-oturma': () => { const s = rehberSinif(); if (!s) { toast('Önce sınıf oluşturun.'); return; } S.seat = null; go('oturma', s.id); },
  'rb-liste-git': b => { const s = rehberSinif(); if (!s) { toast('Önce sınıf oluşturun.'); return; } S.rbSinif = s.id; ACT['rb-liste']({ dataset:{ k:b.dataset.k }, textContent:'Veli iletişim listesi' }); },
  'gezi-izin': () => { if (!siniflar().length) { toast('Önce sınıf listesi yükleyin.'); return; } geziModal(); },
  'gezi-yazdir': () => { const s = Store.get($('#gz-s').value); const p = prof(); const V = {}; for (const k of ['yer','saat','ulasim','ucret','sorumlu']) V[k] = esc($('#gz-' + k).value.trim() || '…'); const v = k => V[k]; const tarih = $('#gz-tarih').value ? fmtD(dParse($('#gz-tarih').value)) : '…/…/20…';
    const sayfa = o => { const f = obF(o.id); return `${baslik(p)}<h2 style="text-align:center">GEZİ VELİ İZİN BELGESİ</h2><table><tr><th>Gezi yeri</th><td>${v('yer')}</td><th>Tarih</th><td>${tarih}</td></tr><tr><th>Çıkış – dönüş</th><td>${v('saat')}</td><th>Ulaşım</th><td>${v('ulasim')}</td></tr><tr><th>Ücret</th><td>${v('ucret')}</td><th>Sorumlu öğretmen(ler)</th><td>${v('sorumlu')}</td></tr></table><p>Velisi bulunduğum <b>${esc(sinifKisa(s.ad))}</b> sınıfı <b>${esc(o.no)}</b> numaralı <b>${esc(o.ad)}</b> adlı öğrencinin yukarıda bilgileri yazılı geziye katılmasına</p><p>☐ İzin veriyorum &nbsp;&nbsp;&nbsp; ☐ İzin vermiyorum</p><table><tr><th>Velinin adı soyadı</th><td>${esc(f.veliAd || '')}</td></tr><tr><th>Telefonu</th><td>${esc(f.veliTel || '')}</td></tr><tr><th>Öğrencinin sağlık durumu / kullandığı ilaç</th><td>${esc(f.saglik || '')}</td></tr><tr><th>Tarih / İmza</th><td><br><br></td></tr></table>`; };
    const liste = `${baslik(p)}<h2 style="text-align:center">GEZİ ÖĞRENCİ LİSTESİ</h2><p style="text-align:center">${v('yer')} · ${tarih}</p><table><tr><th>S.No</th><th>No</th><th>Adı soyadı</th><th>Veli tel.</th><th>İzin</th><th>Katıldı</th></tr>${(s.ogr || []).map((o, i) => `<tr><td>${i + 1}</td><td>${esc(o.no)}</td><td>${esc(o.ad)}</td><td>${esc(obF(o.id).veliTel || '')}</td><td></td><td></td></tr>`).join('')}</table>${imzaTablo([v('sorumlu') + '<br>Sorumlu Öğretmen'])}${onay(p)}`;
    closeModal(); printHTML(s.ad + ' Gezi İzin Belgeleri', liste + (s.ogr || []).map(o => `<div class="pb">${sayfa(o)}</div>`).join('')); },
  'nobet-ayar': () => { const nb = ayar().nobet || {}; openModal('Nöbet bilgim', `<div class="fgrid"><div class="field"><label for="nb-gun">Nöbet günü</label><select class="inp" id="nb-gun"><option value="">—</option>${GUNLER.map(g => `<option ${nb.gun === g ? 'selected' : ''}>${g}</option>`).join('')}</select></div><div class="field"><label for="nb-yer">Nöbet yeri</label><input class="inp" id="nb-yer" value="${esc(nb.yer || '')}" placeholder="ör. Bahçe, 2. kat koridor"></div></div>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="nobet-kaydet">Kaydet</button>`); },
  'nobet-kaydet': () => { const a = ayar(); Store.put('ayar', { ...a, type:'ayar', nobet:{ gun:$('#nb-gun').value, yer:$('#nb-yer').value.trim() } }, true); closeModal(); render(); toast('Nöbet bilginiz kaydedildi.'); },
  'evp-s': b => { S.evpS = b.dataset.k; evPicker(EV_TPL.find(t => t.k === S.evpT)); },
  'st-tab': b => { S.stTab = b.dataset.k; if (S.page !== 'sinifta') go('sinifta'); else render(); },
  'st-sinif': b => { S.stSinif = b.dataset.k; render(); },
  'dp-yazdir': () => printHTML('Ders Programı', dpHTML(prof())),
  'dp-satir': b => { const dp = dpGet(); if (+b.dataset.k > 0) { const l = dp.saatler[dp.saatler.length - 1] || ['08:30', '09:10']; dp.saatler.push([l[1], l[1]]); } else if (dp.saatler.length > 1) dp.saatler.pop(); Store.put('dersprog', dp, true); render(); },
  'yk': b => { const s = Store.get(S.stSinif); const day = S.ykGun || isoDay(0); const yk = Store.get('yoklama_' + s.id) || { type:'yoklama', sinifId:s.id, g:{} }; yk.g = yk.g || {}; const g = yk.g[day] = { ...(yk.g[day] || {}) }; const cur = g[b.dataset.o] || ''; const nx = { '':'y', y:'g', g:'' }[cur]; if (nx) g[b.dataset.o] = nx; else delete g[b.dataset.o]; Store.put('yoklama_' + s.id, yk); render(); },
  'kura-cek': () => { const s = Store.get(S.stSinif); const K = S.kura; let kalan = (s.ogr || []).filter(o => !K.cekilen.includes(o.id)); if (!kalan.length) { K.cekilen = []; kalan = [...(s.ogr || [])]; } if (!kalan.length) return;
    const el = $('#kura-ad'); let n = 0; const iv = setInterval(() => { el.textContent = kalan[Math.floor(Math.random() * kalan.length)].ad; if (++n > 12) { clearInterval(iv); const o = kalan[Math.floor(Math.random() * kalan.length)]; K.son = o.id; K.cekilen.push(o.id); render(); } }, 70); },
  'kura-sifirla': () => { S.kura = { sid:S.stSinif, cekilen:[], son:null }; render(); },
  'grup-yap': () => { const s = Store.get(S.stSinif); const n = Math.max(2, Math.min(15, parseInt($('#gr-n').value) || 5)); S.grN = n; const l = [...(s.ogr || [])]; for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } const g = Array.from({ length:n }, () => []); l.forEach((o, i) => g[i % n].push(o)); S.gruplar = { sid:s.id, list:g }; render(); },
  'grup-yazdir': () => { const s = Store.get(S.stSinif); printHTML(s.ad + ' Gruplar', `${H2(prof(), esc(sinifKisa(s.ad)) + ' SINIFI ÇALIŞMA GRUPLARI')}<table>${S.gruplar.list.map((g, i) => `<tr><th style="width:90px">${i + 1}. grup</th><td>${g.map(o => esc(o.ad)).join(', ')}</td></tr>`).join('')}</table>`); },
  'sure-set': b => { clearInterval(sureT); S.timer = { kalan:+b.dataset.k * 60, top:+b.dataset.k * 60, run:false }; render(); },
  'sure-sifir': () => { clearInterval(sureT); const T = S.timer; T.kalan = T.top; T.run = false; render(); },
  'sure-bas': () => { const T = S.timer; if (T.run) { T.run = false; clearInterval(sureT); render(); return; } if (T.kalan <= 0) T.kalan = T.top; T.run = true; try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} const end = Date.now() + T.kalan * 1000;
    sureT = setInterval(() => { T.kalan = Math.max(0, Math.round((end - Date.now()) / 1000)); const el = $('#sure-d'); if (el) el.textContent = fmtSure(T.kalan); if (T.kalan <= 0) { clearInterval(sureT); T.run = false; bip(); toast('Süre doldu.'); if (S.page === 'sinifta') render(); } }, 250); render(); },
  'ok-bas': () => { const O = S.okuma; if (!O.basla) { O.basla = Date.now(); O.sure = 0; okT = setInterval(() => { O.sure = (Date.now() - O.basla) / 1000; const el = $('#ok-sure'); if (el) el.textContent = fmtSure(Math.round(O.sure)); }, 250); render(); } else { clearInterval(okT); O.sure = (Date.now() - O.basla) / 1000; O.basla = 0; render(); const kel = parseInt($('#ok-kelime').value) || 0; const h = parseInt($('#ok-hata').value) || 0; if (kel) $('#ok-sonuc').textContent = `${okWpm({ kelime:kel, hata:h, sure:O.sure })} doğru kelime/dk · doğruluk %${okAcc({ kelime:kel, hata:h })} — kaydetmek için "Sonucu kaydet"`; } },
  'ok-kaydet': () => { const O = S.okuma; const s = Store.get(S.stSinif); const ogrId = $('#ok-ogr').value; const kelime = parseInt($('#ok-kelime').value) || 0; const hata = parseInt($('#ok-hata').value) || 0;
    if (!ogrId) { toast('Öğrenci seçin.'); return; } if (!kelime) { toast('Kelime sayısını girin.'); return; } if (O.basla || !O.sure) { toast('Önce süreyi başlatıp bitirin.'); return; } if (O.sure < 5) { toast('Süre çok kısa; ölçümü tekrarlayın.'); return; }
    const d = Store.get('okumahiz_' + s.id) || { type:'okumahiz', sinifId:s.id, kayit:[] }; d.kayit = [...(d.kayit || []), { ogrId, tarih:Date.now(), kelime, hata, sure:Math.round(O.sure * 10) / 10 }]; Store.put('okumahiz_' + s.id, d, true);
    const k = d.kayit[d.kayit.length - 1]; toast(`Kaydedildi: ${okWpm(k)} doğru kelime/dk, doğruluk %${okAcc(k)}`, 4000); O.sure = 0; O.ogr = ''; render(); },
  'ok-excel': async () => { const s = Store.get(S.stSinif); const kay = (Store.get('okumahiz_' + s.id) || {}).kayit || []; if (!kay.length) { toast('Henüz ölçüm yok.'); return; } const byId = Object.fromEntries((s.ogr || []).map(o => [o.id, o]));
    const aoa = [['No', 'Adı Soyadı', 'Tarih', 'Kelime', 'Süre (sn)', 'Hata', 'Doğru kelime/dk', 'Doğruluk %'], ...kay.map(k => [((byId[k.ogrId] || {}).no) || '', ((byId[k.ogrId] || {}).ad) || '', fmtD(k.tarih), k.kelime, k.sure, k.hata, okWpm(k), okAcc(k)])];
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Okuma hızı'); await saveFile(safeName(s.ad + ' okuma hızı') + '.xlsx', new Blob([XLSX.write(wb, { type:'array', bookType:'xlsx' })])); },
  'sv-yeni': () => { const sn = siniflar(); if (!sn.length) { toast('Önce sınıf listesi yükleyin.'); return; }
    openModal('Yeni sınav analizi', `<div class="fgrid"><div class="field"><label for="svn-ad">Sınav adı</label><input class="inp" id="svn-ad" value="1. Dönem 1. Yazılı"></div><div class="field"><label for="svn-s">Sınıf</label><select class="inp" id="svn-s">${sn.map(s => `<option value="${s.id}">${esc(s.ad)}</option>`).join('')}</select></div><div class="field"><label for="svn-n">Soru sayısı</label><input class="inp" id="svn-n" type="number" min="1" max="40" value="10"></div><div class="field"><label for="svn-p">Her sorunun puanı</label><input class="inp" id="svn-p" type="number" min="1" value="10"></div></div><p class="note">Soru puanlarını ve öğrenme çıktılarını sonra tek tek değiştirebilirsiniz.</p>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="sv-olustur">Oluştur</button>`); },
  'sv-olustur': () => { const n = Math.max(1, Math.min(40, parseInt($('#svn-n').value) || 10)); const pp = parseFloat($('#svn-p').value) || 10; const s = Store.get($('#svn-s').value); const id = rid('sinav');
    Store.put(id, { type:'sinav', ad:($('#svn-ad').value.trim() || 'Sınav') + ' · ' + s.ad, sinifId:s.id, sorular:Array.from({ length:n }, () => ({ p:pp, ck:'' })), puan:{}, tarih:Date.now() }, true); closeModal(); go('sinav', id); },
  'sv-soru': b => { const x = Store.get(S.pid); const i = +b.dataset.i; const q = x.sorular[i];
    openModal(`${i + 1}. soru`, `<div class="fgrid"><div class="field"><label for="sq-p">Puanı</label><input class="inp" id="sq-p" type="number" value="${q.p}"></div><div class="field"><label for="sq-ck">Öğrenme çıktısı (isteğe bağlı)</label><input class="inp" id="sq-ck" value="${esc(q.ck || '')}" placeholder="ör. T.O.6.3"></div></div>`, `<button class="btn danger" data-act="sq-sil" data-i="${i}">Soruyu sil</button><span style="flex:1"></span><button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="sq-kaydet" data-i="${i}">Kaydet</button>`); },
  'sq-kaydet': b => { const x = Store.get(S.pid); const i = +b.dataset.i; x.sorular[i] = { p:parseFloat($('#sq-p').value) || 0, ck:$('#sq-ck').value.trim() }; Store.put(x.id, x, true); closeModal(); render(); },
  'sq-sil': b => { const x = Store.get(S.pid); const i = +b.dataset.i; x.sorular.splice(i, 1); for (const k in x.puan || {}) (x.puan[k] || []).splice(i, 1); Store.put(x.id, x, true); closeModal(); render(); },
  'sv-soruekle': () => { const x = Store.get(S.pid); const l = x.sorular[x.sorular.length - 1]; x.sorular.push({ p:l ? l.p : 10, ck:'' }); Store.put(x.id, x, true); render(); },
  'sv-hepsi': () => render(),
  'sv-rapor': () => { const x = Store.get(S.pid); printHTML(x.ad + ' Analiz', svRaporHTML(x)); },
  'sv-excel': async () => { const x = Store.get(S.pid); const st = svStat(x); const aoa = [[x.ad], [], ['No', 'Adı Soyadı', ...x.sorular.map((q, i) => `S${i + 1} (${q.p})`), 'Toplam'], ...st.ogr.map(o => [o.no, o.ad, ...x.sorular.map((_, i) => { const v = ((x.puan || {})[o.id] || [])[i]; return v === '' || v == null ? '' : parseFloat(v); }), st.top(o)]), [], ['', 'Başarı %', ...st.soru.map(q => q.yuzde)]];
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), 'Analiz'); await saveFile(safeName(x.ad) + '.xlsx', new Blob([XLSX.write(wb, { type:'array', bookType:'xlsx' })])); },
  'sv-telafi': () => { const x = Store.get(S.pid); const st = svStat(x); const p = prof(); const z = st.soru.filter(q => q.yuzde < 50); const id = rid('evrak');
    Store.put(id, { type:'evrak', baslik:'Telafi Planı · ' + x.ad, kategori:'Ölçme-Değerlendirme', sinifId:x.sinifId, sablon:'telafi', olusturma:Date.now(), html:`${H2(p, esc(up(p.brans)) + ' DERSİ SINAV SONRASI TELAFİ PLANI')}<table><tr><th>Sınav</th><td>${esc(x.ad)}</td><th>Sınıf ortalaması</th><td>${Math.round(st.ort * 10) / 10} / ${st.max}</td></tr></table><table><tr><th>Soru</th><th>Öğrenme çıktısı</th><th>Başarı %</th><th>Yapılacak telafi çalışması</th><th>Tarih</th></tr>${z.map(q => `<tr><td>${q.i + 1}</td><td>${esc(q.ck || '')}</td><td>%${q.yuzde}</td><td></td><td></td></tr>`).join('')}</table>${imzaBen(p)}` }, true); go('evrak', id); },
  'sv-sil': () => { const x = Store.get(S.pid); ask(`<b>${esc(x.ad)}</b> analizi silinecek.`, 'Sil', () => { Store.remove(x.id); go('sinavlar'); }); },
  'ag-ekle': () => { const t = $('#ag-t').value.trim(); if (!t) { toast('İşi yazın.'); return; } Store.put(rid('gorev'), { type:'gorev', baslik:t, tarih:$('#ag-d').value || '', bitti:false }, true); render(); },
  'ag-bitti': b => { const x = Store.get(b.dataset.id); Store.put(x.id, { ...x, bitti:true }, true); toast('Tamamlandı: ' + x.baslik); render(); },
  'ag-sil': b => { Store.remove(b.dataset.id); render(); }
});
{ const _evNew = ACT['ev-new']; ACT['ev-new'] = b => {
  const t = EV_TPL.find(x => x.k === b.dataset.k) || EV_TPL.find(x => x.k === 'bos');
  if ((t.ogr || t.sinif) && !b.dataset.s) { evPicker(t); return; }
  if (!t.ogr && !t.sinif) { _evNew(b); return; }
  const s = Store.get(b.dataset.s); const o = s && b.dataset.o ? (s.ogr || []).find(x => x.id === b.dataset.o) : null; const p = prof();
  const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:t.ad + (o ? ' · ' + o.ad : s ? ' · ' + s.ad : '') + ' · ' + todayStr(), kategori:t.kat, sinifId:s ? s.id : '', ogrId:o ? o.id : '', sablon:t.k, html:t.f(p, { s, o, f:o ? obF(o.id) : {} }), olusturma:Date.now() }, true);
  closeModal(); go('evrak', id); }; }
document.addEventListener('input', e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'dp-h') { const dp = dpGet(); dp.h = { ...(dp.h || {}), [el.dataset.k]:el.value }; if (!el.value) delete dp.h[el.dataset.k]; Store.put('dersprog', dp); }
  else if (k === 'dp-saat') { const dp = dpGet(); dp.saatler = dp.saatler.map(x => [...x]); dp.saatler[+el.dataset.i][+el.dataset.j] = el.value; Store.put('dersprog', dp); }
  else if (k === 'sv-p') { const x = Store.get(S.pid); const i = +el.dataset.i; const q = x.sorular[i]; let v = el.value.replace(',', '.'); if (v !== '' && parseFloat(v) > q.p) { v = String(q.p); el.value = v; toast(`${i + 1}. sorunun puanı en çok ${q.p}.`); }
    const arr = [...((x.puan || {})[el.dataset.o] || [])]; while (arr.length < x.sorular.length) arr.push(''); arr[i] = v; x.puan = { ...(x.puan || {}), [el.dataset.o]:arr }; Store.put(x.id, x);
    const t = $('#svt-' + el.dataset.o); if (t) t.textContent = arr.some(a => a !== '') ? arr.reduce((a, b) => a + (parseFloat(b) || 0), 0) : ''; }
  else if (k === 'sv-ad') { const x = Store.get(S.pid); Store.put(x.id, { ...x, ad:el.value }); }
  else if (k === 'ok-metin') { const n = el.value.trim() ? el.value.trim().split(/\s+/).length : 0; $('#ok-kelime').value = n || ''; S.okKelime = n || ''; }
  else if (k === 'ok-kelime') S.okKelime = el.value;
});
document.addEventListener('change', e => { const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'yk-gun') { S.ykGun = el.value; render(); }
  else if (k === 'ok-ogr') { S.okuma.ogr = el.value; }
});

/* ---- Müfettiş dosyası: modüllere göre ---- */
function migrateKlasor() { const a = Store.get('ayar'); if (!a) return; const kl = a.klasorler || []; const eksik = KLASOR0.filter(k => !/^Rehberlik/.test(k) && !kl.includes(k)); if (eksik.length) Store.put('ayar', { ...a, klasorler:[...kl, ...eksik] }, true); }
PAGES.mufettis = () => {
  const p = prof(); const ev = evraklar(), dz = dosyalar(); let n = 0;
  const sec = (title, items, ek) => { n++; return `<section><h3><span class="k">${pad(n)}</span>${esc(title)}${ek || ''}</h3><div class="items">${items || '<p class="muted" style="padding-left:28px">Bu bölümde henüz kayıt yok.</p>'}</div></section>`; };
  const it = (act, id, t, sub) => `<button data-act="${act}" data-id="${id}"><span>${esc(t)}</span><small>${esc(sub)}</small></button>`;
  const modKlasor = new Set(MODS.flatMap(m => m.klasor).concat([rehberKlasor()]));
  const digerKl = klasorler().filter(k => !modKlasor.has(k) && dz.some(f => f.klasor === k));
  return `<div class="pagehead"><div><h1>Müfettiş Dosyası</h1><p>Dosyanızın tamamı, mevzuattaki bölümlere göre sıralı. Her satır ilgili belgeyi açar. Tamamını yazdırabilir ya da tek dosya olarak indirebilirsiniz.</p></div>
    <div class="row"><button class="btn primary" data-act="mf-print">Tümünü yazdır / PDF</button><button class="btn" data-act="mf-dl">${icon('down')}Tüm dosyayı indir</button></div></div>
  <div class="dossier">
    <div class="cover"><div class="tc">T.C.<br>${esc(makam(p))}<br>${esc(up(p.okul))} MÜDÜRLÜĞÜ</div><h1>${esc(p.yil)} Eğitim-Öğretim Yılı<br>Öğretmen Dosyası</h1><div style="font-size:17px"><b>${esc(p.ad)}</b> · ${esc(p.brans)} Öğretmeni</div><div class="muted">${p.rehberSinif ? esc(p.rehberSinif) + ' Sınıf Rehber Öğretmeni' : ''}${p.rehberSinif && p.mudur ? ' · ' : ''}${p.mudur ? 'Okul Müdürü: ' + esc(p.mudur) : ''}</div></div>
    <div class="toc">
      ${sec('Millî metinler', `<button data-act="mv-go" data-k="metin"><span>İstiklal Marşı</span><small>10 kıta</small></button><button data-act="mv-go" data-k="metin"><span>Atatürk'ün Gençliğe Hitabesi</span><small>1927</small></button>`)}
      ${sec('Öğretmen bilgileri, ders programı ve takvim', `<button data-act="profil"><span>Kimlik ve görev bilgileri</span><small>${esc(p.okul)}</small></button><button data-act="st-tab" data-k="program"><span>Haftalık ders programı</span><small>${Object.keys(dpGet().h || {}).length ? 'girildi' : 'girilmedi'}</small></button>${(ayar().nobet || {}).gun ? `<button data-act="open-modul" data-id="nobet"><span>Nöbet görevi</span><small>${esc(ayar().nobet.gun)} · ${esc(ayar().nobet.yer || '')}</small></button>` : ''}<button data-act="mv-go" data-k="takvim"><span>Çalışma takvimi</span><small>MEB</small></button>`)}
      ${sec('Sınıf listeleri', siniflar().map(s => it('open-sinif', s.id, s.ad + (s.rehber ? ' (rehber sınıfım)' : ''), (s.ogr || []).length + ' öğrenci')).join(''))}
      ${MODS.map(m => { const d = modDurum(m); let items = '';
        if (m.k === 'rehberlik') items += rbMufettisItems();
        if (m.k === 'olcme') items += Store.list('sinav').map(x => it('open-sinav', x.id, 'Sınav analizi · ' + x.ad, fmtD(x.guncelleme))).join('') + cizelgeler().map(c => it('open-cizelge', c.id, c.ad, sinifAd(c.sinifId))).join('');
        items += ev.filter(e => m.kat.includes(e.kategori)).map(e => it('open-evrak', e.id, e.baslik, fmtD(e.guncelleme))).join('');
        items += dz.filter(f => m.klasor.includes(f.klasor) || (m.k === 'rehberlik' && f.klasor === rehberKlasor())).map(f => it('dz-open', f.id, f.ad, f.klasor)).join('');
        return sec(m.ad, items, d.n ? ` <span class="pill ${d.ok === d.n ? 'ok' : 'warn'}" style="margin-left:auto">${d.ok}/${d.n}</span>` : ''); }).join('')}
      ${digerKl.length ? sec('Diğer yüklenen belgeler', digerKl.map(k => `<div style="padding:6px 0 2px 28px" class="eyebrow">${esc(k)}</div>` + dz.filter(f => f.klasor === k).map(f => it('dz-open', f.id, f.ad, fmtSize(f.boyut || 0))).join('')).join('')) : ''}
      ${sec('Mevzuat', `<button data-act="mv-go" data-k="kanun"><span>Kanunlar</span><small>${MEVZUAT.filter(l => l.g === 'Kanun').length} kanun</small></button><button data-act="mv-go" data-k="yonetmelik"><span>Yönetmelikler</span><small>${MEVZUAT.filter(l => l.g === 'Yönetmelik').length} yönetmelik</small></button><button data-act="mv-go" data-k="maarif"><span>Türkiye Yüzyılı Maarif Modeli</span><small>tymm.meb.gov.tr</small></button>`)}
    </div></div>`;
};

/* ===================== Meslektaşlarla paylaşma (paket dosyaları) ===================== */
function kisiAdlari() { const set = new Set(); for (const s of siniflar()) for (const o of s.ogr || []) { if (o.ad && o.ad.trim().length > 3) set.add(o.ad.trim()); const f = obF(o.id); for (const k of ['veliAd','anneAd','babaAd']) if (f[k] && f[k].trim().length > 3) set.add(f[k].trim()); for (const k of ['veliTel','anneTel','babaTel']) if (f[k] && f[k].replace(/\D/g, '').length >= 7) set.add(f[k].trim()); } return [...set].sort((a, b) => b.length - a.length); }
function kisiVarMi(html) { return kisiAdlari().some(n => html.includes(esc(n)) || html.includes(n)); }
function kisiCikar(html) { for (const n of kisiAdlari()) { html = html.split(esc(n)).join('…').split(n).join('…'); } return html; }
async function paketGonder(baslikT, oge) {
  const p = prof(); const json = JSON.stringify({ app:'ogretmen-dosyam', tur:'paket', surum:1, gonderen:p.ad, okul:p.okul, tarih:Date.now(), oge });
  const ad = safeName(baslikT).replace(/\s+/g, '-').slice(0, 60) + '.odpaket.json';
  const file = new File([json], ad, { type:'application/json' });
  const text = `${p.ad} size Öğretmen Dosyam'dan "${baslikT}" gönderdi. Dosyayı uygulamada Evraklar › "Gelen dosyayı aç" ile açın. Uygulama: ${location.origin + location.pathname}`;
  try { if (navigator.canShare && navigator.canShare({ files:[file] })) { await navigator.share({ files:[file], title:baslikT, text }); return; } }
  catch (e) { if (e && e.name === 'AbortError') return; }
  await saveFile(ad, file); toast('Dosya indirildi. WhatsApp veya e-postayla gönderebilirsiniz.', 4500);
}
const ogeEvrak = (e, temiz) => ({ tur:'evrak', baslik:e.baslik, kategori:e.kategori, sablon:e.sablon || '', html:temiz ? kisiCikar(e.html || '') : (e.html || '') });
function evrakPaylas(list) {
  const kisi = list.some(e => kisiVarMi(e.html || ''));
  const baslikT = list.length === 1 ? list[0].baslik : `${list.length} belge`;
  if (!kisi) { paketGonder(baslikT, list.map(e => ogeEvrak(e, false))); return; }
  S.pkList = list.map(e => e.id);
  openModal('Öğrenci bilgisi içeriyor', `<p>Paylaşacağınız belgede öğrenci ya da veli adları, telefonları var. Kişisel veriler (KVKK) nedeniyle bunları çıkararak paylaşmanızı öneririm; adların yerine "…" yazılır.</p>`,
    `<button class="btn" data-act="pk-ev-git" data-k="0">Olduğu gibi paylaş</button><button class="btn primary" data-act="pk-ev-git" data-k="1">Adları çıkararak paylaş</button>`);
}
async function pkAc(text) {
  let j; try { j = JSON.parse(text); } catch (e) { toast('Dosya okunamadı.'); return; }
  if (j && j.kayitlar) { toast('Bu bir yedek dosyası. Profil › "Yedekten geri yükle" ile açın.', 5000); return; }
  if (!j || j.app !== 'ogretmen-dosyam' || !Array.isArray(j.oge) || !j.oge.length) { toast('Bu dosya Öğretmen Dosyam paylaşım dosyası değil.', 4500); return; }
  S.pkGelen = j; const sn = siniflar(); const sinifLazim = j.oge.some(o => o.tur !== 'evrak');
  const tAd = { evrak:'Belge', 'cizelge-sablon':'Çizelge şablonu', 'sinav-sablon':'Sınav şablonu' };
  openModal('Gelen dosya', `<p><b>${esc(j.gonderen || 'Bir meslektaşınız')}</b>${j.okul ? ' (' + esc(j.okul) + ')' : ''} · ${fmtD(j.tarih)}</p>
    <div class="list">${j.oge.map((o, i) => `<label class="li" style="cursor:pointer"><input type="checkbox" id="pk-g-${i}" checked><span class="t"><b>${esc(o.baslik || o.ad || 'Adsız')}</b><small>${tAd[o.tur] || o.tur}${o.kategori ? ' · ' + esc(o.kategori) : ''}${o.cols ? ' · ' + o.cols.length + ' sütun' : ''}${o.sorular ? ' · ' + o.sorular.length + ' soru' : ''}</small></span></label>`).join('')}</div>
    ${sinifLazim ? (sn.length ? `<div class="field"><label for="pk-s">Çizelge ve sınavlar hangi sınıfınıza uygulansın?</label><select class="inp" id="pk-s">${sn.map(s => `<option value="${s.id}">${esc(s.ad)}</option>`).join('')}</select></div>` : '<p class="note" style="color:var(--red)">Çizelge ve sınav şablonları için önce sınıf listesi yükleyin.</p>') : ''}`,
    `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="pk-al">Uygulamama al</button>`);
}
Object.assign(ACT, {
  'pk-evrak': () => { evFlush(); const e = S.edit.d; evrakPaylas([{ ...e, id:S.edit.id }]); },
  'pk-ev-git': b => { const list = (S.pkList || []).map(id => Store.get(id)).filter(Boolean); const temiz = b.dataset.k === '1'; closeModal(); paketGonder(list.length === 1 ? list[0].baslik : `${list.length} belge`, list.map(e => ogeEvrak(e, temiz))); },
  'pk-cizelge': () => { const c = S.edit.d; paketGonder(c.ad + ' (şablon)', [{ tur:'cizelge-sablon', ad:c.ad.replace(/\s·\s[^·]+$/, ''), sablon:c.sablon || '', cols:(c.cols || []).map(x => ({ ad:x.ad, tip:x.tip })) }]); },
  'pk-sinav': () => { const x = Store.get(S.pid); paketGonder(x.ad + ' (şablon)', [{ tur:'sinav-sablon', ad:x.ad.replace(/\s·\s[^·]+$/, ''), sorular:(x.sorular || []).map(q => ({ p:q.p, ck:q.ck || '' })) }]); },
  'pk-toplu': () => { const ev = evraklar(); if (!ev.length) { toast('Paylaşılacak belge yok.'); return; }
    openModal('Belgeleri paylaş', `<p class="note">Zümre tutanağı, plan, performans görevi gibi belgeleri seçin; tek dosya hâlinde gönderilir. Alan kişi kendi uygulamasına tek dokunuşla alır.</p><div class="list">${ev.map(e => `<label class="li" style="cursor:pointer"><input type="checkbox" class="pk-sec" value="${e.id}"><span class="t"><b>${esc(e.baslik)}</b><small>${esc(e.kategori)} · ${fmtD(e.guncelleme)}</small></span></label>`).join('')}</div>`,
      `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="pk-toplu-git">Paylaş</button>`); },
  'pk-toplu-git': () => { const ids = $$('.pk-sec').filter(x => x.checked).map(x => x.value); if (!ids.length) { toast('En az bir belge seçin.'); return; } closeModal(); evrakPaylas(ids.map(id => Store.get(id)).filter(Boolean)); },
  'pk-al': () => { const j = S.pkGelen; if (!j) return; const sid = $('#pk-s') ? $('#pk-s').value : ''; let n = 0, ilk = null;
    j.oge.forEach((o, i) => { if (!$('#pk-g-' + i).checked) return;
      if (o.tur === 'evrak') { const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:(o.baslik || 'Belge') + ` (${j.gonderen || 'paylaşılan'})`, kategori:KATEGORI.includes(o.kategori) ? o.kategori : 'Diğer', sablon:o.sablon || '', sinifId:'', html:String(o.html || '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/\son\w+="[^"]*"/gi, ''), olusturma:Date.now() }, true); n++; ilk = ilk || ['evrak', id]; }
      else if (o.tur === 'cizelge-sablon' && sid) { const s = Store.get(sid); const id = rid('cizelge'); Store.put(id, { type:'cizelge', ad:(o.ad || 'Çizelge') + ' · ' + s.ad, sinifId:sid, sablon:o.sablon || 'bos', cols:(o.cols || []).map(c => ({ id:rid('c'), ad:String(c.ad || ''), tip:TIP[c.tip] ? c.tip : 'check' })), v:{}, olusturma:Date.now() }, true); n++; ilk = ilk || ['cizelge', id]; }
      else if (o.tur === 'sinav-sablon' && sid) { const s = Store.get(sid); const id = rid('sinav'); Store.put(id, { type:'sinav', ad:(o.ad || 'Sınav') + ' · ' + s.ad, sinifId:sid, sorular:(o.sorular || []).map(q => ({ p:+q.p || 10, ck:String(q.ck || '') })), puan:{}, tarih:Date.now() }, true); n++; ilk = ilk || ['sinav', id]; } });
    closeModal(); S.pkGelen = null; toast(n ? `${n} öğe uygulamanıza alındı.` : 'Hiçbir öğe alınmadı.', 4000); if (n === 1 && ilk) go(ilk[0], ilk[1]); else render(); },
  'pk-ac-btn': () => $('#pk-file').click(),
  'dz-paylas': async b => { const f = Store.get(b.dataset.id); try { const bl = await fetchAsset(f); let n = f.ad; if (f.ext && !low(n).endsWith('.' + f.ext)) n += '.' + f.ext; const file = new File([bl], n, { type:bl.type || f.ct || 'application/octet-stream' });
      if (navigator.canShare && navigator.canShare({ files:[file] })) await navigator.share({ files:[file], title:n }); else await saveFile(n, file); } catch (e) { if (!(e && e.name === 'AbortError')) toast('Paylaşılamadı.'); } }
});
document.addEventListener('change', async e => { const el = e.target; if (el.id === 'pk-file' && el.files[0]) { const t = await el.files[0].text(); el.value = ''; pkAc(t); } });
async function paylasilanVarMi() {
  if (!/paylasim=1/.test(location.search)) return;
  try { const c = await caches.open('od-share'); const r = await c.match('./_paylasilan'); history.replaceState(null, '', location.pathname); if (!r) return; const t = await r.text(); await c.delete('./_paylasilan'); pkAc(t); } catch (e) {}
}

/* ===================== Sınav kâğıdı okuma (cevap anahtarı + yapay zekâ puanlama) ===================== */
async function gemini(parts, schema) {
  const a = ayar(); const key = (a.aiKey || '').trim(); if (!key) throw { code:'nokey' };
  const model = (a.aiModel || 'gemini-2.5-flash').trim();
  const body = JSON.stringify({ contents:[{ role:'user', parts }], generationConfig:{ temperature:0, responseMimeType:'application/json', responseSchema:schema } });
  const call = m => fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent`, { method:'POST', headers:{ 'Content-Type':'application/json', 'x-goog-api-key':key }, body });
  let r; try { r = await call(model); if (r.status === 404 && model !== 'gemini-flash-latest') r = await call('gemini-flash-latest'); } catch (e) { throw { code:'net' }; }
  if (!r.ok) { let msg = ''; try { msg = (await r.json()).error.message; } catch (e) {} throw { code:r.status, msg }; }
  const j = await r.json(); const t = ((((j.candidates || [])[0] || {}).content || {}).parts || []).map(p => p.text || '').join('');
  try { return JSON.parse(t); } catch (e) { throw { code:'parse' }; }
}
async function imgPart(blob) { const sb = await shrinkTo(blob, 2000); const du = await readDataURL(sb); return { inline_data:{ mime_type:'image/jpeg', data:du.slice(du.indexOf(',') + 1) } }; }
async function blobPart(blob, mime) { const du = await readDataURL(blob); return { inline_data:{ mime_type:mime, data:du.slice(du.indexOf(',') + 1) } }; }
const S_ANAHTAR = { type:'OBJECT', properties:{ sorular:{ type:'ARRAY', items:{ type:'OBJECT', properties:{ no:{ type:'INTEGER' }, puan:{ type:'NUMBER' }, soru:{ type:'STRING' }, dogruCevap:{ type:'STRING' }, olcut:{ type:'STRING' }, ogrenmeCiktisi:{ type:'STRING' } }, required:['no','puan','dogruCevap'] } } }, required:['sorular'] };
const S_KAGIT = { type:'OBJECT', properties:{ adSoyad:{ type:'STRING' }, okulNo:{ type:'STRING' }, sorular:{ type:'ARRAY', items:{ type:'OBJECT', properties:{ no:{ type:'INTEGER' }, ogrenciCevabi:{ type:'STRING' }, puan:{ type:'NUMBER' }, gerekce:{ type:'STRING' } }, required:['no','puan'] } }, genelGeriBildirim:{ type:'STRING' } }, required:['sorular'] };
function anahtarMetni(x) {
  return (x.sorular || []).map((q, i) => `Soru ${i + 1} (${q.p} puan)${q.ck ? ' [Öğrenme çıktısı: ' + q.ck + ']' : ''}${q.soru ? '\n  Soru: ' + q.soru : ''}\n  Doğru cevap: ${q.cevap || '(belirtilmemiş)'}${q.olcut ? '\n  Puanlama ölçütü: ' + q.olcut : ''}`).join('\n');
}
function kagitPrompt(x) { const p = prof();
  return `Sen Türkiye Yüzyılı Maarif Modeli'ni uygulayan deneyimli bir ${p.brans || 'Türkçe'} öğretmenisin. Aşağıda bir sınavın cevap anahtarı ve puanlama ölçütleri, ardından bir öğrencinin el yazısıyla cevapladığı sınav kâğıdının fotoğrafları var. Kâğıttaki cevapları oku ve her soruyu puanla.

CEVAP ANAHTARI VE ÖLÇÜTLER:
${anahtarMetni(x)}
${x.anahtar && x.anahtar.metin ? '\nÖğretmenin yüklediği cevap anahtarının metni:\n' + x.anahtar.metin.slice(0, 12000) : ''}

PUANLAMA KURALLARI:
- Çoktan seçmeli, doğru-yanlış, eşleştirme ve boşluk doldurma sorularını anahtarla birebir karşılaştır.
- Açık uçlu sorularda dereceli puanlama yap: tam ve doğru cevaba tam puan; kısmen doğru cevaba ölçütlere göre kısmi puan ver. İfade anahtardan farklı olsa da anlamca doğru cevabı kabul et.
- Yazım ve noktalama hataları yalnızca sorunun ölçütü bunu içeriyorsa ya da anahtarda belirtilmişse puanı etkilesin.
- Boş, okunamayan ya da ilgisiz cevaba 0 ver ve gerekçede belirt. Hiçbir soruda o sorunun puanını aşma.
- Her soru için öğrencinin cevabını (ogrenciCevabi) kısaca yaz ve puanın kısa gerekçesini ver.
- adSoyad ve okulNo: kâğıdın üstündeki öğrenci adı ve numarası.
- genelGeriBildirim: öğrenciye hitaben, Maarif Modeli'nin süreç odaklı ve gelişimi destekleyen yaklaşımına uygun, güçlü yönünü ve geliştirmesi gereken beceriyi ya da öğrenme çıktısını belirten, cesaretlendirici 2-3 cümle. Not veya puan tekrar etme.
Puanlar öğretmen tarafından kontrol edilip onaylanacaktır.`;
}
function svDosya(blob, ad) { return (async () => { const r = await Files.upload(blob); const id = rid('dosya'); Store.put(id, { type:'dosya', ad, klasor:'Sınav ve Değerlendirme', assetId:r.id, ct:blob.type || 'image/jpeg', ext:(ad.split('.').pop() || 'jpg').toLowerCase(), b64:false, orjTip:blob.type || '', boyut:blob.size, tarih:Date.now() }, true); return id; })(); }

function anahtarKart(x) {
  const a = x.anahtar || {}; const tam = (x.sorular || []).filter(q => q.cevap).length;
  return `<section class="card"><div class="row between"><h3 style="margin:0">Cevap anahtarı</h3><span class="pill ${tam === x.sorular.length && tam ? 'ok' : 'warn'}">${tam}/${x.sorular.length} sorunun cevabı var</span></div>
    <p class="note" style="margin:8px 0 12px">${a.dosyaAd ? `Yüklenen: <b>${esc(a.dosyaAd)}</b>. ` : ''}Word, PDF, fotoğraf ya da metin olarak yükleyin; sorular, puanlar, doğru cevaplar ve açık uçlu sorular için puanlama ölçütleri çıkarılır. Soru başlığına dokunarak düzeltebilirsiniz.</p>
    <div class="row"><label class="btn" for="ca-file">${icon('up')}Cevap anahtarı yükle</label><input type="file" id="ca-file" data-in="ca-file" accept=".docx,.pdf,.txt,image/*" hidden><button class="btn" data-act="ca-metin">Metin olarak yapıştır</button>
    <button class="btn primary" data-act="sk-ac" ${tam ? '' : 'disabled'}>${icon('up')}Kâğıtları fotoğraftan oku</button>${Object.keys(x.geri || {}).length ? `<button class="btn" data-act="sv-geri-yazdir">Öğrenci geri bildirimlerini yazdır</button>` : ''}</div></section>`;
}
async function anahtarCozumle(parts, kaynakAd, metin) {
  const x = Store.get(S.pid); toast('Cevap anahtarı çözümleniyor…', 15000);
  try {
    const d = await gemini([{ text:`Aşağıdaki belge bir ${prof().brans || 'Türkçe'} sınavının cevap anahtarıdır (soru kâğıdıyla birlikte olabilir). Her soruyu sırasıyla çıkar: soru numarası, puanı (belirtilmemişse toplam 100'ü soru sayısına eşit böl), kısa soru metni, doğru cevap, açık uçlu sorular için puanlama ölçütü (kısmi puan nasıl verilir) ve varsa öğrenme çıktısı kodu (ör. T.O.6.3). Belgede olmayan bilgiyi uydurma.` }, ...parts], S_ANAHTAR);
    const sq = (d.sorular || []).sort((a, b) => a.no - b.no).map(q => ({ p:+q.puan || 0, ck:String(q.ogrenmeCiktisi || '').trim(), cevap:String(q.dogruCevap || '').trim(), olcut:String(q.olcut || '').trim(), soru:String(q.soru || '').trim() }));
    if (!sq.length) { toast('Belgede soru bulunamadı.', 5000); return; }
    const puanVar = Object.values(x.puan || {}).some(a => (a || []).some(v => v !== '' && v != null));
    const uygula = () => { const y = Store.get(S.pid); y.sorular = sq; if (!puanVar) y.puan = {}; else for (const k in y.puan || {}) { y.puan[k] = (y.puan[k] || []).slice(0, sq.length); } y.anahtar = { metin:metin || (y.anahtar || {}).metin || '', dosyaAd:kaynakAd }; Store.put(y.id, y, true); render(); toast(`${sq.length} soru ve cevap anahtarı yüklendi. Soru başlıklarına dokunarak kontrol edin.`, 5000); };
    if (puanVar && sq.length !== x.sorular.length) ask(`Anahtarda ${sq.length} soru var, bu sınavda ${x.sorular.length}. Sorular anahtara göre değiştirilecek; girilmiş puanlar soru sırasına göre korunur.`, 'Uygula', uygula); else uygula();
  } catch (e) { toast(aiHata(e), 6000); }
}

Object.assign(ACT, {
  'sv-soru': b => { const x = Store.get(S.pid); const i = +b.dataset.i; const q = x.sorular[i];
    openModal(`${i + 1}. soru`, `<div class="fgrid"><div class="field"><label for="sq-p">Puanı</label><input class="inp" id="sq-p" type="number" value="${q.p}"></div><div class="field"><label for="sq-ck">Öğrenme çıktısı</label><input class="inp" id="sq-ck" value="${esc(q.ck || '')}" placeholder="ör. T.O.6.3"></div>
      <div class="field" style="grid-column:1/-1"><label for="sq-soru">Soru (kısa)</label><input class="inp" id="sq-soru" value="${esc(q.soru || '')}"></div>
      <div class="field" style="grid-column:1/-1"><label for="sq-cevap">Doğru cevap</label><textarea class="inp" id="sq-cevap" style="min-height:60px;font-family:var(--f-body)">${esc(q.cevap || '')}</textarea></div>
      <div class="field" style="grid-column:1/-1"><label for="sq-olcut">Puanlama ölçütü (açık uçlu sorular için: kısmi puan nasıl verilir)</label><textarea class="inp" id="sq-olcut" style="min-height:60px;font-family:var(--f-body)" placeholder="ör. Ana fikri doğru yazarsa 6, gerekçelendirirse +4">${esc(q.olcut || '')}</textarea></div></div>`,
      `<button class="btn danger" data-act="sq-sil" data-i="${i}">Soruyu sil</button><span style="flex:1"></span><button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="sq-kaydet" data-i="${i}">Kaydet</button>`); },
  'sq-kaydet': b => { const x = Store.get(S.pid); const i = +b.dataset.i; x.sorular[i] = { p:parseFloat($('#sq-p').value) || 0, ck:$('#sq-ck').value.trim(), soru:$('#sq-soru').value.trim(), cevap:$('#sq-cevap').value.trim(), olcut:$('#sq-olcut').value.trim() }; Store.put(x.id, x, true); closeModal(); render(); },
  'ca-metin': () => { if (!(ayar().aiKey || '').trim()) { aiAyarModal(); return; } openModal('Cevap anahtarını yapıştırın', `<textarea class="inp" id="ca-t" style="min-height:220px;font-family:var(--f-body)" placeholder="1. B (5 puan)&#10;2. Doğru (5 puan)&#10;3. Metnin ana fikri: … (10 puan; ana fikir 6, gerekçe 4)"></textarea>`, `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="ca-metin-git">Çözümle</button>`); },
  'ca-metin-git': () => { const t = $('#ca-t').value.trim(); if (!t) { toast('Metni yapıştırın.'); return; } closeModal(); anahtarCozumle([{ text:t }], 'yapıştırılan metin', t); },
  'sk-ac': () => { const x = Store.get(S.pid); if (!(ayar().aiKey || '').trim()) { aiAyarModal(); return; }
    S.sk = { items:[], sayfa:S.skSayfa || 1 };
    openModal('Sınav kâğıtlarını oku', `<p class="note">Kâğıtların fotoğraflarını sırayla seçin. Kâğıtlar birden çok sayfaysa sayfa sayısını belirtin; fotoğraflar sırayla gruplanır (ör. 2 sayfa: 1–2. fotoğraf ilk öğrenci, 3–4. fotoğraf ikinci öğrenci). Puanları kaydetmeden önce kontrol edin.</p>
      <div class="fgrid"><div class="field"><label for="sk-sayfa">Her kâğıt kaç sayfa?</label><select class="inp" id="sk-sayfa" data-in="sk-sayfa">${[1, 2, 3, 4].map(n => `<option ${n === S.sk.sayfa ? 'selected' : ''}>${n}</option>`).join('')}</select></div><div class="field"><label for="sk-file">Fotoğraflar</label><input class="inp" type="file" id="sk-file" data-in="sk-file" accept="image/*" multiple></div></div><div id="sk-rows"></div>`,
      `<button class="btn" data-act="modal-close">Kapat</button><button class="btn primary" data-act="sk-go" id="sk-go">Oku ve puanla</button>`, true); },
  'sk-go': async b => {
    const K = S.sk; const x = Store.get(S.pid); const s = Store.get(x.sinifId); if (!K || !K.items.length) { toast('Önce fotoğraf seçin.'); return; }
    if (K.ready) { let n = 0;
      const secim = K.items.map((it, i) => it.st === 'ok' ? $('#sk-m-' + i).value : '').filter(Boolean); const cift = secim.find((v, i) => secim.indexOf(v) !== i);
      if (cift) { const o = (s.ogr || []).find(z => z.id === cift); toast(`${o ? o.ad : 'Bir öğrenci'} iki kâğıda eşleştirilmiş. Eşleşmeleri düzeltin.`, 5000); return; }
      for (let i = 0; i < K.items.length; i++) { const it = K.items[i]; const oid = $('#sk-m-' + i).value; if (!oid || it.st !== 'ok') continue;
        const o = (s.ogr || []).find(z => z.id === oid); const y = Store.get(x.id); const ids = [];
        for (const [j, bl] of it.blobs.entries()) ids.push(await svDosya(bl, `Sınav - ${o.ad} - ${y.ad}${it.blobs.length > 1 ? ' s' + (j + 1) : ''}.jpg`));
        y.puan = { ...(y.puan || {}), [oid]:y.sorular.map((q, qi) => { const r = (it.d.sorular || []).find(z => +z.no === qi + 1); return r ? String(Math.max(0, Math.min(q.p, Math.round((+r.puan || 0) * 2) / 2))) : ''; }) };
        y.geri = { ...(y.geri || {}), [oid]:{ genel:it.d.genelGeriBildirim || '', sorular:y.sorular.map((q, qi) => { const r = (it.d.sorular || []).find(z => +z.no === qi + 1) || {}; return { cevap:r.ogrenciCevabi || '', gerekce:r.gerekce || '' }; }), yz:true } };
        y.kagit = { ...(y.kagit || {}), [oid]:[...((y.kagit || {})[oid] || []), ...ids] }; Store.put(y.id, y, true); it.st = 'kayit'; n++; }
      closeModal(); toast(`${n} öğrencinin puanı kaydedildi. "YZ" işaretli satırları kontrol edin.`, 5000); render(); return; }
    b.disabled = true;
    for (let i = 0; i < K.items.length; i++) { const it = K.items[i]; if (it.st === 'ok') continue; const st = $('#sk-s-' + i); st.textContent = 'okunuyor ve puanlanıyor…'; st.style.color = ''; let tries = 0;
      while (true) { try { const parts = [{ text:kagitPrompt(x) }]; for (const bl of it.blobs) parts.push(await imgPart(bl));
          const d = await gemini(parts, S_KAGIT); it.d = d; it.st = 'ok'; it.match = matchOgr(s, d.adSoyad, d.okulNo);
          const top = x.sorular.reduce((a, q, qi) => { const r = (d.sorular || []).find(z => +z.no === qi + 1); return a + (r ? Math.max(0, Math.min(q.p, +r.puan || 0)) : 0); }, 0);
          st.innerHTML = `${esc(d.adSoyad || 'ad okunamadı')}${d.okulNo ? ' · ' + esc(d.okulNo) : ''} · <b>${Math.round(top * 2) / 2} puan</b>`; st.style.color = 'var(--ok)'; const sel = $('#sk-m-' + i); sel.value = it.match; sel.disabled = false; break; }
        catch (e) { if (e && e.code === 429 && tries++ < 2) { st.textContent = 'sınır doldu, bekleniyor…'; await new Promise(r => setTimeout(r, 30000)); continue; } it.st = 'err'; st.textContent = aiHata(e); st.style.color = 'var(--red)'; if (e && (e.code === 'nokey' || e.code === 400 || e.code === 403 || e.code === 'net')) { b.disabled = false; return; } break; } }
      await new Promise(r => setTimeout(r, 1200)); }
    b.disabled = false; if (K.items.some(z => z.st === 'ok')) { K.ready = true; b.textContent = 'Puanları kaydet'; toast('Okuma bitti. Öğrenci eşleşmelerini kontrol edip kaydedin.', 4500); } else b.textContent = 'Tekrar dene';
  },
  'sv-detay': b => { const x = Store.get(S.pid); const oid = b.dataset.o; const r = findOgr(oid); const g = (x.geri || {})[oid] || {}; const pu = (x.puan || {})[oid] || []; const kg = ((x.kagit || {})[oid] || []).map(id => Store.get(id)).filter(Boolean);
    openModal(esc(r ? r.o.ad : 'Öğrenci'), `${kg.length ? `<div class="row">${kg.map(f => `<button class="fcard" data-act="dz-open" data-id="${f.id}" style="width:110px"><div class="fthumb"><img data-fid="${esc(f.assetId)}" alt=""></div></button>`).join('')}</div>` : ''}
      <div class="tablewrap"><table class="t"><thead><tr><th>Soru</th><th>Puan</th><th style="text-align:left">Öğrencinin cevabı</th><th style="text-align:left">Gerekçe</th></tr></thead><tbody>${x.sorular.map((q, i) => `<tr><td class="no">${i + 1}</td><td class="num">${esc(pu[i] ?? '')} / ${q.p}</td><td style="text-align:left;white-space:normal;padding:6px 8px;min-width:140px">${esc(((g.sorular || [])[i] || {}).cevap || '')}</td><td style="text-align:left;white-space:normal;padding:6px 8px;min-width:160px">${esc(((g.sorular || [])[i] || {}).gerekce || '')}</td></tr>`).join('')}</tbody></table></div>
      <div class="field"><label for="gb-t">Öğrenciye geri bildirim</label><textarea class="inp" id="gb-t" style="min-height:90px;font-family:var(--f-body)">${esc(g.genel || '')}</textarea></div>${g.yz ? '<p class="note">Puanlar ve geri bildirim yapay zekâ tarafından önerildi. Tablodaki puanları sınav sayfasında düzeltebilirsiniz.</p>' : ''}`,
      `${g.yz ? `<button class="btn" data-act="gb-onay" data-o="${oid}">Kontrol ettim</button>` : ''}<span style="flex:1"></span><button class="btn" data-act="modal-close">Kapat</button><button class="btn primary" data-act="gb-kaydet" data-o="${oid}">Geri bildirimi kaydet</button>`, true); },
  'gb-kaydet': b => { const x = Store.get(S.pid); const oid = b.dataset.o; x.geri = { ...(x.geri || {}), [oid]:{ ...((x.geri || {})[oid] || {}), genel:$('#gb-t').value.trim() } }; Store.put(x.id, x, true); closeModal(); render(); },
  'gb-onay': b => { const x = Store.get(S.pid); const oid = b.dataset.o; x.geri = { ...(x.geri || {}), [oid]:{ ...((x.geri || {})[oid] || {}), genel:$('#gb-t').value.trim(), yz:false } }; Store.put(x.id, x, true); closeModal(); render(); toast('Onaylandı.'); },
  'sv-geri-yazdir': () => { const x = Store.get(S.pid); const st = svStat(x); const p = prof();
    const kart = o => { const g = (x.geri || {})[o.id]; const pu = (x.puan || {})[o.id] || []; if (!g && !pu.some(v => v !== '' && v != null)) return '';
      return `<div style="border:1px solid #000;padding:10px 12px;margin:0 0 14px;break-inside:avoid"><p style="margin:0 0 6px"><b>${esc(o.ad)}</b> · No ${esc(o.no)} · ${esc(x.ad)} · <b>${st.top(o)} / ${st.max}</b></p><table style="margin:4px 0"><tr><th>Soru</th>${x.sorular.map((_, i) => `<td style="text-align:center">${i + 1}</td>`).join('')}</tr><tr><th>Puan</th>${x.sorular.map((q, i) => `<td style="text-align:center">${esc(pu[i] ?? '')}/${q.p}</td>`).join('')}</tr></table>${g && g.genel ? `<p style="margin:6px 0 0"><b>Öğretmenimin notu:</b> ${esc(g.genel)}</p>` : ''}</div>`; };
    printHTML(x.ad + ' Geri Bildirimler', `<p style="text-align:center"><b>${esc(up(p.okul))}<br>${esc(up(p.brans))} DERSİ · ${esc(up(x.ad))} · ÖĞRENCİ GERİ BİLDİRİMLERİ</b></p>${st.ogr.map(kart).join('')}<p style="font-size:10pt;text-align:right">${esc(p.ad)} · ${esc(p.brans)} Öğretmeni</p>`); }
});
document.addEventListener('change', async e => {
  const el = e.target; const k = el.dataset && el.dataset.in; if (!k) return;
  if (k === 'ca-file') { const f = el.files[0]; el.value = ''; if (!f) return; if (!(ayar().aiKey || '').trim()) { aiAyarModal(); return; }
    const ad = f.name; const ext = low(ad.split('.').pop());
    try {
      if (ext === 'docx') { if (typeof mammoth === 'undefined') { toast('Word okuyucu yüklenemedi.'); return; } const t = (await mammoth.extractRawText({ arrayBuffer:await f.arrayBuffer() })).value; anahtarCozumle([{ text:t }], ad, t); }
      else if (ext === 'pdf') anahtarCozumle([await blobPart(f, 'application/pdf')], ad, '');
      else if (ext === 'txt') { const t = await f.text(); anahtarCozumle([{ text:t }], ad, t); }
      else if (/^image\//.test(f.type) || /^(jpe?g|png|webp)$/.test(ext)) anahtarCozumle([await imgPart(f)], ad, '');
      else if (ext === 'doc') toast('Eski .doc biçimi okunamıyor. Word\'de .docx olarak kaydedip yükleyin.', 5000);
      else toast('Bu dosya türü desteklenmiyor. Word (.docx), PDF, fotoğraf ya da metin yükleyin.', 5000);
    } catch (er) { toast('Dosya okunamadı.'); } }
  else if (k === 'sk-sayfa') { S.skSayfa = +el.value; S.sk.sayfa = +el.value; const fi = $('#sk-file'); if (fi.files.length) fi.dispatchEvent(new Event('change', { bubbles:true })); }
  else if (k === 'sk-file') { const K = S.sk; const x = Store.get(S.pid); const s = Store.get(x.sinifId); const files = [...el.files]; const n = K.sayfa || 1; K.items = []; K.ready = false;
    for (let i = 0; i < files.length; i += n) { const blobs = []; for (const f of files.slice(i, i + n)) blobs.push(await shrinkTo(f, 2200)); K.items.push({ blobs, st:'' }); }
    $('#sk-rows').innerHTML = `<p class="note" style="margin-top:8px">${files.length} fotoğraf → ${K.items.length} öğrenci kâğıdı</p>` + K.items.map((it, i) => `<div class="uprow" style="grid-template-columns:56px minmax(0,1fr) 190px"><img id="sk-i-${i}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:6px"><span class="st" id="sk-s-${i}">${it.blobs.length} sayfa · okunmayı bekliyor</span><select class="inp" id="sk-m-${i}" disabled aria-label="Öğrenci"><option value="">Eşleşme yok (atla)</option>${(s.ogr || []).map(o => `<option value="${o.id}">${esc(o.no)} ${esc(o.ad)}</option>`).join('')}</select></div>`).join('');
    K.items.forEach((it, i) => { $('#sk-i-' + i).src = URL.createObjectURL(it.blobs[0]); }); const g = $('#sk-go'); g.textContent = 'Oku ve puanla'; }
});

/* ===================== Dilimizin Zenginlikleri Projesi (2026-2027, ortaokul) ===================== */
const DZP_YIL = '2026-2027';
const A = (no, ad, bas, bit, sorumlu, okul, mat, not) => ({ no, ad, bas, bit, sorumlu, okul, mat:mat || [], not:not || '' });
const DZP = [
  { no:1, ad:'Tanıtım ve Duyuru Yapılması', ay:'Ekim', adim:[
    A('1.1', 'Projeyi tanıtan etkinlik', '2026-10-05', '2026-10-09', 'Merkez Yürütme Kurulu', false),
    A('1.2', 'Bakanlık tanıtım platformlarında duyuru', '2026-10-05', '2026-10-09', 'Merkez Yürütme Kurulu', false),
    A('1.3', 'Kılavuz ve eylem planlarının illere resmî yazıyla gönderilmesi', '2026-10-05', '2026-10-09', 'Merkez Yürütme Kurulu', false)] },
  { no:2, ad:'Komisyonların Kurulması', ay:'Ekim', adim:[
    A('2.1', 'İl Yürütme Komisyonunun kurulması', '2026-10-07', '2026-10-09', 'İl Millî Eğitim Müdürlüğü', false),
    A('2.2', 'İlçe Yürütme Komisyonunun kurulması', '2026-10-07', '2026-10-09', 'İlçe Millî Eğitim Müdürlüğü', false),
    A('2.3', 'Okul Yürütme Komisyonunun kurulması', '2026-10-07', '2026-10-09', 'Okul Müdürlüğü', true, ['ev:dzp_komisyon','ev:dzp_gorev','ev:dzp_plan'], 'Müdür yardımcısı başkanlığında; en az iki öğretmen ve her sınıf düzeyinden birer öğrenci. Ortaokulda Türkçe zümresiyle koordineli çalışır.')] },
  { no:3, ad:'Sözlük Okuma: Klasik Eser Okumaları', ay:'Ekim', adim:[
    A('3.1', '"Bilen Oturur" etkinliği (tüm sınıflar)', '2026-10-12', '2026-10-16', 'Okul Yürütme Komisyonu', true, ['m:bilen'], 'Eş anlamlı sözcük çiftleri tahtaya yazılır; herkes ayağa kalkar, doğru eş anlamlıyı söyleyen oturur.'),
    A('3.2', '"Başarı Köşesi" pano çalışması (tüm sınıflar)', '2026-10-19', '2026-10-23', 'Okul Yürütme Komisyonu', true, ['p:basari','m:sozcukkarti']),
    A('3.3', '"Yaşayan Sözlük" tasarım yarışması (il geneli)', '2026-10-12', '2026-11-06', 'İl Yürütme Komisyonu', true, [], 'Okul duyurur ve katılımı teşvik eder. Söz varlığı; yaratıcı tasarım, QR kod / artırılmış gerçeklik gibi dijital uygulamalar ve farklı sanat teknikleriyle özgün sözlük tasarımı.'),
    A('3.4', 'Klasik eser okumaları ve kelime defteri (yıl boyu)', '2026-10-12', '2027-06-11', 'Türkçe öğretmenleri', true, ['m:eserlistesi','m:kelimedefteri','cz:dzp_okuma'], 'Ortaokul eser listesinden okumalar; bilinmeyen sözcükler sözlükten bulunup kelime defterine yazılır.')] },
  { no:4, ad:'Evliya Çelebi: Tanıtım Rehberi ve Gezi Yazıları', ay:'Kasım–Aralık', adim:[
    A('4.1', 'Etkinliğin duyurulması', '2026-11-23', '2026-11-24', 'İl, ilçe ve okul yürütme komisyonları', true, ['ev:dzp_duyuru']),
    A('4.2', 'Seyahatname okumaları; şehir tanıtım rehberi ve gezi yazısı', '2026-11-23', '2026-11-27', 'Okul Yürütme Komisyonu', true, ['m:evliya']),
    A('4.3', '"Şehrimin Dil Hazineleri" cümle / afiş çalışması', '2026-11-30', '2026-12-04', 'Okul Yürütme Komisyonu', true, ['m:sehrim']),
    A('4.4', 'Her sınıfın en iyi cümle/afişinin seçilip panoda sergilenmesi', '2026-12-03', '2026-12-04', 'Okul Yürütme Komisyonu', true, ['ev:dzp_juri','p:sehrim']),
    A('4.5', 'Okulun en iyi çalışmasının seçilmesi ve ilçeye gönderilmesi', '2026-12-03', '2026-12-04', 'Okul Yürütme Komisyonu', true, ['ev:dzp_juri']),
    A('4.6', 'İlçe seçimi', '2026-12-07', '2026-12-11', 'İlçe Yürütme Komisyonu', false),
    A('4.7', 'İl seçimi', '2026-12-14', '2026-12-18', 'İl Yürütme Komisyonu', false),
    A('4.8', 'Sergi ve ödül', '2026-12-21', '2026-12-25', 'İl Yürütme Komisyonu', false)] },
  { no:5, ad:'"Sözden Gönüle Köprüler Kur" Hikâye Yarışması (tema: nezaket)', ay:'Aralık–Ocak', adim:[
    A('5.1', 'Yarışma şartnamesinin hazırlanması', '2026-12-28', '2026-12-29', 'Okul Yürütme Komisyonu', true, ['ev:dzp_sartname_hikaye']),
    A('5.2', 'Yarışmanın duyurulması', '2026-12-29', '2026-12-29', 'Okul Yürütme Komisyonu', true, ['ev:dzp_duyuru','m:nezaket']),
    A('5.3', 'Yarışma ortamının hazırlanması', '2026-12-29', '2026-12-29', 'Okul Yürütme Komisyonu', true),
    A('5.4', 'Yarışmanın yürütülmesi', '2026-12-29', '2027-01-12', 'Okul Yürütme Komisyonu', true, ['m:hikayeplan']),
    A('5.5', 'Sonuçların açıklanması', '2027-01-15', '2027-01-15', 'Okul Yürütme Komisyonu', true, ['ev:dzp_juri','ev:dzp_sonuc'])] },
  { no:6, ad:'Türkçeye İz Bırakan Kalemler, Dilimize Yerleşmiş Yabancı Sözcükler ve Dönem Sonu İyi Örnekler', ay:'Ocak', adim:[
    A('6.1', 'Hikâye ve şiir okumaları, drama (tüm sınıflar)', '2027-01-11', '2027-01-15', 'Okul Yürütme Komisyonu', true, ['m:eserlistesi']),
    A('6.2', '"Türkçesini Söyleyelim" (tüm sınıflar)', '2027-01-11', '2027-01-15', 'Okul Yürütme Komisyonu', true, ['m:turkcesini'], 'Görsellerle ya da okul çevresinde sokak gezisiyle yabancı kökenli sözcükler toplanır; Güncel Türkçe Sözlük ve Kubbealtı Lugatı ile kontrol edilip Türkçe karşılık önerilir.'),
    A('6.3', '"Mahallemizin Sözcükleri" (tüm sınıflar)', '2027-01-11', '2027-01-15', 'Okul Yürütme Komisyonu', true, ['m:mahalle','p:mahalle']),
    A('6.4', 'Dönem boyunca yapılan iyi örneklerin paylaşılması', '2027-01-18', '2027-01-22', 'İl, ilçe ve okul yürütme komisyonları', true, ['ev:dzp_iyiornek'], 'Ölçütler: özgünlük, dil doğruluğu, sözlük kullanımı, paylaşılabilirlik.')] },
  { no:7, ad:'Deyimler ve Atasözleri Okumaları', ay:'Şubat–Mart', adim:[
    A('7.1', '"Ailemle Deyim ve Atasözleri" etkinliği', '2027-02-08', '2027-02-12', 'Okul Yürütme Komisyonu', true, ['m:ailem','ev:dzp_veli']),
    A('7.2', 'Drama yöntemiyle atasözü / deyim anlatma', '2027-02-15', '2027-02-19', 'Okul Yürütme Komisyonu', true, ['m:drama']),
    A('7.3', 'Atasözlerini / deyimleri resimleme', '2027-02-22', '2027-02-26', 'Okul Yürütme Komisyonu', true, ['m:resimle']),
    A('7.4', 'Okul sergisi', '2027-03-01', '2027-03-05', 'Okul Yürütme Komisyonu', true, ['p:sergi'])] },
  { no:8, ad:'Mehmet Âkif Ersoy ve Türkçe', ay:'Mart', adim:[
    A('8.1', '"Değerler Ağacı" (tüm öğrenciler)', '2027-03-15', '2027-03-19', 'Okul Yürütme Komisyonu', true, ['m:degerler','p:degerler'], 'İstiklal Marşı\'ndaki vatan, bayrak, millet gibi sözcüklerle sınıfta değerler ağacı; her grup bir değeri canlandıran oyun tasarlar.'),
    A('8.2', '"Kelime Türetme" (tüm sınıflar)', '2027-03-22', '2027-03-26', 'Okul Yürütme Komisyonu', true, ['m:turetme']),
    A('8.3', 'Millî şiir kartları; millî ve kültürel değerleri anlatan şiirlerin panoda sergilenmesi', '2027-03-29', '2027-04-02', 'Okul Yürütme Komisyonu', true, ['m:siirkarti','m:akifsozluk'])] },
  { no:9, ad:'Dede Korkut', ay:'Nisan', adim:[
    A('9.1', '"Bu Nedir?" etkinliği (tüm sınıflar)', '2027-04-12', '2027-04-16', 'Okul Yürütme Komisyonu', true, ['m:bunedir']),
    A('9.2', '"23 Nisan: Dünya Çocuklarına Mesaj" mektup yarışması (il geneli)', '2027-04-19', '2027-04-23', 'İl Yürütme Komisyonu', true, ['m:mektup'], 'Okul duyurur, öğrenci mektuplarını toplayıp gönderir.'),
    A('9.3', 'Dede Korkut hikâyelerinden okumalar ve tiyatro', '2027-04-26', '2027-04-30', 'Okul Yürütme Komisyonu', true, ['m:dedekorkut','m:tiyatro'])] },
  { no:10, ad:'Mısra ve Türkü Ezberleme Çalışmaları', ay:'Mayıs', adim:[
    A('10.1', '"Yapay Zekâ ile Sözcüğünü Keşfet" (tüm sınıflar)', '2027-05-03', '2027-05-07', 'Okul Yürütme Komisyonu', true, ['m:sozcukkarti'], 'Öğretmen rehberliğinde; bilgiler Güncel Türkçe Sözlük ile doğrulanır; sözcük kartı hazırlanır.'),
    A('10.2', '"Kelime Anlatma" ve aileyle "Türkü Dinleme Günü"', '2027-05-10', '2027-05-14', 'Okul Yürütme Komisyonu', true, ['m:kelimeanlat','ev:dzp_veli_turku']),
    A('10.3', '"Köklerden Geleceğe Türkülerimiz ve Öyküleri" okul yarışması', '2027-05-24', '2027-05-28', 'Okul Yürütme Komisyonu', true, ['ev:dzp_sartname_turku','ev:dzp_juri','m:turku']),
    A('10.4', 'Dergi yarışması (il geneli)', '2027-05-03', '2027-05-28', 'İl Yürütme Komisyonu', true, [], 'Okul duyurur ve katılımı teşvik eder.'),
    A('10.5', 'Ödüllendirme', '2027-05-31', '2027-06-04', 'İl Yürütme Komisyonu', false)] },
  { no:11, ad:'Dilimizin Zenginlikleri Yıl Sonu Şöleni', ay:'Haziran', adim:[
    A('11.1', 'İlçelerden gelen materyallerin ayrıştırılması', '2027-06-14', '2027-06-18', 'İl Yürütme Komisyonu / Merkez', false),
    A('11.2', 'Şölen alanının hazırlanması', '2027-06-14', '2027-06-18', 'İl Yürütme Komisyonu / Merkez', false),
    A('11.3', 'Yıl Sonu Şöleni (tarihi il komisyonu belirler)', '2027-06-14', '2027-06-25', 'İl Yürütme Komisyonu / Merkez', false),
    A('11.4', 'Okul yıl sonu raporunun ilçe komisyonuna gönderilmesi', '2027-06-07', '2027-06-18', 'Okul Yürütme Komisyonu', true, ['ev:dzp_yilsonu'], 'Kılavuz gereği okul yürütme komisyonu yıl sonu raporunu hazırlayıp ilçe yürütme komisyonuna gönderir. Tarihi ilçe yazısına göre güncelleyin.')] }
];
const DZP_ADIMLAR = DZP.flatMap(f => f.adim.map(a => ({ ...a, f })));
const dzpGet = () => Store.get('dzp') || { type:'dzp', a:{} };
const dzpDurum = no => (dzpGet().a || {})[no] || {};
const dTR = s => { const d = dParse(s); return d.getDate() + ' ' + ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'][d.getMonth()]; };
const dAralik = a => a.bas === a.bit ? dTR(a.bas) + ' ' + a.bas.slice(0, 4) : dTR(a.bas) + ' – ' + dTR(a.bit) + ' ' + a.bit.slice(0, 4);
function dzpZaman(a) { const t = isoDay(0); if (dzpDurum(a.no).ok) return 'ok'; if (t > a.bit) return 'gecti'; if (t >= a.bas) return 'simdi'; return 'gelecek'; }

/* ---- İçerik verileri ---- */
const ES_ANLAM = [['akıl','us'],['cevap','yanıt'],['hediye','armağan'],['nehir','ırmak'],['şair','ozan'],['kelime','sözcük'],['mana','anlam'],['sene','yıl'],['misafir','konuk'],['hürriyet','özgürlük'],['istiklal','bağımsızlık'],['millet','ulus'],['doktor','hekim'],['ihtiyar','yaşlı'],['fakir','yoksul'],['zengin','varlıklı'],['arzu','istek'],['fikir','düşünce'],['kuvvet','güç'],['misal','örnek'],['alaka','ilgi'],['medeniyet','uygarlık'],['tecrübe','deneyim'],['imtihan','sınav'],['hikâye','öykü'],['vatan','yurt'],['sulh','barış'],['harp','savaş'],['nazik','kibar'],['gayret','çaba'],['sebep','neden'],['fayda','yarar'],['vakit','zaman'],['cimri','pinti']];
const DEYIMLER = [['Etekleri zil çalmak','Çok sevinmek.'],['Kulak kabartmak','Belli etmeden dinlemeye çalışmak.'],['Göz atmak','Bir şeye kısaca bakmak.'],['Ağzı kulaklarına varmak','Çok sevinmek, sevinçten gülümsemek.'],['Dili tutulmak','Şaşkınlık ya da heyecandan konuşamamak.'],['Burnu havada olmak','Kibirli, kendini beğenmiş olmak.'],['Eli açık olmak','Cömert olmak.'],['Kafa yormak','Bir konu üzerinde çok düşünmek.'],['Pireyi deve yapmak','Küçük bir şeyi gereğinden çok büyütmek.'],['Ateş pahası','Çok pahalı.'],['Gözden düşmek','Önceki değerini, sevgisini yitirmek.'],['Kulağına küpe olmak','Bir olaydan ders almak.'],['Ayağını denk almak','Davranışlarına dikkat etmek.'],['Göz kulak olmak','Bir şeyi korumak, gözetmek.'],['Diken üstünde olmak','Çok tedirgin, huzursuz olmak.']];
const ATASOZLERI = [['Damlaya damlaya göl olur.','Küçük birikimler zamanla büyük sonuçlar doğurur.'],['Bir elin nesi var, iki elin sesi var.','İş birliğiyle başarı kolaylaşır.'],['Tatlı dil yılanı deliğinden çıkarır.','Güzel ve yumuşak söz en zor işi bile çözer.'],['Ağaç yaşken eğilir.','Eğitim küçük yaşta başlamalıdır.'],['Dost kara günde belli olur.','Gerçek dost zor günde yanımızda olandır.'],['Bugünün işini yarına bırakma.','Yapılacak işler ertelenmemelidir.'],['Komşu komşunun külüne muhtaçtır.','İnsanlar birbirine her zaman ihtiyaç duyar.'],['Sakla samanı, gelir zamanı.','Değersiz görünen şeyler bir gün işe yarayabilir.'],['Ak akçe kara gün içindir.','Biriktirilen para zor günlerde kullanılır.'],['Üzüm üzüme baka baka kararır.','İnsan arkadaşlarından etkilenir.'],['Söz gümüşse sükût altındır.','Gereksiz konuşmaktansa susmak daha değerlidir.'],['Bilmemek ayıp değil, öğrenmemek ayıptır.','Öğrenmeye her zaman açık olmalıyız.']];
const YABANCI = [['online','çevrim içi'],['offline','çevrim dışı'],['selfie','özçekim'],['e-mail','e-posta'],['password','parola'],['link','bağlantı'],['download','indirme'],['upload','yükleme'],['printer','yazıcı'],['mouse','fare'],['feedback','geri bildirim'],['trend','eğilim'],['smartphone','akıllı telefon'],['chat','sohbet'],['follower','takipçi'],['screenshot','ekran görüntüsü'],['shopping mall','alışveriş merkezi'],['sale','indirim'],['hashtag','etiket'],['workshop','atölye çalışması']];
const AKIF_SOZ = [['sancak','Bayrak.'],['şafak','Güneş doğmadan önceki aydınlık.'],['çehre','Yüz.'],['hilâl','Yeni ay; ay biçimi.'],['celâl','Öfke, hiddet.'],['ezel','Başlangıcı olmayan geçmiş.'],['bent','Set, su engeli.'],['âfâk','Ufuklar.'],['serhat','Sınır.'],['hayâsızca','Utanmazca.'],['kefen','Ölünün sarıldığı bez.'],['şühedâ','Şehitler.'],['Hudâ','Allah.'],['cüdâ','Ayrı.'],['nâmahrem','Yabancı.'],['vecd','Coşku, kendinden geçme.'],['cerîha','Yara.'],['na\'ş','Ceset.'],['izmihlâl','Yok olma, çöküş.']];
const DEGER_SOZ = ['sancak','ocak','millet','yıldız','hilâl','istiklâl','hür','vatan','toprak','şehit','iman','ezan','bayrak','hürriyet','cennet','fedâ'];
const NEZAKET = ['nezaket','incelik','saygı','hoşgörü','teşekkür','rica','özür','gönül','selam','paylaşmak','yardımlaşma','güler yüz','tatlı dil','misafir','komşu'];
const BUNEDIR = [['SÖZLÜK','K',['Kelimelerin anlamını öğrenmek için açarız.','İçindeki sözcükler alfabetik sıradadır.','Projemizin sloganında "özgürlük" ile birlikte geçer.']],['TEPEGÖZ','Z',['Tek gözlü bir devdir.','Oğuz illerine büyük korku salar.','Basat onu yener.']],['KOPUZ','Z',['Telli bir çalgıdır.','Dede Korkut onu çalarak söz söyler.','Bugünkü bağlamanın atalarından sayılır.']],['DUMRUL','L',['Kuru çayın üzerine köprü kurar.','Azrail ile karşılaşır.','Adının önünde "Deli" sözü vardır.']],['OĞUZ','Z',['Dede Korkut hikâyelerinde adı geçen Türk boyudur.','İç ve Dış diye anılır.','Hikâyelerdeki beyler bu boydandır.']],['OZAN','N',['Halk şairidir.','Elinde sazı, dilinde sözü vardır.','Eş anlamlısı "şair"dir.']],['ATASÖZÜ','Ü',['Atalarımızın deneyimlerinden süzülmüştür.','Kısa ve kalıplaşmış bir öğüttür.','"Damlaya damlaya göl olur" bunlardan biridir.']],['BAYRAK','K',['Ay yıldızlıdır, rengi aldır.','İstiklal Marşı\'nda "al sancak" diye geçer.','Göndere çekilir.']]];
const DEDE_KORKUT = ['Dirse Han Oğlu Boğaç Han','Salur Kazan\'ın Evinin Yağmalanması','Kam Püre Oğlu Bamsı Beyrek','Kazan Bey Oğlu Uruz Bey\'in Tutsak Olması','Duha Koca Oğlu Deli Dumrul','Kanlı Koca Oğlu Kan Turalı','Kazılık Koca Oğlu Yigenek','Basat\'ın Tepegöz\'ü Öldürmesi','Begil Oğlu Emren','Uşun Koca Oğlu Segrek','Salur Kazan\'ın Tutsak Olup Oğlu Uruz\'un Çıkarması','İç Oğuz\'a Dış Oğuz Asi Olup Beyrek\'in Öldüğü'];
const ESER_LISTESI = [['Türk Masalları','5-8'],['Türk Bilmeceleri','5-8'],['Türk Tekerlemeleri','5-8'],['Dede Korkut Hikâyeleri','6-8'],['Ömer Seyfettin Seçme Hikâyeler','5-8'],['Refik Halit Karay Seçme Hikâyeler','5-8'],['Sait Faik Abasıyanık Seçme Hikâyeler','5-8'],['Çocuk Şiirleri Antolojisi','5-8'],['Memleket Şiirleri Antolojisi','5-8'],['Safahat (Mehmet Âkif Ersoy)','5-8'],['Yunus Emre Divanı','5-8'],['Mesneviden Seçme Hikâyeler','6-8'],['Fatih Sultan Mehmed\'e Nasihatler','5-8'],['Mesnevi\'nin Ruhu','7-8'],['Ebu Ali Sina Hikâyeleri','7-8'],['Kâmil İnsan','8'],['Yüce Hedefler Kitabı','8'],['Seyahatnâme (Evliya Çelebi)','5-8']];

/* ---- Öğrenci materyalleri (yazdırılabilir) ---- */
const dzBas = (p, t, alt) => `<p style="text-align:center;margin:0"><b>${esc(up(p.okul))}<br>DİLİMİZİN ZENGİNLİKLERİ PROJESİ · ${DZP_YIL}</b><br><i>Sözlük Özgürlüktür</i></p><h2 style="text-align:center">${t}</h2>${alt ? `<p style="text-align:center">${alt}</p>` : ''}`;
const ogrBas = '<table><tr><th style="width:22%">Adı soyadı</th><td></td><th style="width:14%">Sınıfı / No</th><td style="width:18%"></td></tr></table>';
const satirlar = (n, cols) => Array.from({ length:n }, () => `<tr>${'<td style="height:30px"></td>'.repeat(cols)}</tr>`).join('');
const MAT = {
  bilen:{ ad:'Bilen Oturur: eş anlamlı sözcük kartları', adim:'3.1', f:p => `${dzBas(p, 'BİLEN OTURUR')}<p><b>Uygulama:</b> Öğretmen sözcükleri tahtaya yazar. Bütün öğrenciler ayağa kalkar. Sırayla bir sözcüğün eş anlamlısı sorulur; doğru bilen oturur. Tahtadaki bütün sözcüklerin eş anlamlısı bulununca oyun biter. Yeni sözcükler sözlükten kontrol edilip kelime defterine yazılır.</p><table><tr><th>Sözcük</th><th>Eş anlamlısı</th><th>Sözcük</th><th>Eş anlamlısı</th></tr>${Array.from({ length:Math.ceil(ES_ANLAM.length / 2) }, (_, i) => { const a = ES_ANLAM[i * 2], b = ES_ANLAM[i * 2 + 1]; return `<tr><td>${a[0]}</td><td>${a[1]}</td><td>${b ? b[0] : ''}</td><td>${b ? b[1] : ''}</td></tr>`; }).join('')}</table><p style="font-size:10pt">Öğretmene: Sağ sütunları kapatarak kart olarak kullanabilir, sınıf düzeyine göre sözcük seçebilirsiniz.</p>` },
  sozcukkarti:{ ad:'Sözcük kartı (Başarı Köşesi / Yapay Zekâ ile Sözcüğünü Keşfet)', adim:'3.2 · 10.1', f:p => `${dzBas(p, 'SÖZCÜK KARTI')}${[1, 2].map(() => `<table style="margin-bottom:22px"><tr><th style="width:30%">Sözcük</th><td style="height:34px"></td></tr><tr><th>Anlamı (Güncel Türkçe Sözlük)</th><td style="height:54px"></td></tr><tr><th>Eş anlamlısı</th><td></td></tr><tr><th>Zıt anlamlısı</th><td></td></tr><tr><th>Örnek cümle</th><td style="height:54px"></td></tr><tr><th>Kaynak / doğrulama</th><td>☐ sozluk.gov.tr &nbsp; ☐ Kubbealtı Lugatı &nbsp; ☐ Basılı sözlük</td></tr><tr><th>Hazırlayan</th><td></td></tr></table>`).join('')}<p style="font-size:10pt">Yapay zekâ ile araştırılan bilgiler mutlaka Güncel Türkçe Sözlük gibi güvenilir bir kaynakla doğrulanır. Kişisel bilgi paylaşılmaz.</p>` },
  eserlistesi:{ ad:'Ortaokul eser listesi ve okuma takip', adim:'3.4 · 6.1', f:p => `${dzBas(p, 'ORTAOKUL OKUMA LİSTESİ')}<table><tr><th>S.No</th><th>Eser</th><th>Sınıf</th><th>Okudum ✓</th><th>Yeni öğrendiğim sözcük sayısı</th></tr>${ESER_LISTESI.map((e, i) => `<tr><td>${i + 1}</td><td>${esc(e[0])}</td><td>${e[1]}</td><td></td><td></td></tr>`).join('')}</table>${ogrBas}` },
  kelimedefteri:{ ad:'Kelime defteri sayfası', adim:'3.4', f:p => `${dzBas(p, 'KELİME DEFTERİM')}${ogrBas}<table><tr><th>Tarih</th><th>Sözcük</th><th>Okuduğum eser</th><th>Anlamı (sözlükten)</th><th>Benim cümlem</th></tr>${satirlar(14, 5)}</table>` },
  evliya:{ ad:'Evliya Çelebi: gezi yazısı ve tanıtım rehberi', adim:'4.2', f:p => `${dzBas(p, 'EVLİYA ÇELEBİ GİBİ GEZ, GÖR, YAZ')}<p><b>Evliya Çelebi kimdir?</b> 1611'de İstanbul'da doğan büyük gezgin ve yazardır. Gördüğü yerleri, insanları, dilleri ve gelenekleri on ciltlik <i>Seyahatnâme</i>'sinde anlatmıştır. Eserin ilk cildi İstanbul'a ayrılmıştır.</p><h3>1. Okuma</h3><p>Öğretmeninizin getirdiği Seyahatnâme bölümünü okuyun. Bilmediğiniz sözcükleri aşağıya yazıp sözlükten bulun.</p><table><tr><th>Sözcük</th><th>Anlamı</th></tr>${satirlar(5, 2)}</table><h3>2. Benim şehrim: ${esc(p.il || 'İstanbul')}${p.ilce ? ' · ' + esc(p.ilce) : ''}</h3><table><tr><th style="width:35%">Görülecek yerler</th><td style="height:46px"></td></tr><tr><th>Yemekleri</th><td style="height:36px"></td></tr><tr><th>Gelenekleri</th><td style="height:36px"></td></tr><tr><th>Yöreye özgü sözcükler, deyimler</th><td style="height:46px"></td></tr></table><h3>3. Gezi yazım</h3><p>Evliya Çelebi gibi, şehrinizde gezdiğiniz bir yeri gözlemlerinizle anlatın (başlık, giriş, gözlemler, duygu ve düşünceler).</p>${'<p style="border-bottom:1px solid #999;height:26px;margin:0"></p>'.repeat(12)}${ogrBas}` },
  sehrim:{ ad:'"Şehrimin Dil Hazineleri" cümle / afiş kâğıdı', adim:'4.3', f:p => `${dzBas(p, 'ŞEHRİMİN DİL HAZİNELERİ')}<p>Şehrinizin dil zenginliğini anlatan etkileyici bir cümle yazın ya da afiş tasarlayın. Yöreye özgü sözcükler, deyimler, yer adlarının hikâyeleri kullanılabilir.</p><table><tr><th>Cümlem</th><td style="height:90px"></td></tr></table><p><b>Afiş alanı</b></p><div style="border:2px dashed #555;height:520px"></div>${ogrBas}` },
  nezaket:{ ad:'Hikâye yarışması: nezaket anahtar sözcükleri', adim:'5.2', f:p => `${dzBas(p, '"SÖZDEN GÖNÜLE KÖPRÜLER KUR"', 'Hikâye Yarışması · Tema: Nezaket')}<p>Hikâyende aşağıdaki sözcüklerden <b>en az beşini</b> anlamına uygun kullan. Bilmediğin sözcüğün anlamını sözlükten bul.</p><table>${Array.from({ length:5 }, (_, r) => `<tr>${NEZAKET.slice(r * 3, r * 3 + 3).map(w => `<td style="text-align:center;font-size:15pt;height:44px">${w}</td>`).join('')}</tr>`).join('')}</table>` },
  hikayeplan:{ ad:'Hikâye planlama kâğıdı', adim:'5.4', f:p => `${dzBas(p, 'HİKÂYE PLANIM', 'Tema: Nezaket')}${ogrBas}<table><tr><th style="width:30%">Hikâyemin adı</th><td></td></tr><tr><th>Kahramanlar</th><td style="height:40px"></td></tr><tr><th>Yer ve zaman</th><td style="height:34px"></td></tr><tr><th>Olay (sorun)</th><td style="height:60px"></td></tr><tr><th>Gelişme</th><td style="height:60px"></td></tr><tr><th>Sonuç (nezaketle çözüm)</th><td style="height:60px"></td></tr><tr><th>Kullanacağım anahtar sözcükler</th><td style="height:40px"></td></tr><tr><th>Ana fikir</th><td style="height:40px"></td></tr></table><p>☐ Yazım ve noktalamayı kontrol ettim &nbsp; ☐ Anahtar sözcükleri anlamına uygun kullandım &nbsp; ☐ Başlık koydum</p>` },
  turkcesini:{ ad:'Türkçesini Söyleyelim çalışma kâğıdı', adim:'6.2', f:p => `${dzBas(p, 'TÜRKÇESİNİ SÖYLEYELİM')}<p><b>1.</b> Aşağıdaki yabancı sözcüklerin Türkçe karşılıklarını inceleyin. Hangilerini günlük hayatta kullanıyorsunuz?</p><table><tr><th>Yabancı sözcük</th><th>Türkçe karşılığı</th><th>Yabancı sözcük</th><th>Türkçe karşılığı</th></tr>${Array.from({ length:YABANCI.length / 2 }, (_, i) => `<tr><td>${YABANCI[i * 2][0]}</td><td>${YABANCI[i * 2][1]}</td><td>${YABANCI[i * 2 + 1][0]}</td><td>${YABANCI[i * 2 + 1][1]}</td></tr>`).join('')}</table><p><b>2. Sokak gezisi:</b> Okul çevresindeki tabela, afiş ve vitrinlerde gördüğünüz yabancı sözcükleri yazın. Sözlükten kontrol edip Türkçe karşılık önerin.</p><table><tr><th>Gördüğüm sözcük</th><th>Nerede gördüm?</th><th>Sözlükte var mı? (GTS / Kubbealtı)</th><th>Türkçe karşılık önerim</th></tr>${satirlar(8, 4)}</table>${ogrBas}` },
  mahalle:{ ad:'Mahallemizin Sözcükleri derleme formu', adim:'6.3', f:p => `${dzBas(p, 'MAHALLEMİZİN SÖZCÜKLERİ')}<p>Aile büyüklerinizden ve çevrenizdeki kişilerden yöreye özgü, unutulmaya yüz tutmuş ya da günlük hayatta duyduğunuz sözcükleri derleyin. Anlamlarını güvenilir sözlüklerle doğrulayın.</p><table><tr><th>Sözcük</th><th>Kimden öğrendim?</th><th>Anlamı</th><th>Örnek cümle</th><th>Sözlükte var mı?</th></tr>${satirlar(10, 5)}</table>${ogrBas}` },
  ailem:{ ad:'Ailemle Deyim ve Atasözleri formu', adim:'7.1', f:p => `${dzBas(p, 'AİLEMLE DEYİM VE ATASÖZLERİ')}<p>Sevgili velimiz, aşağıdaki sözcüklerle ilgili bildiğiniz deyim ve atasözlerini çocuğunuzla konuşup anlamlarıyla birlikte yazınız. Çocuğumuz bunları sınıfta arkadaşlarıyla paylaşacaktır.</p><table><tr><th style="width:14%">Sözcük</th><th>Deyim / atasözü</th><th>Anlamı</th></tr>${['göz','el','dil','kulak','baş','ağız','yol','su','gönül','kapı'].map(w => `<tr><td><b>${w}</b></td><td style="height:34px"></td><td></td></tr>`).join('')}</table>${ogrBas}<p>Veli imzası: ……………………</p>` },
  drama:{ ad:'Drama kartları: deyim ve atasözleri', adim:'7.2', f:p => `${dzBas(p, 'DRAMA KARTLARI')}<p style="font-size:10pt">Kartları kesin. Her grup bir kart çeker, anlamını konuşmadan ya da kısa bir sahneyle canlandırır; diğer gruplar tahmin eder.</p><table>${[...DEYIMLER.slice(0, 10), ...ATASOZLERI.slice(0, 8)].map((d, i) => i % 2 === 0 ? `<tr><td style="height:70px;text-align:center"><b style="font-size:13pt">${esc(d[0])}</b><br><span style="font-size:9pt">${esc(d[1])}</span></td>` : `<td style="height:70px;text-align:center"><b style="font-size:13pt">${esc(d[0])}</b><br><span style="font-size:9pt">${esc(d[1])}</span></td></tr>`).join('')}</table>` },
  resimle:{ ad:'Atasözü / deyim resimleme kâğıdı', adim:'7.3', f:p => `${dzBas(p, 'SÖZÜ RESMET')}<table><tr><th style="width:30%">Seçtiğim deyim / atasözü</th><td style="height:38px"></td></tr><tr><th>Anlamı</th><td style="height:38px"></td></tr></table><div style="border:2px dashed #555;height:560px;margin-top:10px"></div>${ogrBas}<p style="font-size:10pt">Örnekler: ${ATASOZLERI.slice(0, 6).map(a => esc(a[0])).join(' · ')}</p>` },
  degerler:{ ad:'Değerler Ağacı çalışma kâğıdı', adim:'8.1', f:p => `${dzBas(p, 'DEĞERLER AĞACI', 'Mehmet Âkif Ersoy ve Türkçe')}<p>İstiklal Marşı'nı okuyun. Aşağıdaki değer sözcüklerinden üçünü seçin; her biri ağacımızın bir yaprağı olacak.</p><p style="text-align:center;font-size:14pt;line-height:2">${DEGER_SOZ.join(' · ')}</p><table><tr><th>Seçtiğim değer</th><th>İstiklal Marşı'nda geçtiği dize</th><th>Benim için anlamı</th></tr>${satirlar(3, 3)}</table><h3>Grup oyunu planı</h3><table><tr><th style="width:30%">Canlandıracağımız değer</th><td></td></tr><tr><th>Oyunun kısa konusu</th><td style="height:70px"></td></tr><tr><th>Roller</th><td style="height:40px"></td></tr></table>${ogrBas}` },
  turetme:{ ad:'Kelime Türetme oyunu puan çizelgesi', adim:'8.2', f:p => `${dzBas(p, 'KELİME TÜRETME')}<p><b>Kurallar:</b> İki öğrenci tahtaya kalkar. Birincinin söylediği sözcüğün son harfiyle ikinci öğrenci belirlenen sürede yeni bir sözcük söyler. Sözcükler proje kapsamında öğrenilenlerden seçilir; aynı sözcük iki kez söylenmez. Her geçerli sözcük bir puandır.</p><table><tr><th>Tur</th><th>1. öğrenci</th><th>Sözcük</th><th>2. öğrenci</th><th>Sözcük</th><th>Puan</th></tr>${Array.from({ length:12 }, (_, i) => `<tr><td>${i + 1}</td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}</table>` },
  siirkarti:{ ad:'Millî şiir kartı', adim:'8.3', f:p => `${dzBas(p, 'MİLLÎ ŞİİR KARTI')}${[1, 2].map(() => `<table style="margin-bottom:22px"><tr><th style="width:26%">Şiirin adı</th><td></td></tr><tr><th>Şairi</th><td></td></tr><tr><th>En sevdiğim dizeler</th><td style="height:110px"></td></tr><tr><th>Şiirdeki değerler</th><td style="height:40px"></td></tr><tr><th>Yeni öğrendiğim sözcükler ve anlamları</th><td style="height:60px"></td></tr><tr><th>Hazırlayan</th><td></td></tr></table>`).join('')}<p style="font-size:10pt">Öneri: Mehmet Âkif Ersoy'un İstiklal Marşı ve Çanakkale Şehitlerine şiirleri.</p>` },
  akifsozluk:{ ad:'Mehmet Âkif Ersoy Sözlüğü (yazar sözlüğü)', adim:'8.3', f:p => `${dzBas(p, 'MEHMET ÂKİF ERSOY SÖZLÜĞÜ', 'Yazar sözlüğü çalışması')}<p>İstiklal Marşı'nda geçen bazı sözcükler ve anlamları. Öğrenciler Safahat'tan yeni sözcükler ekleyerek sözlüğü büyütür.</p><table><tr><th>Sözcük</th><th>Anlamı</th><th>Günümüz Türkçesiyle örnek cümle</th></tr>${AKIF_SOZ.map(s => `<tr><td><b>${esc(s[0])}</b></td><td>${esc(s[1])}</td><td></td></tr>`).join('')}${satirlar(6, 3)}</table><p style="font-size:10pt">Anlamlar sozluk.gov.tr ile kontrol edilmelidir.</p>` },
  bunedir:{ ad:'"Bu Nedir?" bulmacası', adim:'9.1', f:p => `${dzBas(p, 'BU NEDİR?', 'Dede Korkut ve dilimizin zenginlikleri')}<p>İpuçlarını okuyun; son harfi verilen sözcüğü bulup kutulara yazın.</p>${BUNEDIR.map((b, i) => `<table style="margin-bottom:8px"><tr><th style="width:8%">${i + 1}</th><td><ol style="margin:0">${b[2].map(x => `<li>${esc(x)}</li>`).join('')}</ol></td><td style="width:34%;text-align:center;font-family:monospace;font-size:16pt">${'□ '.repeat(b[0].length - 1)}<b>${b[1]}</b></td></tr></table>`).join('')}<p style="font-size:9pt;transform:rotate(180deg);text-align:center">Cevaplar: ${BUNEDIR.map(b => b[0]).join(', ')}</p>` },
  mektup:{ ad:'23 Nisan "Dünya Çocuklarına Mesaj" mektup kâğıdı', adim:'9.2', f:p => `${dzBas(p, 'DÜNYA ÇOCUKLARINA MESAJ', '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı')}<p style="text-align:right">…/04/2027</p><p>Sevgili dünya çocukları,</p>${'<p style="border-bottom:1px solid #999;height:28px;margin:0"></p>'.repeat(18)}<p style="text-align:right">Sevgilerimle,<br>…………………… · ${esc(p.okul)}</p>` },
  dedekorkut:{ ad:'Dede Korkut okuma kâğıdı', adim:'9.3', f:p => `${dzBas(p, 'DEDE KORKUT HİKÂYELERİ')}<p><b>Dede Korkut Kitabı</b>, Oğuzların yiğitlik, dostluk ve aile değerlerini anlatan on iki hikâyeden oluşur. Hikâyeleri boyun bilge ozanı Dede Korkut anlatır ve dualar.</p><table><tr><th>No</th><th>Hikâye</th><th>Okudum ✓</th></tr>${DEDE_KORKUT.map((h, i) => `<tr><td>${i + 1}</td><td>${esc(h)}</td><td></td></tr>`).join('')}</table><h3>Okuduğum hikâye</h3><table><tr><th style="width:30%">Kahramanlar</th><td style="height:36px"></td></tr><tr><th>Olay özeti</th><td style="height:80px"></td></tr><tr><th>Hikâyedeki değerler</th><td style="height:36px"></td></tr><tr><th>Yeni sözcükler ve anlamları</th><td style="height:60px"></td></tr></table>${ogrBas}` },
  tiyatro:{ ad:'Tiyatro hazırlık formu', adim:'9.3', f:p => `${dzBas(p, 'SAHNEDE DEDE KORKUT')}<table><tr><th style="width:30%">Canlandıracağımız hikâye</th><td></td></tr><tr><th>Sahneler</th><td style="height:80px"></td></tr></table><table><tr><th>Rol</th><th>Öğrenci</th><th>Kostüm / aksesuar</th></tr>${satirlar(8, 3)}</table><table><tr><th>Oyunda kullanacağımız eski / yeni sözcükler</th><td style="height:60px"></td></tr><tr><th>Prova tarihleri</th><td></td></tr></table>` },
  kelimeanlat:{ ad:'Kelime Anlatma: sözcük kartları ve değerlendirme', adim:'10.2', f:p => `${dzBas(p, 'KELİME ANLATMA')}<p>Öğrenci bir sözcük çeker, hazırlık yapmadan yaklaşık bir dakika konuşur: anlamı, çağrıştırdıkları, günlük hayatta kullanımı.</p><table>${Array.from({ length:4 }, (_, r) => `<tr>${[...NEZAKET, ...DEGER_SOZ].slice(r * 4, r * 4 + 4).map(w => `<td style="text-align:center;font-size:14pt;height:40px">${w}</td>`).join('')}</tr>`).join('')}</table><h3>Değerlendirme (1–4)</h3><table><tr><th>Öğrenci</th><th>Anlamı doğru açıkladı</th><th>Örnek kullanım</th><th>Düşüncelerini düzenledi</th><th>Akıcılık / telaffuz</th><th>Toplam</th></tr>${satirlar(10, 6)}</table>` },
  turku:{ ad:'Köklerden Geleceğe: türkü ve öyküsü araştırma formu', adim:'10.3', f:p => `${dzBas(p, 'KÖKLERDEN GELECEĞE TÜRKÜLERİMİZ VE ÖYKÜLERİ')}<table><tr><th style="width:30%">Türkünün adı</th><td></td></tr><tr><th>Yöresi</th><td></td></tr><tr><th>Kaynak kişi / derleyen</th><td></td></tr><tr><th>Türkünün öyküsü (nasıl yakıldı?)</th><td style="height:120px"></td></tr><tr><th>Ezberlediğim dörtlük</th><td style="height:100px"></td></tr><tr><th>Türküdeki yöresel sözcükler ve anlamları</th><td style="height:70px"></td></tr><tr><th>Bilgileri nereden doğruladım?</th><td></td></tr></table>${ogrBas}` }
};
const PANO = {
  ana:['DİLİMİZİN ZENGİNLİKLERİ','Sözlük Özgürlüktür'], basari:['BAŞARI KÖŞESİ','Ayın sözcükleri ve en iyi çalışmalar'], sehrim:['ŞEHRİMİN DİL HAZİNELERİ','Evliya Çelebi\'nin izinde'], mahalle:['MAHALLEMİZİN SÖZCÜKLERİ','Büyüklerimizden öğrendiklerimiz'], sergi:['ATASÖZLERİ VE DEYİMLER SERGİSİ','Sözün özü'], degerler:['DEĞERLER AĞACI','Mehmet Âkif Ersoy ve Türkçe'], hikaye:['SÖZDEN GÖNÜLE KÖPRÜLER KUR','Nezaket hikâyelerimiz'], dedekorkut:['DEDE KORKUT','Oğuz\'un bilge ozanından'], turku:['KÖKLERDEN GELECEĞE','Türkülerimiz ve öyküleri'], sozcuk:['AYIN SÖZCÜKLERİ','Sözlükten öğrendiklerimiz']
};
function panoHTML(k) { const [t, alt] = PANO[k]; const p = prof();
  return `<style>@page{size:A4 landscape;margin:12mm}.ipucu{display:none}</style><div style="border:6px double #222;height:170mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10mm"><div style="font-size:14pt;letter-spacing:.2em">${esc(up(p.okul))}</div><div style="font-size:clamp(26px,9vw,54pt);font-weight:bold;line-height:1.1;margin:14mm 0 6mm;overflow-wrap:anywhere">${esc(t)}</div><div style="font-size:clamp(16px,4vw,22pt);font-style:italic">${esc(alt)}</div><div style="margin-top:14mm;font-size:12pt;letter-spacing:.15em">DİLİMİZİN ZENGİNLİKLERİ PROJESİ · ${DZP_YIL}</div></div>`; }

/* ---- Koordinatör evrakları ---- */
const dzImza = p => imzaTablo([`${esc(p.ad)}<br>Proje Okul Koordinatörü`, '…<br>Okul Yürütme Komisyonu Başkanı (Müdür Yardımcısı)']);
const dzpPlanTablo = (onlyOkul) => `<table><tr><th>No</th><th>Faaliyet / adım</th><th>Tarih</th><th>Sorumlu</th><th>Durum</th></tr>${DZP.map(f => `<tr><td colspan="5" style="background:#eee"><b>${f.no}. ${esc(f.ad)}</b> · ${esc(f.ay)}</td></tr>${f.adim.filter(a => !onlyOkul || a.okul).map(a => `<tr><td>${a.no}</td><td>${esc(a.ad)}</td><td>${dAralik(a)}</td><td>${esc(a.sorumlu)}</td><td>${dzpDurum(a.no).ok ? 'Yapıldı' + (dzpDurum(a.no).tarih ? ' (' + fmtD(dParse(dzpDurum(a.no).tarih)) + ')' : '') : ''}</td></tr>`).join('')}`).join('')}</table>`;
EV_TPL.splice(EV_TPL.findIndex(t => t.k === 'dzp_plan'), 2,
  { k:'dzp_plan', kat:'Proje', ad:'DZP Okul Eylem Planı 2026-2027', not:'Ortaokul eylem planının 11 faaliyeti ve tüm adımları, tarihleriyle.', f:p => `${dzBas(p, 'OKUL EYLEM PLANI', 'Ortaokul kademesi')}<p>Bu plan, Bakanlığın 23.09.2026 tarihli yazısı ekindeki Dilimizin Zenginlikleri Projesi Uygulama Kılavuzu ve Ortaokul Kademesi Eylem Planı esas alınarak okulumuzun yıllık çalışma takvimine işlenmiştir. Faaliyetler e-Okul Sosyal Etkinlik Modülü'ne kaydedilir.</p>${dzpPlanTablo(false)}${dzImza(p)}${onay(p)}` },
  { k:'dzp_rapor', kat:'Proje', ad:'DZP Faaliyet Raporu', not:'Her faaliyet için; Takip ekranından adıma özel doldurulmuş olarak da oluşturulur.', f:(p, c) => dzpRaporHTML(p, c && c.adim) },
  { k:'dzp_komisyon', kat:'Proje', ad:'DZP Okul Yürütme Komisyonu Oluşturma Tutanağı', not:'Komisyon üyeleri ve kılavuzdaki görevler.', f:p => `${dzBas(p, 'OKUL YÜRÜTME KOMİSYONU OLUŞTURMA TUTANAĞI')}<p>Dilimizin Zenginlikleri Projesi Uygulama Kılavuzu gereğince okulumuzda Okul Yürütme Komisyonu …/10/2026 tarihinde aşağıdaki şekilde oluşturulmuştur.</p><table><tr><th>Görevi</th><th>Adı soyadı</th><th>Branşı / sınıfı</th><th>İmza</th></tr><tr><td>Komisyon başkanı (müdür yardımcısı)</td><td></td><td></td><td></td></tr><tr><td>Proje okul koordinatörü</td><td>${esc(p.ad)}</td><td>${esc(p.brans)}</td><td></td></tr><tr><td>Üye öğretmen</td><td></td><td>Türkçe</td><td></td></tr><tr><td>Üye öğretmen</td><td></td><td>Türkçe</td><td></td></tr><tr><td>Üye öğretmen</td><td></td><td></td><td></td></tr>${[5, 6, 7, 8].map(s => `<tr><td>Öğrenci üye (${s}. sınıf)</td><td></td><td>${s}/…</td><td></td></tr>`).join('')}</table><h3>Komisyonun görevleri</h3><ol><li>Ortaokul eylem planındaki faaliyetleri Türkçe zümresiyle koordineli olarak planlamak ve tüm sınıflarda uygulanmasını sağlamak.</li><li>Projenin okulda görünür olmasını sağlamak (pano, okul internet sayfası, güvenli dijital ortamlar).</li><li>Her faaliyetten önce hedef gruba duyuru yapmak.</li><li>İl ve ilçe genelindeki yarışmaları duyurmak, katılımı teşvik etmek.</li><li>Faaliyetlerin e-Okul Sosyal Etkinlik Modülü'ne kaydını sağlamak.</li><li>Dönem sonu iyi örnekleri seçip paylaşmak.</li><li>Yıl sonu raporunu hazırlayıp İlçe Yürütme Komisyonuna göndermek.</li></ol>${onay(p)}` },
  { k:'dzp_gorev', kat:'Proje', ad:'DZP Görev Dağılımı Çizelgesi', not:'Okulda yapılacak her adım için sorumlu öğretmen ve sınıflar.', f:p => `${dzBas(p, 'GÖREV DAĞILIMI ÇİZELGESİ')}<table><tr><th>No</th><th>Adım</th><th>Tarih</th><th>Sorumlu öğretmen(ler)</th><th>Sınıflar</th></tr>${DZP_ADIMLAR.filter(a => a.okul).map(a => `<tr><td>${a.no}</td><td>${esc(a.ad)}</td><td>${dAralik(a)}</td><td></td><td>Tüm sınıflar</td></tr>`).join('')}</table>${dzImza(p)}${onay(p)}` },
  { k:'dzp_duyuru', kat:'Proje', ad:'DZP Faaliyet Duyurusu', not:'Öğrenci ve velilere duyuru metni.', f:p => `${dzBas(p, 'DUYURU')}<p style="font-size:14pt">Sevgili öğrencilerimiz ve değerli velilerimiz,</p><p style="font-size:14pt">Dilimizin Zenginlikleri Projesi kapsamında okulumuzda <b>…/…/20… – …/…/20…</b> tarihleri arasında <b>"…"</b> etkinliği yapılacaktır.</p><p style="font-size:14pt">Katılım: … · Teslim yeri: Türkçe öğretmenleri · Ayrıntılı bilgi: …</p><p style="font-size:14pt;text-align:right">Okul Yürütme Komisyonu</p>` },
  { k:'dzp_sartname_hikaye', kat:'Proje', ad:'"Sözden Gönüle Köprüler Kur" Okul Yarışma Şartnamesi', not:'Tema nezaket; takvim eylem planına göre. Okul taslağıdır.', f:p => `${dzBas(p, '"SÖZDEN GÖNÜLE KÖPRÜLER KUR" HİKÂYE YARIŞMASI ŞARTNAMESİ', 'Okul düzeyi')}<h3>1. Amaç</h3><p>Öğrencilerin nezaket temasında, Türkçenin söz varlığını doğru ve yerinde kullanarak özgün hikâyeler yazmasını teşvik etmek.</p><h3>2. Katılım</h3><p>Okulumuzun 5, 6, 7 ve 8. sınıf öğrencileri. Her öğrenci bir hikâyeyle katılabilir.</p><h3>3. Konu ve şartlar</h3><ol><li>Tema: <b>Nezaket</b>.</li><li>Hikâyede şu sözcüklerden en az beşi anlamına uygun kullanılmalıdır: ${NEZAKET.join(', ')}.</li><li>Uzunluk: 5-6. sınıflar 250–500 sözcük; 7-8. sınıflar 400–800 sözcük.</li><li>Hikâye özgün olmalı, daha önce yayımlanmamış olmalı; yapay zekâya yazdırılmış metinler kabul edilmez.</li><li>El yazısıyla okunaklı ya da bilgisayarda yazılabilir; başlık bulunmalıdır.</li><li>Kâğıdın arkasına öğrencinin adı, sınıfı ve numarası yazılır; değerlendirme isim görülmeden yapılır.</li></ol><h3>4. Takvim</h3><table><tr><td>Şartnamenin hazırlanması</td><td>28–29 Aralık 2026</td></tr><tr><td>Duyuru ve yarışma ortamının hazırlanması</td><td>29 Aralık 2026</td></tr><tr><td>Yarışmanın yürütülmesi, eserlerin teslimi</td><td>29 Aralık 2026 – 12 Ocak 2027</td></tr><tr><td>Sonuçların açıklanması</td><td>15 Ocak 2027</td></tr></table><h3>5. Değerlendirme ölçütleri (100 puan)</h3><table><tr><th>Ölçüt</th><th>Puan</th></tr><tr><td>Temaya (nezaket) uygunluk</td><td>20</td></tr><tr><td>Anahtar sözcüklerin anlamına uygun kullanımı</td><td>20</td></tr><tr><td>Kurgu (olay örgüsü, kahramanlar, çatışma ve çözüm)</td><td>20</td></tr><tr><td>Dil ve anlatım, yazım ve noktalama</td><td>20</td></tr><tr><td>Özgünlük ve yaratıcılık</td><td>20</td></tr></table><h3>6. Jüri ve ödül</h3><p>Değerlendirme Okul Yürütme Komisyonu ve Türkçe öğretmenlerinden oluşan jüri tarafından yapılır. Her sınıf düzeyinde ilk üç esere belge verilir; dereceye giren eserler okul panosunda ve okul internet sayfasında yayımlanır.</p><p style="font-size:10pt">Not: İl veya ilçe yürütme komisyonu ayrıca şartname yayımlarsa o şartname esas alınır.</p>${dzImza(p)}${onay(p)}` },
  { k:'dzp_sartname_turku', kat:'Proje', ad:'"Köklerden Geleceğe Türkülerimiz ve Öyküleri" Okul Yarışma Şartnamesi', not:'Okul içi yarışma (24–28 Mayıs). Okul taslağıdır.', f:p => `${dzBas(p, '"KÖKLERDEN GELECEĞE TÜRKÜLERİMİZ VE ÖYKÜLERİ" YARIŞMA ŞARTNAMESİ', 'Okul içi yarışma')}<h3>1. Amaç</h3><p>Türkülerimizi, yakılış öykülerini ve içerdiği yöresel söz varlığını araştırmak, ezberlemek ve gelecek kuşaklara aktarmak.</p><h3>2. Katılım ve kategoriler</h3><p>5–8. sınıf öğrencileri bireysel ya da en çok üç kişilik gruplarla katılır.</p><ol><li><b>Sözlü sunum:</b> Türküyü ve öyküsünü 3–5 dakikada anlatma; en az bir dörtlüğü ezbere okuma ya da seslendirme.</li><li><b>Yazılı çalışma:</b> Türkünün öyküsünü ve içindeki yöresel sözcükleri anlatan yazı (en çok iki sayfa).</li><li><b>Görsel çalışma:</b> Türküyü ve öyküsünü anlatan resim / afiş.</li></ol><h3>3. Takvim</h3><p>Duyuru: 10–14 Mayıs 2027 (Türkü Dinleme Günü ile birlikte) · Yarışma: 24–28 Mayıs 2027</p><h3>4. Değerlendirme ölçütleri (100 puan)</h3><table><tr><td>Araştırmanın doğruluğu ve kaynak gösterme</td><td>25</td></tr><tr><td>Türkünün öyküsünü anlatma / ifade gücü</td><td>25</td></tr><tr><td>Yöresel sözcüklerin açıklanması (sözlük kullanımı)</td><td>20</td></tr><tr><td>Ezber ve seslendirme ya da görsel tasarım</td><td>20</td></tr><tr><td>Özgünlük</td><td>10</td></tr></table>${dzImza(p)}${onay(p)}` },
  { k:'dzp_juri', kat:'Proje', ad:'DZP Jüri Değerlendirme Formu', not:'Kılavuzdaki dört ölçüt: özgünlük, dil doğruluğu, sözlük kullanımı, paylaşılabilirlik.', f:p => `${dzBas(p, 'JÜRİ DEĞERLENDİRME FORMU', 'Etkinlik: ……………………')}<table><tr><th>S.No</th><th>Öğrenci / eser</th><th>Sınıf</th><th>Özgünlük (25)</th><th>Dil doğruluğu (25)</th><th>Sözlük kullanımı (25)</th><th>Paylaşılabilirlik (25)</th><th>Toplam</th></tr>${Array.from({ length:15 }, (_, i) => `<tr><td>${i + 1}</td>${'<td></td>'.repeat(7)}</tr>`).join('')}</table><table class="imza"><tr><td>…<br>Jüri Üyesi</td><td>…<br>Jüri Üyesi</td><td>${esc(p.ad)}<br>Jüri Üyesi</td></tr></table>` },
  { k:'dzp_sonuc', kat:'Proje', ad:'DZP Yarışma Sonuç Tutanağı', not:'Dereceye girenler.', f:p => `${dzBas(p, 'YARIŞMA SONUÇ TUTANAĞI', 'Yarışma: ……………………')}<p>Jüri değerlendirmesi sonucunda aşağıdaki öğrencilerimiz dereceye girmiştir.</p><table><tr><th>Sınıf düzeyi</th><th>Derece</th><th>Öğrenci</th><th>Eser adı</th><th>Puan</th></tr>${[5, 6, 7, 8].map(s => [1, 2, 3].map(d => `<tr><td>${s}. sınıf</td><td>${d}.</td><td></td><td></td><td></td></tr>`).join('')).join('')}</table>${dzImza(p)}${onay(p)}` },
  { k:'dzp_iyiornek', kat:'Proje', ad:'DZP Dönem Sonu İyi Örnekler Dosyası', not:'Seçilen ürünler ve ölçüt puanları; okul-ilçe-il paylaşımı.', f:p => `${dzBas(p, 'DÖNEM SONU İYİ ÖRNEKLER', '1. dönem · 18–22 Ocak 2027')}<p>Dönem boyunca yapılan faaliyetlerden seçilen ürünler aşağıdaki ölçütlere göre değerlendirilmiş ve ilçe yürütme komisyonuyla paylaşılmak üzere seçilmiştir.</p><table><tr><th>S.No</th><th>Ürün</th><th>Faaliyet</th><th>Öğrenci(ler) / sınıf</th><th>Özgünlük</th><th>Dil doğruluğu</th><th>Sözlük kullanımı</th><th>Paylaşılabilirlik</th></tr>${Array.from({ length:10 }, (_, i) => `<tr><td>${i + 1}</td>${'<td></td>'.repeat(7)}</tr>`).join('')}</table>${dzImza(p)}${onay(p)}` },
  { k:'dzp_veli', kat:'Proje', ad:'DZP Veli Bilgilendirme: Ailemle Deyim ve Atasözleri', not:'7.1 adımı için veli mektubu.', f:p => `${dzBas(p, 'DEĞERLİ VELİMİZ')}<p>Okulumuzda yürütülen Dilimizin Zenginlikleri Projesi kapsamında <b>8–12 Şubat 2027</b> tarihleri arasında "Ailemle Deyim ve Atasözleri" etkinliği yapılacaktır.</p><p>Çocuğunuza verilen sözcüklerle ilgili bildiğiniz deyim ve atasözlerini anlamlarıyla birlikte onunla konuşmanızı, birlikte forma yazmanızı rica ederiz. Büyüklerimizden öğrenilen her söz, dilimizin yaşayan hazinesidir.</p><p>İlginiz ve katkınız için teşekkür ederiz.</p><p style="text-align:right">${esc(p.ad)}<br>Proje Okul Koordinatörü</p>` },
  { k:'dzp_veli_turku', kat:'Proje', ad:'DZP Veli Daveti: Türkü Dinleme Günü', not:'10.2 adımı için aile daveti.', f:p => `${dzBas(p, 'TÜRKÜ DİNLEME GÜNÜNE DAVET')}<p>Değerli velimiz,</p><p>Dilimizin Zenginlikleri Projesi kapsamında <b>…/05/2027</b> günü saat <b>…:…</b>'da okulumuzda ailelerimizle birlikte "Türkü Dinleme Günü" düzenlenecektir. Türkülerimizi ve öykülerini birlikte dinleyecek, yöresel sözcükleri birlikte keşfedeceğiz.</p><p>Sizleri de aramızda görmekten mutluluk duyarız. Bildiğiniz bir türküyü ve öyküsünü bizimle paylaşmak isterseniz öğretmenlerimize haber veriniz.</p><p style="text-align:right">Okul Yürütme Komisyonu</p>` },
  { k:'dzp_yilsonu', kat:'Proje', ad:'DZP Okul Yıl Sonu Raporu', not:'Takip ekranındaki verilerle kendiliğinden dolar; ilçe komisyonuna gönderilir.', f:p => dzpYilSonuHTML(p) }
);
function dzpRaporHTML(p, no) { const a = no ? DZP_ADIMLAR.find(x => x.no === no) : null; const d = no ? dzpDurum(no) : {};
  return `${dzBas(p, 'FAALİYET RAPORU')}<table><tr><th style="width:30%">Faaliyet</th><td>${a ? `${a.f.no}. ${esc(a.f.ad)}` : '…'}</td></tr><tr><th>Adım</th><td>${a ? `${a.no} ${esc(a.ad)}` : '…'}</td></tr><tr><th>Planlanan tarih</th><td>${a ? dAralik(a) : '…'}</td></tr><tr><th>Uygulama tarihi</th><td>${d.tarih ? fmtD(dParse(d.tarih)) : '…/…/20…'}</td></tr><tr><th>Uygulanan sınıflar</th><td>${esc(d.siniflar || '…')}</td></tr><tr><th>Katılan öğrenci sayısı</th><td>${esc(d.katilim || '…')}</td></tr><tr><th>Uygulayan öğretmenler</th><td>${esc(p.ad)}, …</td></tr><tr><th>e-Okul Sosyal Etkinlik Modülü kaydı</th><td>${d.eokul ? 'Yapıldı' : '☐ Yapıldı'}</td></tr></table><h3>Uygulama süreci</h3><p>${esc(d.not || (a && a.not) || '…')}</p><h3>Ortaya çıkan ürünler</h3><p>…</p><h3>Değerlendirme</h3><p>…</p><p><i>Kanıt ve fotoğraflar "Dosyalar › Projeler" klasöründedir${d.dosyalar && d.dosyalar.length ? ' (' + d.dosyalar.length + ' dosya)' : ''}. Öğrenci görselleri veli izni alınmadan paylaşılmaz (KVKK).</i></p>${dzImza(p)}`; }
function dzpYilSonuHTML(p) { const ok = DZP_ADIMLAR.filter(a => a.okul); const yap = ok.filter(a => dzpDurum(a.no).ok); const eo = ok.filter(a => dzpDurum(a.no).eokul); const kanit = ok.reduce((t, a) => t + ((dzpDurum(a.no).dosyalar || []).length), 0);
  return `${dzBas(p, 'OKUL YIL SONU RAPORU')}<table><tr><th>Okul</th><td>${esc(p.okul)}</td><th>İlçe / il</th><td>${esc(p.ilce)} / ${esc(p.il)}</td></tr><tr><th>Okul koordinatörü</th><td>${esc(p.ad)}</td><th>Komisyon başkanı</th><td>…</td></tr><tr><th>Okulda uygulanacak adım</th><td>${ok.length}</td><th>Uygulanan adım</th><td>${yap.length} (%${Math.round(yap.length / ok.length * 100)})</td></tr><tr><th>e-Okul'a kaydedilen</th><td>${eo.length}</td><th>Kanıt / fotoğraf</th><td>${kanit}</td></tr></table><h3>Faaliyetlerin uygulanma durumu</h3><table><tr><th>No</th><th>Adım</th><th>Plan</th><th>Uygulama</th><th>Sınıflar / katılım</th><th>e-Okul</th></tr>${ok.map(a => { const d = dzpDurum(a.no); return `<tr><td>${a.no}</td><td>${esc(a.ad)}</td><td>${dAralik(a)}</td><td>${d.ok ? (d.tarih ? fmtD(dParse(d.tarih)) : 'Yapıldı') : 'Yapılmadı'}</td><td>${esc([d.siniflar, d.katilim ? d.katilim + ' öğrenci' : ''].filter(Boolean).join(' · '))}</td><td>${d.eokul ? '✓' : ''}</td></tr>`; }).join('')}</table><h3>Öne çıkan iyi örnekler</h3><p>…</p><h3>Karşılaşılan güçlükler ve öneriler</h3><p>…</p>${dzImza(p)}${onay(p)}`; }

/* ---- Çizelge şablonları ---- */
CZ_TPL.splice(CZ_TPL.length - 1, 0,
  { k:'dzp_okuma', ad:'DZP Klasik Eser Okuma Takip', not:'Eser, sayfa, yeni sözcük sayısı, kelime defteri.', cols:[['Okunan eser','metin'],['Sayfa','sayi'],['Yeni sözcük sayısı','sayi'],['Kelime defteri','check'],['Sözcük kartı','check']] },
  { k:'dzp_katilim', ad:'DZP Etkinlik Katılım Çizelgesi', not:'Her DZP etkinliği için katılım ve ürün teslimi.', cols:[['Bilen Oturur','check'],['Başarı Köşesi','check'],['Gezi yazısı','check'],['Şehrimin Dil Hazineleri','check'],['Hikâye yarışması','check'],['Türkçesini Söyleyelim','check'],['Mahallemizin Sözcükleri','check'],['Ailemle Deyim','check'],['Drama','check'],['Resimleme','check'],['Değerler Ağacı','check'],['Bu Nedir?','check'],['Sözcük kartı (YZ)','check'],['Kelime Anlatma','olcek']] }
);

/* ---- Sayfa ---- */
const DZP_TABS = [['plan','Eylem planı ve takip'],['evrak','Koordinatör dosyası'],['mat','Öğrenci materyalleri'],['pano','Pano başlıkları'],['bilgi','Proje bilgileri']];
function matButon(m) { if (m.startsWith('m:')) { const x = MAT[m.slice(2)]; return x ? `<button class="btn sm" style="white-space:normal;text-align:left" data-act="dzp-mat" data-k="${m.slice(2)}">${esc(x.ad)}</button>` : ''; }
  if (m.startsWith('ev:')) { const t = EV_TPL.find(z => z.k === m.slice(3)); return t ? `<button class="btn sm" style="white-space:normal;text-align:left" data-act="ev-new" data-k="${t.k}">${esc(t.ad)}</button>` : ''; }
  if (m.startsWith('p:')) { const x = PANO[m.slice(2)]; return x ? `<button class="btn sm" data-act="dzp-pano" data-k="${m.slice(2)}">Pano: ${esc(x[0])}</button>` : ''; }
  if (m.startsWith('cz:')) return `<button class="btn sm" data-act="cz-new" data-t="${m.slice(3)}">Çizelge oluştur</button>`; return ''; }
PAGES.dzp = () => {
  const tab = S.dzTab || 'plan'; const ok = DZP_ADIMLAR.filter(a => a.okul); const yap = ok.filter(a => dzpDurum(a.no).ok).length; const gec = ok.filter(a => dzpZaman(a) === 'gecti').length; const simdi = DZP_ADIMLAR.filter(a => a.okul && dzpZaman(a) === 'simdi');
  let body = '';
  if (tab === 'plan') {
    body = `${simdi.length ? `<section class="card" style="border-color:var(--blue);background:var(--blue-soft)"><h3>Şu an uygulanacak</h3>${simdi.map(a => `<div style="margin-top:6px"><b>${a.no}</b> ${esc(a.ad)} · <span class="muted">${dAralik(a)}</span></div>`).join('')}</section>` : ''}
    ${gec ? `<div class="banner">Tarihi geçmiş ama "yapıldı" işaretlenmemiş ${gec} adım var. Yaptıysanız işaretleyin; yapılmadıysa yıl sonu raporunda görünür.</div>` : ''}
    ${DZP.map(f => `<section class="card"><div class="row between"><h3 style="margin:0">${f.no}. ${esc(f.ad)}</h3><span class="pill">${esc(f.ay)}</span></div>
      ${f.adim.map(a => { const d = dzpDurum(a.no); const z = dzpZaman(a); return `<div class="check" style="align-items:flex-start;${a.okul ? '' : 'opacity:.7'}">${a.okul ? `<button class="box ${d.ok ? 'on' : ''}" data-act="dzp-ok" data-k="${a.no}" aria-label="Yapıldı">${d.ok ? '✓' : ''}</button>` : '<span class="box" style="border-style:dotted"></span>'}
        <div style="flex:1;min-width:0"><div><b class="num">${a.no}</b> ${esc(a.ad)} ${z === 'simdi' ? '<span class="pill blue">bu hafta</span>' : z === 'gecti' && a.okul ? '<span class="pill red">gecikti</span>' : ''}${d.eokul ? ' <span class="pill ok">e-Okul ✓</span>' : ''}${(d.dosyalar || []).length ? ` <span class="pill">${d.dosyalar.length} kanıt</span>` : ''}</div>
        <small class="muted">${dAralik(a)} · ${esc(a.sorumlu)}${d.tarih ? ' · uygulandı ' + fmtD(dParse(d.tarih)) : ''}</small>${a.not ? `<div class="note" style="margin-top:2px">${esc(a.not)}</div>` : ''}
        ${a.okul ? `<div class="row" style="margin-top:8px;gap:6px">${a.mat.map(matButon).join('')}<button class="btn sm" data-act="dzp-detay" data-k="${a.no}">Kayıt ve kanıt</button><button class="btn sm" data-act="dzp-rapor" data-k="${a.no}">Faaliyet raporu</button></div>` : ''}</div></div>`; }).join('')}</section>`).join('')}`;
  } else if (tab === 'evrak') {
    const ks = ['dzp_komisyon','dzp_gorev','dzp_plan','dzp_duyuru','dzp_sartname_hikaye','dzp_sartname_turku','dzp_juri','dzp_sonuc','dzp_iyiornek','dzp_veli','dzp_veli_turku','dzp_rapor','dzp_yilsonu'];
    const ev = evraklar().filter(e => e.kategori === 'Proje');
    body = `<section class="card"><h2>Koordinatör ve komisyon evrakları</h2><p class="note" style="margin-bottom:12px">Okul bilgileriniz ve eylem planı tarihleri hazır gelir. Düzenleyip yazdırabilir, müdür onayına sunabilirsiniz.</p><div class="grid g3">${ks.map(k => EV_TPL.find(t => t.k === k)).filter(Boolean).map(t => `<button class="tpl" data-act="ev-new" data-k="${t.k}"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></button>`).join('')}</div></section>
      <section class="card"><h2>Hazırladığım proje belgeleri</h2>${ev.length ? `<div class="list">${ev.map(e => `<button class="li" data-act="open-evrak" data-id="${e.id}">${icon('evraklar')}<span class="t"><b>${esc(e.baslik)}</b><small>${fmtD(e.guncelleme)}</small></span></button>`).join('')}</div>` : '<p class="muted">Henüz belge yok.</p>'}</section>
      <section class="card"><h2>Takip çizelgeleri</h2><div class="row"><button class="btn" data-act="cz-new" data-t="dzp_katilim">Etkinlik katılım çizelgesi</button><button class="btn" data-act="cz-new" data-t="dzp_okuma">Klasik eser okuma takip</button></div></section>`;
  } else if (tab === 'mat') {
    body = `<section class="card"><h2>Öğrenci materyalleri</h2><p class="note" style="margin-bottom:12px">Yazdırıp sınıfta dağıtabilir ya da tahtaya yansıtabilirsiniz. Her materyal eylem planındaki adımla eşleşir.</p><div class="list">${Object.entries(MAT).map(([k, m]) => `<button class="li" data-act="dzp-mat" data-k="${k}">${icon('file')}<span class="t"><b>${esc(m.ad)}</b><small>Adım ${esc(m.adim)}</small></span></button>`).join('')}</div></section>`;
  } else if (tab === 'pano') {
    body = `<section class="card"><h2>Pano başlıkları</h2><p class="note" style="margin-bottom:12px">A4 yatay büyük başlıklar. Yazdırıp panoya asabilir, renkli kartona basabilirsiniz.</p><div class="grid g3">${Object.entries(PANO).map(([k, v]) => `<button class="tpl" data-act="dzp-pano" data-k="${k}" style="text-align:center;padding:18px;border:3px double var(--line2)"><b style="font-size:16px">${esc(v[0])}</b><small>${esc(v[1])}</small></button>`).join('')}</div></section>`;
  } else {
    body = `<section class="card"><h2>Proje bilgileri</h2>
      <div class="law"><div class="hd"><b>Dayanak</b></div><ul><li>Millî Eğitim Bakanlığı Ortaöğretim Genel Müdürlüğünün 23.09.2026 tarihli yazısı: proje 2026-2027'de tüm resmî ve özel okullarda kesintisiz sürer, Valilikler koordinesinde yürütülür.</li><li>Türkiye Yüzyılı Maarif Modeli ve 2026/70 sayılı Genelge'nin 1. maddesi.</li><li>Uygulama Kılavuzu (Ekim 2026), slogan: <b>"Sözlük Özgürlüktür"</b>; ekler: kademe eylem planları (EK-3 Ortaokul).</li></ul></div>
      <div class="law"><div class="hd"><b>Amaç</b></div><p>Öğrencilerin yaş ve gelişim düzeyine uygun biçimde söz varlığını geliştirmek, sözlük kullanma alışkanlığı kazandırmak ve sözcükleri doğru bağlamda kullanmalarını desteklemek.</p></div>
      <div class="law"><div class="hd"><b>Yürütme yapısı</b></div><ul><li><b>Merkez Yürütme Kurulu</b> (Ortaöğretim Genel Müdürlüğü): planlama, izleme, yıl sonu şöleni.</li><li><b>İl Yürütme Komisyonu</b>: il geneli yarışmalar, yıl sonu materyalleri ve raporu.</li><li><b>İlçe Yürütme Komisyonu</b>: okullarda uygulanma oranını izler, il yarışmalarını duyurur, yıl sonu raporunu ile gönderir.</li><li><b>Okul Yürütme Komisyonu</b>: müdür yardımcısı başkanlığında, en az iki öğretmen ve her sınıf düzeyinden birer öğrenci. Ortaokulda Türkçe zümresiyle koordineli çalışır; projenin görünürlüğünü ve tüm sınıflarda uygulanmasını sağlar; yarışmaları duyurur; yıl sonu raporunu ilçeye gönderir.</li></ul></div>
      <div class="law"><div class="hd"><b>Okulun yükümlülükleri</b></div><ul><li>Eylem planını okulun yıllık çalışma takvimine işlemek.</li><li>Her faaliyetten önce hedef gruba duyuru yapmak.</li><li>Uygun öğrenci ürünlerini okul panosunda, okul internet sayfasında ya da güvenli dijital ortamlarda paylaşmak.</li><li>Faaliyetleri <b>e-Okul Sosyal Etkinlik Modülü</b>'ne kaydetmek.</li><li>Dijital ve yapay zekâ çalışmalarında KVKK, telif, kaynak gösterme, güvenli internet ve yaşa uygunluk ilkelerine uymak.</li><li>Özel eğitim ihtiyacı olan öğrenciler için içerik, süre, materyal ve değerlendirmeyi uyarlamak.</li></ul></div>
      <div class="law"><div class="hd"><b>İyi örnek ölçütleri</b></div><p>Özgünlük · Dil doğruluğu · Sözlük kullanımı · Paylaşılabilirlik</p></div>
      <div class="law"><div class="hd"><b>Ortaokul eser listesi</b></div><ul>${ESER_LISTESI.map(e => `<li>${esc(e[0])} <span class="muted">(${e[1]}. sınıflar)</span></li>`).join('')}</ul></div>
      <div class="law"><div class="hd"><b>Sözlükler</b></div><div class="row"><a class="btn sm" href="https://sozluk.gov.tr" target="_blank" rel="noopener">Güncel Türkçe Sözlük ↗</a><a class="btn sm" href="https://lugatim.com" target="_blank" rel="noopener">Kubbealtı Lugatı ↗</a><a class="btn sm" href="https://www.meb.gov.tr/meb_iys_dosyalar/2026_10/6ac3bac6d7fff116062289_Dilimizin_Zenginlikleri_Uygulama_Kilavuzu.pdf" target="_blank" rel="noopener">Uygulama Kılavuzu (MEB) ↗</a></div></div>
      <p class="note">Adım tarihleri ortaokul eylem planından alınmıştır. İl veya ilçenizden farklı tarih gelirse "Kayıt ve kanıt" bölümüne not düşün; resmî yazı her zaman esastır.</p></section>`;
  }
  return `<div><button class="btn ghost sm" data-act="open-modul" data-id="proje">${icon('back')}Projeler</button></div>
  <div class="pagehead"><div><h1>Dilimizin Zenginlikleri</h1><p>"Sözlük Özgürlüktür" · ${DZP_YIL} ortaokul eylem planı. Koordinatör: ${esc(prof().ad)}</p></div><div class="row"><span class="pill ${yap === ok.length ? 'ok' : 'blue'}">${yap}/${ok.length} okul adımı yapıldı</span></div></div>
  <div class="chips">${DZP_TABS.map(([k, t]) => `<button class="chip" data-act="dzp-tab" data-k="${k}" aria-pressed="${tab === k}">${t}</button>`).join('')}</div>${body}`;
};
Object.assign(ACT, {
  'dzp-tab': b => { S.dzTab = b.dataset.k; if (S.page !== 'dzp') go('dzp'); else render(); },
  'dzp-ok': b => { const d = dzpGet(); const cur = (d.a || {})[b.dataset.k] || {}; d.a = { ...(d.a || {}), [b.dataset.k]:{ ...cur, ok:!cur.ok, tarih:!cur.ok ? (cur.tarih || isoDay(0)) : cur.tarih } }; Store.put('dzp', d, true); render(); },
  'dzp-mat': b => { const m = MAT[b.dataset.k]; printHTML(m.ad, m.f(prof())); },
  'dzp-pano': b => printHTML('Pano · ' + PANO[b.dataset.k][0], panoHTML(b.dataset.k)),
  'dzp-rapor': b => { const a = DZP_ADIMLAR.find(x => x.no === b.dataset.k); const id = rid('evrak'); Store.put(id, { type:'evrak', baslik:`DZP Faaliyet Raporu · ${a.no} ${a.ad}`, kategori:'Proje', sablon:'dzp_rapor', html:dzpRaporHTML(prof(), a.no), olusturma:Date.now() }, true); go('evrak', id); },
  'dzp-detay': b => { const a = DZP_ADIMLAR.find(x => x.no === b.dataset.k); const d = dzpDurum(a.no); const fl = (d.dosyalar || []).map(id => Store.get(id)).filter(Boolean);
    openModal(`${a.no} ${esc(a.ad)}`, `<p class="note">${dAralik(a)} · ${esc(a.sorumlu)}</p>
      <div class="fgrid"><div class="field"><label for="dz-t">Uygulama tarihi</label><input class="inp" type="date" id="dz-t" value="${esc(d.tarih || '')}"></div><div class="field"><label for="dz-s">Uygulanan sınıflar</label><input class="inp" id="dz-s" value="${esc(d.siniflar || '')}" placeholder="ör. 5A, 6A, 7B"></div><div class="field"><label for="dz-k">Katılan öğrenci sayısı</label><input class="inp" id="dz-k" inputmode="numeric" value="${esc(d.katilim || '')}"></div></div>
      <div class="field"><label for="dz-n">Uygulama notu</label><textarea class="inp" id="dz-n" style="min-height:70px;font-family:var(--f-body)">${esc(d.not || '')}</textarea></div>
      <label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" id="dz-ok" ${d.ok ? 'checked' : ''}> Yapıldı</label><label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" id="dz-e" ${d.eokul ? 'checked' : ''}> e-Okul Sosyal Etkinlik Modülü'ne kaydedildi</label>
      <div class="row"><label class="btn sm" for="dz-f">${icon('up')}Kanıt / fotoğraf ekle</label><input type="file" id="dz-f" data-in="dzp-f" data-k="${a.no}" multiple hidden></div>
      ${fl.length ? `<div class="row">${fl.map(f => `<button class="fcard" data-act="dz-open" data-id="${f.id}" style="width:100px"><div class="fthumb">${/^image\//.test(f.ct) ? `<img data-fid="${esc(f.assetId)}" alt="">` : `<span class="ext">${esc(f.ext)}</span>`}</div></button>`).join('')}</div>` : ''}
      <p class="note">Öğrenci yüzü görünen fotoğrafları paylaşmadan önce veli izni alın (KVKK).</p>`,
      `<button class="btn" data-act="modal-close">Vazgeç</button><button class="btn primary" data-act="dzp-kaydet" data-k="${a.no}">Kaydet</button>`, true); },
  'dzp-kaydet': b => { const d = dzpGet(); const cur = (d.a || {})[b.dataset.k] || {}; d.a = { ...(d.a || {}), [b.dataset.k]:{ ...cur, tarih:$('#dz-t').value, siniflar:$('#dz-s').value.trim(), katilim:$('#dz-k').value.trim(), not:$('#dz-n').value.trim(), ok:$('#dz-ok').checked, eokul:$('#dz-e').checked } }; Store.put('dzp', d, true); closeModal(); render(); toast('Kaydedildi.'); }
});
document.addEventListener('change', async e => { const el = e.target; if (!el.dataset || el.dataset.in !== 'dzp-f' || !el.files.length) return; const no = el.dataset.k; const ids = [];
  for (const f of el.files) { let bl = f; if (/^image\//.test(f.type) && f.size > 1.5e6) bl = await shrinkTo(f, 2200); const r = await Files.upload(bl); const ext = /^image\//.test(bl.type) ? 'jpg' : (f.name.split('.').pop() || '').toLowerCase(); const id = rid('dosya'); Store.put(id, { type:'dosya', ad:`DZP ${no} - ${f.name.replace(/\.[^.]+$/, '')}.${ext}`, klasor:'Projeler', assetId:r.id, ct:bl.type || f.type, ext, b64:false, orjTip:f.type, boyut:bl.size, tarih:Date.now() }, true); ids.push(id); }
  const d = dzpGet(); const cur = (d.a || {})[no] || {}; const form = $('#dz-s') ? { tarih:$('#dz-t').value, siniflar:$('#dz-s').value.trim(), katilim:$('#dz-k').value.trim(), not:$('#dz-n').value.trim(), ok:$('#dz-ok').checked, eokul:$('#dz-e').checked } : {}; d.a = { ...(d.a || {}), [no]:{ ...cur, ...form, dosyalar:[...(cur.dosyalar || []), ...ids] } }; Store.put('dzp', d, true); toast(`${ids.length} kanıt eklendi.`); ACT['dzp-detay']({ dataset:{ k:no } }); });
{ const m = MODS.find(x => x.k === 'proje'); m.not = 'Dilimizin Zenginlikleri Projesi (eylem planı, takip, materyaller) ve diğer projeler.'; m.dayanak = 'MEB Ortaöğretim Genel Müdürlüğünün 23.09.2026 tarihli yazısı; Dilimizin Zenginlikleri Projesi Uygulama Kılavuzu (Ekim 2026) ve Ortaokul Eylem Planı.';
  m.tpl = ['dzp_komisyon','dzp_plan','dzp_gorev','dzp_rapor','dzp_yilsonu']; m.arac = [['Dilimizin Zenginlikleri: takip, evrak, materyal', 'dzp-tab', 'plan']];
  m.gerek = [['Okul yürütme komisyonu tutanağı', () => evraklar().some(e => e.sablon === 'dzp_komisyon')], ['Okul eylem planı', () => evraklar().some(e => e.sablon === 'dzp_plan')], ['Tarihi gelen okul adımları uygulandı', () => DZP_ADIMLAR.filter(a => a.okul && isoDay(0) > a.bit).every(a => dzpDurum(a.no).ok)]]; }
{ const _bk = bugunKart; bugunKart = () => { const s = DZP_ADIMLAR.filter(a => a.okul && dzpZaman(a) === 'simdi'); return _bk() + (s.length ? `<section class="card" style="grid-column:1/-1"><div class="row between"><h2 style="margin:0">Dilimizin Zenginlikleri · bu hafta</h2><button class="btn sm" data-act="dzp-tab" data-k="plan">Takip</button></div>${s.map(a => `<div style="margin-top:6px"><b class="num">${a.no}</b> ${esc(a.ad)} <span class="muted">· ${dAralik(a)}</span></div>`).join('')}</section>` : ''); }; }

/* ===================== Başlangıç ===================== */
async function boot() {
  try { await IDB.open(); Store.items = new Map(await IDB.all('items')); }
  catch (e) { S.idbFail = true; }
  // Eski sürümün bu cihazdaki kayıtlarını taşı
  if (!S.idbFail && !Store.items.size) { try { const raw = localStorage.getItem('od_local'); if (raw) for (const [id, d] of JSON.parse(raw)) Store.put(id, d, true); } catch (e) {} }
  Store.mode = 'ready'; Store.assets = Files; seedIfEmpty(); migrateKlasor(); S.ready = true;
  shell(); render(); setSync(Store.dirty.size ? 'busy' : 'ok'); paylasilanVarMi();
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
