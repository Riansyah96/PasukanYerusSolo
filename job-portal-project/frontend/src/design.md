# Design System — PasukanYerusSolo

## 1. Brand Identity

### Nama
**PasukanYerusSolo** — Portal lowongan kerja berbasis Solo Raya.

### Font
- **Primary:** Plus Jakarta Sans (sans-serif)
- **Weight digunakan:** 700 (bold), 800 (extrabold), 900 (black)
- **Fallback:** `sans-serif`

### Palet Warna

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| `bg-primary` | `#0c0a09` | `#f5f5f4` (stone-50) | Body & section background |
| `bg-card` | `#120b06` | `#ffffff` | Card, FAQ accordion, dll |
| `bg-elevated` | `#171717` (neutral-900) | `#e5e5e5` (neutral-200) | Social media icons, input fields |
| `text-primary` | `#fef3c7` (amber-50) | `#1c1917` (stone-900) | Heading utama |
| `text-secondary` | `#a8a29e` (stone-400) | `#57534e` (stone-600) | Paragraf & deskripsi |
| `text-muted` | `#78716c` (stone-500) | `#a3a3a3` (neutral-400) | Footer, copyright |
| `accent-start` | `#ea580c` (orange-600) | → | Start gradient |
| `accent-end` | `#f59e0b` (amber-500) | → | End gradient |
| `accent-solid` | `#ea580c` | → | Hover, active indicator |
| `danger` | `#ef4444` (red-500) | → | Tombol logout |
| `success` | `#4ade80` (green-400) | → | Subscribe success |
| `border` | `rgba(38,38,38,0.5)` | `rgba(229,229,229,0.5)` | Border global |

### Glassmorphism
- **Background:** `rgba(12, 10, 9, 0.85)` (dark) / `rgba(245, 245, 244, 0.85)` (light)
- **Backdrop filter:** `blur(16px)`
- **Border:** `1px solid` dengan opacity 0.5 sesuai tema
- **Box shadow:** Dark `0 8px 32px rgba(0,0,0,0.4)`, Light `0 8px 32px rgba(0,0,0,0.1)`

---

## 2. Layout & Responsive Breakpoints

### Breakpoints
| Device | Width |
|---|---|
| Mobile | `< 768px` |
| Desktop | `>= 768px` |

### Container Max-Width
- **Konten umum:** `1200px`, `margin: 0 auto`
- **Testimonial:** `650px`
- **Job list:** `1200px`
- **FAQ accordion:** `700px`
- **Job services grid:** `1100px`

### Page Structure (Landing — `/`)
```
Walkthrough / Onboarding (full viewport, slide by slide)
  ├── Slide 1: Buat Akun Gratis
  ├── Slide 2: Cari Lowongan Ideal
  ├── Slide 3: Lamar Sekali Klik
  └── Slide 4: Dapatkan Pekerjaan → Tombol "Mulai Sekarang" navigasi ke /beranda
```

### Page Structure (Beranda — `/beranda`)
```
Hero (100vh)
  ↓
JobServices (6 kategori cards)
  ↓
Job Listings (6 lowongan)
  ↓
Testimonials (carousel)
  ↓
FAQ (accordion)
  ↓
CTA (daftar)
```

---

## 3. Components

### 3.1 Navbar
**Position:** `fixed`
- Desktop: `top: 16px`, centered `left: 50%; transform: translateX(-50%)`
- Mobile: `bottom: 16px`, centered `left: 50%; transform: translateX(-50%)`

**Shape:** Pill (`borderRadius: 60px`), `overflow: hidden`

**Desktop order:** `⚡[icon] PasukanYerusSolo | 🏠 Beranda | 💼 Lowongan | ☀️/🌙 toggle | Login / Keluar`
**Mobile order:** `☀️/🌙 toggle | 🏠 | 💼 | Login / 🔑👤📋⚙️`

**Spacing (mobile):**
- Nav padding: `6px 8px`
- Gap antar item: `4px`
- Theme/account button: `36px`, font `17px`
- Menu item padding: `8px 12px`, icon font `16px`
- Login button padding: `7px 14px`, font `12px`

**Active indicator:** `position: absolute; inset: 0; borderRadius: 40px; background: linear-gradient(135deg, #ea580c, #f59e0b); zIndex: 0`

