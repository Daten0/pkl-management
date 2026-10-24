<!-- src/routes/admin/+layout.svelte -->
<script lang="ts">
	import Sidebar from '#lib/components/admin/sidebar.svelte';
	import Header from '#lib/components/admin/header.svelte';
	// Meminjam Footer dari komponen utama
	import Footer from '#lib/components/footer.svelte'; 
	import { sidebarState, toggleSidebar } from '#lib/state/student/sidebar.svelte.ts';

	let { children } = $props();
	const toggle = () => toggleSidebar('admin');
</script>

<div class="flex h-screen w-full bg-[#f4ebe1] font-sans overflow-hidden">
	<Sidebar isOpen={sidebarState.admin} />

	<div class="flex-1 flex flex-col h-full overflow-hidden relative">
		<Header onToggle={toggle} />

		<main class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</main>

		<Footer />
	</div>
</div>