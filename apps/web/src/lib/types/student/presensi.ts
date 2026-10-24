export enum StatusPresensi {
	Hadir = 'Hadir',
	Izin = 'Izin',
	Sakit = 'Sakit',
	Alpa = 'Alpa'
}

export type BuktiPresensi = {
	nama: string;
	tipe: string;
	ukuran: number;
};

export type LokasiPresensi = {
	latitude: number;
	longitude: number;
	accuracy: number;
};

export type RiwayatPresensi = {
	id: string;
	tanggal: string;
	tanggalLabel: string;
	jam: string;
	status: StatusPresensi;
	lokasi?: LokasiPresensi;
	bukti?: BuktiPresensi;
};
