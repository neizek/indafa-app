import storage from '$lib/helpers/storage';
import { getVehiclesByUserId } from '$lib/helpers/vehicles';
import type { Vehicle } from '$lib/types/vehicles';
import { writable } from 'svelte/store';
import { session } from './auth';

const vehiclesStore = (() => {
	const { subscribe, set, update } = writable<Array<Vehicle>>([]);

	async function getInitialVehicles(userId: string) {
		if (!session) {
			return [];
		}

		let vehicles: Vehicle[] | null = storage.get('vehicles');

		if (!vehicles) vehicles = (await getVehiclesByUserId(userId)) || [];

		storage.set('vehicles', vehicles);
		vehiclesStore.set(vehicles);
	}

	function removeVehicle(id: number) {
		update((items) => {
			const updatedVehicles = items.filter((v) => v.id !== id);
			storage.set('vehicles', updatedVehicles);

			return updatedVehicles;
		});
	}

	function addVehicle(vehicle: Vehicle) {
		const updatedVehicles = update((items) => [...items, vehicle]);
		storage.set('vehicles', updatedVehicles);

		return updatedVehicles;
	}

	return {
		subscribe,
		set,
		update,
		add: (vehicle: Vehicle) => addVehicle(vehicle),
		remove: (id: Vehicle['id']) => removeVehicle(id),
		init: (userId: string) => getInitialVehicles(userId),
		clear: () => set([])
	};
})();

export default vehiclesStore;
