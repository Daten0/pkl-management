<script lang="ts">
	let { searchQuery = $bindable() }: { searchQuery: string } = $props();
</script>

<div class="relative w-full max-w-full lg:max-w-sm">
	<svg class="absolute left-3 top-2.5 h-5 w-5 text-[#6f4e37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
	</svg>
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Cari Nama Aktivitas..."
		class="w-full rounded-lg border border-[#e6d9cc] py-2 pl-10 pr-4 text-[#6f4e37] placeholder:text-[#6f4e37]/50 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
	/>
</div>
