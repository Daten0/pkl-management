<!-- src/routes/guru/+layout.svelte -->
<script lang="ts">
	import Sidebar from '#lib/components/teacher/sidebar.svelte';
	import Header from '#lib/components/teacher/header.svelte';
	// Meminjam Footer dari komponen utama yang sudah dibuat sebelumnya
	import Footer from '#lib/components/footer.svelte'; 
	import { sidebarState, toggleSidebar } from '#lib/state/student/sidebar.svelte.ts';

	let { children } = $props();
	const toggle = () => toggleSidebar('teacher');
</script>

<div class="flex h-screen w-full bg-[#f4ebe1] font-sans overflow-hidden">
	<Sidebar isOpen={sidebarState.teacher} />

	<div class="flex-1 flex flex-col h-full overflow-hidden relative">
		<Header onToggle={toggle} />

		<main class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</main>

		<Footer />
	</div>
</div>