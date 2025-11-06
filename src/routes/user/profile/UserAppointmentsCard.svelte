<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { formatDateTime } from '$lib/helpers/datetime';
	import appointmentsStore from '$lib/stores/appointments';
	import { carWashes } from '$lib/stores/carWashes';
	import vehiclesStore from '$lib/stores/vehicles';
	import { AppointmentStatusEnum, type Appointment } from '$lib/types/appointments';
	import { Calendar, Car, MapPin, Navigation, Plus, XIcon } from '@lucide/svelte';

	interface FullAppointment extends Appointment {
		address?: string;
		vehicle?: string;
	}

	const upcomingAppointments: FullAppointment[] = $appointmentsStore
		.filter(
			(appointment) =>
				appointment.status === AppointmentStatusEnum.pending &&
				new Date(appointment.start_time) > new Date()
		)
		.map((appointment) => ({
			...appointment,
			address: $carWashes.find((carWash) => carWash.id === appointment.car_wash_id)?.address,
			vehicle: $vehiclesStore.find((vehicle) => vehicle.id === appointment.vehicle_id)
				?.license_plate
		}));
</script>

<Section header="Appointments">
	{#snippet controls()}
		<Button label="New" preset="tonal" onclick={() => {}} icon={Plus} />
	{/snippet}
	{#if !upcomingAppointments || upcomingAppointments.length === 0}
		<span>You don't have any appointments at the moment.</span>
	{:else}
		{#each upcomingAppointments as appointment}
			<div class="flex flex-col gap-5">
				<div class="flex gap-2">
					<Calendar />
					<span>{formatDateTime(appointment.start_time)}</span>
				</div>
				<div class="flex justify-between gap-2">
					<div class="flex gap-2">
						<MapPin />
						<span>{appointment.address}</span>
					</div>
					<div class="flex gap-2">
						<Car />
						<span>{appointment.vehicle}</span>
					</div>
				</div>
				<div class="flex justify-between gap-2">
					<Button label="Navigate" full icon={Navigation} />
					<Button label="Cancel appointment" icon={XIcon} preset="tonal" />
				</div>
			</div>
		{/each}
	{/if}
</Section>
