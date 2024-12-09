import React from 'react'
import './message.css'
import { RiDeleteBin5Line } from 'react-icons/ri'
const RemoveMessage = ({ description, iCon, cancelClcik, acceptedClick, message, isOpen }) => {
    return (
        <>
            {isOpen ? (
                <>
                    <div>

                        <div className="message-overlay">
                            <div className="message-content">
                                <div className="message-header">
                                    <div className='d-flex start'>
                                        <div className='message-icon'>
                                            <RiDeleteBin5Line />
                                        </div>
                                        <span className='ps-3 text-danger'>{message}</span>
                                    </div>
                                </div>
                                <p className="message-description py-2">{description}</p>
                                <div className="message-action">
                                    <button className="button no" onClick={cancelClcik}>
                                        No
                                    </button>
                                    <button className="button yes" onClick={acceptedClick}>
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            ) : (<></>)}
        </>
    )
}

export default RemoveMessage
