import React from 'react'
import style from './print_json.module.css'

export const PrettyPrintJson = React.memo(({ data }) => {

	return (
		<div className={style.Section}>
			{(Object.keys(data).length !== 0) &&
				<pre>
					{JSON.stringify(data, null, 2)}
				</pre>
			}
		</div>
	)
});
