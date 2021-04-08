import React, { useEffect, useState } from 'react';
import style from './style.module.css'

const Pagination = ({ activePage, setPage, count }) => {
	const [active, setActive] = useState(activePage)

	useEffect(() => {
		setActive(activePage)
	}, [setActive])

	return (
		<>
			<div className={style.paginationContainer}>
				<div className={style.paginationContent}>
					{Array.apply(0, Array(count)).map((_, index) => {
						if (count <= 10) {
							return <button className={active === index + 1 ? style.ActivePage : style.notActive} onClick={() => setPage(index)}>{index + 1}</button>
						}

						if (count > 10) {
							let min = active - 8;
							let max = active + 4;

							if (min < 0) {
								if (index < 8 || index > count - 3) {
									return <button className={active === index + 1 ? style.ActivePage : style.notActive} onClick={() => setPage(index)}>{index + 1}</button>
								}
							}

							else if (min >= 0) {
								if ((index > min || index + 10 > count) && (index < max) || index > count - 3) {
									return <button className={active === index + 1 ? style.ActivePage : style.notActive} onClick={() => setPage(index)}>{index + 1}</button>
								}

								else {
									<button>...</button>
								}
							}
						}
					})}
				</div>
			</div>
		</>
	);
};

export default Pagination;