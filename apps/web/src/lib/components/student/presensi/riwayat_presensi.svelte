<script lang="ts">
	import StatusBadge from './status_badge.svelte';
	import { presensiState } from '#lib/state/student/presensi.svelte.ts';
	import { StatusPresensi, type RiwayatPresensi } from '#lib/types/student/presensi.ts';
	import { formatLokasi } from '#lib/utils/student/geolocation.ts';

	const BARIS_PER_HALAMAN = 5;
	const MAKS_TOMBOL_HALAMAN = 5;

	let currentPage = $state(1);

	let totalBaris = $derived(presensiState.riwayat.length);
	let totalPages = $derived(Math.max(1, Math.ceil(totalBaris / BARIS_PER_HALAMAN)));
	let halamanAktif = $derived(Math.min(currentPage, totalPages));
	let awalBaris = $derived((halamanAktif - 1) * BARIS_PER_HALAMAN);
	let barisHalaman = $derived(
		presensiState.riwayat.slice(awalBaris, awalBaris + BARIS_PER_HALAMAN)
	);
	let akhirBaris = $derived(Math.min(awalBaris + barisHalaman.length, totalBaris));

	let nomorHalaman = $derived.by(() => {
		const jumlahTombol = Math.min(MAKS_TOMBOL_HALAMAN, totalPages);
		let mulai = Math.max(1, halamanAktif - Math.floor(jumlahTombol / 2));
		mulai = Math.min(mulai, totalPages - jumlahTombol + 1);

		return Array.from({ length: jumlahTombol }, (_, index) => mulai + index);
	});

	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
		if (currentPage < 1) currentPage = 1;
	});

	function keHalaman(nomor: number) {
		currentPage = Math.min(Math.max(nomor, 1), totalPages);
	}

	function handleCetak() {
		window.print();
	}
</script>

{#snippet barisRiwayat(row: RiwayatPresensi)}
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
{/snippet}

<div class="rounded-xl bg-white border border-[#e6d9cc] p-6 shadow-sm">
	<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
		<h3 class="text-lg font-bold text-[#6f4e37]">Riwayat Presensi</h3>
		<button
			type="button"
			onclick={handleCetak}
			class="flex items-center gap-2 rounded-lg bg-white border border-[#e6d9cc] px-4 py-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] print:hidden"
		>
			<svg class="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
			</svg>
			Cetak Riwayat
		</button>
	</div>

	<div class="overflow-x-auto rounded-lg border border-[#e6d9cc] print:hidden">
		<table class="w-full text-left text-sm text-[#6f4e37]">
			<thead class="bg-[#f4ebe1] text-xs uppercase text-[#6f4e37]">
				<tr>
					<th scope="col" class="px-6 py-3">Tanggal</th>
					<th scope="col" class="px-6 py-3">Jam (WITA)</th>
					<th scope="col" class="px-6 py-3">Status Kehadiran</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#e6d9cc]">
				{#if totalBaris === 0}
					<tr>
						<td colspan="3" class="bg-slate-50/50 px-6 py-6 text-center text-sm italic text-[#6f4e37]/50">
							Belum ada riwayat presensi.
						</td>
					</tr>
				{:else}
					{#each barisHalaman as row (row.id)}
						{@render barisRiwayat(row)}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	{#if totalBaris > 0}
		<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
			<p class="text-sm text-[#6f4e37]/70">
				Menampilkan {awalBaris + 1}–{akhirBaris} dari {totalBaris} riwayat · Halaman
				{halamanAktif} dari {totalPages}
			</p>

			{#if totalPages > 1}
				<nav class="flex flex-wrap items-center gap-1.5" aria-label="Navigasi halaman riwayat presensi">
					<button
						type="button"
						onclick={() => keHalaman(1)}
						disabled={halamanAktif === 1}
						aria-label="Ke halaman pertama"
						class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-[#e6d9cc] bg-white px-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] disabled:cursor-not-allowed disabled:opacity-40"
					>
						«
					</button>
					<button
						type="button"
						onclick={() => keHalaman(halamanAktif - 1)}
						disabled={halamanAktif === 1}
						aria-label="Halaman sebelumnya"
						class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-[#e6d9cc] bg-white px-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] disabled:cursor-not-allowed disabled:opacity-40"
					>
						‹
					</button>

					{#each nomorHalaman as nomor (nomor)}
						<button
							type="button"
							onclick={() => keHalaman(nomor)}
							aria-label={`Halaman ${nomor}`}
							aria-current={nomor === halamanAktif ? 'page' : undefined}
							class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors {nomor ===
							halamanAktif
								? 'border-orange-500 bg-orange-500 text-white'
								: 'border-[#e6d9cc] bg-white text-[#6f4e37] hover:bg-[#f4ebe1]'}"
						>
							{nomor}
						</button>
					{/each}

					<button
						type="button"
						onclick={() => keHalaman(halamanAktif + 1)}
						disabled={halamanAktif === totalPages}
						aria-label="Halaman berikutnya"
						class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-[#e6d9cc] bg-white px-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] disabled:cursor-not-allowed disabled:opacity-40"
					>
						›
					</button>
					<button
						type="button"
						onclick={() => keHalaman(totalPages)}
						disabled={halamanAktif === totalPages}
						aria-label="Ke halaman terakhir"
						class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-[#e6d9cc] bg-white px-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] disabled:cursor-not-allowed disabled:opacity-40"
					>
						»
					</button>
				</nav>
			{/if}
		</div>
	{/if}

	<div class="hidden print:block">
		<table class="w-full text-left text-sm text-[#6f4e37]">
			<thead class="bg-[#f4ebe1] text-xs uppercase text-[#6f4e37]">
				<tr>
					<th scope="col" class="px-6 py-3">Tanggal</th>
					<th scope="col" class="px-6 py-3">Jam (WITA)</th>
					<th scope="col" class="px-6 py-3">Status Kehadiran</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#e6d9cc]">
				{#each presensiState.riwayat as row (row.id)}
					{@render barisRiwayat(row)}
				{/each}
			</tbody>
		</table>
	</div>
</div>
