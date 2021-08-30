import React from 'react'
import Alert from '../alert/alert'
import UseSignup from '../hooks/useSignup'
import './signup.scss'
import { Link, useHistory } from 'react-router-dom'
const Signup = () => {
    let { handleSignup, error } = UseSignup()
    let history = useHistory()
    if (localStorage.getItem("__tokenx")) {
        history.push('/')
    }
    return (
        <div className='signup-wrapper'>
            <div className='signup'>
                <p className='signup__title'>Signup</p>
                {error && <Alert text={error.text} color={error.color} />}
                <form onSubmit={(event) => handleSignup(event)}>
                    <div className='inputBox'>
                        <p>Your Name</p>
                        <input type="text" placeholder='your name' />
                    </div>
                    <div className='inputBox'>
                        <p>Your Email</p>
                        <input type="text" placeholder='your email' />
                    </div>
                    <div className='inputBox'>
                        <p>Your Password</p>
                        <input type="password" placeholder='password' />
                    </div>
                    <div className='inputBox'>
                        <p>Confrim Password</p>
                        <input type="password" placeholder='password' />
                    </div>
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} className='signup__inputBox'>
                        <p>Gender</p>
                        <select style={{ marginLeft: "3%" }}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='mt-3 w-100'>
                        <button type='submit' className='btn btn-outline-success'>SignUp</button>
                        <p style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--head-color)', marginTop: '1%' }}>Already,created an account?
                            <Link to="/login"><span style={{ textDecoration: 'underline', textDecorationColor: '#0d6efd', color: '#0d6efd' }} >Login.</span></Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
