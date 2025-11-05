import AddVehicleForm from '$lib/components/widgets/AddVehicleForm.svelte';
import supabase from '$lib/db';
import { createPopUp } from '$lib/stores/popUp';
import vehiclesStore from '$lib/stores/vehicles';
import { Trash } from '@lucide/svelte';
import DeleteVehicle from '../../routes/user/profile/DeleteVehicle.svelte';
import type { Vehicle } from '$lib/types/vehicles';

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
		return null;
	}

	vehiclesStore.add(data[0]);
	return data;
}

async function removeVehicle(id: number) {
	const { error } = await supabase.from('vehicle').delete().eq('id', id);

	if (error) {
		console.error('Error removing vehicle:', error);
		return null;
	}

	vehiclesStore.remove(id);
}

async function getVehiclesByUserId(userId: string) {
	const { data, error } = await supabase.from('vehicle').select('*').eq('user_id', userId);

	if (error) {
		console.error('Error fetching vehicles:', error);
		return [];
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
			component: DeleteVehicle,
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
