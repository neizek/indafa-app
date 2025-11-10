<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { getErrorMessage } from '$lib/helpers/errors';
	import { showErrorToast } from '$lib/helpers/toaster';
	import { removeVehicle } from '$lib/helpers/vehicles';
	import { t } from '$lib/translations/translations';
	import { Check, Trash, XIcon } from '@lucide/svelte';

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
	<span>{$t('common.doYouWantToDeleteVehicle')} {vehicle.license_plate}?</span>
	<div class="flex items-center justify-between gap-2">
		<Button label={$t('common.delete')} preset="cancel" onclick={onConfirm} icon={Trash} full />
		<Button label={$t('common.cancel')} preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
