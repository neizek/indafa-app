import supabase from '$lib/helpers/db';
import { createPopUp } from '$lib/stores/popUp';
import vehiclesStore from '$lib/stores/vehicles';
import { Trash } from '@lucide/svelte';
import type { Vehicle } from '$lib/types/vehicles';
import AddVehicleForm from '$lib/components/forms/AddVehicleForm.svelte';
import DeleteVehicleForm from '../components/forms/DeleteVehicleForm.svelte';

// Working with database

async function addVehicle(licensePlate: string, userId: string) {
	const { data, error } = await supabase
		.from('vehicle')
		.insert([
			{
				user_id: userId,
				license_plate: licensePlate
			}
		])
		.select();

	if (error) {
		console.error('Error adding vehicle:', error);
		throw error;
	}

	vehiclesStore.add(data[0]);
	return data;
}

async function removeVehicle(id: number) {
	const { error } = await supabase.from('vehicle').delete().eq('id', id);

	if (error) {
		console.error('Error removing vehicle:', error);
		throw error;
	}

	vehiclesStore.remove(id);
}

async function getVehiclesByUserId(userId: string) {
	const { data, error } = await supabase.from('vehicle').select('*').eq('user_id', userId);

	if (error) {
		console.error('Error fetching vehicles:', error);
		throw error;
	}

	return data;
}

// PopUps

function openAddVehiclePopUp() {
	createPopUp({
		title: 'Add Vehicle',
		content: {
			component: AddVehicleForm,
			props: {}
		}
	});
}

function openDeleteVehiclePopUp(vehicle: Vehicle) {
	createPopUp({
		title: 'Delete Vehicle',
		icon: Trash,
		content: {
			component: DeleteVehicleForm,
			props: {
				vehicle
			}
		}
	});
}

// Other functons

export {
	addVehicle,
	removeVehicle,
	getVehiclesByUserId,
	openAddVehiclePopUp,
	openDeleteVehiclePopUp
};
