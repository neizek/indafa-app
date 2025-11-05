export interface CarWash {
	id: number;
	address: string;
	sport: string;
	phone: string;
	long: number;
	lat: number;
	working_hours: WorkingHour[];
}

export interface WorkingHour {
	day_of_week: number;
	open_time: string;
	close_time: string;
}
