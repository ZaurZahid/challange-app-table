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
import UpdatedData from '../UpdatedData';
import DeletedData from '../DeletedData';
import { updatedDiff } from 'deep-object-diff';
import { generateArray } from '../utils';
import { AiOutlineDeleteRow } from 'react-icons/ai';

function index() {
	const [search, setSearch] = useState('')
	const [numSelected, setNumSelected] = useState([])
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id'); // ilk once id ye gore asc ele
	const [page, setPage] = useState(0);
	const [rowsPerPage] = useState(6/* 10 */);
	const [isLoading, setIsLoading] = useState(false)
	const [undo, setUndo] = useState(false)
	const [editingRow, setEditingRow] = useState(null)

	const [data, setData] = useState(null);
	const [filteredData, setFilteredData] = useState(null);
	const [unChangedData, setUnChangedData] = useState(null);
	const [editingField, setEditingField] = useState(null);
	const [deletedData, setDeletedData] = useState([]);
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
	const [viewJson, setViewJson] = useState(false);
	const [updatedData, setUpdatedData] = useState([]);

	const tableHead = [
		{ id: "action", label: "Actions", sorting: false },
		{ id: "id", label: "No", sorting: true },
		{ id: "name", label: "Name", width: 200, sorting: true },
		{ id: "surname", label: "Surname", width: 200, sorting: true },
		{ id: "date_birth", label: "Date birth", sorting: true },
		{ id: "position", label: "Position", sorting: true },
		{ id: "phonenumber", label: "Phone number", sorting: true },
	]

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = () => {
		setIsLoading(true)
		//API REQUEST	
		//if ok

		setTimeout(() => {
			const tableData = generateArray()
			setData(tableData)
			setFilteredData(tableData)
			setUnChangedData(tableData)

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
		let value = e.target.value && e.target.value.toLowerCase()
		setSearch(value)

		runAfterFinishTyping(value);
	}

	const handleChangePage = (newPage) => {
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" })
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

	const handleUpdatedData = (id, editingField) => {
		const clonedData = [...unChangedData]
		const oldData = clonedData.find(el => el.id === id)
		const updatedValues = []
		// console.log(oldData);
		// console.log(editingField);

		const diff = updatedDiff(oldData, editingField)
		// console.log(diff);

		if ((Object.keys(diff).length !== 0)) {
			for (const [key, value] of Object.entries(diff)) {
				updatedValues.push(
					{
						nameofField: key,
						valuesOfField: {
							oldVal: oldData[key],
							newVal: value
						}
					}
				)
			}

			const withUpdated = { ...oldData, updatedValues }
			const newUpdatedData = [...updatedData, withUpdated]
			const uniqueData = [...newUpdatedData.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()];

			setUpdatedData(uniqueData)
		} else {
			const newUpdatedData = updatedData.filter(el => el.id !== editingField.id)
			setUpdatedData(newUpdatedData)

			// console.log('ferq evvelki ile yoxdu');
		}
	}

	const handleSave = (id) => {
		const clonedData = [...data]
		const index = clonedData.findIndex(row => row.id === id)

		//clonedData[index] (old) editingField (new edited object) bir birinden ferqli olarsa 
		if (JSON.stringify(clonedData[index]) === JSON.stringify(editingField)) {
			// console.log('the same');
			setAlert({
				bgC: 'rgb(255 129 0)',
				open: true,
				message: 'Values are the same'
			})

			handleBack()
		} else {
			// console.log('different');
			setIsLoading(true)

			//API REQUEST
			setTimeout(() => {
				//bir bir push ele 
				handleUpdatedData(id, editingField)

				clonedData[index] = editingField;
				setData(clonedData);
				setFilteredData(clonedData);
				setSearch('')

				handleBack()
				setAlert({
					bgC: '#04ff00',
					open: true,
					message: 'Table updated'
				})

				setIsLoading(false)
			}, 500);
		}
	}

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

	const viewJsonData = () => {
		setViewJson(prev => !prev)
	}

	const returnToInitialData = () => {
		setViewJson(false)
		setUpdatedData([])
		setDeletedData([])
		setNumSelected([])
		setPage(0)

		fetchData()

		setAlert({
			bgC: '#04ff00',
			open: true,
			message: 'Returned to initial value'
		})
	}

	const handleDeleteTemporary = () => {
		let clonedData = [...data]
		let numSelectedAll = [...numSelected]

		if (deletedData && deletedData.length > 0) {
			numSelectedAll = deletedData.map(el => [...numSelectedAll, el.id])[0]
			numSelectedAll = numSelectedAll.sort((a, b) => (a > b) ? 1 : -1)
		}

		const newData = clonedData.filter((el) => numSelectedAll.indexOf(el.id) === -1)
		setFilteredData(newData)
		setSearch('')

		setIsLoading(true)
		handleBack()
		setUndo(true)
	};

	const differWithUpdatedData = (deleted, updated) => {
		// console.log('deleted');//1
		// console.log(deleted);//1
		// console.log('updated');//2
		// console.log(updated);//3 
		//updated datanin deletede aid olan idlerinden basqa qalanlari gotur

		const deletedIds = []
		deleted.map(el => deletedIds.push(el.id))

		const newData = updated.filter((el) => deletedIds.indexOf(el.id) === -1)
		console.log(newData);
		setUpdatedData(newData)
	}

	const onDeletePermanently = () => {
		// if (confirm("Silmək istədiyinizə əminsinizmi?")) {

		// API REQUEST
		// if ok
		// time out api sorgusu getmek ucundur

		setTimeout(() => {
			const clonedData = [...data]
			const filteredClonedData = [...data]
			const newData = clonedData.filter((el) => numSelected.indexOf(el.id) === -1)
			let newDeletedData = clonedData.filter((el) => numSelected.indexOf(el.id) !== -1)

			setFilteredData(newData)
			setData(newData)

			const newAllDeletedData = [...deletedData, ...newDeletedData]
			setDeletedData(newAllDeletedData)
			differWithUpdatedData(newAllDeletedData, updatedData)

			handleBack()
			setNumSelected([])
			setUndo(false)
			setPage(0)
			setAlert({
				bgC: '#e0125e',
				open: true,
				message: 'Selected data deleted'
			})

			setIsLoading(false)
		}, 500);
	}
	// };

	const unDo = () => {
		console.log(filteredData);
		console.log(data);

		setTimeout(() => {
			setData(data);
			setFilteredData(data);
			setNumSelected([])
			setUndo(false)
			setAlert({
				bgC: '#04ff00',
				open: true,
				message: 'Deleted data gave back'
			})
			setIsLoading(false)

		}, 500);
	};

	const selectClick = (ckd, id) => {
		let newData = [...numSelected]

		if (ckd) {
			// evvel add olunmayibsa
			newData = [...newData, id]
			newData = newData.sort((a, b) => (a > b) ? 1 : -1)
		} else {
			newData = newData.filter(el => el !== id)
		}

		setNumSelected(newData)
	}

	const selectClickAll = (ckd) => {
		let newData = []
		let clonedData = [...filteredData]

		if (ckd) {
			newData = clonedData.map(el => el.id)
			console.log(newData);
			setNumSelected(newData)
		} else {
			setNumSelected([])
		}
	}

	return (
		<Loading isLoading={!data}>
			<div className={style.DataSheet}>
				<Toolbar numSelected={numSelected} onDeletePermanently={onDeletePermanently} undo={undo} unDo={unDo} toolbarOpen={undo} />

				<Spinner isLoading={isLoading}>
					<TopSection text={"List of Employees"} search={search} handleSearch={handleSearch} filteredData={filteredData} data={data} undo={undo} />
					<Toolbar numSelected={numSelected} onDeleteTemporary={handleDeleteTemporary} toolbarOpen={!undo && !editingRow} />
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
						selectClick={selectClick}
						numSelected={numSelected}
						selectClickAll={selectClickAll}
						undo={undo}
					/>

					<div className={style.BtnContainer}>
						<button onClick={viewJsonData} className={style.Submit}>{viewJson ? "Hide" : "View"}</button>
						<button onClick={returnToInitialData} className={style.Initial}>Initial data</button>
					</div>

					{/* viewJson */ true &&
						<div className={style.JsonData}>
							<div className={style.UpdatedData}>
								<h5>Updated data</h5>
								<UpdatedData data={updatedData} />
							</div>
							<div className={style.DeletedData}>
								<h5>Deleted data</h5>
								<div>
									<DeletedData data={deletedData} />
								</div>
							</div>
						</div>
					}

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
