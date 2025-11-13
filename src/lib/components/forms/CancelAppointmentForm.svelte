<script lang="ts">
	import type { Appointment } from '$lib/types/appointments';
	import { Trash, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { cancelAppointment } from '$lib/helpers/appointments';
	import { t } from '$lib/translations/translations';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import { showErrorToast } from '$lib/helpers/toaster';

	let { appointment, closePopUp }: { appointment: Appointment; closePopUp: () => void } = $props();
	let isLoading = $state(false);

	const { date, time } = formatAppointmentDateTime(appointment.start_time);
	function onConfirm() {
		isLoading = true;
		closePopUp();
		cancelAppointment(appointment.id)
			.catch((error) => showErrorToast(error))
			.finally(() => {
				isLoading = false;
			});
	}

	function onCancel() {
		closePopUp();
	}
</script>

<div class="flex flex-col gap-4">
	<span>{$t('common.doYouWantToCancelAppointment', { date, time })}</span>
	<div class="flex items-center justify-between gap-2">
		<Button
			label={$t('common.cancelAppointment')}
			preset="cancel"
			onclick={onConfirm}
			icon={Trash}
			{isLoading}
			full
		/>
		<Button label={$t('common.cancel')} preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
