<script lang="ts">
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Selector from '$lib/components/ui/Selector.svelte';
	import { getOperatorAppointmentsByDate } from '$lib/helpers/appointments';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import { carWashes, carWashesOptions } from '$lib/stores/carWashes';
	import { createPopUp } from '$lib/stores/popUp';
	import { Trash, UserSearch } from '@lucide/svelte';
	import CustomerDetails from './CustomerDetails.svelte';
	import type { SelectOption } from '$lib/types/ui';
	import { getWorkingDatesOptions } from '$lib/helpers/carWashes';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { AppointmentStatusColorsEnum, type AppointmentStatusEnum } from '$lib/enums/appointments';
	import { t } from '$lib/translations/translations';
	import type { OperatorAppointment } from '$lib/types/appointments';
	import { onMount } from 'svelte';
	import StatusChangeForm from '../forms/StatusChangeForm.svelte';
	import { isAdmin } from '$lib/stores/auth';
	import DeleteAppointmentForm from '../forms/DeleteAppointmentForm.svelte';

	let selectedCarWash = $state($carWashes[0]);
	let selectedDate = $state(null);

	let appointments: OperatorAppointment[] = $state([]);
	let isLoadingAppointments = $state(true);
	let dateOptions: SelectOption[] = $derived.by(() =>
		selectedCarWash ? getWorkingDatesOptions(selectedCarWash) : []
	);

	async function getAppointments() {
		if (selectedDate && selectedCarWash) {
			isLoadingAppointments = true;
			getOperatorAppointmentsByDate(selectedDate, selectedCarWash.id)
				.then((data) => {
					appointments = data;
				})
				.finally(() => {
					isLoadingAppointments = false;
				});
		} else {
			appointments = [];
		}
	}

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

	function openDeleteAppointmentPopUp(appointment: any) {
		createPopUp({
			title: $t('common.appointmentControls'),
			content: {
				component: DeleteAppointmentForm,
				props: {
					appointment
				}
			}
		});
	}

	function openStatusChangePopUp(appointment: any) {
		createPopUp({
			title: $t('common.changeAppointmentStatus'),
			content: {
				component: StatusChangeForm,
				props: {
					appointment,
					onchange: (newStatus: AppointmentStatusEnum) =>
						(appointments = appointments.map((item) =>
							item.id === appointment.id ? { ...item, status: newStatus } : item
						))
				}
			}
		});
	}

	$effect(() => {
		getAppointments();
	});

	onMount(() => {
		getAppointments();
	});
</script>

<Section>
	<FormItem label={$t('common.selectCarWash')}>
		<Selector options={$carWashesOptions} bind:value={selectedCarWash.id} />
	</FormItem>
	<FormItem label={$t('common.selectDate')}>
		<Selector options={dateOptions} bind:value={selectedDate} />
	</FormItem>
</Section>

<Section header={$t('common.appointments')}>
	{#if isLoadingAppointments}
		<div class="w-full space-y-2">
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
	{:else}
		{#if appointments && appointments.length === 0}
			<span>{$t('common.noAppointmentsForThisDay')}</span>
		{/if}
		{#each appointments as appointment}
			{@const { date, time } = formatAppointmentDateTime(appointment.start_time)}
			<div class="flex items-center justify-between gap-4">
				<span>{time}</span>
				<span>{appointment.vehicle.license_plate}</span>
				<div class="flex gap-4">
					<Badge
						label={$t(`common.${appointment.status}`)}
						clases={AppointmentStatusColorsEnum[appointment.status]}
						onclick={() => openStatusChangePopUp(appointment)}
					/>
					<button
						class="bg-transparent"
						onclick={() => openCustomerDetailsPopUp(appointment.user_id)}
					>
						<UserSearch size={20} />
					</button>
					{#if $isAdmin}
						<button class="bg-transparent" onclick={() => openDeleteAppointmentPopUp(appointment)}>
							<Trash size={20} />
						</button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</Section>
