import React, { useCallback, useEffect, useState } from 'react'
import style from './table.module.css'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { getComparator, MoreThanEighteenYear, tableSort } from '../utils';

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
	editingField,
	errObj,
}) {

	// console.log(errObj);
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
							const errName = errObj.name && errObj.name.length > 0
							const errSurName = errObj.surname && errObj.surname.length > 0
							const errPosition = errObj.position && errObj.position.length > 0
							const errPhoneNumber = errObj.phonenumber && errObj.phonenumber.length > 0
							const errBirthday = errObj.date_birth && errObj.date_birth.length > 0

							const { id, ...rest } = errObj
							const disableBtn = Object.values(rest).some(x => (x !== ''))

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
												<button><GrClose onClick={handleBack} className={style.BackIcon} /></button>
												<button disabled={disableBtn}><FiCheckSquare onClick={() => disableBtn ? undefined : handleSave(el.id)} className={disableBtn ? style.Disabled : style.CheckIcon} /></button>
											</>
											: editingRow ? null : <FiEdit onClick={() => handleEdit(el.id)} className={style.EditIcon} />}
									</td>
									<td>{el.id}</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="text" name="name" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.name} placeholder="Type name" className={style.Input} className={errName && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errName && errObj.id === el.id && <p className={style.errMessage}>*{errObj.name}</p>}
											</>
											: el.name
										}
									</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="text" name="surname" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.surname} placeholder="Type surname" className={style.Input} className={errSurName && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errSurName && errObj.id === el.id && <p className={style.errMessage}>*{errObj.surname}</p>}
											</>
											: el.surname
										}
									</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="date" name="date_birth" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.date_birth} max={MoreThanEighteenYear()} onKeyDown={(e) => e.preventDefault()} className={errBirthday && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errBirthday && errObj.id === el.id && <p className={style.errMessage}>*{errObj.date_birth}</p>}
											</>
											: el.date_birth
										}
									</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="text" name="position" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.position} placeholder="Type position" className={errPosition && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errPosition && errObj.id === el.id && <p className={style.errMessage}>*{errObj.position}</p>}
											</>
											: el.position
										}
									</td>
									<td>
										{currenlyEditing ?
											<>
												<input type="text" name="phonenumber" onChange={(e) => handleChange(e, el.id)} value={editingField && editingField.phonenumber} placeholder="xx xxx xx xx" className={errPhoneNumber && errObj.id === el.id ? [style.Input, style.hasError].join(' ') : style.Input} />
												{errPhoneNumber && errObj.id === el.id && <p className={style.errMessage}>*{errObj.phonenumber}</p>}
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
