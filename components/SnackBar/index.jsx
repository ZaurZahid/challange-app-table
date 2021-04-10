import React, { useEffect } from 'react'
import style from './snackbar.module.css'
import ClickAwayListener from 'react-click-away-listener';

function index({ alert, setAlert }) {

	useEffect(() => {
		const timeId = setTimeout(() => {
			setAlert({ ...alert, open: false })
		}, 2500)

		return () => clearTimeout(timeId)
	}, [alert]);

	const renderSnackbar = () => {
		let content = null

		if (alert.open) {
			content = (
				<ClickAwayListener onClickAway={() => setAlert({ ...alert, open: false })}>
					<div
						className={style.Snackbar}
						style={{ backgroundColor: alert.bgC || "#04ff008c;" }}
					>
						<span>{alert.message}</span>
					</div>
				</ClickAwayListener>

			)
		}

		return content
	}

	return (
		<>
			{renderSnackbar()}
		</>
	)
}

export default index