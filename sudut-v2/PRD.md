# Product Requirements Document (PRD)
## Game Pendidikan: Serangan Alien (Prediksi Sudut)

### 1. Tinjauan Produk (Product Overview)
"Serangan Alien" adalah sebuah game edukasi interaktif berbasis web yang dirancang khusus untuk melatih kemampuan spasial dan pemahaman geometri pemain dalam memprediksi dan memvisualisasikan besar sudut (0° hingga 180°). Pemain bertugas mengarahkan meriam (*cannon*) ke arah sudut tertentu di mana sebuah alien bersembunyi, lalu menembaknya.

### 2. Tujuan (Objectives)
*   **Edukasi**: Membantu pengguna (khususnya pelajar) untuk mengukur dan memvisualisasikan besar sudut tanpa bantuan busur derajat maupun angka panduan.
*   **Engagemen**: Menyajikan proses belajar matematika/geometri melalui pengalaman interaktif yang menantang dan menyenangkan (gamifikasi).

### 3. Target Pengguna (Target Audience)
*   Pelajar sekolah dasar hingga menengah pertama yang sedang mempelajari konsep sudut dan derajat.
*   Pendidik atau guru matematika yang membutuhkan alat peraga visual yang interaktif.
*   Siapa saja yang ingin menguji dan melatih insting tata ruang/geometri mereka.

### 4. Mekanika Inti & Gameplay (Core Mechanics)
*   **Sistem Koordinat Sudut**: Menggunakan sistem setengah lingkaran (semicircle). Sudut `0°` berada sejajar di kanan (posisi arah jam 3), `90°` tepat di atas (posisi arah jam 12), dan `180°` di kiri (posisi arah jam 9). Rotasi sudut diukur berlawanan arah jarum jam (*counter-clockwise*).
*   **Blind Prediction (Prediksi Buta)**: Pemain hanya diberikan instruksi berupa teks lokasi alien (contoh: "Target: 45°"). Posisi visual alien di layar sepenuhnya disembunyikan.
*   **Kontrol Meriam**: Pemain menggunakan sebuah *slider* untuk mengubah arah moncong meriam. *Slider* ini murni bersifat visual dan **tidak menampilkan angka derajat** (baik pada batang maupun *tooltip*), sehingga memaksa pemain menebak dan mengandalkan insting mereka.
*   **Tembakan & Validasi**:
    *   Saat pemain mengonfirmasi tembakan, meriam akan menembakkan laser, dan alien akan menampakkan wujudnya di sudut target yang sebenarnya.
    *   **Toleransi (*Tolerance*)**: Terdapat *margin error* sebesar ±5° untuk mengakomodasi ketidaksempurnaan kontrol manual. Jika prediksi pemain melenceng maksimal 5° dari target, tembakan tetap dianggap sukses (*Hit*).

### 5. Fitur Utama (Key Features)
*   **Generasi Target Acak**: Sudut target dihasilkan secara acak di setiap ronde (berkisar antara 10° hingga 170° untuk mencegah bug visual menempel ke batas bawah layar).
*   **Sistem Umpan Balik (*Feedback System*)**:
    *   **Kena (*Hit*)**: Teks umpan balik berwarna hijau, alien akan meledak dengan efek animasi (💥), dan pemain mendapatkan tambahan 10 poin skor.
    *   **Meleset (*Miss*)**: Teks umpan balik berwarna merah, menampilkan evaluasi angka prediksi pemain versus sudut target asli. Gambar alien yang tidak tertembak akan berubah wujud menjadi ekspresi mengejek (😜).
*   **Dukungan Kontrol Keyboard**:
    *   **Panah Kiri / Kanan**: Digunakan untuk mengatur rotasi/menggeser *slider* meriam selangkah demi selangkah agar lebih akurat dan presisi.
    *   **Spasi / Enter**: Menekan *trigger* untuk menembakkan laser.
*   **Transisi Ronde Otomatis**: Setelah evaluasi tembakan diperlihatkan, game akan menunggu selama 3.5 detik agar pemain dapat mengevaluasi tembakannya, sebelum layar di-reset dan beralih ke ronde selanjutnya secara otomatis.
*   **Legend Visual**: Terdapat penanda statis berupa teks `0°` di sebelah kanan radar dan `180°` di kiri sebagai panduan orientasi dasar bagi pemain.

### 6. Antarmuka Pengguna (User Interface)
*   **Tema Estetika**: Mengusung desain *Dark Space* (ruang angkasa gelap) yang modern dan elegan, dilengkapi efek *glassmorphism* (panel semi-transparan dengan efek *blur* latar belakang).
*   **Skema Warna**: Warna primer *dark navy* berpadu dengan aksen warna neon (Cyan/Teal untuk status siaga, Merah untuk luput, dan Hijau untuk berhasil).
*   **Tata Letak (Layout) Padat (*Compact*)**: Dirancang dan diukur agar permainan pas memuat satu area layar penuh (dimensi radar 500x250 piksel), menghindari pemain harus melakukan aktivitas *scrolling* atas/bawah.

### 7. Kebutuhan Teknis (Technical Requirements)
*   **Teknologi Dasar**: Dibangun murni menggunakan HTML5, CSS3, dan Vanilla JavaScript.
*   **Arsitektur Standalone**: Implementasi *Single-File Application* (`index.html`). Tidak ada kebergantungan pada dependensi, *library*, *asset* gambar (*pure* menggunakan emoji dan grafis CSS), maupun kerangka kerja (*framework*) pihak ketiga.
*   **Kompatibilitas Lintas Platform**: Dapat dijalankan dengan responsif dan mulus di peramban web modern apa pun (Chrome, Firefox, Safari, Edge).

### 8. Alur Pengguna (User Flow)
1.  Pemain membuka (*load*) halaman game di *browser*.
2.  Layar radar menampilkan pesan "Target: X°". Meriam berada di tengah layar.
3.  Pemain memperkirakan letak sudut X°, lalu menyesuaikan *slider* (atau panah keyboard) untuk memutar arah moncong meriam.
4.  Pemain mengklik tombol "Tembak" (atau menekan tombol *Spasi/Enter*).
5.  Animasi laser menembak searah bidikan. Alien mendadak muncul di koordinat asli X°.
6.  Sistem mengkalkulasi selisih sudut. Animasi ledakan atau perubahan wujud alien dijalankan berdasarkan hasil bidikan.
7.  Sistem memberikan pembaruan skor beserta keterangan derajat dari tembakan.
8.  Setelah jeda otomatis (3.5 detik), ronde baru dikalkulasi dan siklus berulang dari langkah ke-2.
