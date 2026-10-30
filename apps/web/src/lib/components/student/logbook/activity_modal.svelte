<script lang="ts">
	import type { LogbookDraft, LogbookFormData } from '#lib/types/student/logbook.ts';
	import {
		LOGBOOK_IMAGE_ACCEPT,
		LOGBOOK_IMAGE_ERROR,
		isValidLogbookImage
	} from '#lib/utils/student/logbook_image.ts';

	let {
		isModalOpen = $bindable(),
		onSave
	}: { isModalOpen: boolean; onSave: (draft: LogbookDraft) => void } = $props();

	let formData = $state<LogbookFormData>({
		nama: '',
		jam: '',
		deskripsi: '',
		dokumentasi: null
	});

	let fileInput: HTMLInputElement | undefined = $state();
	let fileError = $state('');

	function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0] ?? null;

		if (!file) {
			formData.dokumentasi = null;
			fileError = '';
			return;
		}

		if (!isValidLogbookImage(file)) {
			formData.dokumentasi = null;
			fileError = LOGBOOK_IMAGE_ERROR;
			input.value = '';
			return;
		}

		formData.dokumentasi = file;
		fileError = '';
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onSave({ ...formData });

		// Reset form dan tutup modal
		formData = { nama: '', jam: '', deskripsi: '', dokumentasi: null };
		fileError = '';
		if (fileInput) fileInput.value = '';
		isModalOpen = false;
	}
</script>

{#if isModalOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="activity-modal-title"
			class="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-4 shadow-lg sm:p-6"
		>
			<h3 id="activity-modal-title" class="mb-4 text-lg font-bold text-[#6f4e37]">Tambah Aktivitas PKL</h3>

			<form onsubmit={handleSubmit} class="space-y-4">
				<div>
					<label class="mb-1 block text-sm font-medium text-[#6f4e37]" for="nama">Nama Aktivitas</label>
					<input
						type="text"
						id="nama"
						bind:value={formData.nama}
						required
						class="w-full rounded-lg border border-[#e6d9cc] p-2 text-[#6f4e37] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-[#6f4e37]" for="jam">Jam Kegiatan</label>
					<input
						type="time"
						id="jam"
						bind:value={formData.jam}
						required
						class="w-full rounded-lg border border-[#e6d9cc] p-2 text-[#6f4e37] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-[#6f4e37]" for="deskripsi">Deskripsi</label>
					<textarea
						id="deskripsi"
						bind:value={formData.deskripsi}
						required
						rows="3"
						class="w-full rounded-lg border border-[#e6d9cc] p-2 text-[#6f4e37] focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
					></textarea>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-[#6f4e37]" for="file"
						>Dokumentasi (JPEG/PNG, Opsional)</label
					>
					<input
						bind:this={fileInput}
						onchange={handleFileChange}
						type="file"
						id="file"
						accept={LOGBOOK_IMAGE_ACCEPT}
						aria-invalid={fileError ? 'true' : undefined}
						aria-describedby={fileError ? 'file-error' : undefined}
						class="w-full text-sm text-[#6f4e37]/70 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-100"
					/>
					{#if fileError}
						<p id="file-error" class="mt-1 text-sm text-red-600" role="alert">{fileError}</p>
					{/if}
				</div>

				<div class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
					<button
						type="button"
						onclick={() => (isModalOpen = false)}
						class="w-full rounded-lg px-4 py-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] sm:w-auto"
					>
						Batal
					</button>
					<button
						type="submit"
						class="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 sm:w-auto"
					>
						Simpan Kegiatan
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
