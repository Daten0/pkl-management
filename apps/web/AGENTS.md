# AGENTS.md — Architecture, UI Rules & Component Taxonomy

## Project Context
- **Stack:** SvelteKit + Vite + TypeScript (Svelte 5 runes: `$props`, `$state`, `+layout.svelte`)
- **Scope:** Seluruh route role di `src/routes/{siswa,guru,admin}` serta fitur di `src/lib/features/{student,teacher,admin}`.
- **Alias:** Gunakan `#lib/...` (didefinisikan di `package.json#imports`), bukan `$lib`.

## 0. Struktur Folder & Feature Architecture

### 0.1 Prinsip
- `src/lib` disusun **feature-first per role**: `features/student`, `features/teacher`, `features/admin`.
- Setiap fitur adalah vertical slice yang memiliki komponen, state, tipe, util, dan konstanta sendiri bila diperlukan.
- Route hanya berisi layout/page; logika dan komponen fitur berada di `src/lib/features/...`.
- Public API setiap fitur adalah `index.ts`. Route dan modul luar fitur mengimpor lewat `index.ts`.
- File internal fitur mengimpor langsung ke file tujuan (bukan barrel fiturnya sendiri) untuk menghindari circular import.
- Tidak ada import lintas role (`student` tidak boleh mengimpor `teacher`/`admin`, dan sebaliknya).
- Jangan membuat folder kosong hanya untuk scaffolding.

### 0.2 Mapping Role
| URL prefix | Route dir | Feature dir | Sidebar role key |
|---|---|---|---|
| `/siswa` | `src/routes/siswa` | `src/lib/features/student` | `student` |
| `/guru` | `src/routes/guru` | `src/lib/features/teacher` | `teacher` |
| `/admin` | `src/routes/admin` | `src/lib/features/admin` | `admin` |

Catatan: nama folder route memakai istilah Indonesia (`siswa`, `guru`), sedangkan folder fitur memakai bahasa Inggris (`student`, `teacher`). Jangan mengubah URL publik.

### 0.3 Struktur Target
```text
src/lib/
├── api/                    # reserved: client HTTP & endpoints
├── assets/                 # aset statis global
├── components/             # UI global lintas role (footer.svelte)
├── config/                 # reserved: env PUBLIC_*
├── features/
│   ├── student/
│   │   ├── layout/components/{header,sidebar}.svelte
│   │   ├── auth/components/{LoginForm,LogoPane,RegistrationForm}.svelte
│   │   ├── dashboard/components/dashboard_content.svelte
│   │   ├── pengelompokan/components/{...,detail/*}.svelte
│   │   ├── presensi/{components,stores,utils} + constants.ts + types.ts
│   │   ├── logbook/{components,utils} + types.ts
│   │   ├── berkas/components/*.svelte
│   │   └── preview/{components} + constants.ts + types.ts
│   ├── teacher/
│   │   ├── layout/components/{header,sidebar}.svelte
│   │   └── dashboard/components/dashboard_content.svelte
│   └── admin/
│       ├── layout/components/{header,sidebar}.svelte
│       └── dashboard/components/dashboard_content.svelte
├── stores/                 # state global lintas role (sidebar.svelte.ts)
├── types/                  # reserved: tipe global
└── utils/                  # helper murni global (responsive.ts)
```

Setiap fitur wajib memiliki `index.ts`. Subfolder `api/` per fitur dibuat hanya ketika sudah ada pemanggilan endpoint.

### 0.4 Aturan Penempatan
| Kebutuhan | Lokasi |
|---|---|
| UI global lintas role | `src/lib/components/` |
| Shell/layout role (sidebar/header) | `src/lib/features/<role>/layout/components/` |
| Komponen fitur | `src/lib/features/<role>/<feature>/components/` |
| State milik satu fitur | `src/lib/features/<role>/<feature>/stores/` |
| State lintas fitur/role | `src/lib/stores/` |
| Tipe milik satu fitur | `src/lib/features/<role>/<feature>/types.ts` |
| Tipe global | `src/lib/types/` (reserved) |
| Util milik satu fitur | `src/lib/features/<role>/<feature>/utils/` |
| Util global | `src/lib/utils/` |
| Konstanta fitur | `src/lib/features/<role>/<feature>/constants.ts` |
| API fitur | `src/lib/features/<role>/<feature>/api/` (saat sudah ada) |
| HTTP client & endpoints global | `src/lib/api/` (reserved) |
| Environment/config | `src/lib/config/` (reserved) |
| Public API fitur | `src/lib/features/<role>/<feature>/index.ts` |

