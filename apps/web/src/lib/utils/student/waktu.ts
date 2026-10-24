export const ZONA_WAKTU_WITA = 'Asia/Makassar';
export const JAM_BUKA_PRESENSI = '08.00 WITA';
export const JAM_BATAS_PRESENSI = '15.00 WITA';

export type JendelaPresensi = 'belum_dibuka' | 'dibuka' | 'ditutup';

const formatterTanggalKey = new Intl.DateTimeFormat('en-CA', {
	timeZone: ZONA_WAKTU_WITA,
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
});

const formatterTanggalLabel = new Intl.DateTimeFormat('id-ID', {
	timeZone: ZONA_WAKTU_WITA,
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

const formatterJam = new Intl.DateTimeFormat('id-ID', {
	timeZone: ZONA_WAKTU_WITA,
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23'
});

const formatterMenit = new Intl.DateTimeFormat('en-GB', {
	timeZone: ZONA_WAKTU_WITA,
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23'
});

function ambilBagian(format: Intl.DateTimeFormat, date: Date) {
	return Object.fromEntries(format.formatToParts(date).map((bagian) => [bagian.type, bagian.value]));
}

export function tanggalWita(date: Date = new Date()): string {
	const bagian = ambilBagian(formatterTanggalKey, date);
	return `${bagian.year}-${bagian.month}-${bagian.day}`;
}

export function tanggalLabelWita(date: Date = new Date()): string {
	return formatterTanggalLabel.format(date);
}

export function jamWita(date: Date = new Date()): string {
	return formatterJam.format(date);
}

export function menitWita(date: Date = new Date()): number {
	const bagian = ambilBagian(formatterMenit, date);
	return Number(bagian.hour ?? 0) * 60 + Number(bagian.minute ?? 0);
}

export function statusJendelaPresensi(date: Date = new Date()): JendelaPresensi {
	const menit = menitWita(date);

	if (menit < 8 * 60) return 'belum_dibuka';
	if (menit >= 15 * 60) return 'ditutup';
	return 'dibuka';
}
