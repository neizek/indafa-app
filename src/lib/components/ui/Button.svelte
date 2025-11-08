<script lang="ts">
	import { LoaderCircle, type ComponentIcon, type IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let {
		type = 'button',
		label,
		preset = 'primary',
		full = false,
		isLoading = false,
		disabled = false,
		icon,
		onclick
	}: {
		type?: 'submit' | 'button';
		label?: string;
		preset?: 'primary' | 'cancel' | 'tonal' | 'ghost';
		full?: boolean;
		icon?: Component<IconProps>;
		isLoading?: boolean;
		disabled?: boolean;
		onclick?: () => void;
	} = $props();

	const Icon = icon;
	const presets = {
		primary: 'bg-primary-600 text-white',
		cancel: 'bg-error-950/20 text-error-900 dark:text-error-300',
		tonal: 'bg-surface-100 dark:bg-surface-800/50',
		ghost: 'bg-transparent'
	};

	let classes = [
		'h-9',
		icon && !label ? 'btn-icon' : 'btn',
		full ? 'w-full' : '',
		presets[preset],
		disabled ? 'opacity-50' : ''
	];
</script>

<button {type} class={classes} {onclick}>
	{#if isLoading}
		<LoaderCircle size={20} class="animate-spin" />
	{:else}
		{#if icon}
			<Icon size={20} />
		{/if}
		{#if label}
			<span class="pb-0.5">{label}</span>
		{/if}
	{/if}
</button>
