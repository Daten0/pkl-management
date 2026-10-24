<script lang="ts">
	import { onMount } from 'svelte';
	import PresensiBox from '#lib/components/student/presensi/presensi_box.svelte';
	import RiwayatPresensiBox from '#lib/components/student/presensi/riwayat_presensi.svelte';
	import { muatPresensi, tandaiAlpaHariIni } from '#lib/state/student/presensi.svelte.ts';

	onMount(() => {
		muatPresensi();
		tandaiAlpaHariIni();

		const interval = setInterval(() => tandaiAlpaHariIni(), 30_000);
		return () => clearInterval(interval);
	});
</script>

<div class="max-w-7xl mx-auto space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-[#6f4e37]">Presensi PKL</h1>
		<p class="mt-1 text-sm text-[#8c6b54]">Pantau dan lakukan absensi harian Anda di sini.</p>
	</div>

	<PresensiBox />

	<RiwayatPresensiBox />
</div>
