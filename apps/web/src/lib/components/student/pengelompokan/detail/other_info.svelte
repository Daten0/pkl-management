<script lang="ts">
	let { status }: { status: 'Diverifikasi' | 'Pending' | 'Dibatalkan' | 'Belum Dikirim' } = $props();

	const statusBadgeClass = $derived.by(() => {
		switch (status) {
			case 'Diverifikasi': return 'bg-green-50 text-green-700 border-green-200';
			case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
			case 'Dibatalkan': return 'bg-red-50 text-red-700 border-red-200';
			default: return 'bg-[#f4ebe1] text-[#6f4e37] border-[#e6d9cc]';
		}
	});
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-5 flex flex-col gap-5">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		Informasi Lain
	</h2>

	<div class="flex flex-col gap-2">
		<span class="text-sm font-medium text-[#6f4e37]/80">Status Pengajuan</span>
		<div class="w-full px-4 py-3 bg-white border border-[#e6d9cc] rounded-lg flex items-center justify-between">
			<span class="text-sm text-[#6f4e37]/70">Status saat ini:</span>
			<span class={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md border ${statusBadgeClass}`}>
				{status}
			</span>
		</div>
	</div>

	<div class="flex flex-col gap-2 mt-2">
		<span class="text-sm font-medium text-[#6f4e37]/80">Dokumen Cetak</span>
		
		<button class="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e6d9cc] hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 text-[#6f4e37] text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e6d9cc] disabled:hover:text-[#6f4e37]" disabled={status !== 'Diverifikasi'}>
			<span class="flex items-center gap-2">
				<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
				Surat Pengantar PKL
			</span>
			<svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
		</button>

		<button class="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e6d9cc] hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 text-[#6f4e37] text-sm font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#e6d9cc] disabled:hover:text-[#6f4e37]" disabled={status !== 'Diverifikasi'}>
			<span class="flex items-center gap-2">
				<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
				Surat Pengantar Pembimbing
			</span>
			<svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
		</button>
	</div>
</div>
