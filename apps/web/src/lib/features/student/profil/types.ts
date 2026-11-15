export interface StudentProfile {
	nis: string;
	namaLengkap: string;
	programKeahlian: string;
	kelas: string;
	fotoUrl?: string;
}

export type ProfileField = 'nis' | 'namaLengkap' | 'programKeahlian' | 'kelas';
