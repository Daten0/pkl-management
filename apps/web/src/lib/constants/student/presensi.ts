import { StatusPresensi } from '#lib/types/student/presensi.ts';

export const statusBadgeClass: Record<StatusPresensi, string> = {
	[StatusPresensi.Hadir]: 'bg-green-50 text-green-700 border-green-200',
	[StatusPresensi.Izin]: 'bg-[#f4ebe1] text-[#6f4e37] border-[#e6d9cc]',
	[StatusPresensi.Sakit]: 'bg-blue-50 text-blue-700 border-blue-200',
	[StatusPresensi.Alpa]: 'bg-red-50 text-red-700 border-red-200'
};

export const statusKartuClass: Record<StatusPresensi, string> = {
	[StatusPresensi.Hadir]: 'border-green-500 bg-green-50 text-green-800',
	[StatusPresensi.Izin]: 'border-[#6f4e37] bg-[#f4ebe1] text-[#6f4e37]',
	[StatusPresensi.Sakit]: 'border-blue-500 bg-blue-50 text-blue-800',
	[StatusPresensi.Alpa]: 'border-red-500 bg-red-50 text-red-800'
};

export const statusDetailClass: Record<StatusPresensi, string> = {
	[StatusPresensi.Hadir]: 'text-green-700',
	[StatusPresensi.Izin]: 'text-[#6f4e37]/70',
	[StatusPresensi.Sakit]: 'text-blue-700',
	[StatusPresensi.Alpa]: 'text-red-700'
};
