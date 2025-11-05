<script lang="ts">
	import type { AcceptedSelectOptionValues, SelectOption } from '$lib/types/ui';
	import { untrack } from 'svelte';

	let {
		options,
		value = $bindable(null),
		errors = null,
		onchange
	}: {
		options: SelectOption[];
		value: AcceptedSelectOptionValues;
		errors?: string[] | null;
		onchange?: (value: AcceptedSelectOptionValues) => void;
	} = $props();

	if (!value || !options.find((option) => option.value === value)) selectFirstAvaliableOption();

	function chooseOption(option: SelectOption) {
		value = option.value;
		if (onchange) onchange(value);
	}

	function selectFirstAvaliableOption() {
		for (const option of options) {
			if (option.disabled) continue;
			chooseOption(option);
			break;
		}
	}

	$effect(() => {
		const currentOptions = options;
		const foundOption = currentOptions.find((option) => option.value === value);

		if (!foundOption || foundOption.disabled) {
			untrack(() => {
				selectFirstAvaliableOption();
			});
		}
	});
</script>

<div class="flex flex-wrap gap-2">
	{#each options as option}
		<button
			class="btn flex flex-col gap-2 {option.value === value ? `bg-primary-500` : ``}"
			disabled={option.disabled}
			onclick={() => chooseOption(option)}
		>
			<span>{option.label}</span>
			{#if option.caption}
				<span class="preset-text-caption">{option.caption}</span>
			{/if}
		</button>
	{/each}
</div>
