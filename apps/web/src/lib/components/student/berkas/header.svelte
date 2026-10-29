<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="mb-6 border-b border-[#e6d9cc] pb-4">
	<h1 class="text-xl font-bold text-[#6f4e37] sm:text-2xl">{title}</h1>
	<p class="mt-1 text-sm text-[#8c6b54]">{description}</p>
</div>