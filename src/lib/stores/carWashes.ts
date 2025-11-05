import supabase from '$lib/db';
import { writable } from 'svelte/store';
import type { CarWash } from '../types/carWashes';

export const { data, error } = await supabase.from('car_wash').select('*');

async function getCarWashes(): Promise<Array<CarWash>> {
	const { data } = await supabase.from('car_wash').select('*, working_hours(*)');
	return data ?? [];
}

export const carWashesOptions =
	data?.map((carWash) => ({
		id: carWash.id.toString(),
		value: carWash.id,
		label: carWash.address
	})) ?? [];

export const carWashes = writable<Array<CarWash>>(await getCarWashes());
