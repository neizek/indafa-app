<script lang="ts">
	import { carWashes, carWashesOptions } from '$lib/stores/carWashes';
	import FormItem from '$lib/components/ui/FormItem.svelte';
	import Selector from '$lib/components/ui/Selector.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { Check } from '@lucide/svelte';
	import vehiclesStore from '$lib/stores/vehicles';
	import Section from '$lib/components/ui/Section.svelte';
	import { derived } from 'svelte/store';
	import type { SelectOption } from '$lib/types/ui';
	import { createAppointment, getAppointmentsByDate } from '$lib/helpers/appointments';
	import { getHoursFromTime } from '$lib/helpers/strings';
	import { session } from '$lib/stores/auth';
	import { getDateLabel } from '$lib/helpers/datetime';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import AddVehicleButton from '$lib/components/widgets/AddVehicleButton.svelte';

	let isLoading: boolean = $state(false);

	const schema = z.object({
		location: z.number(),
		date: z.date(),
		vehicle: z.number(),
		startTime: z.number()
	});

	type FormValues = z.infer<typeof schema>;

	const { form, errors, data } = createForm<FormValues>({
		extend: validator({ schema }),
		initialValues: {
			location: $carWashes[0].id,
			date: new Date(),
			vehicle: $vehiclesStore[0].id,
			startTime: 8
		},
		onSubmit: () => {}
	});

	let chosenCarWash = $derived.by(() =>
		$carWashes.find((carWash) => carWash.id === $data.location)
	);

	let dateOptions: SelectOption[] = $derived.by(() => getDateOptions());

	function getDateOptions() {
		let dateOptions: SelectOption[] = [];

		for (let i = 0; i < 2; i++) {
			const date = new Date();
			date.setDate(date.getDate() + i);
			const wh = chosenCarWash?.working_hours.find((wh) => wh.day_of_week === date.getDay());
			if (wh) {
				const dateString = date.toISOString().split('T')[0];
				dateOptions = [
					...dateOptions,
					{
						value: date,
						label: dateString,
						caption: getDateLabel(date)
					}
				];
			}
		}

		return dateOptions;
	}

	const vehiclesOptions = derived(vehiclesStore, (items) =>
		items.map((vehicle) => ({
			id: vehicle.id.toString(),
			value: vehicle.id,
			label: vehicle.license_plate
		}))
	);

	let timeOptions: SelectOption[] = $state([]);

	async function setAvaliableTimes() {
		const thisDateWorkingHours = chosenCarWash?.working_hours[$data.date.getDay()];

		if (
			!thisDateWorkingHours ||
			!thisDateWorkingHours.open_time ||
			!thisDateWorkingHours.close_time
		) {
			return;
		}

		const openTime = getHoursFromTime(thisDateWorkingHours.open_time);
		const closeTime = getHoursFromTime(thisDateWorkingHours.close_time);

		timeOptions =
			(await createTimeOptions(
				new Date($data.date.setHours(openTime, 0, 0, 0)),
				new Date($data.date.setHours(closeTime, 0, 0, 0)),
				60
			)) ?? [];
	}

	async function createTimeOptions(from: Date, to: Date, intervalMinutes: number) {
		if (!$data.location) {
			return;
		}

		const options = [];
		const current = new Date(from);
		const thisDateAppointments = await getAppointmentsByDate(current, $data.location);
		const bookedTimes: number[] = thisDateAppointments.map((appointment) =>
			new Date(appointment.start_time).getHours()
		);

		while (current < to) {
			const hours = current.getHours().toString().padStart(2, '0');
			const minutes = current.getMinutes().toString().padStart(2, '0');
			const timeString = `${hours}:${minutes}`;
			options.push({
				value: current.getHours(),
				label: timeString,
				disabled:
					bookedTimes.includes(Number(hours)) || current < new Date(Date.now() + 60 * 60 * 1000)
			});
			current.setMinutes(current.getMinutes() + intervalMinutes);
		}

		return options as SelectOption[];
	}

	function sendAppointmentRequest() {
		if (!$data.date || !$data.location || !$data.vehicle || !$data.startTime || !$session) {
			return;
		}

		isLoading = true;

		createAppointment({
			user_id: $session.user.id,
			car_wash_id: $data.location,
			vehicle_id: $data.vehicle,
			start_time: new Date($data.date.setHours($data.startTime, 0, 0, 0)).toISOString(),
			end_time: new Date($data.date.setHours($data.startTime + 1, 0, 0, 0)).toISOString()
		}).finally(() => {
			isLoading = false;
		});
	}
</script>

<form use:form>
	<Section header="Desired spot">
		<FormItem label="Select Car Wash">
			<Selector options={carWashesOptions} bind:value={$data.location} />
		</FormItem>
	</Section>
	<Section header="Appointment">
		<FormItem label="Select Date">
			<Selector options={dateOptions} bind:value={$data.date} onchange={setAvaliableTimes} />
		</FormItem>
		<FormItem label="Select Time">
			<Selector options={timeOptions} bind:value={$data.startTime} />
		</FormItem>
	</Section>
	<Section header="Car Information">
		<FormItem label="Select Car">
			<Selector options={$vehiclesOptions} bind:value={$data.vehicle} />
		</FormItem>
		<AddVehicleButton />
	</Section>

	<Button type="submit" label="Confirm appointment" {isLoading} onclick={sendAppointmentRequest}>
		<Check />
	</Button>
</form>
