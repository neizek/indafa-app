<script lang="ts">
	import type { Appointment } from '$lib/types/appointments';
	import { Check, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { cancelAppointment } from '$lib/helpers/appointments';

	let { appointment, closePopUp }: { appointment: Appointment; closePopUp: () => void } = $props();

	function onConfirm() {
		closePopUp();
		cancelAppointment(appointment.id);
	}

	function onCancel() {
		closePopUp();
	}
</script>

<div class="flex flex-col gap-4">
	<span>Do you want to cancel the appointment for {appointment.start_time}?</span>
	<div class="flex items-center justify-between gap-2">
		<Button label="Confirm" onclick={onConfirm} icon={Check} full />
		<Button label="Cancel" preset="tonal" icon={XIcon} onclick={onCancel} full />
	</div>
</div>
