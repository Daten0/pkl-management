<script lang="ts">
	let nis = $state('');
	let nama = $state('');
	let password = $state('');
	let program = $state('');
	let kelas = $state('');

	function handleDaftar() {
		console.log('Daftar:', { nis, nama, program, kelas });
	}
</script>

<article class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-6 sm:p-8 lg:p-10">
	<header class="space-y-1">
		<h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Daftar Akun</h2>
		<p class="text-slate-500">Isi data siswa untuk membuat akun baru.</p>
	</header>

	<form onsubmit={(e) => { e.preventDefault(); handleDaftar(); }} class="space-y-4">
		<div class="space-y-1.5">
			<label for="nis" class="block text-sm font-semibold text-slate-700">NIS / NISN</label>
			<input id="nis" type="text" bind:value={nis} placeholder="Masukkan NIS/NISN" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition" />
		</div>

		<div class="space-y-1.5">
			<label for="nama" class="block text-sm font-semibold text-slate-700">Nama Lengkap</label>
			<input id="nama" type="text" bind:value={nama} placeholder="Masukkan nama lengkap" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition" />
		</div>

		<div class="space-y-1.5">
			<label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
			<input id="password" type="password" bind:value={password} placeholder="Buat password" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition" />
		</div>

		<div class="space-y-1.5">
			<label for="program" class="block text-sm font-semibold text-slate-700">Program Keahlian</label>
			<select id="program" bind:value={program} class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition appearance-none">
				<option value="">Pilih program</option>
				<option value="TKJ">Teknik Komputer dan Jaringan</option>
				<option value="MM">Multimedia</option>
				<option value="RPL">Rekayasa Perangkat Lunak</option>
				<option value="AN">Akuntansi</option>
			</select>
		</div>

		<div class="space-y-1.5">
			<label for="kelas" class="block text-sm font-semibold text-slate-700">Kelas</label>
			<input id="kelas" type="text" bind:value={kelas} placeholder="Contoh: X RPL 1" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition" />
		</div>

		<button type="submit" class="w-full rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base py-3.5 shadow-lg shadow-orange-500/20 transition-colors duration-200">
			Daftar Akun
		</button>
	</form>
</article>
