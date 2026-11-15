<script lang="ts">
	import type { ProfileField, StudentProfile } from '../types.ts';
	import ProfileFieldInput from './profile_field.svelte';

	let {
		profile,
		onSaveField
	}: {
		profile: StudentProfile;
		onSaveField: (field: ProfileField, value: string) => void;
	} = $props();
</script>

<div class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
	<h2 class="mb-4 text-lg font-semibold text-[#6f4e37]">Data Diri</h2>

	<div class="grid grid-cols-1 gap-4">
		<ProfileFieldInput
			field="namaLengkap"
			label="Nama Lengkap"
			value={profile.namaLengkap}
			autocomplete="name"
			onSave={onSaveField}
		/>

		<ProfileFieldInput field="nis" label="NIS" value={profile.nis} onSave={onSaveField} />

		<ProfileFieldInput
			field="programKeahlian"
			label="Program Keahlian"
			value={profile.programKeahlian}
			onSave={onSaveField}
		/>

		<ProfileFieldInput field="kelas" label="Kelas" value={profile.kelas} onSave={onSaveField} />
	</div>
</div>
