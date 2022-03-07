import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/action';

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
        <div>Login</div>
        <form>
            <input onChange={(e) => updateFormState("email", e.target.value)} value={formState.email} type="email" placeholder="Email" />
            <input onChange={(e) => updateFormState("password", e.target.value)} value={formState.password} type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </form>
    </>)
}

export default Login