<!-- src/lib/components/Header.svelte -->
<script>
	let { onToggle } = $props();
</script>

<header class="bg-white h-16 shadow-sm border-b border-[#e6d9cc] flex items-center justify-between px-4 z-10">
	<!-- Kiri: Tombol Toggle -->
	<button 
		onclick={onToggle} 
		class="p-2 text-orange-500 hover:bg-orange-50 rounded-md transition-colors cursor-pointer"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</button>

	<!-- Tengah: Judul & Placeholder Logo -->
	<div class="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
		<div class="w-9 h-9 bg-orange-100 border border-orange-300 border-dashed flex items-center justify-center rounded text-[10px] text-orange-600 font-bold">
			LOGO
		</div>
		<h1 class="text-xl font-bold text-[#6f4e37] tracking-wide">SIM-PKL Siswa</h1>
	</div>

	<!-- Kanan: Profil User -->
	<div class="flex items-center gap-3">
		<div class="text-right hidden sm:block">
			<p class="text-sm font-bold text-[#6f4e37]">Muhammad Siddiq Febri Nusantara</p>
			<p class="text-xs text-orange-500">Siswa Aktif</p>
		</div>
		<div class="w-10 h-10 rounded-full border-2 border-orange-500 bg-orange-100 overflow-hidden flex-shrink-0">
			<img src="https://ui-avatars.com/api/?name=Muhammad+Siddiq&background=fff&color=f97316" alt="Avatar" class="w-full h-full object-cover"/>
		</div>
	</div>
</header>