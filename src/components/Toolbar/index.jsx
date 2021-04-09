import React from 'react'
import style from './toolbar.module.css'

function index({ numSelected, onDelete }) {

	const renderContent = () => {
		let content = null

		if (numSelected > 0) {
			content = (
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
						<button className={style.DeleteBtn} onClick={onDelete}>
							delete
				</button>
					</div>
				</div>
			)
		}

		return content
	}

	return <>{renderContent()}</>
}

export default index

