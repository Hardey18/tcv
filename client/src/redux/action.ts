import axios from 'axios';
import { actionTypes } from "./types"

export const fetchEvents = () => async(dispatch: any) => {
    try {
        const events = await axios.get("https://tcvapp.herokuapp.com/events");
        dispatch(fetchSuccess(events.data.data));
    } catch (error) {
        console.log(error)
    }
}

export const login = (email: string, password: string) => async(dispatch: any) => {
    try {
        const login = await axios.post("https://tcvapp.herokuapp.com/auth", { email, password });
        localStorage.setItem("user-token", login.data)
        dispatch(loginSuccess(login.data))
    } catch (error) {
        
    }
}

export const logout = () => async(dispatch: any) => {
    try {
        localStorage.clear()
        dispatch(logoutSuccess())
    } catch (error) {
        
    }
}

export const addEvent = (data: any) => async(dispatch: any) => {
    try {
        const token = localStorage.getItem("user-token") as string;
        const event = await axios.post("https://tcvapp.herokuapp.com/events", data, { headers: { "x-auth-token": token } });
        dispatch(addEventSuccess(event.data.event))
    } catch (error) {
        
    }
}

export const addEventSuccess = (payload: any) => {
    return {
        type: actionTypes.ADD_EVENT,
        payload
    }
}

export const loginSuccess = (payload: any) => {
    return {
        type: actionTypes.LOGIN,
        payload
    }
}
export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}
const fetchSuccess = (payload: any) => {
    return {
        type: actionTypes.FETCH_EVENTS,
        payload
    }
}
