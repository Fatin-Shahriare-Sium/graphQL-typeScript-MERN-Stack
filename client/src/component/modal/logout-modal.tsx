import React from 'react'
import { useHistory } from 'react-router-dom';
import UseLogout from '../hooks/useLogout';
import Modal from './modal';

const LogoutModal = () => {
    let { handleLogout } = UseLogout()
    let history = useHistory()
    return (
        <Modal title='Logout' handleModal={() => { }}>
            <div>
                <div>
                    <p>Are you want to logout,seriously?</p>
                </div>
                <div>
                    <button onClick={handleLogout} className='btn btn-outline-success'>Yes</button>
                    <button onClick={() => history.push('/')} className='btn btn-outline-dark'>No</button>
                </div>
            </div>
        </Modal>
    )
}

export default LogoutModal;
