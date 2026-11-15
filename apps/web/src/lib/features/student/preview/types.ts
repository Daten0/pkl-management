export type AspekPenilaian = {
	id: string;
	aspek: string;
	nilai: number;
	keterangan?: string;
};

export type NilaiDokumen = {
	id: string;
	nomorDokumen: string;
	siswa: {
		nama: string;
		nisn: string;
		kelas: string;
		programKeahlian: string;
	};
	pkl: {
		mitra: string;
		periode: string;
		pembimbing: string;
		guruPembimbing: string;
	};
	rincian: AspekPenilaian[];
	nilaiAkhir: number;
	predikat: string;
	tanggalTerbit: string;
};
