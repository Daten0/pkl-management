<script lang="ts">
	type Member = { nisn: string; nama: string; kelas: string; program: string; role: 'Ketua' | 'Member' };
	type Props = { members: Member[] };
	let { members }: Props = $props();
</script>

<div class="bg-slate-50 border border-[#e6d9cc] rounded-lg p-5 flex flex-col gap-4">
	<h2 class="text-lg font-semibold text-[#6f4e37] flex items-center gap-2">
		<svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
		Detail Anggota
	</h2>

	<div class="overflow-x-auto bg-white border border-[#e6d9cc] rounded-lg shadow-sm">
		<table class="w-full text-sm text-left text-[#6f4e37]">
			<thead class="text-xs text-[#6f4e37] uppercase bg-[#f4ebe1] border-b border-[#e6d9cc]">
				<tr>
					<th class="px-4 py-3">NIS/NISN</th>
					<th class="px-4 py-3">Nama</th>
					<th class="px-4 py-3">Kelas & Program</th>
					<th class="px-4 py-3 text-center">Status</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-[#e6d9cc]">
				{#each members as member}
					<tr class="hover:bg-orange-50/50 transition-colors">
						<td class="px-4 py-3 font-medium text-[#6f4e37]">{member.nisn}</td>
						<td class="px-4 py-3">{member.nama}</td>
						<td class="px-4 py-3">
							<span class="block">{member.kelas}</span>
							<span class="text-xs text-[#6f4e37]/70 truncate max-w-[150px] block mt-0.5">{member.program}</span>
						</td>
						<td class="px-4 py-3 text-center">
							{#if member.role === 'Ketua'}
								<span class="inline-flex items-center px-2 py-1 text-xs font-semibold bg-orange-50 text-orange-700 rounded border border-orange-200">Ketua</span>
							{:else}
								<span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-[#f4ebe1] text-[#6f4e37] rounded border border-[#e6d9cc]">Member</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
