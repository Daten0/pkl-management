<script lang="ts">
	import SearchBar from '#lib/components/student/logbook/search_bar.svelte';
	import DateFilter from '#lib/components/student/logbook/date_filter.svelte';
	import ActivityModal from '#lib/components/student/logbook/activity_modal.svelte';
	import LogbookTable from '#lib/components/student/logbook/logbook_table.svelte';
	import type { LogbookDraft, LogbookEntry, LogbookFilter } from '#lib/types/student/logbook.ts';

	// State Utama
	let searchQuery = $state('');
	let selectedFilter = $state<LogbookFilter>('Semua');
	let isModalOpen = $state(false);

	// Dummy data awal
	let logs = $state<LogbookEntry[]>([
		{ id: 1, tanggal: '2026-10-24', nama: 'Setup Server Hono', jam: '09:00', deskripsi: 'Setup backend' },
		{ id: 2, tanggal: '2026-10-25', nama: 'Riset Progressive Web App', jam: '14:00', deskripsi: 'Belajar Service Worker' }
	]);

	// Derived value untuk memfilter data tabel berdasarkan search dan filter hari
	let filteredLogs = $derived.by(() => {
		let result = logs;

		// Filter Searchbar
		const query = searchQuery.trim().toLowerCase();
		if (query) {
			result = result.filter((log) => log.nama.toLowerCase().includes(query));
		}

		// Filter Waktu
		if (selectedFilter !== 'Semua') {
			const jumlahHari = selectedFilter === '3 Hari Terakhir' ? 3 : 7;
			const batas = new Date();
			batas.setHours(0, 0, 0, 0);
			batas.setDate(batas.getDate() - (jumlahHari - 1));

			result = result.filter((log) => {
				const tanggal = new Date(`${log.tanggal}T00:00:00`);
				return !Number.isNaN(tanggal.getTime()) && tanggal >= batas;
			});
		}

		return result;
	});

	// Handlers
	function handleSaveActivity(newActivity: LogbookDraft) {
		const tanggal = new Date().toISOString().split('T')[0];
		logs = [{ ...newActivity, id: Date.now(), tanggal }, ...logs];
	}

	function handleEdit(log: LogbookEntry) {
		alert(`Fitur edit untuk ${log.nama} akan dikembangkan selanjutnya.`);
	}

	function handleDelete(id: number) {
		if (confirm('Yakin ingin menghapus aktivitas ini?')) {
			logs = logs.filter((log) => log.id !== id);
		}
	}

	function handleCetak() {
		window.print();
	}
</script>

<div class="mx-auto max-w-5xl space-y-6">
	<!-- Box 1: Header, Search, dan Filter -->
	<div class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
		<h1 class="mb-6 text-xl font-bold text-[#6f4e37] sm:text-2xl">Jurnal Aktivitas PKL</h1>

		<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between print:hidden">
			<SearchBar bind:searchQuery />
			<DateFilter bind:selectedFilter />
		</div>
	</div>

	<!-- Box 2: Tombol Tambah dan Tabel Data -->
	<div class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
		<div class="mb-4 flex flex-col gap-2 sm:flex-row sm:justify-end print:hidden">
			<button
				type="button"
				onclick={handleCetak}
				class="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e6d9cc] bg-white px-4 py-2 font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] sm:w-auto"
			>
				<svg class="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
					/>
				</svg>
				Cetak Riwayat Aktivitas
			</button>
			<button
				type="button"
				onclick={() => (isModalOpen = true)}
				class="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600 sm:w-auto"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Tambah Aktivitas
			</button>
		</div>

		<LogbookTable logs={filteredLogs} onEdit={handleEdit} onDelete={handleDelete} />
	</div>
</div>

<!-- Modal diletakkan di luar struktur grid/box -->
<ActivityModal bind:isModalOpen onSave={handleSaveActivity} />
