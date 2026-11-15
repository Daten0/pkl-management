<script lang="ts">
	interface Props {
		locationName: string;
		address: string;
		period: string;
	}

	let { locationName, address, period }: Props = $props();
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-4 sm:p-5 flex flex-col gap-5">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
		Informasi Lokasi PKL
	</h2>

	<div class="flex flex-col gap-1.5">
		<span class="text-sm font-medium text-[#6f4e37]/80">Nama Lokasi / Instansi</span>
		<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37] font-medium">
			{locationName}
		</div>
	</div>

	<div class="flex flex-col gap-1.5">
		<span class="text-sm font-medium text-[#6f4e37]/80">Alamat</span>
		<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37] leading-relaxed">
			{address}
		</div>
	</div>

	<div class="flex flex-col gap-1.5">
		<span class="text-sm font-medium text-[#6f4e37]/80">Waktu / Periode Pelaksanaan</span>
		<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37]">
			{period}
		</div>
	</div>
</div>
