/* Konu anlatım kütüphanesi – 5, 6, 7. sınıf Türkçe
   Her konu: ad, alan, anlatim (HTML), ornek[], defter[] (tahtaya/deftere yazdırılacaklar), etkinlik (sınıf içi uygulama) */
(function(){
const K=(id,ad,alan,anlatim,ornek,defter,etkinlik)=>{EK.konu[id]={ad,alan,anlatim,ornek:ornek||[],defter:defter||[],etkinlik:etkinlik||''};};

/* ================= DİL BİLGİSİ ================= */
K('isim','İsim (Ad) ve Türleri','Dil bilgisi',
`<p>Varlıkları, kavramları karşılayan sözcüklere <b>isim</b> denir. İsimler üç yönden sınıflandırılır:</p>
<p><b>1. Varlıklara verilişlerine göre:</b> <i>Özel isim</i> tek olan varlığı karşılar ve büyük harfle başlar (Ankara, Atatürk, Van Gölü). <i>Cins (tür) isim</i> aynı türden varlıkların hepsini karşılar (şehir, insan, göl).</p>
<p><b>2. Varlıkların niteliğine göre:</b> <i>Somut isim</i> beş duyudan en az biriyle algılanır (ekmek, rüzgâr, ses). <i>Soyut isim</i> duyularla algılanamaz, zihinde var olur (sevgi, merhamet, düşünce, korku).</p>
<p><b>3. Varlıkların sayısına göre:</b> <i>Tekil</i> (kitap), <i>çoğul</i> (-lar/-ler: kitaplar), <i>topluluk ismi</i> – tekil biçimde birden çok varlığı karşılar (ordu, sürü, sınıf, orman, aile, takım).</p>
<p class="dikkat">Dikkat: "rüzgâr, koku, ses" somuttur (duyuyla algılanır). Topluluk isimleri çoğul eki alabilir: ordular.</p>`,
['Elif sınıfa sevinçle girdi. → Elif: özel, somut, tekil; sınıf: cins, somut, topluluk; sevinç: cins, soyut','Sürü yaylaya çıktı. → sürü: topluluk ismi'],
['İsim: varlık ve kavramları karşılar.','Özel isim – cins isim; somut isim – soyut isim; tekil – çoğul – topluluk ismi.','Topluluk: ordu, sürü, takım, sınıf, aile, orman, alay, koro.'],
'Tahtaya 15 isim yazın; öğrenciler üç sütuna (özel/cins, somut/soyut, tekil/çoğul/topluluk) ayırsın. Ardından her gruptan seçtikleri sözcüklerle bir paragraf yazsınlar.');

K('fiil','Fiil (Eylem)','Dil bilgisi',
`<p>İş, oluş, durum ve hareket bildiren sözcüklere <b>fiil</b> denir. Fiillerin mastar biçimi -mak/-mek ekiyle yapılır: oku-mak, gel-mek.</p>
<p><b>İş fiili:</b> Bir nesneyi etkiler; "neyi, kimi?" sorusuna cevap verir: yazmak, kesmek, okumak. <b>Durum fiili:</b> Nesne almaz, durumu anlatır: uyumak, gülmek, oturmak. <b>Oluş fiili:</b> Kendiliğinden, zamanla gerçekleşen değişim: büyümek, sararmak, kızarmak, yaşlanmak.</p>
<p>İsim mi fiil mi? Sözcüğe -mak/-mek getirilebiliyorsa ve emir anlamı taşıyorsa fiil kök/gövdesidir: koş → koşmak (fiil); kitap → *kitapmak (isim).</p>`,
['Çocuklar bahçede koşuyor. → koş- (durum)','Annem ekmek kesti. → kes- (iş)','Ağaçlar yeşerdi. → yeşer- (oluş)'],
['Fiil: iş, oluş, durum, hareket bildirir; -mak/-mek ile mastarlaşır.','İş: neyi/kimi? sorusuna cevap verir (yazmak). Durum: nesne almaz (uyumak). Oluş: kendiliğinden değişim (büyümek).'],
'"Sabah rutinim" başlıklı 6 cümle yazdırın; fiilleri bulup iş/durum/oluş diye ayırsınlar.');

K('sifat','Sıfat (Ön Ad): Niteleyen ve Belirten Sözcükler','Dil bilgisi',
`<p>İsimlerin önüne gelerek onları niteleyen ya da belirten sözcüklere <b>sıfat</b> denir. Sıfat tek başına kullanılırsa isim olur: "Kırmızı elma" (sıfat) – "Kırmızıyı seçtim." (isim).</p>
<p><b>Niteleme sıfatı:</b> Varlığın nasıl olduğunu (renk, biçim, durum) bildirir; "nasıl?" sorusuna cevap verir: yeşil yaprak, yorgun asker, uzun yol.</p>
<p><b>Belirtme sıfatları:</b> <i>İşaret</i> (bu, şu, o, öteki: bu kitap) – <i>Sayı</i> (asıl: üç kalem; sıra: üçüncü sıra; üleştirme: ikişer elma; kesir: yarım ekmek) – <i>Belgisiz</i> (birkaç, bazı, her, birçok: bazı insanlar) – <i>Soru</i> (hangi, kaç, nasıl: hangi kitap?).</p>`,
['Bu küçük kedi üç gündür aç. → bu: işaret, küçük: niteleme, üç: sayı','Hangi sınıfta birkaç öğrenci eksik? → hangi: soru, birkaç: belgisiz'],
['Sıfat: ismi niteler ya da belirtir; isimden önce gelir.','Niteleme sıfatı → nasıl? (güzel, kırmızı, yorgun)','Belirtme sıfatları → işaret (bu), sayı (üç, üçüncü, üçer, yarım), belgisiz (bazı), soru (hangi?)'],
'Bir sınıf fotoğrafı ya da tablo gösterin; öğrenciler 10 sıfat tamlaması yazsın, renkli kalemle niteleme/belirtme ayrımını işaretlesin.');

K('zamir','Zamir (Adıl)','Dil bilgisi',
`<p>İsimlerin yerini tutan sözcüklere <b>zamir</b> denir. Zamir, aynı ismi tekrarlamayı önler.</p>
<p><b>Kişi zamirleri:</b> ben, sen, o, biz, siz, onlar (ek hâlinde: kitab<b>ım</b>, gel<b>dim</b>). <b>İşaret zamirleri:</b> bu, şu, o, bunlar, öteki, beriki (tek başına kullanılır: "Bunu al."). <b>Belgisiz zamirler:</b> biri, birkaçı, herkes, hiçbiri, kimse, bazıları. <b>Soru zamirleri:</b> kim, ne, hangisi, kaçı. <b>Dönüşlülük zamiri:</b> kendi (kendim, kendine).</p>
<p class="dikkat">Sıfatla karıştırılmamalı: "Bu kitap" (bu: sıfat, isimle birlikte) – "Bunu oku." (bu: zamir, yalnız).</p>`,
['Ayşe geldi; o, bize hediye getirmiş. → o: kişi zamiri','Herkes sınıfa girdi. → belgisiz zamir','Hangisini istiyorsun? → soru zamiri'],
['Zamir: ismin yerini tutar.','Kişi: ben, sen, o, biz, siz, onlar. İşaret: bu, şu, o. Belgisiz: herkes, biri, kimse. Soru: kim, ne, hangisi. Dönüşlülük: kendi.','Yalnız kullanılırsa zamir, isimle kullanılırsa sıfat: "Bu güzel." / "Bu ev güzel."'],
'Aynı ismin sürekli tekrarlandığı bir paragraf verin; öğrenciler tekrarları zamirle değiştirsin ve hangi zamir türünü kullandıklarını yazsın.');

K('kok-ek','Kök, Ek ve Gövde','Dil bilgisi',
`<p><b>Kök:</b> Sözcüğün anlamlı ve daha fazla bölünemeyen en küçük parçasıdır. İsim kökü (göz, su) ya da fiil kökü (gör-, yaz-) olabilir. <b>Ek:</b> Köke eklenerek yeni anlam ya da görev kazandıran parçadır; yapım eki ve çekim eki olarak ikiye ayrılır. <b>Gövde:</b> Köke yapım eki getirilerek oluşan yeni sözcüktür (göz-lük, yaz-ı).</p>
<p>Kökü bulmak için sözcüğün sonundan ekler tek tek atılır; anlamlı kalan en küçük parça köktür: göz-lük-çü-ler-den → kök: göz.</p>
<p class="dikkat">Kök ile ek kısa çizgiyle ayrılır; fiil kökü sonuna kısa çizgi konarak gösterilir: gel-, oku-.</p>`,
['Kitaplıktakiler → kitap (kök) + -lık (yapım) + -ta + -ki + -ler (çekim)','Yazıcılar → yaz- (kök) + -ı + -cı (yapım) + -lar (çekim)'],
['Kök: anlamlı en küçük parça. Gövde: kök + yapım eki.','Yapım eki yeni sözcük türetir, çekim eki görev kazandırır.','Fiil kökü kısa çizgiyle gösterilir: sev-, koş-.'],
'Tahtaya "göz, yol, su, gel-, yaz-" köklerini yazın; gruplar yapım ekleriyle en fazla sözcük türetme yarışması yapsın.');

K('yapim-eki','Yapım Ekleri','Dil bilgisi',
`<p><b>Yapım ekleri</b> getirildikleri sözcüğün anlamını değiştirerek yeni bir sözcük türetir. Türettikleri sözcük sözlükte ayrı madde olarak bulunur.</p>
<p>Dört türü vardır: <b>İsimden isim</b> (göz-lük, kitap-çı, su-suz, köy-lü), <b>İsimden fiil</b> (su-la-, temiz-le-, yeşil-len-, göz-le-), <b>Fiilden isim</b> (yaz-ı, gör-gü, sev-gi, bil-gi, uç-ak, yüz-ücü), <b>Fiilden fiil</b> (gül-dür-, yaz-dır-, sev-in-, döv-üş-).</p>
<p>Bir sözcük birden fazla yapım eki alabilir: göz-lük-çü, bil-gi-li.</p>`,
['kitaplık: kitap + -lık (isimden isim)','yeşillenmek: yeşil + -len (isimden fiil)','sevgi: sev- + -gi (fiilden isim)','güldürmek: gül- + -dür (fiilden fiil)'],
['Yapım eki yeni sözcük türetir (anlamı değiştirir).','İsimden isim: -lık, -cı, -lı, -sız. İsimden fiil: -la, -lan, -al. Fiilden isim: -ı, -gı, -ak, -ıcı. Fiilden fiil: -dır, -ıl, -ın, -ış.'],
'"Kavram alanı" çalışması: Bir kökten (ör. "bil-") türeyen sözcükleri (bilgi, bilgin, bilgili, bilinç, bilim, bilimsel) ağaç şemasıyla çizdirin.');

K('cekim-eki','Çekim Ekleri','Dil bilgisi',
`<p><b>Çekim ekleri</b> sözcüğün anlamını değiştirmez; sözcüğe cümlede görev kazandırır. Çekim eki almış sözcük sözlükte ayrı madde olmaz.</p>
<p><b>İsim çekim ekleri:</b> çoğul (-lar), iyelik (-ım, -ın, -ı, -ımız, -ınız, -ları: kitab-ım), hâl ekleri (belirtme -ı: kitabı; yönelme -e: okula; bulunma -de: evde; ayrılma -den: köyden), ilgi (-ın: Ali'nin), eşitlik (-ca: çocukça), vasıta (ile/-la: kalemle).</p>
<p><b>Fiil çekim ekleri:</b> Kip ekleri (haber: -dı, -mış, -yor, -ecek, -r; dilek: -sa, -malı, -e, emir) ve kişi ekleri (-m, -n, -k, -nız…).</p>
<p class="dikkat">Sözcükte önce yapım ekleri, sonra çekim ekleri gelir: göz-lük-çü-ler-e.</p>`,
['Kardeşimle okula gidiyoruz. → kardeş-im (iyelik)-le (vasıta), okul-a (yönelme), gid-iyor (şimdiki zaman)-uz (kişi)'],
['Çekim eki anlamı değiştirmez, görev verir.','İsim çekim: -lar, iyelik, hâl (-ı, -e, -de, -den), ilgi (-ın), eşitlik (-ca), vasıta (ile).','Fiil çekim: kip + kişi ekleri.'],
'Bir paragraftaki her sözcüğü öğrenciler kök + ekler biçiminde ayırsın; yapım eklerini kırmızı, çekim eklerini mavi yazsınlar.');

K('fiilde-zaman','Fiillerde Zaman (Haber Kipleri)','Dil bilgisi',
`<p>Fiilin bildirdiği yargının <b>ne zaman</b> gerçekleştiğini gösteren eklere haber (bildirme) kipleri denir.</p>
<p><b>Görülen geçmiş zaman -dı:</b> Konuşanın tanık olduğu geçmiş: geldi, okuduk. <b>Öğrenilen (duyulan) geçmiş zaman -mış:</b> Başkasından duyulan ya da sonradan fark edilen: gelmiş, yağmur yağmış. <b>Şimdiki zaman -yor:</b> Konuşma anında süren iş: geliyor. <b>Gelecek zaman -ecek/-acak:</b> geleceğim. <b>Geniş zaman -r/-ar/-ır:</b> Her zaman yapılan, alışkanlık, genel doğru: Güneş doğudan doğar.</p>
<p><b>Dilek kipleri</b> zaman bildirmez, istek/gereklilik/şart bildirir: istek -e (gelelim), gereklilik -malı (gelmeli), şart -sa (gelse), emir (gel, gelsin).</p>`,
['Dün sinemaya gittik. (görülen geçmiş)','Kardeşim düşmüş. (öğrenilen geçmiş)','Her sabah kitap okurum. (geniş zaman)'],
['-dı: görülen geçmiş | -mış: öğrenilen geçmiş | -yor: şimdiki | -ecek: gelecek | -r: geniş zaman.','Dilek kipleri: istek (-e), gereklilik (-malı), şart (-sa), emir.'],
'"Geçen yaz – şu an – gelecek yaz" başlıklarıyla üç kısa paragraf yazdırıp kullanılan kip eklerini işaretletin.');

K('anlam-kaymasi','Kiplerde Anlam (Zaman) Kayması','Dil bilgisi',
`<p>Bir kip ekinin, kendi zamanı dışında başka bir zaman anlamında kullanılmasına <b>anlam kayması</b> denir. Cümlenin anlamına bakılarak yargının gerçek zamanı bulunur.</p>
<p>Örnek: "Yarın Ankara'ya gidiyoruz." Ek şimdiki zaman (-yor) ama anlam gelecek zamandır. "1453'te Fatih İstanbul'u fetheder." Geniş zaman eki geçmiş anlamında kullanılmıştır (tarihî geniş zaman). "Hemen buraya geliyorsun!" Şimdiki zaman emir anlamında kullanılmıştır.</p>`,
['Haftaya sınav oluyoruz. (şimdiki → gelecek)','Atatürk 1919\'da Samsun\'a çıkar. (geniş → geçmiş)','Ödevini yapıyorsun, sonra oynuyorsun. (şimdiki → emir)'],
['Anlam kayması: kip ekinin başka zaman anlamında kullanılması.','Zaman zarfına bak: "yarın, dün, haftaya" gerçek zamanı gösterir.'],
'Gazete başlıklarından anlam kayması örnekleri bulun (ör. "Milli takım yarın sahaya çıkıyor").');

K('ek-fiil','Ek Fiil (Ek Eylem)','Dil bilgisi',
`<p><b>Ek fiil</b> (i- fiili) iki görev yapar:</p>
<p><b>1. İsim soylu sözcükleri yüklem yapar:</b> Öğretmen-<b>di</b> (hikâye), Hasta-<b>ymış</b> (rivayet), Çalışkan-<b>sa</b> (şart), Doktor-<b>dur</b> (geniş zaman). "Hava güzel." → "Hava güzeldi."</p>
<p><b>2. Basit zamanlı fiilleri birleşik zamanlı yapar:</b> Hikâye: geliyor-du, gelmiş-ti. Rivayet: geliyor-muş, gelecek-miş. Şart: geliyor-sa, gelecek-se.</p>`,
['Dedem eskiden çobandı. (isim + ek fiil)','Ben geldiğimde yağmur yağıyordu. (şimdiki zamanın hikâyesi)'],
['Ek fiil: -dı (hikâye), -mış (rivayet), -sa (şart), -dır (geniş zaman).','İsmi yüklem yapar: Güzeldi. Birleşik zaman yapar: Okuyordu, Gelmişti.'],
'Bir aile fotoğrafını anlatarak ek fiilli 8 cümle yazdırın ("Dedem o zaman gençti…").');

K('soru-eki','Soru Eki "mı/mi/mu/mü"','Dil bilgisi',
`<p>Soru eki <b>"mı, mi, mu, mü"</b> her zaman <b>ayrı</b> yazılır; kendinden önceki sözcüğün son ünlüsüne uyar. Kendisinden sonra gelen ekler soru ekine bitişik yazılır.</p>
<p>Gel<b> mi</b>? – Okula <b>mı</b> gidiyorsun? – Geliyor <b>musun</b>? – Ankara'ya <b>mıymış</b>?</p>
<p>Soru eki yalnızca soru anlamı vermez: pekiştirme ("Güzel mi güzel!"), şart ("Bahar geldi mi kırlar yeşerir."), sitem gibi anlamlar da katar. Bu durumlarda da ayrı yazılır.</p>`,
['Ödevini yaptın mı?','Sen de bizimle gelecek misin?','Okul bitti mi tatile gideceğiz. (şart)'],
['"mı/mi/mu/mü" daima ayrı yazılır; kendinden sonraki ekler ona bitişir: gelecek misin.'],
'Bitişik yazılmış soru eki hatalarının olduğu bir mesajlaşma ekran görüntüsünü öğrencilere düzelttirin.');

K('de-da','"de/da" Bağlacı ile "-de/-da" Hâl Ekinin Yazımı','Yazım',
`<p><b>Bağlaç olan "de/da"</b> her zaman ayrı yazılır; "dahi, bile, ayrıca" anlamı katar. Cümleden çıkarıldığında cümlenin anlamı daralır ama bozulmaz. Asla "te/ta" olmaz: "Kitap da aldım."</p>
<p><b>Hâl eki olan "-de/-da/-te/-ta"</b> bulunma bildirir, sözcüğe bitişik yazılır. Çıkarılınca cümle bozulur: "Evde kaldım." → "*Ev kaldım."</p>
<p>Pratik yol: "de/da"yı cümleden çıkar → cümle bozulmuyorsa bağlaçtır, ayrı yazılır. Yerine "-ye" eki getirip deneyebilirsiniz: "Okulda" → "Okul" bozulur, hâl ekidir.</p>`,
['Sen de gel. (bağlaç, ayrı)','Ben de okulda kaldım. (de: bağlaç; -da: hâl eki)','Kitapta yazıyor. (hâl eki, sert ünsüzden sonra -ta)'],
['Bağlaç "de/da" ayrı yazılır; çıkarınca cümle bozulmaz.','Hâl eki "-de/-da/-te/-ta" bitişik yazılır; çıkarınca cümle bozulur.'],
'"de/da" hatalı yazılmış 10 cümlelik bir mesaj kartı hazırlayın; ikili gruplar düzeltip gerekçesini yazsın.');

K('ki','"ki" Bağlacı ve "-ki" Ekinin Yazımı','Yazım',
`<p><b>Bağlaç olan "ki"</b> ayrı yazılır; iki cümleyi birbirine bağlar ya da pekiştirme yapar: "Duydum ki gelmişsin." "Öyle güzel ki…"</p>
<p><b>Sıfat yapan "-ki"</b> (yer ve zaman bildirir) bitişik yazılır: evdeki, yarınki, bugünkü. <b>İlgi zamiri "-ki"</b> (bir ismin yerini tutar) bitişik yazılır: benimki, seninki, Ali'ninki.</p>
<p>Kalıplaşmış sözcüklerde bağlaç "ki" bitişik yazılır (ezberlenmeli): belki, çünkü, sanki, oysaki, mademki, halbuki, meğerki, illaki.</p>
<p class="dikkat">"-ki" eki genellikle uyuma girmez; yalnızca "bugünkü, dünkü, öbürkü" sözcüklerinde -kü olur.</p>`,
['Bilmem ki ne desem. (bağlaç)','Masadaki kitap benim. (sıfat yapan -ki)','Benim kalemim kırık, seninki sağlam. (ilgi zamiri -ki)'],
['Bağlaç "ki" ayrı. Sıfat yapan "-ki" ve ilgi zamiri "-ki" bitişik.','Bitişik yazılan kalıplar: belki, çünkü, sanki, oysaki, mademki, halbuki.'],
'Öğrencilere "ki" ile ilgili bir doğru-yanlış bulmacası hazırlatın; birbirlerine çözdürsünler.');

K('baglac','Bağlaçlar ve Bağlantı İfadeleri','Dil bilgisi',
`<p>Tek başına anlamı olmayan, sözcükleri, sözcük gruplarını ve cümleleri anlam ve biçim yönünden birbirine bağlayan sözcüklere <b>bağlaç</b> denir.</p>
<p>Anlam ilişkisine göre: <b>ekleme</b> (ve, ile, de, hem…hem, ayrıca, üstelik), <b>karşıtlık</b> (ama, fakat, lakin, ancak, oysa, hâlbuki, yine de), <b>sebep</b> (çünkü, zira, bu yüzden), <b>sonuç</b> (bu nedenle, dolayısıyla, öyleyse), <b>seçenek</b> (veya, ya da, yahut), <b>açıklama/örnek</b> (yani, örneğin, mesela), <b>koşul</b> (eğer, şayet).</p>
<p class="dikkat">Bağlaçlardan önce ve sonra virgül kullanılmaz: "Okula gittim ama ders yoktu." "ve" bağlacından önce virgül konmaz.</p>`,
['Hem okudu hem çalıştı. (ekleme)','Çok çalıştı ama kazanamadı. (karşıtlık)','Yağmur yağıyordu, bu yüzden dışarı çıkmadık. (sonuç)'],
['Bağlaç: sözcük ve cümleleri bağlar; tek başına anlamı yoktur.','Ekleme: ve, ile, de, ayrıca. Karşıtlık: ama, fakat, oysa. Sebep: çünkü. Sonuç: bu yüzden. Seçenek: veya, ya da.'],
'Bağlaçsız, kısa cümlelerle yazılmış bir metni bağlaçlarla birleştirip akıcı hâle getirmelerini isteyin.');

K('ikili-baglac','İkili (Tekrarlı) Bağlaçlar','Dil bilgisi',
`<p>İki öğeyi aynı yükleme bağlayan, iki kez kullanılan bağlaçlardır: <b>hem…hem (de)</b> (ikisi de yapılır), <b>ya…ya (da)</b> (biri seçilir), <b>ne…ne (de)</b> (ikisi de yapılmaz), <b>gerek…gerek(se)</b> (her ikisi de).</p>
<p class="dikkat">"ne…ne" bağlacıyla kurulan cümlenin yüklemi olumlu olur, anlam olumsuzdur: "Ne aradı ne sordu." ("*Ne aramadı ne sormadı" yanlıştır.)</p>`,
['Hem okuyor hem çalışıyor.','Ya bu akşam ya da yarın gel.','Ne yedi ne içti.'],
['hem…hem: ikisi de. ya…ya: biri. ne…ne: hiçbiri (yüklem olumlu yazılır).'],
'Her öğrenci kendisi hakkında ikili bağlaçlarla üç cümle kursun: "Hem … hem …", "Ne … ne …", "Ya … ya …".');

K('ozne-yuklem','Özne-Yüklem Uyumu','Dil bilgisi',
`<p>Cümlede yüklemin kişi ve sayı bakımından özneye uyması gerekir. <b>Kişi uyumu:</b> Ben geldi<b>m</b>, sen geldi<b>n</b>, o geldi, biz geldi<b>k</b>, siz geldi<b>niz</b>, onlar geldi(<b>ler</b>).</p>
<p><b>Sayı uyumu:</b> Özne insan bildiren çoğul bir sözcükse yüklem çoğul ya da tekil olabilir (Öğrenciler geldi / geldiler). Özne insan dışı bir varlıksa yüklem tekil olur: "Kuşlar uçtu." (*uçtular yanlış).</p>
<p>Farklı kişilerden oluşan öznelerde yüklem, kişilerden önce gelene göre çekimlenir: "Sen ve ben gideceğiz." "Sen ve Ali gideceksiniz."</p>`,
['*Ben ve arkadaşım sinemaya gittiler. → gittik','*Yapraklar sarardılar. → sarardı'],
['Yüklem özneye kişi ve sayı bakımından uyar.','İnsan dışı çoğul özne → yüklem tekil: "Ağaçlar çiçek açtı."','Ben + sen → biz; sen + o → siz.'],
'Anlatım bozukluklu cümle kartları dağıtın; gruplar düzeltip hangi uyumun bozulduğunu yazsın.');

K('cumle-ayrinti','Cümleyi Genişletme / Kısaltma','Dil bilgisi',
`<p>Bir cümle; ne zaman, nerede, nasıl, kiminle gibi sorulara cevap veren sözcük ve sözcük gruplarıyla <b>genişletilerek</b> ayrıntılandırılır. Uzun ve karışık cümleler ise anlaşılırlık için <b>kısa cümlelere bölünür</b>.</p>
<p>Genişletme: "Çocuklar oynadı." → "Okulun arka bahçesindeki çocuklar teneffüste neşeyle top oynadı."</p>
<p>Bölme: Her cümlede bir yargı (bir yüklem) bulunacak biçimde ayırın; bağlaçların yerine nokta koyup yeni cümle başlatın.</p>`,
['Kedi uyuyor. → Bahçedeki tekir kedi güneşin altında mışıl mışıl uyuyor.'],
['Cümleyi genişletmek için: Kim? Ne zaman? Nerede? Nasıl? Niçin? sorularını sor.','Uzun cümleyi kısalt: her cümlede tek yargı olsun.'],
'"Kar yağdı." cümlesini öğrenciler sırayla birer öge ekleyerek tahtada en uzun anlamlı cümleye dönüştürsün.');

/* ================= SES BİLGİSİ ================= */
K('ses-olaylari','Ses Olayları (Genel)','Ses bilgisi',
`<p>Sözcükler ek aldığında ya da birleştiğinde seslerde görülen değişmelere <b>ses olayı</b> denir. Ortaokulda işlenen başlıca ses olayları:</p>
<p><b>Ünsüz yumuşaması:</b> p, ç, t, k → b, c, d, ğ (kitap→kitabı). <b>Ünsüz benzeşmesi (sertleşme):</b> sert ünsüzden sonra c, d, g → ç, t, k (kitapçı, sınıfta). <b>Ünlü düşmesi:</b> ağız→ağzı. <b>Ünlü daralması:</b> başla-yor→başlıyor. <b>Kaynaştırma ünsüzü:</b> y, ş, s, n (kapı-y-a). <b>Ünsüz türemesi:</b> his→hissi. <b>Ünlü türemesi:</b> sıra sayılarında, pekiştirmelerde (bir-i-cik, sap-a-sağlam).</p>`,
['kitabı (yumuşama), ağzı (ünlü düşmesi), hissetmek (ünsüz türemesi), kapıya (kaynaştırma), sınıfta (benzeşme), söylüyor (daralma)'],
['Ses olayları: yumuşama, benzeşme, ünlü düşmesi, ünlü daralması, kaynaştırma, ünsüz türemesi, ünlü türemesi.'],
'Bir paragrafta ses olayına uğramış sözcükleri bulup tabloya ("sözcük – ses olayı – açıklama") yerleştirsinler.');

K('unsuz-yumusamasi','Ünsüz Yumuşaması','Ses bilgisi',
`<p>Sonu <b>p, ç, t, k</b> sert ünsüzleriyle biten sözcüklere ünlüyle başlayan bir ek getirildiğinde bu ünsüzler <b>b, c, d, ğ (g)</b> olur.</p>
<p>kitap → kitab-ı, ağaç → ağac-ı, kanat → kanad-ı, çocuk → çocuğ-a, renk → reng-i.</p>
<p class="dikkat">Tek heceli sözcüklerin çoğunda yumuşama görülmez: top-u, saç-ı, at-ı (istisna: dib-i, kab-ı, kad-ı…). Özel isimlerde yazıda yumuşama gösterilmez: Zonguldak'a, Ahmet'i (okunuşta yumuşar). Bazı alıntı sözcüklerde de görülmez: millet-i, hukuk-u.</p>`,
['dolap → dolabı, ağaç → ağacı, yurt → yurdu, kulak → kulağı'],
['p-ç-t-k + ünlü → b-c-d-ğ: kitap-ı → kitabı.','Tek heceli ve özel isimlerde (yazıda) genelde yumuşama olmaz: top-u, Mehmet\'i.'],
'Tahtaya 10 sözcük yazın; öğrenciler "-ı/-ı" ekleyip yumuşayanları ve yumuşamayanları ayırsın.');

K('unsuz-benzesmesi','Ünsüz Benzeşmesi (Sertleşme)','Ses bilgisi',
`<p>Sonu <b>sert ünsüzle (f, s, t, k, ç, ş, h, p)</b> biten sözcüklere <b>c, d, g</b> ile başlayan bir ek getirildiğinde bu ekin ilk ünsüzü <b>ç, t, k</b> olur.</p>
<p>Formül: <b>"FıSTıKÇı ŞaHaP"</b> harflerinden sonra c→ç, d→t, g→k.</p>
<p>kitap-cı → kitap<b>ç</b>ı, sınıf-da → sınıf<b>t</b>a, aç-dı → aç<b>t</b>ı, yap-dı → yap<b>t</b>ı, süt-cü → süt<b>ç</b>ü.</p>
<p class="dikkat">Kısaltma ve sayılarda okunuşa bakılır: TDK'de (okunuş "tedeke" ünlüyle biter), 3'te (üç), 5'te (beş), 4'te (dört), 1'de (bir), 2'de (iki).</p>`,
['sepet-ci → sepetçi, dolap-da → dolapta, Türk-de → Türkte, 5\'te (beş)'],
['"FıSTıKÇı ŞaHaP" (f, s, t, k, ç, ş, h, p) + c-d-g ile başlayan ek → ç-t-k.','Sayı ve kısaltmalarda okunuşa bakılır: 3\'te, 1\'de, TBMM\'de.'],
'"-cı, -da, -dan, -dır" eklerini 10 sözcüğe ekletin; ünsüz benzeşmesi olanları renkli yazsınlar.');

K('unlu-dusmesi','Ünlü Düşmesi','Ses bilgisi',
`<p>İki heceli bazı sözcüklere ünlüyle başlayan bir ek getirildiğinde ikinci hecedeki dar ünlü (ı, i, u, ü) düşer.</p>
<p>ağız → ağzı, burun → burnu, oğul → oğlu, gönül → gönlü, alın → alnı, beyin → beyni, omuz → omzu.</p>
<p>Fiillerde de görülür: kıvır-ım → kıvrım, devir-il- → devril-. Birleşik sözcüklerde: kayın + ana → kaynana, ne + için → niçin, cuma + ertesi → cumartesi.</p>`,
['Ağzını açma. Burnu kızarmış. Omzumuza yük aldık.'],
['İki heceli sözcük + ünlüyle başlayan ek → ikinci hecedeki ünlü düşer: ağız → ağzı, oğul → oğlu.'],
'Vücut bölümlerinden (ağız, burun, alın, omuz, boyun, göğüs) iyelik ekiyle sözcük türettirip ünlü düşmesini gözlemletin.');

K('unlu-daralmasi','Ünlü Daralması','Ses bilgisi',
`<p>Sonu <b>a, e</b> geniş ünlüleriyle biten fiillere <b>-yor</b> eki getirildiğinde a, e ünlüleri daralarak <b>ı, i, u, ü</b> olur.</p>
<p>başla-yor → başl<b>ı</b>yor, ara-yor → ar<b>ı</b>yor, söyle-yor → söyl<b>ü</b>yor, bekle-yor → bekl<b>i</b>yor, ağla-yor → ağl<b>ı</b>yor.</p>
<p>"de-, ye-" fiillerinde "-yor" dışında "-yacak, -yan, -yince" gibi ekler alınca da daralma görülür: diyecek, yiyen, diyince.</p>
<p class="dikkat">Konuşma dilindeki "gelicem, okucam" gibi daralmalar yazıda yanlıştır: geleceğim, okuyacağım.</p>`,
['Kardeşim ağlıyor. Annem bizi bekliyor. Ne diyorsun?'],
['a, e ile biten fiil + -yor → ı, i, u, ü: başla → başlıyor, bekle → bekliyor.','"de-, ye-": diyen, yiyecek.','Yazıda "gelicem" değil "geleceğim".'],
'Sabah rutinini şimdiki zamanla (başlıyorum, hazırlanıyorum, bekliyorum) anlatan cümleler yazdırıp daralmaları işaretletin.');

K('unsuz-turemesi','Ünsüz Türemesi','Ses bilgisi',
`<p>Arapçadan dilimize geçen bazı tek heceli sözcüklere ünlüyle başlayan bir ek getirildiğinde ya da "etmek, olmak" yardımcı fiilleriyle birleştiğinde son ünsüz <b>ikizleşir</b>.</p>
<p>his → his<b>s</b>i, hissetmek; hak → hak<b>k</b>ı, hakkında; ret → red<b>d</b>i, reddetmek; af → af<b>f</b>ı, affetmek; zan → zan<b>n</b>ı, zannetmek; sır → sır<b>r</b>ı.</p>
<p>Türkçe sözcüklerde pekiştirme amacıyla da görülür: ufak → ufacık, küçük → küçücük, ince → incecik (bazıları ünlü türemesiyle birlikte).</p>`,
['Bunu hissettim. Hakkımı helal etmem. Teklifini reddetti.'],
['his → hissetmek, af → affetmek, hak → hakkı, ret → reddetmek, zan → zannetmek.'],
'"-etmek" ile birleşen ve ünsüz türemesine uğrayan sözcüklerden bir liste (hissetmek, affetmek, reddetmek, hallettik) yaptırıp cümlede kullandırın.');

K('unlu-turemesi','Ünlü Türemesi','Ses bilgisi',
`<p>Bazı sözcüklerde ek ya da birleşme sırasında araya yeni bir ünlü girmesidir.</p>
<p>Pekiştirmelerde: <b>sapasağlam</b> (sap-a-sağlam), <b>güpegündüz</b>, <b>çırılçıplak</b>. Küçültme ekiyle: bir-i-cik → biricik, dar-a-cık → daracık. Bazı ikilemelerde: düpedüz.</p>
<p class="dikkat">"biricik" sözcüğünde türeme, "küçücük" sözcüğünde ise ünsüz düşmesi (küçük-cük) görülür; ders kitabı etkinliklerinde bu ayrım tartışmalı olabilir, öğrencilere örnek üzerinden gösterin.</p>`,
['sapasağlam, güpegündüz, biricik, daracık'],
['Ünlü türemesi: sözcükte olmayan bir ünlünün araya girmesi → sapasağlam, güpegündüz, biricik.'],
'Pekiştirme sözcüklerinden ünlü türemesi olanları bulup ayırsınlar.');

K('kaynastirma-unsuz','Kaynaştırma Ünsüzleri (y, ş, s, n)','Ses bilgisi',
`<p>Türkçede iki ünlü yan yana gelmez. Ünlüyle biten bir sözcüğe ünlüyle başlayan bir ek getirildiğinde araya <b>y, ş, s, n</b> ünsüzlerinden biri girer.</p>
<p><b>y:</b> kapı-y-a, oku-y-un, araba-y-ı. <b>ş:</b> üleştirme sayılarında: iki-ş-er, altı-ş-ar. <b>s:</b> 3. tekil iyelik ekinde: oda-s-ı, kuzu-s-u. <b>n:</b> 3. kişi iyelik ekinden sonra gelen hâl eklerinde: oda-sı-n-a, ev-i-n-de.</p>`,
['bahçe-y-e, ikişer ikişer (ş), annesi (s), kapısına (n)'],
['Kaynaştırma ünsüzleri: y, ş, s, n. İki ünlü yan yana gelemez.','y: kapıya; ş: ikişer; s: odası; n: odasına.'],
'Her kaynaştırma ünsüzü için öğrenciler beşer örnek bulsun; bir "kaynaştırma çarkı" afişi hazırlasın.');

K('hece','Hece ve Satır Sonunda Sözcük Bölme','Ses bilgisi',
`<p>Bir solukta çıkarılan ses ya da ses birliğine <b>hece</b> denir. Türkçede her hecede bir ünlü bulunur; ünlü sayısı hece sayısını verir: o-yun-cak (3 hece).</p>
<p>İki ünlü arasındaki tek ünsüz sonraki heceye geçer: ki-tap. Yan yana iki ünsüzden ilki önceki, ikincisi sonraki heceye geçer: ar-ka-daş.</p>
<p><b>Satır sonunda bölme:</b> Satıra sığmayan sözcük hece sonundan bölünür, kısa çizgi satırın sonunda kalır. Tek harf satır başında ya da sonunda bırakılmaz. Kısaltmalar, sayılar bölünmez.</p>`,
['ar-ka-daş-lık, öğ-ret-men, Tür-ki-ye'],
['Her hecede bir ünlü vardır. Hece sayısı = ünlü sayısı.','Satır sonunda sözcük heceden bölünür, kısa çizgi satır sonunda kalır.'],
'Alkış ritmiyle sözcükleri heceletin; ardından dar bir sütuna metin yazdırıp satır sonu bölme yaptırın.');

/* ================= YAZIM ================= */
K('buyuk-harf','Büyük Harflerin Kullanımı','Yazım',
`<p>Büyük harf kullanılan başlıca yerler:</p>
<p>1) Cümle başı. 2) Kişi adları ve soyadları (Recep Akkoyun). 3) Saygı ve unvan sözleri adla birlikte (Ayşe Hanım, Dr. Ali). 4) Millet, dil, ülke, şehir, ilçe, köy, mahalle, cadde adları (Türkçe, Çekmeköy, Sultançiftliği Mahallesi). 5) Kurum, kuruluş adları (Türk Dil Kurumu). 6) Kitap, dergi, gazete, eser adlarının her sözcüğü (Çalıkuşu). 7) Gezegen ve yıldız adları (Dünya, Ay, Güneş, Mars) – gök cismi anlamında. 8) Belirli bir tarih bildiren gün ve ay adları (23 Nisan 1920 Cuma). 9) Dizeler büyük harfle başlayabilir. 10) Tarihî olay, çağ ve dönem adları (Millî Mücadele, Kurtuluş Savaşı). 11) Kısaltmalar (TBMM, TDK).</p>
<p class="dikkat">"Dünya" gezegen kastedilmiyorsa küçük yazılır: "dünya malı". Yön adları özel ada dâhilse büyük: Doğu Anadolu; değilse küçük: doğuya git.</p>`,
['Dünya, Güneş\'in çevresinde döner.','Atatürk 19 Mayıs 1919\'da Samsun\'a çıktı.','Ömer Seyfettin\'in "Kaşağı" hikâyesini okudum.'],
['Cümle başı, özel adlar, kurum adları, eser adları, gezegenler, belirli tarihler, tarihî olaylar büyük harfle başlar.','Gök cismi kastedilmeyen "dünya, güneş, ay" küçük yazılır.'],
'Tüm harfleri küçük yazılmış bir duyuru metnini öğrencilere düzelttirin.');

K('ozel-ad','Özel Adların Yazımı ve Ek Alması','Yazım',
`<p>Özel adlar büyük harfle başlar. Özel adlara getirilen çekim ekleri <b>kesme işaretiyle</b> ayrılır: Ankara'da, Ayşe'nin, Türkiye'ye.</p>
<p>Kurum, kuruluş, kurul, merkez, bölüm, kitap, dergi, gazete adlarına gelen ekler kesmeyle ayrılmaz: Türk Dil Kurumuna, Milliyet gazetesinde. Yapım eki alan özel adlarda kesme kullanılmaz: Türkçe, Ankaralı, Avrupalı.</p>
<p>Özel adlar yazıda yumuşamaz ama okunuşta yumuşar: Mehmet'i (okunuş: Mehmedi).</p>`,
['İstanbul\'dan, Mustafa Kemal\'in, Atatürk Lisesinde, İzmirli'],
['Özel ada gelen çekim eki kesmeyle ayrılır: Ankara\'ya.','Kurum adına gelen ek ayrılmaz: Millî Eğitim Bakanlığına.','Yapım eki alan özel ad kesme almaz: Türkçe, Bursalı.'],
'Öğrenciler kendi adresini, okulunu ve bir gezi planını yazsın; özel adlara getirdikleri ekleri kontrol etsinler.');

K('sayi-yazimi','Sayıların Yazımı','Yazım',
`<p>1) Sayılar harfle yazıldığında her sözcük <b>ayrı</b> yazılır: on iki, yüz yirmi beş, bin dokuz yüz yirmi üç. (Para ile ilgili işlemlerde güvenlik için bitişik yazılabilir: yüzelli lira.)</p>
<p>2) Rakamla yazılan sayılara getirilen ekler <b>kesme işaretiyle</b> ayrılır ve okunuşa uyar: 1923'te, 5'inci, 3'ü, 10'a.</p>
<p>3) Sıra sayıları rakamla yazılırsa ya nokta konur ya da kesme ile "-ıncı" eki getirilir: 5. sınıf veya 5'inci sınıf (*5.'inci yanlış). Romen rakamı da kullanılabilir: XX. yüzyıl.</p>
<p>4) Üleştirme sayıları rakamla yazılmaz: ikişer (2'şer değil). 5) Saat ve dakikalar nokta ya da iki noktayla ayrılır: 09.30, 09:30. 6) Ondalık sayılarda virgül kullanılır: 2,5.</p>
<p class="dikkat">Metinde sayılar genellikle harfle yazılır; ölçü, istatistik, tarih, saat gibi bilgilerde rakam kullanılır.</p>`,
['On sekiz yaşındaydı. 1071\'de Malazgirt zaferi kazanıldı. 6. sınıf / 6\'ncı sınıf. Herkese üçer kalem dağıttı.'],
['Harfle sayılar ayrı yazılır: on iki.','Rakama gelen ek kesmeyle ayrılır: 1923\'te.','Sıra sayısı: 5. veya 5\'inci. Üleştirme rakamla yazılmaz.','Ondalık: virgül (2,5); saat: nokta (09.30).'],
'Okulun haftalık ders saatlerini ve sınıf mevcutlarını içeren bir bilgi metni yazdırıp sayıların yazımını kontrol listesiyle denetletin.');

K('kisaltma','Kısaltmaların Yazımı ve Ek Alması','Yazım',
`<p>Kısaltmalar üç biçimde yapılır: <b>Büyük harfle</b> (TDK, TBMM, MEB), <b>küçük harf ve noktayla</b> (vb., vs., sf.), <b>ölçü birimlerinde noktasız küçük harf</b> (km, kg, cm, m).</p>
<p>Kısaltmalara getirilen ekler <b>kesme işaretiyle</b> ayrılır ve <b>kısaltmanın okunuşuna</b> göre yazılır: TDK'ye (te-de-ke), TRT'den (te-re-te), ASELSAN'a (okunuşu "aselsan"), MEB'e (meb), km'den (kilometreden), kg'ı (kilogramı).</p>
<p class="dikkat">Sonunda nokta olan kısaltmalara ek getirilmez: "Dr.'a" yerine "Doktora".</p>`,
['TBMM\'nin açılışı, NATO\'ya üye, 5 km\'lik yol, THY\'de çalışıyor'],
['Kısaltmaya gelen ek kesmeyle ayrılır ve okunuşa uyar: TDK\'ye, km\'den.','Ölçü birimleri noktasız yazılır: kg, cm.'],
'Gazete haberlerinden kısaltmalar topla; doğru eklerle 5 cümle kur.');

K('ikileme','İkilemeler','Yazım / Söz varlığı',
`<p>Anlatımı güçlendirmek için aynı, yakın, zıt anlamlı ya da biri anlamsız iki sözcüğün art arda kullanılmasına <b>ikileme</b> denir.</p>
<p>Türleri: Aynı sözcüğün tekrarı (yavaş yavaş, ev ev), eş/yakın anlamlı (eski püskü, doğru dürüst), zıt anlamlı (aşağı yukarı, az çok), biri anlamsız (çoluk çocuk, eğri büğrü), m ile (kitap mitap), yansıma (şırıl şırıl).</p>
<p><b>Yazım:</b> İkilemeler <b>ayrı</b> yazılır, aralarına <b>virgül konmaz</b>: "güle güle", "yavaş yavaş". Kalıplaşmış bazı ikilemeler bitişik yazılır: alaşağı, darmadağın, çalakalem.</p>`,
['Koşa koşa geldi. Az çok anladım. Eski püskü elbiseler.'],
['İkileme: anlatımı güçlendirmek için iki sözcüğün art arda kullanılması.','Ayrı yazılır, araya virgül konmaz: yavaş yavaş.'],
'Bir resimdeki durumu en az altı ikileme kullanarak anlatan bir paragraf yazdırın.');

K('pekistirme','Pekiştirmeler','Yazım / Söz varlığı',
`<p>Sözcüğün anlamını kuvvetlendirmek için yapılan değişikliğe <b>pekiştirme</b> denir. Genellikle sözcüğün ilk hecesine m, p, r, s ünsüzlerinden biri eklenir: <b>mas</b>mavi, <b>sap</b>sarı, <b>kıp</b>kırmızı, <b>bem</b>beyaz, <b>ter</b>temiz, <b>yem</b>yeşil, <b>çır</b>çıplak.</p>
<p><b>Yazım:</b> Pekiştirmeler <b>bitişik</b> yazılır: apaçık, büsbütün, yepyeni, çepeçevre, sapasağlam, upuzun.</p>
<p>Pekiştirme ikilemeyle de yapılabilir: "uzun uzun" (ikileme) – "upuzun" (pekiştirme).</p>`,
['Gökyüzü masmaviydi. Elleri tertemiz. Yapayalnız kaldı.'],
['Pekiştirme sözcüğün anlamını güçlendirir; bitişik yazılır: masmavi, tertemiz, yepyeni.'],
'Renk ve durum bildiren 10 sözcüğün pekiştirmesini yazdırıp bunlarla bir doğa betimlemesi yaptırın.');

K('yabanci-sozcuk','Yabancı Sözcükler ve Türkçe Karşılıkları','Söz varlığı',
`<p>Dilimizde karşılığı olan yabancı sözcükler yerine Türkçe sözcük kullanmak dilimizin zenginliğini korur. TDK\'nin "Yabancı Kelimelere Karşılıklar" kılavuzundan yararlanılabilir.</p>
<p>Örnekler: aktivite → etkinlik, egzersiz → alıştırma, organizasyon → düzenleme, konsantre → odaklanmak, online → çevrim içi, mouse → fare, e-mail → e-posta, selfie → özçekim, trend → eğilim, fast food → hazır yemek, AVM → alışveriş merkezi, kontrol → denetim, start → başlangıç.</p>`,
['Bugünkü toplantıya online katıldım. → çevrim içi','Bu aktiviteyi çok sevdim. → etkinliği'],
['Karşılığı olan yabancı sözcük yerine Türkçesini kullan: online → çevrim içi, e-mail → e-posta, aktivite → etkinlik.'],
'Okul çevresindeki tabela ve afişlerdeki yabancı sözcükleri fotoğraflayıp Türkçe karşılıklarını öneren bir pano hazırlatın.');

K('yanlis-yazilan','Sık Yanlış Yazılan Sözcükler','Yazım',
`<p>Doğru – yanlış: <b>herkes</b> (herkez), <b>yalnız</b> (yanlız), <b>yanlış</b> (yalnış), <b>şoför</b> (şöför), <b>tıraş</b> (traş), <b>orijinal</b> (orjinal), <b>eşofman</b> (eşortman), <b>kirpik</b>, <b>sürpriz</b> (süpriz), <b>yüzyıl</b> (bitişik), <b>birkaç</b> (bitişik), <b>her şey</b> (ayrı), <b>hiçbir</b> (bitişik), <b>bugün</b> (bitişik), <b>öbür gün</b> (ayrı), <b>yalnızca</b>, <b>laboratuvar</b> (laboratuar), <b>kılavuz</b> (klavuz), <b>meyve</b> (meyva), <b>entelektüel</b>, <b>aşçı</b> (ahçı), <b>poğaça</b>, <b>tren</b>, <b>kibrit</b>.</p>
<p>"de/da", "ki", "mi" bağlaçlarının yazımı ve "her şey/hiçbir şey" ayrı yazımı en sık yapılan hatalardandır.</p>`,
['Herkes yalnız değildir. Her şey yolunda. Hiçbir şey olmadı.'],
['herkes, yalnız, yanlış, şoför, tıraş, orijinal, sürpriz, laboratuvar, kılavuz','Bitişik: birkaç, hiçbir, bugün, yüzyıl. Ayrı: her şey, hiçbir şey, bir şey.'],
'Haftanın sözcüğü: Her derste tahtanın köşesine sık yanlış yazılan bir sözcüğü yazın; hafta sonunda dikte yapın.');

K('duzeltme-isareti','Düzeltme İşareti (^)','Yazım',
`<p>Düzeltme işareti (şapka) iki amaçla kullanılır:</p>
<p>1) <b>Yazılışları aynı, anlamları ve okunuşları farklı sözcükleri ayırmak için:</b> hala (babanın kız kardeşi) – hâlâ (henüz); adet (sayı) – âdet (gelenek); alem (bayrak) – âlem (dünya); hal (pazar yeri) – hâl (durum).</p>
<p>2) <b>Alıntı sözcüklerde ince g, k, l ünsüzlerinden sonra gelen a ve u ünlülerini ince okutmak için:</b> kâğıt, dükkân, rüzgâr, hikâye, mekân, lâle (yaygın: lale), Kâzım.</p>
<p>3) Nispet ı'sını belirtmek için: millî, dinî, resmî, askerî (milli değil millî).</p>`,
['Hâlâ gelmedi. – Halam geldi.','Kâğıdı rüzgâr uçurdu.','İstiklâl Marşı millî marşımızdır.'],
['Düzeltme işareti: anlam ayırt etme (hala/hâlâ, adet/âdet) ve inceltme (kâğıt, rüzgâr, hikâye).','Millî, dinî, resmî, tarihî sözcüklerinde î kullanılır.'],
'"hala-hâlâ, adet-âdet, alem-âlem" çiftleriyle cümleler kurdurun.');

/* ================= NOKTALAMA ================= */
K('nokta','Nokta (.)','Noktalama',
`<p>1) Tamamlanmış cümlenin sonuna konur. 2) Bazı kısaltmaların sonuna konur: Dr., Prof., vb., sf. 3) Sayılardan sonra sıra bildirmek için: 5. sınıf, 2. kat. 4) Tarihlerde gün, ay ve yılı ayırmak için: 14.09.2026. 5) Saat ve dakikayı ayırmak için: 09.30. 6) Bölüm ve maddeleri gösteren rakam ya da harflerden sonra: 1., a. 7) Dört ve daha çok basamaklı sayıları üçlü gruplara ayırmak için: 1.250.000.</p>
<p class="dikkat">Kısaltma noktasıyla cümle sonu çakışırsa tek nokta konur.</p>`,
['Toplantı 14.09.2026 Pazartesi günü saat 09.30\'da başlayacak.','Dr. Ayşe Hanım 3. katta.'],
['Nokta: cümle sonu, bazı kısaltmalar (Dr., vb.), sıra sayısı (5.), tarih (14.09.2026), saat (09.30), basamak (1.250).'],
'Okulun bir haftalık programını tarih ve saatleriyle yazdırıp noktaların yerini kontrol ettirin.');

K('virgul','Virgül (,)','Noktalama',
`<p>1) Eş görevli sözcük ve söz öbeklerini ayırmak için: "Kalem, silgi, defter aldım." 2) Sıralı cümleleri ayırmak için: "Eve geldi, yemeğini yedi, uyudu." 3) Hitaplardan sonra: "Sevgili öğrencilerim," 4) Kabul, ret ve teşvik sözlerinden (evet, hayır, peki, tamam, haydi, aferin) sonra: "Hayır, vazgeçmeyeceğim." 5) Cümlede özneyi belirtmek için (özne yüklemden uzaksa): "Ali, okulun en çalışkan öğrencisidir." 6) Ara sözleri ayırmak için: "Komşumuz, emekli öğretmen, bize uğradı." 7) Ondalık sayıları ayırmak için: 2,5. 8) Tırnak içinde olmayan aktarılmış sözlerden sonra: "Yarın geleceğim, dedi."</p>
<p class="dikkat">"ve, ile, veya, ya da" bağlaçlarından önce virgül konmaz. İkilemelerin arasına virgül konmaz.</p>`,
['Evet, ödevimi yaptım.','Arkadaşlar, yarın geziye gidiyoruz.','Oya, Ece ve Can geldi.'],
['Virgül: eş görevli sözcükler arası, sıralı cümleler arası, hitaptan sonra, evet/hayır/peki sonrası, özneyi belirtme, ara söz, ondalık sayı.','"ve"den önce virgül konmaz.'],
'Virgüllerin silindiği bir paragrafı öğrenciler sesli okuyup duraklama yerlerine virgül koysun, ardından kurallara göre kontrol etsin.');

K('noktali-virgul','Noktalı Virgül (;)','Noktalama',
`<p>1) Cümle içinde virgüllerle ayrılmış tür ve takımları birbirinden ayırmak için: "Kırmızı, sarı, yeşil renkler; kare, üçgen, daire şekiller vardı." 2) Ögeleri arasında virgül bulunan sıralı cümleleri birbirinden ayırmak için: "Erkekler, kadınlar, çocuklar cepheye koştu; kimse geride kalmadı." 3) Cümleleri birbirine bağlayan "ama, fakat, ancak, bu yüzden" gibi bağlaçlardan önce: "Çok çalıştı; ama hedefine ulaşamadı."</p>`,
['Ali, Veli, Ayşe beşinci sınıfta; Can, Ece, Mert altıncı sınıftadır.'],
['Noktalı virgül: virgülle ayrılmış grupları ayırır; ögeleri arasında virgül bulunan sıralı cümleleri ayırır.'],
'Sınıftaki öğrencileri gruplara göre listeleyen bir cümle yazdırıp noktalı virgül kullandırın.');

K('iki-nokta','İki Nokta (:)','Noktalama',
`<p>1) Kendisinden sonra örnek verilecek ya da açıklama yapılacak cümlenin sonuna: "Çantama şunları koydum: kalem, silgi, defter." 2) Karşılıklı konuşmalarda konuşan kişinin adından sonra: "Öğretmen: Herkes yerine geçsin." 3) Saat ve dakikayı ayırmak için (nokta da kullanılabilir): 09:30. 4) Tanıtım yazılarında ve sözlük maddelerinde açıklamadan önce.</p>
<p class="dikkat">İki noktadan sonra gelen cümle büyük harfle başlar; sözcük ya da sözcük grubu küçük harfle başlar.</p>`,
['Atatürk şöyle der: "Hayatta en hakiki mürşit ilimdir."','Ayşe: Bugün ne okuyoruz?'],
['İki nokta: açıklama ve örnekten önce, konuşan kişinin adından sonra, saat-dakika arasında.'],
'Bir tiyatro metninin konuşan adları ve iki nokta ile yazılmış kısa sahnesini öğrencilere yazdırın.');

K('soru-isareti','Soru İşareti (?)','Noktalama',
`<p>1) Soru bildiren cümle ya da sözlerin sonuna konur: "Ödevini yaptın mı?" 2) Bilinmeyen, kesin olmayan yer, tarih gibi bilgilerin yanına ayraç içinde konur: "Yunus Emre (1240?-1320)". 3) Alay ya da kesinsizlik bildirmek için ayraç içinde: "Çok çalışkan (?) bir öğrenci."</p>
<p class="dikkat">Soru eki (mı) bulunduğu hâlde soru anlamı taşımayan cümlelere soru işareti konmaz: "Bahar geldi mi kırlar çiçek açar." Soru sözcüğü olsa da soru anlamı yoksa konmaz: "Kim gelirse gelsin."</p>`,
['Kaç yaşındasın?','Piri Reis (1465?-1553)'],
['Soru işareti: soru cümlesi sonunda; kesin olmayan bilgide (?).','Soru anlamı yoksa konmaz: "Kim gelirse gelsin."'],
'Öğrenciler birbirlerine röportaj soruları yazsın; soru işareti ve soru ekinin yazımını kontrol etsinler.');

K('unlem','Ünlem İşareti (!)','Noktalama',
`<p>1) Sevinç, kıvanç, acı, korku, şaşma gibi duyguları bildiren cümlelerin sonuna: "Ne güzel bir gün!" 2) Seslenme, hitap ve uyarı sözlerinden sonra: "Ey Türk gençliği!" "Dikkat!" 3) Alay ya da küçümseme anlamında ayraç içinde: "Çok akıllı (!) bir fikir."</p>`,
['Eyvah, geç kaldım!','Haydi, çocuklar!'],
['Ünlem: duygu bildiren cümle sonu, seslenme ve uyarı sözleri, ayraç içinde alay (!).'],
'Aynı cümleyi (Kar yağıyor) nokta, soru işareti ve ünlemle yazdırıp farklı tonlarla sesli okutun.');

K('uc-nokta','Üç Nokta (…)','Noktalama',
`<p>1) Tamamlanmamış cümlelerin sonuna: "Bir zamanlar…" 2) Söylenmesi istenmeyen sözlerin yerine: "Sen bunu yaparsan…" 3) Sayılacak örneklerin devamını göstermek için: "Kalem, silgi, defter…" 4) Konuşmada duraklamayı, heyecanı, kararsızlığı göstermek için: "Şey… ben… unuttum." 5) Alıntılarda atlanan bölümleri göstermek için ayraç içinde: (…)</p>
<p class="dikkat">Üç nokta yan yana üç noktadır; aralarında boşluk bırakılmaz.</p>`,
['Bir varmış, bir yokmuş…','Elma, armut, kiraz… her şey vardı.'],
['Üç nokta: tamamlanmamış cümle, söylenmeyen söz, sayılacak örneklerin devamı, duraklama, alıntıda atlanan yer (…).'],
'Öğrenciler üç noktayla biten bir cümle yazsın; arkadaşı cümleyi tamamlasın (hikâye zinciri).');

K('kesme-isareti','Kesme İşareti (\')','Noktalama',
`<p>1) Özel adlara getirilen çekim eklerini ayırmak için: Ankara'ya, Ayşe'nin, Türkiye'de. 2) Kısaltmalara getirilen ekleri ayırmak için: TDK'nin, km'den. 3) Rakamla yazılan sayılara getirilen ekleri ayırmak için: 1923'te, 5'inci. 4) Şiirde ses düşmesini göstermek için: "N'oldu?" "Bir ok gibi el'den çıktı" (şiir dili).</p>
<p class="dikkat">Kurum, kuruluş, kitap, gazete adlarına gelen ekler ayrılmaz: Türk Dil Kurumunun. Yapım eki alan özel adlar kesme almaz: Türkçe, Ankaralı. Özel adın kendisine "-ler" eki "aile" anlamında getirilirse kesmeyle ayrılır: Ahmet'ler.</p>`,
['İzmir\'den geldik. TBMM\'nin kuruluşu. 2026\'da.'],
['Kesme: özel ad + çekim eki, kısaltma + ek, rakam + ek.','Kurum adına gelen ek ayrılmaz; yapım eki alan özel ad kesme almaz.'],
'Bir gezi planını (şehirler, tarihler, kurumlar) yazdırıp kesme işaretlerini kontrol listesiyle değerlendirin.');

K('kisa-cizgi','Kısa Çizgi (-)','Noktalama',
`<p>1) Satır sonunda bölünen sözcüklerin bölündüğü yeri göstermek için (hece sonundan): kitap-lık. 2) Kök ve ekleri birbirinden ayırmak için: göz-lük-çü. 3) Fiil kök ve gövdelerini göstermek için sonuna: gel-, oku-, sev-. 4) Ekleri göstermek için başına: -lık, -cı, -ma. 5) Arasında, ile, -den…-e anlamında: Ankara-İstanbul yolu, 1919-1922 yılları, Türkçe-İngilizce sözlük. 6) Ara sözleri ayırmak için (virgül yerine): "Bu sorunu – bence – kolayca çözebiliriz." 7) Ünlü ve ünsüz uyumlarını, heceleri göstermek için: a-ra-ba.</p>`,
['Fiil kökü: yaz-; ek: -cı; Ankara-Sivas treni; 2026-2027 eğitim öğretim yılı'],
['Kısa çizgi: satır sonu bölme, kök-ek ayırma (göz-lük), fiil kökü (gel-), ek (-lık), arasında anlamı (Ankara-İzmir), ara söz.'],
'Bir kökten türettikleri sözcükleri kök-ek ayrımıyla kısa çizgi kullanarak yazdırın.');

K('uzun-cizgi','Uzun Çizgi (—)','Noktalama',
`<p>Yazıda karşılıklı konuşmalarda (diyaloglarda) konuşma sırasını göstermek için satır başında kullanılır. Her yeni konuşma yeni satırda başlar.</p>
<p>— Nereye gidiyorsun?<br>— Kütüphaneye.<br>— Ben de geleyim mi?</p>
<p>Kişi adları yazılmadan verilen diyaloglarda konuşanı okur bağlamdan çıkarır. Anlatıcının açıklamaları konuşmanın arasına virgül ya da yeni bir uzun çizgiyle eklenebilir.</p>`,
['— Öğretmenim, girebilir miyim?\n— Gel bakalım, neden geç kaldın?'],
['Uzun çizgi: diyaloglarda konuşma sırasını gösterir; her konuşma yeni satırda başlar.'],
'İkili gruplar bir tartışma yazsın; uzun çizgiyle diyalog biçiminde düzenleyip canlandırsın.');

K('egik-cizgi','Eğik Çizgi (/)','Noktalama',
`<p>1) Şiir alıntılarında dizeler yan yana yazıldığında dizeleri ayırmak için: "Korkma, sönmez bu şafaklarda yüzen al sancak; / Sönmeden yurdumun üstünde tüten en son ocak." 2) Adreslerde apartman numarasını daire numarasından ayırmak için: Gül Sokak No: 15/3. 3) Bölüm, kısım, sınıf ve şube bildiren sayılar arasında: 6/A sınıfı. 4) Tarihleri gösterirken (nokta yerine): 14/09/2026. 5) "Ya da" anlamında: öğretmen/öğrenci, km/sa (bölü anlamı).</p>`,
['6/A sınıfı, Gül Sokak No: 12/4, km/sa'],
['Eğik çizgi: şiir dizelerini yan yana yazarken ayırır; adres (12/4), sınıf (6/A), tarih (14/09/2026), "veya" ve bölü anlamı.'],
'İstiklâl Marşı\'nın ilk kıtasını dizeleri eğik çizgiyle ayırarak tek satırda yazdırın.');

K('tirnak','Tırnak İşareti (" ")','Noktalama',
`<p>1) Başka bir kişiden ya da yazıdan olduğu gibi aktarılan sözler tırnak içine alınır: Atatürk "Ne mutlu Türk'üm diyene!" demiştir. 2) Özellikle belirtilmek istenen sözcükler tırnak içine alınabilir: "Saygı" sözcüğü… 3) Kitap, dergi, gazete, makale adları tırnak içinde yazılabilir: "Sinekli Bakkal" romanı.</p>
<p class="dikkat">Tırnak içindeki söze gelen ek kesmeyle ayrılmaz: "Çalıkuşu"nu okudum.</p>`,
['Öğretmenimiz "Okumak, düşünmeyi öğretir." dedi.'],
['Tırnak: aktarılan söz, vurgulanan sözcük, eser adı.','Tırnaktan sonra gelen ek kesmesiz bitişir: "Kaşağı"yı.'],
'Bir aile büyüğünün sözünü tırnak işaretiyle aktaran kısa bir yazı yazdırın.');
})();
