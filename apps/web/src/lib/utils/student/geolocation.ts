import type { LokasiPresensi } from '#lib/types/student/presensi.ts';

export type StatusIzinLokasi = 'granted' | 'prompt' | 'denied' | 'tidak_didukung';

export type AlasanLokasiGagal =
	| 'izin_ditolak'
	| 'gps_tidak_aktif'
	| 'timeout'
	| 'tidak_didukung'
	| 'tidak_diketahui';

export type HasilLokasi =
	| { ok: true; lokasi: LokasiPresensi }
	| { ok: false; alasan: AlasanLokasiGagal; pesan: string };

export async function cekIzinLokasi(): Promise<StatusIzinLokasi> {
	if (typeof navigator === 'undefined' || !navigator.geolocation) {
		return 'tidak_didukung';
	}

	if (!navigator.permissions?.query) {
		return 'prompt';
	}

	try {
		const status = await navigator.permissions.query({ name: 'geolocation' });
		return status.state as StatusIzinLokasi;
	} catch {
		return 'prompt';
	}
}

export function mintaLokasi(): Promise<HasilLokasi> {
	if (typeof navigator === 'undefined' || !navigator.geolocation) {
		return Promise.resolve({
			ok: false,
			alasan: 'tidak_didukung',
			pesan: 'Browser ini tidak mendukung akses lokasi. Gunakan browser modern melalui koneksi HTTPS.'
		});
	}

	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(posisi) => {
				resolve({
					ok: true,
					lokasi: {
						latitude: posisi.coords.latitude,
						longitude: posisi.coords.longitude,
						accuracy: posisi.coords.accuracy
					}
				});
			},
			(kesalahan) => {
				if (kesalahan.code === kesalahan.PERMISSION_DENIED) {
					resolve({
						ok: false,
						alasan: 'izin_ditolak',
						pesan:
							'Akses lokasi ditolak. Buka pengaturan izin situs di browser, aktifkan Location, lalu coba lagi.'
					});
					return;
				}

				if (kesalahan.code === kesalahan.POSITION_UNAVAILABLE) {
					resolve({
						ok: false,
						alasan: 'gps_tidak_aktif',
						pesan:
							'Lokasi perangkat tidak tersedia. Aktifkan GPS/Location Services pada perangkat, lalu coba lagi.'
					});
					return;
				}

				if (kesalahan.code === kesalahan.TIMEOUT) {
					resolve({
						ok: false,
						alasan: 'timeout',
						pesan: 'Lokasi tidak ditemukan dalam batas waktu. Pastikan GPS aktif dan coba lagi.'
					});
					return;
				}

				resolve({
					ok: false,
					alasan: 'tidak_diketahui',
					pesan: 'Terjadi kesalahan saat mengambil lokasi. Silakan coba lagi.'
				});
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0
			}
		);
	});
}

export function formatLokasi(lokasi?: LokasiPresensi): string {
	if (!lokasi) return '';
	const lat = lokasi.latitude.toFixed(5);
	const lng = lokasi.longitude.toFixed(5);
	const akurasi = Math.round(lokasi.accuracy);
	return `${lat}, ${lng} (±${akurasi} m)`;
}
