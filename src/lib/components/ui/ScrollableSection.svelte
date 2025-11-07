<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		header,
		items,
		noItemsText,
		itemRenderer,
		controls
	}: {
		header?: string;
		items?: any;
		noItemsText: string;
		itemRenderer: Snippet<[item: any]>;
		controls?: any;
	} = $props();

	console.log(items);
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		{#if header}
			<span class="text-xl font-bold">{header}</span>
		{/if}
		{#if controls}
			{@render controls()}
		{/if}
	</div>
	{#if items && items.length > 0}
		<div
			class="flex snap-x gap-2 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
		>
			{#each items as item}
				<div
					class="flex min-w-full flex-1 snap-center flex-col gap-4 overflow-hidden rounded-xl bg-surface-100/50 dark:bg-surface-900/50"
				>
					{@render itemRenderer(item)}
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col gap-4 rounded-xl bg-surface-100/50 p-4 dark:bg-surface-900/50">
			<span>{noItemsText}</span>
		</div>
	{/if}
</div>
