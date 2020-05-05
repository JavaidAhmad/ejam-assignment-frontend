import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducer from './list-reducer';
const middlewares = [thunk];


const store = createStore(listReducer, applyMiddleware(...middlewares));
export default store;