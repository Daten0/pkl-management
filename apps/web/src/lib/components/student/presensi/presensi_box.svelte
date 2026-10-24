<script lang="ts">
	import IzinSakitDialog from './izin_sakit_dialog.svelte';
	import LiveClock from './live_clock.svelte';
	import LocationPermissionDialog from './location_permission_dialog.svelte';
	import { statusDetailClass, statusKartuClass } from '#lib/constants/student/presensi.ts';
	import { catatPresensi, presensiState } from '#lib/state/student/presensi.svelte.ts';
	import { StatusPresensi, type BuktiPresensi } from '#lib/types/student/presensi.ts';
	import { cekIzinLokasi, formatLokasi, mintaLokasi } from '#lib/utils/student/geolocation.ts';
	import {
		JAM_BATAS_PRESENSI,
		JAM_BUKA_PRESENSI,
		jamWita,
		statusJendelaPresensi,
		tanggalLabelWita,
		tanggalWita
	} from '#lib/utils/student/waktu.ts';

	let now = $state<Date | null>(null);
	let memeriksaIzin = $state(false);
	let memuatLokasi = $state(false);
	let pesanErrorLokasi = $state('');
	let dialogLokasi = $state(false);
	let dialogIzinSakit = $state(false);

	$effect(() => {
		now = new Date();
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});

	let jendela = $derived(now ? statusJendelaPresensi(now) : null);
	let kunciHariIni = $derived(now ? tanggalWita(now) : null);
	let hariIni = $derived(
		kunciHariIni
			? presensiState.riwayat.find((baris) => baris.tanggal === kunciHariIni)
			: undefined
	);
	let statusTampil = $derived(
		presensiState.siap
			? (hariIni?.status ?? (jendela === 'ditutup' ? StatusPresensi.Alpa : null))
			: null
	);
	let kartuClass = $derived(statusTampil ? statusKartuClass[statusTampil] : '');
	let detailClass = $derived(statusTampil ? statusDetailClass[statusTampil] : '');
	let bisaHadir = $derived(
		jendela === 'dibuka' &&
			!hariIni &&
			presensiState.siap &&
			!memeriksaIzin &&
			!memuatLokasi
	);

	async function handleHadir() {
		if (!bisaHadir) return;

		memeriksaIzin = true;
		pesanErrorLokasi = '';
		const statusIzin = await cekIzinLokasi();
		memeriksaIzin = false;

		if (statusIzin === 'granted') {
			await prosesLokasi();
			return;
		}

		if (statusIzin === 'denied') {
			pesanErrorLokasi =
				'Akses lokasi diblokir. Buka pengaturan izin situs di browser, aktifkan Location, lalu coba lagi.';
		} else if (statusIzin === 'tidak_didukung') {
			pesanErrorLokasi =
				'Browser ini tidak mendukung akses lokasi. Gunakan browser modern melalui koneksi HTTPS.';
		}

		dialogLokasi = true;
	}

	async function prosesLokasi() {
		if (memuatLokasi) return;

		memuatLokasi = true;
		pesanErrorLokasi = '';

		const hasil = await mintaLokasi();
		memuatLokasi = false;

		if (!hasil.ok) {
			pesanErrorLokasi = hasil.pesan;
			dialogLokasi = true;
			return;
		}

		const waktu = new Date();
		catatPresensi({
			tanggal: tanggalWita(waktu),
			tanggalLabel: tanggalLabelWita(waktu),
			jam: jamWita(waktu),
			status: StatusPresensi.Hadir,
			lokasi: hasil.lokasi
		});
		now = waktu;
		dialogLokasi = false;
	}

	function simpanIzinSakit(
		status: StatusPresensi.Izin | StatusPresensi.Sakit,
		bukti: BuktiPresensi
	) {
		const waktu = new Date();
		catatPresensi({
			tanggal: tanggalWita(waktu),
			tanggalLabel: tanggalLabelWita(waktu),
			jam: jamWita(waktu),
			status,
			bukti
		});
		now = waktu;
		dialogIzinSakit = false;
	}
