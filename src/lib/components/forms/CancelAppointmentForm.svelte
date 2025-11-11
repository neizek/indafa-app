<script lang="ts">
	import type { Appointment } from '$lib/types/appointments';
	import { Check, Trash, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { cancelAppointment } from '$lib/helpers/appointments';
	import { t } from '$lib/translations/translations';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';

	let { appointment, closePopUp }: { appointment: Appointment; closePopUp: () => void } = $props();

	const { date, time } = formatAppointmentDateTime(appointment.start_time);
	function onConfirm() {
		closePopUp();
		cancelAppointment(appointment.id);
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
			full
		/>
		<Button label={$t('common.cancel')} preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
