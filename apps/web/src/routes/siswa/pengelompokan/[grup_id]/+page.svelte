<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state'; // Untuk mengambil [grup_id]
	import LocationInfo from '#lib/components/student/pengelompokan/detail/location_info.svelte';
	import MemberDetail from '#lib/components/student/pengelompokan/detail/detail_member.svelte';
	import TeacherInfo from '#lib/components/student/pengelompokan/detail/teacher_info.svelte';
	import OtherInfo from '#lib/components/student/pengelompokan/detail/other_info.svelte';
	import MentorInfo from '#lib/components/student/pengelompokan/detail/mentor_info.svelte';

	// Mengambil ID dari params URL
	let grupId = $derived(page.params.grup_id);

	// Mockup Data Detail Grup yang ditarik berdasarkan [grup_id] (Nantinya di load via +page.server.ts)
	let groupData = $state({
		locationName: "PT. Telkom Indonesia Witel Makassar",
		address: "Jl. A. P. Pettarani No. 2, Gn. Sari, Kec. Rappocini, Kota Makassar, Sulawesi Selatan",
		period: "15 Agustus 2026 - 15 November 2026",
		status: "Belum Dikirim" as "Belum Dikirim" | "Pending" | "Diverifikasi" | "Dibatalkan",
		teacher: {
			nama: "Bapak Muh. Ilham, S.Pd., M.T.",
			nip: "19800512 200501 1 003",
			phone: "0812-3456-7890"
		},
		mentor: {
			nama: "",
			phone: ""
		},
		members: [
			{ nisn: "0051234567", nama: "Ahmad Fauzi", kelas: "XI RPL 1", program: "Rekayasa Perangkat Lunak", role: "Ketua" as const },
			{ nisn: "0059988776", nama: "Dewi Lestari", kelas: "XI RPL 1", program: "Rekayasa Perangkat Lunak", role: "Member" as const }
		]
	});

	function handleSubmitRequest() {
		if(confirm("Apakah Anda yakin ingin mengirim pengajuan PKL ini ke Admin untuk diverifikasi?")) {
			groupData.status = "Pending";
			alert("Pengajuan berhasil dikirim!");
		}
	}

	let mentorName = $state(groupData.mentor.nama);
	let mentorPhone = $state(groupData.mentor.phone);

	function handleSaveMentor() {
		groupData.mentor = { nama: mentorName, phone: mentorPhone };
		alert("Informasi mentor berhasil disimpan!");
	}

	async function handleEditGroup() {
		if (confirm('Apakah anda yakin ingin mengubah Detail Kelompok?')) {
			await goto('/siswa/pengelompokan/create');
		}
	}
</script>

<div class="w-full bg-white border border-[#e6d9cc] rounded-xl shadow-sm p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
	<!-- Header Parent -->
	<div class="border-b border-[#e6d9cc] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<div>
			<h1 class="text-xl font-bold text-[#6f4e37] flex items-center gap-2">
				Detail Grup
				<span class="text-sm font-medium text-[#6f4e37]/70 bg-[#f4ebe1] border border-[#e6d9cc] px-2 py-0.5 rounded">#{grupId}</span>
			</h1>
			<p class="text-sm text-[#6f4e37]/70 mt-1">Review informasi lokasi, pembimbing, dan anggota kelompok PKL Anda.</p>
		</div>
		<button
			type="button"
			onclick={handleEditGroup}
			class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#e6d9cc] text-[#6f4e37] text-sm font-medium rounded-lg shadow-sm transition-colors hover:bg-[#f4ebe1]"
		>
			<svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
			Edit Kelompok
		</button>
	</div>

	<!-- Layout Container (Dua Kolom) -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
		<!-- Kolom Kiri -->
		<div class="flex flex-col gap-4 sm:gap-6">
			<LocationInfo 
				locationName={groupData.locationName} 
				address={groupData.address} 
				period={groupData.period} 
			/>
			<TeacherInfo 
				teacher={groupData.teacher} 
			/>
		</div>

		<!-- Kolom Kanan -->
		<div class="flex flex-col gap-4 sm:gap-6">
			<MemberDetail 
				members={groupData.members} 
			/>
			<OtherInfo 
				status={groupData.status} 
			/>
		</div>
	</div>

	<!-- Informasi Mentor PKL -->
	<MentorInfo bind:mentorName bind:mentorPhone onSave={handleSaveMentor} />

	<!-- Action Footer Parent Box -->
	<div class="flex justify-end pt-4 border-t border-[#e6d9cc] mt-2">
		<button
			onclick={handleSubmitRequest}
			disabled={groupData.status !== 'Belum Dikirim'}
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
			Kirim Pengajuan PKL
		</button>
	</div>
</div>