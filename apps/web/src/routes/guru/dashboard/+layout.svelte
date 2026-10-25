<script lang="ts">
	import Sidebar from '#lib/components/teacher/sidebar.svelte';
	import Header from '#lib/components/teacher/header.svelte';
	import Footer from '#lib/components/footer.svelte';
	import {
		closeMobileSidebar,
		mobileSidebarState,
		sidebarState,
		toggleSidebar
	} from '#lib/state/student/sidebar.svelte.ts';

	let { children } = $props();
	const toggle = () => toggleSidebar('teacher');
	const closeMobile = () => closeMobileSidebar('teacher');
</script>

<div class="flex h-dvh w-full overflow-hidden bg-[#f4ebe1] font-sans">
	<Sidebar isOpen={sidebarState.teacher} mobileOpen={mobileSidebarState.teacher} onClose={closeMobile} />

	<div class="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
		<Header onToggle={toggle} />

		<main class="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
			{@render children()}
		</main>

		<Footer />
	</div>
</div>
