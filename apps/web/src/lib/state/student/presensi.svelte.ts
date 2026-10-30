import { browser } from '$app/env';
import { StatusPresensi, type RiwayatPresensi } from '#lib/types/student/presensi.ts';
import { statusJendelaPresensi, tanggalLabelWita, tanggalWita } from '#lib/utils/student/waktu.ts';

const STORAGE_KEY = 'pkl:presensi:siswa:v1';

function buatDataContoh(): RiwayatPresensi[] {
	const sekarang = Date.now();
	const kemarin = new Date(sekarang - 24 * 60 * 60 * 1000);
	const duaHariLalu = new Date(sekarang - 2 * 24 * 60 * 60 * 1000);

	return [
		{
			id: 'contoh-hadir',
			tanggal: tanggalWita(kemarin),
			tanggalLabel: tanggalLabelWita(kemarin),
			jam: '07.20.10',
			status: StatusPresensi.Hadir,
			lokasi: { latitude: -5.184414, longitude: 119.437608, accuracy: 12 }
		},
		{
			id: 'contoh-sakit',
			tanggal: tanggalWita(duaHariLalu),
			tanggalLabel: tanggalLabelWita(duaHariLalu),
			jam: '08.05.00',
			status: StatusPresensi.Sakit,
			bukti: { nama: 'surat-dokter.pdf', tipe: 'application/pdf', ukuran: 245000 }
		}
	];
}

const dataContoh: RiwayatPresensi[] = buatDataContoh();

export const presensiState = $state<{ riwayat: RiwayatPresensi[]; siap: boolean }>({
	riwayat: [],
	siap: false
});

const statusValid = new Set<string>(Object.values(StatusPresensi));

function normalisasiRiwayat(nilai: unknown): RiwayatPresensi[] {
	if (!Array.isArray(nilai)) return [];

	return nilai.filter((baris): baris is RiwayatPresensi => {
		if (typeof baris !== 'object' || baris === null) return false;

		const kandidat = baris as Partial<RiwayatPresensi>;
		return (
			typeof kandidat.id === 'string' &&
			typeof kandidat.tanggal === 'string' &&
			typeof kandidat.tanggalLabel === 'string' &&
			typeof kandidat.jam === 'string' &&
			typeof kandidat.status === 'string' &&
			statusValid.has(kandidat.status)
		);
	});
}

function buatId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}
	return `presensi-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function simpan(): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(presensiState.riwayat));
	} catch {
		return;
	}
}

export function muatPresensi(): void {
	if (!browser || presensiState.siap) return;

	try {
		const mentah = localStorage.getItem(STORAGE_KEY);
		if (mentah) {
			const hasil = normalisasiRiwayat(JSON.parse(mentah));
			presensiState.riwayat = hasil.length > 0 ? hasil : [...dataContoh];
		} else {
			presensiState.riwayat = [...dataContoh];
			simpan();
		}
	} catch {
		presensiState.riwayat = [...dataContoh];
	}

	presensiState.siap = true;
}

export function catatPresensi(entri: Omit<RiwayatPresensi, 'id'>): void {
	if (!browser) return;

	const baru: RiwayatPresensi = { ...entri, id: buatId() };
	presensiState.riwayat = [
		baru,
		...presensiState.riwayat.filter((baris) => baris.tanggal !== entri.tanggal)
	];
	simpan();
}

export function tandaiAlpaHariIni(date: Date = new Date()): void {
	if (!browser || !presensiState.siap) return;
	if (statusJendelaPresensi(date) !== 'ditutup') return;

	const kunci = tanggalWita(date);
	if (presensiState.riwayat.some((baris) => baris.tanggal === kunci)) return;

	catatPresensi({
		tanggal: kunci,
		tanggalLabel: tanggalLabelWita(date),
		jam: '15.00.00',
		status: StatusPresensi.Alpa
	});
}
