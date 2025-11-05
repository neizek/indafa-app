import supabase from '$lib/db';
import appointmentsStore from '$lib/stores/appointments';
import type { Appointment, AppointmentPayload } from '$lib/types/appointments';

async function createAppointment(payload: AppointmentPayload) {
	const { data, error } = await supabase
		.from('appointment')
		.insert([
			{
				...payload
			}
		])
		.select();

	if (error) {
		console.error('Error adding appointment:', error);
		return null;
	}

	appointmentsStore.add(data[0]);
	return data;
}

async function getUserAppointments() {
	const { data, error } = await supabase.from('appointment').select('*');

	if (error) {
		console.error('Error fetching appointments:', error);
		return [];
	}

	return data;
}

async function getAppointmentsByDate(date: Date, carWashId: number): Promise<Appointment[]> {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const { data, error } = await supabase
		.from('appointment')
		.select('*')
		.gte('start_time', startOfDay.toISOString())
		.lte('start_time', endOfDay.toISOString())
		.eq('car_wash_id', carWashId)
		.order('start_time');

	if (error) {
		console.error('Error fetching appointments:', error);
		return [];
	}

	return data;
}

export { createAppointment, getUserAppointments, getAppointmentsByDate };
