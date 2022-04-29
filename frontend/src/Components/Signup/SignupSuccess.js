import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

const SignupSuccess = () => {
    return (
        <div className='success-wrapper'>
            <h1 className='panel panel-default' >All set! Go ahead and login!</h1>
            <br />
            <Link
                className="btn btn-outline-light btn-lg"
                role="button"
                to="/login"
            >
                Go To Login
            </Link>
        </div>
    )
}

export default SignupSuccess