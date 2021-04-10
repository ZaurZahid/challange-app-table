import React from 'react'
import style from './top_section.module.css'

function index({ text, search, handleSearch, filteredData, data, undo }) {
	return (
		<>
			<div className={style.TopSection}>
				<div>
					<h6>{text}</h6>
				</div>
				{data && data.length > 0 &&
					<div>
						<label htmlFor="search">{search && search.length > 0 ? `${filteredData.length} ${filteredData.length === 1 ? "result" : "results"}  found` : "Search: "}</label>
						<input type="text" id="search" value={search} onChange={handleSearch} />
					</div>
				}
			</div>
		</>
	)
}

export default index

