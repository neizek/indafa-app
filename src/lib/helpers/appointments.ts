import CancelAppointmentForm from '$lib/components/forms/CancelAppointmentForm.svelte';
import supabase from '$lib/helpers/db';
import { AppointmentStatusEnum } from '$lib/enums/appointments';
import appointmentsStore from '$lib/stores/appointments';
import { createPopUp } from '$lib/stores/popUp';
import {
	type Appointment,
	type AppointmentPayload,
	type OperatorAppointment
} from '$lib/types/appointments';

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
		throw error;
	}

	appointmentsStore.add(data[0]);
	return data;
}

async function cancelAppointment(id: number) {
	const { data, error } = await supabase
		.from('appointment')
		.update({
			status: AppointmentStatusEnum.canceled
		})
		.eq('id', id)
		.select();

	if (error) {
		console.error('Error canceling appointment:', error);
		throw error;
	}

	appointmentsStore.cancel(id);
	return data;
}

async function getUserAppointments(id: string) {
	const { data, error } = await supabase
		.from('appointment')
		.select('*')
		.eq('user_id', id)
		.order('start_time', { ascending: false });

	if (error) {
		console.error('Error fetching appointments:', error);
		throw error;
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
		throw error;
	}

	return data;
}

async function getOperatorAppointmentsByDate(
	date: Date,
	carWashId: number
): Promise<OperatorAppointment[]> {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	const { data, error } = await supabase
		.from('appointment')
		.select('*, vehicle:vehicle_id(*)')
		.gte('start_time', startOfDay.toISOString())
		.lte('start_time', endOfDay.toISOString())
		.eq('car_wash_id', carWashId)
		.order('start_time');

	if (error) {
		console.error('Error fetching appointments:', error);
		throw error;
	}

	return data;
}

function openCancelAppointmentPopUp(appointment: Appointment) {
	createPopUp({
		title: 'common.cancelAppointment',
		content: {
			component: CancelAppointmentForm,
			props: {
				appointment
			}
		}
	});
}

export {
	createAppointment,
	getUserAppointments,
	getAppointmentsByDate,
	getOperatorAppointmentsByDate,
	openCancelAppointmentPopUp,
	cancelAppointment
};