**Mobile authenticated user:** Menampilkan icon role-based (👤 Pelamar, 📋 Perusahaan, ⚙️ Admin) yang navigasi ke halaman terkait.

### 3.2 Footer
**Layout:** Grid 4 kolom (`2fr 1fr 1fr 1.5fr`)

| Kolom | Konten |
|---|---|
| 1 (2fr) | Logo, deskripsi, 4 social media buttons |
| 2 (1fr) | Navigasi (5 link: Beranda, Cari Lowongan, Pasang Lowongan, Tentang Kami, Kontak) |
| 3 (1fr) | Layanan (5 link: Bantuan, Kebijakan Privasi, Syarat & Ketentuan, FAQ, Karier) |
| 4 (1.5fr) | Newsletter form + Kontak (alamat, email, telp) |

**Responsive:** `>968px` 4 kolom → `≤968px` 2 kolom → `≤540px` 1 kolom.

**Top bar:** `height: 4px`, animasi `gradientMove` (background-position 0%→100%→0%) durasi 3s, warna `#ea580c → #f59e0b → #ea580c`.

**Social buttons:** `38px` rounded (`borderRadius: 12px`), hover → gradient oranye + `translateY(-4px)`.

**Newsletter:** Input + button dalam wrapper `borderRadius: 12px`. Border berubah ke `#ea580c` saat hover.

### 3.3 Hero
- **minHeight:** `100vh`
- **Padding:** `120px 20px 60px`
- **Alignment:** Flex center (vertical + horizontal)

**Carousel (Background):**
- 5 gambar Unsplash (workspace)
- Interval: 5 detik
- Transition: `opacity 1.5s ease`
- Dark overlay di atas gambar
- Dot navigator: `borderRadius: 4px` (pill), active `width: 24px` warna `#ea580c`, inactive `width: 8px`

**Typography:**
- Heading: `clamp(2.5rem, 8vw, 5rem)`, weight `900`
- Subtitle badge: `13px`, `uppercase`, `letterSpacing: 2px`, weight `800`, background `rgba(234,88,12,0.1)`
- Description: `clamp(16px, 2vw, 18px)`
- **Gradient text:** `background: linear-gradient(135deg, #ea580c, #f59e0b); backgroundClip: text; color: transparent`

**Buttons:**
- **Primary:** gradient `#ea580c → #f59e0b`, `borderRadius: 12px`, padding `16px 36px`, weight `800`, shadow `0 4px 20px rgba(234,88,12,0.3)`. Hover: `translateY(-3px)` + shadow diperkuat.
- **Secondary:** `background: transparent`, `border: 2px solid` warna sesuai tema, weight `700`. Hover: background `#ea580c`, color `#fff`.

**Statistik (3 angka):** Font `clamp(22px, 4vw, 28px)`, weight `900`, color `#ea580c`. Dipisah `borderTop`.

### 3.4 HowItWorks
- **Section padding:** `100px 20px`
- **Background:** Dark `#080402` / Light `#f5f5f4`
- **Grid:** `flexWrap`, gap `24px`, tiap card `flex: 1 1 calc(25% - 24px)` dengan `min-width: 220px`, `max-width: 280px`
- **Card:** `borderRadius: 24px`, padding `36px 24px`, background dark `#120b06` / light `#ffffff`, border `1px solid`. Hover: `translateY(-8px)`, border `#ea580c`, muncul `boxShadow`
- **Icon:** Emoji `clamp(32px, 5vw, 42px)`, `display: block`
- **Step tag:** `11px` uppercase, weight `700`, `letterSpacing: 1.5px`, background `rgba(234,88,12,0.1)`, padding `4px 12px`, `borderRadius: 20px`
- **Button:** Sama dengan Hero primary button

### 3.5 JobServices
- **Section padding:** `100px 20px`
- **Background:** Dark `#080402` / Light `#f5f5f4`
- **Grid:** `repeat(auto-fit, minmax(300px, 1fr))`, gap `24px`, max-width `1100px`
- **Card:** `borderRadius: 20px`, background dark `#120b06` / light `#ffffff`, border `1px solid`, `overflow: hidden`. Hover: `translateY(-6px)`, border `#ea580c`, boxShadow
- **Image:** Height `180px`, `objectFit: cover`, overlay gradient hitam bottom. Hover: `scale(1.08)` durasi `0.5s`
- **Category dot:** Pojok kiri bawah gambar, warna sesuai kategori (`#3b82f6` IT, `#8b5cf6` Kreatif, dst)
- **Card body:** Padding `20px 24px 24px`. Title `clamp(16px, 3vw, 18px)` weight `800`. Description `clamp(13px, 3vw, 14px)`, line-height `1.6`. Link "Lihat Lowongan →" color `#ea580c`

