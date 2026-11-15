<script lang="ts">
	import { FileUploadZone, Header } from '#lib/features/student/berkas/index.ts';
</script>

<svelte:head>
	<title>Upload Berkas Penilaian</title>
</svelte:head>

<div class="mx-auto w-full max-w-7xl space-y-6">
	<div class="mx-auto w-full max-w-3xl">
		<Header
			title="Upload Berkas"
			description="Untuk penilaian guru"
		/>

		<div class="space-y-4">
			<FileUploadZone
				id="upload-presensi"
				label="Riwayat Presensi"
			/>

			<FileUploadZone
				id="upload-jurnal"
				label="Riwayat Aktivitas PKL / Jurnal PKL"
			/>
		</div>
	</div>
</div>