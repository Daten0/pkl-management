<script lang="ts">
	let {
		open,
		memuat,
		pesanError,
		onIzinkan,
		onTutup
	}: {
		open: boolean;
		memuat: boolean;
		pesanError: string;
		onIzinkan: () => void;
		onTutup: () => void;
	} = $props();

	let dialogEl = $state<HTMLDialogElement>();

	$effect(() => {
		if (!dialogEl) return;

		if (open && !dialogEl.open) {
			dialogEl.showModal();
		} else if (!open && dialogEl.open) {
			dialogEl.close();
		}
	});

	function tutup() {
		if (memuat) return;
		onTutup();
	}
</script>

<dialog
	bind:this={dialogEl}
	aria-labelledby="judul-izin-lokasi"
	onclose={onTutup}
	oncancel={(event) => {
		if (memuat) event.preventDefault();
	}}
	onclick={(event) => {
		if (event.target === dialogEl) tutup();
	}}
	class="m-auto w-[calc(100%_-_2rem)] max-w-md max-h-[90dvh] overflow-hidden rounded-xl border border-[#e6d9cc] bg-white p-0 text-[#6f4e37] shadow-2xl backdrop:bg-[#6f4e37]/50 backdrop:backdrop-blur-sm"
>
	<div class="flex flex-col">
		<div class="flex items-center justify-between border-b border-[#e6d9cc] p-5">
			<h2 id="judul-izin-lokasi" class="flex items-center gap-2 text-lg font-bold text-[#6f4e37]">
				<svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				Akses Lokasi Diperlukan
			</h2>
			<button
				type="button"
				onclick={tutup}
				disabled={memuat}
				aria-label="Tutup"
				class="rounded-lg p-1.5 text-[#6f4e37]/60 transition-colors hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="flex flex-col gap-4 p-5">
			<p class="text-sm leading-relaxed text-[#6f4e37]/80">
				Presensi kehadiran membutuhkan akses lokasi dan GPS perangkat yang aktif. Izinkan akses
				lokasi pada browser, lalu tekan tombol di bawah.
			</p>

			{#if pesanError}
				<div class="rounded-lg border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700" role="alert">
					{pesanError}
				</div>
			{/if}

			<div class="rounded-lg border border-[#e6d9cc] bg-[#f4ebe1] p-3 text-xs leading-relaxed text-[#6f4e37]/70">
				Jika GPS perangkat belum aktif, nyalakan Location/GPS terlebih dahulu. Pada browser,
				izin lokasi dapat diubah melalui pengaturan situs.
			</div>
		</div>

		<div class="flex flex-col-reverse gap-2 border-t border-[#e6d9cc] bg-slate-50 p-4 sm:flex-row sm:justify-end">
			<button
				type="button"
				onclick={tutup}
				disabled={memuat}
				class="rounded-lg border border-[#e6d9cc] bg-white px-4 py-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] disabled:cursor-not-allowed disabled:opacity-50"
			>
				Batal
			</button>
			<button
				type="button"
				onclick={onIzinkan}
				disabled={memuat}
				class="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
			>
				{memuat ? 'Mendeteksi lokasi...' : 'Izinkan Akses Lokasi'}
			</button>
		</div>
	</div>
</dialog>
