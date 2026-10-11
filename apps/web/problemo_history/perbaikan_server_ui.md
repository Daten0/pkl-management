# Perbaikan Masalah Server & UI `/siswa/login`

**Tanggal:** 2026-10-11  
**Proyek:** `apps/web` (SvelteKit + Vite + Bun + Tailwind v4)

## Masalah
- Firefox tidak bisa terhubung ke `localhost:5173` saat mengakses `/siswa/login`.
- UI split-screen (logo kiri, login oranye kanan) tidak terlihat.

## Penyebab (ditemukan via @reviewer & @debugger)
- Proses `bun run dev` sebelumnya **timeout/mati** (tidak lagi mendengarkan port 5173).
- Tidak ada konflik port atau error sintaks di `vite.config.ts`; file sumber dan build (`build/`, `.svelte-kit/`) sudah valid.
- Komponen sudah dipindahkan ke `src/lib/components/student/login/` dan import di `+page.svelte` sudah benar (`#lib/components/student/login/...`).

## Langkah Perbaikan
1. **Periksa status server:** `proc/net/tcp` → port 5173 tidak aktif.
2. **Restart server:** jalankan ulang `bun run dev` dari `apps/web/`.
3. **Verifikasi file:**
   - `src/lib/components/student/login/LogoPane.svelte`
   - `src/lib/components/student/login/LoginForm.svelte`
   - `src/routes/siswa/login/+page.svelte` (import `#lib`)
4. **Pastikan build bersih:** `bun run build` berhasil (CSS 18 kB, route `/siswa/login` ter-render).
5. **Akses ulang:** `http://localhost:5173/siswa/login`.

## Hasil
- Server Vite (`VITE v8.3.4`) aktif kembali di `localhost:5173`.
- Halaman `/siswa/login` menampilkan UI split-screen dengan area logo (kiri) dan form login (kanan, tombol `bg-orange-500`).

## Catatan Konfigurasi
- Tailwind v4 menggunakan `@tailwindcss/vite` plugin dan import CSS (`src/app.css`: `@import "tailwindcss";`).
- Alias `#lib` digunakan sesuai `package.json` (bukan `$lib` yang sudah dihapus oleh SvelteKit v3).
