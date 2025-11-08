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
	import { session } from '$lib/stores/auth';
	import { getDateLabel, getHoursFromTime } from '$lib/helpers/datetime';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import AddVehicleButton from '$lib/components/widgets/AddVehicleButton.svelte';
	import { goto } from '$app/navigation';
	import Form from '$lib/components/ui/Form.svelte';

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
		// initialValues: {
		// 	location: $carWashes[0].id,
		// 	date: new Date(),
		// 	vehicle: $vehiclesStore[0].id,
		// 	startTime: 8
		// },
		onSubmit: () => {}
	});

	let chosenCarWash = $derived.by(() =>
		$carWashes.find((carWash) => carWash.id === $data.location)
	);

	let dateOptions: SelectOption[] = $derived.by(() => getDateOptions());

	const createDateWithTime = (dateObj: Date, timeString: string) => {
		const [h, m, s] = timeString.split(':').map(Number);
		return new Date(new Date(dateObj).setHours(h - 1, m, s, 0));
	};

	function getDateOptions() {
		let dateOptions: SelectOption[] = [];

		for (let i = 0; dateOptions.length < 2; i++) {
			if (i === 10) break;
			const date = new Date();
			date.setDate(date.getDate() + i);
			const wh = chosenCarWash?.working_hours.find((wh) => wh.day_of_week === date.getDay());
			console.log(wh);
			if (wh && createDateWithTime(date, wh.close_time) > new Date()) {
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
			goto('/user/profile');
			isLoading = false;
		});
	}
</script>

<Form {form}>
	<Section header="Desired spot">
		<FormItem label="Select Car Wash">
			<Selector options={$carWashesOptions} bind:value={$data.location} />
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
		{#snippet controls()}
			<div>
				<AddVehicleButton />
			</div>
		{/snippet}
		<FormItem label="Select Car">
			<Selector options={$vehiclesOptions} bind:value={$data.vehicle} />
			{#if $vehiclesOptions && $vehiclesOptions.length === 0}
				Add some cars to your account
			{/if}
		</FormItem>
	</Section>

	<Button
		type="submit"
		label="Confirm appointment"
		{isLoading}
		icon={Check}
		onclick={sendAppointmentRequest}
		full
	/>
</Form>
