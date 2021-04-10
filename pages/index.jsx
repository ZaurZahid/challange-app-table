import React from 'react'
import { staticData } from '../components/utils'
import Layout from '../src/Layout'

function index({ table }) {
    return (
        <div>
            <Layout staticData={table} />
        </div>
    )
}

export const getStaticProps = async () => {
    return {
        props: {
            table: staticData || []
        }
    }
}

export default index
