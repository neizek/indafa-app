<script lang="ts">
	import AppointmentCard from '$lib/components/widgets/AppointmentCard.svelte';
	import appointmentsStore from '$lib/stores/appointments';
	import { carWashes } from '$lib/stores/carWashes';
	import vehiclesStore from '$lib/stores/vehicles';
	import type { FullAppointment } from '$lib/types/appointments';
	import { derived, type Readable } from 'svelte/store';

	const fullAppointments: Readable<FullAppointment[]> = derived(appointmentsStore, (items) =>
		items.map((appointment) => ({
			...appointment,
			carWash: $carWashes.find((carWash) => carWash.id === appointment.car_wash_id),
			vehicle: $vehiclesStore.find((vehicle) => vehicle.id === appointment.vehicle_id)
				?.license_plate
		}))
	);
</script>

<div class="flex flex-col gap-4">
	{#each $fullAppointments as appointment}
		<div class="rounded-xl bg-surface-100/50 dark:bg-surface-900/50">
			<AppointmentCard {appointment} />
		</div>
	{/each}
</div>
