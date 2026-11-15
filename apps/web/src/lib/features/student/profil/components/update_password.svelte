<script lang="ts">
	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let errorMessage = $state('');
	let successMessage = $state('');
	let dialogEl = $state<HTMLDialogElement>();

	function bukaKonfirmasi(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';
		successMessage = '';

		if (!currentPassword) {
			errorMessage = 'Password saat ini wajib diisi.';
			return;
		}

		if (newPassword.length < 8) {
			errorMessage = 'Password baru minimal 8 karakter.';
			return;
		}

		if (newPassword === currentPassword) {
			errorMessage = 'Password baru tidak boleh sama dengan password saat ini.';
			return;
		}

		if (newPassword !== confirmPassword) {
			errorMessage = 'Konfirmasi password tidak cocok dengan password baru.';
			return;
		}

		dialogEl?.showModal();
	}

	function tutupDialog() {
		dialogEl?.close();
	}

	function konfirmasiUbah() {
		// TODO: ganti dengan pemanggilan API ubah password saat endpoint tersedia.
		dialogEl?.close();
		errorMessage = '';
		successMessage = 'Password berhasil diperbarui.';
		currentPassword = '';
		newPassword = '';
		confirmPassword = '';
	}

	function bersihkanStatus() {
		if (successMessage) successMessage = '';
		if (errorMessage) errorMessage = '';
	}
</script>

<div class="rounded-xl border border-[#e6d9cc] bg-white p-4 shadow-sm sm:p-6">
	<h2 class="mb-4 text-lg font-semibold text-[#6f4e37]">Ubah Password</h2>

	{#if errorMessage}
		<div role="alert" class="mb-4 rounded-lg border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
			{errorMessage}
		</div>
	{/if}

	{#if successMessage}
		<div role="status" aria-live="polite" class="mb-4 rounded-lg border-l-4 border-green-500 bg-green-50 p-3 text-sm text-green-700">
			{successMessage}
		</div>
	{/if}

	<form class="space-y-4" novalidate oninput={bersihkanStatus} onsubmit={bukaKonfirmasi}>
		<div>
			<label for="password-saat-ini" class="mb-1 block text-sm font-medium text-[#6f4e37]">
				Password Saat Ini
			</label>
			<input
				id="password-saat-ini"
				type="password"
				bind:value={currentPassword}
				required
				autocomplete="current-password"
				placeholder="••••••••"
				class="min-h-11 w-full rounded-lg border border-[#e6d9cc] bg-white px-3 text-[#6f4e37] placeholder:text-[#6f4e37]/40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
			/>
		</div>

		<div>
			<label for="password-baru" class="mb-1 block text-sm font-medium text-[#6f4e37]">Password Baru</label>
			<input
				id="password-baru"
				type="password"
				bind:value={newPassword}
				required
				autocomplete="new-password"
				placeholder="••••••••"
				aria-describedby="password-baru-hint"
				class="min-h-11 w-full rounded-lg border border-[#e6d9cc] bg-white px-3 text-[#6f4e37] placeholder:text-[#6f4e37]/40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
			/>
			<p id="password-baru-hint" class="mt-1 text-xs text-[#8c6b54]">Minimal 8 karakter.</p>
		</div>

		<div>
			<label for="password-konfirmasi" class="mb-1 block text-sm font-medium text-[#6f4e37]">
				Konfirmasi Password Baru
			</label>
			<input
				id="password-konfirmasi"
				type="password"
				bind:value={confirmPassword}
				required
				autocomplete="new-password"
				placeholder="••••••••"
				class="min-h-11 w-full rounded-lg border border-[#e6d9cc] bg-white px-3 text-[#6f4e37] placeholder:text-[#6f4e37]/40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
			/>
		</div>

		<div class="pt-2">
			<button
				type="submit"
				class="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
			>
				Ubah Password
			</button>
		</div>
	</form>
</div>

<dialog
	bind:this={dialogEl}
	aria-labelledby="judul-ubah-password"
	onclick={(event) => {
		if (event.target === dialogEl) tutupDialog();
	}}
	class="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-md overflow-hidden rounded-xl border border-[#e6d9cc] bg-white p-0 text-[#6f4e37] shadow-2xl backdrop:bg-[#6f4e37]/50 backdrop:backdrop-blur-sm"
>
	<div class="flex max-h-[90dvh] flex-col">
		<div class="flex items-center justify-between border-b border-[#e6d9cc] p-5">
			<h2 id="judul-ubah-password" class="text-lg font-bold text-[#6f4e37]">Konfirmasi Ubah Password</h2>
			<button
				type="button"
				onclick={tutupDialog}
				aria-label="Tutup"
				class="rounded-lg p-1.5 text-[#6f4e37]/60 transition-colors hover:bg-orange-50 hover:text-orange-600"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="flex-1 overflow-y-auto p-5">
			<p class="text-sm leading-relaxed text-[#6f4e37]/70">
				Password akan diubah, pastikan diingat dengan baik. Jika kredensial password lupa, hubungi admin
				program keahlian untuk melakukan reset password.
			</p>
		</div>

		<div class="flex flex-col-reverse gap-2 border-t border-[#e6d9cc] bg-slate-50 p-4 sm:flex-row sm:justify-end">
			<button
				type="button"
				onclick={tutupDialog}
				class="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#e6d9cc] bg-white px-4 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
			>
				Batal
			</button>
			<button
				type="button"
				onclick={konfirmasiUbah}
				class="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none sm:w-auto"
			>
				Ya, Lanjutkan
			</button>
		</div>
	</div>
</dialog>
