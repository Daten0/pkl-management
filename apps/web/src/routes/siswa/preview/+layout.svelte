<script lang="ts">
	import Sidebar from '#lib/components/student/sidebar.svelte';
	import Header from '#lib/components/student/header.svelte';
	import Footer from '#lib/components/footer.svelte';
	import {
		closeMobileSidebar,
		mobileSidebarState,
		sidebarState,
		toggleSidebar
	} from '#lib/state/student/sidebar.svelte.ts';

	let { children } = $props();
	const toggle = () => toggleSidebar('student');
	const closeMobile = () => closeMobileSidebar('student');
</script>

<div class="flex h-dvh w-full overflow-hidden bg-[#f4ebe1] font-sans print:block print:h-auto print:overflow-visible print:bg-white">
	<div class="contents print:hidden">
		<Sidebar isOpen={sidebarState.student} mobileOpen={mobileSidebarState.student} onClose={closeMobile} />
	</div>

	<div class="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden print:block print:h-auto print:overflow-visible">
		<div class="contents print:hidden">
			<Header onToggle={toggle} />
		</div>

		<main class="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 print:overflow-visible print:p-0">
			{@render children()}
		</main>

		<div class="contents print:hidden">
			<Footer />
		</div>
	</div>
</div>
