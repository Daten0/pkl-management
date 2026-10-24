<script lang="ts">
	import Sidebar from '#lib/components/student/sidebar.svelte';
	import Header from '#lib/components/student/header.svelte';
	import Footer from '#lib/components/footer.svelte';
	import { sidebarState, toggleSidebar } from '#lib/state/student/sidebar.svelte.ts';

	let { children } = $props();
	const toggle = () => toggleSidebar('student');
</script>

<div class="flex h-screen w-full bg-[#f4ebe1] font-sans overflow-hidden">
	<!-- Memanggil Sidebar dengan mengirimkan state -->
	<Sidebar isOpen={sidebarState.student} />

	<div class="flex-1 flex flex-col h-full overflow-hidden relative">
		<!-- Memanggil Header dengan mengirimkan fungsi toggle -->
		<Header onToggle={toggle} />

		<main class="flex-1 overflow-y-auto p-6">
			<!-- Tempat merender halaman / rute yang aktif -->
			{@render children()}
		</main>

		<!-- Memanggil Footer -->
		<Footer />
	</div>
</div>