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
- Sidebar open/close state must use the shared module in `src/lib/state/sidebar.svelte.ts`:
  - Student layouts use `sidebarState.student` and `toggleSidebar('student')`.
  - Teacher layouts use `sidebarState.teacher` and `toggleSidebar('teacher')`.
  - Admin layouts use `sidebarState.admin` and `toggleSidebar('admin')`.
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
- [ ] Sidebar state uses `#lib/state/sidebar.svelte.ts` with the correct role key
- [ ] Color class matches Palette A (post-login) or Palette B (auth)
- [ ] Component type assigned (Layout / Page / Shared / Auth / Form / Content)
- [ ] Imports use `#lib/components/student/` alias

## 6. Kombinasi Warna Halaman `/siswa/dashboard`
Pada halaman dashboard siswa (post-login), kombinasi palet yang digunakan adalah:
- **Background halaman:** `bg-[#f4ebe1]` (cream/beige)
- **Surface layout/sidebar/header:** `bg-white`
- **Border/divider:** `border-[#e6d9cc]`
- **Teks utama:** `text-[#6f4e37]` (dark brown)
- **Aksen & aksi primer:** `text-orange-500` / `bg-orange-500`
- **Hover navigasi:** `hover:bg-orange-500 hover:text-white`
- **Subtle background (jika diperlukan):** `bg-slate-50` atau `bg-gray-...`
