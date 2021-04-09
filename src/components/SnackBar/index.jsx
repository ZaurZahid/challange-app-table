import React, { useEffect } from 'react'
import style from './snackbar.module.css'

function index({ alert, setAlert }) {

	useEffect(() => {
		const timeId = setTimeout(() => {
			setAlert({ ...alert, open: false })
		}, 1000)

		return () => clearTimeout(timeId)
	}, [alert]);

	const renderSnackbar = () => {
		let content = null

		if (alert.open) {
			content = (
				<div
					className={style.Snackbar}
					style={{ backgroundColor: alert.bgC || "#04ff008c;" }}
				>
					<span>{alert.message}</span>
				</div>
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