</script>

<div class="rounded-xl bg-white border border-[#e6d9cc] p-6 shadow-sm">
	<div class="flex flex-col-reverse justify-between gap-6 sm:flex-row">
		<div class="flex flex-1 flex-col justify-center">
			{#if statusTampil}
				<div class="rounded-lg border-l-4 p-4 {kartuClass}" role="status">
					<p class="flex items-center gap-2 font-medium">
						{#if statusTampil === StatusPresensi.Hadir}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						{:else if statusTampil === StatusPresensi.Izin}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
							</svg>
						{:else if statusTampil === StatusPresensi.Sakit}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						{/if}
						{statusTampil}
					</p>

					<p class="mt-1 text-sm {detailClass}">
						{#if statusTampil === StatusPresensi.Hadir}
							Hadir pada jam <strong>{hariIni?.jam}</strong>{#if hariIni?.lokasi} di lokasi <strong>{formatLokasi(hariIni.lokasi)}</strong>{/if}.
						{:else if statusTampil === StatusPresensi.Izin}
							Izin diajukan pada jam <strong>{hariIni?.jam}</strong>{#if hariIni?.bukti} dengan bukti <strong>{hariIni.bukti.nama}</strong>{/if}.
						{:else if statusTampil === StatusPresensi.Sakit}
							Surat sakit dicatat pada jam <strong>{hariIni?.jam}</strong>{#if hariIni?.bukti} dengan bukti <strong>{hariIni.bukti.nama}</strong>{/if}.
						{:else}
							Tidak ada presensi hingga pukul {JAM_BATAS_PRESENSI}. Status kehadiran hari ini tercatat Alpa.
						{/if}
					</p>

					{#if statusTampil === StatusPresensi.Alpa}
						<button
							type="button"
							onclick={() => (dialogIzinSakit = true)}
							class="mt-3 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
						>
							Ajukan Izin/Sakit
						</button>
					{/if}
				</div>
			{:else}
				<div class="flex flex-wrap gap-4">
					<button
						type="button"
						onclick={handleHadir}
						disabled={!bisaHadir}
						class="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-orange-300"
					>
						{memuatLokasi ? 'Mendeteksi lokasi...' : 'Hadir'}
					</button>
					<button
						type="button"
						onclick={() => (dialogIzinSakit = true)}
						disabled={!presensiState.siap}
						class="rounded-lg bg-white border border-[#e6d9cc] px-6 py-3 font-semibold text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Izin / Sakit
					</button>
				</div>
				<p class="mt-3 text-sm text-[#6f4e37]/70">
					{#if !presensiState.siap || jendela === null}
						Memuat status presensi...
					{:else if jendela === 'belum_dibuka'}
						Presensi dibuka pukul {JAM_BUKA_PRESENSI}.
					{:else if jendela === 'ditutup'}
						Batas presensi pukul {JAM_BATAS_PRESENSI}. Status hari ini tercatat Alpa.
					{:else}
						Silakan lakukan presensi sebelum jam masuk berakhir.
					{/if}
				</p>
			{/if}
		</div>

		<!-- <div class="flex flex-col items-center gap-4 sm:items-end">
			<h2 class="text-lg font-bold text-[#6f4e37]">Presensi PKL</h2>
			<svg class="h-16 w-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
			</svg>
		</div> -->
	</div>

	<LiveClock />
</div>

<LocationPermissionDialog
	open={dialogLokasi}
	memuat={memuatLokasi}
	pesanError={pesanErrorLokasi}
	onIzinkan={prosesLokasi}
	onTutup={() => {
		if (memuatLokasi) return;
		dialogLokasi = false;
	}}
/>

<IzinSakitDialog
	open={dialogIzinSakit}
	onSimpan={simpanIzinSakit}
	onTutup={() => (dialogIzinSakit = false)}
/>
