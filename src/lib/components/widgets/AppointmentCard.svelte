<script>
	import { Calendar, Car, MapPin, Navigation, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { openCarWashDetailsPopUp } from '$lib/helpers/carWashes';
	import { openCancelAppointmentPopUp } from '$lib/helpers/appointments';
	import { formatDateTime } from '$lib/helpers/datetime';
	import Item from '../ui/Item.svelte';
	import { AppointmentStatusEnum } from '$lib/types/appointments';

	let { appointment } = $props();
</script>

<div class="relative flex flex-col gap-5 p-4">
	<span class="absolute right-4 badge preset-filled">{appointment.status}</span>
	<div class="flex items-center gap-2">
		<Calendar size={18} />
		<span>{formatDateTime(appointment.start_time)}</span>
	</div>
	<div class="flex justify-between gap-2">
		<Item icon={MapPin} label={appointment.carWash.address} />
		<Item icon={Car} label={appointment.vehicle} />
	</div>
	{#if appointment.status === AppointmentStatusEnum.pending}
		<div class="mt-4 flex justify-between gap-2">
			<Button
				label="Locate"
				full
				icon={Navigation}
				onclick={() => openCarWashDetailsPopUp(appointment.carWash)}
			/>
			<Button
				label="Cancel appointment"
				icon={XIcon}
				preset="tonal"
				onclick={() => openCancelAppointmentPopUp(appointment)}
			/>
		</div>
	{/if}
</div>
