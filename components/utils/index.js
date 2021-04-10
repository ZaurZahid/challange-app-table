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

export const generateArray = () => {
	const Table = []
	for (let i = 1; i <= 70/* 150 */; i++) {
		const Object = { id: i, name: `${i}Zaur`, surname: `${i}Aliyev`, date_birth: "2021-04-14", position: `${i}Frontend developer`, phonenumber: (i > 99 ? `55 ${i} 92 11` : i > 9 ? `55 414 92 ${i}` : `55 4${i}4 92 1${i}`) }
		Table.push(Object)
	}

	return Table
}

export const staticData = generateArray()

export function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

//sorting array
export function tableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}