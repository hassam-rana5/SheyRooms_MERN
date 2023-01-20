import {combineReducers} from 'redux';
import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllRoomReducers } from './reducers/roomReducers';

const finalReducers = combineReducers({
    getAllRoomReducers : getAllRoomReducers
})

const initialState = {}
const composeEnhancers = composeWithDevTools({})

const store = createStore(finalReducers,initialState,composeEnhancers(applyMiddleware(thunk)))

export default store;