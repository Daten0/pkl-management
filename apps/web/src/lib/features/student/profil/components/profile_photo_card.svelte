<script lang="ts">
	import {
		PROFILE_PHOTO_ACCEPT,
		PROFILE_PHOTO_ERROR_FORMAT,
		PROFILE_PHOTO_ERROR_SIZE,
		PROFILE_PHOTO_MAX_SIZE,
		PROFILE_PHOTO_MIME_TYPES
	} from '../constants.ts';
	import type { StudentProfile } from '../types.ts';

	let {
		profile,
		onChangePhoto
	}: {
		profile: StudentProfile;
		onChangePhoto: (fotoUrl: string) => void;
	} = $props();

	let fotoError = $state('');
	let inputFotoEl = $state<HTMLInputElement>();

	function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];

		fotoError = '';

		if (!file) return;

		if (!PROFILE_PHOTO_MIME_TYPES.includes(file.type)) {
			fotoError = PROFILE_PHOTO_ERROR_FORMAT;
			input.value = '';
			return;
		}

		if (file.size > PROFILE_PHOTO_MAX_SIZE) {
			fotoError = PROFILE_PHOTO_ERROR_SIZE;
			input.value = '';
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const hasil = e.target?.result;
			if (typeof hasil === 'string') onChangePhoto(hasil);
		};
		reader.readAsDataURL(file);
	}
</script>

<div class="flex h-full flex-col rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
	<div class="flex items-center justify-between gap-2">
		<h2 class="min-w-0 truncate text-lg font-semibold text-[#6f4e37]">Foto Profil</h2>
		<button
			type="button"
			onclick={() => inputFotoEl?.click()}
			aria-label="Ubah foto profil"
			class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e6d9cc] bg-white text-[#6f4e37] transition-colors hover:bg-orange-50 hover:text-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		</button>
	</div>

	<input
		bind:this={inputFotoEl}
		id="foto-profil"
		type="file"
		accept={PROFILE_PHOTO_ACCEPT}
		onchange={handleFileChange}
		class="hidden"
	/>

	<div class="mt-4 flex flex-1 flex-col items-center justify-center gap-3 text-center">
		<div class="h-32 w-32 shrink-0 overflow-hidden rounded-full border border-[#e6d9cc] bg-[#f4ebe1]">
			{#if profile.fotoUrl}
				<img
					src={profile.fotoUrl}
					alt={`Foto profil ${profile.namaLengkap}`}
					class="h-full w-full object-cover"
				/>
			{:else}
				<span class="flex h-full w-full items-center justify-center text-xs font-medium text-[#6f4e37]/60">
					Foto
				</span>
			{/if}
		</div>

		<div class="min-w-0">
			<p class="break-words text-base font-bold text-[#6f4e37]">{profile.namaLengkap}</p>
			<p class="mt-1 text-sm text-[#8c6b54]">NIS {profile.nis}</p>
		</div>
	</div>

	<p class="mt-4 text-center text-xs text-[#8c6b54]">JPEG atau PNG, maksimal 5 MB.</p>

	{#if fotoError}
		<p role="alert" class="mt-1 text-center text-sm text-red-600">{fotoError}</p>
	{/if}
</div>
