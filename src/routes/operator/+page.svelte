<script lang="ts">
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Selector from '$lib/components/ui/Selector.svelte';
	import { getOperatorAppointmentsByDate } from '$lib/helpers/appointments';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import { carWashes, carWashesOptions } from '$lib/stores/carWashes';
	import { createPopUp } from '$lib/stores/popUp';
	import { UserSearch } from '@lucide/svelte';
	import CustomerDetails from './CustomerDetails.svelte';
	import type { SelectOption } from '$lib/types/ui';
	import { getWorkingDatesOptions } from '$lib/helpers/carWashes';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { AppointmentStatusColorsEnum, AppointmentStatusEnum } from '$lib/enums/appointments';
	import { t } from '$lib/translations/translations';

	let selectedCarWash = $state($carWashes[0]);
	let selectedDate = $state(null);

	let appointments = $derived.by(() =>
		selectedDate ? getOperatorAppointmentsByDate(selectedDate, selectedCarWash.id) : []
	);
	let dateOptions: SelectOption[] = $derived.by(() =>
		selectedCarWash ? getWorkingDatesOptions(selectedCarWash) : []
	);

	function openCustomerDetailsPopUp(userId: string) {
		createPopUp({
			title: $t('common.customerContacts'),
			content: {
				component: CustomerDetails,
				props: {
					userId
				}
			}
		});
	}

	// TO BE CHANGED
	const statusColors = {
		[AppointmentStatusEnum.pending]: 'preset-tonal-warning',
		[AppointmentStatusEnum.canceled]: 'preset-tonal-error',
		[AppointmentStatusEnum.completed]: 'preset-tonal-success'
	};
</script>

<Section>
	<FormItem label="Select car wash">
		<Selector options={$carWashesOptions} bind:value={selectedCarWash.id} />
	</FormItem>
	<FormItem label="Select Date">
		<Selector options={dateOptions} bind:value={selectedDate} />
	</FormItem>
</Section>

<Section header={$t('common.appointments')}>
	{#await appointments}
		<div class="w-full space-y-2">
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
	{:then appointments}
		{#if appointments && appointments.length === 0}
			<span>{$t('common.noAppointmentsForThisDay')}</span>
		{/if}
		{#each appointments as appointment}
			{@const { date, time } = formatAppointmentDateTime(appointment.start_time)}
			<div class="flex items-center justify-between gap-4">
				<span>{time}</span>
				<span>{appointment.vehicle.license_plate}</span>
				<Badge
					label={$t(`common.${appointment.status}`)}
					clases={statusColors[appointment.status]}
				/>
				<button
					class="bg-transparent"
					onclick={() => openCustomerDetailsPopUp(appointment.user_id)}
				>
					<UserSearch size={20} />
				</button>
			</div>
		{/each}
	{/await}
</Section>
