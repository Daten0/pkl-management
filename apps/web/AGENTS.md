# AGENTS.md — UI Rules & Component Taxonomy

## Project Context
- **Stack:** SvelteKit + Vite + TypeScript (Svelte 5 runes: `$props`, `$state`, `+layout.svelte`)
- **Scope:** All routes under `src/routes/siswa/*` created to date (`login`, `dashboard`, `daftar`) and any future student routes.

## 1. UI Color Palette Rules (derived from existing routes)

### A. Student Dashboard / Daftar Routes (`/siswa/dashboard/`, `/siswa/daftar/`)
Use this palette for all student-facing content pages after login.

| Element | Rule | Value / Class |
|---|---|---|
| **Page Background** | Cream/beige base | `bg-[#f4ebe1]` |
| **Layout/Sidebar/Header** | White surface | `bg-white` |
| **Borders / Dividers** | Light brownish line | `border-[#e6d9cc]` |
| **Primary Text** | Dark brown | `text-[#6f4e37]` |
| **Accent / Primary Action** | Orange | `text-orange-500`, `bg-orange-500`, `hover:bg-orange-500` |
| **Hover States (nav links)** | Orange fill + white text | `hover:bg-orange-500 hover:text-white` |
| **Subtle Backgrounds** | Light gray/slate | `bg-gray-...`, `bg-slate-50` (only for form sections if needed) |

### B. Auth / Login Route (`/siswa/login/`)
Use this palette only for the authentication split-screen.

| Element | Rule | Value / Class |
|---|---|---|
| **Left Pane (Brand)** | Dark gradient | `bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950` |
| **Left Pane Text** | White / slate-300 | `text-white`, `text-slate-300` |
| **Right Pane (Form)** | Cold light gray | `bg-slate-50` |
| **Logo / Brand Typography** | White, bold, tracking tight | `text-white text-3xl lg:text-4xl font-extrabold` |

> **Decision rule:** If a new route is **post-login student content**, use Palette A. If it is **auth/onboarding**, use Palette B.

## 2. Component Taxonomy (types used so far)

| Type | File Pattern | Examples | Purpose |
|---|---|---|---|
| **Layout** | `+layout.svelte` / `+layout.ts` | `src/routes/siswa/dashboard/+layout.svelte` | Persistent shell: Sidebar, Header, Footer, main scroll area (`bg-[#f4ebe1]`) |
| **Page** | `+page.svelte` / `+page.ts` | `src/routes/siswa/dashboard/+page.svelte` | Route-specific content; must render inside layout |
| **Shared / Global** | `src/lib/components/student/*.svelte` | `Sidebar`, `Header`, `Footer` | Reused across student routes |
| **Auth-Specific** | `src/lib/components/student/login/*.svelte` | `LogoPane`, `LoginForm` | Only for auth pages |
| **Form / Input** | `src/lib/components/student/*/*.svelte` | `RegistrationForm`, `LoginForm`, `dashboard_content` | Data entry or content blocks |
| **Content Block** | `src/lib/components/student/*.svelte` | `dashboard_content.svelte` | Specialized content for a route |

## 3. Routing Structure Rules
- Routes live under `src/routes/siswa/<route_name>/`.
- Every student content route must provide a `+layout.svelte` that imports `Sidebar`, `Header`, and `Footer`, with `bg-[#f4ebe1]` on the root wrapper.
- `+page.svelte` should only contain content; never duplicate layout chrome (sidebar/header/footer).
- Auth routes (`login`) use split-screen without sidebar; no `+layout.svelte` inheritance required unless explicitly designed.
- All components imported via `#lib/components/student/...` alias.
- Sidebar open/close state must use the shared module in `src/lib/state/student/sidebar.svelte.ts`:
  - Student layouts use `sidebarState.student` (desktop), `mobileSidebarState.student` (drawer), and `toggleSidebar('student')`.
  - Teacher layouts use `sidebarState.teacher` (desktop), `mobileSidebarState.teacher` (drawer), and `toggleSidebar('teacher')`.
  - Admin layouts use `sidebarState.admin` (desktop), `mobileSidebarState.admin` (drawer), and `toggleSidebar('admin')`.
  - Close the mobile drawer with `closeMobileSidebar(role)` after navigation.
  - Do not create local `$state` for sidebar open/close in route layouts.

## 4. Component Color Mapping (review from existing files)
- `Sidebar`: `bg-white`, `border-r border-[#e6d9cc]`, title `text-orange-500`, links `text-[#6f4e37]`.
- `Header`: `bg-white`, `h-16`, `border-b border-[#e6d9cc]`, toggle icon `text-orange-500`, title `text-[#6f4e37]`, avatar border `border-orange-500`.
- `Footer`: inherit layout background; check existing `footer.svelte` for consistency.
- `LoginForm`: render inside `bg-slate-50` section.
- `LogoPane`: must use `bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950`, white text.

## 5. Verification Checklist Before Creating New Route
- [ ] Route folder exists under `src/routes/siswa/`
- [ ] `+page.svelte` exists
- [ ] If student content: `+layout.svelte` exists with Sidebar/Header/Footer and `bg-[#f4ebe1]`
- [ ] Sidebar state uses `#lib/state/student/sidebar.svelte.ts` with the correct role key
- [ ] Color class matches Palette A (post-login) or Palette B (auth)
- [ ] Component type assigned (Layout / Page / Shared / Auth / Form / Content)
- [ ] Imports use `#lib/components/student/` alias
- [ ] Responsive behavior checked at 360 px, 768 px, and 1440 px

## 6. Kombinasi Warna Halaman `/siswa/dashboard`
Pada halaman dashboard siswa (post-login), kombinasi palet yang digunakan adalah:
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
- Gunakan `sidebarState[role]` untuk state desktop dan `mobileSidebarState[role]` untuk drawer mobile dari `#lib/state/student/sidebar.svelte.ts`.
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
- Gunakan pola yang sama seperti `src/lib/components/student/presensi/riwayat_presensi.svelte` dan `src/lib/components/student/logbook/logbook_table.svelte`.

### 7.10 Verifikasi Wajib
Sebelum menyatakan halaman selesai, periksa viewport berikut (portrait dan landscape bila relevan):
- 360×640, 390×844 (mobile)
- 768×1024 (tablet)
- 1024×768, 1440×900 (desktop)
- Tidak ada horizontal scroll pada `body`
- Sidebar drawer dapat dibuka/ditutup
- Modal tidak melebihi tinggi viewport
- Semua tombol tetap dapat ditekan
