import React from 'react'
import './login.scss'
import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='login-wrapper'>
            <div style={{ width: '50%', margin: 'auto' }} className='login'>
                <p style={{ fontSize: '' }} className='login-header'>Login</p>
                <form>
                    <div className='inputBox'>
                        <p>Your Email</p>
                        <input type="text" placeholder='your email' />
                    </div>
                    <div className='inputBox'>
                        <p>Your Password</p>
                        <input type="password" placeholder='password' />
                    </div>
                </form>
                <div style={{ width: '100%', marginTop: "1%" }}>
                    <button className='btn btn-outline-success'>Login</button>
                    <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>Have't an account?
                        <Link to="/signup"> Signup.</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
