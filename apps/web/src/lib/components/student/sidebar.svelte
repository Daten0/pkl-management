<!-- src/lib/components/student/sidebar.svelte -->
<script lang="ts">
	let {
		isOpen,
		mobileOpen = false,
		onClose = () => {}
	}: {
		isOpen: boolean;
		mobileOpen?: boolean;
		onClose?: () => void;
	} = $props();

	const menus = [
		{ name: 'Dashboard', icon: '📊', href: '/siswa/dashboard' },
		{ name: 'Pengelompokan', icon: '👥', href: '/siswa/pengelompokan/create' },
		{ name: 'Presensi', icon: '📝', href: '/siswa/presensi' },
		{ name: 'Logbook', icon: '📖', href: '/siswa/logbook' },
		{ name: 'Upload Berkas', icon: '📁', href: '#' },
		{ name: 'Lihat Nilai', icon: '⭐', href: '#' },
		{ name: 'Profil Pengguna', icon: '👤', href: '#' }
	];

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileOpen) onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if mobileOpen}
	<button
		type="button"
		aria-label="Tutup menu navigasi"
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		onclick={onClose}
	></button>
{/if}

<aside
	id="sidebar-navigation"
	class="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-[#e6d9cc] bg-white shadow-sm transition-[transform,width] duration-300 lg:static lg:z-auto lg:translate-x-0 {mobileOpen
		? 'translate-x-0'
		: '-translate-x-full max-lg:invisible'} {isOpen ? 'lg:w-64' : 'lg:w-0 lg:overflow-hidden'}"
>
	<div class="flex h-16 items-center border-b border-[#e6d9cc] px-4">
		<span class="min-w-0 flex-1 truncate text-center text-xl font-extrabold text-orange-500">Menu Utama</span>
		<button
			type="button"
			onclick={onClose}
			aria-label="Tutup menu navigasi"
			class="rounded-md p-2 text-[#6f4e37]/60 transition-colors hover:bg-orange-50 hover:text-orange-600 lg:hidden"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
	<nav class="flex-1 overflow-y-auto py-4">
		<ul class="flex flex-col gap-1 px-3">
			{#each menus as menu}
				<li>
					<a
						href={menu.href}
						onclick={onClose}
						class="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#6f4e37] transition-colors duration-200 [&:hover]:bg-orange-500 [&:hover]:text-white active:bg-orange-500 active:text-white group"
					>
						<span class="text-lg">{menu.icon}</span>
						<span class="whitespace-nowrap">{menu.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
