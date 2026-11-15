<script lang="ts">
	import { statusBadgeClass } from '#lib/features/student/presensi/constants.ts';
	import type { StatusPresensi } from '#lib/features/student/presensi/types.ts';

	let { status }: { status: StatusPresensi } = $props();
</script>

<span
	class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium {statusBadgeClass[
		status
	]}"
>
	{status}
</span>
