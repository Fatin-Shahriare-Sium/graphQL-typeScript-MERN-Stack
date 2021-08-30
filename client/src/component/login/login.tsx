import React from 'react'
import './login.scss'
import { Link, useHistory } from 'react-router-dom'
import UseLogin from '../hooks/useLogin'
import Alert from '../alert/alert'
const Login = () => {
    let { handleLogin, error } = UseLogin()
    let history = useHistory()
    if (localStorage.getItem("__tokenx")) {
        history.push('/')
    }
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='login-wrapper'>
            <div style={{ width: '50%', margin: 'auto' }} className='login'>
                <p style={{ fontSize: '' }} className='login-header'>Login</p>
                {error && <Alert text={error.text} color={error.color} />}
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className='inputBox'>
                        <p>Your Email</p>
                        <input type="text" placeholder='your email' />
                    </div>
                    <div className='inputBox'>
                        <p>Your Password</p>
                        <input type="password" placeholder='password' />
                    </div>
                    <div style={{ width: '100%', marginTop: "1%" }}>
                        <button type='submit' className='btn btn-outline-success'>Login</button>
                        <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>Have't an account?
                            <Link to="/signup"> <span style={{ textDecoration: 'underline', textDecorationColor: '#0d6efd', color: '#0d6efd' }}>Signup.</span></Link>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;
