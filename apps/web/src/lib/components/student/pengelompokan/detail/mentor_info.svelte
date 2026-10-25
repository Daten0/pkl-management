<script lang="ts">
	let {
		mentorName = $bindable(''),
		mentorPhone = $bindable(''),
		onSave
	}: {
		mentorName: string;
		mentorPhone: string;
		onSave: () => void;
	} = $props();

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onSave();
	}
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-4 sm:p-5 flex flex-col gap-5">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
		Informasi Mentor PKL
	</h2>

	<form class="flex flex-col gap-4" onsubmit={handleSubmit}>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<div class="flex flex-col gap-1.5">
				<label for="mentor-name" class="text-sm font-medium text-[#6f4e37]/80">Nama Mentor</label>
				<input
					id="mentor-name"
					type="text"
					bind:value={mentorName}
					required
					placeholder="Masukkan nama mentor"
					class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37] placeholder:text-[#6f4e37]/40 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<label for="mentor-phone" class="text-sm font-medium text-[#6f4e37]/80">Nomor Telepon Mentor</label>
				<input
					id="mentor-phone"
					type="tel"
					bind:value={mentorPhone}
					required
					placeholder="08xx-xxxx-xxxx"
					class="w-full px-4 py-2.5 bg-white border border-[#e6d9cc] rounded-lg text-sm text-[#6f4e37] placeholder:text-[#6f4e37]/40 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
				/>
			</div>
		</div>

		<div class="flex justify-end">
			<button
				type="submit"
				class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
				Simpan Informasi Mentor
			</button>
		</div>
	</form>
</div>