### 3.6 Testimonials
- **Section padding:** `100px 20px`, borderTop pemisah
- **Container:** `maxWidth: 650px`
- **Navigation:** 2 arrow buttons (← →) `borderRadius: 50%`, `40px`. Hover: background `#ea580c`, color `#fff`
- **Dot indicators:** 3 dot, `8px` bulat. Active `#ea580c`, inactive dark `#262626` / light `#d4d4d4`
- **Card:** `borderRadius: 24px`, padding `clamp(30px, 5vw, 40px)`, text center
- **Avatar:** `64px` bulat, gradient `#ea580c → #f59e0b`, boxShadow
- **Rating:** Stars color `#f59e0b`
- **Nama:** weight `800`, color `#ea580c`. Role/company: abu-abu

### 3.7 FAQ
- **Section padding:** `100px 20px`, background konsisten
- **Accordion container:** `maxWidth: 700px`
- **Item:** `borderRadius: 16px`, border `1px solid`, background dark `#120b06` / light `#ffffff`, marginBottom `12px`, `overflow: hidden`
- **Header:** padding `20px 24px`, font `clamp(14px, 3vw, 16px)` weight `700`, `display: flex; justifyContent: space-between`. Hover: color `#ea580c`
- **Icon (+):** `20px`, color `#ea580c`. Saat open: `rotate(45deg)` menjadi ×, `transition 0.3s ease`
- **Answer panel:** `maxHeight: 0 → 300px`, `transition 0.4s ease`. Padding `0 24px` → `0 24px 20px`. Text `14px`, line-height `1.7`

### 3.8 CTA
- **Section padding:** `80px 20px`, text center, borderTop
- **Background glow:** Elemen `radial-gradient(rgba(234,88,12,0.05))` dengan animasi `pulse` (scale 1↔1.1, opacity 0.5↔0.8) durasi 8s
- **Heading:** `clamp(1.8rem, 5vw, 2.5rem)` weight `800`
- **Description:** `clamp(14px, 4vw, 16px)`
- **Button:** Gradient `#ea580c → #f59e0b`, padding `clamp(12px,4vw,14px) clamp(30px,8vw,40px)`, `borderRadius: 12px`, weight `800`. Hover: `translateY(-3px)`. Touch: `scale(0.98)`

---

## 4. Animations

### 4.1 ScrollReveal (IntersectionObserver)
Komponen pembungkus yang memicu animasi saat elemen masuk viewport (`threshold: 0.1`, `rootMargin: 0px 0px -40px 0px`).

