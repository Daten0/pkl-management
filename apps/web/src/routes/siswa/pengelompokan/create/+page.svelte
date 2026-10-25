<script lang="ts">

	import LocationInfo from '#lib/components/student/pengelompokan/location_info.svelte';
    import GroupMembers from '#lib/components/student/pengelompokan/member_kelompok.svelte';
    import StudentModal from '#lib/components/student/pengelompokan/siswa_modal.svelte';
    import type { MitraPkl } from '#lib/types/student/mitra.ts';
    import type { Member, Student } from '#lib/types/student/member.ts';

	// Parent State
	let selectedLocation = $state<MitraPkl | null>(null);
	let startDate = $state("");
	let endDate = $state("");
	let isModalOpen = $state(false);
	
	// Array Member
	let groupMembers = $state<Member[]>([]);

	let availableStudents = $state<Student[]>([
		{ nisn: "0051234567", nama: "Ahmad Fauzi", kelas: "XI RPL 1", program: "Rekayasa Perangkat Lunak" },
		{ nisn: "0057654321", nama: "Budi Santoso", kelas: "XI TKJ 2", program: "Teknik Komputer dan Jaringan" },
		{ nisn: "0051122334", nama: "Citra Kirana", kelas: "XI AKL 1", program: "Akuntansi dan Keuangan Lembaga" },
		{ nisn: "0059988776", nama: "Dewi Lestari", kelas: "XI RPL 1", program: "Rekayasa Perangkat Lunak" }
	]);

	const mitraList: MitraPkl[] = [
		{
			id: 'mitra-1',
			namaTempat: 'PT Teknologi Nusantara',
			kompetensiKeahlian: 'Rekayasa Perangkat Lunak',
			alamat: 'Jl. Soekarno-Hatta No. 123, Bandung'
		},
		{
			id: 'mitra-2',
			namaTempat: 'CV Digital Kreatif',
			kompetensiKeahlian: 'Rekayasa Perangkat Lunak',
			alamat: 'Jl. Cihampelas No. 45, Bandung'
		},
		{
			id: 'mitra-3',
			namaTempat: 'PT Jaringan Prima',
			kompetensiKeahlian: 'Teknik Komputer dan Jaringan',
			alamat: 'Jl. Gatot Subroto No. 88, Bandung'
		},
		{
			id: 'mitra-4',
			namaTempat: 'PT Akuntansi Cerdas',
			kompetensiKeahlian: 'Akuntansi dan Keuangan Lembaga',
			alamat: 'Jl. Asia Afrika No. 10, Bandung'
		},
		{
			id: 'mitra-5',
			namaTempat: 'PT Media Visual Indonesia',
			kompetensiKeahlian: 'Desain Komunikasi Visual',
			alamat: 'Jl. Riau No. 7, Bandung'
		},
		{
			id: 'mitra-6',
			namaTempat: 'CV Solusi Bisnis Mandiri',
			kompetensiKeahlian: 'Akuntansi dan Keuangan Lembaga',
			alamat: 'Jl. Pasteur No. 22, Bandung'
		}
	];

	function handleSave() {
		const payload = { selectedLocation, startDate, endDate, groupMembers };
		console.log("Menyimpan data kelompok:", payload);
		alert("Data Kelompok dan Lokasi PKL berhasil disimpan!");
	}
</script>

<div class="w-full bg-white border border-[#e6d9cc] rounded-xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
	<!-- Header Parent -->
	<div class="border-b border-[#e6d9cc] pb-4">
		<h1 class="text-xl font-bold text-[#6f4e37]">Form Pengelompokan PKL</h1>
		<p class="text-sm text-[#6f4e37]/70 mt-1">Pilih lokasi DUDI, tentukan waktu pelaksanaan, dan atur anggota kelompok.</p>
	</div>

	<!-- Container Layout Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
		<!-- Child Component 1 -->
		<LocationInfo bind:selectedLocation {mitraList} bind:startDate bind:endDate />

		<!-- Child Component 2 -->
		<GroupMembers bind:groupMembers onOpenModal={() => isModalOpen = true} />
	</div>

	<!-- Action Footer -->
	<div class="flex justify-end pt-4 border-t border-[#e6d9cc]">
		<button onclick={handleSave} class="w-full sm:w-auto justify-center px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
			Simpan Data
		</button>
	</div>
</div>

<!-- Child Component 3 (Modal) -->
{#if isModalOpen}
	<StudentModal bind:groupMembers {availableStudents} onClose={() => isModalOpen = false} />
{/if}