### 0.5 Aturan Import
- Route/consumer mengimpor public API fitur:
  ```ts
  import { Header, Sidebar } from '#lib/features/student/layout/index.ts';
  ```
- File internal fitur mengimpor langsung:
  ```ts
  import { formatLokasi } from '#lib/features/student/presensi/utils/geolocation.ts';
  ```
- Modul global: `#lib/components/...`, `#lib/stores/...`, `#lib/utils/...`.
- Barrel memakai named export eksplisit. Jika ada nama komponen yang bertabrakan, alias dilakukan di sisi import agar nama lokal/markup tidak berubah.
- Dilarang mengimpor dari path lama:
  - `#lib/components/{student,teacher,admin}/...`
  - `#lib/state/...`
  - `#lib/types/student/...`
  - `#lib/constants/student/...`
  - `#lib/utils/student/...`

### 0.6 Status: TBA — Route Groups
Route group `(auth)` dan `(app)` **belum diterapkan (TBA)**.
Rencana ini ditunda sampai ada kebutuhan nyata untuk:
- auth guard bersama,
- layout publik vs layout setelah login,
- atau shared layout lintas role.

Saat ini route tetap berada di:
- `src/routes/siswa/`
- `src/routes/guru/`
- `src/routes/admin/`

Jika nanti diterapkan, URL publik tidak boleh berubah; group hanya membungkus segmen yang sudah ada.

### 0.7 Status: Reserved — Belum Dibuat
Folder berikut disepakati sebagai lokasi resmi ketika dibutuhkan, tetapi **belum dibuat** sampai ada kode nyata:
- `src/lib/api/` — HTTP client, interceptors, endpoints.
- `src/lib/config/` — pembacaan env `PUBLIC_*`.
- `src/lib/types/` — tipe global seperti `PaginationResponse`, `ApiError`.

Jangan membuat folder kosong atau abstraksi baru hanya untuk mengisi struktur.

### 0.8 Error Handling
- Error global sisi klien (jika dibutuhkan) tetap memakai konvensi SvelteKit: `src/hooks.client.ts`.
- Error UI/logic khusus role dapat ditempatkan di `src/lib/features/<role>/error/` ketika sudah ada implementasinya.
- Jangan membuat folder `error/` kosong.

## 1. UI Color Palette Rules (derived from existing routes)

### A. Post-login Content Routes (student, teacher, admin)
Use this palette for all role content pages after login. Saat ini student, teacher, dan admin memakai palet yang sama.

| Element | Rule | Value / Class |
|---|---|---|
| **Page Background** | Cream/beige base | `bg-[#f4ebe1]` |
| **Layout/Sidebar/Header** | White surface | `bg-white` |
| **Borders / Dividers** | Light brownish line | `border-[#e6d9cc]` |
| **Primary Text** | Dark brown | `text-[#6f4e37]` |
| **Accent / Primary Action** | Orange | `text-orange-500`, `bg-orange-500`, `hover:bg-orange-500` |
| **Hover States (nav links)** | Orange fill + white text | `hover:bg-orange-500 hover:text-white` |
| **Subtle Backgrounds** | Light gray/slate | `bg-gray-...`, `bg-slate-50` (only for form sections if needed) |

### B. Auth / Login & Registration Routes (`/siswa/login/`, `/siswa/daftar/`)
Use this palette only for the authentication split-screen.

| Element | Rule | Value / Class |
|---|---|---|
| **Left Pane (Brand)** | Dark gradient | `bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950` |
| **Left Pane Text** | White / slate-300 | `text-white`, `text-slate-300` |
| **Right Pane (Form)** | Cold light gray | `bg-slate-50` |
| **Logo / Brand Typography** | White, bold, tracking tight | `text-white text-3xl lg:text-4xl font-extrabold` |

> **Decision rule:** If a new route is **post-login content for any role**, use Palette A. If it is **auth/onboarding**, use Palette B.

## 2. Component Taxonomy (types used so far)

