import React, { useState } from 'react'
import style from './print_json.module.css'

export const PrettyPrintJson = React.memo(({ data }) => {
	const [modifiedData, setModifiedData] = useState({})

	React.useEffect(() => {
		const x = { ...data }
		x.updatedValues.map(element =>
			x[element.nameofField] = element.valuesOfField
		)

		const { updatedValues, ...rest } = x
		setModifiedData(rest)

	}, [data, setModifiedData])

	return (
		<div className={style.Section}>
			{(Object.keys(modifiedData).length !== 0) &&
				<pre>
					{JSON.stringify(modifiedData, null, 2)}
				</pre>
			}
		</div>
	)
});
