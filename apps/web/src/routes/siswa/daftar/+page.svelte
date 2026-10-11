<script lang="ts">
	import LogoPane from '#lib/components/student/login/LogoPane.svelte';
	import RegistrationForm from '#lib/components/student/daftar/RegistrationForm.svelte';
</script>

<div class="min-h-screen w-full flex flex-col lg:flex-row">
	<LogoPane />
	<section class="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center px-8 py-12 lg:px-16">
		<RegistrationForm />
	</section>
</div>
