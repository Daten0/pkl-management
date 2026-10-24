<script lang="ts">
	import StatusBadge from './status_badge.svelte';
	import { presensiState } from '#lib/state/student/presensi.svelte.ts';
	import { StatusPresensi } from '#lib/types/student/presensi.ts';
	import { formatLokasi } from '#lib/utils/student/geolocation.ts';

	function handleCetak() {
		window.print();
	}
</script>

<div class="rounded-xl bg-white border border-[#e6d9cc] p-6 shadow-sm">
	<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
		<h3 class="text-lg font-bold text-[#6f4e37]">Riwayat Presensi</h3>
		<button
			type="button"
			onclick={handleCetak}
			class="flex items-center gap-2 rounded-lg bg-white border border-[#e6d9cc] px-4 py-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1]"
		>
			<svg class="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
			</svg>
			Cetak Riwayat
		</button>
	</div>

	<div class="overflow-x-auto rounded-lg border border-[#e6d9cc]">
		<table class="w-full text-left text-sm text-[#6f4e37]">
			<thead class="bg-[#f4ebe1] text-xs uppercase text-[#6f4e37]">
				<tr>
					<th scope="col" class="px-6 py-3">Tanggal</th>
					<th scope="col" class="px-6 py-3">Jam (WITA)</th>
					<th scope="col" class="px-6 py-3">Status Kehadiran</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#e6d9cc]">
				{#if presensiState.riwayat.length === 0}
					<tr>
						<td colspan="3" class="bg-slate-50/50 px-6 py-6 text-center text-sm italic text-[#6f4e37]/50">
							Belum ada riwayat presensi.
						</td>
					</tr>
				{:else}
					{#each presensiState.riwayat as row (row.id)}
						<tr class="transition-colors hover:bg-orange-50/50">
							<td class="whitespace-nowrap px-6 py-4 font-medium text-[#6f4e37]">
								{row.tanggalLabel}
							</td>
							<td class="px-6 py-4 font-mono">{row.jam}</td>
							<td class="px-6 py-4">
								<StatusBadge status={row.status} />
								{#if row.status === StatusPresensi.Hadir && row.lokasi}
									<span class="mt-1 block text-xs text-[#6f4e37]/60">
										{formatLokasi(row.lokasi)}
									</span>
								{:else if row.bukti}
									<span class="mt-1 block max-w-[220px] truncate text-xs text-[#6f4e37]/60" title={row.bukti.nama}>
										{row.bukti.nama}
									</span>
								{:else if row.status === StatusPresensi.Alpa}
									<span class="mt-1 block text-xs text-[#6f4e37]/60">Tidak ada presensi</span>
								{/if}
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
