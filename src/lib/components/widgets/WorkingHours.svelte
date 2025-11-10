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
		<div class="grid grid-cols-2 gap-2 px-5">
			{#each workingHours as { day_of_week, open_time, close_time }}
				<span>{$t(`common.${days[day_of_week]}`)}:</span>
				<span>{open_time} - {close_time}</span>
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible>
