<script lang="ts">
	import type { LogbookFilter } from '#lib/types/student/logbook.ts';

	const filters: LogbookFilter[] = ['Semua', '3 Hari Terakhir', '7 Hari Terakhir'];

	let { selectedFilter = $bindable() }: { selectedFilter: LogbookFilter } = $props();
</script>

<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
	<span class="text-sm font-medium text-[#6f4e37]/70">Filter:</span>
	<div class="flex flex-wrap gap-2">
		{#each filters as filter}
			<button
				type="button"
				class="rounded-full px-3 py-1 text-xs font-semibold transition-colors {selectedFilter === filter
					? 'bg-orange-100 text-orange-700 ring-1 ring-orange-500'
					: 'bg-[#f4ebe1] text-[#6f4e37] hover:bg-[#e6d9cc]'}"
				onclick={() => (selectedFilter = filter)}
			>
				{filter}
			</button>
		{/each}
	</div>
</div>
