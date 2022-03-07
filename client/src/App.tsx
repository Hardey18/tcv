import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import RouteApp from './route'

export default function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <RouteApp />
                </BrowserRouter>
            </Provider>
        </div>
    );
}