import { Paper } from '@mui/material'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DetailED = ({ deleteClick, updateClick }) => {
    return (
        <div>

            <div>

                <div className="between">
                    <span className='pointer' onClick={deleteClick}>
                        <Paper className='p-2'>
                            < RiDeleteBin6Line className='fs-5 ' />
                        </Paper>
                    </span>
                    <span className='pointer' onClick={updateClick}>
                        <Paper className='p-2'>
                            <CiEdit className='fs-5 ' />
                        </Paper>

                    </span>

                </div>

            </div>

        </div>
    )
}

export default DetailED
