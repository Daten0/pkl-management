<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, icon, href, rel }: {
		title: string;
		icon: Snippet; // Menerima raw HTML/SVG snippet
		href: string;
		rel?: string;
	} = $props();
</script>

<a 
	{href}
	{rel}
	class="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-200 w-[240px] h-[180px] border border-gray-50 cursor-pointer"
>
	<!-- Render snippet raw SVG di sini -->
	<div class="text-[#007bff] mb-5">
		{@render icon()}
	</div>
	
	<span class="text-[#334155] font-bold text-[15px] text-center leading-snug">
		{title}
	</span>
</a>