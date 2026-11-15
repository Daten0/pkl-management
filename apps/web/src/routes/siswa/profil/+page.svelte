<script lang="ts">
	import {
		PasswordUpdateCard,
		ProfileHeader,
		ProfileInfoCard,
		ProfilePhotoCard,
		type ProfileField,
		type StudentProfile
	} from '#lib/features/student/profil/index.ts';

	// Data contoh sampai endpoint profil siswa tersedia.
	let studentProfile = $state<StudentProfile>({
		nis: '12345/001.065',
		namaLengkap: 'Muhammad Siddiq Febri Nusantara',
		programKeahlian: 'Teknik Komputer dan Jaringan',
		kelas: 'XII TKJ 1',
		fotoUrl: ''
	});

	function handleSaveField(field: ProfileField, value: string) {
		studentProfile[field] = value;
		// TODO: ganti dengan PATCH /siswa/profil dengan body { [field]: value }.
	}

	function handleChangePhoto(fotoUrl: string) {
		studentProfile.fotoUrl = fotoUrl;
		// TODO: ganti dengan upload multipart ke endpoint foto profil.
	}
</script>

<svelte:head>
	<title>Profil Pengguna - SIM-PKL Siswa</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl">
	<div class="space-y-6">
		<ProfileHeader
			title="Profil Pengguna"
			description="Kelola informasi data diri dan pembaruan kredensial akun siswa Anda."
		/>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
			<ProfilePhotoCard profile={studentProfile} onChangePhoto={handleChangePhoto} />

			<div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
				<ProfileInfoCard profile={studentProfile} onSaveField={handleSaveField} />
				<PasswordUpdateCard />
			</div>
		</div>
	</div>
</div>
