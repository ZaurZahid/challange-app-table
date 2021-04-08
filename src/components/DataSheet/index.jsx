import React, { useCallback, useState } from 'react'
import Pagination from '../Pagination';
import style from './data_sheet.module.css'
import debounce from 'lodash.debounce';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

function index() {
	const [search, setSearch] = useState('')
	const [numSelected] = useState(0)
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id'); // id-ye gore asc ele
	const [page, setPage] = useState(0);
	const [rowsPerPage] = useState(6);
	const [isLoading, setIsLoading] = useState(false)

	const table = [
		{ id: 1, name: "1Zaur", surname: "Aliyev", date_birth: "01.03.2020", position: "Frontend developer", phonenumber: "554149211" },
		{ id: 2, name: "1yx", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 3, name: "2xu3", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 4, name: "2eux", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 5, name: "2xg", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 6, name: "2grx", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 7, name: "3xg", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 8, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 9, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 10, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 11, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 12, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 13, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 14, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 15, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 16, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 17, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 18, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 19, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 20, name: "4xh", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
	]

	const [data, setData] = useState(table);
	const [filteredData, setFilteredData] = useState(data);

	const runAfterFinishTyping = useCallback(
		debounce(searchVal => {

			const clonedData = [...data]
			const matches = clonedData.filter((element) =>
				element.name.toLowerCase().includes(searchVal.trim())
				|| element.surname.toLowerCase().includes(searchVal.trim())
				|| element.date_birth.toLowerCase().includes(searchVal.trim())
				|| element.position.toLowerCase().includes(searchVal.trim())
				|| element.phonenumber.toLowerCase().includes(searchVal.trim())
			)

			setFilteredData(matches)
			setPage(0)

		}, 500),
		[],
	);

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase()
		setSearch(value)

		runAfterFinishTyping(value);
	}

	const tableHead = [
		{ id: "id", label: "No", },
		{ id: "name", label: "Name", width: 250 },
		{ id: "surname", label: "Surname", width: 250 },
		{ id: "date_birth", label: "Date birth" },
		{ id: "position", label: "Position" },
		{ id: "phonenumber", label: "Phone number" },
	]

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	//sorting array
	function tableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	const handleSortRequest = (_, property) => {
		const isAsc = orderBy === property && order === 'asc';

		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	return (
		<div className={style.DataSheet}>
			<div className={style.TopSection}>
				<div>
					<h6>List of Employees</h6>
				</div>
				<div>
					<label htmlFor="search">{search && search.length > 0 ? `${filteredData.length} ${filteredData.length === 1 ? "result" : "results"}  found` : "Search: "}</label>
					<input type="text" id="search" value={search} onChange={handleSearch} />
				</div>
			</div>
			{numSelected > 0 &&
				<div className={style.Toolbar}>
					<div>
						<p className={style.SelectedCount}>
							<span>
								{numSelected}{" "}
							</span>
							selected
						</p>
					</div>
					<div>
						<button className={style.DeleteBtn}>
							delete
						</button>
					</div>
				</div>
			}

			<table className={style.TableContainer}>
				<thead className={style.TableHead}>
					<tr>
						<th>
							<input
								type="checkbox"
							// checked={rowCount > 0 && numSelected === rowCount}
							// onChange={onSelectAllClick}
							/>
						</th>
						{tableHead.map(head =>
							<th style={{ width: head.width }} key={head.id} onClick={(e) => handleSortRequest(e, head.id)}>
								<span>
									{head.label}
									<i>	{orderBy === head.id ? (order === 'asc' ? < AiOutlineArrowDown /> : < AiOutlineArrowUp />) : null}</i>
								</span>
							</th>
						)}
					</tr>
				</thead>
				<tbody className={style.TableBody}>
					{filteredData && filteredData.length > 0 && tableSort((filteredData), getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(el =>
							<tr key={el.id}>
								<td>
									<input
										type="checkbox"
									// checked={rowCount > 0 && numSelected === rowCount}
									// onChange={onSelectAllClick}
									/>
								</td>
								<td>{el.id}</td>
								<td>{el.name}</td>
								<td>{el.surname}</td>
								<td>{el.date_birth}</td>
								<td>{el.position}</td>
								<td>{el.phonenumber}</td>
							</tr>
						)}
				</tbody>
			</table>
			{filteredData && filteredData.length === 0 &&
				<div className={style.NoData}>
					No data
				</div>
			}

			{filteredData && filteredData.length && filteredData.length > rowsPerPage &&
				<div div className={style.PaginationContainer}>
					<Pagination activePage={page} handleChangePage={handleChangePage} total={filteredData.length} perPage={rowsPerPage} />
				</div>
			}

		</div >
	)
}

export default index
