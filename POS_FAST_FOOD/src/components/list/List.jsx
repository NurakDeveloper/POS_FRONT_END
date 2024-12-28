import { Paper } from '@mui/material'
import React from 'react'
import { RiBuildingFill } from 'react-icons/ri'
import { hostName } from '../../api/host'

const List = ({ title, subTitle, imgUrl, onClick }) => {
    const domainName = hostName();
    const IMG_BEST_URL = `http://${domainName}:8085/api/images/`
    return (
        <>

            <div
                style={{ height: '80px', width: '100%', overflow: 'hidden', marginBottom: 4, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 2 }}
                className='border-bottom pointer'
                onClick={onClick}
            >
                <Paper sx={{ height: 60, width: 60, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <img
                        src={`${IMG_BEST_URL}${imgUrl}`}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Paper>
                <Paper elevation={0} className='p-1 ' sx={{ background: 'none', height: 50, width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'start', alignItems: 'center', marginLeft: 2 }}>
                    <div className='d-block '>
                        <p className='f-16'>{title}</p>
                        <p className='f-14 text-secondary'>{subTitle} </p>
                    </div>
                </Paper>
            </div>

        </>
    )
}

export default List
