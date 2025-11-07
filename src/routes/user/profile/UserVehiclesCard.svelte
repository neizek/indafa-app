<script lang="ts">
	import { Car, Plus, XIcon } from '@lucide/svelte';
	import vehiclesStore from '$lib/stores/vehicles';
	import Section from '$lib/components/ui/Section.svelte';
	import { openDeleteVehiclePopUp } from '$lib/helpers/vehicles';
	import AddVehicleButton from '$lib/components/widgets/AddVehicleButton.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Section header="My Vehicles">
	{#snippet controls()}
		<div>
			<AddVehicleButton />
		</div>
	{/snippet}
	{#if $vehiclesStore && $vehiclesStore.length === 0}
		<span>You have no any cars added in your account.</span>
	{:else}
		<div class="grid grid-cols-2 gap-2">
			{#each $vehiclesStore as vehicle}
				<div class="btn chip flex justify-between preset-tonal">
					<span>{vehicle.license_plate}</span>
					<Button bg="transparent" icon={XIcon} onclick={() => openDeleteVehiclePopUp(vehicle)} />
				</div>
			{/each}
		</div>
	{/if}
</Section>
