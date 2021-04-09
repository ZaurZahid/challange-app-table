import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../Pagination';
import SnackBar from '../SnackBar';
import TopSection from '../TopSection';
import Toolbar from '../Toolbar';
import Table from '../Table';
import style from './data_sheet.module.css'
import debounce from 'lodash.debounce';
import Loading from '../Loading';
import Spinner from '../Spinner';

function index() {
	const [search, setSearch] = useState('')
	const [numSelected] = useState(0)
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id'); // ilk once id ye gore asc ele
	const [page, setPage] = useState(0);
	const [rowsPerPage] = useState(6);
	const [isLoading, setIsLoading] = useState(false)
	const [editingRow, setEditingRow] = useState(null)

	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [editingField, setEditingField] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: '', bgC: "" })

	const initialErr = {
		id: "",
		name: "",
		surname: "",
		position: "",
		date_birth: "",
		phonenumber: ""
	}
	const [hasErr, setHasErr] = useState(initialErr);

	const tableHead = [
		{ id: "action", label: "Actions", sorting: false },
		{ id: "id", label: "No", sorting: true },
		{ id: "name", label: "Name", width: 200, sorting: true },
		{ id: "surname", label: "Surname", width: 200, sorting: true },
		{ id: "date_birth", label: "Date birth", sorting: true },
		{ id: "position", label: "Position", sorting: true },
		{ id: "phonenumber", label: "Phone number", sorting: true },
	]

	const table = [
		{ id: 1, name: "1Zaur", surname: "Aliyev Frontend developer Frontend developer", date_birth: "2021-04-14", position: "Frontend developer", phonenumber: "554149211" },
		{ id: 2, name: "1yx", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 3, name: "2xu3", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 4, name: "2eux", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 5, name: "2xg", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 6, name: "2grx", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 7, name: "3xg", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 8, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 9, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 10, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 11, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 12, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 13, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 14, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 15, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 16, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 17, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 18, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 19, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
		{ id: 20, name: "4xh", surname: "y", date_birth: "2021-04-14", position: "Backend developer", phonenumber: "464524544" },
	]

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = () => {
		setIsLoading(true)
		//API REQUEST	
		//if ok

		setTimeout(() => {
			setData(table)
			setFilteredData(table)

			setIsLoading(false)
		}, 500);
	}

	const runAfterFinishTyping = useCallback(
		debounce(searchVal => {
			// console.log(searchVal);
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
		[data, filteredData],
	);

	const handleSearch = (e) => {
		let value = e.target.value && e.target.value.trim().toLowerCase()
		setSearch(value)

		runAfterFinishTyping(value);
	}

	const handleChangePage = (newPage) => {
		setPage(newPage);
	};

	const handleSortRequest = (_, property) => {
		const isAsc = orderBy === property && order === 'asc';

		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleBack = () => {
		setEditingRow(null)
		setHasErr(initialErr)
		setEditingField(null)
	};

	const handleEdit = (id) => {
		setEditingRow(id)

		const clonedData = [...filteredData]
		let selectedField = clonedData.find(row => row.id === id)

		if (Object.keys(selectedField).length !== 0) {
			setEditingField(selectedField)
		}
	};

	const handleSave = (id) => {
		const clonedData = [...data]
		const index = clonedData.findIndex(row => row.id === id)

		//clonedData[index] (old) editingField (new edited object) bir birinden ferqli olarsa 
		if (JSON.stringify(clonedData[index]) === JSON.stringify(editingField)) {
			// console.log('the same');
			setAlert({
				bgC: '#04ff008c',
				open: true,
				message: 'Data is the same'
			})

			handleBack()
		} else {
			// console.log('different');
			setIsLoading(true)

			//API REQUEST
			setTimeout(() => {
				clonedData[index] = editingField;
				setData(clonedData);
				setFilteredData(clonedData);

				handleBack()
				setAlert({
					bgC: '#04ff008c',
					open: true,
					message: 'Table updated'
				})

				setIsLoading(false)
			}, 500);
		}
	}

	const handleDelete = (id) => {
		if (confirm("Silmək istədiyinizə əminsinizmi?")) {
			setIsLoading(true)

			// API REQUEST
			// if ok
			// time out api sorgusu getmek ucundur
			setTimeout(() => {
				const clonedData = [...data]
				const newData = clonedData.filter(el => el.id !== id)
				setData(newData)
				setFilteredData(newData)

				setHasErr(initialErr)
				setIsLoading(false)
			}, 500);
		}
	};


	const validation = (id, name, value) => {
		switch (name) {
			case 'name':
			case 'surname':
			case 'position':
				if (value.trim().length === 0) {
					setHasErr({ ...hasErr, ['id']: id, [name]: 'This field is required' })
				} else {
					setHasErr({ ...hasErr, [name]: '' })
				}
				break;

			case 'date_birth':
				break;

			case 'phonenumber':
				if (value.trim().length === 0) {
					setHasErr({ ...hasErr, ['id']: id, [name]: 'This field is required' })
				} else {
					setHasErr({ ...hasErr, [name]: '' })
					const patt = new RegExp(/\b\d{2}[-. ]?\d{3}[-. ]?\d{2}[-. ]?\d{2}\b/g);
					const result = patt.test(value);

					if (!result) {
						setHasErr({ ...hasErr, ['id']: id, [name]: 'Phone number format error' })
					} else {
						setHasErr({ ...hasErr, [name]: '' })
					}
				}

				break;
			default:
				break;
		}
	}

	const handleChange = (e, id) => {
		const nameOfField = e.target.name;
		const valueOfField = e.target.value;

		if (editingField) {
			const newEditingData = { ...editingField, [nameOfField]: valueOfField }
			setEditingField(newEditingData)
		}

		validation(id, nameOfField, valueOfField)
		// console.log(editingField);
	};

	return (
		<Loading isLoading={!data}>
			<div className={style.DataSheet}>
				<Spinner isLoading={isLoading}>
					<TopSection text={"List of Employees"} search={search} handleSearch={handleSearch} filteredData={filteredData} data={data} />
					<Toolbar numSelected={numSelected} onDelete={handleDelete} />
					{/* Form elave ederik. */}
					<Table
						tableHead={tableHead}
						handleSortRequest={handleSortRequest}
						orderBy={orderBy}
						order={order}
						page={page}
						rowsPerPage={rowsPerPage}
						editingRow={editingRow}
						filteredData={filteredData}
						handleBack={handleBack}
						handleSave={handleSave}
						handleEdit={handleEdit}
						handleChange={handleChange}
						editingField={editingField}
						errObj={hasErr}
					/>

					{filteredData && filteredData.length && filteredData.length > rowsPerPage ?
						<div className={style.PaginationContainer}>
							<Pagination activePage={page} handleChangePage={handleChangePage} total={filteredData.length} perPage={rowsPerPage} />
						</div>
						: null
					}
				</Spinner>

				<SnackBar alert={alert} setAlert={setAlert} />
			</div>
		</Loading>
	)
}

export default index
