<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { removeAppointment } from '$lib/helpers/appointments';
	import { showErrorToast } from '$lib/helpers/toaster';
	import { t } from '$lib/translations/translations';
	import { Trash, XIcon } from '@lucide/svelte';

	let { appointment, closePopUp } = $props();
	let isLoading = $state(false);

	function onConfirm() {
		isLoading = true;
		removeAppointment(appointment.id)
			.then(() => closePopUp())
			.catch((error) => {
				showErrorToast({
					error
				});
			})
			.finally(() => {
				isLoading = false;
			});
		closePopUp();
	}

	function onCancel() {
		closePopUp();
	}
</script>

<div class="flex flex-col gap-4">
	<span>{$t('common.doYouWantToDeleteAppointment')}</span>
	<div class="flex items-center justify-between gap-2">
		<Button
			label={$t('common.delete')}
			preset="cancel"
			onclick={onConfirm}
			icon={Trash}
			{isLoading}
			full
		/>
		<Button label={$t('common.cancel')} preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
