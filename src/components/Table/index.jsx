import React, { useCallback, useEffect, useState } from 'react'
import style from './table.module.css'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

function index({
	tableHead,
	handleSortRequest,
	orderBy,
	order,
	page,
	rowsPerPage,
	editingRow,
	handleBack,
	handleSave,
	handleEdit,
	handleChange,
	filteredData,
	editingField
}) {

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

	return (
		<>
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
						{tableHead && tableHead.map(head =>
							<th style={{ width: head.width }} key={head.id} onClick={(e) => head.sorting ? handleSortRequest(e, head.id) : e.preventDefault()}>
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
						.map(el => {
							const currenlyEditing = editingRow && editingRow === el.id

							return (
								<tr key={el.id}>
									<td>
										<input
											type="checkbox"
										// checked={rowCount > 0 && numSelected === rowCount}
										// onChange={onSelectAllClick}
										/>
									</td>
									<td className={style.EditRow}>
										{currenlyEditing ?
											<>
												<GrClose onClick={handleBack} className={style.BackIcon} />
												<FiCheckSquare onClick={() => handleSave(el.id)} className={style.CheckIcon} />
											</>
											: <FiEdit onClick={() => handleEdit(el.id)} className={style.EditIcon} />}
									</td>
									<td>{el.id}</td>

									<td className={true ? style.hasError : null}>
										{currenlyEditing ?
											<>
												<input type="text" name="name" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.name} />
												{true && <p className={style.errMessage}>*Name required</p>}
											</>
											: el.name
										}
									</td>
									<td className={true ? style.hasError : null}>
										{currenlyEditing ?
											<>
												<input type="text" name="surname" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.surname} />
												{true && <p className={style.errMessage}>*Surname required</p>}
											</>
											: el.surname
										}
									</td>
									<td className={true ? style.hasError : null}>
										{currenlyEditing ?
											<>
												<input type="text" name="date_birth" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.date_birth} />
												{true && <p className={style.errMessage}>*Birthday format error</p>}
											</>
											: el.date_birth
										}
									</td> 
									<td className={true ? style.hasError : null}>
										{currenlyEditing ?
											<>
												<input type="text" name="position" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.position} />
												{true && <p className={style.errMessage}>*Position required</p>}
											</>
											: el.position
										}
									</td>
									<td className={true ? style.hasError : null}>
										{currenlyEditing ?
											<>
												<input type="text" name="phonenumber" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.phonenumber} />
												{true && <p className={style.errMessage}>* Phone number format error{/* Phonenumber required */}</p>}
											</>
											: el.phonenumber
										}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>

			{filteredData && filteredData.length === 0 &&
				<div className={style.NoData}>
					No data
				</div>
			}
		</>
	)
}

export default index
