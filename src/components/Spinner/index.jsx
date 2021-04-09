import React from 'react'
import style from './spinner.module.css'

const Spinner = ({ isLoading = false, children }) => {

    return (
        <>
            {isLoading ? (
                <div className={style.DisableWhileLoading}>
                    <div className={style.spinner}>
                        <div className={style.loader}></div>
                    </div>
                    {children}
                </div>
            )
                : (
                    <div>
                        {children}
                    </div>
                )
            }
        </>
    )
}

export default Spinner