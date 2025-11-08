export function getDateLabel(date: Date = new Date()): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const dateToCheck = new Date(date);
	dateToCheck.setHours(0, 0, 0, 0);

	if (dateToCheck.getTime() === today.getTime()) {
		return 'today';
	}

	if (dateToCheck.getTime() === tomorrow.getTime()) {
		return 'tomorrow';
	}
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	return days[dateToCheck.getDay()];
}

export function formatDateTime(dbDate: string) {
	const date = new Date(dbDate);

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return date.toLocaleDateString() + ' ' + hours + ':' + minutes;
}

export function formatAppointmentDateTime(dateString: string) {
	const date = new Date(dateString);

	// Format date as "10 October"
	const formattedDate = date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long'
	});

	// Format time as "18:00"
	const formattedTime = date.toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	return {
		date: formattedDate,
		time: formattedTime
	};
}

export const getHoursFromTime = (time: string) => Number(time.split(':')[0]);
