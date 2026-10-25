<script lang="ts">
	import { MemberStatus, type Member, type Student } from '#lib/types/student/member.ts';

	let { 
		groupMembers = $bindable<Member[]>([]), 
		availableStudents, 
		onClose 
	}: { 
		groupMembers: Member[], 
		availableStudents: Student[], 
		onClose: () => void 
	} = $props();

	let dialogEl = $state<HTMLDialogElement>();

	$effect(() => {
		if (dialogEl && !dialogEl.open) {
			dialogEl.showModal();
		}
	});

	function addMember(student: Student) {
		if (!groupMembers.find(m => m.nisn === student.nisn)) {
			groupMembers = [...groupMembers, { ...student, status: MemberStatus.Bergabung }];
		}
	}

	function closeDialog() {
		dialogEl?.close();
	}
</script>

<dialog
	bind:this={dialogEl}
	aria-labelledby="student-modal-title"
	onclose={onClose}
	onclick={(e) => {
		if (e.target === dialogEl) closeDialog();
	}}
	class="m-auto w-[calc(100%_-_2rem)] max-w-4xl max-h-[90dvh] overflow-hidden rounded-xl border border-[#e6d9cc] bg-white p-0 text-[#6f4e37] shadow-2xl backdrop:bg-[#6f4e37]/50 backdrop:backdrop-blur-sm"
>
	<div class="flex max-h-[90dvh] flex-col">
		<div class="flex items-center justify-between p-4 border-b border-[#e6d9cc] sm:p-5">
			<h3 id="student-modal-title" class="text-lg font-semibold text-[#6f4e37]">Daftar Siswa Tersedia</h3>
			<button type="button" onclick={closeDialog} aria-label="Tutup" class="text-[#6f4e37]/60 hover:bg-orange-50 hover:text-orange-600 p-1.5 rounded-lg transition-colors">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>

		<div class="flex-1 min-h-0 p-4 overflow-y-auto sm:p-5">
			<div class="overflow-x-auto border border-[#e6d9cc] rounded-lg">
				<table class="w-full min-w-[640px] text-sm text-left text-[#6f4e37]">
					<thead class="text-xs text-[#6f4e37] uppercase bg-[#f4ebe1] border-b border-[#e6d9cc]">
						<tr>
							<th class="px-4 py-3">NIS/NISN</th>
							<th class="px-4 py-3">Nama</th>
							<th class="px-4 py-3">Kelas</th>
							<th class="px-4 py-3">Program Keahlian</th>
							<th class="px-4 py-3 text-center">Aksi</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#e6d9cc]">
						{#each availableStudents as student}
							{@const isAdded = groupMembers.find(m => m.nisn === student.nisn)}
							<tr class="hover:bg-orange-50/50 transition-colors">
								<td class="px-4 py-3 font-medium text-[#6f4e37]">{student.nisn}</td>
								<td class="px-4 py-3">{student.nama}</td>
								<td class="px-4 py-3">{student.kelas}</td>
								<td class="px-4 py-3">{student.program}</td>
								<td class="px-4 py-3 text-center">
									{#if isAdded}
										<span class="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-orange-50 text-orange-700 rounded border border-orange-200">Terpilih</span>
									{:else}
										<button type="button" onclick={() => addMember(student)} class="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-semibold rounded transition-colors">Tambah</button>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="flex flex-col-reverse gap-2 p-4 border-t border-[#e6d9cc] bg-slate-50 rounded-b-xl sm:flex-row sm:justify-end">
			<button type="button" onclick={closeDialog} class="w-full px-5 py-2 text-sm font-medium text-[#6f4e37] bg-white border border-[#e6d9cc] hover:bg-[#f4ebe1] rounded-lg shadow-sm transition-all sm:w-auto">Tutup</button>
		</div>
	</div>
</dialog>
