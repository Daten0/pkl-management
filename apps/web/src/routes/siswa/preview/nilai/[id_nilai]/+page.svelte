<script lang="ts">
	import { page } from '$app/state';
	import PreviewDokumen from '#lib/components/nilai/preview_dokumen.svelte';
	import type { NilaiDokumen } from '#lib/types/nilai.ts';

	const UUID_V7_RE =
		/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	let idNilai = $derived(page.params.id_nilai ?? '');
	let idValid = $derived(UUID_V7_RE.test(idNilai));
	let nilai = $derived(idValid ? buatDokumenNilai(idNilai) : null);

	function buatDokumenNilai(id: string): NilaiDokumen {
		return {
			id,
			nomorDokumen: `NILAI/${id.slice(0, 8).toUpperCase()}/PKL/2026`,
			siswa: {
				nama: 'Muhammad Siddiq Febri Nusantara',
				nisn: '0051234567',
				kelas: 'XII RPL 1',
				programKeahlian: 'Rekayasa Perangkat Lunak'
			},
			pkl: {
				mitra: 'PT. Telkom Indonesia Witel Makassar',
				periode: '15 Agustus 2026 – 15 November 2026',
				pembimbing: 'Bapak Muh. Ilham, S.Pd., M.T.',
				guruPembimbing: 'Ibu Ainun Nida Rifqi, S.Psi., M.Psi.T.'
			},
			rincian: [
				{
					id: 'aspek-1',
					aspek: 'Kehadiran dan Disiplin',
					nilai: 95,
					keterangan: 'Sangat baik'
				},
				{
					id: 'aspek-2',
					aspek: 'Kemampuan Teknis',
					nilai: 92,
					keterangan: 'Sangat baik'
				},
				{
					id: 'aspek-3',
					aspek: 'Tanggung Jawab',
					nilai: 94,
					keterangan: 'Sangat baik'
				},
				{
					id: 'aspek-4',
					aspek: 'Kerja Sama Tim',
					nilai: 90,
					keterangan: 'Baik'
				},
				{
					id: 'aspek-5',
					aspek: 'Laporan PKL',
					nilai: 89,
					keterangan: 'Baik'
				}
			],
			nilaiAkhir: 92,
			predikat: 'Sangat Baik',
			tanggalTerbit: '29 Oktober 2026'
		};
	}

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>Preview Dokumen Nilai</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl space-y-6 print:max-w-none print:space-y-0">
	<div class="mx-auto w-full max-w-5xl space-y-6 print:max-w-none print:space-y-0">
		<header class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6 print:hidden">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div class="min-w-0">
					<h1 class="text-xl font-bold text-[#6f4e37] sm:text-2xl">Preview Dokumen Nilai</h1>
					<p class="mt-1 text-sm text-[#8c6b54]">
						Pratinjau dokumen hasil penilaian PKL sebelum dicetak atau disimpan sebagai PDF.
					</p>
					<p class="mt-2 break-all font-mono text-xs text-[#6f4e37]/60">
						ID Nilai: {idNilai || '—'}
					</p>
				</div>

				<div class="flex flex-col gap-2 sm:flex-row">
					<a
						href="/siswa/preview"
						class="inline-flex h-11 items-center justify-center rounded-lg border border-[#e6d9cc] bg-white px-4 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
					>
						Kembali
					</a>
					<button
						type="button"
						onclick={handlePrint}
						class="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
							></path>
						</svg>
						Cetak / Simpan PDF
					</button>
				</div>
			</div>
		</header>

		{#if nilai}
			<PreviewDokumen {nilai} />
		{:else}
			<div role="alert" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:p-6">
				<p class="font-semibold">ID nilai tidak valid.</p>
				<p class="mt-1">
					Parameter <span class="break-all font-mono">{idNilai || '(kosong)'}</span> harus berupa
					UUIDv7.
				</p>
			</div>
		{/if}
	</div>
</div>
