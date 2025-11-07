<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import ScrollableSection from '$lib/components/ui/ScrollableSection.svelte';
	import AppointmentCard from '$lib/components/widgets/AppointmentCard.svelte';
	import appointmentsStore from '$lib/stores/appointments';
	import { carWashes } from '$lib/stores/carWashes';
	import vehiclesStore from '$lib/stores/vehicles';
	import { AppointmentStatusEnum, type Appointment } from '$lib/types/appointments';
	import type { CarWash } from '$lib/types/carWashes';
	import { Plus } from '@lucide/svelte';
	import { derived, type Readable } from 'svelte/store';

	interface FullAppointment extends Appointment {
		carWash?: CarWash;
		vehicle?: string;
	}

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
					?.license_plate
			}))
	);
</script>

<ScrollableSection
	header="Appointments"
	noItemsText="You don't have any upcoming appointments at the moment."
	items={$upcomingAppointments}
>
	{#snippet itemRenderer(appointment)}
		<AppointmentCard {appointment} />
	{/snippet}
</ScrollableSection>
