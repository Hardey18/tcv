import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './redux/reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk]
// create store that contains all of the global state
const store = createStore(reducer, compose(applyMiddleware(...middlewares)));


export default store;