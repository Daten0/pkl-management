<script lang="ts">
	let username = $state('');
	let password = $state('');

	function handleLogin() {
		console.log('Login:', username, password);
	}
</script>

<article class="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-8 sm:p-8 lg:p-10">
	<header class="space-y-1">
		<h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Masuk</h2>
		<p class="text-slate-500">Silakan masukkan akun anda untuk melanjutkan.</p>
	</header>

	<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-5">
		<div class="space-y-1.5">
			<label for="username" class="block text-sm font-semibold text-slate-700">Nama Lengkap / NIS</label>
			<input
				id="username"
				type="text"
				bind:value={username}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition"
				placeholder="Masukkan Nama Lengkap atau NIS/NISN!"
			/>
		</div>

		<div class="space-y-1.5">
			<label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition"
				placeholder="Masukkan password"
			/>
		</div>

		<p class="text-sm text-slate-600 text-center">Jika belum punya akun <a href="/siswa/daftar" class="text-orange-500 font-semibold hover:underline">klik ini</a></p>

		<button
			type="submit"
			class="w-full rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base py-3.5 shadow-lg shadow-orange-500/20 transition-colors duration-200"
		>
			Login
		</button>
	</form>
</article>
