export function getDateLabel(date: Date = new Date()): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const dateToCheck = new Date(date);
	dateToCheck.setHours(0, 0, 0, 0);

	// Check if today or tomorrow
	if (dateToCheck.getTime() === today.getTime()) {
		return 'today';
	}

	if (dateToCheck.getTime() === tomorrow.getTime()) {
		return 'tomorrow';
	}

	// Return day of week
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[dateToCheck.getDay()];
}