| Type | File Pattern | Examples | Purpose |
|---|---|---|---|
| **Route Layout** | `src/routes/<role>/<route>/+layout.svelte` | `src/routes/siswa/dashboard/+layout.svelte` | Shell route: Sidebar, Header, Footer, main scroll area (`bg-[#f4ebe1]`) |
| **Page** | `src/routes/<role>/<route>/+page.svelte` | `src/routes/siswa/logbook/+page.svelte` | Konten route; tidak menduplikasi chrome layout |
| **Role Layout Shell** | `src/lib/features/<role>/layout/components/*.svelte` | `features/student/layout/components/sidebar.svelte` | Sidebar/Header khusus role |
| **Feature Component** | `src/lib/features/<role>/<feature>/components/*.svelte` | `features/student/presensi/components/presensi_box.svelte` | Komponen milik satu fitur |
| **Global Component** | `src/lib/components/*.svelte` | `footer.svelte` | Dipakai lintas role |
| **Auth Component** | `src/lib/features/student/auth/components/*.svelte` | `LoginForm`, `LogoPane`, `RegistrationForm` | Halaman auth/onboarding |
| **Feature Store** | `src/lib/features/<role>/<feature>/stores/*.svelte.ts` | `features/student/presensi/stores/presensi.svelte.ts` | State milik satu fitur |
| **Global Store** | `src/lib/stores/*.svelte.ts` | `stores/sidebar.svelte.ts` | State lintas fitur/role |
| **Feature Types** | `src/lib/features/<role>/<feature>/types.ts` | `features/student/logbook/types.ts` | Tipe milik fitur |
| **Feature Utils** | `src/lib/features/<role>/<feature>/utils/*.ts` | `features/student/presensi/utils/waktu.ts` | Helper murni fitur |
| **Public API** | `src/lib/features/<role>/<feature>/index.ts` | `features/student/auth/index.ts` | Satu-satunya pintu import dari luar fitur |

## 3. Routing Structure Rules
- Route berada di `src/routes/{siswa,guru,admin}/<route_name>/`.
- Mapping role: `/siswa` → `features/student`, `/guru` → `features/teacher`, `/admin` → `features/admin`.
- Setiap route konten role wajib memiliki `+layout.svelte` yang mengimpor `Header`, `Sidebar`, dan `Footer`, dengan `bg-[#f4ebe1]` pada wrapper root.
- `+page.svelte` hanya berisi konten; jangan menduplikasi chrome layout (sidebar/header/footer).
- Auth routes (`login`, `daftar`) memakai split-screen tanpa sidebar; tidak perlu layout shell role.
- Import komponen dari public API fitur:
  ```ts
  import { Header, Sidebar } from '#lib/features/student/layout/index.ts';
  ```
- File internal fitur mengimpor langsung ke file tujuan, bukan ke `index.ts` fiturnya sendiri.
- Sidebar open/close state wajib memakai modul global `src/lib/stores/sidebar.svelte.ts`:
  - Student layouts use `sidebarState.student` (desktop), `mobileSidebarState.student` (drawer), and `toggleSidebar('student')`.
  - Teacher layouts use `sidebarState.teacher` (desktop), `mobileSidebarState.teacher` (drawer), and `toggleSidebar('teacher')`.
  - Admin layouts use `sidebarState.admin` (desktop), `mobileSidebarState.admin` (drawer), and `toggleSidebar('admin')`.
  - Close the mobile drawer with `closeMobileSidebar(role)` after navigation.
  - Do not create local `$state` for sidebar open/close in route layouts.

## 4. Component Color Mapping (review from existing files)
- `Sidebar` (`features/<role>/layout/components/sidebar.svelte`): `bg-white`, `border-r border-[#e6d9cc]`, title `text-orange-500`, links `text-[#6f4e37]`.
- `Header` (`features/<role>/layout/components/header.svelte`): `bg-white`, `h-16`, `border-b border-[#e6d9cc]`, toggle icon `text-orange-500`, title `text-[#6f4e37]`, avatar border `border-orange-500`.
- `Footer` (`src/lib/components/footer.svelte`): inherit layout background; check existing `footer.svelte` for consistency.
- `LoginForm` (`features/student/auth/components/LoginForm.svelte`): render inside `bg-slate-50` section.
- `LogoPane` (`features/student/auth/components/LogoPane.svelte`): must use `bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950`, white text.

