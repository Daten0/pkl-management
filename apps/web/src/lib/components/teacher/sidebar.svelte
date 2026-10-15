<!-- src/lib/components/guru/Sidebar.svelte -->
<script>
	let { isOpen } = $props();

	// Menu khusus Guru Pembimbing
	const menus = [
		{ name: 'Dashboard', icon: '📊' },
		{ name: 'Kelompok PKL', icon: '👥' },
		{ name: 'Data Siswa', icon: '👨‍🎓' },
		{ name: 'Penilaian', icon: '⭐' },
		{ name: 'Profil Guru', icon: '👨‍🏫' }
	];
</script>

<aside 
	class="bg-white border-r border-[#e6d9cc] transition-all duration-300 flex flex-col shadow-sm {isOpen ? 'w-64' : 'w-0 overflow-hidden'}"
>
	<div class="p-4 border-b border-[#e6d9cc] flex justify-center items-center h-16">
		<span class="text-orange-500 font-extrabold text-xl whitespace-nowrap">Menu Guru</span>
	</div>
	<nav class="flex-1 overflow-y-auto py-4">
		<ul class="flex flex-col gap-1 px-3">
			{#each menus as menu}
				<li>
					<a 
						href="#" 
						class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6f4e37] font-medium transition-colors duration-200 hover:bg-orange-500 hover:text-white group"
					>
						<span class="text-lg">{menu.icon}</span>
						<span class="whitespace-nowrap">{menu.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>