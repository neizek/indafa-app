<script lang="ts">
	import { Car, Plus } from '@lucide/svelte';
	import vehiclesStore from '$lib/stores/vehicles';
	import Section from '$lib/components/ui/Section.svelte';
	import { openDeleteVehiclePopUp } from '$lib/helpers/vehicles';
	import AddVehicleButton from '$lib/components/widgets/AddVehicleButton.svelte';
</script>

<Section header="My Vehicles">
	{#snippet controls()}
		<div>
			<AddVehicleButton />
		</div>
	{/snippet}
	<div class="flex flex-wrap gap-2">
		{#each $vehiclesStore as vehicle}
			<button
				class="chip preset-filled px-4 py-2.5"
				onclick={() => openDeleteVehiclePopUp(vehicle)}
			>
				<Car size={16} />
				<span>{vehicle.license_plate}</span>
			</button>
		{/each}
	</div>
</Section>
