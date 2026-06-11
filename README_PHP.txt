ALCOPOINT PHP + MySQL QURULUMU

1) Hostinqdə yeni MySQL bazası yaradın.
2) schema.sql faylını phpMyAdmin -> Import bölməsindən bazaya import edin.
3) config.php faylında DB_HOST, DB_NAME, DB_USER, DB_PASS məlumatlarını öz hostinqinizə görə dəyişin.
4) Bütün Sayt qovluğunu public_html və ya sayt kök qovluğuna yükləyin.
5) Sayt: index.html
   Admin panel: admin.html
   İlkin giriş: admin / 006296

QEYD:
- Məlumatlar artıq brauzerin localStorage yaddaşında deyil, MySQL-də saxlanır.
- Məhsullar, filiallar, qalereya, admin istifadəçiləri və ayarlar admin paneldən dəyişəndə api.php vasitəsilə bazaya yazılır.
- Şəkil/video yüklənəndə hazırda data URL kimi bazada saxlanır. Böyük videolar üçün hostinqin max_allowed_packet və upload limitini artırmaq lazım ola bilər.


VIDEO UPLOAD QEYDI:
Video yuklenmirse cPanel -> Select PHP Version / MultiPHP INI Editor bolmesinde bunlari artirin:
- upload_max_filesize = 200M
- post_max_size = 220M
- max_execution_time = 300
Sonra public_html/Sayt/uploads qovlugunun permission deyerini 755 edin. Bezen hostingde 775 lazim olur.

ROLLAR:
- admin: butun bolmeler, istifadeci elave/silme
- moderator: mehsul, filial, qalereya ve ayarlar; istifadeciler bolmesi gizlidir

FULL MODERN VERSIYA ƏLAVƏLƏRİ
- Modern hover animasiyalar, premium gradientlər və glass effektlər əlavə edildi.
- Ana səhifədə "Mənə ən yaxın filial" düyməsi əlavə edildi.
- Filiallar bölməsində istifadəçi lokasiyasına görə məsafə hesablanır və ən yaxın filial birinci göstərilir.
- Admin paneldə filial üçün Latitude və Longitude sahələri əlavə edildi. Dəqiq sıralama üçün hər filialın koordinatını Google Maps-dən götürüb yazın.
- Sayt HTTPS üzərində işləməlidir; brauzerlər geolocation icazəsini əsasən HTTPS-də verir.


KARYERA MODULU:
- cPanel phpMyAdmin-da schema.sql faylını yenidən import edin və ya yalnız careers cədvəlini yaradın.
- Admin paneldə İstifadəçilər bölməsindən rol olaraq "Karyera" seçilə bilər.
- Karyera rolu yalnız Karyera səhifəsində başlıq, məlumat, şəkil və müraciət linki əlavə/redaktə edə bilər.
- Saytda Karyera bölməsi avtomatik görünür.


Yenilənmiş əlaqə məlumatları:
- Mərkəzi Ofis: Aşıq Molla Cümə küçəsi, 1/5
- Mərkəzi Ofis iş saatı: 09:00 - 18:00
- Mağazalar: 09:00 - 01:00
Bu məlumatlar Admin panel > Ayarlar bölməsindən dəyişdirilə bilər.


XƏRİTƏ QEYDİ:
- Filialların xəritədə nöqtə kimi görünməsi üçün admin paneldə hər filialın Latitude və Longitude dəyərləri dolu olmalıdır.
- Sayt Leaflet + OpenStreetMap istifadə edir, yəni Google Maps API açarı tələb olunmur.
- "Xəritədə aç" linkləri Google Maps-də ayrıca açılır.


Wolt linki:
Admin panel -> Ayarlar bölməsində Wolt linkini dəyişə bilərsiniz. Sağ aşağıdakı Wolt düyməsi mobil və desktop üçün optimizasiya olunub.

Wolt floating button:
- Sağ aşağıda lokal assets/wolt-icon.svg ikon faylı ilə görünür.
- Link admin paneldə Ayarlar -> Wolt linki hissəsindən dəyişilir.
