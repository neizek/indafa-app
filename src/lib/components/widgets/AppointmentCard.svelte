<script>
	import { Calendar, Car, Clock, MapPin, Navigation, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { openCarWashDetailsPopUp } from '$lib/helpers/carWashes';
	import { openCancelAppointmentPopUp } from '$lib/helpers/appointments';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import Item from '../ui/Item.svelte';
	import { AppointmentStatusEnum } from '$lib/enums/appointments';

	let { appointment } = $props();
	let { date, time } = formatAppointmentDateTime(appointment.start_time);
</script>

<div class="relative flex flex-col gap-2 p-5">
	<span class="absolute right-4 badge preset-filled">{appointment.status}</span>
	<Item icon={Car} label={appointment.vehicle} />
	<Item icon={Clock} label={time} />
	<div class="flex justify-between">
		<Item icon={Calendar} label={date} />
		<Item icon={MapPin} label={appointment.carWash.address} />
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
				preset="cancel"
				onclick={() => openCancelAppointmentPopUp(appointment)}
			/>
		</div>
	{/if}
</div>
