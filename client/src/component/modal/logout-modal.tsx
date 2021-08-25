import React from 'react'
import { useHistory } from 'react-router-dom';
import UseLogout from '../hooks/useLogout';
import './modal.scss'

const LogoutModal = () => {
    let { handleLogout } = UseLogout()
    let history = useHistory()
    return (
        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content logout-modal__wrapper">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
                        <button onClick={() => history.push('/')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='logout-modal'>
                            <div className='logout-modal__text' >
                                <p>Are you want to logout,seriously?</p>
                            </div>
                            <div className='logout-modal__bottom'>
                                <button onClick={handleLogout} className='btn btn-outline-success'>Yes</button>
                                <button onClick={() => history.push('/')} className='btn btn-outline-dark ms-3'>No</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default LogoutModal;
