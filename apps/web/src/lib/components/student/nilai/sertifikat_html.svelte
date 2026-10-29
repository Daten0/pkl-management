<script lang="ts">
	let { userId }: { userId: string } = $props();
</script>

<!-- Container berukuran presisi A4 Landscape (297mm x 210mm) -->
<!-- Bayangan dan margin akan dihilangkan otomatis saat masuk mode print -->
<div class="w-[297mm] h-[210mm] mx-auto bg-white border border-[#e6d9cc] shadow-xl print:shadow-none print:border-none print:m-0 overflow-hidden relative">
	
	<!-- Bingkai Oranye Sertifikat -->
	<div class="absolute inset-4 border-[10px] border-orange-400 p-8 flex flex-col items-center text-center bg-white">
		
		<!-- Kop Surat -->
		<img src="/logo-unm.png" alt="Logo UNM" class="w-24 h-24 object-contain mb-2" />
		<h2 class="text-xl font-serif tracking-wide">Universitas Negeri Makassar</h2>
		<h1 class="text-2xl font-bold text-orange-600 mt-4 tracking-widest">
			BUKTI PEMBEKALAN PRAKTIK INDUSTRI
		</h1>
		<p class="text-sm mt-1">Nomor: 2795/UN36.2/JTIK/V/2026</p>

		<!-- Konten Utama -->
		<div class="mt-14 w-full">
			<p class="text-[#6f4e37] mb-3 text-lg">Diberikan Kepada:</p>
			<!-- Nama bisa diambil dari database backend berdasarkan userId -->
			<h2 class="text-4xl font-bold text-[#6f4e37] mb-3 uppercase tracking-wider">
				Muhammad Siddiq Febri Nusantara
			</h2>
			<p class="text-[#6f4e37] mb-4 text-lg">Sebagai:</p>
			<p class="text-2xl font-bold mb-4">Peserta Pembekalan Praktik Industri</p>
			<hr class="border-orange-400 w-3/4 mx-auto border-t-2 mt-4" />
		</div>

		<!-- Footer Kiri & Kanan -->
		<div class="mt-auto w-full flex justify-between px-10 text-sm pb-4">
			<div class="text-left text-[#8c6b54]">
				<p>Bukti ini dicetak dari Sistem Informasi Praktek Industri</p>
				<p>Jurusan Teknik Informatika dan Komputer</p>
				<p>pada tanggal 29/10/2026 pukul 21:54</p>
				<p class="mt-4 font-mono text-xs opacity-50">Ref: {userId}</p>
			</div>

			<div class="text-center w-64">
				<p>Ketua Pengelola Unit Praktik Industri</p>
				<p>Teknik Informatika dan Komputer</p>
				<div class="h-24 w-40 mx-auto mt-2 relative">
					<!-- Tanda Tangan Placeholder -->
					<!-- class mix-blend-multiply menghilangkan background putih pada TTD -->
					<img src="/ttd-ainun.png" alt="TTD" class="absolute inset-0 w-full h-full object-contain mix-blend-multiply" />
					<div class="absolute bottom-2 left-0 w-full border-b border-[#6f4e37]"></div>
				</div>
				<p class="font-bold mt-1 text-base">Ainun Nida Rifqi, S.Psi, M.Psi.T</p>
				<p class="text-xs">NIP. 199310212025062007</p>
			</div>
		</div>
	</div>
</div>

<style>
	/* Memaksa browser untuk mencetak dengan orientasi Landscape & merender background-color/border css */
	@media print {
		@page {
			size: A4 landscape;
			margin: 0;
		}
		:global(body) {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			background-color: white !important;
		}
	}
</style>