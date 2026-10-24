<script lang="ts">
	import { StatusPresensi, type BuktiPresensi } from '#lib/types/student/presensi.ts';

	let {
		open,
		onSimpan,
		onTutup
	}: {
		open: boolean;
		onSimpan: (status: StatusPresensi.Izin | StatusPresensi.Sakit, bukti: BuktiPresensi) => void;
		onTutup: () => void;
	} = $props();

	const MAKS_UKURAN = 5 * 1024 * 1024;

	let dialogEl = $state<HTMLDialogElement>();
	let inputEl = $state<HTMLInputElement>();
	let tipe = $state<'izin' | 'sakit' | null>(null);
	let berkas = $state<File | null>(null);
	let pesanError = $state('');

	$effect(() => {
		if (!dialogEl) return;

		if (open && !dialogEl.open) {
			tipe = null;
			berkas = null;
			pesanError = '';
			if (inputEl) inputEl.value = '';
			dialogEl.showModal();
		} else if (!open && dialogEl.open) {
			dialogEl.close();
		}
	});

	function tutup() {
		onTutup();
	}

	function pilihTipe(nilai: 'izin' | 'sakit') {
		tipe = nilai;
		berkas = null;
		pesanError = '';
		if (inputEl) {
			inputEl.value = '';
			inputEl.click();
		}
	}

	function pilihBerkas(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		const tipeValid = file.type.startsWith('image/') || file.type === 'application/pdf';
		if (!tipeValid) {
			pesanError = 'Format file harus berupa gambar atau PDF.';
			berkas = null;
			target.value = '';
			return;
		}

		if (file.size > MAKS_UKURAN) {
			pesanError = 'Ukuran file maksimal 5 MB.';
			berkas = null;
			target.value = '';
			return;
		}

		berkas = file;
		pesanError = '';
	}

	function formatUkuran(ukuran: number): string {
		if (ukuran < 1024 * 1024) return `${Math.max(1, Math.round(ukuran / 1024))} KB`;
		return `${(ukuran / (1024 * 1024)).toFixed(1)} MB`;
	}

	function simpan() {
		if (!tipe) {
			pesanError = 'Pilih jenis keterangan terlebih dahulu.';
			return;
		}

		if (!berkas) {
			pesanError = 'Unggah bukti izin atau surat sakit terlebih dahulu.';
			return;
		}

		onSimpan(tipe === 'izin' ? StatusPresensi.Izin : StatusPresensi.Sakit, {
			nama: berkas.name,
			tipe: berkas.type || 'application/octet-stream',
			ukuran: berkas.size
		});
	}
</script>

<dialog
	bind:this={dialogEl}
	aria-labelledby="judul-izin-sakit"
	onclose={onTutup}
	onclick={(event) => {
		if (event.target === dialogEl) tutup();
	}}
	class="m-auto w-[calc(100%_-_2rem)] max-w-lg overflow-hidden rounded-xl border border-[#e6d9cc] bg-white p-0 text-[#6f4e37] shadow-2xl backdrop:bg-[#6f4e37]/50 backdrop:backdrop-blur-sm"
>
	<div class="flex max-h-[85vh] flex-col">
		<div class="flex items-center justify-between border-b border-[#e6d9cc] p-5">
			<h2 id="judul-izin-sakit" class="text-lg font-bold text-[#6f4e37]">Ajukan Izin / Sakit</h2>
			<button
				type="button"
				onclick={tutup}
				aria-label="Tutup"
				class="rounded-lg p-1.5 text-[#6f4e37]/60 transition-colors hover:bg-orange-50 hover:text-orange-600"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="flex-1 overflow-y-auto p-5">
			<p class="mb-4 text-sm text-[#6f4e37]/70">Pilih jenis keterangan dan unggah bukti pendukung.</p>

			<div class="grid gap-3 sm:grid-cols-2">
				<button
					type="button"
					onclick={() => pilihTipe('izin')}
					class="flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors {tipe === 'izin'
						? 'border-[#6f4e37] bg-[#f4ebe1] ring-2 ring-[#6f4e37]/20'
						: 'border-[#e6d9cc] bg-white hover:bg-[#f4ebe1]/60'}"
				>
					<span class="flex items-center gap-2 text-sm font-semibold text-[#6f4e37]">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
						</svg>
						Bukti Izin
					</span>
					<span class="text-xs text-[#6f4e37]/70">Unggah foto atau PDF bukti izin.</span>
				</button>

				<button
					type="button"
					onclick={() => pilihTipe('sakit')}
					class="flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors {tipe === 'sakit'
						? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
						: 'border-[#e6d9cc] bg-white hover:bg-blue-50/60'}"
				>
					<span class="flex items-center gap-2 text-sm font-semibold text-blue-700">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
						</svg>
						Surat Sakit
					</span>
					<span class="text-xs text-blue-700/70">Unggah foto atau PDF surat dokter.</span>
				</button>
			</div>

			<input
				bind:this={inputEl}
				type="file"
				accept="image/*,application/pdf"
				class="hidden"
				onchange={pilihBerkas}
			/>

			{#if tipe}
				<div class="mt-4 rounded-lg border border-[#e6d9cc] bg-slate-50 p-4">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<p class="text-sm font-medium text-[#6f4e37]">
							{tipe === 'izin' ? 'Bukti Izin' : 'Surat Sakit'}
						</p>
						<button
							type="button"
							onclick={() => inputEl?.click()}
							class="rounded-md border border-[#e6d9cc] bg-white px-3 py-1.5 text-xs font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1]"
						>
							{berkas ? 'Ganti File' : 'Pilih File'}
						</button>
					</div>

					{#if berkas}
						<p class="mt-2 break-all text-xs text-[#6f4e37]/70">
							{berkas.name} · {formatUkuran(berkas.size)}
						</p>
					{:else}
						<p class="mt-2 text-xs text-[#6f4e37]/50">Belum ada file dipilih.</p>
					{/if}
				</div>
			{/if}

			{#if pesanError}
				<div class="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700" role="alert">
					{pesanError}
				</div>
			{/if}
		</div>

		<div class="flex flex-col-reverse gap-2 border-t border-[#e6d9cc] bg-slate-50 p-4 sm:flex-row sm:justify-end">
			<button
				type="button"
				onclick={tutup}
				class="rounded-lg border border-[#e6d9cc] bg-white px-4 py-2 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1]"
			>
				Batal
			</button>
			<button
				type="button"
				onclick={simpan}
				class="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
			>
				Kirim Keterangan
			</button>
		</div>
	</div>
</dialog>
