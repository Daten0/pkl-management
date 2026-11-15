<script lang="ts">
	import { tick } from 'svelte';
	import type { ProfileField } from '../types.ts';

	let {
		field,
		label,
		value,
		autocomplete = 'off',
		onSave
	}: {
		field: ProfileField;
		label: string;
		value: string;
		autocomplete?: 'off' | 'name';
		onSave: (field: ProfileField, value: string) => void;
	} = $props();

	let isEditing = $state(false);
	let draft = $state('');
	let error = $state('');
	let status = $state('');
	let inputEl = $state<HTMLInputElement>();
	let editButtonEl = $state<HTMLButtonElement>();

	const inputId = $derived(`profil-${field}`);
	const errorId = $derived(`${inputId}-error`);

	async function mulaiEdit() {
		draft = value;
		error = '';
		status = '';
		isEditing = true;
		await tick();
		inputEl?.focus();
		inputEl?.select();
	}

	async function batal() {
		isEditing = false;
		draft = '';
		error = '';
		await tick();
		editButtonEl?.focus();
	}

	async function simpan() {
		const nilai = draft.trim();

		if (!nilai) {
			error = `${label} wajib diisi.`;
			await tick();
			inputEl?.focus();
			return;
		}

		if (nilai !== value) {
			onSave(field, nilai);
			status = `${label} berhasil disimpan.`;
		} else {
			status = '';
		}

		error = '';
		isEditing = false;
		await tick();
		editButtonEl?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			simpan();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			batal();
		}
	}
</script>

<div class="flex items-end gap-2">
	<div class="min-w-0 flex-1">
		{#if isEditing}
			<label for={inputId} class="mb-1 block text-sm font-medium text-[#6f4e37]">{label}</label>

			<input
				bind:this={inputEl}
				id={inputId}
				type="text"
				bind:value={draft}
				{autocomplete}
				aria-invalid={error ? 'true' : undefined}
				aria-describedby={error ? errorId : undefined}
				onkeydown={handleKeydown}
				class="min-h-11 w-full rounded-lg border bg-white px-3 text-[#6f4e37] focus:outline-none focus:ring-1 {error
					? 'border-red-500 focus:border-red-500 focus:ring-red-500'
					: 'border-[#e6d9cc] focus:border-orange-500 focus:ring-orange-500'}"
			/>
		{:else}
			<span class="mb-1 block text-sm font-medium text-[#6f4e37]">{label}</span>

			<div class="flex min-h-11 w-full cursor-default items-center rounded-lg border border-[#e6d9cc] bg-[#f4ebe1]/40 px-3 py-2 text-[#6f4e37]">
				{value}
			</div>
		{/if}
	</div>

	{#if isEditing}
		<div class="flex shrink-0 flex-col gap-2 sm:flex-row">
			<button
				type="button"
				onclick={batal}
				class="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#e6d9cc] bg-white px-4 text-sm font-medium text-[#6f4e37] transition-colors hover:bg-[#f4ebe1] focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
			>
				Batal
			</button>
			<button
				type="button"
				onclick={simpan}
				class="inline-flex min-h-11 items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
			>
				Simpan
			</button>
		</div>
	{:else}
		<button
			bind:this={editButtonEl}
			type="button"
			onclick={mulaiEdit}
			aria-label={`Ubah ${label}`}
			class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e6d9cc] bg-white text-[#6f4e37] transition-colors hover:bg-orange-50 hover:text-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:outline-none"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		</button>
	{/if}
</div>

{#if error}
	<p id={errorId} role="alert" class="mt-1 text-sm text-red-600">{error}</p>
{/if}

{#if status && !isEditing}
	<p role="status" class="mt-1 text-xs text-green-700">{status}</p>
{/if}
