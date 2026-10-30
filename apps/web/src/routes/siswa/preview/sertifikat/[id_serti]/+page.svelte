<script lang="ts">
	import { page } from '$app/state';
	import SertifikatHtml from '#lib/components/student/preview/sertifikat_html.svelte';

	let userId = $derived(page.params.id_serti ?? '');

	function handlePrint() {
		window.print();
	}
</script>

<svelte:head>
	<title>Preview Sertifikat PKL</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl space-y-6 print:max-w-none print:space-y-0">
	<header class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6 print:hidden">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div class="min-w-0">
				<h1 class="text-xl font-bold text-[#6f4e37] sm:text-2xl">Preview Sertifikat PKL</h1>
				<p class="mt-1 text-sm text-[#8c6b54]">
					Pratinjau sertifikat PKL sebelum dicetak atau disimpan sebagai PDF.
				</p>
				<p class="mt-2 break-all font-mono text-xs text-[#6f4e37]/60">
					ID Sertifikat: {userId || '—'}
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

	<div class="overflow-x-auto pb-2 print:overflow-visible print:pb-0">
		<SertifikatHtml {userId} />
	</div>
</div>
