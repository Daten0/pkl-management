<script lang="ts">
	import { statusBadgeClass } from '#lib/constants/student/presensi.ts';
	import type { StatusPresensi } from '#lib/types/student/presensi.ts';

	let { status }: { status: StatusPresensi } = $props();
</script>

<span
	class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium {statusBadgeClass[
		status
	]}"
>
	{status}
</span>
