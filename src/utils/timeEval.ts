export function convertToTime(inputString: string): string {
	const date = new Date(inputString);
	const currentDate = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Convert to 12-hour format and add AM/PM
	const amPm = hours >= 12 ? "PM" : "AM";
	const twelveHourFormat = hours % 12 || 12;

	// Pad the minutes with leading zero if needed
	const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	const isSameDate =
		date.getDate() === currentDate.getDate() &&
		date.getMonth() === currentDate.getMonth() &&
		date.getFullYear() === currentDate.getFullYear();
	const dayPrefix = isSameDate ? "" : date.toISOString().split("T")[0];

	return `${twelveHourFormat}:${paddedMinutes} ${amPm} ${dayPrefix}`;
}

export function compareTimeStrings(
	timeString1: string,
	timeString2: string
): number {
	const date1 = new Date(timeString1);
	const date2 = new Date(timeString2);
	return date1.getTime() - date2.getTime();
}
