<script lang="ts">
	// Svelte 5 $props rune
	let { title, icon: Icon, href }: {
		title: string;
		icon: any;
		href: string;
	} = $props();
</script>

<a {href} class="group flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300 cursor-pointer">
	<div class="mb-4 text-gray-500 group-hover:text-blue-600 transition-colors">
		<Icon size={64} strokeWidth={1.5} />
	</div>
	<span class="text-2xl font-bold text-gray-800 group-hover:text-blue-700">
		{title}
	</span>
</a>