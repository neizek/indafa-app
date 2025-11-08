import type { AppointmentStatusEnum } from '$lib/enums/appointments';
import type { CarWash } from './carWashes';

export interface AppointmentPayload {
	user_id?: string;
	car_wash_id: number;
	vehicle_id: number;
	start_time: string;
	end_time: string;
}

export interface Appointment extends AppointmentPayload {
	id: number;
	status: AppointmentStatusEnum;
}

export interface FullAppointment extends Appointment {
	carWash?: CarWash;
	vehicle?: string;
}
