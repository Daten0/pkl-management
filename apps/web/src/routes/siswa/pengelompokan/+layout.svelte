<script>
	import Sidebar from '#lib/components/student/sidebar.svelte';
	import Header from '#lib/components/student/header.svelte';
	import Footer from '#lib/components/footer.svelte';

	let { children } = $props();
	
	// State reaktif Svelte 5 untuk Sidebar
	let isSidebarOpen = $state(true);

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}
</script>

<div class="flex h-screen w-full bg-[#f4ebe1] font-sans overflow-hidden">
	<!-- Memanggil Sidebar dengan mengirimkan state -->
	<Sidebar isOpen={isSidebarOpen} />

	<div class="flex-1 flex flex-col h-full overflow-hidden relative">
		<!-- Memanggil Header dengan mengirimkan fungsi toggle -->
		<Header onToggle={toggleSidebar} />

		<main class="flex-1 overflow-y-auto p-6">
			<!-- Tempat merender halaman / rute yang aktif -->
			{@render children()}
		</main>

		<!-- Memanggil Footer -->
		<Footer />
	</div>
</div>