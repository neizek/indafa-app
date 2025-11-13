<script lang="ts">
	import { days } from '$lib/helpers/datetime';
	import { t } from '$lib/translations/translations';
	import { Clock, MinusIcon, PlusIcon } from '@lucide/svelte';
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
	let { workingHours } = $props();
</script>

<Collapsible>
	<Collapsible.Trigger class="flex w-full items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<Clock size={20} />
			<span>{$t('common.businessHours')}</span>
		</div>

		<Collapsible.Indicator class="group">
			<MinusIcon class="hidden size-4 group-data-[state=open]:block" />
			<PlusIcon class="block size-4 group-data-[state=open]:hidden" />
		</Collapsible.Indicator>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<div class="grid grid-cols-2 gap-2 px-7 py-2">
			{#each days as day, index}
				<span>{$t(`common.${day}`)}</span>
				{#if workingHours[index]}
					<span class="justify-self-end">
						{workingHours[index].open_time.slice(0, 5)}
						-
						{workingHours[index].close_time.slice(0, 5)}
					</span>
				{:else}
					<span class="justify-self-end">{$t('common.closed')}</span>
				{/if}
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible>
