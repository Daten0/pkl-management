export enum MemberStatus {
	Bergabung = 'Bergabung',
	Pending = 'Pending',
	Ditolak = 'Ditolak'
}

export type Student = {
	nisn: string;
	nama: string;
	kelas: string;
	program: string;
};

export type Member = Student & {
	status: MemberStatus;
};
