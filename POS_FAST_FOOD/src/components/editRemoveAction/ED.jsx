import React from 'react'
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ED = ({ deleteClick, updateClick }) => {
    return (
        <div>

            <div className="between">
                <span className='pointer' onClick={deleteClick}>
                    < RiDeleteBin6Line className='fs-5 ' />
                </span>
                <span className='pointer' onClick={updateClick}>
                    <CiEdit className='fs-5 ' />
                </span>

            </div>

        </div>
    )
}

export default ED
