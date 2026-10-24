<script lang="ts">
	import type { MitraPkl } from '#lib/types/student/mitra.ts';

	let {
		mitraList,
		initialSelection,
		onConfirm,
		onClose
	}: {
		mitraList: MitraPkl[];
		initialSelection: MitraPkl | null;
		onConfirm: (mitra: MitraPkl) => void;
		onClose: () => void;
	} = $props();

	let dialogEl = $state<HTMLDialogElement>();
	let draftSelection = $state<MitraPkl | null>(null);

	$effect(() => {
		if (dialogEl && !dialogEl.open) {
			draftSelection = initialSelection;
			dialogEl.showModal();
		}
	});

	function closeDialog() {
		dialogEl?.close();
	}

	function confirmSelection() {
		if (!draftSelection) return;

		onConfirm(draftSelection);
		dialogEl?.close();
	}
</script>

<dialog
	bind:this={dialogEl}
	aria-labelledby="mitra-modal-title"
	onclose={onClose}
	onclick={(e) => {
		if (e.target === dialogEl) closeDialog();
	}}
	class="m-auto w-[calc(100%_-_2rem)] max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-[#e6d9cc] bg-white p-0 text-[#6f4e37] shadow-2xl backdrop:bg-[#6f4e37]/50 backdrop:backdrop-blur-sm"
>
	<div class="flex max-h-[85vh] flex-col">
		<div class="flex items-center justify-between p-5 border-b border-[#e6d9cc]">
			<h3 id="mitra-modal-title" class="text-lg font-semibold text-[#6f4e37]">Pilih Mitra PKL</h3>
			<button
				type="button"
				onclick={closeDialog}
				aria-label="Tutup"
				class="text-[#6f4e37]/60 hover:bg-orange-50 hover:text-orange-600 p-1.5 rounded-lg transition-colors"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>

		<div class="flex-1 min-h-0 p-5 overflow-y-auto">
			<div class="overflow-x-auto border border-[#e6d9cc] rounded-lg">
				<table class="w-full text-sm text-left text-[#6f4e37]">
					<thead class="text-xs uppercase bg-[#f4ebe1] border-b border-[#e6d9cc] text-[#6f4e37]">
						<tr>
							<th scope="col" class="px-4 py-3">Nama Tempat</th>
							<th scope="col" class="px-4 py-3">Kompetensi Keahlian</th>
							<th scope="col" class="px-4 py-3">Alamat</th>
							<th scope="col" class="px-4 py-3 text-center">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#e6d9cc]">
						{#if mitraList.length === 0}
							<tr>
								<td colspan="4" class="px-4 py-6 text-center text-sm text-[#6f4e37]/50 italic">
									Tidak ada mitra PKL yang cocok.
								</td>
							</tr>
						{:else}
							{#each mitraList as mitra (mitra.id)}
								{@const isSelected = draftSelection?.id === mitra.id}
								<tr class="{isSelected ? 'bg-orange-50' : 'hover:bg-orange-50/50'} transition-colors">
									<td class="px-4 py-3 font-medium text-[#6f4e37]">{mitra.namaTempat}</td>
									<td class="px-4 py-3">{mitra.kompetensiKeahlian}</td>
									<td class="px-4 py-3 text-[#6f4e37]/70">{mitra.alamat}</td>
									<td class="px-4 py-3 text-center">
										{#if isSelected}
											<button
												type="button"
												onclick={() => (draftSelection = null)}
												aria-label={`Batalkan pilihan ${mitra.namaTempat}`}
												class="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-bold"
											>
												−
											</button>
										{:else}
											<button
												type="button"
												onclick={() => (draftSelection = mitra)}
												aria-label={`Pilih ${mitra.namaTempat}`}
												class="inline-flex items-center justify-center w-8 h-8 rounded-md bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors font-bold"
											>
												+
											</button>
										{/if}
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>

		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-[#e6d9cc] bg-slate-50 rounded-b-xl">
			<div class="flex flex-wrap items-center gap-2 text-xs text-[#6f4e37]/70">
				{#if draftSelection}
					<span>Dipilih: <span class="font-semibold text-[#6f4e37]">{draftSelection.namaTempat}</span></span>
					<button
						type="button"
						onclick={() => (draftSelection = null)}
						class="text-red-600 hover:underline"
					>
						Batalkan pilihan
					</button>
				{:else}
					<span>Belum ada lokasi dipilih.</span>
				{/if}
			</div>

			<div class="flex justify-end gap-2">
				<button
					type="button"
					onclick={closeDialog}
					class="px-4 py-2 text-sm font-medium text-[#6f4e37] bg-white border border-[#e6d9cc] hover:bg-[#f4ebe1] rounded-lg shadow-sm transition-colors"
				>
					Batal
				</button>
				<button
					type="button"
					onclick={confirmSelection}
					disabled={!draftSelection}
					class="px-5 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
				>
					Simpan Lokasi
				</button>
			</div>
		</div>
	</div>
</dialog>
