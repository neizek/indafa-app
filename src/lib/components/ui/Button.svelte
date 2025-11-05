<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';

	let {
		type = 'button',
		children,
		label,
		preset,
		bg = 'primary-500',
		full = false,
		isLoading = false,
		onclick
	}: {
		type?: 'submit' | 'button';
		children?: any;
		label: string;
		preset?: string;
		bg?: string;
		full?: boolean;
		isLoading?: boolean;
		onclick: () => void;
	} = $props();
</script>

<button {type} class="btn {full ? `w-full` : ``} preset-{preset} bg-{bg}" {onclick}>
	{#if children}
		{@render children()}
	{/if}
	{#if isLoading}
		<LoaderCircle size={16} class="animate-spin" />
	{:else}
		<span>{label}</span>
	{/if}
</button>
