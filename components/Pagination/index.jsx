import React, { useEffect, useState } from 'react';
import style from './style.module.css'

const Pagination = ({ activePage, handleChangePage, total, perPage }) => {
	const [active, setActive] = useState(activePage)
	const [count, setCount] = useState('')

	useEffect(() => {
		// console.log(activePage)
		if (total) {
			setCount(Math.ceil(total / perPage))
		}

		setActive(activePage)
	}, [activePage, total])


	return (
		<div className={style.paginationContainer}>
			<div className={style.paginationContent}>
				{Array.apply(0, Array(count)).map((_, index) => {
					if (count <= 10) {
						return <button className={active === index ? style.ActivePage : null} onClick={() => handleChangePage(index)} key={index}>{index + 1}</button>
					}
					// console.log(index)
					if (count > 10) {
						let min = active - 7;
						let max = active + 4;

						if (min < 0) {
							if (index < 8 || index > count - 3) {
								return <button className={active === index ? style.ActivePage : null} onClick={() => handleChangePage(index)} key={index}>{index + 1}</button>
							}
						}

						else if (min >= 0) {
							if ((index > min || index + 10 > count) && (index < max) || index > count - 3) {
								return <button className={active === index ? style.ActivePage : null} onClick={() => handleChangePage(index)} key={index}>{index + 1}</button>
							}
						}
					}
				})}
			</div>
		</div>
	);
};

export default Pagination;