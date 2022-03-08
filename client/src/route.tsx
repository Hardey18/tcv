import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import store from './store';
import Events from './pages/Events/Events';
import "./App.css";
import Login from './pages/Login/Login';
import { loginSuccess } from './redux/action'

export default function RouteApp() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('user-token') as string;
    useEffect(() => {
        dispatch(loginSuccess(token))
    })
    
    return (
        <Routes>
            <Route index element={<Events />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
}