## 5. Verification Checklist Before Creating New Route
- [ ] Route folder exists under `src/routes/{siswa,guru,admin}/`
- [ ] `+page.svelte` exists
- [ ] Jika route konten: `+layout.svelte` ada dengan Sidebar/Header/Footer dan `bg-[#f4ebe1]`
- [ ] Sidebar state memakai `#lib/stores/sidebar.svelte.ts` dengan role key yang benar (`student` / `teacher` / `admin`)
- [ ] Komponen fitur berada di `src/lib/features/<role>/<feature>/`
- [ ] Import dari luar fitur memakai `#lib/features/<role>/<feature>/index.ts`
- [ ] File internal fitur mengimpor langsung, bukan lewat barrel fiturnya sendiri
- [ ] Tidak ada import dari path lama (`#lib/components/{student,teacher,admin}`, `#lib/state`, `#lib/types/student`, `#lib/constants/student`, `#lib/utils/student`)
- [ ] Color class matches Palette A (post-login) or Palette B (auth)
- [ ] Component type assigned (Route Layout / Page / Role Layout Shell / Feature / Global / Auth / Store / Types / Utils / Public API)
- [ ] Responsive behavior checked at 360 px, 768 px, and 1440 px
- [ ] `bun run check` dan `bun run build` lulus

## 6. Kombinasi Warna Halaman Post-login (contoh: `/siswa/dashboard`)
Pada halaman post-login (contoh: dashboard siswa), kombinasi palet yang digunakan adalah:
- **Background halaman:** `bg-[#f4ebe1]` (cream/beige)
- **Surface layout/sidebar/header:** `bg-white`
- **Border/divider:** `border-[#e6d9cc]`
- **Teks utama:** `text-[#6f4e37]` (dark brown)
- **Aksen & aksi primer:** `text-orange-500` / `bg-orange-500`
- **Hover navigasi:** `hover:bg-orange-500 hover:text-white`
- **Subtle background (jika diperlukan):** `bg-slate-50` atau `bg-gray-...`

## 7. Responsive Web Design (RWD) Rules

### 7.1 Prinsip Umum
- Gunakan pendekatan **mobile-first**: tulis style dasar untuk mobile, lalu tambahkan varian `sm:`, `md:`, `lg:`, dan `xl:`.
- Jangan membuat asumsi lebar desktop. Semua halaman harus dapat digunakan mulai dari lebar **320 px**.
- Hindari lebar tetap yang dapat memaksa horizontal scroll pada `body`. Gunakan `w-full`, `max-w-*`, `min-w-0`, dan `flex-1` secara tepat.
- Gunakan `dvh` untuk tinggi viewport (`h-dvh`, `min-h-dvh`, `max-h-[90dvh]`) agar aman terhadap address bar browser mobile.

### 7.2 Breakpoint
Gunakan breakpoint default Tailwind:

| Rentang | Perangkat | Varian |
|---|---|---|
| `< 640px` | Mobile | default (tanpa prefix) |
| `≥ 640px` | Mobile besar / tablet portrait kecil | `sm:` |
| `≥ 768px` | Tablet | `md:` |
| `≥ 1024px` | Desktop | `lg:` |
| `≥ 1280px` | Desktop besar | `xl:` |

### 7.3 Layout Shell
- Root layout dashboard wajib memakai `h-dvh` (bukan `h-screen`).
- Area konten wajib memakai `min-w-0`, `flex-1`, dan `overflow-y-auto`.
- Padding konten: `p-4 sm:p-5 lg:p-6`.
- Konten halaman dibungkus `w-full max-w-7xl mx-auto` bila menggunakan layout dashboard.
- Footer wajib responsif: `px-4 py-2.5 text-xs sm:py-3 sm:text-sm`.

### 7.4 Sidebar dan Navigasi
- Pada `< lg`, sidebar berperilaku sebagai **drawer overlay**:
  - default tertutup;
  - memakai backdrop;
  - dapat ditutup lewat backdrop, tombol tutup, `Escape`, dan setelah link navigasi diklik;
  - tidak menempati ruang konten.
- Pada `lg+`, sidebar statis dan dapat di-collapse.
- Gunakan `sidebarState[role]` untuk state desktop dan `mobileSidebarState[role]` untuk drawer mobile dari `#lib/stores/sidebar.svelte.ts`.
- Tombol toggle wajib memiliki `aria-label` yang jelas.
- Jangan membuat state sidebar lokal di route layout.

### 7.5 Header
- Header tidak boleh memakai positioning absolut untuk judul yang dapat bertabrakan dengan tombol/avatar.
- Gunakan `flex`/`grid` dengan `min-w-0`; judul wajib `truncate`.
- Teks sekunder (nama lengkap, status) boleh disembunyikan di mobile (`hidden sm:block`).
- Ukuran judul responsif: `text-base sm:text-lg lg:text-xl`.

