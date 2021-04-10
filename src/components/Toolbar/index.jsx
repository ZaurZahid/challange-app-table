import React from 'react'
import style from './toolbar.module.css'

function index({ numSelected, onDeleteTemporary, onDeletePermanently, unDo, undo, toolbarOpen }) {

	const renderContent = () => {
		let content = null

		if (toolbarOpen) {
			if (undo) {
				content = (
					<div className={[style.Toolbar, style.ToolbarUndo].join(' ')}>
						<div>
							<p className={style.SelectedCount}>
								<span>
									{numSelected.length}{" "}
								</span>
							    deleted
							</p>
						</div>

						<div>
							<div div className={style.BtnContainer}>
								<button className={[style.DeleteBtn, style.UndoBtn].join(' ')} onClick={unDo}>
									Undo
								</button>

								<button className={style.DeleteBtn} onClick={onDeletePermanently}>
									Delete
								</button>
							</div>
						</div>
					</div>
				)
			} else if (numSelected.length > 0) {
				content = (
					<div className={style.Toolbar}>
						<div>
							<p className={style.SelectedCount}>
								<span>
									{numSelected.length}{" "}
								</span>
							 selected
							</p>
						</div>

						<div>
							<button className={style.DeleteBtn} onClick={onDeleteTemporary}>
								Delete
							</button>
						</div>
					</div>
				)
			}
		}

		return content
	}

	return <>{renderContent()}</>
}

export default index

