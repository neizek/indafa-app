<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import StatBlock from '$lib/components/ui/StatBlock.svelte';
	import { getAppointmentsCount } from '$lib/helpers/admin';
	import { subtractDays } from '$lib/helpers/datetime';
	import { t } from '$lib/translations/translations';
	import { LoaderCircle } from '@lucide/svelte';

	const today = new Date();
	const lastWeekDate = subtractDays(today);

	const lastWeekAppointmentsCount = getAppointmentsCount(lastWeekDate, today);
	const previousWeekAppointmentsCount = getAppointmentsCount(
		subtractDays(lastWeekDate),
		lastWeekDate
	);

	const appointmentsPromises = Promise.all([
		lastWeekAppointmentsCount,
		previousWeekAppointmentsCount
	]);

	function getPercentageChange(oldValue: number, newValue: number) {
		if (oldValue === 0) return newValue === 0 ? 0 : 100;
		return ((newValue - oldValue) / oldValue) * 100;
	}
</script>

<Section header={$t('common.appointments')}>
	{#await appointmentsPromises}
		<!-- <div class="animate-spin"> -->
		<LoaderCircle class="animate-spin" />
		<!-- </div> -->
	{:then [previousweek, lastweek]}
		{@const increase = lastweek && previousweek ? getPercentageChange(previousweek, lastweek) : 0}
		<div class="flex gap-5">
			<StatBlock value={previousweek} label="Previous week" />
			<StatBlock value={lastweek} label="Last week" percent={increase} />
		</div>
	{/await}
</Section>
