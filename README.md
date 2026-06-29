<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white" alt="MySQL 8" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/JWT-auth-EB5424?logo=jsonwebtoken&logoColor=white" alt="JWT" />
</p>

<div align="center">
  <h1>PasukanYerusSolo — Job Portal</h1>
  <p>
    <strong>Platform pencarian lowongan kerja dan manajemen rekrutmen berbasis web</strong><br />
    Dibangun untuk wilayah Solo Raya dengan tiga peran pengguna: Pelamar, Perusahaan/HRD, dan Admin.
  </p>
  <p>
    <a href="#-fitur-lengkap">Fitur</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-arsitektur-sistem">Arsitektur</a> •
    <a href="#-instalasi--menjalankan">Instalasi</a> •
    <a href="#-api-endpoints">API</a> •
    <a href="#-database-schema">Database</a> •
    <a href="#-frontend-routes">Routes</a>
  </p>
</div>

---

## Daftar Isi

- [Fitur Lengkap](#-fitur-lengkap)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Frontend Routes](#-frontend-routes)
- [Struktur Proyek](#-struktur-proyek)
- [Deployment](#-deployment)
- [Lisensi](#-lisensi)

---

## Fitur Lengkap

### 👤 Role: Pelamar (Job Seeker)

| Fitur | Detail |
|-------|--------|
| **Registrasi & Autentikasi** | Register, login, JWT-based session, logout dengan konfirmasi modal |
| **Onboarding Interaktif** | Walkthrough 3-slide untuk pengunjung baru dengan tombol skip/next/previous |
| **Jelajahi Lowongan** | Grid kartu lowongan dengan infinite scroll pagination; filter kategori, tipe pekerjaan, dan sortir (terbaru, terlama, gaji tertinggi/terendah, A-Z / Z-A) |
| **Pencarian Real-time** | Filter berdasarkan judul, kategori, dan nama perusahaan (case-insensitive) |
| **Detail Lowongan** | Informasi lengkap: posisi, kategori, gaji (format Rp), tipe, deskripsi, dan data perusahaan (logo, nama, bidang, lokasi, telepon) |
| **Info Perusahaan** | Modal popup profil perusahaan dengan data branding lengkap |
| **Lowongan Favorit** | Simpan/hapus favorit dengan tombol bintang; daftar favorit dengan pagination (10 per halaman) |
| **Lamaran Pekerjaan** | Apply dengan upload CV (.pdf, max 2MB) + pesan tambahan |
| **Tracking Status** | Pipeline visual: Menunggu → Review → Interview → Lolos / Gagal |
| **Profil Pengguna** | Edit foto profil, telepon, keahlian, tentang saya |

### 🏢 Role: Perusahaan / HRD

| Fitur | Detail |
|-------|--------|
| **Dashboard HRD** | Tampilan terpisah: tab "My Jobs" dan "Applications" dengan manajemen penuh |
| **Publikasi Lowongan** | Form controlled dengan validasi; input gaji auto-format Rupiah (Rp xxx.xxx); 13 opsi kategori + custom input; tipe pekerjaan (Full-time, Remote, Contract) |
| **Edit / Hapus Lowongan** | Setiap lowongan dapat diedit atau dihapus dari dashboard |
| **Company Branding** | Atur logo, nama perusahaan, deskripsi budaya, lokasi, bidang, no telepon — muncul otomatis di kartu lowongan & modal info |
| **Kelola Lamaran Masuk** | Lihat semua lamaran yang masuk ke perusahaan; update status (select dropdown dengan 5 status) |
| **Notifikasi** | Modal sukses/gagal untuk setiap aksi |

### 🛡️ Role: Admin

| Fitur | Detail |
|-------|--------|
| **Dashboard Statistik** | Kartu statistik: total user, perusahaan, pelamar, lowongan, lamaran |
| **Kelola Pengguna** | Filter role (Semua/Pelamar/Perusahaan), search, sort (ID/nama/email/role/created_at), edit role, hapus (cascading) |
| **Kelola Lowongan** | Filter kategori, search posisi/perusahaan, sort (ID/judul/gaji/dibuat), edit gaji & kategori, hapus |
| **Kelola Lamaran** | Filter status (Semua/Menunggu/Review/Interview/Lolos/Gagal), search pelamar/posisi, sort (ID/status/tanggal), update status |
| **Kelola Testimonial** | Filter aktif/nonaktif, search nama, sort (ID/rating/tanggal), toggle status, edit rating, hapus |
| **Responsif** | Desktop: tabel penuh; Mobile: kartu per-item dengan pagination 10/halaman |

### ✨ Fitur Umum

| Fitur | Detail |
|-------|--------|
| **Tema Gelap/Terang** | ThemeContext dengan persist localStorage; toggle di navbar |
| **Responsive Design** | Bottom navigation mobile, pill navbar desktop; breakpoint 768px, 968px |
| **Heroicons v2** | Semua ikon menggunakan `@heroicons/react/24/outline` — konsisten dan scalable |
| **Animasi Halus** | PageTransition (fade + translateY 0.35s), ScrollReveal (IntersectionObserver, 5 variant), hover effects di cards/buttons |
| **Halaman Statis** | Tentang Kami, Kebijakan Privasi, Syarat & Ketentuan, Karier (dengan profil founder + kontak WhatsApp), FAQ (accordion) |
| **Landing Page** | Hero carousel (5 gambar background, 5s interval), 6 kategori layanan, testimonial carousel, FAQ accordion, CTA section |
| **Keamanan** | JWT authentication, role-based authorization middleware, input validation (express-validator), file upload validation (tipe & ukuran) |
| **Axios Interceptor** | Satu instance Axios dengan JWT interceptor untuk semua API calls; base URL dinamis dengan fallback deployment |

---

## Tech Stack

### Frontend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 19.2.4 | UI library dengan Concurrent Features |
| React Router DOM | 7.16.0 | Client-side routing (nested layout, dynamic params) |
| Axios | 1.16.1 | HTTP client dengan interceptor pattern |
| @heroicons/react | 2.2.0 | SVG icon library (Heroicons v2 outline) |
| react-scripts (CRA) | 5.0.1 | Build tooling & development server |

### Backend

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Node.js | 20+ | Runtime JavaScript |
| Express | 5.2.1 | Web framework (routing, middleware, error handling) |
| mysql2 | 3.22.2 | MySQL driver dengan promise pool |
| jsonwebtoken | 9.0.3 | JWT signing & verification |
| bcryptjs | 3.0.3 | Password hashing (salt + hash) |
| multer | 2.1.1 | Multipart file upload (logo, CV, foto profil) |
| express-validator | 7.3.2 | Input validation & sanitization |
| cors | 2.8.6 | Cross-Origin Resource Sharing |
| dotenv | 17.4.2 | Environment variable management |

### Infrastructure

| Teknologi | Fungsi |
|-----------|--------|
| MySQL 8.0 | Database relasional utama |
| Docker / docker-compose | Containerization (MySQL + Node + Nginx) |
| Nginx (alpine) | Production web server untuk frontend |

### Design & Animasi

| Komponen | Detail |
|----------|--------|
| Font | Plus Jakarta Sans (Google Fonts, weights: 700/800/900) |
| Ikon | Heroicons v2 (outline style, all components) |
| Animasi | CSS keyframes, IntersectionObserver, inline style transitions |
| Styling | Inline styles + CSS Modules (modular untuk komponen tertentu) |

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │              React SPA (port 3000 / 3005)                  │   │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │   │
│  │  │ Landing │ │Eksplorasi│ │   HRD    │ │   Admin       │ │   │
│  │  │  Page   │ │  Jobs    │ │Dashboard │ │   Dashboard   │ │   │
│  │  └─────────┘ └──────────┘ └──────────┘ └──────────────┘ │   │
│  │                                                           │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │         ThemeContext │ React Router │ Axios          │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP (JSON + JWT)
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Express API (port 5005 / 5006)                  │
│  ┌──────────────┬──────────────┬─────────────┬───────────────┐   │
│  │  Auth Routes │  Job Routes  │  Admin      │  Testimonial  │   │
│  │  /api/auth   │  /api/jobs   │  /api/admin │  /api/test... │   │
│  ├──────────────┼──────────────┼─────────────┼───────────────┤   │
│  │ JWT Middleware│ Role Guard  │ Multer      │  Validator    │   │
│  └──────────────┴──────────────┴─────────────┴───────────────┘   │
│                        │                                           │
│                        ▼                                           │
│              ┌──────────────────┐                                  │
│              │  MySQL Database  │                                  │
│              │  job_portal_db   │                                  │
│              └──────────────────┘                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Alur Autentikasi

```
Login ──→ POST /api/auth/login ──→ Validasi email+password ──→ Generate JWT
    ↓
Simpan token + role di localStorage ──→ Redirect sesuai role
    ↓
Setiap request: Axios interceptor inject header `Authorization: Bearer <token>`
    ↓
Middleware `auth.js` verifikasi JWT ──→ Middleware `authorize.js` cek role ──→ Controller
```

### Alur Lamaran

```
Pelamar buka detail lowongan ──→ Klik "Lamar Sekarang"
    ↓
Form lamaran: CV (PDF max 2MB) + pesan tambahan ──→ POST /api/apply
    ↓
Status awal: "Menunggu"
    ↓
HRD lihat di dashboard ──→ Update status: Review → Interview → Lolos/Gagal
    ↓
Pelamar lihat pipeline di /status-lamaran
```

---

## Instalasi & Menjalankan

### Prasyarat

- Node.js v18+
- MySQL 8.0 / MariaDB 10.11 (atau Docker)
- npm / yarn
- Docker & docker-compose (opsional)

### 1. Clone Repository

```bash
git clone <repository-url>
cd PasukanYerusSolo2/job-portal-project
```

### 2. Setup Database

**Opsi A — Docker (Recommended):**

```bash
docker compose up -d db
# MySQL siap di localhost:3307, user: root, password: admin123
```

**Opsi B — Manual:**

```bash
# Buat database
mysql -u root -p -e "CREATE DATABASE job_portal_db"

# Import dump
mysql -u root -p job_portal_db < dump-job_portal_db-202604171944.sql
```

### 3. Backend

```bash
cd backend
cp .env.example .env   # atau gunakan .env yang sudah ada
npm install
node server.js
# Server berjalan di http://localhost:5005
```

### 4. Frontend

```bash
cd frontend
npm install
npm start
# App terbuka di http://localhost:3000
```

### 5. Docker (Semua Service)

```bash
docker compose up -d --build
```

| Service | URL |
|---------|-----|
| Frontend (Nginx) | `http://localhost:3005` |
| Backend API | `http://localhost:5006` |
| MySQL | `localhost:3307` |

### Akun Default (Seeder)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mail.com | admin123 |
| Perusahaan | perusahaan1@mail.com | perusahaan123 |
| Pelamar | pelamar1@mail.com | pelamar123 |

---

## Konfigurasi Environment

### Backend `.env`

```env
PORT=5005
JWT_SECRET=bebasapasaja123
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin123
DB_DATABASE=job_portal_db
DB_PORT=3306
```

### Frontend API URL

Base URL ditentukan di `src/services/api.js`:

```javascript
// Prioritas: REACT_APP_API_URL -> localhost fallback -> deployment fallback
const baseURL = process.env.REACT_APP_API_URL 
  || 'http://localhost:5005/api' 
  || 'https://backend-pasukanyerussolo-production.up.railway.app/api';
```

---

## Database Schema

### Entity Relationship Diagram (Textual)

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│    users     │       │    lowongan       │       │  testimonials│
│──────────────│       │──────────────────│       │──────────────│
│ id_user (PK) │──┬───││ id_lowongan (PK) │       │ id (PK)      │
│ nama         │  │    │ id_perusahaan(FK)│◄──────│ nama         │
│ email (UQ)   │  │    │ judul_posisi     │       │ role         │
│ password     │  │    │ kategori         │       │ perusahaan   │
│ role         │  │    │ tipe_pekerjaan   │       │ teks         │
│ telepon      │  │    │ gaji             │       │ rating       │
│ keahlian     │  │    │ deskripsi        │       │ status       │
│ foto         │  │    │ tanggal_posting  │       │ created_at   │
│ created_at   │  │    └────────┬─────────┘       └──────────────┘
└──────┬───────┘  │            │
       │          │            │
       ▼          │            ▼
┌───────────────────┐    ┌───────────────┐
│ profil_perusahaan │    │    lamaran     │
│───────────────────│    │───────────────│
│ id_user (PK, FK)  │    │ id_lamaran(PK)│
│ nama_perusahaan   │    │ id_user(FK)   │
│ deskripsi_budaya  │    │ id_lowongan(FK)│
│ lokasi            │    │ pesan_tambahan│
│ no_telepon        │    │ status (ENUM) │
│ bidang            │    │ tanggal_melamar│
│ logo              │    │ cv_file       │
└───────────────────┘    └───────┬───────┘
                                │
┌───────────────────────┐       │
│ profil_pencari_kerja   │       │
│───────────────────────│       │
│ id_user (PK, FK)      │       │
│ bio                   │       │
│ pendidikan            │       │
│ pengalaman            │       │
│ keahlian              │       │
└───────────────────────┘       │
                                │
┌───────────────────────┐       │
│       favorit         │       │
│───────────────────────│       │
│ id_user (PK, FK)──────│───────┤
│ id_lowongan (PK, FK)──│───────┘
└───────────────────────┘
```

### 7 Tabel

| Tabel | PK | Foreign Keys | Fungsi |
|-------|----|-------------|--------|
| `users` | `id_user` | - | Akun semua role (Pelamar, Perusahaan, Admin) |
| `lowongan` | `id_lowongan` | `id_perusahaan → users.id_user` | Postingan lowongan pekerjaan |
| `profil_perusahaan` | `id_user` | `id_user → users.id_user` | Branding perusahaan (logo, nama, deskripsi budaya) |
| `profil_pencari_kerja` | `id_user` | `id_user → users.id_user` | Profil pelamar (bio, pendidikan, pengalaman) |
| `lamaran` | `id_lamaran` | `id_user → users.id_user`, `id_lowongan → lowongan.id_lowongan` | Lamaran kerja dengan status pipeline |
| `favorit` | `(id_user, id_lowongan)` | `id_user → users.id_user`, `id_lowongan → lowongan.id_lowongan` | Relasi M:N favorit |
| `testimonials` | `id` | - | Testimonial landing page |

### Status Enum (lamaran)

```
'Menunggu' ──→ 'Review' ──→ 'Interview' ──→ 'Lolos'
                                        └──→ 'Gagal'
```

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| POST | `/api/auth/register` | - | - | Registrasi user baru (email + password + nama + role) |
| POST | `/api/auth/login` | - | - | Login, mengembalikan JWT token + data user |
| GET | `/api/auth/me` | ✓ | * | Info user saat ini dari token |
| GET | `/api/auth/profile` | ✓ | * | Profil lengkap (include profil_perusahaan / profil_pencari_kerja) |
| PUT | `/api/auth/profile` | ✓ | * | Update profil (nama, telepon, keahlian, tentang_saya, foto) |
| GET | `/api/auth/jobs` | ✓ | * | Semua lowongan (minimal, tanpa branding) |
| POST | `/api/auth/hrd/jobs` | ✓ | Perusahaan | Buat lowongan baru |
| GET | `/api/auth/hrd/jobs` | ✓ | Perusahaan | Lowongan milik sendiri |
| PUT | `/api/auth/hrd/jobs/:id` | ✓ | Perusahaan | Edit lowongan |
| DELETE | `/api/auth/hrd/jobs/:id` | ✓ | Perusahaan | Hapus lowongan |
| GET | `/api/auth/hrd/applications` | ✓ | Perusahaan | Lamaran masuk ke perusahaan |
| PATCH | `/api/auth/hrd/lamaran/:id` | ✓ | Perusahaan | Update status lamaran |
| POST | `/api/auth/apply` | ✓ | Pelamar | Kirim lamaran (dengan CV file) |
| GET | `/api/auth/company/profile` | ✓ | Perusahaan | Ambil company branding |
| PUT | `/api/auth/company/profile` | ✓ | Perusahaan | Update company branding (logo, nama, deskripsi, lokasi, bidang, telepon) |

### Jobs Public (`/api/jobs`)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/jobs` | - | Semua lowongan (include data branding perusahaan: nama, logo, bidang, lokasi, telepon) |
| GET | `/api/jobs/:id` | - | Detail lowongan + data branding + profil perusahaan lengkap |
| POST | `/api/jobs` | ✓ | Buat lowongan (general) |

### Favorit (`/api/favorit`)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/favorit` | ✓ | Daftar favorit user (join dengan data lowongan) |
| POST | `/api/favorit` | ✓ | Tambah lowongan ke favorit `{ id_lowongan }` |
| DELETE | `/api/favorit/:id_lowongan` | ✓ | Hapus dari favorit |
| GET | `/api/favorit/cek/:id_lowongan` | ✓ | Cek status favorit (boolean) |

### Apply & Lamaran (`/api/apply`, `/api/lamaran`)

| Method | Endpoint | Auth | Role | Deskripsi |
|--------|----------|------|------|-----------|
| POST | `/api/apply` | ✓ | Pelamar | Kirim lamaran (form-data: id_lowongan, pesan, cv file .pdf max 2MB) |
| GET | `/api/apply` | ✓ | Pelamar | Lamaran user sendiri |
| GET | `/api/lamaran` | ✓ | Pelamar | Status lamaran user (join lowongan + perusahaan) |
| GET | `/api/lamaran/hrd` | ✓ | Perusahaan | Lamaran masuk ke perusahaan (join user + lowongan) |
| PATCH | `/api/lamaran/:id` | ✓ | Perusahaan | Update status lamaran `{ status }` |

### Admin (`/api/admin`)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/admin/stats` | Admin | Statistik dashboard (total users, companies, jobseekers, jobs, applications) |
| GET | `/api/admin/users` | Admin | Semua user (search, filter role, sort) |
| GET | `/api/admin/users/:id` | Admin | Detail user |
| PUT | `/api/admin/users/:id` | Admin | Edit user (nama, email, role) |
| DELETE | `/api/admin/users/:id` | Admin | Hapus user (cascading: lowongan, lamaran, favorit, profil) |
| GET | `/api/admin/jobs` | Admin | Semua lowongan (include nama perusahaan) |
| PUT | `/api/admin/jobs/:id` | Admin | Edit lowongan (judul, kategori, gaji) |
| DELETE | `/api/admin/jobs/:id` | Admin | Hapus lowongan |
| GET | `/api/admin/applications` | Admin | Semua lamaran (join user + lowongan) |
| PATCH | `/api/admin/applications/:id` | Admin | Update status lamaran |
| GET | `/api/admin/testimonials` | Admin | Semua testimonial |
| PUT | `/api/admin/testimonials/:id` | Admin | Edit testimonial (nama, rating, status aktif) |
| DELETE | `/api/admin/testimonials/:id` | Admin | Hapus testimonial |

### Testimonials (`/api/testimonials`)

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| GET | `/api/testimonials` | - | Testimonial aktif untuk landing page |
| POST | `/api/testimonials` | ✓ | Kirim testimonial baru (nama, role, perusahaan, teks, rating) |

---

## Frontend Routes

### Public Routes

| Path | Component | Deskripsi |
|------|-----------|-----------|
| `/` | Walkthrough (3-step) | Onboarding interaktif untuk pengunjung baru |
| `/home` | HomePage | Hero, JobServices, JobList simple, Testimonials, FAQ, CTA |
| `/eksplorasi` | EksplorasiPage | JobListContainer full dengan FilterBox, sort, pagination |
| `/job/:id` | JobDetailWrapper | Detail lowongan + ApplyJobForm |
| `/login` | Login | Form login dengan validasi |
| `/register` | Register | Form register (nama, email, password, role) |

### Authenticated Routes

| Path | Component | Role | Deskripsi |
|------|-----------|------|-----------|
| `/hrd/dashboard` | JobPublisher | Perusahaan | Kelola lowongan + lihat lamaran masuk |
| `/hrd/branding` | CompanyBrandingForm | Perusahaan | Atur logo, nama, deskripsi, lokasi, bidang, telepon |
| `/favorit` | FavoriteListContainer | Pelamar | Daftar lowongan favorit (pagination 10/halaman) |
| `/status-lamaran` | StatusTracker | Pelamar | Pipeline status lamaran dengan visual tracking |
| `/profile` | ProfileContainer | * | Edit profil foto, telepon, keahlian, tentang saya |
| `/admin/dashboard` | AdminDashboard | Admin | Dashboard admin: statistik + CRUD all entities |

### Info Pages (Public)

| Path | Slug | Konten |
|------|------|--------|
| `/tentang-kami` | tentang-kami | Visi, misi, sejarah, profil 5 founder + kontak WhatsApp |
| `/kebijakan-privasi` | kebijakan-privasi | Kebijakan privasi & data security |
| `/syarat-ketentuan` | syarat-ketentuan | Syarat & ketentuan penggunaan |
| `/karier` | karier | Info karir & lowongan internal |
| `/faq` | faq | Accordion FAQ (8 pertanyaan umum) |

---

## Struktur Proyek

```
PasukanYerusSolo2/
├── job-portal-project/
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js                     # MySQL connection pool
│   │   ├── controllers/
│   │   │   ├── authController.js         # Auth, profile, company profile
│   │   │   ├── JobController.js          # Public job listing & detail
│   │   │   ├── HRDController.js          # HRD job & application management
│   │   │   ├── AdminController.js        # Admin CRUD operations
│   │   │   ├── applicationController.js  # Apply & application management
│   │   │   ├── favoritController.js      # Favorite jobs
│   │   │   └── testimoniController.js    # Testimonials
│   │   ├── middleware/
│   │   │   ├── auth.js                   # JWT verification
│   │   │   ├── authorize.js              # Role-based access control
│   │   │   ├── upload.js                 # Multer file upload config
│   │   │   ├── validator.js              # express-validator rules
│   │   │   └── errorMiddleware.js        # Global error handler
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   ├── favoritRoutes.js
│   │   │   ├── applyRoutes.js
│   │   │   ├── lamaranRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   └── testimoniRoutes.js
│   │   ├── seeders/
│   │   │   └── seedData.js               # Database seeder (users, jobs, testimonials)
│   │   ├── uploads/                      # Uploaded files (logos, CVs, photos)
│   │   ├── server.js                     # Express entry point
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── .env
│   ├── frontend/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── manifest.json
│   │   │   └── images/founders/          # Founder profile photos
│   │   └── src/
│   │       ├── main.jsx                  # React 19 entry point (createRoot)
│   │       ├── App.js                    # Routing, HomePage, EksplorasiPage
│   │       ├── App.css
│   │       ├── index.css                 # Global styles + Plus Jakarta Sans font
│   │       ├── design.md                 # Full design system documentation
│   │       ├── context/
│   │       │   └── ThemeContext.js        # Dark/light theme provider
│   │       ├── services/
│   │       │   └── api.js                # Axios instance + JWT interceptor
│   │       ├── utils/
│   │       │   └── formatRupiah.js       # Rupiah formatting utilities
│   │       ├── components/
│   │       │   ├── Navbar/
│   │       │   │   └── Navbar.js         # Fixed pill navbar (desktop top / mobile bottom)
│   │       │   ├── Footer/
│   │       │   │   └── Footer.js         # 4-column footer with newsletter
│   │       │   ├── Modal/
│   │       │   │   └── Modal.jsx         # Reusable notification modal
│   │       │   ├── Pagination/
│   │       │   │   └── Pagination.js     # Reusable pagination component
│   │       │   ├── auth/
│   │       │   │   ├── Login.jsx
│   │       │   │   └── Register.jsx
│   │       │   ├── jobs/
│   │       │   │   ├── JobCard.jsx       # Job listing card
│   │       │   │   ├── JobCard.module.css
│   │       │   │   ├── JobDetail.jsx     # Job detail view
│   │       │   │   └── JobList.jsx       # Job list grid
│   │       │   ├── PageTransition.js     # Route transition animation
│   │       │   └── ScrollReveal.js       # IntersectionObserver scroll animation
│   │       ├── features/
│   │       │   ├── landing/
│   │       │   │   ├── Hero.js           # Full-viewport carousel hero
│   │       │   │   ├── JobServices.js    # 6 job category cards
│   │       │   │   ├── Testimonials.js   # Testimonial carousel
│   │       │   │   ├── FAQ.js            # Accordion FAQ
│   │       │   │   ├── CTA.js            # Call-to-action section
│   │       │   │   └── Walkthrough.js    # 3-step onboarding walkthrough
│   │       │   ├── eksplorasi/
│   │       │   │   ├── JobListContainer.js    # Job listing (filter, sort, pagination)
│   │       │   │   ├── FilterBox.js           # Filter & search controls
│   │       │   │   └── FavoriteListContainer.js # Saved jobs list
│   │       │   ├── hrd/
│   │       │   │   ├── JobPublisher.js             # HRD dashboard
│   │       │   │   ├── FormLowonganControlled.js   # Controlled job form
│   │       │   │   └── ApplicationStatusTracker.js # Application tracking
│   │       │   ├── dashboard/
│   │       │   │   ├── AdminDashboard.js    # Admin panel
│   │       │   │   ├── AdminStatsView.js    # Admin statistics
│   │       │   │   ├── CompanyBrandingForm.js # Company profile editor
│   │       │   │   └── ProfileContainer.js  # User profile editor
│   │       │   ├── applications/
│   │       │   │   └── StatusTracker.jsx  # Application status pipeline
│   │       │   └── lamaran/
│   │       │       ├── ApplyJobForm.js    # Job application form
│   │       │       └── FavoriteService.js # Favorite jobs API service
│   │       └── pages/
│   │           └── InfoPage.js            # Dynamic static pages (5 slugs)
│   ├── docker-compose.yml
│   ├── dump-job_portal_db-202604171944.sql
│   ├── .gitignore
│   └── README.md
└── README.md
```

---

## Deployment

### Docker Production

```bash
# Build & start semua service
docker compose up -d --build

# Stop semua service
docker compose down

# Lihat logs
docker compose logs -f
```

### Volume & Persistent Data

```yaml
# docker-compose.yml
services:
  db:
    volumes:
      - db_data:/var/lib/mysql     # Data database persist
  backend:
    volumes:
      - ./backend/uploads:/app/uploads  # File uploads persist
```

---

## Lisensi

Proyek ini dikembangkan untuk keperluan **tugas akhir / portofolio**.

---

<p align="center">
  <sub>Dibangun dengan ❤️ oleh Tim PasukanYerusSolo</sub>
  <br />
  <sub>Solo Raya, Indonesia — 2025-2026</sub>
</p>
