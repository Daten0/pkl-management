<!-- src/lib/components/DashboardContent.svelte -->
<script>
	const progressSteps = [
		{ title: 'Penentuan Kelompok', status: 'completed', date: '10 Ags 2026' },
		{ title: 'Memilih Lokasi PKL', status: 'completed', date: '15 Ags 2026' },
		{ title: 'Pelaksanaan PKL', status: 'current', date: 'Sedang Berlangsung' },
		{ title: 'Selesai PKL', status: 'pending', date: 'Belum' },
		{ title: 'Penerbitan Nilai', status: 'pending', date: 'Belum' }
	];
</script>

<div class="max-w-7xl mx-auto space-y-6">
	<!-- Header Dashboard -->
	<div>
		<h2 class="text-2xl font-bold text-[#6f4e37]">Selamat Datang di Dashboard!</h2>
		<p class="text-[#8c6b54] text-sm mt-1">Pantau informasi dan progres kegiatan Praktik Kerja Lapangan Anda di sini.</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		
		<!-- Box 1: Undangan Kelompok -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 h-fit">
			<h3 class="text-lg font-bold text-orange-500 border-b border-[#e6d9cc] pb-2 mb-4">Undangan Kelompok</h3>
			<ul class="space-y-3">
				<li class="bg-[#f4ebe1] rounded-lg p-3 border-l-4 border-orange-500">
					<p class="font-semibold text-[#6f4e37]">Kelompok PT. Teknologi Nusantara</p>
					<p class="text-xs text-[#8c6b54] mt-1">Diundang oleh: Ahmad Fauzi</p>
					<div class="mt-3 flex gap-2">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Terima</button>
						<button class="bg-white border border-[#e6d9cc] text-[#6f4e37] hover:bg-gray-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Tolak</button>
					</div>
				</li>
			</ul>
		</div>

		<!-- Box 2: Timeline Progress -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 lg:col-span-2">
			<h3 class="text-lg font-bold text-orange-500 border-b border-[#e6d9cc] pb-2 mb-6">Progress Kegiatan PKL</h3>
			<div class="relative pl-4">
				<div class="absolute left-[23px] top-2 bottom-0 w-0.5 bg-gray-200"></div>
				<ul class="space-y-6 relative">
					{#each progressSteps as step}
						<li class="flex items-start gap-4">
							<div class="relative z-10 flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 
								{step.status === 'completed' ? 'bg-orange-500 text-white' : 
								step.status === 'current' ? 'bg-white border-4 border-orange-500' : 'bg-gray-200 border-2 border-white'}">
								{#if step.status === 'completed'}
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
								{/if}
							</div>
							<div class="-mt-1">
								<p class="font-bold {step.status === 'current' ? 'text-orange-600' : step.status === 'completed' ? 'text-[#6f4e37]' : 'text-gray-400'}">{step.title}</p>
								<p class="text-xs mt-0.5 {step.status === 'pending' ? 'text-gray-400' : 'text-[#8c6b54]'}">{step.date}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Box 3: Event Umum -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 lg:col-span-3">
			<h3 class="text-lg font-bold text-orange-500 border-b border-[#e6d9cc] pb-2 mb-4">Pengumuman & Event Umum</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="flex gap-4 p-4 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-50 transition-colors">
					<div class="w-12 h-12 bg-orange-200 rounded-lg flex flex-col items-center justify-center text-orange-700 flex-shrink-0">
						<span class="text-xs font-bold">SEP</span><span class="text-lg font-black leading-none">20</span>
					</div>
					<div>
						<h4 class="font-bold text-[#6f4e37]">Batas Akhir Upload Jurnal</h4>
						<p class="text-sm text-[#8c6b54] mt-1 line-clamp-2">Harap memastikan seluruh jurnal harian telah diverifikasi sebelum sistem dikunci.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>