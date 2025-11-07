<script lang="ts">
	let {
		children,
		label,
		errors
	}: {
		children: any;
		label: string;
		errors?: string[] | null;
	} = $props();
</script>

<label class="label">
	<span class="label-text">{label}</span>
	{@render children()}
</label>

{#if errors && errors.length > 0}
	<div class="flex flex-col gap-2">
		{#each errors as error}
			<span class="text-red-500">{error}</span>
		{/each}
	</div>
{/if}
