<script lang="ts">
	import { MemberStatus, type Member } from '#lib/types/student/member.ts';

	let { 
		groupMembers = $bindable<Member[]>([]), 
		onOpenModal 
	}: { 
		groupMembers: Member[], 
		onOpenModal: () => void 
	} = $props();

	const statusStyles: Record<MemberStatus, string> = {
		[MemberStatus.Bergabung]: 'bg-green-50 text-green-700 border-green-200',
		[MemberStatus.Pending]: 'bg-orange-50 text-orange-700 border-orange-200',
		[MemberStatus.Ditolak]: 'bg-red-50 text-red-700 border-red-200'
	};

	function removeMember(nisn: string) {
		groupMembers = groupMembers.filter(m => m.nisn !== nisn);
	}
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-5 flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
			<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
			Grup Kelompok
		</h2>
		<button onclick={onOpenModal} class="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-1.5">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
			Tambah
		</button>
	</div>

	<div class="overflow-x-auto bg-white border border-[#e6d9cc] rounded-lg shadow-sm">
		<table class="w-full min-w-[760px] text-sm text-left text-[#6f4e37]">
			<thead class="text-xs text-[#6f4e37] uppercase bg-[#f4ebe1] border-b border-[#e6d9cc]">
				<tr>
					<th class="px-4 py-3">NIS/NISN</th>
					<th class="px-4 py-3">Nama</th>
					<th class="px-4 py-3">Kelas</th>
					<th class="px-4 py-3">Program Keahlian</th>
					<th class="px-4 py-3">Status</th>
					<th class="px-4 py-3 text-center">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#e6d9cc]">
				{#if groupMembers.length === 0}
					<tr>
						<td colspan="6" class="px-4 py-6 text-center text-sm text-[#6f4e37]/50 italic bg-slate-50/50">Belum ada anggota.</td>
					</tr>
				{:else}
					{#each groupMembers as member (member.nisn)}
						<tr class="hover:bg-orange-50/50 transition-colors">
							<td class="px-4 py-3 font-medium text-[#6f4e37]">{member.nisn}</td>
							<td class="px-4 py-3">{member.nama}</td>
							<td class="px-4 py-3">{member.kelas}</td>
							<td class="px-4 py-3 text-[#6f4e37]/70 truncate max-w-[150px]">{member.program}</td>
							<td class="px-4 py-3">
								<span class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded border {statusStyles[member.status]}">
									{member.status}
								</span>
							</td>
							<td class="px-4 py-3 text-center">
								<button onclick={() => removeMember(member.nisn)} class="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" aria-label="Hapus">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
								</button>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
