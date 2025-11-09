<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
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
		}))
	);
</script>

<div class="flex flex-col gap-4">
	{#if $fullAppointments && $fullAppointments.length === 0}
		<Card>
			<span>You did not have any appointments up to now</span>
		</Card>
	{/if}
	{#each $fullAppointments as appointment}
		<AppointmentCard {appointment} />
	{/each}
</div>
