import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/action';
import './login.css'

function Login() {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    })

    const updateFormState = (key: string, value: string) => {
        setFormState({
            ...formState,
            [key]: value
        })
    }
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login(formState.email, formState.password))
        navigate("/")
    } 
  return (<>
  <div className="login-container">
        <div className="login-title">Admin Login Page</div>
        <form className="form">
            <div>
                <input className="email-input" onChange={(e) => updateFormState("email", e.target.value)} value={formState.email} type="email" placeholder="Email" />
            </div>
            <div>
                <input className="password-input" onChange={(e) => updateFormState("password", e.target.value)} value={formState.password} type="password" placeholder="Password" />
            </div>
            <button className="login-button"onClick={handleLogin}>Login</button>
        </form>
    </div>
    </>)
}

export default Login