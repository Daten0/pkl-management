<!-- src/lib/components/guru/DashboardContent.svelte -->
<div class="max-w-7xl mx-auto space-y-6">
	<!-- Header Dashboard -->
	<div>
		<h2 class="text-2xl font-bold text-[#6f4e37]">Dashboard Guru Pembimbing</h2>
		<p class="text-[#8c6b54] text-sm mt-1">Pantau kelompok bimbingan, aktivitas siswa, dan tindak lanjut penilaian PKL.</p>
	</div>

	<!-- Baris Atas: 2 UI Box Statistik -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<!-- Box 1: Total Kelompok PKL -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-[#8c6b54]">Kelompok Bimbingan (Aktif)</p>
				<h3 class="text-3xl font-bold text-orange-500 mt-1">4</h3>
			</div>
			<div class="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl">
				🏢
			</div>
		</div>

		<!-- Box 2: Total Siswa -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-[#8c6b54]">Total Siswa Bimbingan</p>
				<h3 class="text-3xl font-bold text-orange-500 mt-1">16</h3>
			</div>
			<div class="w-12 h-12 bg-[#f4ebe1] text-[#6f4e37] rounded-full flex items-center justify-center text-2xl">
				👨‍🎓
			</div>
		</div>
	</div>

	<!-- Baris Bawah: 4 UI Box Actionable Events -->
	<!-- Menggunakan grid 2 kolom di layar besar (lg), 1 kolom di layar kecil/medium -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		
		<!-- Box 1: Terbitkan Surat Penugasan -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 h-fit flex flex-col">
			<div class="flex justify-between items-center border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-lg font-bold text-orange-500">Penerbitan Surat Penugasan</h3>
				<span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">1 Aksi</span>
			</div>
			<ul class="space-y-3 flex-1">
				<li class="bg-[#f4ebe1] rounded-lg p-3 border-l-4 border-orange-500">
					<p class="font-semibold text-[#6f4e37]">Kelompok RPL - PT. Teknologi Cemerlang</p>
					<p class="text-xs text-[#8c6b54] mt-1">Lokasi: Jl. Urip Sumoharjo, Makassar</p>
					<p class="text-xs text-[#8c6b54] mt-1 font-medium">Status: Dokumen Pengajuan Diterima</p>
					<div class="mt-3">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-2 rounded cursor-pointer transition-colors w-full flex items-center justify-center gap-2">
							<span>📄</span> Terbitkan Surat Tugas
						</button>
					</div>
				</li>
			</ul>
		</div>

		<!-- Box 2: Kehadiran / Alpa Siswa -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 h-fit flex flex-col">
			<div class="flex justify-between items-center border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-lg font-bold text-red-500">Peringatan: Siswa Alpa (Tanpa Keterangan)</h3>
				<span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">2 Laporan</span>
			</div>
			<ul class="space-y-3 flex-1">
				<li class="bg-white border border-red-200 rounded-lg p-3 shadow-sm">
					<div class="flex justify-between">
						<div>
							<p class="font-semibold text-[#6f4e37]">Andi Pratama</p>
							<p class="text-xs text-[#8c6b54] mt-1">Lokasi: CV. Solusi Jaringan Timur</p>
						</div>
						<div class="text-right">
							<span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">2 Hari Alpa</span>
						</div>
					</div>
					<div class="mt-3 pt-2 border-t border-dashed border-red-100 flex gap-2">
						<button class="bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors w-full">Hubungi Siswa</button>
						<button class="bg-white border border-[#e6d9cc] text-[#6f4e37] hover:bg-gray-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors w-full">Hubungi DUDI</button>
					</div>
				</li>
			</ul>
		</div>

		<!-- Box 3: Izin / Sakit Siswa -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 h-fit flex flex-col">
			<div class="flex justify-between items-center border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-lg font-bold text-orange-500">Validasi Izin / Sakit Siswa</h3>
				<span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">1 Menunggu</span>
			</div>
			<ul class="space-y-3 flex-1">
				<li class="bg-[#f4ebe1] rounded-lg p-3 border-l-4 border-yellow-500">
					<div class="flex justify-between">
						<div>
							<p class="font-semibold text-[#6f4e37]">Siti Aminah</p>
							<p class="text-xs text-[#8c6b54] mt-1">Lokasi: PT. Makassar Digital</p>
							<p class="text-xs font-medium text-yellow-700 mt-1">Keterangan: Sakit (Lampiran Surat Dokter)</p>
						</div>
						<span class="text-xl">🤒</span>
					</div>
					<div class="mt-3 flex gap-2">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors flex-1">Validasi Izin</button>
						<button class="bg-white border border-[#e6d9cc] text-[#6f4e37] hover:bg-gray-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors flex-1">Lihat Surat</button>
					</div>
				</li>
			</ul>
		</div>

		<!-- Box 4: Siswa Belum Dinilai -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-5 h-fit flex flex-col">
			<div class="flex justify-between items-center border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-lg font-bold text-orange-500">Siswa Belum Diberikan Penilaian Akhir</h3>
				<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">4 Siswa</span>
			</div>
			<ul class="space-y-2 flex-1">
				<li class="flex items-center justify-between p-2 hover:bg-[#f4ebe1] rounded transition-colors">
					<div>
						<p class="font-semibold text-[#6f4e37] text-sm">Kelompok TKJ - Telkom Regional VII</p>
						<p class="text-xs text-[#8c6b54]">4 Siswa telah menyelesaikan masa PKL</p>
					</div>
					<button class="bg-[#e6d9cc] hover:bg-orange-200 text-[#6f4e37] hover:text-orange-800 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Beri Nilai</button>
				</li>
				<!-- State kosong jika semua sudah dinilai -->
				<!--
				<li class="text-center py-6 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg">
					Semua siswa di kelompok yang telah selesai sudah diberikan nilai.
				</li>
				-->
			</ul>
		</div>

	</div>
</div>