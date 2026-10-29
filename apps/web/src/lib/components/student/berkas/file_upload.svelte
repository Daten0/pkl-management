<script lang="ts">
	let { label, id }: { label: string; id: string } = $props();

	let file = $state<File | null>(null);
	let isDragging = $state(false);
	let uploadStatus = $state<'idle' | 'uploading' | 'success' | 'error'>('idle');
	let progress = $state(0);
	let errorMessage = $state('');
	let inputEl = $state<HTMLInputElement>();

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const hintId = $derived(`${id}-hint`);
	const errorId = $derived(`${id}-error`);

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			validateAndSetFile(e.dataTransfer.files[0]);
		}
	}

	function handleFileSelect(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			validateAndSetFile(target.files[0]);
			if (!file) target.value = '';
		}
	}

	function validateAndSetFile(selectedFile: File) {
		errorMessage = '';
		if (selectedFile.type !== 'application/pdf') {
			errorMessage = 'Format file tidak valid. Harap unggah file .pdf';
			return;
		}
		if (selectedFile.size > MAX_FILE_SIZE) {
			errorMessage = 'Ukuran file terlalu besar. Maksimal 5MB.';
			return;
		}
		file = selectedFile;
		uploadStatus = 'idle';
	}

	function removeFile() {
		file = null;
		uploadStatus = 'idle';
		progress = 0;
		errorMessage = '';
		if (inputEl) inputEl.value = '';
	}

	async function uploadFile() {
		if (!file) return;

		uploadStatus = 'uploading';
		progress = 0;
		errorMessage = '';

		// Simulasi proses upload (Ganti dengan fetch ke endpoint Bun/Hono)
		try {
			for (let i = 0; i <= 100; i += 10) {
				await new Promise((resolve) => setTimeout(resolve, 200));
				progress = i;

				// Simulasi kegagalan jaringan secara acak (10% chance) untuk testing tombol Retry
				if (i === 60 && Math.random() < 0.1) {
					throw new Error('Koneksi terputus');
				}
			}
			uploadStatus = 'success';
		} catch (error) {
			uploadStatus = 'error';
			errorMessage = 'Gagal mengunggah file. Silakan periksa jaringan Anda.';
		}
	}
</script>

<div class="mb-6 rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
	<h2 class="mb-4 text-base font-bold text-[#6f4e37] sm:text-lg">{label}</h2>

	{#if !file}
		<label
			for={id}
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			class="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 sm:p-8 {isDragging
				? 'border-orange-500 bg-orange-50'
				: 'border-[#e6d9cc] bg-[#f4ebe1]/40 hover:bg-[#f4ebe1]'}"
		>
			<svg
				class="mb-3 h-10 w-10 text-orange-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				></path>
			</svg>
			<p class="text-sm font-medium text-[#6f4e37]">Klik untuk upload atau drag and drop</p>
			<p id={hintId} class="mt-1 text-xs text-[#8c6b54]">Hanya format PDF (Maks. 5MB)</p>
			<input
				bind:this={inputEl}
				type="file"
				{id}
				accept=".pdf"
				class="sr-only"
				aria-describedby={errorMessage ? `${hintId} ${errorId}` : hintId}
				onchange={handleFileSelect}
			/>
		</label>

		{#if errorMessage}
			<p id={errorId} role="alert" class="mt-2 text-sm text-red-600">{errorMessage}</p>
		{/if}
	{:else}
		<div class="rounded-lg border border-[#e6d9cc] bg-[#f4ebe1]/30 p-3 sm:p-4">
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex min-w-0 items-center gap-3">
					<svg class="h-8 w-8 shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zM15 12h-2v3h-1.5V9H15v3zm4-1.5h-2.5V12H18v1.5h-1.5V15H15V9h4v1.5zM7.5 10.5h-2V12h2v-1.5z"
						></path>
					</svg>
					<div class="min-w-0">
						<p class="truncate text-sm font-medium text-[#6f4e37]">{file.name}</p>
						<p class="text-xs text-[#8c6b54]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
					</div>
				</div>

				<div class="flex flex-col gap-2 sm:flex-row">
					{#if uploadStatus === 'idle'}
						<button
							type="button"
							onclick={uploadFile}
							class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
						>
							Upload
						</button>
					{/if}

					{#if uploadStatus === 'error'}
						<button
							type="button"
							onclick={uploadFile}
							class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
						>
							Retry
						</button>
					{/if}

					{#if uploadStatus !== 'uploading'}
						<button
							type="button"
							onclick={removeFile}
							class="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#e6d9cc] bg-white px-4 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
						>
							Hapus File
						</button>
					{/if}
				</div>
			</div>

			{#if uploadStatus === 'uploading'}
				<div
					role="progressbar"
					aria-label={`Progres unggah ${label}`}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuenow={progress}
					class="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#e6d9cc]"
				>
					<div
						class="h-2.5 rounded-full bg-orange-500 transition-all duration-300 ease-out"
						style="width: {progress}%"
					></div>
				</div>
				<p class="mt-1 text-right text-xs text-[#8c6b54]">{progress}% mengunggah...</p>
			{/if}

			{#if uploadStatus === 'error'}
				<p id={errorId} role="alert" class="mt-2 text-sm text-red-600">{errorMessage}</p>
			{/if}

			{#if uploadStatus === 'success'}
				<div
					role="status"
					aria-live="polite"
					class="mt-3 flex items-center rounded bg-green-50 p-2 text-sm text-green-600"
				>
					<svg class="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
					Berhasil diunggah! Berkas sudah tersedia untuk preview penilaian.
				</div>
			{/if}
		</div>
	{/if}
</div>
