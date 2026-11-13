/* Konu anlatım kütüphanesi – 3. bölüm: metin türleri, metin yapısı, konuşma ve yazma */
(function(){
const K=(id,ad,alan,anlatim,ornek,defter,etkinlik)=>{EK.konu[id]={ad,alan,anlatim,ornek:ornek||[],defter:defter||[],etkinlik:etkinlik||''};};

/* ================= ÖYKÜLEYİCİ METİNLER ================= */
K('hikaye-unsurlari','Hikâye (Öykü) Unsurları','Metin türleri',
`<p>Hikâye; yaşanmış ya da yaşanabilir olayları belli bir yer ve zaman içinde, kişilere bağlı olarak anlatan kısa yazı türüdür. Dört temel unsuru vardır:</p>
<p><b>Olay:</b> Hikâyede anlatılan, birbirine bağlı durum ve hareketler. <b>Kişiler (kahramanlar):</b> Olayları yaşayan insanlar ya da kişileştirilmiş varlıklar; asıl kişi (başkahraman) ve yardımcı kişiler. <b>Yer (mekân):</b> Olayların geçtiği yer. <b>Zaman:</b> Olayların geçtiği zaman (gün, mevsim, yıl, dönem).</p>
<p>Ayrıca <b>anlatıcı</b> ve <b>olay örgüsü</b> hikâyenin yapı unsurlarıdır.</p>`,
['"Cepheye Koşan At": Olay – Ahmet\'in atını orduya vermesi; Kişiler – Ahmet, dede, nine; Yer – Kırıkkale, Bedesten Köyü; Zaman – Ağustos 1921.'],
['Hikâye unsurları: olay, kişiler, yer, zaman (+ anlatıcı, olay örgüsü).'],
'Hikâye haritası şablonu (olay–kişiler–yer–zaman–sorun–çözüm) dağıtın; her öyküleyici metinde doldurtun.');

K('olay-orgusu-serim','Olay Örgüsü: Serim – Düğüm – Çözüm','Metin türleri',
`<p>Öyküleyici metinlerde olayların birbirine bağlı biçimde sıralanmasına <b>olay örgüsü</b> denir. Üç bölümden oluşur:</p>
<p><b>Serim (giriş):</b> Kişiler, yer ve zaman tanıtılır; okur olaya hazırlanır. <b>Düğüm (gelişme):</b> Sorun ortaya çıkar, olaylar karmaşıklaşır, merak en üst düzeye çıkar. <b>Çözüm (sonuç):</b> Sorun çözülür ya da olay bir sonuca bağlanır.</p>
<p>Bazı modern öykülerde çözüm verilmez, son okura bırakılır (açık uçlu son).</p>`,
['Serim: Can yeni sesli asistanını çok sever. Düğüm: Arkadaşlarını ihmal eder, yalnız kalır. Çözüm: Dostluğun değerini anlar, arkadaşlarıyla barışır.'],
['Serim: tanıtım. Düğüm: sorun ve merak. Çözüm: sonuç.'],
'Bir masalı üç parçaya kesip karıştırın; gruplar serim-düğüm-çözüm sırasına dizsin ve gerekçesini söylesin.');

K('bakis-acisi','Anlatıcı ve Bakış Açısı','Metin türleri',
`<p><b>Kahraman anlatıcı (1. tekil kişi, "ben"):</b> Olayları yaşayan kişi anlatır; yalnızca kendi bildiklerini ve hissettiklerini aktarır. "Sabah erkenden kalktım…"</p>
<p><b>Gözlemci anlatıcı (3. kişi, "o"):</b> Olayları dışarıdan, bir kamera gibi gördüğü kadarıyla anlatır; kişilerin iç dünyasını bilmez.</p>
<p><b>Hâkim (ilahi) bakış açılı anlatıcı (3. kişi, "o"):</b> Her şeyi bilir; kişilerin düşüncelerini, duygularını, geçmişini ve geleceğini anlatır. "Elif içinden, keşke gitmeseydim, diye geçirdi."</p>
<p>Aynı olay farklı bakış açısıyla anlatıldığında okurun algısı değişir.</p>`,
['"Sabah okula gittim." (kahraman)','"Ali kapıyı açtı, içeri girdi." (gözlemci)','"Ali kapıyı açarken annesinin üzüleceğini düşünüyordu." (hâkim)'],
['Kahraman anlatıcı: ben – yaşayan anlatır. Gözlemci: o – dışarıdan görür. Hâkim: o – her şeyi bilir, iç dünyayı anlatır.'],
'Metnin bir sahnesini başka bir kahramanın gözünden (kahraman anlatıcıyla) yeniden yazdırın.');

K('oykuleyici','Öyküleyici Metin / Öyküleme','Metin türleri',
`<p><b>Öyküleyici metinler</b> olayları belli bir yer, zaman ve kişiye bağlı olarak anlatır: hikâye, masal, fabl, roman, anı, fıkra. Anlatım biçimi <b>öyküleme</b>dir: Hareket ve olay ağırlıklıdır; fiiller çoktur, zaman akışı vardır.</p>
<p><b>Öyküleyici metin yazma adımları:</b> 1) Konu ve ana fikir seç. 2) Kişileri, yeri, zamanı belirle. 3) Olay örgüsünü planla (serim-düğüm-çözüm). 4) Diyalog ve betimlemelerle zenginleştir. 5) Başlık koy. 6) Yazım ve noktalamayı gözden geçir.</p>`,
['"Kapı çaldı. Ayşe koşarak açtı; karşısında yıllardır görmediği dedesi duruyordu…"'],
['Öyküleme: olayları zaman akışı içinde anlatma; fiil ağırlıklı.','Öyküleyici metin planı: kişi-yer-zaman → serim → düğüm → çözüm → başlık.'],
'"Hikâye zarları" (kişi, yer, nesne, sorun) ile öğrenciler 15 dakikada kısa öykü yazsın.');

K('masal','Masal','Metin türleri',
`<p>Olağanüstü olayların, varlıkların (dev, peri, cin, konuşan hayvanlar) yer aldığı, yeri ve zamanı belirsiz, sözlü gelenekte oluşmuş anlatılardır.</p>
<p>Özellikleri: Kalıplaşmış başlangıç (döşeme: "Bir varmış bir yokmuş…") ve bitiş sözleri ("Onlar ermiş muradına…"). İyiler ödüllendirilir, kötüler cezalandırılır. Üç, yedi, kırk gibi sayılar sık geçer. Olaylar genellikle mutlu sonla biter. Anonimdir (derleyicileri: Eflatun Cem Güney, Pertev Naili Boratav).</p>
<p>Fabldan farkı: Fablda kahramanlar hayvanlardır ve sonunda açık bir ders (kıssadan hisse) verilir.</p>`,
['"Evvel zaman içinde, kalbur saman içinde…" (döşeme)','"Gökten üç elma düştü…" (bitiş)'],
['Masal: olağanüstü olay ve varlıklar; yer-zaman belirsiz; iyiler kazanır; kalıp başlangıç-bitiş; anonim.'],
'Okunan bir hikâyeyi masala dönüştürün: döşeme ekleyin, olağanüstü bir varlık katın, kalıp bitişle tamamlayın.');

K('fikra','Fıkra','Metin türleri',
`<p>Kısa, güldürürken düşündüren, ders veren ve genellikle beklenmedik bir sonla biten anlatılardır. Bir olayı esprili bir dille anlatır.</p>
<p>Fıkra tipleri: Nasreddin Hoca (bilgelik ve hazırcevaplık), İncili Çavuş, Bekri Mustafa, Bektaşi, Temel ve Dursun (Karadeniz).</p>
<p>Nasreddin Hoca: 13. yüzyılda Akşehir'de yaşamış; fıkraları dünyaca bilinir ve UNESCO tarafından 1996 "Nasreddin Hoca Yılı" ilan edilmiştir.</p>`,
['Kazan doğurdu fıkrası: Komşusundan aldığı kazanı içinde küçük bir tencereyle geri veren Hoca, kazan ölünce de "Doğurduğuna inandın, öldüğüne neden inanmıyorsun?" der.'],
['Fıkra: kısa, güldürürken düşündüren, ders veren anlatı; tipleri: Nasreddin Hoca, İncili Çavuş, Bekri Mustafa, Temel.'],
'Her öğrenci bir fıkra anlatsın; sınıf fıkranın verdiği dersi tek cümleyle söylesin.');

K('yasam-oykusu','Yaşam Öyküsü (Biyografi) ve Özyaşam Öyküsü','Metin türleri',
`<p><b>Biyografi:</b> Tanınmış bir kişinin hayatını, kişiliğini, eserlerini ve başarılarını <b>başka birinin</b> belgelere dayanarak anlattığı yazı türüdür. Üçüncü kişi ağzıyla yazılır; kronolojik sıra izlenir.</p>
<p><b>Otobiyografi (özyaşam öyküsü):</b> Kişinin kendi hayatını kendisinin anlattığı yazıdır; birinci kişi ağzıyla yazılır.</p>
<p>Biyografi yazma planı: Doğum yeri ve tarihi → ailesi ve çocukluğu → eğitimi → çalışmaları, başarıları, karşılaştığı zorluklar → eserleri → ölümü/bugünkü durumu → topluma katkısı.</p>`,
['"Piri Reis 1465 yılında Gelibolu\'da doğdu…" (biyografi)','"Ben 2014 yılında İstanbul\'da doğdum…" (otobiyografi)'],
['Biyografi: başkasının hayatı, 3. kişi, belgelere dayalı, kronolojik.','Otobiyografi: kendi hayatı, 1. kişi.'],
'Öğrenciler bir aile büyüğüyle görüşüp onun kısa biyografisini zaman çizelgesiyle yazsın.');

K('mektup','Mektup','Metin türleri',
`<p>Bir kişiye ya da kuruma duygu, düşünce, haber ve isteklerimizi iletmek için yazılan yazıdır. Türleri: özel (kişisel), resmî (dilekçe), edebî, iş mektupları.</p>
<p><b>Özel mektubun bölümleri:</b> 1) Sağ üstte yer ve tarih. 2) Hitap (Sevgili Babacığım,). 3) Giriş: hal hatır sorma. 4) Gelişme: asıl söylenmek istenen. 5) Sonuç: dilek, selam. 6) İmza/ad.</p>
<p>Dil samimi ve içtendir; okuyana göre hitap ve üslup seçilir.</p>`,
['Çekmeköy, 12.11.2026\nSevgili Dedeciğim,\nNasılsın? Seni çok özledim…\nGözlerinden öperim.\nTorunun Elif'],
['Mektup planı: yer-tarih → hitap → giriş → gelişme → sonuç (dilek-selam) → imza.'],
'"Gelecekteki kendime mektup": Öğrenciler mektup yazıp zarflasın, dönem sonunda açılsın.');

K('eposta','E-posta (Elektronik Posta)','Metin türleri',
`<p>İnternet üzerinden gönderilen mektuptur. Bölümleri: <b>Kime</b> (alıcının adresi), <b>Bilgi (CC)</b>, <b>Konu</b> (kısa ve açık), <b>Hitap</b>, <b>İleti</b> (kısa paragraflar), <b>Kapanış ve ad</b>, gerekirse <b>ek</b>.</p>
<p>Kurallar: Amaç, hedef kitle ve ortama göre resmî ya da samimi dil seçilir. Tamamı büyük harfle yazılmaz (bağırma anlamına gelir). Gönderilmeden önce yazım ve noktalama kontrol edilir. Kişisel bilgiler paylaşılmaz.</p>`,
['Konu: Bilim Şenliği Hakkında\nSayın Müdürüm,\nOkulumuzda düzenlenecek bilim şenliği için…\nSaygılarımla,\nElif Yılmaz 6/A'],
['E-posta: Kime – Konu – Hitap – İleti – Kapanış – Ad – (Ek).','Konu satırı kısa ve açık olmalı; tamamı büyük harfle yazılmaz.'],
'Bir arkadaşa oyun anlatan ve öğretmene ödev soran iki e-postayı karşılaştırıp hitap ve üslup farkını gösterin.');

K('gunluk','Günlük (Günce)','Metin türleri',
`<p>Kişinin her gün ya da belli aralıklarla yaşadıklarını, gözlemlerini, duygu ve düşüncelerini tarih atarak yazdığı yazılardır.</p>
<p>Özellikleri: Her yazının başında tarih bulunur. Birinci kişi ağzıyla, samimi ve içten bir dille yazılır. Yayımlanmak amacıyla yazılmaz; ancak tarihî ve edebî değeri olanlar yayımlanır. Anıdan farkı: Günlük yaşandığı gün yazılır; anı yıllar sonra hatırlanarak yazılır.</p>`,
['12 Kasım 2026, Perşembe\nBugün okulda ilk kez sunum yaptım. Başta çok heyecanlandım ama…'],
['Günlük: tarih + o günün olayları, duygular; 1. kişi; samimi dil.','Günlük o gün yazılır; anı sonradan hatırlanarak yazılır.'],
'Bir hafta boyunca "okuma günlüğü" tutturun: okunan sayfa, sevilen cümle, yeni sözcük.');

K('gezi-yazisi','Gezi Yazısı','Metin türleri',
`<p>Yazarın gezip gördüğü yerleri, oradaki insanları, yaşayışı, doğal ve tarihî güzellikleri kendi gözlem ve izlenimleriyle anlattığı yazılardır.</p>
<p>Özellikleri: Gözleme dayanır; betimleme ve öyküleme birlikte kullanılır; yazarın duyguları ve yorumları vardır (öznel); bilgi de verir (nesnel). Yer ve zaman bellidir.</p>
<p>Plan: Nereye, ne zaman, kimlerle gidildi? → Yolculuk → Görülen yerler (betimleme) → İnsanlar, yemekler, gelenekler → Duygu ve öneriler.</p>`,
['"Kapadokya\'ya vardığımızda güneş peri bacalarını turuncuya boyuyordu…"'],
['Gezi yazısı: gezilen yerin gözlem ve izlenimlerle anlatımı; betimleme + öyküleme; öznel ve nesnel bilgiler birlikte.'],
'Okul gezisinden ya da yaşadıkları semtten (Sultançiftliği) bir gezi yazısı yazdırın.');

K('haber-metni','Haber Metni','Metin türleri',
`<p>Güncel bir olayı, gelişmeyi ya da bilgiyi okura <b>nesnel</b> biçimde ileten yazılardır. 5N1K sorularına cevap verir.</p>
<p>Yapısı (ters piramit): <b>Başlık</b> (dikkat çekici, kısa) → <b>Spot / giriş</b> (en önemli bilgi: ne, kim, nerede, ne zaman) → <b>Gelişme</b> (ayrıntılar, açıklamalar, tanık sözleri) → <b>Sonuç</b>. Fotoğraf ve alt yazı haberi destekler.</p>
<p>Haberde yorum ve kişisel görüş bulunmaz; köşe yazısında bulunur.</p>`,
['Başlık: Okulumuzda Bilim Şenliği Coşkusu\nGiriş: Sultan Çiftliği Ortaokulunda 15 Mayıs\'ta düzenlenen bilim şenliğine 300 öğrenci katıldı…'],
['Haber: 5N1K, nesnel dil, ters piramit (başlık → en önemli bilgi → ayrıntılar).'],
'Okulda gerçekleşen bir etkinlik için sınıf gazetesine haber yazdırın.');

K('roportaj','Röportaj ve Söyleşi','Metin türleri',
`<p><b>Röportaj (mülakat):</b> Bir konuda bilgisine başvurulan ya da tanınmış bir kişiyle yapılan karşılıklı konuşmanın yazıya geçirilmesidir. Soru-cevap düzeninde ya da anlatı biçiminde olabilir.</p>
<p><b>Söyleşi (sohbet):</b> Bir konunun okurla sohbet eder gibi, samimi bir dille anlatıldığı yazıdır; ya da bir kişiyle yapılan rahat havalı konuşmadır.</p>
<p>Röportaj hazırlığı: Kişiyi ve konuyu araştır → açık uçlu sorular hazırla (evet/hayır cevaplı sorulardan kaçın) → randevu al → izin alarak kaydet → yazıya geçir → kişiye okut.</p>`,
['— Yüzmeye nasıl başladınız?\n— Sekiz yaşındayken ablamla havuza gittiğimde…'],
['Röportaj: kişiyle yapılan konuşmanın yazıya geçirilmesi; açık uçlu sorular.','Söyleşi: okurla sohbet eder gibi samimi anlatım.'],
'Okul personelinden biriyle (hizmetli, kütüphaneci, müdür yardımcısı) 5 soruluk röportaj yapıp yazıya geçirin.');

K('medya-metni','Medya Metinleri ve Medya Okuryazarlığı','Metin türleri',
`<p>Gazete, televizyon, internet sitesi, sosyal medya, reklam gibi kitle iletişim araçlarında yer alan metinlerdir.</p>
<p>Medya okuryazarlığı soruları: 1) Bu metni kim, hangi amaçla hazırladı? 2) Kaynak güvenilir mi (resmî kurum, .gov.tr, .edu.tr)? 3) Bilgi doğru ve güncel mi, başka kaynakla doğrulanabiliyor mu? 4) Görsel ve sesler mesajı nasıl etkiliyor? 5) Satış ya da yönlendirme amacı var mı? 6) Kimin bakış açısı eksik?</p>`,
['Bir reklamdaki "Doktorların %90\'ı öneriyor" ifadesinin kaynağını sorgulamak.'],
['Medya okuryazarlığı: kaynak, amaç, doğruluk, güvenilirlik, görsel-işitsel öğelerin etkisi.'],
'İki farklı siteden aynı haberi karşılaştırıp güvenilirlik ölçütleriyle değerlendirin.');

K('tiyatro','Tiyatro ve Geleneksel Türk Tiyatrosu','Metin türleri',
`<p><b>Tiyatro</b> sahnede oyuncular tarafından canlandırılmak üzere yazılan, diyaloglara dayalı metin türüdür. Bölümleri: perde, sahne; yazar açıklamaları (parantez içinde).</p>
<p><b>Geleneksel Türk tiyatrosu:</b> <b>Karagöz</b> (gölge oyunu; Karagöz halkı, Hacivat okumuş kesimi temsil eder; bölümleri: mukaddime, muhavere, fasıl, bitiş), <b>Meddah</b> (tek kişinin mendil ve sopayla hikâye anlatması), <b>Orta oyunu</b> (meydanda, Kavuklu ve Pişekâr), <b>Köy seyirlik oyunları</b>.</p>`,
['HACİVAT: Of, of, of… Hay hak!\nKARAGÖZ: Ne oluyorsun Hacivat, sabah sabah?'],
['Tiyatro: sahnelenmek için yazılır; diyalog ve perde-sahne düzeni.','Karagöz (gölge oyunu), Meddah (tek anlatıcı), Orta oyunu (meydan; Kavuklu-Pişekâr).'],
'Bir metni üç sahnelik kısa tiyatro metnine dönüştürüp canlandırın.');

/* ================= ANLATIM BİÇİMLERİ ================= */
K('betimleme','Betimleme (Tasvir)','Anlatım biçimleri',
`<p>Bir varlığı, yeri ya da kişiyi okurun gözünde canlandıracak biçimde, ayırt edici özellikleriyle <b>sözcüklerle resmetmeye</b> betimleme denir. Beş duyudan (görme, işitme, koklama, tatma, dokunma) yararlanılır; sıfatlar ve benzetmeler çok kullanılır.</p>
<p><b>Kişi betimlemesi:</b> Dış görünüş (fiziksel portre: boy, yüz, saç, giyim) + iç dünya (ruhsal portre: karakter, huy, duygular). <b>Mekân betimlemesi:</b> Genelden özele ya da yakından uzağa bir sıra izlenir; renk, ses, koku ayrıntıları verilir.</p>
<p>Öykülemeden farkı: Betimlemede zaman akışı yoktur, durağandır; öykülemede olaylar akar.</p>`,
['"Mutfak tarçın kokuyordu. Pencerenin önündeki saksılarda kırmızı sardunyalar güneşe uzanıyor, çaydanlık ocakta tıslıyordu."'],
['Betimleme: sözcüklerle resim çizmek; beş duyu, sıfat ve benzetmeler.','Kişi: dış görünüş + iç dünya. Mekân: genelden özele, renk-ses-koku.'],
'"Beş duyu tablosu": Okul bahçesini gören, duyan, koklayan, dokunan, tadan olarak notlandırıp betimleme paragrafı yazdırın.');

K('aciklayici-metin','Bilgilendirici (Açıklayıcı) Metin','Metin türleri',
`<p>Okura bir konuda bilgi vermek, bir şeyi öğretmek amacıyla yazılan metinlerdir. Ansiklopedi yazıları, ders kitapları, makaleler, broşürler, kullanım kılavuzları örnektir.</p>
<p>Özellikleri: Açık, anlaşılır ve nesnel dil; terimler; düşünceyi geliştirme yolları (tanımlama, örneklendirme, karşılaştırma, sayısal veri, tanık gösterme); başlık ve alt başlıklar; görsel, grafik, tablo gibi destekleyici öğeler.</p>
<p>Yapısı: Giriş (konu tanıtılır) – Gelişme (bilgiler açıklanır) – Sonuç (özet ya da değerlendirme).</p>`,
['"Biyomimetik, doğadaki canlıların yapı ve davranışlarını inceleyerek teknolojik çözümler üreten bilim dalıdır. Örneğin hızlı trenlerin burun tasarımı yalıçapkını gagasından esinlenmiştir."'],
['Bilgilendirici metin: bilgi verir; açık, nesnel dil; tanım, örnek, karşılaştırma, sayısal veri; başlık-alt başlık.'],
'Öğrenciler ilgilendikleri bir hayvan hakkında alt başlıklı (Yaşam Alanı, Beslenme, İlginç Bilgiler) bilgilendirici metin yazsın.');

K('tanitma','Tanıtma Yazısı / Tanıtım Paragrafı','Yazma',
`<p>Bir varlığı, yeri, ürünü, geleneği ya da etkinliği okura tanıtmak amacıyla yazılır.</p>
<p>Plan: 1) Tanıtılan şey nedir? (tanım) 2) Özellikleri nelerdir? (betimleme, bilgi) 3) Nerede, nasıl kullanılır/yapılır? 4) Tarihçesi, önemi. 5) Okuru ilgilendiren bir öneri ya da çağrı.</p>
<p>Dil açık ve bilgi verici olmalı; ilgi çekici bir giriş ve görsel destek etkiyi artırır.</p>`,
['"Bindallı, kadife kumaş üzerine sırma ile işlenmiş geleneksel bir kadın giysisidir…"'],
['Tanıtma yazısı: tanım → özellikler → kullanım/yapılış → önem → öneri.'],
'Mahallemizin (Sultançiftliği) ya da okulumuzun tanıtım broşürü için tanıtım paragrafları yazdırın.');

K('kitap-tanitim','Kitap Tanıtım Yazısı','Yazma',
`<p>Okunan bir kitabı başkalarına tanıtmak ve okumaya teşvik etmek için yazılır.</p>
<p>Bölümleri: <b>Künye</b> (kitabın adı, yazarı, yayınevi, sayfa sayısı) → <b>Konu</b> (sonu söylenmeden) → <b>Kişiler, yer, zaman</b> → <b>Anlatıcı</b> → <b>Beğenilen ve beğenilmeyen yönler</b> (gerekçeli) → <b>Kime ve neden önerildiği</b>.</p>`,
['Küçük Prens – Antoine de Saint-Exupéry – … Bir pilotun çölde tanıştığı küçük bir çocuğun gezegenler arası yolculuğunu anlatır… Dostluğu ve sevgiyi merak eden herkese öneririm.'],
['Kitap tanıtımı: künye → konu (sonu yok) → kişiler-yer-zaman → anlatıcı → görüşüm → öneri.'],
'Sınıf kitaplığındaki her kitap için tanıtım kartı yazdırıp "kitap önerisi panosu" oluşturun.');

K('davetiye','Davetiye','Yazma',
`<p>Bir etkinliğe, törene ya da toplantıya katılım çağrısı yapmak için yazılan kısa metindir.</p>
<p>Bölümleri: <b>Hitap</b> (Sayın Velimiz, Değerli Konuklarımız) → <b>Etkinliğin adı ve amacı</b> → <b>Tarih, saat, yer</b> → <b>Kısa çağrı cümlesi</b> → <b>Davet eden</b> (okul, sınıf, kişi). Kısa, açık ve nazik yazılır; görsel tasarım dikkat çeker.</p>`,
['Değerli Velimiz,\n6/A sınıfı olarak hazırladığımız "Bilim Şenliği"ne sizi de bekliyoruz.\nTarih: 15 Mayıs 2027 Cuma, Saat: 14.00, Yer: Okul Bahçesi\nSultan Çiftliği Ortaokulu 6/A Sınıfı'],
['Davetiye: hitap + etkinlik + tarih-saat-yer + çağrı + davet eden. Kısa ve nazik.'],
'Sınıfta yapılacak bir etkinlik (okuma şenliği, veli toplantısı) için davetiye tasarlatın.');

K('afis','Afiş, Slogan ve Broşür','Yazma',
`<p><b>Afiş:</b> Bir düşünceyi, etkinliği ya da ürünü kısa sözler ve görsellerle duyuran, uzaktan görülecek biçimde hazırlanan duyuru. Öğeleri: dikkat çekici <b>başlık/slogan</b>, etkileyici <b>görsel</b>, kısa <b>bilgi</b> (tarih, yer), <b>renk ve yazı</b> uyumu.</p>
<p><b>Slogan:</b> Kısa, akılda kalıcı, etkileyici, genellikle uyaklı söz: "Azmini kaybetme, engelleri aş!"</p>
<p><b>Broşür:</b> Katlanmış, birkaç bölümlü tanıtım kâğıdı; başlıklar, kısa paragraflar, görseller ve iletişim bilgisi içerir.</p>`,
['"Sağlıklı yaşa, hareket et!" – "Kitap oku, dünyayı dolaş!"'],
['Afiş: slogan + görsel + kısa bilgi; uzaktan okunur.','Slogan: kısa, akılda kalıcı, etkileyici söz.'],
'Gruplar tema konusuyla ilgili afiş hazırlasın; sınıf ölçütlere göre (slogan, görsel, okunurluk, bilgi) puanlasın.');

/* ================= METİN YAPISI ================= */
K('paragraf','Paragrafın Yapısı','Metin yapısı',
`<p>Bir düşünceyi anlatan cümleler topluluğuna <b>paragraf</b> denir. Paragrafın ilk satırı içeriden başlar.</p>
<p>Bölümleri: <b>Giriş cümlesi</b> (konuyu tanıtır; bağlaçla başlamaz, kendinden önce bir cümle olduğunu düşündürmez), <b>Gelişme cümleleri</b> (konuyu açıklar, örnekler, ayrıntılar), <b>Sonuç cümlesi</b> (ana fikri vurgular, toparlar).</p>
<p>İyi paragraf: Tek bir ana düşünce etrafında birleşir (anlam bütünlüğü); cümleler mantıklı sırayla dizilir (akış); konuyla ilgisiz cümle bulunmaz.</p>`,
['Giriş: "Kitaplar insanın en iyi dostudur." Gelişme: "Bizi hiç yalnız bırakmazlar… Örneğin…" Sonuç: "Bu yüzden her gün biraz okumalıyız."'],
['Paragraf: giriş cümlesi → gelişme cümleleri → sonuç cümlesi. Tek ana düşünce.','Giriş cümlesi bağlaçla başlamaz ("Bu nedenle, Ama…").'],
'Cümleleri karışık verilmiş paragraf kartlarını gruplar doğru sıraya koysun; ilgisiz cümleyi bulsun.');

K('giris-gelisme-sonuc','Metnin Bölümleri: Giriş – Gelişme – Sonuç','Metin yapısı',
`<p><b>Giriş:</b> Konu tanıtılır, okurun ilgisi çekilir. <b>Gelişme:</b> Konu ayrıntılı açıklanır; örnekler, kanıtlar, olaylar verilir. Metnin en uzun bölümüdür. <b>Sonuç:</b> Ana fikir vurgulanır, konu toparlanır, bir öneri ya da değerlendirme yapılır.</p>
<p>Konuşma ve sunumlar da aynı yapıda planlanır. Bölümler arasında tutarlılık olmalı; gelişmede yeni bir konuya geçilmemelidir.</p>`,
['Konu: Doğa yürüyüşü. Giriş: Doğa yürüyüşü nedir? Gelişme: Hazırlıklar, faydalar, kurallar. Sonuç: Herkesi doğaya davet.'],
['Giriş: konuyu tanıt. Gelişme: açıkla, örnekle, kanıtla. Sonuç: toparla, ana fikri vurgula.'],
'Yazma öncesi her öğrenci "üç kutulu plan" (giriş-gelişme-sonuç) doldursun.');

K('kronolojik','Kronolojik (Sıralı) Metin Yapısı','Metin yapısı',
`<p>Olay ve bilgilerin <b>zaman sırasına göre</b> verildiği metin yapısıdır. Biyografiler, tarihî metinler, yapım aşamalarını anlatan metinler (tarif, el sanatı) bu yapıdadır.</p>
<p>Sıralama ve zaman ifadeleri: önce, ilk olarak, ardından, daha sonra, bunun üzerine, sonunda, en son; yıllar, tarihler, "çocukluğunda", "gençliğinde".</p>
<p>Araç: zaman çizelgesi, akış şeması.</p>`,
['Önce kil yoğrulur, ardından çarkta biçimlendirilir, sonra kurutulur ve en son fırında pişirilir.'],
['Kronolojik yapı: zaman sırası. İfadeler: önce, ardından, sonra, en sonunda; tarihler.','Araç: zaman çizelgesi, akış şeması.'],
'Bir yemek tarifini ya da el sanatı yapım aşamalarını akış şemasıyla anlatıp sıralama ifadeleriyle yazdırın.');

K('gecis-ifadeleri','Geçiş ve Bağlantı İfadeleri','Metin yapısı',
`<p>Cümleler ve paragraflar arasında anlamca bağ kurarak metne akıcılık kazandıran ifadelerdir.</p>
<p><b>Sıralama:</b> öncelikle, ilk olarak, ikinci olarak, son olarak. <b>Ekleme:</b> ayrıca, bunun yanında, üstelik, bununla birlikte. <b>Karşıtlık:</b> ancak, buna karşın, öte yandan. <b>Örnekleme:</b> örneğin, mesela, söz gelimi. <b>Sonuç/özet:</b> sonuç olarak, kısacası, bu nedenle, özetle. <b>Açıklama:</b> yani, başka bir deyişle.</p>`,
['İlk olarak hedef belirlemeliyiz. Bunun yanında plan yapmalıyız. Sonuç olarak başarı bir süreçtir.'],
['Geçiş ifadeleri metne akıcılık katar: öncelikle, ayrıca, ancak, örneğin, sonuç olarak.'],
'Geçiş ifadeleri silinmiş bir metne uygun ifadeleri yerleştirtin.');

K('dusunceyi-gelistirme','Düşünceyi Geliştirme Yolları','Metin yapısı',
`<p>Yazar ya da konuşmacının düşüncesini açık, anlaşılır ve inandırıcı kılmak için kullandığı yollardır:</p>
<p><b>Tanımlama:</b> "… nedir?" sorusuna cevap verir: "Biyomimetik, doğadan esinlenen bilim dalıdır." <b>Örneklendirme:</b> Düşünceyi somut örneklerle açıklar ("örneğin, mesela"). <b>Karşılaştırma:</b> İki varlığın benzer ve farklı yönlerini ortaya koyar. <b>Benzetme:</b> Bir durumu başka bir şeye benzeterek anlatır. <b>Tanık gösterme:</b> Ünlü/uzman birinin sözünü aktarır. <b>Sayısal verilerden yararlanma:</b> Rakam, oran, istatistik kullanır.</p>
<p>Katkıları: açıklık, anlaşılırlık, inandırıcılık, tutarlılık.</p>`,
['"Türkiye\'de her yıl 2 milyon ton gıda israf ediliyor." (sayısal veri)','"Atatürk, \'Hayatta en hakiki mürşit ilimdir.\' der." (tanık gösterme)'],
['Tanımlama (… nedir?), örneklendirme (örneğin), karşılaştırma (oysa, -den daha), benzetme (gibi), tanık gösterme (alıntı), sayısal veri (rakam, oran).'],
'Altı paragraf kartı dağıtın; gruplar her kartta hangi yolun kullanıldığını bulup aynı yolla yeni bir cümle yazsın.');

K('tanik-gosterme','Tanık Gösterme','Metin yapısı',
`<p>Düşünceyi desteklemek ve inandırıcılığı artırmak için alanında yetkin, tanınmış bir kişinin sözüne ya da görüşüne başvurmaktır. Alıntı tırnak içinde verilir ve sözün kime ait olduğu belirtilir.</p>
<p>"Okumanın önemi üzerine Cemil Meriç şöyle der: 'Kitap, zekânın antenidir.'"</p>`,
['Atatürk "Öğretmenler! Yeni nesil sizin eseriniz olacaktır." demiştir.'],
['Tanık gösterme: ünlü/uzman birinin sözünü kaynak belirterek alıntılama; inandırıcılığı artırır.'],
'Okuma konulu bir paragrafı ünlü bir kişinin sözüyle destekleyerek yazdırın.');

K('sayisal-veri','Sayısal Verilerden Yararlanma ve Bilgi Görselleri','Metin yapısı',
`<p>Düşünceyi rakam, oran, yüzde ve istatistiklerle desteklemek anlatımı nesnel ve inandırıcı kılar.</p>
<p><b>Bilgi görselleri (infografik):</b> Yazı, grafik, tablo, harita, logo, fotoğraf ve sayısal verileri bir arada kullanarak bilgiyi hızlı ve anlaşılır sunar.</p>
<p>Okuma: Başlığa bak → birimleri ve kaynağı kontrol et → en büyük/en küçük değerleri bul → karşılaştır → sonuç çıkar.</p>`,
['"Festivali 4 günde 1,5 milyon kişi ziyaret etti."'],
['Sayısal veri anlatımı nesnel ve inandırıcı yapar. Bilgi görselinde başlık, birim ve kaynak kontrol edilir.'],
'Sınıfın okuma alışkanlığı anketini yapıp sonuçları basit bir bilgi görseline dönüştürün.');

K('grafik','Grafik ve Tablo Okuma','Okuma',
`<p><b>Sütun grafiği</b> miktarları karşılaştırır; <b>çizgi grafiği</b> zaman içindeki değişimi gösterir; <b>daire (pasta) grafiği</b> bütünün parçalarını yüzde olarak gösterir; <b>tablo</b> verileri satır-sütun düzeninde sunar.</p>
<p>Grafik okuma adımları: 1) Başlık neyi anlatıyor? 2) Eksenler ve birimler neler? 3) En yüksek ve en düşük değer hangisi? 4) Artış-azalış var mı? 5) Grafikten hangi sonuca ulaşılır? Grafikte olmayan bilgi yorum olarak kabul edilmemelidir.</p>`,
['"Grafiğe göre öğrencilerin en çok oynadığı oyun saklambaçtır." (grafikten doğrulanabilir mi?)'],
['Sütun: karşılaştırma. Çizgi: zamanla değişim. Daire: parçanın bütüne oranı.','Grafikte olmayan bilgi yorumdur, doğru kabul edilmez.'],
'Sınıfın en sevdiği oyunları sorup sütun grafiği çizdirin; grafikle ilgili doğru-yanlış cümleler yazdırın.');

K('coklu-ortam','Çoklu Ortam Öğeleri (Görsel-İşitsel Öğeler)','Okuma / İzleme',
`<p>Metin, resim, fotoğraf, grafik, video, ses, müzik, animasyon gibi öğelerin bir arada kullanılmasına <b>çoklu ortam</b> denir.</p>
<p>İşlevleri: <b>Anlamı destekleme</b> (yazıdaki bilgiyi görselle güçlendirme), <b>tek başına anlam oluşturma</b> (yazısız görselin mesaj vermesi), <b>dikkat çekme</b>, <b>duygu oluşturma</b> (arka plan müziği), <b>bilgiyi özetleme</b> (grafik, infografik).</p>
<p>Değerlendirme soruları: Görsel metinle uyumlu mu? Müzik anlatılanın duygusuna uygun mu? Fazla öğe dikkati dağıtıyor mu?</p>`,
['Bir belgeselde duygusal anlatımın hüzünlü müzikle desteklenmesi.'],
['Çoklu ortam: yazı, görsel, ses, müzik, video bir arada.','İşlevler: anlamı destekleme, tek başına anlam oluşturma, dikkat çekme, duygu oluşturma.'],
'Bir sunum slaytını "yazı – görsel – ses" uyumu açısından değerlendiren kontrol listesi hazırlatın.');

K('kroki','Kroki Okuma ve Yol Tarifi','Okuma',
`<p><b>Kroki:</b> Bir yerin ölçeksiz, basit ve kuşbakışı çizimidir. Yön oku (K), önemli yapılar (okul, cami, park), yollar ve semboller gösterilir.</p>
<p>Yol tarifi verirken: başlangıç noktası, yön ifadeleri (sağa, sola, düz, karşısında, köşesinde, yanında, arkasında), yer işaretleri (eczanenin yanındaki sokak) ve sıralama ifadeleri (önce, sonra) kullanılır.</p>`,
['"Okuldan çıkınca sola dön, ikinci sokağın köşesindeki parkın karşısında kütüphane var."'],
['Kroki: ölçeksiz, basit kuşbakışı çizim. Yol tarifi: başlangıç + yön ifadeleri + yer işaretleri + sıralama.'],
'Uygulamadaki Sultançiftliği krokisini kullanarak öğrencilere okuldan bir yere yol tarifi yazdırın.');

/* ================= KONUŞMA ================= */
K('hazirlikli-konusma','Hazırlıklı Konuşma','Konuşma',
`<p>Konusu önceden belirlenmiş, araştırma ve planlama yapılarak hazırlanan konuşmadır (sunum, tören konuşması, panel).</p>
<p><b>Adımlar:</b> 1) Konu, amaç ve dinleyiciyi belirle. 2) Araştır, güvenilir kaynaklardan bilgi topla. 3) Plan yap: Giriş (selamlama, dikkat çekme) – Gelişme (ana düşünceler, örnekler) – Sonuç (özet, teşekkür). 4) Not kartları ve çoklu ortam öğeleri hazırla. 5) Prova yap. 6) Konuşurken: ses tonu, vurgu, hız, göz teması, beden dili. 7) Öz ve akran değerlendirmesi.</p>`,
['"Değerli öğretmenim, sevgili arkadaşlarım; bugün size Türk astronotlardan söz edeceğim…"'],
['Hazırlıklı konuşma: konu-amaç-dinleyici → araştırma → plan (giriş-gelişme-sonuç) → prova → sunum → değerlendirme.','Dikkat: ses tonu, vurgu, hız, göz teması, beden dili.'],
'Konuşma değerlendirme çizelgesi (ses, akıcılık, beden dili, içerik, süre) ile her öğrenciye dönemde en az bir sunum yaptırın.');

K('dogaclama','Hazırlıksız (Doğaçlama) Konuşma ve Canlandırma','Konuşma',
`<p><b>Hazırlıksız konuşma:</b> Önceden hazırlık yapmadan, anında yapılan konuşmadır (sohbet, soru cevaplama, anı anlatma). Düşünceleri kısa sürede toparlamak gerekir: Konuyu belirle → 2-3 ana düşünce → örnek → kısa sonuç.</p>
<p><b>Doğaçlama/canlandırma:</b> Verilen bir durum ya da rol kartıyla, metin ezberlemeden o anda oyunlaştırmadır. Beden dili, ses tonu, jest ve mimiklerle duygu yansıtılır.</p>
<p><b>Donuk imge:</b> Bir sahnenin hareketsiz fotoğraf karesi gibi canlandırılması.</p>`,
['Rol kartı: "Yeni taşındığın mahallede komşunla ilk kez karşılaşıyorsun."'],
['Hazırlıksız konuşma: konu → 2-3 düşünce → örnek → sonuç.','Doğaçlama: rol kartıyla anında canlandırma; beden dili ve ses tonu.'],
'"Sıcak sandalye": Öğrenci metindeki bir kahramanın rolüne girer, sınıfın sorularını o kahraman gibi cevaplar.');

K('sunum','Sunum Hazırlama ve Üretim (Tema Ürünü)','Konuşma / Yazma',
`<p>Tema sonunda hazırlanan ürünler (sunum, afiş, broşür, kitapçık, video, sergi) öğrencinin öğrendiklerini yaratıcı biçimde göstermesini sağlar.</p>
<p><b>Sunum hazırlarken:</b> Slaytlarda az yazı, çok görsel; her slayt bir ana düşünce; okunabilir yazı boyutu; kaynakça son slaytta. <b>Sunarken:</b> Slayttan okuma yapma, dinleyiciye bak; süreye uy; sorulara açık ol.</p>
<p><b>Değerlendirme:</b> Dereceli puanlama anahtarı (içerik, düzen, dil, yaratıcılık, sunum) ve öz/akran değerlendirmesi.</p>`,
['Slayt 1: Başlık + ad. Slayt 2: Giriş sorusu. Slayt 3-5: Ana bilgiler + görseller. Slayt 6: Sonuç + kaynaklar.'],
['Sunum: az yazı-çok görsel, her slayt bir fikir, kaynakça; sunarken slayttan okuma.'],
'Dereceli puanlama anahtarını ürün öncesinde öğrencilerle paylaşın; ölçütleri birlikte belirleyin.');

K('beden-dili','Beden Dili, Ses Tonu ve Göz Teması','Konuşma',
`<p>İletişimin büyük bölümü sözsüzdür. <b>Beden dili:</b> duruş, jest (el-kol hareketleri), mimik (yüz ifadeleri), göz teması. <b>Ses:</b> tonlama, vurgu, hız, ses yüksekliği, duraklama.</p>
<p>Olumlu beden dili: dik duruş, açık kollar, gülümseme, dinleyicilerle göz teması, sözle uyumlu el hareketleri. Olumsuz: kollarını kavuşturmak, yere bakmak, sallanmak, eliyle oynamak.</p>`,
['Aynı "Peki" sözcüğünü sevinçle, kızgınlıkla, üzüntüyle söylemek → ses tonu anlamı değiştirir.'],
['Beden dili: duruş, jest, mimik, göz teması. Ses: ton, vurgu, hız, yükseklik.'],
'"Duygu pandomimi": Öğrenciler kartta yazan duyguyu yalnızca beden diliyle anlatsın; sınıf tahmin etsin.');

K('ben-dili','Ben Dili ve Etkili İletişim','Konuşma',
`<p><b>Sen dili</b> suçlayıcıdır, karşı tarafı savunmaya iter: "Sen hep geç kalıyorsun!" <b>Ben dili</b> kendi duygumuzu ve beklentimizi anlatır, çatışmayı azaltır: "Geç kaldığında endişeleniyorum, zamanında gelmeni istiyorum."</p>
<p>Ben dili formülü: <b>Davranış</b> ("…dığında") + <b>Duygum</b> ("…hissediyorum") + <b>Neden</b> ("çünkü…") + <b>İsteğim</b> ("…istiyorum").</p>
<p>İletişimi kolaylaştıranlar: dinleme, empati, nazik ifadeler, soru sorma. Zorlaştıranlar: suçlama, emir verme, alay, sözünü kesme, genelleme ("hep, hiç").</p>`,
['"Defterimi izinsiz aldığında üzülüyorum, çünkü ödevlerim içinde. Önce bana sormanı istiyorum."'],
['Ben dili: davranış + duygu + neden + istek.','Sen dili suçlar; ben dili çözüm arar.'],
'Sen diliyle yazılmış cümle kartlarını ikili gruplar ben diline çevirip canlandırsın.');

K('hitap','Hitap (Seslenme) Şekilleri','Konuşma / Yazma',
`<p>Konuşma ve yazıda karşımızdakine nasıl seslendiğimiz ilişkimizi ve saygımızı gösterir. Hitap; yaşa, makama, ortama ve yakınlığa göre değişir.</p>
<p>Resmî: Sayın Müdürüm, Değerli Velimiz, Sayın Başkan. Saygılı: Öğretmenim, Hocam, Ayşe Hanım, Ali Bey, Amca, Teyze. Samimi: Sevgili arkadaşım, Canım annem.</p>
<p>Yazıda hitaptan sonra virgül konur. Mektup ve konuşmalarda hitap girişte yer alır.</p>`,
['Sayın Müdürüm, (resmî dilekçe)','Sevgili Dedeciğim, (mektup)'],
['Hitap: kişiye ve ortama uygun seçilir; hitaptan sonra virgül konur.'],
'Aynı isteği (ödev süresi uzatma) müdüre, öğretmene ve arkadaşa farklı hitaplarla yazdırın.');

K('ikna','İkna Edici Konuşma ve Yazma','Konuşma / Yazma',
`<p>Dinleyiciyi ya da okuru bir düşünceyi kabul etmeye veya bir davranışa yönlendirmeye ikna denir.</p>
<p><b>İkna paragrafı yapısı:</b> 1) Görüşünü açıkça belirt. 2) Gerekçelerini sırala (en az iki). 3) Kanıt ve örnekler sun (sayısal veri, tanık gösterme). 4) Olası itirazları cevapla ("Bazıları … diyebilir; ancak…"). 5) Faydayı ve çağrıyı belirt.</p>
<p><b>İkna teknikleri:</b> mantığa seslenme (kanıt, veri), duygulara seslenme, güvenilir kişiyi örnek gösterme, soru sorma, tekrar.</p>
<p>Münazara/tartışma kuralları: söz sırasına uymak, karşı görüşe saygı, kişiyi değil düşünceyi eleştirmek.</p>`,
['"Okul kütüphanesini daha sık kullanmalıyız. Çünkü… Örneğin… Bazı arkadaşlar zamanımız yok diyebilir; oysa teneffüste bile…"'],
['İkna: görüş → gerekçeler → kanıt → itirazlara cevap → fayda/çağrı.','Teknikler: kanıt, veri, tanık, duygulara seslenme, soru sorma.'],
'"Okulda telefon olmalı mı?" gibi bir konuda iki grup münazara yapsın; jüri ölçütlerle değerlendirsin.');

K('vurgu-tonlama','Vurgu, Tonlama ve Diyafram Nefesi','Okuma / Konuşma',
`<p><b>Vurgu:</b> Cümlede önemli sözcüğün daha baskılı söylenmesidir; Türkçede vurgulanan öge genellikle yüklemin hemen önündedir: "Kitabı <b>Ali</b> aldı." (kim aldı?)</p>
<p><b>Tonlama:</b> Sesin cümle boyunca yükselip alçalmasıdır; soru, ünlem, sevinç, üzüntü tonla belirtilir.</p>
<p><b>Diyafram nefesi:</b> Göğüsten değil karından derin nefes almak; sesi güçlü ve uzun süreli kılar. Burundan 4 saniye al – 4 saniye tut – ağızdan 6 saniye ver.</p>
<p>Sesli okumada: noktalama işaretlerinde durak, anlam birimlerinde akıcılık, uygun hız, net telaffuz.</p>`,
['"Bugün okula geldim." – "Bugün okula GELDİM." – "BUGÜN okula geldim." (vurgu anlamı değiştirir)'],
['Vurgu: önemli sözcüğü baskılı söyleme (yüklemin hemen önü). Tonlama: sesin yükselip alçalması.','Diyafram nefesi: karından derin nefes.'],
'Aynı cümleyi farklı sözcükleri vurgulayarak okutup anlamın nasıl değiştiğini tartışın.');

K('akici-okuma','Akıcı Okuma','Okuma',
`<p>Metni doğru, uygun hızda, anlamlı birimlere bölerek ve doğal bir vurgu-tonlamayla okumaktır.</p>
<p>Akıcı okumanın bileşenleri: <b>Doğruluk</b> (sözcükleri hatasız okuma), <b>Hız</b> (dakikadaki doğru sözcük sayısı), <b>Prozodi</b> (vurgu, tonlama, durak).</p>
<p>Sözcük grupları birlikte okunur, araya duraklama girmez: "Millî Mücadele yıllarında / bütün halk / cepheye yardım etti."</p>
<p>Ortaokul hedefi: 5. sınıfta dakikada ~120-140, 7. sınıfta ~150+ doğru sözcük (uygulamadaki okuma hızı aracıyla ölçülebilir).</p>`,
['"Gazi Mustafa Kemal / Samsun\'a çıktığında / Anadolu / işgal altındaydı."'],
['Akıcı okuma: doğruluk + hız + prozodi.','Sözcük grupları duraklamadan okunur.'],
'Eşli okuma ve tekrarlı okuma: aynı paragrafı üç kez okuyup her seferinde süreyi kaydedin.');

/* ================= YAZMA SÜRECİ ================= */
K('yazma-sureci','Yazma Süreci','Yazma',
`<p>İyi bir yazı tek seferde yazılmaz; süreç içinde oluşur:</p>
<p><b>1) Planlama:</b> Konu, amaç (bilgi vermek, ikna etmek, eğlendirmek), hedef kitle, tür seçimi; beyin fırtınası, kavram haritası, taslak plan. <b>2) Taslak yazma:</b> Düşünceleri kaygısızca yazıya dökme. <b>3) Gözden geçirme:</b> İçerik (konu dışı cümle var mı?), düzen (giriş-gelişme-sonuç), dil (sözcük tekrarı, anlatım bozukluğu). <b>4) Düzeltme (redaksiyon):</b> Yazım ve noktalama kontrolü. <b>5) Yayımlama/paylaşma:</b> Temize çekme, panoya asma, sınıfta okuma.</p>`,
['Kontrol listesi: Başlık var mı? Paragraflar içeriden başlıyor mu? Büyük harf ve noktalama doğru mu? Sözcük tekrarı var mı?'],
['Yazma süreci: planlama → taslak → gözden geçirme → düzeltme → paylaşma.'],
'Her yazma etkinliğinde kontrol listesini öz ve akran değerlendirmesi için kullanın.');

K('dijital-vatandaslik','Dijital Vatandaşlık ve Dijital Nezaket','İletişim',
`<p>Dijital ortamda (sosyal medya, mesajlaşma, oyun) güvenli, saygılı ve sorumlu davranmaktır.</p>
<p>Kurallar: Kişisel bilgilerini (adres, telefon, okul, şifre) paylaşma. İzinsiz fotoğraf/video paylaşma. Yazmadan önce düşün: "Yüz yüze de söyler miydim?" Tamamı büyük harfle yazma (bağırmak anlamına gelir). Doğruluğu belirsiz bilgiyi yayma. Sanal zorbalığa uğrarsan: cevap verme, kanıtı (ekran görüntüsü) sakla, engelle, bir yetişkine bildir.</p>
<p>Ekran süresi dengesi: Dijital araçlar yüz yüze iletişimin, oyunun ve uykunun yerini almamalıdır.</p>`,
['Grup sohbetinde arkadaşının komik fotoğrafını izinsiz paylaşmak → sanal zorbalık olabilir.'],
['Dijital nezaket: kişisel bilgi paylaşma, izinsiz paylaşım yapma, yazmadan önce düşün, zorbalığı bildir.'],
'Sınıfça "Dijital Nezaket Sözleşmesi" yazıp imzalayın.');

K('sozluk-turleri','Sözlük Türleri ve Sözlük Kullanımı','Söz varlığı',
`<p>Türk Dil Kurumunun sözlükleri (sozluk.gov.tr): <b>Güncel Türkçe Sözlük</b> (sözcüklerin anlamları), <b>Yazım Kılavuzu</b> (doğru yazım), <b>Atasözleri ve Deyimler Sözlüğü</b>, <b>Türkiye Türkçesi Ağızları Sözlüğü</b>, <b>Yabancı Kelimelere Karşılıklar</b>, <b>Kişi Adları Sözlüğü</b>, <b>Sesli Türkçe Sözlük</b> (söyleyiş), <b>Eş ve Zıt Anlamlılar</b>, <b>Bilim ve Sanat Terimleri Sözlüğü</b>.</p>
<p>Sözlük maddesinde: madde başı, kökeni (Arapça, Farsça…), türü (isim, sıfat, fiil), numaralı anlamları, örnek cümleler, birleşik sözcükler ve deyimler bulunur. Sözcük kök/yalın hâliyle aranır.</p>`,
['"kitaplıklarımızdan" → sözlükte "kitaplık" maddesine bakılır.'],
['TDK sözlükleri: Güncel Türkçe Sözlük, Yazım Kılavuzu, Atasözleri ve Deyimler, Yabancı Kelimelere Karşılıklar.','Sözlükte sözcük yalın hâliyle aranır.'],
'"Sözlük avı": Verilen 10 sözcüğü en kısa sürede sözlükte bulup anlamını ve türünü yazan grup kazanır.');
})();
