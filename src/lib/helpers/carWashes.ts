import CarWashDetails from '$lib/components/widgets/CarWashDetails.svelte';
import supabase from '$lib/db';
import { createPopUp } from '$lib/stores/popUp';
import type { CarWash } from '$lib/types/carWashes';
import { Bubbles } from '@lucide/svelte';

export async function getCarWashes(): Promise<Array<CarWash>> {
	const { data, error } = await supabase.from('car_wash').select('*, working_hours(*)');

	if (error) {
		console.error('Error fetching car washes:', error);
		throw error;
	}

	return data ?? [];
}

export function openCarWashDetailsPopUp(carWash: CarWash) {
	createPopUp({
		title: 'Car Wash Details',
		content: {
			component: CarWashDetails,
			props: { carWash }
		},
		icon: Bubbles
	});
}
