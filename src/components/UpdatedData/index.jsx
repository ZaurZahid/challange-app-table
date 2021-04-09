import React from 'react'
import uniqid from 'uniqid'
import { PrettyPrintJson } from '../PrettyPrintJson';

function index({ data }) {
	return (
		<>
			{data.length > 0 ? data.map(el => <PrettyPrintJson data={el} key={el.id + el.name} />) : null}
		</>
	)
}

export default index
