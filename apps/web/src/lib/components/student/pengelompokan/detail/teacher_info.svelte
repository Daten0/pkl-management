<script lang="ts">
	let { teacher }: {
		teacher: { nama: string; nip: string; phone: string } | null;
	} = $props();
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-5 flex flex-col gap-5">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
		Informasi Guru Pembimbing
	</h2>

	{#if teacher}
		<div class="flex flex-col gap-1.5">
			<span class="text-sm font-medium text-[#6f4e37]/80">Nama Lengkap</span>
			<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37] font-medium">
				{teacher.nama}
			</div>
		</div>
		
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1.5">
				<span class="text-sm font-medium text-[#6f4e37]/80">NIP</span>
				<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37]">
					{teacher.nip}
				</div>
			</div>
			<div class="flex flex-col gap-1.5">
				<span class="text-sm font-medium text-[#6f4e37]/80">No. Telepon</span>
				<div class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37]">
					{teacher.phone}
				</div>
			</div>
		</div>
	{:else}
		<div class="py-8 text-center text-sm text-[#6f4e37]/50 italic border-2 border-dashed border-[#e6d9cc] rounded-lg bg-white/50">
			Guru pembimbing belum ditetapkan oleh Admin.
		</div>
	{/if}
</div>
