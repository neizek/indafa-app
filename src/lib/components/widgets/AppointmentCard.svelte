<script lang="ts">
	import { Calendar, Car, Clock, MapPin, Navigation, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { openCarWashDetailsPopUp } from '$lib/helpers/carWashes';
	import { openCancelAppointmentPopUp } from '$lib/helpers/appointments';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import Item from '../ui/Item.svelte';
	import { AppointmentStatusEnum } from '$lib/enums/appointments';
	import type { FullAppointment } from '$lib/types/appointments';
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/Card.svelte';

	let { appointment }: { appointment: FullAppointment } = $props();
	let { date, time } = formatAppointmentDateTime(appointment.start_time);

	const statusColors = {
		[AppointmentStatusEnum.pending]: 'warning',
		[AppointmentStatusEnum.canceled]: 'error',
		[AppointmentStatusEnum.completed]: 'success'
	};
</script>

{#if appointment.carWash && appointment.vehicle}
	<Card>
		<div class="relative flex flex-col gap-2">
			<Badge
				label={appointment.status}
				preset={statusColors[appointment.status]}
				clases="absolute right-4"
			/>
			<Item icon={Car} label={appointment.vehicle?.license_plate} />
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
	</Card>
{/if}
