<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { removeVehicle } from '$lib/helpers/vehicles';

	let { vehicle, closePopUp } = $props();

	function onConfirm() {
		removeVehicle(vehicle.id);
		closePopUp();
	}
</script>

<span>Do you want to remove car with license plate {vehicle.license_plate}?</span>
<Button preset="filled-primary-500" label="Confirm" onclick={onConfirm} />
