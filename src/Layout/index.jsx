import React from 'react'
import DataSheet from '../DataSheet'
import style from './layout.module.css'

function index({ staticData }) {
	return (
		<div className={style.Container}>
			<DataSheet staticData={staticData} />
		</div>
	)
}

export default index
