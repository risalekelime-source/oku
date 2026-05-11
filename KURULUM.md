# OkuTakip — Kurulum Kılavuzu

## 📋 Gereksinimler
- Supabase hesabı (ücretsiz plan yeterli)
- Web sunucusu (GitHub Pages, Netlify, Vercel vb.)

---

## 🗄️ 1. Supabase Kurulumu

### Adım 1: Proje Oluşturun
1. https://supabase.com adresine gidin
2. "New Project" ile proje oluşturun
3. Proje adı, şifre ve bölge seçin (tercihen EU West)

### Adım 2: Veritabanını Kurun
1. Supabase Dashboard'a gidin
2. Sol menüden **SQL Editor** seçin
3. `supabase_setup.sql` dosyasının tüm içeriğini kopyalayın ve çalıştırın

### Adım 3: Bağlantı Bilgilerini Alın
1. **Settings → API** menüsüne gidin
2. **Project URL** değerini kopyalayın (örn: `https://abcdef.supabase.co`)
3. **anon/public** key değerini kopyalayın

---

## 👤 2. İlk Admin Kullanıcısını Oluşturun

1. Supabase Dashboard → **Authentication → Users** menüsüne gidin
2. **Invite User** veya **Add User** ile ilk kullanıcıyı ekleyin
3. Kullanıcı oluştuktan sonra **SQL Editor'de** şu komutu çalıştırın:

```sql
UPDATE public.profiles 
SET role = 'admin', full_name = 'Ad Soyad'
WHERE id = 'kullanici-uuid-buraya';
```

---

## 🌐 3. Uygulamayı Yayına Alın

### GitHub Pages (Ücretsiz)
1. GitHub'da yeni repo oluşturun
2. `index.html`, `manifest.json`, `sw.js` dosyalarını yükleyin
3. **Settings → Pages → Deploy from branch** seçin
4. Uygulamanız `https://kullanici.github.io/repo-adi` adresinde yayına girer

### Netlify (Ücretsiz)
1. https://netlify.com → "Add new site → Deploy manually"
2. 3 dosyayı sürükleyip bırakın
3. Anında yayına girer

### Vercel (Ücretsiz)
```bash
npm i -g vercel
vercel deploy
```

---

## 📱 4. Ana Ekrana Ekleme

### Android (Chrome)
1. Uygulamayı Chrome'da açın
2. Sağ üst menü (⋮) → **"Ana ekrana ekle"**
3. Uygulama adını onaylayın

### iPhone/iPad (Safari)
1. Uygulamayı Safari'de açın
2. Alt menüden **Paylaş** simgesine (□↑) dokunun
3. **"Ana Ekrana Ekle"** seçeneğine dokunun

---

## 🔧 5. İlk Kullanım Adımları

1. Uygulamayı açın → Supabase URL ve Key girin
2. Admin hesabıyla giriş yapın
3. **Ayarlar → Kitap/Grup Oluştur** ile kitap ve grup ekleyin
4. **Ayarlar → Yeni Kullanıcı Ekle** ile okuyucuları ekleyin  
   *(Not: Supabase'in admin API'si Service Role Key gerektirir; alternatif olarak Dashboard'dan ekleyin)*
5. **Ayarlar → Gruba Üye Ekle** ile kullanıcıları gruba atayın

---

## 🔑 6. Kullanıcı Ekleme (Alternatif Yöntem)

Eğer uygulama üzerinden kullanıcı oluşturamıyorsanız:

1. Supabase Dashboard → **Authentication → Users → Invite User**
2. E-posta ile davet gönderin
3. Kullanıcı şifresini ayarlar, profili otomatik oluşur
4. Sonra SQL ile gruba ekleyin:

```sql
-- Kullanıcı ID'sini bul
SELECT id, email FROM auth.users WHERE email = 'kullanici@email.com';

-- Gruba ekle
INSERT INTO public.group_members (group_id, user_id) 
VALUES ('grup-uuid', 'kullanici-uuid');
```

---

## 📊 Özellikler

| Özellik | Durum |
|---|---|
| E-posta/şifre girişi | ✅ |
| Günlük okuma kaydı | ✅ |
| Telafi okuma takibi | ✅ |
| Gecikme/ilerleme göstergesi | ✅ |
| Grup üyesi ilerlemesi | ✅ |
| Haftalık rapor & sıralama | ✅ |
| Bildirim hatırlatıcısı | ✅ |
| PWA (Ana ekrana ekleme) | ✅ |
| Admin panel | ✅ |
| Çevrimdışı destek (temel) | ✅ |

---

## 🛠️ Sorun Giderme

**"Row Level Security" hatası**: SQL dosyasındaki politikaların doğru çalıştığını kontrol edin.

**Kullanıcı profili oluşmuyor**: `handle_new_user` trigger'ının aktif olduğunu kontrol edin.

**Bildirimler çalışmıyor**: HTTPS bağlantısı ve tarayıcı izni gereklidir. `localhost` üzerinde de çalışır.
