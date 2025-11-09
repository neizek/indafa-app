import CarWashDetails from '$lib/components/widgets/CarWashDetails.svelte';
import supabase from '$lib/helpers/db';
import { createPopUp } from '$lib/stores/popUp';
import type { CarWash } from '$lib/types/carWashes';
import type { SelectOption } from '$lib/types/ui';
import { Bubbles } from '@lucide/svelte';
import { createDateWithTime, getDateLabel } from './datetime';

export async function getCarWashes(): Promise<Array<CarWash>> {
	const { data, error } = await supabase.from('car_wash').select('*, working_hours(*)');

	if (error) {
		console.error('Error fetching car washes:', error);
		throw error;
	}

	return data ?? [];
}

export function getWorkingDatesOptions(carWash: CarWash): SelectOption[] {
	let dateOptions: SelectOption[] = [];

	for (let i = 0; dateOptions.length < 2; i++) {
		if (i === 10) break;
		const date = new Date();
		date.setDate(date.getDate() + i);
		const wh = carWash.working_hours.find((wh) => wh.day_of_week === date.getDay());

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

export function openCarWashDetailsPopUp(carWash: CarWash) {
	createPopUp({
		title: 'common.carWashDetails',
		content: {
			component: CarWashDetails,
			props: { carWash }
		},
		icon: Bubbles
	});
}
