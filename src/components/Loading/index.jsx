import React from 'react'
import styles from './loading.module.css'

const Loading = ({ isLoading = false, children }) => {

    return (
        <>
            {isLoading ? (
                <div className={styles.spinner}>
                    <div className={styles.loader}>Loading...</div>
                </div>
            )
                : (children)
            }
        </>
    )
}

export default Loading