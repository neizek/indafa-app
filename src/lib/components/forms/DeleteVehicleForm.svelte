<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { getErrorMessage } from '$lib/helpers/errors';
	import { showErrorToast } from '$lib/helpers/toaster';
	import { removeVehicle } from '$lib/helpers/vehicles';
	import { Check, XIcon } from '@lucide/svelte';

	let { vehicle, closePopUp } = $props();

	function onConfirm() {
		removeVehicle(vehicle.id)
			.then(() => closePopUp())
			.catch((error) => {
				showErrorToast({
					title: 'Error',
					description: getErrorMessage(error)
				});
			});
		closePopUp();
	}

	function onCancel() {
		closePopUp();
	}
</script>

<div class="flex flex-col gap-4">
	<span>Do you want to remove car with license plate {vehicle.license_plate}?</span>
	<div class="flex items-center justify-between gap-2">
		<Button label="Confirm" onclick={onConfirm} icon={Check} full />
		<Button label="Cancel" preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
