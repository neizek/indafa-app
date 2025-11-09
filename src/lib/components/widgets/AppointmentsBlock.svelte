<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import ScrollableSection from '$lib/components/ui/ScrollableSection.svelte';
	import AppointmentCard from '$lib/components/widgets/AppointmentCard.svelte';
	import { AppointmentStatusEnum } from '$lib/enums/appointments';
	import appointmentsStore from '$lib/stores/appointments';
	import { carWashes } from '$lib/stores/carWashes';
	import vehiclesStore from '$lib/stores/vehicles';
	import { t } from '$lib/translations/translations';
	import { type FullAppointment } from '$lib/types/appointments';
	import { derived, type Readable } from 'svelte/store';

	const upcomingAppointments: Readable<FullAppointment[]> = derived(appointmentsStore, (items) =>
		items
			.filter(
				(appointment) =>
					appointment.status === AppointmentStatusEnum.pending &&
					new Date(appointment.start_time) > new Date()
			)
			.map((appointment) => ({
				...appointment,
				carWash: $carWashes.find((carWash) => carWash.id === appointment.car_wash_id),
				vehicle: $vehiclesStore.find((vehicle) => vehicle.id === appointment.vehicle_id)
			}))
	);
</script>

<ScrollableSection
	header={$t('common.appointments')}
	noItemsText={$t('common.youDontHaveAnyAppointments')}
	items={$upcomingAppointments}
>
	{#snippet itemRenderer(appointment)}
		<AppointmentCard {appointment} />
	{/snippet}
</ScrollableSection>
