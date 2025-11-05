<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import appointmentsStore from '$lib/stores/appointments';
	import { carWashes } from '$lib/stores/carWashes';
	import vehiclesStore from '$lib/stores/vehicles';
	import { Plus } from '@lucide/svelte';
</script>

<Section header="Appointments">
	{#snippet controls()}
		<Button label="New" preset="tonal" onclick={() => {}}>
			<Plus size={20} />
		</Button>
	{/snippet}
	{#if !$appointmentsStore || $appointmentsStore.length === 0}
		<span>You don't have any appointments at the moment.</span>
	{:else}
		{#each $appointmentsStore as appointment}
			{@const time = new Date(appointment.start_time).getHours()}
			{@const carWash = $carWashes.find((carWash) => carWash.id === appointment.car_wash_id)}
			{@const vehicle = $vehiclesStore.find((vehicle) => vehicle.id === appointment.vehicle_id)}
			<div>
				<span>Appointment time: {time}:00</span>
				<span>{carWash?.address}</span>
				<span>{vehicle?.license_plate}</span>
			</div>
		{/each}
	{/if}
</Section>
