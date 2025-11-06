<script lang="ts">
	import { LoaderCircle, type ComponentIcon, type IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let {
		type = 'button',
		// children,
		label,
		preset,
		bg = 'primary-500',
		full = false,
		isLoading = false,
		icon,
		onclick
	}: {
		type?: 'submit' | 'button';
		// children?: any;
		label?: string;
		preset?: string;
		bg?: string;
		full?: boolean;
		icon?: Component<IconProps>;
		isLoading?: boolean;
		onclick?: () => void;
	} = $props();

	const Icon = icon;
</script>

<button
	{type}
	class="{label ? `btn` : `btn-icon`} {full ? `w-full` : ``} preset-{preset} bg-{bg}"
	{onclick}
>
	{#if isLoading}
		<LoaderCircle size={20} class="animate-spin" />
	{:else}
		{#if icon}
			<Icon size={20} />
		{/if}
		{#if label}
			<span>{label}</span>
		{/if}
	{/if}
</button>
