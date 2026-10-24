<script lang="ts">
	import MitraModal from './mitra_modal.svelte';
	import type { MitraPkl } from '#lib/types/student/mitra.ts';

	let {
		selectedLocation = $bindable<MitraPkl | null>(null),
		mitraList,
		startDate = $bindable(''),
		endDate = $bindable('')
	}: {
		selectedLocation: MitraPkl | null;
		mitraList: MitraPkl[];
		startDate: string;
		endDate: string;
	} = $props();

	let searchQuery = $state('');
	let isMitraModalOpen = $state(false);

	const filteredMitra = $derived.by(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return mitraList;

		return mitraList.filter((mitra) =>
			[mitra.namaTempat, mitra.kompetensiKeahlian, mitra.alamat].some((value) =>
				value.toLowerCase().includes(query)
			)
		);
	});

	function handleSearch(event: SubmitEvent) {
		event.preventDefault();
		isMitraModalOpen = true;
	}
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-5 flex flex-col gap-5">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
		Informasi Lokasi PKL
	</h2>

	<form class="flex flex-col gap-1.5" onsubmit={handleSearch}>
		<label for="lokasi" class="text-sm font-medium text-[#6f4e37]">Cari Lokasi DUDI</label>
		<div class="flex gap-2">
			<div class="relative flex-1 min-w-0">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
				</div>
				<input
					type="search"
					id="lokasi"
					bind:value={searchQuery}
					placeholder="Cari nama tempat, kompetensi, atau alamat..."
					class="w-full pl-10 pr-4 py-2 bg-white border border-[#e6d9cc] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm text-[#6f4e37] placeholder:text-[#6f4e37]/40"
				/>
			</div>
			<button
				type="submit"
				class="shrink-0 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
			>
				Cari!
			</button>
		</div>
	</form>

	{#if selectedLocation}
		<div class="rounded-lg border border-orange-200 bg-orange-50 p-4 flex flex-col gap-1">
			<span class="text-[11px] font-bold uppercase tracking-wide text-orange-600">Lokasi Terpilih</span>
			<p class="text-sm font-semibold text-[#6f4e37]">{selectedLocation.namaTempat}</p>
			<p class="text-xs text-[#6f4e37]/80">{selectedLocation.kompetensiKeahlian}</p>
			<p class="text-xs text-[#6f4e37]/70">{selectedLocation.alamat}</p>
		</div>
	{/if}

	<fieldset class="flex flex-col gap-1.5">
		<legend class="text-sm font-medium text-[#6f4e37]">Waktu PKL</legend>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1">
				<label for="pkl-start-date" class="text-xs text-[#6f4e37]/80">Tanggal Mulai</label>
				<input
					id="pkl-start-date"
					type="date"
					bind:value={startDate}
					class="w-full px-3 py-2 bg-white border border-[#e6d9cc] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm text-[#6f4e37]"
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="pkl-end-date" class="text-xs text-[#6f4e37]/80">Tanggal Selesai</label>
				<input
					id="pkl-end-date"
					type="date"
					bind:value={endDate}
					class="w-full px-3 py-2 bg-white border border-[#e6d9cc] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm text-[#6f4e37]"
				/>
			</div>
		</div>
	</fieldset>
</div>

{#if isMitraModalOpen}
	<MitraModal
		mitraList={filteredMitra}
		initialSelection={selectedLocation}
		onConfirm={(mitra) => {
			selectedLocation = mitra;
			isMitraModalOpen = false;
		}}
		onClose={() => (isMitraModalOpen = false)}
	/>
{/if}
