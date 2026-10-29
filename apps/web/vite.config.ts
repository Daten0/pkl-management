import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			prerender: {
				handleUnseenRoutes: ({ routes }) => {
					// Sertifikat masih memakai data contoh dan aset gambar yang belum tersedia,
					// jadi route ini belum bisa di-prerender sampai sumber datanya siap.
					const unexpected = routes.filter(
						(route) => route !== '/siswa/preview/sertifikat/[id_serti]'
					);

					if (unexpected.length > 0) {
						throw new Error(`Rute belum ter-prerender: ${unexpected.join(', ')}`);
					}
				}
			}
		}),
		tailwindcss()
	]
});
