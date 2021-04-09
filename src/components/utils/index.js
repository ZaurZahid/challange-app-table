export const MoreThanEighteenYear = () => {
	var dtToday = new Date();

	var month = dtToday.getMonth() + 1; // jan=0; feb=1 .......
	var day = dtToday.getDate();
	var year = dtToday.getFullYear() - 18;

	if (month < 10)
		month = '0' + month.toString();
	if (day < 10)
		day = '0' + day.toString();

	const maxDate = year + '-' + month + '-' + day;
	return maxDate
}