<script lang="ts">
	import { Calendar, Car, Clock, MapPin, Navigation, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import { openCarWashDetailsPopUp } from '$lib/helpers/carWashes';
	import { openCancelAppointmentPopUp } from '$lib/helpers/appointments';
	import { formatAppointmentDateTime } from '$lib/helpers/datetime';
	import Item from '../ui/Item.svelte';
	import { AppointmentStatusColorsEnum, AppointmentStatusEnum } from '$lib/enums/appointments';
	import type { FullAppointment } from '$lib/types/appointments';
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/Card.svelte';
	import { t } from '$lib/translations/translations';

	let { appointment }: { appointment: FullAppointment } = $props();
	let { date, time } = formatAppointmentDateTime(appointment.start_time);
</script>

{#if appointment.carWash && appointment.vehicle}
	<Card>
		<div class="relative flex flex-col gap-2">
			<Badge
				label={$t(`common.${appointment.status}`)}
				clases="absolute right-0 {AppointmentStatusColorsEnum[appointment.status]}"
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
						label={$t('common.locate')}
						full
						icon={Navigation}
						onclick={() => openCarWashDetailsPopUp(appointment.carWash)}
					/>
					<Button
						label={$t('common.cancelAppointment')}
						icon={XIcon}
						preset="cancel"
						onclick={() => openCancelAppointmentPopUp(appointment)}
					/>
				</div>
			{/if}
		</div>
	</Card>
{/if}
