<script lang="ts">
	import { MinusIcon, PlusIcon } from '@lucide/svelte';
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
	let { workingHours } = $props();

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>

<div class="flex flex-col gap-4"></div>

<Collapsible>
	<Collapsible.Trigger class="btn w-full justify-start bg-transparent">
		<Collapsible.Indicator class="group">
			<MinusIcon class="hidden size-4 group-data-[state=open]:block" />
			<PlusIcon class="block size-4 group-data-[state=open]:hidden" />
		</Collapsible.Indicator>
		<span>Working hours</span>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<div class="grid grid-cols-2 gap-2">
			{#each workingHours as { day_of_week, open_time, close_time }}
				<span>{days[day_of_week]}:</span>
				<span>{open_time} - {close_time}</span>
			{/each}
		</div>
	</Collapsible.Content>
</Collapsible>
