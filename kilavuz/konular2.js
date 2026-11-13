/* Konu anlatım kütüphanesi – 2. bölüm: söz varlığı, anlam bilgisi, söz sanatları */
(function(){
const K=(id,ad,alan,anlatim,ornek,defter,etkinlik)=>{EK.konu[id]={ad,alan,anlatim,ornek:ornek||[],defter:defter||[],etkinlik:etkinlik||''};};

/* ================= SÖZ VARLIĞI ================= */
K('sozvarligi','Söz Varlığı ve Bağlamdan Anlam Tahmini','Söz varlığı',
`<p>Bir dilin sözcükleri, deyimleri, atasözleri, kalıp sözleri ve terimlerinin tamamına <b>söz varlığı</b> denir. Öğrencinin söz varlığı okudukça ve yeni sözcükleri kullandıkça zenginleşir.</p>
<p><b>Bağlamdan anlam tahmini (4 adım):</b> 1) Sözcüğün geçtiği cümleyi ve önceki-sonraki cümleleri yeniden oku. 2) Sözcüğün kökünü ve eklerini incele (göz-lem-ci). 3) Yerine anlamlı bir sözcük koyarak dene. 4) Tahminini sözlükten (TDK Güncel Türkçe Sözlük – sozluk.gov.tr) kontrol et.</p>
<p>Sözlük kullanımı: Sözcükler alfabetik sıralanır; kök hâline göre aranır (gözlükçüler → gözlükçü). Maddede türü (isim, sıfat, fiil), anlamları numaralı, örnek cümleler ve deyimler bulunur.</p>`,
['"Kuşlar yörüngesinde dolanır gibi dönüyordu." → yörünge: bir cismin çevresinde izlediği yol (tahmin), sözlükle doğrula.'],
['Bağlamdan tahmin: cümleyi yeniden oku → kök-eki incele → yerine sözcük koy → sözlükten doğrula.','Her öğrenci "Sözcük Defteri" tutar: sözcük – metindeki cümle – anlamı – kendi cümlem.'],
'"Sözcük Defteri" uygulaması: her metinden en az 5 yeni sözcük; dönem sonunda sözcük bingosu.');

K('es-anlam','Eş Anlamlı (Anlamdaş) Sözcükler','Söz varlığı',
`<p>Yazılışları farklı, anlamları aynı ya da çok yakın olan sözcüklerdir: armağan-hediye, okul-mektep, cevap-yanıt, yurt-vatan, siyah-kara, ak-beyaz, kelam-söz, akıbet-sonuç, niyet-amaç, ırak-uzak, öğüt-nasihat.</p>
<p>Eş anlamlı sözcükler aynı cümlede birbirinin yerine kullanılabilir; anlatımda tekrardan kaçınmak için yararlıdır. Ancak her bağlamda tam örtüşmeyebilir: "kara haber" denir, "siyah haber" denmez.</p>`,
['Sınavın cevabını / yanıtını bilmiyorum.','Ak saçlı dedem → Beyaz saçlı dedem'],
['Eş anlamlı: farklı yazılış, aynı anlam → armağan-hediye, yanıt-cevap, yurt-vatan, öğüt-nasihat.'],
'Eş anlamlı sözcük kartlarıyla "eşini bul" oyunu oynatın; her çiftle bir cümle kurdurun.');

K('karsit-anlam','Zıt (Karşıt) Anlamlı Sözcükler','Söz varlığı',
`<p>Anlamca birbirinin karşıtı olan sözcüklerdir: iyi-kötü, uzun-kısa, karanlık-aydınlık, hayır-şer, büyümek-küçülmek, gelmek-gitmek, cömert-cimri.</p>
<p class="dikkat">Olumsuzluk eki (-ma/-me) ya da "değil" ile yapılan karşıtlık zıt anlam değildir: "gelmek-gelmemek" zıt anlamlı değil, olumsuzdur. "güzel-güzel değil" de zıt anlamlı değildir; "güzel-çirkin" zıt anlamlıdır.</p>
<p>Zıt anlamlı sözcükler şiirde ve düzyazıda karşılaştırma ve anlatımı güçlendirme amacıyla kullanılır (tezat).</p>`,
['Dünyanın yarısı aydınlık, yarısı karanlık.','İyi gün dostu değil, kötü gün dostu ol.'],
['Zıt anlam: iyi-kötü, gelmek-gitmek. Olumsuzluk (gelmek-gelmemek) zıt anlam değildir.'],
'"Zıtlar Şiiri": öğrenciler zıt anlamlı sözcük çiftlerini kullanarak dört dizelik şiir yazsın.');

K('es-sesli','Eş Sesli (Sesteş) Sözcükler','Söz varlığı',
`<p>Yazılışları ve okunuşları aynı, anlamları tamamen farklı sözcüklerdir. Anlam ilişkisi yoktur.</p>
<p>yüz (sayı / surat / yüzmek fiili), çay (içecek / küçük akarsu), dolu (yağış / boş olmayan), gül (çiçek / gülmek), yaz (mevsim / yazmak), at (hayvan / atmak), kara (siyah / toprak), hayır (iyilik / olumsuz cevap), ekmek (yiyecek / tohum ekmek), bağ (üzüm bağı / ip bağı).</p>
<p class="dikkat">Çok anlamlılıkla karıştırılmamalı: "kolun ağrıyor – gömleğin kolu" (aynı sözcüğün yan anlamı, aralarında ilgi var) çok anlamlılıktır.</p>`,
['Yaz gelince günlüğüne bir şeyler yaz.','Dolu yağınca bardak dolu oldu.'],
['Eş sesli: yazılış ve okunuş aynı, anlamlar ilgisiz → yüz, çay, dolu, yaz, gül, hayır.'],
'Eş sesli sözcüklerin iki anlamını tek cümlede kullanan esprili cümleler yazdırın; en yaratıcısı panoya.');

K('deyim','Deyimler','Söz varlığı',
`<p>Bir kavramı ya da durumu çekici biçimde anlatan, genellikle gerçek anlamından uzaklaşmış, kalıplaşmış söz öbeklerine <b>deyim</b> denir.</p>
<p>Özellikleri: En az iki sözcükten oluşur. Kalıplaşmıştır; sözcükleri değiştirilemez ("göz atmak" yerine "*göz fırlatmak" denmez). Çoğu mecazlıdır. Genellikle mastar (-mak/-mek) biçimindedir. Öğüt vermez, bir durumu anlatır (atasözünden farkı).</p>
<p>Örnekler: aklının ucundan geçmemek (hiç düşünmemek), etekleri zil çalmak (çok sevinmek), kulak vermek (dinlemek), göz atmak (kısaca bakmak), gönül almak (gönlünü hoş etmek), dört dönmek (telaşla aramak), bir çırpıda (hemen, kolayca), pabucu dama atılmak (gözden düşmek), kendini yiyip bitirmek.</p>`,
['Haberi duyunca etekleri zil çaldı.','Bu işi bir çırpıda bitirdi.'],
['Deyim: kalıplaşmış, çoğunlukla mecaz anlamlı söz öbeği; durum anlatır, öğüt vermez.','Atasözü: yargı bildirir, öğüt verir. Deyim: kavram/durum anlatır.'],
'Deyim pandomimi: öğrenciler bir deyimi çizerek ya da canlandırarak anlatsın, sınıf tahmin etsin.');

K('atasozu','Atasözleri','Söz varlığı',
`<p>Uzun deneyim ve gözlemlerden süzülerek oluşmuş, öğüt veren, toplumun ortak malı olmuş, kimin söylediği bilinmeyen kalıplaşmış sözlere <b>atasözü</b> denir.</p>
<p>Özellikleri: Bir yargı bildirir (cümle niteliğindedir). Kısa ve özdür. Kalıplaşmıştır. Genellikle mecaz anlamlıdır. Öğüt verir, yol gösterir.</p>
<p>Örnekler: Tatlı dil yılanı deliğinden çıkarır. Damlaya damlaya göl olur. Ağaç yaş iken eğilir. Ev alma, komşu al. Bilmemek ayıp değil, öğrenmemek ayıptır. Sakla samanı gelir zamanı. Çok okuyan değil, çok gezen bilir. Komşu komşunun külüne muhtaçtır.</p>`,
['Tatlı dil yılanı deliğinden çıkarır. → Güzel söz en zor insanı bile yumuşatır.'],
['Atasözü: deneyimden doğmuş, öğüt veren, kalıplaşmış, anonim söz. Yargı bildirir.','Deyim ≠ atasözü: deyim öğüt vermez, mastarla biter.'],
'Her öğrenci bir atasözü seçip anlamını gösteren 4-5 cümlelik kısa bir olay yazsın; sınıf atasözünü tahmin etsin.');

K('kalip-soz','Kalıplaşmış (Kalıp) Sözler','Söz varlığı',
`<p>Belirli durumlarda, toplumca benimsenmiş biçimde söylenen, sözcükleri değiştirilmeyen ifadelerdir. Nezaketin ve kültürün göstergesidir.</p>
<p>Karşılaşma: Günaydın, İyi günler, Hoş geldiniz – Hoş bulduk. İş üstündekine: Kolay gelsin – Sağ ol. Yemekte: Afiyet olsun – Elinize sağlık. Hastaya: Geçmiş olsun. Bayramda: Bayramınız mübarek olsun. Yeni bir şey alana: Güle güle kullan. Ölüm durumunda: Başınız sağ olsun, Allah rahmet eylesin. Yolculukta: Hayırlı yolculuklar. Yeni işte: Hayırlı olsun.</p>`,
['— Kolay gelsin usta!\n— Sağ ol evladım.'],
['Kalıp söz: belirli durumda söylenen kalıplaşmış ifade → Kolay gelsin, Geçmiş olsun, Afiyet olsun, Hayırlı olsun.'],
'Durum kartları dağıtın (hasta ziyareti, bayram, yeni ev); öğrenciler uygun kalıp sözle canlandırsın.');

K('yansima','Yansıma Sözcükler','Söz varlığı',
`<p>Doğadaki seslerin taklit edilmesiyle oluşan sözcüklere <b>yansıma</b> denir: şırıl şırıl, hav hav, miyav, gürül gürül, çıtır çıtır, tık tık, horul horul, vızır vızır, çatırdamak, fısıldamak, şırıldamak.</p>
<p>Yansımalardan yapım ekiyle yeni sözcükler türetilir: şırıl-tı, hırıl-tı, gürle-mek, cıvıl-da-mak. Yansımalar anlatıma canlılık ve ses katar; özellikle şiirde ve betimlemelerde kullanılır.</p>`,
['Dere şırıl şırıl akıyor. Kapı gıcırdadı.'],
['Yansıma: doğadaki seslerin taklidi → şırıl şırıl, gürül gürül, hav hav, gıcırdamak.'],
'Gözlerinizi kapatın, sınıftaki ve dışarıdaki sesleri dinleyin; duyduklarınızı yansıma sözcüklerle yazın.');

K('tekerleme','Tekerleme','Söz varlığı / Halk edebiyatı',
`<p>Çoğunlukla ses benzerliklerine dayanan, söylenmesi zor, eğlendirici ve oyun amaçlı kısa sözlerdir. Masalların başında (döşeme) ve sonunda kullanılır; çocuk oyunlarında sayışma olarak söylenir.</p>
<p>Diksiyon (doğru ve akıcı konuşma) çalışmasında çok yararlıdır: "Şu köşe yaz köşesi, şu köşe kış köşesi…", "Bir berber bir berbere…", "Kartal kalkar dal sarkar…".</p>`,
['Bir varmış bir yokmuş, evvel zaman içinde, kalbur saman içinde…'],
['Tekerleme: ses benzerliğine dayanan, eğlendirici, söylenişi zor kısa söz; masal başında ve oyunlarda kullanılır.'],
'Tekerleme yarışması: hızlı ve doğru söyleme; ardından öğrenciler kendi tekerlemelerini yazsın.');

K('kavram-alani','Kavram Alanı ve Çağrışım','Söz varlığı',
`<p>Bir kavramla anlamca ilişkili sözcüklerin oluşturduğu gruba <b>kavram alanı</b> denir. Örneğin "okul" kavram alanı: öğretmen, öğrenci, sınıf, kitap, ders, teneffüs, karne.</p>
<p><b>Çağrışım:</b> Bir sözcüğün zihinde uyandırdığı başka sözcük ve düşüncelerdir. "Deniz" → mavi, dalga, yaz, tatil, martı.</p>
<p>Kavram haritası çizmek, yeni öğrenilen sözcükleri kalıcı hâle getirir ve yazmadan önce fikir üretmeye yardım eder.</p>`,
['vatan → bayrak, toprak, millet, şehit, bağımsızlık','cephe → asker, siper, ordu, mermi'],
['Kavram alanı: bir kavramla ilişkili sözcükler grubu. Çağrışım: sözcüğün zihinde uyandırdıkları.'],
'Tahtanın ortasına tema kavramını yazın; 3 dakikada en çok ilişkili sözcüğü bulan grup kazanır, ardından kavram haritası çizilir.');
K('cagrisim','Çağrışım','Söz varlığı',
`<p>Bir sözcüğün ya da görselin zihinde uyandırdığı başka sözcük, duygu ve düşüncelere <b>çağrışım</b> denir. Kişiden kişiye değişebilir. "Bayram" → şeker, el öpmek, yeni elbise, dede; "Oyun" → top, arkadaş, bahçe, kahkaha.</p>
<p>Okuma öncesinde başlık ya da görselden çağrışım yapmak, ön bilgiyi harekete geçirir ve tahmini kolaylaştırır.</p>`,
['Kış → kar, kardan adam, soba, kestane, atkı'],
['Çağrışım: bir sözcüğün zihinde uyandırdığı sözcük ve düşünceler.'],
'"Sözcük zinciri": her öğrenci bir öncekinin sözcüğünden çağrışım yaparak yeni bir sözcük söylesin.');

K('benzerlik','Benzerlik Bildiren Söz Varlığı','Söz varlığı',
`<p>İki varlık ya da durum arasında benzerlik kurmak için kullanılan sözcük ve eklerdir: <b>gibi, sanki, adeta, kadar, tıpkı, aynı, benzer şekilde, -ca/-ce</b> (çocukça), <b>-msı/-imsi</b> (ekşimsi).</p>
<p>Benzetme sanatının (teşbih) temel aracıdır; karşılaştırmalı anlatımda da kullanılır.</p>`,
['Sanki bir kuş gibi hafifti.','Tıpkı annesi kadar çalışkandır.'],
['Benzerlik: gibi, sanki, adeta, kadar, tıpkı, aynı, benzer şekilde, -ca.'],
'Bir arkadaşını benzerlik ifadeleriyle (gibi, sanki, kadar) anlatan üç cümle yaz.');

K('olumsuzluk','Olumsuzluk Bildiren Söz Varlığı','Söz varlığı',
`<p>Bir yargıyı olumsuz kılan ya da reddi bildiren sözcük ve eklerdir: <b>-ma/-me</b> eki (gelmedi), <b>değil, yok, hayır, asla, hiç, hiçbir, ne…ne, maalesef, ne yazık ki</b>.</p>
<p>Bir daveti ya da isteği kırmadan reddederken yumuşatıcı ifadeler kullanılır: "Çok isterdim ama bu kez gelemeyeceğim.", "Teşekkür ederim, ne yazık ki başka bir planım var."</p>
<p class="dikkat">Biçimce olumsuz ama anlamca olumlu cümleler: "Gelmez olur mu?" (gelir). İki olumsuz bir olumlu: "Bilmiyor değilim." (biliyorum).</p>`,
['Maalesef bu akşam gelemem.','Bu işi asla yarım bırakmam.'],
['Olumsuzluk: -ma/-me, değil, yok, hayır, asla, hiç, ne yazık ki, maalesef.','Nazik ret: teşekkür + gerekçe + alternatif öneri.'],
'İkili gruplarda "nazik ret" canlandırması: davet kartı alan öğrenci olumsuzluk ifadelerini kullanarak kırmadan reddetsin.');

K('zitlik','Karşıtlık Bildiren İfadeler','Anlam bilgisi',
`<p>İki düşünce arasında karşıtlık ya da beklenmeyen durum bildiren ifadelerdir: <b>ama, fakat, lakin, ancak, oysa, hâlbuki, buna rağmen, yine de, -sa da, -masına rağmen</b>.</p>
<p>"Çok çalıştı ama sınavı geçemedi." Karşıtlık, karşılaştırma yaparken ve görüş bildiren yazılarda karşı görüşü vermek için kullanılır.</p>`,
['Hava soğuktu, buna rağmen denize girdik.','Herkes geldi oysa sen yoktun.'],
['Karşıtlık: ama, fakat, lakin, ancak, oysa, hâlbuki, buna rağmen, yine de.'],
'İki kişinin farklı görüşlerini karşıtlık bağlaçlarıyla birleştiren cümleler yazdırın.');

K('tahmin-ifadeleri','Tahmin Bildiren İfadeler','Anlam bilgisi',
`<p>Kesin olmayan, olasılık bildiren yargıları ifade eden sözcük ve eklerdir: <b>galiba, belki, muhtemelen, herhâlde, sanırım, tahminimce, acaba, -abilir, -mış olmalı</b>.</p>
<p>"Galiba yağmur yağacak." "Kapıyı çalan postacı olabilir." Bu cümleler kesin değil, olasılık bildirir; nesnel bilgi gibi sunulmamalıdır.</p>`,
['Belki yarın gelir.','Muhtemelen ödevini unuttu.'],
['Tahmin: galiba, belki, muhtemelen, herhâlde, sanırım, -abilir.'],
'Bir görsel gösterin; öğrenciler olay hakkında tahmin ifadeleriyle beş cümle yazsın.');

K('sart','Şart (Koşul) Anlamı','Anlam bilgisi',
`<p>Bir yargının gerçekleşmesinin başka bir yargıya bağlı olduğunu bildiren cümlelerdir. Şart bildiren yapılar: <b>-sa/-se</b> (çalışırsan), <b>eğer, şayet</b>, <b>-dıkça</b> (okudukça), <b>-ınca</b> (gelince), <b>-dığı takdirde</b>, <b>yeter ki</b>, <b>mı</b> ("Bahar geldi mi…").</p>
<p>"Eğer uçak icat edilmeseydi uzak yerlere gitmek çok zor olurdu." – gerçekleşmemiş şart (varsayım).</p>`,
['Kitap okursan kelime hazinen gelişir.','Erken yatarsak sabah dinç kalkarız.'],
['Şart: -sa/-se, eğer, -dıkça, -ınca, -dığı takdirde, yeter ki.'],
'"Eğer … olsaydı" oyunu: her öğrenci bir icadın olmadığı dünyayı şart cümlesiyle anlatsın.');

K('amac-sonuc','Amaç-Sonuç Cümleleri','Anlam bilgisi',
`<p>Eylemin <b>hangi amaçla</b> yapıldığını bildiren cümlelerdir. Amaç, henüz gerçekleşmemiş bir hedeftir. Ekler ve sözcükler: <b>için, -mak için, -mek üzere, -mak amacıyla, diye, -sın diye</b>.</p>
<p>"Sınavı kazanmak için çok çalıştı." (Kazanma amaç, çalışma eylem.)</p>
<p class="dikkat">Sebep-sonuçla farkı: Amaçta hedef sonraya yöneliktir, gerçekleşmesi kesin değildir. Sebepte neden önceden vardır: "Yağmur yağdığı için ıslandık." (sebep). Pratik test: Cümleye "niçin, ne amaçla?" sorusu sorulur; cevap gelecekte gerçekleşecekse amaçtır.</p>`,
['Kitap almak için kırtasiyeye gitti.','Üşümesin diye üstünü örttü.'],
['Amaç-sonuç: için, -mak için, -mek üzere, diye, amacıyla.','Amaç geleceğe yönelik hedeftir; sebep önceden var olan nedendir.'],
'Amaç ve sebep cümleleri karışık verilsin; öğrenciler iki renkle ayırıp gerekçesini yazsın.');

K('sebep-sonuc','Sebep-Sonuç İlişkisi','Anlam bilgisi',
`<p>Bir yargının <b>hangi nedenle</b> gerçekleştiğini bildiren cümlelerdir. Sebep, sonuçtan önce gerçekleşmiştir. Ekler ve sözcükler: <b>çünkü, için (-dığı için), -den, -den dolayı, -dığından, bu yüzden, bu nedenle, bundan dolayı, -ınca, madem</b>.</p>
<p>"Hasta olduğu için okula gelmedi." "Yağmurdan maçı erteledik." "Çok çalıştı, bu yüzden başardı."</p>
<p>Metin yapısı olarak sebep-sonuç: Bir olayın nedenlerini ve sonuçlarını anlatan metinlerde kullanılır (bilgilendirici metinlerde sık görülür).</p>`,
['Geç kaldığı için otobüsü kaçırdı.','Ödevini yapmadığından üzgündü.'],
['Sebep-sonuç: çünkü, -dığı için, -den dolayı, bu yüzden, bu nedenle.','"Niçin?" sorusunun cevabı sebebi verir.'],
'Sebep-sonuç zinciri: Tahtaya bir olay yazın (ör. "Okulda elektrik kesildi"); her öğrenci bir sonuç ekleyip zinciri sürdürsün.');

K('gercek-hayal','Gerçek ve Hayal Ürünü Olaylar','Anlam bilgisi',
`<p><b>Gerçek (gerçekçi) olay:</b> Yaşanmış ya da yaşanabilir olaylardır: "Çocuklar bahçede top oynadı."</p>
<p><b>Hayal ürünü olay:</b> Gerçek hayatta olması mümkün olmayan, hayal gücüyle yaratılmış olaylardır: "Ağaçlar konuşmaya başladı." "Topsuz basketbol oynadılar ve top görünmeden sayı attılar."</p>
<p>Masal ve fabllar çoğunlukla hayal ürünüdür; hikâye ve romanlar gerçekçi ya da fantastik olabilir.</p>`,
['Kedi miyavlayarak kapıyı tırmaladı. (gerçek)','Kedi bana bir şarkı söyledi. (hayal)'],
['Gerçek: yaşanmış/yaşanabilir. Hayal ürünü: gerçekte olamaz.'],
'Gerçek ve hayal ürünü cümle kartlarını iki sütuna ayırma oyunu.');

K('oznel-nesnel','Öznel ve Nesnel Yargılar','Anlam bilgisi',
`<p><b>Nesnel yargı:</b> Kişiden kişiye değişmeyen, kanıtlanabilir, doğruluğu araştırılabilen yargılardır: "Türkiye'nin başkenti Ankara'dır." "Kitap 120 sayfadır."</p>
<p><b>Öznel yargı:</b> Kişisel görüş, duygu ve beğeni bildiren, kanıtlanamayan, kişiden kişiye değişebilen yargılardır: "Ankara çok güzel bir şehirdir." "Bu kitap çok sürükleyici."</p>
<p>İpuçları: "bence, bana göre, güzel, çirkin, sıkıcı, en iyi, harika" gibi değerlendirme sözcükleri öznelliği gösterir.</p>`,
['İstanbul Boğazı Karadeniz\'i Marmara\'ya bağlar. (nesnel)','İstanbul Boğazı dünyanın en güzel yeridir. (öznel)'],
['Nesnel: kanıtlanabilir, herkese göre aynı. Öznel: kişisel görüş, kanıtlanamaz.','İpucu: "bence, güzel, harika, sıkıcı" → öznel.'],
'Bir haber metni ile bir köşe yazısını karşılaştırıp öznel ve nesnel cümleleri iki renkle işaretletin.');

K('karsilastirma','Karşılaştırma','Anlam bilgisi / Okuma stratejisi',
`<p>İki ya da daha fazla varlık, olay ya da düşünce arasındaki <b>benzerlik ve farklılıkları</b> ortaya koymaya karşılaştırma denir.</p>
<p><b>Metin içi karşılaştırma:</b> Bir metindeki kişileri, olayları, durumları karşılaştırmak (ör. hikâyenin başındaki ve sonundaki kahraman). <b>Metinler arası karşılaştırma:</b> İki metni konu, tür, dil, ana fikir, kişiler gibi ölçütlerle karşılaştırmak.</p>
<p>Benzerlik ifadeleri: gibi, kadar, aynı, benzer şekilde, her ikisi de. Farklılık ifadeleri: oysa, ise, -e göre daha, -den farklı olarak, buna karşın.</p>
<p>Araç: <b>Venn şeması</b> ya da karşılaştırma tablosu.</p>`,
['Nasreddin Hoca da Dede Korkut da halkın bilge kişileridir; ancak Hoca güldürerek, Dede Korkut destan anlatarak öğüt verir.'],
['Karşılaştırma: benzerlik + farklılık. Araç: Venn şeması.','Ölçütler: konu, tür, kişiler, dil, ana fikir.'],
'Temadaki iki metni Venn şemasıyla karşılaştırıp şemadan bir karşılaştırma paragrafı yazdırın.');

K('metinler-arasi','Metinler Arası Karşılaştırma','Okuma stratejisi',
`<p>Aynı konuyu ya da temayı işleyen farklı metinler (şiir-hikâye, haber-köşe yazısı, film-kitap) belirli ölçütlere göre karşılaştırılır.</p>
<p>Ölçütler: <b>Tür</b> (şiir mi, öykü mü?), <b>konu ve ana fikir</b>, <b>anlatım biçimi</b> (öyküleme, betimleme, açıklama), <b>dil ve üslup</b> (sade mi, süslü mü?), <b>amaç</b> (bilgi vermek, duygulandırmak), <b>hedef kitle</b>.</p>`,
['"Dünya ve Zaman" şiiri ile "Zeynir ve Peytin": ikisinde de kişileştirme var; biri şiir, diğeri öykü.'],
['Metinler arası karşılaştırma ölçütleri: tür, konu, ana fikir, anlatım biçimi, dil, amaç, hedef kitle.'],
'Tema sonunda öğrenciler iki metni tablo hâlinde karşılaştırıp hangisini neden daha çok beğendiklerini yazsın.');

K('ana-fikir','Konu ve Ana Fikir (Ana Düşünce)','Anlam bilgisi',
`<p><b>Konu:</b> Metinde üzerinde durulan olay, durum ya da düşüncedir. "Metin neyi anlatıyor?" sorusunun cevabıdır; genellikle kısa bir söz öbeğidir: "Kitap okumanın önemi."</p>
<p><b>Ana fikir:</b> Yazarın okura vermek istediği temel mesajdır. "Yazar bize ne söylemek istiyor?" sorusunun cevabıdır; yargı bildiren bir cümledir: "Kitap okumak insanın ufkunu genişletir."</p>
<p><b>Yardımcı fikirler:</b> Ana fikri açıklayan, destekleyen düşüncelerdir.</p>
<p>Ana fikri bulma yolları: 1) Başlığa bak. 2) Giriş ve sonuç paragraflarını oku. 3) Metinde tekrarlanan anahtar sözcükleri bul. 4) Kanıt topla: Ana fikri destekleyen cümleleri işaretle.</p>`,
['Konu: Oyun oynamanın önemi. Ana fikir: Oyun çocuğun hem bedenini hem zihnini geliştirir.'],
['Konu → Ne anlatılıyor? (söz öbeği)','Ana fikir → Ne öğütleniyor/mesaj ne? (cümle)','Yardımcı fikir → Ana fikri destekleyen düşünceler.'],
'"Ana fikir avcısı": Paragraf kartları dağıtın; öğrenciler ana fikri tek cümleyle yazıp kanıt cümlesini altını çizerek göstersin.');

K('anahtar-kelime','Anahtar Kelime','Okuma stratejisi',
`<p>Metnin konusunu ve ana fikrini en iyi yansıtan, metinde sıkça tekrar edilen ya da önemli görevde bulunan sözcüklere <b>anahtar kelime</b> denir.</p>
<p>Anahtar kelimeler: metni özetlemeyi, not almayı, başlık bulmayı ve internette araştırma yapmayı kolaylaştırır.</p>
<p>Bulma yolu: Başlığa bak; metinde sık geçen isimleri işaretle; "Bu sözcük çıkarılırsa metnin konusu anlaşılır mı?" diye sor.</p>`,
['"Bir İp Bul, Oyuna Başla!" → anahtar kelimeler: ip, oyun, oyuncu'],
['Anahtar kelime: konuyu yansıtan, sık tekrar eden önemli sözcük. Özet, not ve araştırmada kullanılır.'],
'Her paragrafın kenarına bir anahtar kelime yazdırıp bunları birleştirerek özet çıkartın.');

K('ozet','Özetleme','Okuma / Yazma stratejisi',
`<p>Bir metnin ana fikrini ve önemli olaylarını/bilgilerini <b>kendi cümlelerimizle</b>, <b>kısa</b> ve <b>sırasıyla</b> anlatmaya özetleme denir.</p>
<p><b>Adımlar:</b> 1) Metni dikkatle oku. 2) Önemli ve önemsiz bilgileri/olayları ayır (önemsizler: ayrıntılar, betimlemeler, tekrarlar, örnekler). 3) Önemli olayları sırala. 4) Kendi cümlelerinle yaz. 5) Ana fikri sona ekle.</p>
<p>Öyküleyici metinde özet: Kim? Nerede? Ne zaman? Ne oldu? Nasıl sonuçlandı? Bilgilendirici metinde özet: Konu nedir? Önemli bilgiler nelerdir?</p>
<p>Özetleme ifadeleri: kısacası, sözün özü, özetle, sonuç olarak.</p>`,
['Uzun metin → "Ali festivale gitti, robotları ve uçakları gördü, bilime ilgisi arttı. Kısacası bilim ilham verir."'],
['Özet: önemli bilgiler, kendi cümlelerimizle, kısa ve sıralı.','Atılacaklar: ayrıntı, tekrar, betimleme, örnek.'],
'"Tweet özeti": Metni 280 karakteri geçmeyecek biçimde özetletin; en iyi özet panoya.');

K('cikarim','Çıkarım Yapma','Okuma stratejisi',
`<p>Metinde açıkça söylenmeyen bilgileri ipuçlarından ve ön bilgilerden yararlanarak anlamaya <b>çıkarım</b> denir.</p>
<p>Formül: <b>Metindeki ipucu + Benim bildiklerim = Çıkarım</b>. Örnek: "Kapıyı çarparak odasına girdi." + "İnsanlar kızınca kapıyı sert kapatır." = "Kızgındı."</p>
<p>Çıkarım soruları: "Kahraman neden böyle davrandı?", "Bu olaydan sonra ne hissetmiştir?", "Yazar bunu neden anlatmış olabilir?"</p>`,
['"Annem şemsiyesini alıp kapıya koştu." → Dışarıda yağmur yağıyor olabilir.'],
['Çıkarım: ipucu + ön bilgi = açıkça söylenmeyeni anlama.'],
'"Dedektif" etkinliği: Bir görsel ya da kısa metin verip öğrencilerden üç çıkarım ve dayandıkları ipuçlarını yazmalarını isteyin.');

K('tahmin','Tahmin Etme Stratejisi','Okuma stratejisi',
`<p>Okuma <b>öncesinde</b> başlık, görsel ve ön bilgilerden; okuma <b>sırasında</b> metindeki ipuçlarından metnin konusunu ve olayların gelişimini tahmin etmektir. Okuma <b>sonrasında</b> tahminler kontrol edilir: Doğru mu çıktı? Neden?</p>
<p>Tahmin, okumaya merak katar ve aktif okumayı sağlar. Yanlış tahmin "hata" değildir; düşünmenin göstergesidir.</p>
<p>Tablo: <b>Tahminim – Dayanağım – Gerçekleşen</b>.</p>`,
['Başlık "Oyun Durdu!" → Tahmin: Bir oyun yarıda kesilmiş olabilir. Dayanak: "durdu" sözcüğü.'],
['Tahmin: okuma öncesi (başlık, görsel), sırası (ipuçları), sonrası (kontrol).','Tablo: Tahminim – Dayanağım – Gerçekleşen.'],
'Metni bölümlere ayırarak okutun; her bölüm sonunda durup bir sonraki bölümü tahmin ettirin.');

K('on-bilgi','Ön Bilgileri Harekete Geçirme (BİÖ)','Okuma stratejisi',
`<p>Okumaya başlamadan önce konuyla ilgili bildiklerimizi hatırlamak, yeni bilgiyi anlamayı ve kalıcı kılmayı kolaylaştırır.</p>
<p><b>BİÖ tablosu:</b> <b>B</b>iliyorum (okumadan önce) – <b>İ</b>stiyorum (öğrenmek istediklerim) – <b>Ö</b>ğrendim (okuduktan sonra).</p>`,
['Konu: Atatürk Orman Çiftliği. B: Ankara\'da. İ: Ne zaman kuruldu? Ö: 1925\'te bataklık arazide kuruldu.'],
['BİÖ: Biliyorum – İstiyorum – Öğrendim.'],
'Her bilgilendirici metinden önce defterlere BİÖ tablosu çizdirin; derste son sütunu doldurtun.');

K('gorsellestirme','Görselleştirme (Zihinde Canlandırma)','Okuma stratejisi',
`<p>Okunan metni zihinde bir film gibi canlandırma, çizerek ya da şemayla gösterme stratejisidir. Özellikle betimlemelerde ve süreç anlatan metinlerde anlamayı kolaylaştırır.</p>
<p>Araçlar: resim çizme, zihin haritası, akış şeması, zaman çizelgesi, karikatür (çizgi roman) hâline getirme.</p>`,
['Doğa yürüyüşü metnini rota haritası olarak çizmek.'],
['Görselleştirme: metni zihinde canlandırma ve çizerek gösterme (şema, harita, karikatür).'],
'Öğrenciler metnin en etkileyici sahnesini dört karelik çizgi roman olarak çizsin.');

K('soru-sorma-stratejisi','Soru Sorma Stratejisi','Okuma stratejisi',
`<p>Okuma öncesinde, sırasında ve sonrasında metne sorular sorarak aktif okumayı sağlama stratejisidir.</p>
<p>Okuma öncesi: "Başlık ne anlatıyor olabilir?" Okuma sırası: "Bu kahraman neden böyle davrandı?" Okuma sonrası: "Yazar bize ne söylemek istedi?", "Ben olsaydım ne yapardım?"</p>
<p>Soru türleri: <b>Metinde açık cevaplı</b> (Kim? Nerede?), <b>düşün ve ara</b> (Neden?), <b>yazar ve ben</b> (çıkarım), <b>kendim</b> (kişisel görüş).</p>`,
['"Kara Fatma cepheye neden gitmek istedi?" (düşün ve ara)'],
['Soru sorma: okumadan önce, okurken, okuduktan sonra soru üret.','5N1K + "Ben olsaydım?"'],
'Öğrenciler metinden 5 soru üretsin (her türden birer tane); sorularını sıra arkadaşıyla değiştirip cevaplasın.');

K('5n1k','5N1K Soruları','Okuma / Yazma',
`<p><b>Ne? Nerede? Ne zaman? Nasıl? Neden? Kim?</b> soruları bir olayı eksiksiz anlatmanın ve anlamanın temelidir. Haber metinleri ve özetler 5N1K'ya cevap verir.</p>
<p>Konuşma ve yazma öncesi plan hazırlarken de kullanılır: Konuyu bu soruların cevaplarıyla genişletin.</p>`,
['Ne? Bilim şenliği. Nerede? Okul bahçesi. Ne zaman? 15 Mayıs. Kim? 6. sınıflar. Nasıl? Deney standlarıyla. Neden? Bilime ilgiyi artırmak için.'],
['5N1K: Ne? Nerede? Ne zaman? Nasıl? Neden? Kim?'],
'Okulda yaşanan bir olayı 5N1K tablosuyla haber metnine dönüştürün.');

K('not-alma','Not Alma','Dinleme / Okuma stratejisi',
`<p>Dinlerken ya da okurken önemli bilgileri <b>kısa ve öz</b> biçimde yazmaktır. Tam cümle yazılmaz; anahtar sözcükler, kısaltmalar, semboller (→, =, +, ?) kullanılır.</p>
<p><b>Cornell not alma yöntemi:</b> Sayfa üçe bölünür: sağ geniş bölüm – notlar; sol dar sütun – anahtar sözcükler/sorular; alt bölüm – özet.</p>
<p>Dinleme sırasında not almak dikkati yoğunlaştırır, sonradan hatırlamayı kolaylaştırır.</p>`,
['"Kaşgarlı Mahmut 1072-1074 arasında Divanü Lügati\'t-Türk\'ü yazdı" → K.Mahmut → DLT (1072-74)'],
['Not alma: anahtar sözcük, kısaltma, sembol; tam cümle değil.','Cornell: Notlar | Anahtar sözcükler | Özet.'],
'Dinleme/izleme metinlerinde Cornell şablonunu fotokopiyle dağıtın; dönem boyunca not dosyası oluşturun.');

K('katilimsiz-dinleme','Dinleme Türleri ve Etkili Dinleme','Dinleme',
`<p><b>Katılımlı dinleme:</b> Dinleyicinin soru sorarak, yorum yaparak konuşmaya katıldığı dinlemedir (sohbet, tartışma). <b>Katılımsız dinleme:</b> Dinleyicinin konuşmaya katılmadan, sessizce izlediği dinlemedir (konferans, haber, belgesel). <b>Eleştirel dinleme:</b> Dinlenenin doğruluğunu ve tutarlılığını sorgulama. <b>Not alarak dinleme</b>.</p>
<p>Etkili dinleyici: konuşmacıya bakar, sözünü kesmez, beden diliyle ilgisini gösterir, anlamadığını uygun zamanda sorar, önyargısız dinler.</p>`,
['Bir müzede rehberin anlattıklarını sessizce dinlemek → katılımsız dinleme'],
['Katılımlı dinleme: soru-yorumla katılım. Katılımsız: sessiz izleme. Eleştirel: sorgulayarak dinleme.','Etkili dinleyici: göz teması, sözü kesmez, not alır, empati kurar.'],
'Dinleme öncesinde "dinleme sözleşmesi" maddelerini tahtaya yazın; dinleme sonunda öz değerlendirme yaptırın.');

/* ================= SÖZ SANATLARI ================= */
K('benzetme','Benzetme (Teşbih)','Söz sanatları',
`<p>Aralarında ortak bir özellik bulunan iki varlıktan <b>zayıf olanı güçlü olana benzetmeye</b> benzetme denir.</p>
<p>Öğeleri: <b>Benzeyen</b> (özelliği zayıf olan), <b>Kendisine benzetilen</b> (özelliği güçlü olan), <b>Benzetme yönü</b> (ortak özellik), <b>Benzetme edatı</b> (gibi, kadar, sanki, -ca). "Ali aslan gibi güçlüdür." → benzeyen: Ali, kendisine benzetilen: aslan, yön: güçlü olmak, edat: gibi.</p>
<p>Her "gibi" benzetme değildir: "Senin gibi bir arkadaşım var." (karşılaştırma) Benzetmede iki farklı türden varlık olmalı ve benzetilen özellik onda güçlü olmalıdır.</p>`,
['Gözleri deniz gibi mavi.','Kar, pamuk gibi bembeyazdı.','Elif tilki gibi kurnaz.'],
['Benzetme: zayıf olanı güçlü olana benzetme.','Öğeler: benzeyen – kendisine benzetilen – benzetme yönü – benzetme edatı (gibi, kadar, sanki).'],
'"Benzetme fabrikası": Tahtaya beş varlık yazın; öğrenciler her biri için dört öğesi tam benzetmeler kursun ve öğeleri tabloya yerleştirsin.');

K('kisilestirme','Kişileştirme (Teşhis)','Söz sanatları',
`<p>İnsan dışındaki varlıklara (hayvan, bitki, eşya, kavram) <b>insana ait özellikler</b> (düşünme, duygulanma, davranış) vermeye kişileştirme denir.</p>
<p>"Rüzgâr ağaçların kulağına fısıldadı." "Güneş bize gülümsedi." "Dünya yorgun yorgun dönüyordu."</p>
<p>Kişileştirme anlatıma canlılık ve duygu katar; masal, fabl ve şiirde sıkça kullanılır. Kişileştirmenin olduğu yerde genellikle konuşturma da vardır.</p>`,
['Ay, gökyüzünde yalnızlığından ağlıyordu.','Kalemim bana küsmüş.'],
['Kişileştirme: insan dışı varlıklara insan özelliği verme → "Güneş gülümsedi."'],
'Sınıftaki bir eşyayı (tahta, sıra, silgi) kişileştirerek bir günlüğünü yazdırın.');

K('konusturma','Konuşturma (İntak)','Söz sanatları',
`<p>İnsan dışındaki varlıkları <b>konuşturmaya</b> konuşturma denir. Konuşturmanın olduğu her yerde kişileştirme de vardır; ama her kişileştirmede konuşturma yoktur.</p>
<p>"Korkuluk dedi ki: Benden korkmayın çocuklar." "Ağaç, 'Beni kesmeyin!' diye bağırdı."</p>
<p>Fabllar ve masallar konuşturma sanatıyla kurulur (La Fontaine fablları, Kelile ve Dimne).</p>`,
['Kuş: "Ne güzel bir sabah!" dedi.'],
['Konuşturma: insan dışı varlığı konuşturma. Konuşturma varsa kişileştirme de vardır.'],
'İki hayvanın tartışmasını konuşturma sanatıyla yazdırıp canlandırtın.');

K('abartma','Abartma (Mübalağa)','Söz sanatları',
`<p>Bir durumu, olayı ya da özelliği olduğundan <b>çok daha büyük ya da küçük</b> göstermeye abartma denir. Anlatımı etkili kılmak, dikkat çekmek, mizah yapmak için kullanılır.</p>
<p>"Gözlerinden sel gibi yaşlar aktı." "Bin kere söyledim!" "Açlıktan ölüyorum." "Dağlar kadar ödevim var."</p>`,
['Bu çanta bir ton ağırlığında!','Sesini duyunca yer yerinden oynadı.'],
['Abartma: bir durumu olduğundan çok büyük/küçük gösterme → "Bin kere söyledim."'],
'Günlük konuşmamızdaki abartmaları listeleyin; gerçek karşılıklarını yazdırın.');


/* ================= ŞİİR BİLGİSİ ================= */
K('siir-bicim','Şiirin Biçim Özellikleri','Şiir bilgisi',
`<p><b>Dize (mısra):</b> Şiirin her bir satırı. <b>Kıta/bent:</b> Şiiri oluşturan dize grupları; dört dizelik kıtaya <b>dörtlük</b>, iki dizeliğe <b>beyit</b> denir. <b>Ölçü:</b> Dizelerdeki hece sayısının eşitliği (hece ölçüsü: 7'li, 8'li, 11'li) – serbest şiirde ölçü yoktur. <b>Uyak (kafiye)</b> ve <b>redif</b>. <b>Durak:</b> Hece ölçülü dizede okurken verilen kısa duraklama (6+5=11 gibi).</p>
<p>Şiirin içerik özellikleri: konu, ana duygu (şiirde ana fikir yerine), imgeler, söz sanatları. Şiir düzyazıdan ahenk, yoğun anlatım ve imgeyle ayrılır.</p>`,
['"Korkma, sönmez bu şafaklarda yüzen al sancak" → dize; İstiklâl Marşı 10 kıta, ilk kıta 4 dize (dörtlük)'],
['Dize: şiirin satırı. Kıta/dörtlük: dize grupları. Ölçü: hece sayısı eşitliği. Uyak-redif: ses benzerlikleri.','Şiirde ana fikir yerine "ana duygu" sorulur.'],
'Bir şiiri öğrencilere "dize sayısı – kıta sayısı – hece sayısı – uyak düzeni" tablosuyla incelettirin.');

K('uyak','Uyak (Kafiye) ve Redif','Şiir bilgisi',
`<p><b>Redif:</b> Dize sonlarında yazılışları, okunuşları ve <b>görevleri aynı</b> olan ek, sözcük ya da sözcük gruplarıdır. <b>Uyak:</b> Rediflerden önce gelen, yazılışları aynı ama <b>anlamları/görevleri farklı</b> ses benzerlikleridir.</p>
<p>Bulma yöntemi: Dize sonlarından geriye doğru gidilir; aynı görevdeki ekler/sözcükler redif olarak ayrılır, kalan ses benzerliği uyaktır.</p>
<p>Örnek: "Bahçemizde güller açtı / Kuşlar ötüp uçtu, kaçtı" → "-tı" iki dizede de geçmiş zaman eki (aynı görev) → <b>redif</b>; ondan önceki "aç" – "kaç" ses benzerliği → <b>uyak</b>.</p>
<p>Uyak türleri: yarım uyak (tek ses), tam uyak (iki ses), zengin uyak (üç ve daha çok ses), cinaslı uyak (eş sesli sözcükler).</p>
<p>Uyak düzeni: düz (aaaa), çapraz (abab), sarma (abba), mani tipi (aaxa).</p>`,
['"Bağlarda yeşil yaprak / Ilık bir rüzgâr, toprak" → uyak: -ak (yarım/tam)'],
['Redif: aynı görevli ek/sözcük. Uyak: redifin önündeki ses benzerliği.','Uyak düzenleri: düz (aaaa), çapraz (abab), sarma (abba), mani (aaxa).'],
'Öğrenciler sevdikleri bir şarkı ya da şiirin bir kıtasında uyak ve redifi renkli kalemlerle işaretlesin.');

K('istiklal-marsi','İstiklâl Marşı','Millî kültür',
`<p>İstiklâl Marşı, <b>Mehmet Âkif Ersoy</b> tarafından yazılmış, <b>12 Mart 1921</b>'de TBMM'de millî marş olarak kabul edilmiştir. 10 kıtadan oluşur; ilk iki kıtası törenlerde okunur. Bestesi Osman Zeki Üngör'e aittir (1930).</p>
<p>Mehmet Âkif, yarışmaya para ödülü olduğu için önce katılmak istememiş; ödül şartı kaldırılınca şiirini göndermiş, kazandığı ödülü de Darülmesai'ye (kadın ve çocuklara iş öğreten kurum) bağışlamıştır.</p>
<p>Marşta işlenen duygular: bağımsızlık, vatan ve bayrak sevgisi, inanç, şehitlik, millî birlik, geleceğe güven. "Hilal" ve "al sancak" bayrağı simgeler.</p>
<p>Okunurken: Ayakta, hazırola geçerek, saygıyla; vurgulara ve duraklara dikkat ederek okunur.</p>`,
['"Korkma, sönmez bu şafaklarda yüzen al sancak; / Sönmeden yurdumun üstünde tüten en son ocak."'],
['İstiklâl Marşı: Mehmet Âkif Ersoy; kabul 12 Mart 1921; 10 kıta; beste Osman Zeki Üngör.','Her yıl 12 Mart İstiklâl Marşı\'nın Kabulü ve Mehmet Âkif Ersoy\'u Anma Günü.'],
'İlk iki kıtayı anlamlarıyla (sönmez, şafak, al sancak, ocak, millet) açıklatıp doğru vurgu-tonlamayla koro okuması yapın.');

K('tekalif','Tekâlif-i Milliye Emirleri','Millî kültür',
`<p><b>Tekâlif-i Milliye</b> ("millî yükümlülükler") emirleri, Sakarya Meydan Muharebesi öncesinde, <b>7-8 Ağustos 1921</b>'de Başkomutan Mustafa Kemal Paşa tarafından ordunun ihtiyaçlarını karşılamak için yayımlanmıştır.</p>
<p>Halktan istenenler: Her evden bir kat çamaşır, çorap ve çarık; elindeki yiyecek, giyecek ve araçların %40'ı; tüccarlardaki kumaş, deri gibi malların %40'ı; araba sahiplerinin ayda bir kez 100 km mesafeye cephane taşıması; silah ve cephanenin teslimi.</p>
<p>Halk elindekini paylaşarak bağımsızlık mücadelesine katılmış; bu dayanışma Sakarya Zaferi'nin kazanılmasında büyük rol oynamıştır.</p>`,
['"Cepheye Koşan At" metninde Ahmet atını Tekâlif-i Milliye gereği orduya verir.'],
['Tekâlif-i Milliye: 7-8 Ağustos 1921; Sakarya Savaşı öncesi; halktan ordu için yiyecek, giyecek, hayvan ve araç istenmesi.'],
'"Ben o günlerde yaşasaydım orduya ne verirdim?" konulu kısa yazı yazdırın.');

K('ogretici-edebi','Öğretici (Bilgilendirici) ve Edebî (Yazınsal) Metin','Metin türleri',
`<p><b>Öğretici metin:</b> Bilgi vermeyi, açıklamayı amaçlar; dil göndergesel (açık, anlaşılır, tek anlamlı); nesnel anlatım ağırlıklıdır. Türleri: makale, haber, deneme, gezi yazısı, anı, biyografi, söyleşi, röportaj, mektup, günlük, sözlük maddesi, ansiklopedi yazısı.</p>
<p><b>Edebî (sanatsal) metin:</b> Duygu, düşünce ve hayalleri estetik biçimde anlatır; dil sanatsal, çok anlamlı, imgeli; söz sanatları kullanılır; kurmacadır. Türleri: şiir, hikâye (öykü), roman, masal, fabl, tiyatro.</p>`,
['"Biyomimetik doğadan esinlenen bilim dalıdır." (öğretici)','"Rüzgâr dalları sallarken ağaçlar şarkı söylüyordu." (edebî)'],
['Öğretici: bilgi verir, açık ve nesnel dil → haber, makale, anı, gezi yazısı.','Edebî: duygu ve hayal, sanatlı dil, kurmaca → şiir, öykü, masal, roman.'],
'Aynı konuyu (ör. yağmur) bir öğretici, bir edebî paragrafla anlatmalarını isteyin; farkları tartışın.');
})();