| Animation | Start | End | Duration | Easing |
|---|---|---|---|---|
| `fadeUp` | opacity 0, translateY(40px) | opacity 1, translateY(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `fadeIn` | opacity 0 | opacity 1 | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `slideLeft` | opacity 0, translateX(-60px) | opacity 1, translateX(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `slideRight` | opacity 0, translateX(60px) | opacity 1, translateX(0) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `scaleIn` | opacity 0, scale(0.9) | opacity 1, scale(1) | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Applied di HomePage:**
- Hero → (default, no ScrollReveal)
- HowItWorks → `slideLeft`, delay 100ms
- JobServices → `slideRight`, delay 150ms
- Job list section → `fadeUp`, delay 100ms (inner elements: `fadeIn` 200ms, `fadeUp` 300ms, `scaleIn` 400ms)
- Testimonials → `slideLeft`, delay 200ms
- FAQ → `slideRight`, delay 250ms
- CTA → `scaleIn`, delay 200ms

### 4.2 PageTransition (Route Change)
- **Trigger:** Setiap `pathname` berubah (useLocation)
- **Animation:** `pageEnter` — `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)`
- **Duration:** 0.35s, `ease-out`
- **Inject:** Keyframes di-inject ke `<head>` via `document.createElement('style')` saat mount (sekali)
- **Performance:** `willChange: opacity, transform`

### 4.3 Navbar Mobile Dropdown (sebelum dihapus)
- `fadeUp`: opacity 0→1, translateY(10px)→0, 0.2s ease

### 4.4 CTA Background
- `pulse`: scale(1)→(1.1), opacity(0.5)→(0.8), 8s ease-in-out infinite

### 4.5 Footer Gradient Bar
- `gradientMove`: background-position 0%→100%→0%, 3s ease infinite

---

## 5. Theme System (Dark/Light)

### Context: `ThemeContext` (`frontend/src/context/ThemeContext.js`)
- **Default:** `'dark'`
- **Persist:** `localStorage.getItem('theme')`
- **Toggle:** `setTheme(prev => prev === 'dark' ? 'light' : 'dark')`
- **Body styling:** `document.body.style.backgroundColor` dan `color` diubah via `useEffect`
- **Dark body:** `background: #0c0a09`, `color: #fff`
- **Light body:** `background: #f5f5f4`, `color: #1c1917`
- **Pattern di komponen:** `const isDark = theme === 'dark';` lalu gunakan `isDark` untuk conditional styling

---

## 6. Navigation & Routing

### Library: `react-router-dom` v6

### Routes
| Path | Component | Access |
|---|---|---|
| `/` | HomePage (Hero, HowItWorks, JobServices, JobList, Testimonials, FAQ, CTA) | Public |
| `/eksplorasi` | EksplorasiPage (JobListContainer full) | Public |
| `/job/:id` | JobDetailWrapper | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/hrd/dashboard` | JobPublisher | Perusahaan |
| `/hrd/branding` | CompanyBrandingForm | Perusahaan |
| `/favorit` | FavoriteListContainer | Pelamar |
| `/status-lamaran` | StatusTracker | Pelamar |
| `/profile` | ProfileContainer | Pelamar |
| `/admin/dashboard` | AdminDashboard | Admin |

### Scroll Behavior
- **ScrollToTop component:** Watch `pathname` via `useLocation()`, call `window.scrollTo(0, 0)` on change
- **navigateTo wrapper:** Also calls `window.scrollTo({ top: 0, behavior: 'instant' })` before `navigate()` for instant feedback

---

## 7. Coding Conventions

- **No comments** in code
- **All inline styles** — no CSS modules, styled-components, or external stylesheets
- **No external animation libraries** — IntersectionObserver manual, CSS keyframes
- **State management:** React Context (ThemeContext), localStorage for auth & theme
- **isMobile state:** `window.innerWidth < 768`, updated on `resize` event
- **Icons:** Emoji (👍🏠💼🔑☀️🌙 dll) — no icon library

---

## 8. File Structure

```
frontend/src/
├── App.js                          # Route definitions, ScrollToTop, HomePage, EksplorasiPage
├── context/
│   └── ThemeContext.js              # Dark/light theme provider
├── components/
│   ├── Navbar/
│   │   └── Navbar.js               # Pill navbar (fixed, responsive, role-based menu)
│   ├── Footer/
│   │   └── Footer.js               # 4-column footer with newsletter
│   ├── PageTransition.js           # Route change animation wrapper
│   ├── ScrollReveal.js             # IntersectionObserver scroll animation wrapper
│   ├── Modal/
│   │   └── Modal.js                # Reusable modal (logout confirm, success)
│   ├── auth/
│   │   ├── Login.js                # Login page
│   │   └── Register.js             # Register page
│   └── jobs/
│       └── JobDetail.js            # Job detail page
├── features/
│   ├── landing/
│   │   ├── Hero.js                 # Full-viewport hero with background carousel
│   │   ├── HowItWorks.js           # 4-step guide
│   │   ├── JobServices.js          # 6 job category cards with photos
│   │   ├── Testimonials.js         # Testimonial carousel
│   │   ├── FAQ.js                  # Accordion FAQ
│   │   └── CTA.js                  # Call to action section
│   ├── eksplorasi/
│   │   ├── JobListContainer.js     # Job listing (simple & full variants)
│   │   └── FavoriteListContainer.js # Saved jobs
│   ├── hrd/
│   │   └── JobPublisher.js         # Post job (HRD dashboard)
│   ├── dashboard/
│   │   ├── CompanyBrandingForm.js  # Company profile edit
│   │   ├── ProfileContainer.js     # User profile
│   │   └── AdminDashboard.js       # Admin panel
│   ├── applications/
│   │   └── StatusTracker.js        # Application status
│   └── lamaran/
│       └── FavoriteService.js      # Favorite job API service
└── ...
```