### 7.6 Grid, Tabel, dan Form
- Grid dimulai dari `grid-cols-1`; tingkatkan menjadi `sm:grid-cols-2` dan `lg:grid-cols-2/3`.
- Tabel lebar wajib berada di wrapper `overflow-x-auto` dan diberi `min-w-[...]`; kolom penting tidak boleh disembunyikan.
- Form memakai `w-full`; grid field dua kolom hanya pada `sm+` (`grid-cols-1 sm:grid-cols-2`).
- Grup tombol aksi menumpuk vertikal di mobile dan boleh sejajar di `sm+`.
- Tombol aksi utama di mobile boleh memakai `w-full sm:w-auto`.
- Target sentuh minimal **44×44 px**; ukuran teks minimal 12 px.

### 7.7 Dialog dan Modal
- Lebar dialog: `w-[calc(100%-2rem)]` dengan `max-w-*`.
- Tinggi maksimum: `max-h-[90dvh]` dan isi yang panjang memakai `overflow-y-auto`.
- Footer tombol menumpuk di mobile (`flex-col-reverse sm:flex-row`).
- Tabel di dalam modal wajib memakai `overflow-x-auto`.

### 7.8 Halaman Auth
- Split-screen (`LogoPane` + form) hanya untuk `lg+`.
- Di mobile, tampilkan brand ringkas di atas form; jangan menampilkan pane logo besar.
- Form auth memakai padding `p-6 sm:p-8 lg:p-10`.

### 7.9 Paginasi Tabel
- Tabel data wajib memakai paginasi dengan **5 baris per halaman** dan maksimal **5 tombol nomor halaman**.
- Tampilkan informasi rentang data: `Menampilkan {awal}–{akhir} dari {total} {label} · Halaman {aktif} dari {totalPages}`.
- Kontrol wajib menyediakan: halaman pertama (`«`), sebelumnya (`‹`), nomor halaman, berikutnya (`›`), dan halaman terakhir (`»`).
- Setiap tombol kontrol wajib memiliki `aria-label`; tombol halaman aktif memakai `aria-current="page"` dan warna aksen orange.
- Tombol dinonaktifkan pada batas halaman pertama/terakhir.
- Halaman aktif wajib di-clamp setiap kali jumlah/filter data berubah agar tidak melebihi `totalPages`.
- Paginasi responsif: informasi dan kontrol menumpuk vertikal di mobile, sejajar di `sm+`.
- Saat mencetak, sembunyikan tabel terpaginasikan dan kontrol paginasi (`print:hidden`), lalu render seluruh baris pada blok khusus `hidden print:block`.
- Gunakan pola yang sama seperti `src/lib/features/student/presensi/components/riwayat_presensi.svelte` dan `src/lib/features/student/logbook/components/logbook_table.svelte`.

### 7.10 Verifikasi Wajib
Sebelum menyatakan halaman selesai, periksa viewport berikut (portrait dan landscape bila relevan):
- 360×640, 390×844 (mobile)
- 768×1024 (tablet)
- 1024×768, 1440×900 (desktop)
- Tidak ada horizontal scroll pada `body`
- Sidebar drawer dapat dibuka/ditutup
- Modal tidak melebihi tinggi viewport
- Semua tombol tetap dapat ditekan

## 8. Verifikasi Build & Import

Jalankan dari `apps/web`:

```sh
bun run check
bun run build
```

Pemeriksaan tambahan sebelum menyatakan refactor/fitur selesai:
- Tidak ada import dari path lama:
  ```sh
  grep -rn "#lib/components/\(student\|teacher\|admin\)\|#lib/state\|#lib/types/student\|#lib/constants/student\|#lib/utils/student" src
  ```
- Import dari luar fitur memakai barrel `index.ts`.
- Tidak ada folder kosong baru di `src/lib/features/`.
- Tidak ada import lintas role.
- Smoke test URL utama:
  - `/siswa/login`, `/siswa/daftar`, `/siswa/dashboard`
  - `/siswa/pengelompokan/create`, `/siswa/pengelompokan/1`
  - `/siswa/presensi`, `/siswa/logbook`, `/siswa/berkas`, `/siswa/preview`
  - `/guru/dashboard`, `/admin/dashboard`
- URL publik tidak berubah setelah refactor.
