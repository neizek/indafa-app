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
	import { session, user } from '$lib/stores/auth';
	import { getHoursFromTime } from '$lib/helpers/datetime';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import AddVehicleButton from '$lib/components/widgets/AddVehicleButton.svelte';
	import { goto } from '$app/navigation';
	import Form from '$lib/components/ui/Form.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { getWorkingDatesOptions } from '$lib/helpers/carWashes';
	import { createEditProfilePopUp } from '$lib/helpers/auth';
	import { t } from '$lib/translations/translations';
	import { showErrorToast, showInfoToast } from '$lib/helpers/toaster';
	import appointmentsStore from '$lib/stores/appointments';
	import { AppointmentStatusEnum } from '$lib/enums/appointments';

	let isLoading: boolean = $state(false);

	const schema = z.object({
		location: z.number({ message: 'common.errors.required' }),
		date: z.date({ message: 'common.errors.required' }),
		vehicle: z.number({ message: 'common.errors.required' }),
		startTime: z.number({ message: 'common.errors.required' })
	});

	type FormValues = z.infer<typeof schema>;

	const { form, errors, data } = createForm<FormValues>({
		extend: validator({ schema }),
		onSubmit: () => {}
	});

	let chosenCarWash = $derived.by(() =>
		$carWashes.find((carWash) => carWash.id === $data.location)
	);

	let dateOptions: SelectOption[] = $derived.by(() =>
		chosenCarWash ? getWorkingDatesOptions(chosenCarWash) : []
	);

	const vehiclesOptions = derived(vehiclesStore, (items) =>
		items.map((vehicle) => ({
			value: vehicle.id,
			label: vehicle.license_plate
		}))
	);

	let timeOptions: SelectOption[] = $state([]);

	async function setAvaliableTimes() {
		timeOptions = [];

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
			showErrorToast({
				description: 'common.errors.notAllDataFilled'
			});
			return;
		}

		const existingAppointment = $appointmentsStore.find(
			(appointment) =>
				appointment.vehicle_id === $data.vehicle &&
				new Date(appointment.start_time) > new Date() &&
				appointment.status === AppointmentStatusEnum.pending
		);

		if (existingAppointment) {
			showErrorToast({
				description: 'common.errors.onlyOneAppointmentPerCarAllowed'
			});
			return;
		}

		if (!$user?.firstName || !$user?.lastName || !$user.email || !$user.phone) {
			showInfoToast({
				title: 'common.info',
				description: 'common.completeYouProfileBeforeAppointment'
			});
			createEditProfilePopUp();
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
			goto(ROUTES.HOME);
		});
	}
</script>

<Form {form}>
	<Section header={$t('common.desiredSpot')}>
		<FormItem label={$t('common.selectCarWash')} errors={$errors.location}>
			<Selector options={$carWashesOptions} bind:value={$data.location} />
		</FormItem>
	</Section>
	<Section header={$t('common.appointment')}>
		<FormItem label={$t('common.selectDate')} errors={$errors.date}>
			<Selector options={dateOptions} bind:value={$data.date} onchange={setAvaliableTimes} />
		</FormItem>
		<FormItem label={$t('common.selectTime')} errors={$errors.startTime}>
			<Selector options={timeOptions} bind:value={$data.startTime} />
		</FormItem>
	</Section>
	<Section header={$t('common.carInfo')}>
		{#snippet controls()}
			<div>
				<AddVehicleButton />
			</div>
		{/snippet}
		<FormItem label={$t('common.selectCar')} errors={$errors.vehicle}>
			{#if $vehiclesOptions && $vehiclesOptions.length === 0}
				<div class="p-2">{$t('common.addAtLeastOneCar')}</div>
			{:else}
				<Selector options={$vehiclesOptions} bind:value={$data.vehicle} />
			{/if}
		</FormItem>
	</Section>

	<Button
		type="submit"
		label={$t('common.confirmAppointment')}
		{isLoading}
		icon={Check}
		onclick={sendAppointmentRequest}
		full
	/>
</Form>
