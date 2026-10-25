export type LogbookFilter = 'Semua' | '3 Hari Terakhir' | '7 Hari Terakhir';

export type DokumentasiLogbook = File | null;

export type LogbookEntry = {
	id: number;
	tanggal: string;
	nama: string;
	jam: string;
	deskripsi: string;
	dokumentasi?: DokumentasiLogbook;
};

export type LogbookDraft = Omit<LogbookEntry, 'id' | 'tanggal'>;

export type LogbookFormData = Omit<LogbookDraft, 'dokumentasi'> & {
	dokumentasi: DokumentasiLogbook;
};
