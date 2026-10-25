<!-- src/lib/components/admin/DashboardContent.svelte -->
<div class="max-w-7xl mx-auto space-y-6">
	<!-- Header Dashboard -->
	<div>
		<h2 class="text-xl font-bold text-[#6f4e37] sm:text-2xl">Dashboard Administrator</h2>
		<p class="text-[#8c6b54] text-sm mt-1">Ringkasan data dan persetujuan aksi sistem PKL.</p>
	</div>

	<!-- Baris Atas: 3 UI Box Statistik -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
		<!-- Box 1: Siswa Terdaftar -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-4 sm:p-5 flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-[#8c6b54]">Siswa Terdaftar</p>
				<h3 class="text-3xl font-bold text-orange-500 mt-1">245</h3>
			</div>
			<div class="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl">
				🎓
			</div>
		</div>

		<!-- Box 2: Guru Terdaftar -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-4 sm:p-5 flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-[#8c6b54]">Guru Terdaftar</p>
				<h3 class="text-3xl font-bold text-orange-500 mt-1">32</h3>
			</div>
			<div class="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl">
				👨‍🏫
			</div>
		</div>

		<!-- Box 3: Admin Terdaftar -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-4 sm:p-5 flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-[#8c6b54]">Admin Terdaftar</p>
				<h3 class="text-3xl font-bold text-[#6f4e37] mt-1">3</h3>
			</div>
			<div class="w-12 h-12 bg-[#f4ebe1] text-[#6f4e37] rounded-full flex items-center justify-center text-2xl">
				🛡️
			</div>
		</div>
	</div>

	<!-- Baris Bawah: 2 UI Box Actionable Events -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
		
		<!-- Box Kiri: Pengajuan Ulang Anggota Grup -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-4 sm:p-5 h-fit">
			<div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-base font-bold text-orange-500 sm:text-lg">Pengajuan Ulang Anggota</h3>
				<span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">2 Menunggu</span>
			</div>
			
			<ul class="space-y-3">
				<li class="bg-[#f4ebe1] rounded-lg p-3 border-l-4 border-orange-500">
					<p class="font-semibold text-[#6f4e37]">Kelompok TKJ - Telkom Regional VII</p>
					<p class="text-xs text-[#8c6b54] mt-1">Alasan: Terdapat 1 anggota yang mengundurkan diri (Pindah Sekolah).</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Setujui</button>
						<button class="bg-white border border-[#e6d9cc] text-[#6f4e37] hover:bg-gray-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Tolak Pengajuan</button>
					</div>
				</li>
				<li class="bg-[#f4ebe1] rounded-lg p-3 border-l-4 border-orange-500">
					<p class="font-semibold text-[#6f4e37]">Kelompok RPL - PT. Makassar Digital</p>
					<p class="text-xs text-[#8c6b54] mt-1">Alasan: Penambahan anggota baru sesuai kuota DUDI.</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Setujui</button>
						<button class="bg-white border border-[#e6d9cc] text-[#6f4e37] hover:bg-gray-50 text-xs px-3 py-1.5 rounded cursor-pointer transition-colors">Tolak Pengajuan</button>
					</div>
				</li>
			</ul>
		</div>

		<!-- Box Kanan: Registrasi Lokasi PKL Baru -->
		<div class="bg-white rounded-xl shadow-sm border border-[#e6d9cc] p-4 sm:p-5 h-fit">
			<div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6d9cc] pb-2 mb-4">
				<h3 class="text-base font-bold text-orange-500 sm:text-lg">Verifikasi Registrasi Lokasi (DUDI)</h3>
				<span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">1 Menunggu</span>
			</div>
			
			<ul class="space-y-3">
				<li class="bg-white border border-[#e6d9cc] rounded-lg p-3">
					<div class="flex justify-between items-start">
						<div>
							<p class="font-semibold text-[#6f4e37]">CV. Solusi Jaringan Timur</p>
							<p class="text-xs text-[#8c6b54] mt-1">Lokasi: Jl. Perintis Kemerdekaan KM.10, Makassar</p>
							<p class="text-xs text-[#8c6b54]">Bidang: Infrastruktur Jaringan & CCTV</p>
						</div>
						<span class="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded">Survei Tertunda</span>
					</div>
					
					<div class="mt-4 pt-3 border-t border-dashed border-[#e6d9cc] flex flex-wrap gap-2">
						<button class="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors w-full">Verifikasi Data & Setujui</button>
						<button class="bg-[#f4ebe1] hover:bg-[#e6d9cc] text-[#6f4e37] text-xs px-3 py-1.5 rounded cursor-pointer transition-colors whitespace-nowrap">Detail Profil</button>
					</div>
				</li>
			</ul>
		</div>

	</div>
</div>