import React from 'react'
import Alert from '../alert/alert';
import UseChangePass from '../hooks/useChangePass';

const ChangePass = () => {
    let { error, handleChangePassword } = UseChangePass()
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh' }}>

            <form onSubmit={(event) => handleChangePassword(event)} style={{ width: '90%' }} >
                {error.text && <Alert text={error.text} color={error.color} />}
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" />
                </div>
                <button type='submit' className='btn btn-outline-primary'>Change Password</button>
            </form>
        </div>
    )
}

export default ChangePass;
