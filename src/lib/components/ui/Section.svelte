<script lang="ts">
	let {
		header,
		children,
		controls
	}: {
		header?: string;
		children?: any;
		controls?: any;
	} = $props();
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
	<div class="mb-4 flex flex-col gap-4 rounded-xl bg-surface-100/50 p-4 dark:bg-surface-900/50">
		{@render children?.()}
	</div>
</div>
