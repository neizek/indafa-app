<script lang="ts">
	import type { IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let {
		icon,
		label,
		caption
	}: {
		icon: Component<IconProps>;
		label: string;
		caption?: string;
	} = $props();

	const Icon = icon;
</script>

<div class="flex items-center gap-2">
	<Icon size={20} />
	<div class="flex-flex-col gap-2">
		<span>{label}</span>
		{#if caption}
			<span>{caption}</span>
		{/if}
	</div>
</div>
