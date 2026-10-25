<!-- src/lib/components/student/header.svelte -->
<script lang="ts">
	let { onToggle }: { onToggle: () => void } = $props();
</script>

<header class="relative z-20 flex h-16 items-center gap-2 border-b border-[#e6d9cc] bg-white px-3 shadow-sm sm:gap-3 sm:px-4">
	<!-- Kiri: Tombol Toggle -->
	<button
		type="button"
		onclick={onToggle}
		aria-label="Buka atau tutup menu navigasi"
		aria-controls="sidebar-navigation"
		class="shrink-0 cursor-pointer rounded-md p-2 text-orange-500 transition-colors hover:bg-orange-50"
	>
		<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</button>

	<!-- Tengah: Judul & Placeholder Logo -->
	<div class="flex min-w-0 flex-1 items-center justify-center gap-2 sm:gap-3">
		<div class="hidden h-9 w-9 shrink-0 items-center justify-center rounded border border-dashed border-orange-300 bg-orange-100 text-[10px] font-bold text-orange-600 sm:flex">
			LOGO
		</div>
		<h1 class="truncate text-base font-bold tracking-wide text-[#6f4e37] sm:text-lg lg:text-xl">SIM-PKL Siswa</h1>
	</div>

	<!-- Kanan: Profil User -->
	<div class="flex shrink-0 items-center gap-2 sm:gap-3">
		<div class="hidden max-w-[12rem] text-right sm:block lg:max-w-none">
			<p class="truncate text-sm font-bold text-[#6f4e37]">Muhammad Siddiq Febri Nusantara</p>
			<p class="truncate text-xs text-orange-500">Siswa Aktif</p>
		</div>
		<div class="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-orange-500 bg-orange-100 sm:h-10 sm:w-10">
			<img src="https://ui-avatars.com/api/?name=Muhammad+Siddiq&background=fff&color=f97316" alt="Avatar" class="h-full w-full object-cover" />
		</div>
	</div>
</header>
