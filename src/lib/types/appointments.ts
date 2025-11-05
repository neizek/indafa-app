export interface AppointmentPayload {
	user_id?: string;
	car_wash_id: number;
	vehicle_id: number;
	start_time: string;
	end_time: string;
}

export interface Appointment extends AppointmentPayload {
	id: number;
}
