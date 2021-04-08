import React, { useState } from 'react'
import Pagination from '../Pagination';
import style from './data_sheet.module.css'

function index() {
	const [search, setSearch] = useState('')
	const [numSelected] = useState(0)
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id'); // id-ye gore asc ele
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(20);
	const [isLoading, setIsLoading] = useState(false)

	const table = [
		{ id: 1, name: "1Zaur", surname: "Aliyev", date_birth: "01.03.2020", position: "Frontend developer", phonenumber: "554149211" },
		{ id: 2, name: "1x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 3, name: "2x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 333, name: "2x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 33, name: "3x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 233, name: "3x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
		{ id: 233, name: "4x", surname: "y", date_birth: "01.03.2022", position: "Backend developer", phonenumber: "464524544" },
	]

	const [data, setData] = useState(table);
	const [filteredData, setFilteredData] = useState(data);

	const handleSearch = (e) => {
		const searchVal = e.target.value.toLowerCase()
		setSearch(searchVal)

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

	const handleChangePage = (_, newPage) => {
		setPage(newPage - 1);
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
								{head.label}
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

			{filteredData &&
				<div className={style.PaginationContainer}>
					{/* <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} activePage={page} setPage={setPage} /> */}
				</div>
			}

		</div>
	)
}

export default index
