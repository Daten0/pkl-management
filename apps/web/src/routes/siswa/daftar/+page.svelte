<script lang="ts">
	import LogoPane from '#lib/components/student/login/LogoPane.svelte';
	import RegistrationForm from '#lib/components/student/daftar/RegistrationForm.svelte';
</script>

<div class="flex min-h-dvh w-full flex-col lg:flex-row">
	<LogoPane />
	<section class="flex w-full flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
		<div class="w-full max-w-md">
			<div class="mb-6 text-center lg:hidden">
				<h1 class="text-2xl font-extrabold tracking-tight text-slate-900">PKL Management</h1>
				<p class="mt-1 text-sm text-slate-500">Sistem Manajemen Praktik Kerja Lapangan</p>
			</div>
			<RegistrationForm />
		</div>
	</section>
</div>
