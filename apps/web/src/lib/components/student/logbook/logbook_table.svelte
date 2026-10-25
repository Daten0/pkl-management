<script lang="ts">
	import type { LogbookEntry } from '#lib/types/student/logbook.ts';

	let {
		logs,
		onEdit,
		onDelete
	}: {
		logs: LogbookEntry[];
		onEdit: (log: LogbookEntry) => void;
		onDelete: (id: number) => void;
	} = $props();

	const BARIS_PER_HALAMAN = 5;
	const MAKS_TOMBOL_HALAMAN = 5;

	let currentPage = $state(1);

	let totalBaris = $derived(logs.length);
	let totalPages = $derived(Math.max(1, Math.ceil(totalBaris / BARIS_PER_HALAMAN)));
	let halamanAktif = $derived(Math.min(currentPage, totalPages));
	let awalBaris = $derived((halamanAktif - 1) * BARIS_PER_HALAMAN);
	let barisHalaman = $derived(logs.slice(awalBaris, awalBaris + BARIS_PER_HALAMAN));
	let akhirBaris = $derived(Math.min(awalBaris + barisHalaman.length, totalBaris));

	let nomorHalaman = $derived.by(() => {
		const jumlahTombol = Math.min(MAKS_TOMBOL_HALAMAN, totalPages);
		let mulai = Math.max(1, halamanAktif - Math.floor(jumlahTombol / 2));
		mulai = Math.min(mulai, totalPages - jumlahTombol + 1);

		return Array.from({ length: jumlahTombol }, (_, index) => mulai + index);
	});

	// Jaga posisi halaman tetap valid saat data/filter berubah
	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
		if (currentPage < 1) currentPage = 1;
	});

	function keHalaman(nomor: number) {
		currentPage = Math.min(Math.max(nomor, 1), totalPages);
	}
</script>

{#snippet barisLog(log: LogbookEntry)}
	<tr class="transition-colors hover:bg-orange-50/50">
		<td class="px-4 py-3">{log.tanggal}</td>
		<td class="px-4 py-3 font-medium text-[#6f4e37]">{log.nama}</td>
		<td class="px-4 py-3">{log.jam}</td>
		<td class="px-4 py-3 text-center">
			<button
				type="button"
				onclick={() => onEdit(log)}
				class="mr-2 text-orange-600 hover:text-orange-700 hover:underline"
			>
				Edit
			</button>
			<button
				type="button"
				onclick={() => onDelete(log.id)}
				class="text-red-600 hover:text-red-700 hover:underline"
			>
				Hapus
			</button>
		</td>
	</tr>
{/snippet}

<div class="overflow-x-auto rounded-lg border border-[#e6d9cc] print:hidden">
	<table class="w-full min-w-[640px] text-left text-sm text-[#6f4e37]">
		<thead class="bg-[#f4ebe1] text-[#6f4e37]">
			<tr>
				<th scope="col" class="px-4 py-3 font-semibold">Tanggal</th>
				<th scope="col" class="px-4 py-3 font-semibold">Nama Aktivitas</th>
				<th scope="col" class="px-4 py-3 font-semibold">Jam</th>
				<th scope="col" class="px-4 py-3 text-center font-semibold">Aksi</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-[#e6d9cc] bg-white">
			{#if totalBaris === 0}
				<tr>
					<td colspan="4" class="bg-slate-50/50 px-4 py-8 text-center text-[#6f4e37]/60">
						Belum ada aktivitas yang dicatat.
					</td>
				</tr>
			{:else}
				{#each barisHalaman as log (log.id)}
					{@render barisLog(log)}
				{/each}
			{/if}
		</tbody>
	</table>
</div>

{#if totalBaris > 0}
	<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
		<p class="text-sm text-[#6f4e37]/70">
			Menampilkan {awalBaris + 1}–{akhirBaris} dari {totalBaris} aktivitas · Halaman
			{halamanAktif} dari {totalPages}
		</p>

		{#if totalPages > 1}
			<nav class="flex flex-wrap items-center gap-1.5" aria-label="Navigasi halaman logbook aktivitas">
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
		<thead class="bg-[#f4ebe1] text-[#6f4e37]">
			<tr>
				<th scope="col" class="px-4 py-3 font-semibold">Tanggal</th>
				<th scope="col" class="px-4 py-3 font-semibold">Nama Aktivitas</th>
				<th scope="col" class="px-4 py-3 font-semibold">Jam</th>
				<th scope="col" class="px-4 py-3 font-semibold">Deskripsi</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-[#e6d9cc]">
			{#each logs as log (log.id)}
				<tr>
					<td class="px-4 py-3">{log.tanggal}</td>
					<td class="px-4 py-3 font-medium text-[#6f4e37]">{log.nama}</td>
					<td class="px-4 py-3">{log.jam}</td>
					<td class="px-4 py-3">{log.deskripsi}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
