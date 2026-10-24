<script lang="ts">
	import { jamWita, tanggalLabelWita } from '#lib/utils/student/waktu.ts';

	let time = $state<Date | null>(null);

	$effect(() => {
		time = new Date();
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});

	let hariTanggal = $derived(time ? tanggalLabelWita(time) : '');
	let jam = $derived(time ? `${jamWita(time)} WITA` : '--.--.-- WITA');
</script>

<div class="mt-6 flex items-center gap-3 rounded-lg border border-[#e6d9cc] bg-[#f4ebe1] p-4 text-[#6f4e37]">
	<svg class="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
	</svg>
	<div>
		<p class="text-sm font-medium">{hariTanggal}</p>
		<p class="text-2xl font-bold font-mono tracking-wider">{jam}</p>
	</div>
</div>
