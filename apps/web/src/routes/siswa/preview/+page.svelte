<script lang="ts">
	import DocumentCard from '#lib/components/student/nilai/document_card.svelte';
	import { CONTOH_ID_NILAI } from '#lib/constants/nilai.ts';

	// Nilai UUIDv7 dari state/database
	let idNilai = CONTOH_ID_NILAI;
	let idSertifikat = '018f3a3c-8c4b-8c4b-8c4b-8c4b8c4b8c4b';
</script>

<!-- Mendefinisikan raw SVG sebagai Svelte 5 Snippets -->
{#snippet fileSvg()}
	<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
		<polyline points="14 2 14 8 20 8"/>
		<line x1="16" x2="8" y1="13" y2="13"/>
		<line x1="16" x2="8" y1="17" y2="17"/>
		<line x1="10" x2="8" y1="9" y2="9"/>
	</svg>
{/snippet}

{#snippet awardSvg()}
	<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<circle cx="12" cy="8" r="7"/>
		<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
	</svg>
{/snippet}

<div class="min-h-screen bg-[#f8fafc] p-8 md:p-12">
	<div class="max-w-5xl mx-auto">
		
		<h1 class="text-[28px] font-bold text-[#1e293b] tracking-tight">
			Hasil Evaluasi PKL
		</h1>
		<p class="text-[#64748b] text-[15px] mt-2 mb-10 max-w-2xl">
			Evaluasi praktik kerja lapangan telah selesai, silahkan lihat hasil nilai dan cetak sertifikat PKL Anda di bawah ini.
		</p>

		<div class="flex flex-wrap gap-6">
			<!-- Passing snippet ke props 'icon' -->
			<DocumentCard
				title="Lihat Nilai"
				icon={fileSvg}
				href={`/siswa/preview/nilai/${idNilai}`}
			/>
			<DocumentCard
				title="Lihat Sertifikat PKL"
				icon={awardSvg}
				href={`/siswa/preview/sertifikat/${idSertifikat}`}
				rel="external"
			/>
		</div>
		
	</div>
</div>