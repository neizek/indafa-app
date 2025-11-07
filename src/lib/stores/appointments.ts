import storage from '$lib/helpers/storage';
import { AppointmentStatusEnum, type Appointment } from '$lib/types/appointments';
import { writable } from 'svelte/store';
import { session } from './auth';
import { getUserAppointments } from '$lib/helpers/appointments';

const appointmentsStore = (() => {
	const { subscribe, set, update } = writable<Array<Appointment>>([]);

	async function getInitialAppointments() {
		if (!session) {
			return [];
		}

		let appointments: Appointment[] | null = storage.get('appointments');
		if (!appointments) appointments = (await getUserAppointments()) || [];

		storage.set('appointments', appointments);
		appointmentsStore.set(appointments);
	}

	function addAppointment(appointment: Appointment) {
		const updatedVehicles = update((items) => [...items, appointment]);
		storage.set('appointments', updatedVehicles);

		return updatedVehicles;
	}

	function cancelAppointment(id: number) {
		const updatedAppointments = update((items) =>
			items.map((item) =>
				item.id === id ? { ...item, status: AppointmentStatusEnum.canceled } : item
			)
		);

		storage.set('appointments', updatedAppointments);
	}

	return {
		subscribe,
		set,
		update,
		add: (appointment: Appointment) => addAppointment(appointment),
		cancel: (id: number) => cancelAppointment(id),
		init: () => getInitialAppointments(),
		clear: () => set([])
	};
})();

export default appointmentsStore;
