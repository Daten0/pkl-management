<script lang="ts">
	import type { AspekPenilaian, NilaiDokumen } from '#lib/types/nilai.ts';

	let { nilai }: { nilai: NilaiDokumen } = $props();

	const BARIS_PER_HALAMAN = 5;
	const MAKS_TOMBOL_HALAMAN = 5;

	let currentPage = $state(1);

	let totalBaris = $derived(nilai.rincian.length);
	let totalPages = $derived(Math.max(1, Math.ceil(totalBaris / BARIS_PER_HALAMAN)));
	let halamanAktif = $derived(Math.min(currentPage, totalPages));
	let awalBaris = $derived((halamanAktif - 1) * BARIS_PER_HALAMAN);
	let barisHalaman = $derived(nilai.rincian.slice(awalBaris, awalBaris + BARIS_PER_HALAMAN));
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
</script>

{#snippet barisNilai(row: AspekPenilaian)}
	<tr class="transition-colors hover:bg-orange-50/50">
		<td class="px-4 py-3 font-medium text-[#6f4e37]">{row.aspek}</td>
		<td class="px-4 py-3 text-center tabular-nums">{row.nilai}</td>
		<td class="px-4 py-3 text-[#8c6b54]">{row.keterangan ?? '-'}</td>
	</tr>
{/snippet}

<article
	class="mx-auto w-full max-w-[210mm] rounded-xl border border-[#e6d9cc] bg-white p-6 shadow-sm sm:p-10 lg:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none"
>
	<header class="border-b-2 border-orange-500 pb-5 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c6b54]">
			SIM-PKL SMK Negeri 6 Makassar
		</p>
		<h2 class="mt-2 text-lg font-bold uppercase tracking-wide text-[#6f4e37] sm:text-xl">
			Laporan Hasil Penilaian Praktik Kerja Lapangan
		</h2>
		<p class="mt-2 break-all font-mono text-xs text-[#8c6b54]">
			No. {nilai.nomorDokumen}
		</p>
	</header>

	<section class="mt-6" aria-labelledby="identitas-siswa">
		<h3 id="identitas-siswa" class="text-sm font-bold uppercase tracking-wide text-orange-500">
			Identitas Siswa
		</h3>
		<dl class="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Nama</dt>
				<dd class="mt-0.5 font-semibold text-[#6f4e37]">{nilai.siswa.nama}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">NISN</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.siswa.nisn}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Kelas</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.siswa.kelas}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Program Keahlian</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.siswa.programKeahlian}</dd>
			</div>
		</dl>
	</section>

	<section class="mt-6" aria-labelledby="informasi-pkl">
		<h3 id="informasi-pkl" class="text-sm font-bold uppercase tracking-wide text-orange-500">
			Informasi PKL
		</h3>
		<dl class="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Mitra PKL</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.pkl.mitra}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Periode</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.pkl.periode}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Pembimbing Lapangan</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.pkl.pembimbing}</dd>
			</div>
			<div>
				<dt class="text-xs font-medium uppercase text-[#8c6b54]">Guru Pembimbing</dt>
				<dd class="mt-0.5 text-[#6f4e37]">{nilai.pkl.guruPembimbing}</dd>
			</div>
		</dl>
	</section>

	<section class="mt-8" aria-labelledby="rincian-nilai">
		<h3 id="rincian-nilai" class="text-sm font-bold uppercase tracking-wide text-orange-500">
			Rincian Nilai
		</h3>

		<div class="mt-3 overflow-x-auto rounded-lg border border-[#e6d9cc] print:hidden">
			<table class="w-full min-w-[480px] text-left text-sm text-[#6f4e37]">
				<thead class="bg-[#f4ebe1] text-xs uppercase text-[#6f4e37]">
					<tr>
						<th scope="col" class="px-4 py-3">Aspek Penilaian</th>
						<th scope="col" class="px-4 py-3 text-center">Nilai</th>
						<th scope="col" class="px-4 py-3">Keterangan</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-[#e6d9cc]">
					{#if totalBaris === 0}
						<tr>
							<td colspan="3" class="bg-slate-50/50 px-4 py-6 text-center text-sm italic text-[#6f4e37]/50">
								Belum ada rincian nilai.
							</td>
						</tr>
					{:else}
						{#each barisHalaman as row (row.id)}
							{@render barisNilai(row)}
						{/each}
					{/if}
				</tbody>
			</table>
		</div>

		{#if totalBaris > 0}
			<div class="mt-3 flex flex-col gap-3 text-xs text-[#8c6b54] sm:flex-row sm:items-center sm:justify-between print:hidden">
				<p>
					Menampilkan {awalBaris + 1}–{akhirBaris} dari {totalBaris} aspek · Halaman
					{halamanAktif} dari {totalPages}
				</p>

				{#if totalPages > 1}
					<nav class="flex flex-wrap items-center gap-1.5" aria-label="Navigasi halaman rincian nilai">
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
			<table class="w-full border border-[#e6d9cc] text-left text-sm text-[#6f4e37]">
				<thead class="bg-[#f4ebe1] text-xs uppercase text-[#6f4e37]">
					<tr>
						<th scope="col" class="border border-[#e6d9cc] px-4 py-3">Aspek Penilaian</th>
						<th scope="col" class="border border-[#e6d9cc] px-4 py-3 text-center">Nilai</th>
						<th scope="col" class="border border-[#e6d9cc] px-4 py-3">Keterangan</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-[#e6d9cc]">
					{#each nilai.rincian as row (row.id)}
						<tr>
							<td class="border border-[#e6d9cc] px-4 py-3 font-medium">{row.aspek}</td>
							<td class="border border-[#e6d9cc] px-4 py-3 text-center tabular-nums">{row.nilai}</td>
							<td class="border border-[#e6d9cc] px-4 py-3">{row.keterangan ?? '-'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Ringkasan nilai">
		<div class="rounded-xl border border-[#e6d9cc] bg-[#f4ebe1]/50 p-4">
			<p class="text-xs font-medium uppercase tracking-wide text-[#8c6b54]">Nilai Akhir</p>
			<p class="mt-1 text-3xl font-bold tabular-nums text-orange-500">{nilai.nilaiAkhir}</p>
		</div>
		<div class="rounded-xl border border-[#e6d9cc] bg-[#f4ebe1]/50 p-4">
			<p class="text-xs font-medium uppercase tracking-wide text-[#8c6b54]">Predikat</p>
			<p class="mt-1 text-2xl font-bold text-[#6f4e37]">{nilai.predikat}</p>
		</div>
	</section>

	<footer class="mt-10 flex flex-col gap-8 border-t border-[#e6d9cc] pt-6 text-sm text-[#6f4e37] sm:flex-row sm:justify-between">
		<div>
			<p>Mengetahui,</p>
			<p class="font-medium">Pembimbing Lapangan</p>
			<div class="h-16" aria-hidden="true"></div>
			<p class="font-semibold">{nilai.pkl.pembimbing}</p>
		</div>
		<div class="sm:text-right">
			<p>Makassar, {nilai.tanggalTerbit}</p>
			<p class="font-medium">Guru Pembimbing</p>
			<div class="h-16" aria-hidden="true"></div>
			<p class="font-semibold">{nilai.pkl.guruPembimbing}</p>
		</div>
	</footer>
</article>

<style>
	@media print {
		@page {
			size: A4 portrait;
			margin: 12mm;
		}

		:global(body) {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			background-color: white !important;
		}
	}
</style>
